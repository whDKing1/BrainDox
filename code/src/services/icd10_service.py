"""
ICD-10 coding service — Automated medical code assignment.

Provides:
  - Text-to-ICD-10 code mapping
  - Code validation and hierarchy lookup
  - DRGs grouping logic based on ICD-10 + procedure codes
"""

from __future__ import annotations
import structlog

logger = structlog.get_logger(__name__)

# Comprehensive ICD-10-CM code database (subset for demonstration)
ICD10_DATABASE = {
    "G00-G09": {
        "name": "Inflammatory diseases of the central nervous system",
        "codes": {
            "G00.9": "Bacterial meningitis, unspecified",
            "G03.9": "Meningitis, unspecified",
            "G04.90": "Encephalitis and encephalomyelitis, unspecified",
            "G04.91": "Myelitis, unspecified",
            "G06.0": "Intracranial abscess and granuloma",
            "G06.1": "Intraspinal abscess and granuloma",
            "G09": "Sequelae of inflammatory diseases of central nervous system",
        },
    },
    "G10-G14": {
        "name": "Systemic atrophies primarily affecting the central nervous system",
        "codes": {
            "G10": "Huntington disease",
            "G12.21": "Amyotrophic lateral sclerosis",
            "G12.22": "Progressive muscular atrophy",
            "G12.9": "Spinal muscular atrophy, unspecified",
            "G13.2": "Systemic atrophy primarily affecting the nervous system in myxedema",
        },
    },
    "G20-G26": {
        "name": "Extrapyramidal and movement disorders",
        "codes": {
            "G20": "Parkinson disease",
            "G21.11": "Neuroleptic induced parkinsonism",
            "G24.0": "Drug induced dystonia",
            "G24.1": "Idiopathic familial dystonia",
            "G25.0": "Essential tremor",
            "G25.4": "Drug-induced chorea",
            "G25.5": "Other chorea",
            "G25.81": "Restless legs syndrome",
        },
    },
    "G30-G32": {
        "name": "Other degenerative diseases of the nervous system",
        "codes": {
            "G30.0": "Alzheimer disease with early onset",
            "G30.1": "Alzheimer disease with late onset",
            "G30.9": "Alzheimer disease, unspecified",
            "G31.01": "Pick disease",
            "G31.09": "Other frontotemporal degeneration",
            "G31.2": "Degeneration of nervous system due to alcohol",
            "G31.83": "Dementia with Lewy bodies",
            "G31.85": "Corticobasal degeneration",
            "G31.89": "Other specified degenerative diseases of nervous system",
        },
    },
    "G35-G37": {
        "name": "Demyelinating diseases of the central nervous system",
        "codes": {
            "G35": "Multiple sclerosis",
            "G36.0": "Neuromyelitis optica",
            "G36.8": "Other specified acute disseminated demyelination",
            "G36.9": "Acute disseminated demyelination, unspecified",
            "G37.0": "Diffuse sclerosis of central nervous system",
            "G37.3": "Acute transverse myelitis in demyelinating disease",
            "G37.9": "Demyelinating disease of central nervous system, unspecified",
        },
    },
    "G40-G47": {
        "name": "Episodic and paroxysmal disorders",
        "codes": {
            "G40.101": "Localization-related epilepsy with simple partial seizures, not intractable",
            "G40.109": "Localization-related epilepsy with simple partial seizures, intractable",
            "G40.301": "Generalized idiopathic epilepsy and epileptic syndromes, not intractable",
            "G40.309": "Generalized idiopathic epilepsy and epileptic syndromes, intractable",
            "G40.509": "Epileptic seizures related to external causes, not intractable",
            "G40.909": "Epilepsy, unspecified, not intractable",
            "G43.001": "Migraine with aura, not intractable, without status migrainosus",
            "G43.101": "Migraine without aura, not intractable, without status migrainosus",
            "G43.909": "Migraine, unspecified, not intractable",
            "G44.209": "Tension-type headache, unspecified, not intractable",
            "G44.309": "Cluster headache syndrome, unspecified, not intractable",
            "G47.00": "Insomnia, unspecified",
            "G47.01": "Insomnia due to medical condition",
            "G47.9": "Sleep disorder, unspecified",
        },
    },
    "G50-G54": {
        "name": "Nerve, nerve root and plexus disorders",
        "codes": {
            "G50.0": "Trigeminal neuralgia",
            "G51.0": "Bell palsy",
            "G51.1": "Geniculate ganglionitis",
            "G52.0": "Disorders of olfactory nerve",
            "G54.0": "Brachial plexus disorders",
            "G54.1": "Lumbosacral plexus disorders",
            "G54.2": "Cervical root disorders, not elsewhere classified",
            "G54.3": "Thoracic root disorders, not elsewhere classified",
            "G54.4": "Lumbosacral root disorders, not elsewhere classified",
        },
    },
    "G60-G65": {
        "name": "Polyneuropathies and other disorders of the peripheral nervous system",
        "codes": {
            "G60.0": "Hereditary motor and sensory neuropathy",
            "G60.8": "Other hereditary and idiopathic neuropathies",
            "G61.0": "Guillain-Barre syndrome",
            "G61.1": "Serum neuropathy",
            "G62.0": "Drug-induced polyneuropathy",
            "G62.1": "Alcoholic polyneuropathy",
            "G62.9": "Polyneuropathy, unspecified",
            "G63.2": "Diabetic polyneuropathy",
            "G64": "Other disorders of peripheral nervous system",
        },
    },
    "G70-G73": {
        "name": "Diseases of myoneural junction and muscle",
        "codes": {
            "G70.00": "Myasthenia gravis without (acute) exacerbation",
            "G70.01": "Myasthenia gravis with (acute) exacerbation",
            "G70.80": "Lambert-Eaton syndrome, unspecified",
            "G70.9": "Disorder of myoneural junction and muscle, unspecified",
            "G71.0": "Muscular dystrophy",
            "G71.1": "Myotonic disorders",
            "G72.0": "Drug-induced myopathy",
            "G72.3": "Periodic paralysis",
            "G73.1": "Myasthenic syndromes in neoplastic disease",
        },
    },
    "G80-G83": {
        "name": "Cerebral palsy and other paralytic syndromes",
        "codes": {
            "G80.0": "Spastic quadriplegic cerebral palsy",
            "G80.1": "Spastic diplegic cerebral palsy",
            "G80.2": "Spastic hemiplegic cerebral palsy",
            "G80.9": "Cerebral palsy, unspecified",
            "G81.0": "Flaccid hemiplegia",
            "G81.1": "Spastic hemiplegia",
            "G81.9": "Hemiplegia, unspecified",
            "G82.50": "Quadriplegia, unspecified",
            "G83.0": "Diplegia of upper limbs",
            "G83.1": "Monoplegia of lower limb",
            "G83.2": "Monoplegia of upper limb",
            "G83.4": "Cauda equina syndrome",
        },
    },
    "G89-G99": {
        "name": "Other disorders of the nervous system",
        "codes": {
            "G89.0": "Central pain syndrome",
            "G90.0": "Idiopathic peripheral autonomic neuropathy",
            "G90.3": "Multi-system degeneration of the autonomic nervous system",
            "G91.0": "Communicating hydrocephalus",
            "G91.2": "Normal pressure hydrocephalus",
            "G93.0": "Cerebral cyst",
            "G93.2": "Benign intracranial hypertension",
            "G93.5": "Compression of brain",
            "G95.0": "Syringomyelia and syringobulbia",
            "G95.19": "Other vascular myelopathies",
            "G95.9": "Disease of spinal cord, unspecified",
            "G97.1": "Postprocedural cerebrospinal fluid leak",
        },
    },
    "I60-I69": {
        "name": "Cerebrovascular diseases",
        "codes": {
            "I60.00": "Nontraumatic subarachnoid hemorrhage from carotid siphon and bifurcation",
            "I60.9": "Nontraumatic subarachnoid hemorrhage, unspecified",
            "I61.0": "Nontraumatic intracerebral hemorrhage in hemisphere, subcortical",
            "I61.9": "Nontraumatic intracerebral hemorrhage, unspecified",
            "I62.9": "Nontraumatic intracranial hemorrhage, unspecified",
            "I63.009": "Cerebral infarction due to thrombosis of unspecified vertebral artery",
            "I63.309": "Cerebral infarction due to thrombosis of unspecified middle cerebral artery",
            "I63.511": "Cerebral infarction due to occlusion and stenosis of left middle cerebral artery",
            "I63.512": "Cerebral infarction due to occlusion and stenosis of right middle cerebral artery",
            "I63.6": "Cerebral infarction due to cerebral venous thrombosis",
            "I63.9": "Cerebral infarction, unspecified",
            "I65.0": "Occlusion and stenosis of vertebral artery",
            "I65.1": "Occlusion and stenosis of basilar artery",
            "I65.2": "Occlusion and stenosis of carotid artery",
            "I66.0": "Occlusion and stenosis of middle cerebral artery",
            "I67.7": "Cerebral arteritis, not elsewhere classified",
            "I67.82": "Cerebral amyloid angiopathy",
            "I67.9": "Cerebrovascular disease, unspecified",
            "G45.0": "Vertebro-basilar artery syndrome",
            "G45.1": "Carotid artery syndrome (hemispheric)",
            "G45.9": "Transient cerebral ischemic attack, unspecified",
            "I69.100": "Cognitive deficits following nontraumatic intracerebral hemorrhage",
            "I69.310": "Cognitive deficits following cerebral infarction",
            "I69.320": "Hemiplegia and hemiparesis following cerebral infarction",
        },
    },
    "E00-E89": {
        "name": "Endocrine, nutritional and metabolic diseases (neurology-relevant)",
        "codes": {
            "E11.9": "Type 2 diabetes mellitus without complications",
            "E51.2": "Wernicke encephalopathy",
            "E83.01": "Wilson disease",
            "E03.9": "Hypothyroidism, unspecified",
            "E78.5": "Hyperlipidemia, unspecified",
        },
    },
    "C70-C72": {
        "name": "Neoplasms of the central nervous system",
        "codes": {
            "C71.0": "Malignant neoplasm of frontal lobe",
            "C71.1": "Malignant neoplasm of temporal lobe",
            "C71.2": "Malignant neoplasm of parietal lobe",
            "C71.3": "Malignant neoplasm of occipital lobe",
            "C71.4": "Malignant neoplasm of ventricle",
            "C71.5": "Malignant neoplasm of cerebellum",
            "C71.6": "Malignant neoplasm of brainstem",
            "C71.9": "Malignant neoplasm of brain, unspecified",
            "C72.0": "Malignant neoplasm of spinal cord",
            "D33.0": "Benign neoplasm of brain, supratentorial",
            "D33.1": "Benign neoplasm of brain, infratentorial",
            "D33.7": "Benign neoplasm of other parts of central nervous system",
            "D43.0": "Neoplasm of uncertain behavior of brain, supratentorial",
        },
    },
}

