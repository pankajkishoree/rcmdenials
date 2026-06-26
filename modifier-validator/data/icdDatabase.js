var ICD_DATABASE = [
  { code: "I10", name: "Essential (Primary) Hypertension", category: "Circulatory", description: "High blood pressure without identified cause." },
  { code: "E11.9", name: "Type 2 Diabetes Mellitus", category: "Endocrine", description: "Type 2 diabetes without complications." },
  { code: "E11.65", name: "Type 2 DM with Hyperglycemia", category: "Endocrine", description: "Type 2 diabetes with elevated blood sugar." },
  { code: "E78.5", name: "Hyperlipidemia, Unspecified", category: "Endocrine", description: "Elevated lipids in the blood." },
  { code: "J02.9", name: "Acute Pharyngitis, Unspecified", category: "Respiratory", description: "Sore throat, unspecified organism." },
  { code: "J06.9", name: "Acute Upper Respiratory Infection", category: "Respiratory", description: "Common cold or upper respiratory infection." },
  { code: "J18.9", name: "Pneumonia, Unspecified", category: "Respiratory", description: "Lung infection, unspecified organism." },
  { code: "J44.1", name: "COPD with Acute Exacerbation", category: "Respiratory", description: "Chronic obstructive pulmonary disease with worsening symptoms." },
  { code: "J45.20", name: "Mild Intermittent Asthma", category: "Respiratory", description: "Mild asthma with intermittent symptoms." },
  { code: "M54.5", name: "Low Back Pain", category: "Musculoskeletal", description: "Pain in the lumbar region of the spine." },
  { code: "M54.2", name: "Cervicalgia (Neck Pain)", category: "Musculoskeletal", description: "Pain in the neck region." },
  { code: "M17.11", name: "Primary Osteoarthritis, Right Knee", category: "Musculoskeletal", description: "Wear-and-tear arthritis of the right knee." },
  { code: "M17.12", name: "Primary Osteoarthritis, Left Knee", category: "Musculoskeletal", description: "Wear-and-tear arthritis of the left knee." },
  { code: "M75.10", name: "Rotator Cuff Syndrome, Unspecified Shoulder", category: "Musculoskeletal", description: "Shoulder rotator cuff disorder." },
  { code: "E03.9", name: "Hypothyroidism, Unspecified", category: "Endocrine", description: "Underactive thyroid gland." },
  { code: "F32.1", name: "Major Depressive Disorder, Single Episode, Moderate", category: "Mental", description: "Moderate depression, single episode." },
  { code: "F41.1", name: "Generalized Anxiety Disorder", category: "Mental", description: "Excessive worry and anxiety." },
  { code: "F41.0", name: "Panic Disorder", category: "Mental", description: "Recurrent panic attacks." },
  { code: "G43.909", name: "Migraine, Unspecified", category: "Neurological", description: "Migraine headache, not further specified." },
  { code: "R51.9", name: "Headache, Unspecified", category: "Symptoms", description: "General headache without specific diagnosis." },
  { code: "K21.0", name: "GERD with Esophagitis", category: "Digestive", description: "Gastroesophageal reflux disease with inflammation." },
  { code: "K58.9", name: "Irritable Bowel Syndrome", category: "Digestive", description: "IBS without diarrhea or constipation." },
  { code: "N39.0", name: "Urinary Tract Infection", category: "Genitourinary", description: "Infection of the urinary system." },
  { code: "N18.3", name: "Chronic Kidney Disease, Stage 3", category: "Genitourinary", description: "Moderate chronic kidney disease." },
  { code: "N18.4", name: "Chronic Kidney Disease, Stage 4", category: "Genitourinary", description: "Severe chronic kidney disease." },
  { code: "E03.9", name: "Hypothyroidism", category: "Endocrine", description: "Underactive thyroid." },
  { code: "I25.10", name: "Coronary Artery Disease", category: "Circulatory", description: "Atherosclerotic heart disease." },
  { code: "I48.91", name: "Atrial Fibrillation", category: "Circulatory", description: "Irregular heart rhythm." },
  { code: "I50.9", name: "Heart Failure, Unspecified", category: "Circulatory", description: "Heart not pumping efficiently." },
  { code: "D64.9", name: "Anemia, Unspecified", category: "Blood", description: "Low red blood cell count." },
  { code: "R05.9", name: "Cough, Unspecified", category: "Symptoms", description: "Cough without identified cause." },
  { code: "R50.9", name: "Fever, Unspecified", category: "Symptoms", description: "Elevated body temperature." },
  { code: "Z00.00", name: "General Adult Medical Exam", category: "Preventive", description: "Routine general medical examination." },
  { code: "Z23", name: "Encounter for Immunization", category: "Preventive", description: "Patient receiving vaccination." },
  { code: "Z71.3", name: "Dietary Counseling", category: "Preventive", description: "Counseling for nutritional management." },
  { code: "Z71.89", name: "Other Specified Counseling", category: "Preventive", description: "Other preventive counseling." },
  { code: "M79.3", name: "Panniculitis, Unspecified", category: "Musculoskeletal", description: "Inflammation of subcutaneous fat." },
  { code: "S80.01XA", name: "Contusion of Right Knee", category: "Injury", description: "Bruise of the right knee, initial encounter." },
  { code: "S80.02XA", name: "Contusion of Left Knee", category: "Injury", description: "Bruise of the left knee, initial encounter." },
  { code: "T78.2XXA", name: "Anaphylactic Shock", category: "Injury", description: "Severe allergic reaction, initial encounter." }
];

