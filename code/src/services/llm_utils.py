"""LLM 调用基础设施：超时控制 + 指数退避重试 + 熔断 + 全链路监控 + Token预算

设计理念：
  - 所有 LLM 调用必须经过本模块，不允许裸调 OpenAI SDK
  - 三层容灾：超时(30s)→重试(3次, 指数退避)→降级(熔断+fallback)
  - 全链路指标打点：调用者/延迟/Token消耗/成功失败
  - Token 预算：组装后检查+自动截断，防止超上下文窗口

使用：
    from src.services.llm_utils import llm_invoke, count_tokens, TokenBudget

    result = await llm_invoke(llm, messages, caller="diagnosis_agent")
    token_count = count_tokens(text)
    budget = TokenBudget(max_system=3000, max_total=6000)
"""
from __future__ import annotations
import time
import structlog
from functools import wraps
from dataclasses import dataclass, field
from typing import Callable, Awaitable, Any
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage
from langchain_openai import ChatOpenAI

logger = structlog.get_logger(__name__)

# =============================================================================
# 配置常量
# =============================================================================
LLM_TIMEOUT_SECONDS = 30          # 单次调用硬超时
LLM_MAX_RETRIES = 3               # 最大重试次数
LLM_RETRY_MIN_WAIT = 1.0          # 重试最小等待(秒)
LLM_RETRY_MAX_WAIT = 10.0         # 重试最大等待(秒)
LLM_CIRCUIT_BREAKER_THRESHOLD = 5 # 连续失败超过此次数触发熔断
LLM_CIRCUIT_RESET_SECONDS = 60    # 熔断后60秒自动恢复

# Token 预算默认值
DEFAULT_MAX_SYSTEM_TOKENS = 3000
DEFAULT_MAX_TOTAL_TOKENS = 6000

# =============================================================================
# 熔断器
# =============================================================================
class CircuitBreaker:
    """LLM 熔断器：连续失败 N 次后自动断开，防止雪崩。

    面试可讲点：这是微服务熔断模式在 LLM 调用层的应用。
    当 LLM API 连续故障时，不回退到 LLM 调用，直接用降级回复。
    60 秒后进入半开状态，下一次调用成功则恢复。
    """

    def __init__(self, threshold: int = LLM_CIRCUIT_BREAKER_THRESHOLD,
                 reset_seconds: int = LLM_CIRCUIT_RESET_SECONDS):
        self.threshold = threshold
        self.reset_seconds = reset_seconds
        self._failure_count = 0
        self._last_failure_time: float = 0.0
        self._is_open = False

    def record_success(self):
        """记录成功调用，重置熔断"""
        self._failure_count = 0
        self._is_open = False

    def record_failure(self):
        """记录失败调用"""
        self._failure_count += 1
        self._last_failure_time = time.time()
        if self._failure_count >= self.threshold:
            self._is_open = True
            logger.error("llm.circuit_breaker.open",
                         failures=self._failure_count,
                         threshold=self.threshold)

    @property
    def is_open(self) -> bool:
        """熔断器是否开启"""
        if not self._is_open:
            return False
        # 检查是否可以尝试恢复（半开状态）
        elapsed = time.time() - self._last_failure_time
        if elapsed > self.reset_seconds:
            logger.info("llm.circuit_breaker.half_open",
                        elapsed_seconds=round(elapsed, 1))
            self._is_open = False
            return False
        return True


# 全局熔断器实例
_circuit_breaker = CircuitBreaker()


# =============================================================================
# LLM 调用指标
# =============================================================================
@dataclass
class LLMCallMetrics:
    """单次 LLM 调用的精细化指标"""
    caller: str = ""
    model: str = ""
    latency_ms: float = 0.0
    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0
    success: bool = False
    retry_count: int = 0
    error: str = ""
    circuit_breaker_open: bool = False
    fallback_used: bool = False


def _record_metrics(metrics: LLMCallMetrics):
    """将 LLM 调用指标写入结构化日志"""
    if metrics.success:
        logger.info("llm.call",
                    caller=metrics.caller,
                    model=metrics.model,
                    latency_ms=round(metrics.latency_ms, 1),
                    prompt_tokens=metrics.prompt_tokens,
                    completion_tokens=metrics.completion_tokens,
                    total_tokens=metrics.total_tokens,
                    retry_count=metrics.retry_count)
    else:
        logger.error("llm.call_failed",
                     caller=metrics.caller,
                     model=metrics.model,
                     latency_ms=round(metrics.latency_ms, 1),
                     retry_count=metrics.retry_count,
                     error=metrics.error,
                     circuit_breaker_open=metrics.circuit_breaker_open,
                     fallback_used=metrics.fallback_used)


# =============================================================================
# 指数退避重试 + 超时 + 熔断
# =============================================================================

async def _invoke_with_timeout(llm: ChatOpenAI, messages: list, timeout: float = LLM_TIMEOUT_SECONDS):
    """带超时的 LLM 调用"""
    return await asyncio_timeout_wrapper(llm.ainvoke(messages), timeout)