# DRGs grouping reference (MS-DRGs, simplified)
DRG_GROUPS = {
    "I63": {"drg": "061", "desc": "Ischemic Stroke w Thrombolytic", "weight": 2.5, "los": 5.8},
    "I61": {"drg": "064", "desc": "Intracranial Hemorrhage w MCC", "weight": 2.3, "los": 6.2},
    "I60": {"drg": "066", "desc": "Subarachnoid Hemorrhage w MCC", "weight": 3.1, "los": 8.5},
    "G45": {"drg": "069", "desc": "Transient Ischemic Attack w MCC", "weight": 1.2, "los": 2.8},
    "G40": {"drg": "101", "desc": "Seizures w MCC", "weight": 1.5, "los": 3.5},
    "G43": {"drg": "102", "desc": "Headache Disorders w MCC", "weight": 0.9, "los": 2.0},
    "G20": {"drg": "095", "desc": "Parkinson Disease w MCC", "weight": 1.6, "los": 4.2},
    "G35": {"drg": "097", "desc": "Multiple Sclerosis w MCC", "weight": 1.8, "los": 5.0},
    "G30": {"drg": "055", "desc": "Alzheimer/Dementia w MCC", "weight": 1.3, "los": 4.8},
    "G61": {"drg": "091", "desc": "Guillain-Barre Syndrome w MCC", "weight": 2.0, "los": 7.5},
    "G70": {"drg": "092", "desc": "Myasthenia Gravis w MCC", "weight": 1.7, "los": 5.2},
    "G03": {"drg": "088", "desc": "Meningitis w MCC", "weight": 2.4, "los": 7.0},
    "G04": {"drg": "089", "desc": "Encephalitis w MCC", "weight": 2.6, "los": 8.0},
    "C71": {"drg": "054", "desc": "Brain Tumor w MCC", "weight": 3.5, "los": 9.0},
    "G51": {"drg": "073", "desc": "Cranial Nerve Disorders w MCC", "weight": 1.0, "los": 2.5},
    "G64": {"drg": "099", "desc": "Peripheral Neuropathy w MCC", "weight": 1.2, "los": 3.8},
    "G12": {"drg": "003", "desc": "ALS/Motor Neuron Disease w MCC", "weight": 2.0, "los": 6.0},
    "G25": {"drg": "096", "desc": "Movement Disorders w MCC", "weight": 1.1, "los": 3.0},
    "G10": {"drg": "096", "desc": "Huntington Disease w MCC", "weight": 1.8, "los": 5.5},
    "G91": {"drg": "056", "desc": "Hydrocephalus w MCC", "weight": 1.9, "los": 5.0},
    "G95": {"drg": "057", "desc": "Spinal Cord Disorders w MCC", "weight": 2.1, "los": 6.5},
    "E83": {"drg": "098", "desc": "Wilson Disease w MCC", "weight": 1.4, "los": 4.0},
}


def lookup_icd10(code: str) -> dict | None:
    """Look up an ICD-10 code in the database."""
    for category, info in ICD10_DATABASE.items():
        if code in info["codes"]:
            return {
                "code": code,
                "description": info["codes"][code],
                "category": info["name"],
            }
    return None


def search_icd10_by_text(text: str) -> list[dict]:
    """Search ICD-10 codes by description text (simple keyword matching)."""
    text_lower = text.lower()
    results = []
    for category, info in ICD10_DATABASE.items():
        for code, desc in info["codes"].items():
            if text_lower in desc.lower():
                results.append({
                    "code": code,
                    "description": desc,
                    "category": info["name"],
                })
    return results


def get_drg_group(icd10_code: str) -> dict | None:
    """Get DRGs grouping for a given ICD-10 code prefix."""
    prefix = icd10_code.split(".")[0] if "." in icd10_code else icd10_code[:3]
    drg = DRG_GROUPS.get(prefix)
    if drg:
        return {
            "drg_code": drg["drg"],
            "description": drg["desc"],
            "weight": drg["weight"],
            "mean_los": drg["los"],
        }
    return None


def validate_icd10_code(code: str) -> bool:
    """Check if an ICD-10 code exists in our database."""
    return lookup_icd10(code) is not None