var ICD_CPT_COMPATIBILITY = {
  "E&M": {
    "I10": { status: "likely", notes: "Hypertension commonly managed with office visits." },
    "E11.9": { status: "likely", notes: "Diabetes management requires regular office visits." },
    "E11.65": { status: "likely", notes: "Hyperglycemia management." },
    "E78.5": { status: "likely", notes: "Lipid disorders managed with office visits." },
    "J02.9": { status: "likely", notes: "Pharyngitis evaluation with E&M." },
    "J06.9": { status: "likely", notes: "URI evaluation." },
    "M54.5": { status: "likely", notes: "Low back pain evaluation." },
    "M54.2": { status: "likely", notes: "Neck pain evaluation." },
    "F32.1": { status: "likely", notes: "Depression managed with E&M visits." },
    "F41.1": { status: "likely", notes: "Anxiety managed with office visits." },
    "F41.0": { status: "likely", notes: "Panic disorder managed with visits." },
    "N39.0": { status: "likely", notes: "UTI evaluation." },
    "R51.9": { status: "likely", notes: "Headache evaluation." },
    "R05.9": { status: "likely", notes: "Cough evaluation." },
    "R50.9": { status: "likely", notes: "Fever evaluation." },
    "Z00.00": { status: "likely", notes: "Preventive visit matches E&M." }
  },
  "Cardiology": {
    "I10": { status: "likely", notes: "Hypertension - cardiac testing indicated." },
    "I25.10": { status: "likely", notes: "CAD - cardiac testing indicated." },
    "I48.91": { status: "likely", notes: "AFib - cardiac testing indicated." },
    "I50.9": { status: "likely", notes: "Heart failure - cardiac testing indicated." },
    "E11.9": { status: "likely", notes: "Diabetes - cardiovascular risk factor." }
  },
  "Lab": {
    "E11.9": { status: "likely", notes: "Diabetes - lab monitoring indicated." },
    "E11.65": { status: "likely", notes: "Hyperglycemia - lab monitoring needed." },
    "E78.5": { status: "likely", notes: "Lipid disorder - lipid panel indicated." },
    "N18.3": { status: "likely", notes: "CKD - renal function monitoring." },
    "N18.4": { status: "likely", notes: "CKD - renal function monitoring." },
    "D64.9": { status: "likely", notes: "Anemia - CBC indicated." },
    "N39.0": { status: "likely", notes: "UTI - urinalysis indicated." }
  },
  "Procedures": {
    "M54.5": { status: "likely", notes: "Low back pain - injection procedures may be indicated." },
    "M54.2": { status: "likely", notes: "Neck pain - injection procedures may be indicated." },
    "M75.10": { status: "likely", notes: "Rotator cuff - injection procedures indicated." },
    "M17.11": { status: "likely", notes: "Knee OA - injection procedures indicated." },
    "M17.12": { status: "likely", notes: "Knee OA - injection procedures indicated." }
  },
  "Rehab": {
    "M54.5": { status: "likely", notes: "Low back pain - physical therapy indicated." },
    "M54.2": { status: "likely", notes: "Neck pain - physical therapy indicated." },
    "M75.10": { status: "likely", notes: "Rotator cuff - rehab indicated." },
    "M17.11": { status: "likely", notes: "Knee OA - rehab indicated." },
    "M17.12": { status: "likely", notes: "Knee OA - rehab indicated." }
  },
  "Psych": {
    "F32.1": { status: "likely", notes: "Depression - psychotherapy indicated." },
    "F41.1": { status: "likely", notes: "Anxiety - psychotherapy indicated." },
    "F41.0": { status: "likely", notes: "Panic disorder - psychotherapy indicated." }
  },
  "Preventive": {
    "Z00.00": { status: "likely", notes: "Preventive visit matches preventive CPT." },
    "Z23": { status: "likely", notes: "Immunization encounter matches vaccine CPT." },
    "I10": { status: "likely", notes: "Hypertension managed at preventive visits." },
    "E11.9": { status: "likely", notes: "Diabetes managed at preventive visits." }
  }
};