async def asyncio_timeout_wrapper(coro, timeout: float):
    """asyncio.wait_for 包装，兼容不支持原生超时的 LLM SDK"""
    import asyncio
    return await asyncio.wait_for(coro, timeout=timeout)


async def llm_invoke(
    llm: ChatOpenAI,
    messages: list,
    *,
    caller: str = "unknown",
    fallback_result: Any = None,
    timeout: float = LLM_TIMEOUT_SECONDS,
    max_retries: int = LLM_MAX_RETRIES,
) -> Any:
    """带全链路容灾的 LLM 调用入口。

    调用链路：
      1. 检查熔断器 → 如果开启直接返回 fallback
      2. 指数退避重试（最多 max_retries 次）
      3. 每次调用硬超时 timeout 秒
      4. 记录全链路指标

    参数:
        llm: ChatOpenAI 实例
        messages: LangChain 消息列表
        caller: 调用者标识（用于日志/监控归因）
        fallback_result: 熔断/全部重试失败后的降级返回值
        timeout: 单次调用超时(秒)
        max_retries: 最大重试次数

    返回:
        LLM 响应对象，或 fallback_result
    """
    import asyncio
    metrics = LLMCallMetrics(caller=caller)
    start = time.perf_counter()

    # 1. 熔断检查
    if _circuit_breaker.is_open:
        metrics.circuit_breaker_open = True
        metrics.latency_ms = (time.perf_counter() - start) * 1000
        metrics.fallback_used = fallback_result is not None
        _record_metrics(metrics)
        if fallback_result is not None:
            return fallback_result
        raise LLMCircuitBreakerOpenError("LLM 熔断器开启，API 连续故障")

    # 2. 指数退避重试
    last_error = None
    for attempt in range(max_retries + 1):
        metrics.retry_count = attempt
        try:
            result = await asyncio_timeout_wrapper(llm.ainvoke(messages), timeout)
            # 成功
            elapsed = time.perf_counter() - start
            metrics.latency_ms = elapsed * 1000
            metrics.success = True
            metrics.model = getattr(llm, 'model_name', 'unknown')
            # 提取 Token 用量
            if hasattr(result, 'response_metadata'):
                usage = result.response_metadata.get('token_usage', {})
                metrics.prompt_tokens = usage.get('prompt_tokens', 0)
                metrics.completion_tokens = usage.get('completion_tokens', 0)
                metrics.total_tokens = usage.get('total_tokens', 0)
            _circuit_breaker.record_success()
            _record_metrics(metrics)
            return result
        except asyncio.TimeoutError:
            last_error = f"timeout after {timeout}s"
            logger.warning("llm.call_timeout",
                           caller=caller,
                           attempt=attempt,
                           timeout=timeout)
        except Exception as e:
            last_error = str(e)[:200]
            logger.warning("llm.call_error",
                           caller=caller,
                           attempt=attempt,
                           error=last_error)

        # 指数退避等待
        if attempt < max_retries:
            wait = min(LLM_RETRY_MIN_WAIT * (2 ** attempt), LLM_RETRY_MAX_WAIT)
            logger.info("llm.retry_wait", caller=caller, wait_seconds=wait, attempt=attempt + 1)
            await asyncio.sleep(wait)

    # 3. 全部重试失败
    _circuit_breaker.record_failure()
    elapsed = time.perf_counter() - start
    metrics.latency_ms = elapsed * 1000
    metrics.error = last_error or "unknown"
    metrics.fallback_used = fallback_result is not None
    _record_metrics(metrics)
    if fallback_result is not None:
        return fallback_result
    raise LLMAllRetriesExhaustedError(
        f"LLM 全部 {max_retries + 1} 次调用失败: {last_error}")


# =============================================================================
# 同步版调用（供同步 Agent 函数使用）
# =============================================================================

