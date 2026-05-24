"""
Drug interaction checking service.

Checks for:
  - Drug-drug interactions (DDI)
  - Drug-allergy contraindications
  - Drug-condition contraindications
  - Dosage range validation
"""

from __future__ import annotations
import structlog

logger = structlog.get_logger(__name__)

# Known drug-drug interactions database (demonstration subset)
DDI_DATABASE = [
    {
        "drug_a": "warfarin",
        "drug_b": "aspirin",
        "severity": "major",
        "description": "Increased risk of bleeding when warfarin is combined with aspirin",
        "recommendation": "Avoid combination unless specifically indicated; monitor INR closely",
    },
    {
        "drug_a": "warfarin",
        "drug_b": "carbamazepine",
        "severity": "major",
        "description": "Carbamazepine induces CYP2C9, reducing warfarin anticoagulant effect; erratic INR control",
        "recommendation": "Monitor INR frequently; warfarin dose adjustment likely needed; consider alternative AED",
    },
    {
        "drug_a": "warfarin",
        "drug_b": "phenytoin",
        "severity": "major",
        "description": "Phenytoin displaces warfarin from protein binding and inhibits its metabolism initially, then induces metabolism",
        "recommendation": "Monitor INR closely; interaction is complex and time-dependent; consider alternative AED",
    },
    {
        "drug_a": "warfarin",
        "drug_b": "valproic_acid",
        "severity": "major",
        "description": "Valproic acid displaces warfarin from protein binding, increasing free warfarin levels",
        "recommendation": "Monitor INR closely; reduce warfarin dose may be needed",
    },
    {
        "drug_a": "levetiracetam",
        "drug_b": "warfarin",
        "severity": "minor",
        "description": "Levetiracetam has minimal CYP interaction, generally safe with warfarin",
        "recommendation": "Routine INR monitoring sufficient; no dose adjustment typically needed",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "lamotrigine",
        "severity": "moderate",
        "description": "Carbamazepine induces glucuronidation, decreasing lamotrigine levels by ~40%",
        "recommendation": "Increase lamotrigine dose; slower titration when adding carbamazepine",
    },
    {
        "drug_a": "valproic_acid",
        "drug_b": "lamotrigine",
        "severity": "major",
        "description": "Valproic acid inhibits lamotrigine metabolism, increasing levels ~2-fold; risk of serious rash including SJS/TEN",
        "recommendation": "Reduce lamotrigine starting dose to 25mg every other day; halve maintenance dose; slow titration essential",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "phenytoin",
        "severity": "moderate",
        "description": "Mutual CYP450 interaction; carbamazepine induces phenytoin metabolism but also competes for protein binding",
        "recommendation": "Monitor both drug levels; clinical response may be unpredictable",
    },
    {
        "drug_a": "valproic_acid",
        "drug_b": "carbamazepine",
        "severity": "major",
        "description": "Valproic acid increases free carbamazepine-10,11-epoxide (active metabolite), risk of toxicity",
        "recommendation": "Monitor for carbamazepine toxicity symptoms; check free carbamazepine levels",
    },
    {
        "drug_a": "levodopa",
        "drug_b": "carbidopa",
        "severity": "beneficial",
        "description": "Carbidopa inhibits peripheral DOPA decarboxylase, allowing lower levodopa doses and reducing peripheral side effects",
        "recommendation": "Always co-prescribe; standard combination therapy for Parkinson disease",
    },
    {
        "drug_a": "levodopa",
        "drug_b": "selegiline",
        "severity": "moderate",
        "description": "MAO-B inhibition reduces levodopa breakdown, may enhance effect and cause dyskinesia",
        "recommendation": "May require levodopa dose reduction; monitor for increased dyskinesia",
    },
    {
        "drug_a": "levodopa",
        "drug_b": "entacapone",
        "severity": "beneficial",
        "description": "COMT inhibition extends levodopa half-life, reducing wearing-off phenomenon",
        "recommendation": "Useful adjunct for motor fluctuations; may need levodopa dose reduction",
    },
    {
        "drug_a": "selegiline",
        "drug_b": "meperidine",
        "severity": "contraindicated",
        "description": "Risk of serotonin syndrome and severe hypertension/hyperpyrexia",
        "recommendation": "Absolute contraindication; use alternative analgesic",
    },
    {
        "drug_a": "rasagiline",
        "drug_b": "meperidine",
        "severity": "contraindicated",
        "description": "Risk of serotonin syndrome and severe hypertension/hyperpyrexia",
        "recommendation": "Absolute contraindication; 14-day washout between rasagiline and meperidine",
    },
    {
        "drug_a": "rasagiline",
        "drug_b": "ssri",
        "severity": "major",
        "description": "Risk of serotonin syndrome when MAO-B inhibitor combined with SSRIs",
        "recommendation": "Caution; limit SSRI dose; monitor for serotonin syndrome symptoms; avoid combination if possible",
    },
    {
        "drug_a": "selegiline",
        "drug_b": "ssri",
        "severity": "major",
        "description": "Risk of serotonin syndrome when MAO-B inhibitor combined with SSRIs",
        "recommendation": "Caution at standard doses; monitor for serotonin syndrome; consider alternative antidepressant",
    },
    {
        "drug_a": "sumatriptan",
        "drug_b": "ssri",
        "severity": "moderate",
        "description": "Risk of serotonin syndrome when triptan combined with SSRI/SNRI",
        "recommendation": "Monitor for serotonin syndrome; generally acceptable with caution; educate patient on symptoms",
    },
    {
        "drug_a": "sumatriptan",
        "drug_b": "maoi",
        "severity": "contraindicated",
        "description": "MAOIs prevent serotonin breakdown, combining with triptan risks serotonin syndrome",
        "recommendation": "Absolute contraindication; 14-day washout required",
    },
    {
        "drug_a": "topiramate",
        "drug_b": "valproic_acid",
        "severity": "moderate",
        "description": "Topiramate increases valproic acid clearance; valproic acid decreases topiramate levels; risk of hyperammonemia",
        "recommendation": "Monitor ammonia levels; watch for encephalopathy symptoms; adjust doses as needed",
    },
    {
        "drug_a": "topiramate",
        "drug_b": "oral_contraceptive",
        "severity": "moderate",
        "description": "Topiramate at doses >200mg/day may reduce estrogen levels from oral contraceptives",
        "recommendation": "Use additional or alternative contraception for topiramate >200mg/day",
    },
    {
        "drug_a": "phenytoin",
        "drug_b": "oral_contraceptive",
        "severity": "major",
        "description": "Phenytoin induces CYP3A4, reducing oral contraceptive effectiveness",
        "recommendation": "Use alternative or additional contraception; consider non-enzyme-inducing AED",
    },
    {
        "drug_a": "carbamazepine",
        "drug_b": "oral_contraceptive",
        "severity": "major",
        "description": "Carbamazepine induces CYP3A4, significantly reducing oral contraceptive effectiveness",
        "recommendation": "Use additional barrier contraception; consider non-enzyme-inducing AED in women of childbearing age",
    },
    {
        "drug_a": "tissue_plasminogen_activator",
        "drug_b": "warfarin",
        "severity": "contraindicated",
        "description": "Warfarin anticoagulation is a contraindication for thrombolysis; extreme bleeding risk",
        "recommendation": "Do NOT administer tPA if INR >1.7; check coagulation panel before thrombolysis",
    },
    {
        "drug_a": "tissue_plasminogen_activator",
        "drug_b": "aspirin",
        "severity": "major",
        "description": "Antiplatelet therapy increases hemorrhagic transformation risk with tPA",
        "recommendation": "Withhold antiplatelets for 24h after tPA; not an absolute contraindication but increases risk",
    },
    {
        "drug_a": "tissue_plasminogen_activator",
        "drug_b": "clopidogrel",
        "severity": "major",
        "description": "Dual antiplatelet therapy significantly increases bleeding risk with tPA",
        "recommendation": "Dual antiplatelet therapy is relative contraindication for tPA; weigh risks and benefits",
    },
    {
        "drug_a": "pyridostigmine",
        "drug_b": "beta_blocker",
        "severity": "moderate",
        "description": "Beta-blockers may worsen myasthenia gravis symptoms and antagonize pyridostigmine effect",
        "recommendation": "Use beta-blocker with caution in myasthenia gravis; prefer selective beta-1 blockers at low dose",
    },
    {
        "drug_a": "pyridostigmine",
        "drug_b": "aminoglycoside",
        "severity": "major",
        "description": "Aminoglycosides impair neuromuscular transmission, worsening myasthenia gravis",
        "recommendation": "Avoid aminoglycosides in myasthenia gravis; use alternative antibiotics",
    },
    {
        "drug_a": "corticosteroid",
        "drug_b": "nsaid",
        "severity": "major",
        "description": "Increased risk of GI ulceration and bleeding when corticosteroids combined with NSAIDs",
        "recommendation": "Co-prescribe PPI for GI protection; limit NSAID use; monitor for GI symptoms",
    },
    {
        "drug_a": "methotrexate",
        "drug_b": "nsaid",
        "severity": "major",
        "description": "NSAIDs can increase methotrexate toxicity by reducing renal clearance",
        "recommendation": "Avoid combination or closely monitor blood counts and renal function",
    },
    {
        "drug_a": "baclofen",
        "drug_b": "cns_depressant",
        "severity": "moderate",
        "description": "Additive CNS depression when baclofen combined with other CNS depressants",
        "recommendation": "Monitor for excessive sedation; dose reduction may be needed",
    },
]

