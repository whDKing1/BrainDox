"""PDF 渲染服务 — 使用 ReportLab 生成心理健康评估报告 PDF"""
from __future__ import annotations
import os
from datetime import datetime
from typing import Optional
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor, black, white
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from ..config.settings import get_settings

PRIMARY = HexColor("#667eea")
DARK = HexColor("#1a1a2e")
GRAY = HexColor("#888888")
LIGHT_GRAY = HexColor("#f5f5f5")
BORDER = HexColor("#e0e0e0")
GREEN = HexColor("#52c41a")

_ttf_registered = False

def _ensure_fonts():
    global _ttf_registered
    if _ttf_registered:
        return
    font_paths = [
        ("C:/Windows/Fonts/msyh.ttc", "Microsoft YaHei"),
        ("C:/Windows/Fonts/simsun.ttc", "SimSun"),
        ("C:/Windows/Fonts/simhei.ttf", "SimHei"),
    ]
    registered = False
    for path, name in font_paths:
        if os.path.exists(path):
            try:
                pdfmetrics.registerFont(TTFont(name, path))
                registered = True
                break
            except Exception:
                continue
    if not registered:
        try:
            from reportlab.pdfbase.cidfonts import UnicodeCIDFont
            pdfmetrics.registerFont(UnicodeCIDFont("STSong-Light"))
            pdfmetrics.registerFontType("STSong-Light", "STSong-Light")
            registered = True
        except Exception:
            pass
    _ttf_registered = True

def _get_styles():
    _ensure_fonts()
    styles = getSampleStyleSheet()
    font_name = "Microsoft YaHei"
    try:
        p = Paragraph("测试", styles["Normal"])
        p = Paragraph("测试", ParagraphStyle("t", fontName=font_name))
    except Exception:
        font_name = "STSong-Light"
    styles.add(ParagraphStyle(
        "ReportTitle", fontName=font_name, fontSize=22, leading=30,
        textColor=PRIMARY, alignment=TA_CENTER, spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        "ReportSubtitle", fontName=font_name, fontSize=10, leading=14,
        textColor=GRAY, alignment=TA_CENTER, spaceAfter=20,
    ))
    styles.add(ParagraphStyle(
        "SectionTitle", fontName=font_name, fontSize=14, leading=20,
        textColor=DARK, spaceBefore=16, spaceAfter=8, bold=1,
    ))
    styles.add(ParagraphStyle(
        "SectionTitle2", fontName=font_name, fontSize=12, leading=16,
        textColor=DARK, spaceBefore=10, spaceAfter=6,
    ))
    styles.add(ParagraphStyle(
        "BodyText2", fontName=font_name, fontSize=11, leading=18,
        textColor=HexColor("#333333"), spaceAfter=4,
    ))
    styles.add(ParagraphStyle(
        "SmallText", fontName=font_name, fontSize=9, leading=13,
        textColor=GRAY, spaceAfter=2,
    ))
    styles.add(ParagraphStyle(
        "Disclaimer", fontName=font_name, fontSize=8, leading=11,
        textColor=GRAY, alignment=TA_CENTER, spaceBefore=20,
    ))
    styles.add(ParagraphStyle(
        "StatusApproved", fontName=font_name, fontSize=11, leading=16,
        textColor=GREEN, spaceAfter=4,
    ))
    return styles


