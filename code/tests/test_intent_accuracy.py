"""
意图识别准确率评估测试

运行: pytest -xvs code/tests/test_intent_accuracy.py
或指定文件: python code/tests/test_intent_accuracy.py

输出: 每个类别的 precision / recall / f1 + 混淆矩阵
"""
from __future__ import annotations
import sys
from collections import defaultdict
from pathlib import Path

# 确保 code/src 在 sys.path
_src = Path(__file__).resolve().parent.parent / "src"
sys.path.insert(0, str(_src))

from intent_eval_data import TEST_CASES
from services.intent_service import classify_intent

# 所有意图类别
ALL_INTENTS = ["倾诉", "求助", "危机", "咨询", "闲聊", "拒绝"]


def run_evaluation(verbose: bool = False) -> dict:
    """运行全量评估，返回指标"""
    # 混淆矩阵: actual → predicted
    matrix = defaultdict(lambda: defaultdict(int))
    correct = 0
    total = len(TEST_CASES)

    for text, expected, description in TEST_CASES:
        result = classify_intent(text)
        predicted = result.get("intent", "未知")
        matrix[expected][predicted] += 1
        if predicted == expected:
            correct += 1
        elif verbose:
            print(f"  ❌ [{description}] '{text[:40]}' 期望={expected} 预测={predicted}")

    # 计算每类指标
    metrics = {}
    for intent in ALL_INTENTS:
        tp = matrix[intent][intent]
        fp = sum(matrix[other][intent] for other in ALL_INTENTS if other != intent)
        fn = sum(matrix[intent][other] for other in ALL_INTENTS if other != intent)
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0.0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0.0
        f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0.0
        metrics[intent] = {
            "precision": round(precision, 3),
            "recall": round(recall, 3),
            "f1": round(f1, 3),
            "support": tp + fn,
        }

    return {
        "accuracy": round(correct / total, 3) if total > 0 else 0.0,
        "correct": correct,
        "total": total,
        "per_class": metrics,
        "confusion_matrix": {k: dict(v) for k, v in matrix.items()},
    }


def print_report(results: dict):
    """打印格式化的评估报告"""
    print("\n" + "=" * 70)
    print("  意图识别准确率评估报告")
    print("=" * 70)
    print(f"\n  样本总数: {results['total']}")
    print(f"  正确数:   {results['correct']}")
    print(f"  总准确率: {results['accuracy']:.1%}\n")

    # 各类别指标表
    print(f"  {'类别':<8} {'Precision':>10} {'Recall':>10} {'F1':>10} {'样本':>6}")
    print("  " + "-" * 48)
    for intent in ALL_INTENTS:
        m = results["per_class"].get(intent, {})
        if m.get("support", 0) > 0:
            print(f"  {intent:<8} {m['precision']:>10.3f} {m['recall']:>10.3f} {m['f1']:>10.3f} {m['support']:>6}")
    print()

    # 混淆矩阵
    print("  混淆矩阵 (行=实际, 列=预测):\n")
    header = "         " + "".join(f"{i[:4]:>6}" for i in ALL_INTENTS)
    print(header)
    for actual in ALL_INTENTS:
        row = matrix_row = results["confusion_matrix"].get(actual, {})
        counts = "".join(f"{row.get(pred, 0):>6}" for pred in ALL_INTENTS)
        print(f"  {actual:<6} {counts}")
    print()

    # 面试可讲的关键数据
    crisis_m = results["per_class"].get("危机", {})
    print("  【关键指标】")
    print(f"  危机召回率: {crisis_m.get('recall', 0):.1%}  (目标 100%, L4正则保证)")
    print(f"  整体准确率: {results['accuracy']:.1%}")
    print("=" * 70)


def test_intent_accuracy():
    """pytest 兼容的测试函数"""
    results = run_evaluation()
    print_report(results)

    # 核心断言：危机必须 100% 召回
    crisis_recall = results["per_class"].get("危机", {}).get("recall", 0)
    assert crisis_recall == 1.0, f"危机召回率应为 100%, 实际 {crisis_recall:.1%}"

    # 整体准确率至少 80%
    assert results["accuracy"] >= 0.80, f"整体准确率应 >= 80%, 实际 {results['accuracy']:.1%}"

    # 每个有样本的类别 F1 > 0
    for intent, m in results["per_class"].items():
        if m["support"] > 0:
            assert m["f1"] > 0, f"{intent} F1=0, 可能需要检查测试数据或分类器"


if __name__ == "__main__":
    results = run_evaluation(verbose=True)
    print_report(results)
