"""异步后台任务管理 — 基于 asyncio 的非阻塞任务队列"""
from __future__ import annotations
import asyncio
import structlog
from typing import Callable, Coroutine, Any
from datetime import datetime
from dataclasses import dataclass, field

logger = structlog.get_logger(__name__)


@dataclass
class TaskRecord:
    name: str
    status: str
    started_at: str
    finished_at: str | None = None
    error: str | None = None

_task_registry: dict[str, TaskRecord] = {}


def register_task(task_id: str, name: str) -> None:
    _task_registry[task_id] = TaskRecord(
        name=name,
        status="pending",
        started_at=datetime.now().isoformat(),
    )


def complete_task(task_id: str, error: str | None = None) -> None:
    record = _task_registry.get(task_id)
    if record:
        record.status = "failed" if error else "completed"
        record.finished_at = datetime.now().isoformat()
        record.error = error


def get_task_status(task_id: str) -> dict | None:
    record = _task_registry.get(task_id)
    if not record:
        return None
    return {
        "task_id": task_id,
        "name": record.name,
        "status": record.status,
        "started_at": record.started_at,
        "finished_at": record.finished_at,
        "error": record.error,
    }


def get_all_tasks() -> list[dict]:
    return [
        {"task_id": tid, **get_task_status(tid)}
        for tid in sorted(_task_registry.keys(), reverse=True)
    ][:50]


async def run_async_task(
    task_id: str,
    name: str,
    coro: Coroutine[Any, Any, Any],
) -> Any:
    register_task(task_id, name)
    try:
        result = await coro
        complete_task(task_id)
        return result
    except Exception as e:
        error_msg = str(e)
        logger.error("async_task_failed", task_id=task_id, name=name, error=error_msg)
        complete_task(task_id, error=error_msg)
        raise


def run_sync_task(task_id: str, name: str, func: Callable, *args, **kwargs) -> Any:
    register_task(task_id, name)
    try:
        result = func(*args, **kwargs)
        complete_task(task_id)
        return result
    except Exception as e:
        error_msg = str(e)
        logger.error("sync_task_failed", task_id=task_id, name=name, error=error_msg)
        complete_task(task_id, error=error_msg)
        raise