def generate_report_pdf(report_id: str, content: dict, patient_name: str = "用户",
                        doctor_name: str | None = None, doctor_comment: str | None = None) -> str:
    settings = get_settings()
    pdf_dir = settings.pdf_storage_path
    os.makedirs(pdf_dir, exist_ok=True)
    file_path = os.path.join(pdf_dir, f"report_{report_id}.pdf")
    doc = SimpleDocTemplate(
        file_path, pagesize=A4,
        leftMargin=2*cm, rightMargin=2*cm,
        topMargin=2*cm, bottomMargin=2*cm,
    )
    styles = _get_styles()
    elements = []
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    summary = content.get("summary", {}) if isinstance(content, dict) else {}
    diagnosis = content.get("diagnosis", {}) if isinstance(content, dict) else {}
    recs = content.get("recommendations", {}) if isinstance(content, dict) else {}
    follow_up = content.get("follow_up", "") if isinstance(content, dict) else ""
    dr = content.get("doctor_review", {}) if isinstance(content, dict) else {}
    report_type_label = {"mild": "轻症评估", "moderate": "中症评估", "severe": "重症评估"}
    status_label = {
        "draft": "草稿", "pending_review": "待审核",
        "approved": "已确认生效", "rejected": "已退回",
    }
    status_val = content.get("status", "draft") if isinstance(content, dict) else "draft"
    report_type_val = content.get("report_type", "mild") if isinstance(content, dict) else "mild"
    elements.append(Paragraph("BrainDox 心理健康评估报告", styles["ReportTitle"]))
    elements.append(Paragraph(
        f"报告编号：REP-{report_id[:8].upper()}　　生成日期：{now}　　报告类型：{report_type_label.get(report_type_val, '评估')}",
        styles["ReportSubtitle"],
    ))
    elements.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceAfter=12))
    elements.append(Paragraph("一、患者信息", styles["SectionTitle"]))
    data = [["姓名", patient_name, "", ""], ["评估时间", now, "报告状态", status_label.get(status_val, status_val)]]
    t = Table(data, colWidths=[3*cm, 5*cm, 3*cm, 5*cm])
    t.setStyle(TableStyle([
        ("FONTNAME", (0,0), (-1,-1), _get_styles()["BodyText2"].fontName),
        ("FONTSIZE", (0,0), (-1,-1), 10),
        ("TEXTCOLOR", (0,0), (0,-1), GRAY),
        ("TEXTCOLOR", (1,0), (1,-1), DARK),
        ("TEXTCOLOR", (2,0), (2,-1), GRAY),
        ("TEXTCOLOR", (3,0), (3,-1), GREEN if status_val == "approved" else DARK),
        ("TOPPADDING", (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
    ]))
    elements.append(t)
    elements.append(Spacer(1, 6*mm))
    chief = summary.get("chief_complaint", "") if isinstance(summary, dict) else ""
    if chief:
        elements.append(Paragraph("二、主诉", styles["SectionTitle"]))
        elements.append(Paragraph(chief, styles["BodyText2"]))
    conclusion = summary.get("conclusion", "") if isinstance(summary, dict) else ""
    if conclusion:
        elements.append(Paragraph("三、评估结论", styles["SectionTitle"]))
        elements.append(Paragraph(
            f'<font color="{PRIMARY.hexval()}"><b>{conclusion}</b></font>', styles["BodyText2"],
        ))
        sev = summary.get("severity_assessment", "") if isinstance(summary, dict) else ""
        if sev:
            elements.append(Paragraph(f"严重度评估：{sev}", styles["SmallText"]))
    primary = diagnosis.get("primary", {}) if isinstance(diagnosis, dict) else {}
    diffs = diagnosis.get("differentials", []) if isinstance(diagnosis, dict) else []
    if primary and isinstance(primary, dict):
        elements.append(Paragraph("四、诊断信息", styles["SectionTitle"]))
        dname = primary.get("disease_name", "") or ""
        dicd = primary.get("icd_code", "") or ""
        dconf = primary.get("confidence", 0) or 0
        elements.append(Paragraph(
            f'<b>{dname}</b>　<font color="{PRIMARY.hexval()}">{dicd}</font>　置信度 {int(dconf*100)}%',
            styles["BodyText2"],
        ))
        if diffs and len(diffs) > 0:
            elements.append(Paragraph("鉴别诊断：", styles["SectionTitle2"]))
            for d in diffs:
                if isinstance(d, dict):
                    dn = d.get("disease_name", "") or ""
                    dic = d.get("icd_code", "") or ""
                    dk = d.get("key_differentiator", "") or ""
                    elements.append(Paragraph(f"• <b>{dn}</b>（{dic}）{f'— {dk}' if dk else ''}", styles["SmallText"]))
    recs_life = recs.get("lifestyle", []) if isinstance(recs, dict) else []
    recs_psy = recs.get("psychotherapy", []) if isinstance(recs, dict) else []
    recs_med = recs.get("medication", []) if isinstance(recs, dict) else []
    if recs_life or recs_psy or recs_med:
        elements.append(Paragraph("五、建议", styles["SectionTitle"]))
        if recs_life:
            elements.append(Paragraph("生活方式：", styles["SectionTitle2"]))
            for item in recs_life:
                elements.append(Paragraph(f"☑ {item}", styles["BodyText2"]))
        if recs_psy:
            elements.append(Paragraph("心理干预：", styles["SectionTitle2"]))
            for item in recs_psy:
                elements.append(Paragraph(f"☑ {item}", styles["BodyText2"]))
        if recs_med:
            elements.append(Paragraph("药物建议：", styles["SectionTitle2"]))
            for item in recs_med:
                elements.append(Paragraph(f"☑ {item}", styles["BodyText2"]))
    if follow_up:
        elements.append(Paragraph("六、随访计划", styles["SectionTitle"]))
        elements.append(Paragraph(follow_up, styles["BodyText2"]))
    elements.append(Paragraph("七、医生审核", styles["SectionTitle"]))
    dr_status = dr.get("status", "pending") if isinstance(dr, dict) else "pending"
    dr_name = dr.get("doctor_name") if isinstance(dr, dict) else None
    dr_time = dr.get("reviewed_at") if isinstance(dr, dict) else None
    if status_val == "approved" and dr_name:
        elements.append(Paragraph(
            f'✅ 已由 {dr_name} 审核确认' + (f'（{dr_time}）' if dr_time else ''),
            styles["StatusApproved"],
        ))
    elif status_val == "rejected":
        elements.append(Paragraph("❌ 已退回，需补充信息", styles["BodyText2"]))
    else:
        elements.append(Paragraph("⏳ 待医生审核", styles["SmallText"]))
    if doctor_comment:
        elements.append(Paragraph(f"审核意见：{doctor_comment}", styles["BodyText2"]))
    elements.append(Spacer(1, 10*mm))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=BORDER, spaceAfter=8))
    elements.append(Paragraph(
        "免责声明：本报告由 AI 辅助生成，经执业医师审核确认后生效。仅供参考，不构成最终诊断。",
        styles["Disclaimer"],
    ))
    doc.build(elements)
    return file_path