def llm_invoke_sync(
    llm: ChatOpenAI,
    messages: list,
    *,
    caller: str = "unknown",
    fallback_result: Any = None,
    timeout: float = LLM_TIMEOUT_SECONDS,
    max_retries: int = LLM_MAX_RETRIES,
) -> Any:
    """同步版 LLM 调用入口（供 diagnosis_agent / treatment_agent 等同步函数使用）。

    参数和容灾逻辑与异步版完全相同。
    """
    import time as _time
    metrics = LLMCallMetrics(caller=caller)
    start = _time.perf_counter()

    # 1. 熔断检查
    if _circuit_breaker.is_open:
        metrics.circuit_breaker_open = True
        metrics.latency_ms = (_time.perf_counter() - start) * 1000
        metrics.fallback_used = fallback_result is not None
        _record_metrics(metrics)
        if fallback_result is not None:
            return fallback_result
        raise LLMCircuitBreakerOpenError("LLM 熔断器开启，API 连续故障")

    # 2. 指数退避重试
    last_error = None
    for attempt in range(max_retries + 1):
        metrics.retry_count = attempt
        try:
            import threading
            result_container: list = []
            error_container: list = []

            def _target():
                try:
                    result_container.append(llm.invoke(messages))
                except Exception as e:
                    error_container.append(e)

            thread = threading.Thread(target=_target, daemon=True)
            thread.start()
            thread.join(timeout=timeout)

            if thread.is_alive():
                raise TimeoutError(f"LLM call timeout after {timeout}s")

            if error_container:
                raise error_container[0]

            result = result_container[0]
            elapsed = _time.perf_counter() - start
            metrics.latency_ms = elapsed * 1000
            metrics.success = True
            metrics.model = getattr(llm, 'model_name', 'unknown')
            if hasattr(result, 'response_metadata'):
                usage = result.response_metadata.get('token_usage', {})
                metrics.prompt_tokens = usage.get('prompt_tokens', 0)
                metrics.completion_tokens = usage.get('completion_tokens', 0)
                metrics.total_tokens = usage.get('total_tokens', 0)
            _circuit_breaker.record_success()
            _record_metrics(metrics)
            return result
        except TimeoutError:
            last_error = f"timeout after {timeout}s"
            logger.warning("llm.call_timeout", caller=caller, attempt=attempt, timeout=timeout)
        except Exception as e:
            last_error = str(e)[:200]
            logger.warning("llm.call_error", caller=caller, attempt=attempt, error=last_error)

        if attempt < max_retries:
            wait = min(LLM_RETRY_MIN_WAIT * (2 ** attempt), LLM_RETRY_MAX_WAIT)
            logger.info("llm.retry_wait", caller=caller, wait_seconds=wait, attempt=attempt + 1)
            import time as _time2
            _time2.sleep(wait)

    # 3. 全部重试失败
    _circuit_breaker.record_failure()
    elapsed = _time.perf_counter() - start
    metrics.latency_ms = elapsed * 1000
    metrics.error = last_error or "unknown"
    metrics.fallback_used = fallback_result is not None
    _record_metrics(metrics)
    if fallback_result is not None:
        return fallback_result
    raise LLMAllRetriesExhaustedError(
        f"LLM 全部 {max_retries + 1} 次调用失败: {last_error}")


# =============================================================================
# Token 预算
# =============================================================================

@dataclass
class TokenBudget:
    """Token 预算管理器 — 面试可讲：提示词工程的生产化实践

    使用方式：
        budget = TokenBudget(max_system=3000, max_total=6000)
        if not budget.check(system_prompt, user_content):
            system_prompt = budget.truncate(system_prompt)  # 自动截断
    """
    max_system_tokens: int = DEFAULT_MAX_SYSTEM_TOKENS
    max_total_tokens: int = DEFAULT_MAX_TOTAL_TOKENS
    encoder_name: str = "o200k_base"  # GPT-4o / o1 编码器
    _system: int = 0
    _user: int = 0
    _total: int = 0

    def count(self, text: str) -> int:
        """计算文本的 Token 数"""
        return count_tokens(text, self.encoder_name)

    def check(self, system_prompt: str, user_content: str = "") -> bool:
        """检查是否在预算内"""
        self._system = self.count(system_prompt)
        self._user = self.count(user_content) if user_content else 0
        self._total = self._system + self._user
        if self._system > self.max_system_tokens:
            logger.warning("token_budget.system_exceeded",
                           tokens=self._system, limit=self.max_system_tokens)
            return False
        if self._total > self.max_total_tokens:
            logger.warning("token_budget.total_exceeded",
                           total=self._total, limit=self.max_total_tokens)
            return False
        logger.info("token_budget.pass",
                    system=self._system, user=self._user,
                    total=self._total, limit=self.max_total_tokens)
        return True

    def truncate(self, text: str, max_tokens: int | None = None) -> str:
        """按 Token 数截断文本（保留前面部分，适合截断 System Prompt 的冗余内容）"""
        max_t = max_tokens or self.max_system_tokens
        tokens = _encode(text, self.encoder_name)
        if len(tokens) <= max_t:
            return text
        truncated = _decode(tokens[:max_t], self.encoder_name)
        logger.info("token_budget.truncated",
                    original=len(tokens), truncated=max_t)
        return truncated


def count_tokens(text: str, encoder_name: str = "o200k_base") -> int:
    """计算文本的 Token 数"""
    return len(_encode(text, encoder_name))


def _encode(text: str, encoder_name: str) -> list[int]:
    """编码文本为 Token 序列"""
    import tiktoken
    try:
        enc = tiktoken.get_encoding(encoder_name)
    except Exception:
        enc = tiktoken.get_encoding("cl100k_base")
    return enc.encode(text)


def _decode(tokens: list[int], encoder_name: str) -> str:
    """解码 Token 序列为文本"""
    import tiktoken
    try:
        enc = tiktoken.get_encoding(encoder_name)
    except Exception:
        enc = tiktoken.get_encoding("cl100k_base")
    return enc.decode(tokens)


# =============================================================================
# 自定义异常
# =============================================================================

class LLMCircuitBreakerOpenError(Exception):
    """熔断器开启异常 — 所有 LLM 调用被临时阻断"""


class LLMAllRetriesExhaustedError(Exception):
    """全部重试耗尽异常 — LLM API 持续不可用"""