# Drug class mappings for fuzzy matching
DRUG_CLASS_MAP = {
    "lisinopril": "ace_inhibitor",
    "enalapril": "ace_inhibitor",
    "ramipril": "ace_inhibitor",
    "fluoxetine": "ssri",
    "sertraline": "ssri",
    "paroxetine": "ssri",
    "escitalopram": "ssri",
    "citalopram": "ssri",
    "ibuprofen": "nsaid",
    "naproxen": "nsaid",
    "diclofenac": "nsaid",
    "celecoxib": "nsaid",
    "indomethacin": "nsaid",
    "phenelzine": "maoi",
    "tranylcypromine": "maoi",
    "selegiline": "maoi",
    "rasagiline": "maoi",
    "atenolol": "beta_blocker",
    "metoprolol": "beta_blocker",
    "propranolol": "beta_blocker",
    "bisoprolol": "beta_blocker",
    "gentamicin": "aminoglycoside",
    "tobramycin": "aminoglycoside",
    "amikacin": "aminoglycoside",
    "prednisone": "corticosteroid",
    "prednisolone": "corticosteroid",
    "dexamethasone": "corticosteroid",
    "methylprednisolone": "corticosteroid",
    "diazepam": "cns_depressant",
    "lorazepam": "cns_depressant",
    "clonazepam": "cns_depressant",
    "midazolam": "cns_depressant",
    "morphine": "cns_depressant",
    "fentanyl": "cns_depressant",
    "alteplase": "tissue_plasminogen_activator",
    "tenecteplase": "tissue_plasminogen_activator",
    "levetiracetam": "anticonvulsant",
    "carbamazepine": "anticonvulsant",
    "phenytoin": "anticonvulsant",
    "valproate": "valproic_acid",
    "divalproex": "valproic_acid",
    "depakote": "valproic_acid",
    "lamotrigine": "anticonvulsant",
    "topiramate": "anticonvulsant",
    "sumatriptan": "triptan",
    "rizatriptan": "triptan",
    "zolmitriptan": "triptan",
    "naratriptan": "triptan",
    "levodopa": "parkinson_medication",
    "carbidopa": "parkinson_medication",
    "entacapone": "parkinson_medication",
    "pramipexole": "parkinson_medication",
    "ropinirole": "parkinson_medication",
    "pyridostigmine": "myasthenia_medication",
    "neostigmine": "myasthenia_medication",
}


def _normalize_drug(name: str) -> list[str]:
    """Return possible drug/class identifiers for matching."""
    lower = name.lower().strip()
    candidates = [lower]
    if lower in DRUG_CLASS_MAP:
        candidates.append(DRUG_CLASS_MAP[lower])
    return candidates


def check_interactions(new_drugs: list[str], current_drugs: list[str]) -> list[dict]:
    """
    Check for drug-drug interactions between new prescriptions and current meds.
    Returns list of interaction records.
    """
    interactions = []

    all_new = []
    for d in new_drugs:
        all_new.extend(_normalize_drug(d))

    all_current = []
    for d in current_drugs:
        all_current.extend(_normalize_drug(d))

    for ddi in DDI_DATABASE:
        a, b = ddi["drug_a"], ddi["drug_b"]
        if (a in all_new and b in all_current) or (b in all_new and a in all_current):
            interactions.append(ddi)
        elif a in all_new and b in all_new:
            interactions.append(ddi)

    if interactions:
        logger.warning("ddi.found", count=len(interactions))
    return interactions


def check_allergy_contraindication(drug: str, allergies: list[str]) -> dict | None:
    """Check if a drug conflicts with known allergies."""
    drug_lower = drug.lower()
    for allergy in allergies:
        allergy_lower = allergy.lower()
        if drug_lower in allergy_lower or allergy_lower in drug_lower:
            return {
                "drug": drug,
                "allergy": allergy,
                "severity": "contraindicated",
                "recommendation": f"Do NOT prescribe {drug} — patient has allergy to {allergy}",
            }
        if "penicillin" in allergy_lower and drug_lower in ("amoxicillin", "ampicillin"):
            return {
                "drug": drug,
                "allergy": allergy,
                "severity": "major",
                "recommendation": f"Cross-reactivity risk: {drug} with penicillin allergy (~10%)",
            }
    return None
