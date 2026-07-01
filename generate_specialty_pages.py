#!/usr/bin/env python3
"""
Specialty CPT Page Generator — Upgraded (2026)
Generates 20 advanced specialty pages with:
  - Specialty Overview 4-card grid
  - Advanced 7-column CPT table with live search
  - Modifier Intelligence cards (SVG icons, accordion)
  - Denial Prevention Hub (top 5 causes, risky combos, doc checklist)
  - Compliance & Payer Rules grid
  - FAQ accordion with FAQPage schema
  - Subtle CTA tools strip
  - MedicalWebPage + FAQPage + BreadcrumbList schema
  - Fixed: no broken emoji icons, no ? encoding artifacts

Run: python generate_specialty_pages.py
"""
import os
from pathlib import Path

OUT_DIR = Path(__file__).parent / "specialties"
TODAY_FMT = "July 2026"

# ─────────────────────────────────────────────────────────────────────────────
# SHARED MODIFIER LIBRARY
# ─────────────────────────────────────────────────────────────────────────────
def mod(code, name, use, avoid, doc, warn):
    return {"code": code, "name": name, "use": use, "avoid": avoid, "doc": doc, "warn": warn}

COMMON_MODIFIERS = {
    "26": mod("26","Professional Component",
        "When physician reads/interprets a diagnostic test performed at a hospital or independent facility; split-billing scenarios",
        "When physician owns AND operates the equipment in their own office -- bill global instead",
        "Written interpretation/report signed by interpreting physician; facility ownership documented",
        "Payers audit 26/TC split -- ensure facility bills TC and physician bills 26; never both on same claim"),
    "TC": mod("TC","Technical Component",
        "When facility performs the diagnostic test but physician is not reading it; equipment and staff costs only",
        "When billing in a physician office where the global service is provided",
        "Evidence of equipment ownership, technician credentials, and service location",
        "Medicare restricts TC billing to specific provider types; verify facility enrollment status"),
    "59": mod("59","Distinct Procedural Service",
        "When two procedures are performed at different anatomic sites, different sessions, or are otherwise distinct despite NCCI bundling",
        "As a routine unbundling tool -- it must represent a truly separate and distinct service",
        "Separate operative notes, anatomic site documentation, and distinct clinical indication for each service",
        "CMS prefers X-modifiers (XE,XP,XS,XU) over 59; confirm payer preference. Overuse triggers RAC audits"),
    "25": mod("25","Significant Separate E/M on Procedure Day",
        "When a separately identifiable E/M service is provided on the same day as a minor procedure (0 or 10 global day)",
        "With major surgery (90-day global) -- E/M is bundled unless new unrelated problem arises",
        "Documentation must show the E/M was above and beyond pre/post-procedure care; distinct chief complaint",
        "Most-audited modifier in all specialties; must show E/M was medically necessary and separate"),
    "76": mod("76","Repeat Procedure by Same Physician",
        "When the same procedure is repeated on the same day by the same physician",
        "For procedures by a different physician on the same day -- use modifier 77 instead",
        "Separate documentation for each occurrence explaining medical necessity for repeat",
        "Always include notes explaining why repeat was necessary"),
    "51": mod("51","Multiple Procedures",
        "When multiple distinct procedures are performed in the same session",
        "With add-on codes (already exempt from 51) or 51-exempt codes",
        "Operative report listing all procedures and medical necessity for each",
        "List procedures from highest to lowest RVU; payer applies 50% reduction to additional procedures"),
    "50": mod("50","Bilateral Procedure",
        "When the identical procedure is performed on both sides of the body in the same session",
        "When procedures differ between sides, or when code description already implies bilateral",
        "Operative report specifying bilateral performance; separate documentation for each side",
        "Some payers require two line items with RT and LT instead of one line with 50; verify payer policy"),
    "22": mod("22","Increased Procedural Services",
        "When the work required is substantially greater than typically required (more than 25% additional work)",
        "For routine cases -- must be genuinely unusual circumstances, not just a difficult patient",
        "Detailed operative note documenting specifically what made the case substantially more difficult",
        "Submit with supporting documentation; payer will review; expect possible payment reduction without proof"),
    "LT": mod("LT","Left Side",
        "For all unilateral procedures performed on the left side of the body",
        "When bilateral procedure performed in same session -- use modifier 50 or two lines",
        "Procedure note documenting left-side treatment/examination",
        "Never omit laterality for paired structures -- triggers automatic payer edits"),
    "RT": mod("RT","Right Side",
        "For all unilateral procedures performed on the right side of the body",
        "When bilateral procedure performed in same session -- use modifier 50 or two lines",
        "Procedure note documenting right-side treatment/examination",
        "Missing laterality is a leading cause of edits and underpayment in specialties with paired organs"),
    "78": mod("78","Return to OR, Related Procedure in Global Period",
        "When a related complication requires return to OR during the 90-day global period",
        "For unrelated procedures during global period -- use modifier 79 instead",
        "Operative note documenting complication and its relationship to original surgery",
        "Payment is reduced -- only intraoperative portion paid; pre/post-op care included in original global"),
    "79": mod("79","Unrelated Procedure During Global Period",
        "When an unrelated surgical procedure is performed during the global period of a previous surgery",
        "For complications of the original surgery -- use modifier 78 instead",
        "Documentation clearly establishing the new procedure is unrelated to the original surgery",
        "Full payment applies; include in claim notes: unrelated to original procedure"),
    "80": mod("80","Assistant Surgeon",
        "When a second surgeon (MD/DO) assists the primary surgeon during a procedure",
        "When a PA or NP assists -- use modifier AS instead",
        "Operative report documenting assistant's participation; both surgeons document their role",
        "Medicare pays ~16% of fee schedule for assistant; many procedures deny AS without prior auth"),
    "AI": mod("AI","Principal Physician of Record",
        "When billing initial hospital care (99221-99223) as the admitting physician of record",
        "For subsequent hospital care by admitting physician -- AI not required on follow-up",
        "Admission orders signed by physician; H&P documented within 24 hours of admission",
        "Ensures correct payment hierarchy when multiple physicians bill on same day of admission"),
    "KX": mod("KX","Requirements Met / Therapy Cap Exception",
        "When Medicare therapy cap is exceeded and services are medically necessary beyond the threshold; also used to indicate LCD criteria met",
        "When therapy is below the annual cap or LCD criteria are not documented",
        "Documentation in medical record supporting medical necessity beyond cap; LCD criteria checklist",
        "Medicare therapy cap thresholds change annually; track per-patient utilization"),
    "GP": mod("GP","Physical Therapy Plan of Care",
        "Required on all physical therapy claims to indicate services are provided under an established PT plan of care",
        "For occupational therapy (GO) or speech-language pathology (GN) services",
        "Signed PT plan of care in medical record; physician certification if required",
        "Missing GP modifier causes claim rejection for all PT services billed to Medicare"),
    "33": mod("33","Preventive Service",
        "When a preventive service is billed and no cost-share applies under ACA (USPSTF Grade A or B)",
        "For diagnostic services -- modifier 33 is for preventive services only",
        "Documentation of preventive service indication and ACA-mandated screening criteria",
        "Incorrect use of 33 for diagnostic services triggers overpayment. Verify USPSTF grade"),
    "GW": mod("GW","Hospice -- Service Not Related to Terminal Condition",
        "When providing non-hospice-related services to a patient under hospice election",
        "When the service IS related to the terminal condition -- those are covered by hospice benefit",
        "Documentation clearly establishing service is unrelated to the hospice diagnosis",
        "Failing to use GW for non-related services results in denial; hospice covers all related care"),
    "JW": mod("JW","Drug Amount Discarded",
        "When a portion of a single-dose vial is discarded -- Medicare requires reporting discarded amounts",
        "When the entire vial is used -- do not append JW if there is no waste",
        "Amount administered and amount wasted documented; vial size on file",
        "JW is required by Medicare for waste reporting; failure to report can constitute fraud"),
    "JZ": mod("JZ","No Drug Discarded",
        "When the entire single-dose vial is administered to the patient with no waste",
        "When any portion of the vial is discarded -- use JW for the waste line",
        "Documentation confirming exact dose administered equals full vial contents",
        "JZ was introduced by CMS to improve drug waste reporting accuracy alongside JW"),
    "53": mod("53","Discontinued Procedure",
        "When a planned procedure is discontinued due to medical necessity before completion",
        "When the procedure is fully completed",
        "Documentation of reason for termination and what was completed before discontinuation",
        "Reimbursement is reduced; document clearly in procedure note why scope was withdrawn early"),
    "HF": mod("HF","Substance Abuse Program",
        "When psychiatric/behavioral health services are provided within a substance abuse program",
        "For general outpatient psychiatric services not within a substance abuse program",
        "Enrollment in substance abuse treatment program; service delivery within program",
        "Medicaid-specific in many states; verify state Medicaid coverage and program enrollment requirements"),
    "GT": mod("GT","Via Interactive Audio and Video",
        "For telehealth services using real-time two-way audio-video communication",
        "For store-and-forward asynchronous telehealth (use GQ modifier)",
        "Telehealth platform compliance (HIPAA), patient location documented, technology used",
        "Check payer telehealth coverage -- some payers restrict to specific originating sites"),
    "GG": mod("GG","Performance/Payment of Screening Mammogram",
        "When a screening mammogram is converted to a diagnostic mammogram during the same session",
        "For standard screening (use TC only) or purely diagnostic mammograms (use 77065/77066)",
        "Documentation of findings discovered during screening that prompted additional diagnostic views",
        "Medicare-specific modifier; converts screening payment to diagnostic; patient cost-share changes"),
    "EP": mod("EP","EPSDT Service",
        "When Medicaid EPSDT services are provided to eligible children",
        "For commercial insurance or Medicare -- EP is Medicaid-specific",
        "Medicaid enrollment confirmation and EPSDT eligibility; age-appropriate screening documentation",
        "Required by many state Medicaid programs for well-child visits"),
    "GY": mod("GY","Item/Service Statutorily Excluded",
        "When billing a non-covered service to Medicare for denial documentation for secondary payer billing",
        "As a routine billing modifier -- GY services will be denied by Medicare by design",
        "Clinical documentation of service performed; non-covered status verified",
        "Used primarily to generate Medicare denial for secondary insurance or patient billing"),
    "GQ": mod("GQ","Via Asynchronous Telecommunications",
        "For telehealth store-and-forward services where images/data are transmitted without real-time interaction",
        "For real-time interactive audio-video visits (use GT instead)",
        "Telehealth service documentation and platform compliance records",
        "ED telehealth is limited; verify state laws and payer coverage"),
}

# ─────────────────────────────────────────────────────────────────────────────
# SPECIALTY DATA DICTIONARY
# ─────────────────────────────────────────────────────────────────────────────
SPECIALTIES = []

# Each CPT tuple: (code, description, category, global_days, modifiers_csv, doc_tip, denial_risk, _unused)
# Categories: Diagnostic | Surgical | E&M | Imaging | Therapy | Preventive
# Denial Risk: High | Medium | Low

SPECIALTIES.append({
    "slug":"cardiology","name":"Cardiology","emoji":"<3",
    "meta_title":"Cardiology CPT Codes & Billing Guide 2026",
    "meta_desc":"Cardiology CPT codes, billing guidelines, modifier usage, denial prevention, and compliance rules for billing teams and medical coders.",
    "keywords":"cardiology CPT codes, cardiology billing guidelines, cardiac modifiers, cardiology denial prevention, ECG CPT billing",
    "overview":{
        "coverage":["Diagnostic cardiac testing","Interventional cardiology","Electrophysiology","Cardiac imaging","Heart failure management"],
        "services":["ECG/EKG (12-lead)","Echocardiography (TTE/TEE)","Stress testing","Cardiac catheterization","Holter monitoring","Nuclear cardiology"],
        "denials":["Medical necessity for imaging","Modifier 26/TC split errors","NCCI bundling (ECG + stress test)","Missing prior auth for cath/MRI"],
        "scrutiny":["Echo frequency (1/year limit)","Nuclear stress test necessity","Catheterization without failed conservative therapy","Routine ECG screening denials"]
    },
    "cpts":[
        ("93000","ECG 12-lead w/ interpretation and report","Diagnostic","0","26,TC","Signed interpretation report required","High",""),
        ("93005","ECG 12-lead, recording only","Diagnostic","0","TC","Technical component only; facility use","Low",""),
        ("93010","ECG 12-lead, interpretation only","Diagnostic","0","26","Professional read without equipment","Low",""),
        ("93015","Cardiovascular stress test, complete","Diagnostic","0","26,TC","Document target HR, protocol, clinical indication","High",""),
        ("93306","TTE complete w/ Doppler and imaging","Diagnostic","0","26,TC,59","Clinical indication required; LCD L37400","High",""),
        ("93307","TTE complete without Doppler","Diagnostic","0","26,TC","Use 93306 when Doppler performed","Medium",""),
        ("93308","TTE follow-up or limited","Diagnostic","0","26,TC","Document why limited vs complete","Medium",""),
        ("93315","Transesophageal echo (TEE) complete","Diagnostic","0","26,TC","Requires physician supervision; procedure note","High",""),
        ("93350","TTE stress echo with Doppler","Diagnostic","0","26,TC,59","Exercise protocol and HR documentation required","High",""),
        ("93458","Left heart catheterization","Surgical","0","26,TC","Failed conservative therapy documentation required","High",""),
        ("93224","External ECG recording >48hrs-7 days","Diagnostic","0","26,TC","Hook-up note plus interpretation report","Medium",""),
        ("99213","Office visit, established, moderate complexity","E&M","0","25","Must document MDM or time if billing with procedure","Medium",""),
        ("99214","Office visit, established, high complexity","E&M","0","25","Detailed history, exam, high MDM required","Medium",""),
    ],
    "icd10":[
        ("I25.10","Atherosclerotic heart disease, no angina"),("I25.11","Atherosclerotic heart disease with angina"),
        ("I48.0","Paroxysmal atrial fibrillation"),("I48.91","Unspecified atrial fibrillation"),
        ("I50.9","Heart failure, unspecified"),("I10","Essential hypertension"),
        ("I20.0","Unstable angina"),("I21.4","Acute NSTEMI"),
        ("I44.2","Complete atrioventricular block"),("I49.5","Sick sinus syndrome"),
    ],
    "modifiers":["26","TC","59","25","76","51"],
    "spec_modifiers":{},
    "denial_top5":[
        "Medical necessity not established for echocardiography (missing clinical indication)",
        "NCCI bundling -- ECG (93000) billed with stress test (93015) on same date",
        "Missing modifier 26/TC split when provider and facility bill same service",
        "Lack of prior authorization for nuclear stress testing or cardiac MRI",
        "Incorrect ICD-10 specificity -- I25.1 used instead of I25.10 or I25.11",
    ],
    "risky_combos":[
        ("93000 + 93015","ECG bundled into stress test -- bill 93015 only"),
        ("93306 + 93307","Complete echo is mutually exclusive -- bill one"),
        ("93306 + 93321","Color Doppler (93321) is add-on; cannot replace 93306"),
        ("99213 + 93000 (no 25)","E/M without modifier 25 when ECG also billed"),
        ("93458 + 93459","Left cath is component of 93459 -- bill highest level only"),
    ],
    "doc_checklist":[
        "Physician order with clinical indication for cardiac testing",
        "Complete clinical history: symptoms, prior cardiac history, medications",
        "Resting 12-lead ECG with signed interpretation and report",
        "Stress test protocol with target heart rate achievement documented",
        "Cardiac catheterization report with contrast used and findings",
        "Prior conservative treatment failure before invasive procedures",
        "Risk factor assessment: HTN, DM, smoking, family history",
        "ACC/AHA appropriate use criteria documentation for imaging",
    ],
    "compliance":[
        ("medicare","NCD 20.15","Cardiac catheterization requires symptoms or abnormal non-invasive testing"),
        ("medicare","LCD L37400","Echocardiography: clinical indication beyond routine screening required"),
        ("commercial","UHC","Requires prior auth for nuclear stress testing and cardiac MRI"),
        ("commercial","Aetna","Follows ACC/AHA appropriate use criteria for cardiac procedures"),
        ("prior-auth","Cardiac Cath","Medicare Advantage plans commonly require prior auth"),
        ("prior-auth","Cardiac MRI","Prior auth almost universally required by all payer types"),
        ("frequency","Echo Frequency","Most payers limit echocardiograms to 1 per year without new symptoms"),
        ("frequency","Holter Monitoring","Frequency limits apply; document new clinical indication for repeat"),
    ],
    "faq":[
        ("What ICD-10 code supports medical necessity for echocardiography?",
         "Common supporting diagnoses include I50.9 (heart failure), I48.0 (paroxysmal AFib), I25.11 (CAD with angina), and I10 (hypertension with cardiac involvement). The diagnosis must reflect an active clinical need beyond routine screening per LCD L37400."),
        ("When should modifier 26 vs TC be used for cardiology procedures?",
         "Use modifier 26 when the physician provides only the professional interpretation (e.g., reads the echo at a hospital). Use TC when the facility provides only the equipment and staff. Bill global (no modifier) only when the physician owns and operates the equipment in their own office."),
        ("Is prior authorization required for cardiac catheterization?",
         "Medicare fee-for-service generally does not require prior auth for cardiac cath, but Medicare Advantage, UHC, Aetna, BCBS, and most commercial plans do. Always verify with the specific plan before scheduling the procedure."),
        ("Can ECG (93000) be billed with a stress test (93015) on the same day?",
         "No -- ECG is bundled within the stress test code per NCCI edits. Billing 93000 and 93015 together will trigger a denial. Bill 93015 for the complete stress test; ECG is included."),
        ("What documentation is required for echocardiography to pass medical review?",
         "Per LCD L37400, documentation must include the specific clinical indication (symptoms, physical findings, or abnormal test results), the physician order, and a signed interpretation report. Routine screening without clinical indication is non-covered."),
    ],
    "examples":[
        ("Stress Echo for Chest Pain","93350 (TTE stress echo)",["I20.0 (Unstable angina)"],["26"],
         "Patient with exertional chest pain, resting ECG with ST changes. Stress echo ordered per ACC/AHA guidelines. Physician bills modifier 26 since echo performed at hospital facility."),
        ("Outpatient Cardiac Catheterization","93458 (Left heart cath)",["I21.4 (NSTEMI)"],["26","TC"],
         "NSTEMI patient taken for urgent cath. Hospital bills TC; cardiologist bills 26 for professional interpretation. Left heart cath documented in full procedure note."),
        ("Holter Monitor for AFib","93224 (External ECG >48hrs)",["I48.91 (Unspecified AFib)"],["26"],
         "Patient with palpitations and intermittent AFib on routine ECG. 48-hour Holter ordered. Results confirm paroxysmal AFib burden requiring anticoagulation decision."),
    ],
})

SPECIALTIES.append({
    "slug":"dermatology","name":"Dermatology","emoji":"[microscope]",
    "meta_title":"Dermatology CPT Codes & Billing Guide 2026",
    "meta_desc":"Dermatology CPT codes, Mohs surgery billing, skin biopsy modifiers, denial prevention, and payer rules for coders and billing teams.",
    "keywords":"dermatology CPT codes, skin biopsy billing, Mohs surgery CPT, dermatology modifiers, dermatology denial prevention",
    "overview":{
        "coverage":["Skin lesion diagnosis and treatment","Surgical excision of malignancies","Mohs micrographic surgery","Phototherapy and laser treatment","Cosmetic vs medical procedures"],
        "services":["Skin biopsy (shave, punch, incisional)","Benign and malignant lesion excision","Mohs micrographic surgery","Cryotherapy","Photodynamic therapy","Acne treatment procedures"],
        "denials":["Cosmetic vs medically necessary distinction","Lesion size and measurement documentation","Biopsy pathology not correlating with excision code","Concurrent E/M without modifier 25"],
        "scrutiny":["Mohs stage accuracy and documentation","Lesion diameter measurement for excision code selection","Multiple lesions billed same day","Phototherapy frequency limits"]
    },
    "cpts":[
        ("11100","Skin biopsy, single lesion","Surgical","0","59,LT,RT","Document site, size, technique (shave/punch/incisional)","High",""),
        ("11101","Skin biopsy, each additional lesion","Surgical","0","59","Add-on to 11100; list each anatomic site","Medium",""),
        ("11200","Removal of skin tags, up to 15 lesions","Surgical","0","","Document medical necessity vs cosmetic","High",""),
        ("11400","Excision benign lesion, trunk, 0.5 cm or less","Surgical","0","LT,RT","Diameter includes margins; pathology required","Medium",""),
        ("11600","Excision malignant lesion, trunk, 0.5 cm or less","Surgical","0","LT,RT","Pathology confirming malignancy required","High",""),
        ("17000","Destruction premalignant lesion, 1st","Surgical","0","","Clinical documentation of actinic keratosis required","Medium",""),
        ("17003","Destruction premalignant lesions, 2-14 each","Surgical","0","","Add-on to 17000; count lesions accurately","Medium",""),
        ("17110","Destruction benign lesions, up to 14","Surgical","0","","Cannot bill with 17000 for same lesion type","Medium",""),
        ("17311","Mohs surgery, trunk/extremity, 1st stage","Surgical","0","LT,RT","Mohs surgeon must perform both surgery and pathology","High",""),
        ("17312","Mohs surgery, trunk/extremity, each additional stage","Surgical","0","LT,RT","Add-on; separate documentation per stage","High",""),
        ("96910","Photochemotherapy with psoralen (PUVA)","Therapy","0","","Diagnosis must support phototherapy indication","Medium",""),
        ("99213","Office visit, established, moderate complexity","E&M","0","25","Document separately when E/M beyond lesion evaluation","Medium",""),
        ("99214","Office visit, established, high complexity","E&M","0","25","High MDM or 40 minutes face-to-face time","Medium",""),
    ],
    "icd10":[
        ("C44.91","Unspecified malignant neoplasm of skin"),("C43.9","Malignant melanoma, unspecified"),
        ("L57.0","Actinic keratosis"),("L70.0","Acne vulgaris"),
        ("L40.0","Psoriasis vulgaris"),("L20.9","Atopic dermatitis, unspecified"),
        ("B07.9","Viral wart, unspecified"),("L72.0","Epidermoid cyst"),
        ("D22.9","Melanocytic nevi, unspecified"),("L98.9","Disorder of skin, unspecified"),
    ],
    "modifiers":["25","59","LT","RT","51","22"],
    "spec_modifiers":{},
    "denial_top5":[
        "Cosmetic vs medically necessary -- skin tag removal without documented functional impairment",
        "Lesion size documentation missing -- excision code selection depends on exact diameter in cm",
        "Modifier 25 missing when E/M billed same day as lesion procedure",
        "Pathology not supporting excision code -- shave biopsy coded as excision",
        "Mohs stage count mismatch between operative note and claim",
    ],
    "risky_combos":[
        ("11100 + 17000","Biopsy and destruction of same lesion same day -- mutually exclusive"),
        ("11400 + 11600","Benign and malignant excision codes for same lesion -- use malignant only"),
        ("17311 + 17312 x4+","Excessive Mohs stages trigger medical review -- document each stage"),
        ("99213 + 11100 (no 25)","E/M bundled into procedure without modifier 25"),
        ("11200 (cosmetic)","Skin tag removal billed without functional impairment documentation"),
    ],
    "doc_checklist":[
        "Lesion description: location, size (diameter in cm including margins), color, morphology",
        "Pathology report correlating with CPT code selected (benign vs malignant)",
        "Clinical photographs for lesions requiring medical necessity justification",
        "Mohs operative note: each stage, tissue map, margins, frozen section results",
        "Patient consent documenting medical vs cosmetic indication",
        "E/M note separate from procedure note when billing modifier 25",
        "Physician order and clinical indication for phototherapy",
        "Prior treatment failure documentation for acne/psoriasis biologics",
    ],
    "compliance":[
        ("medicare","LCD L34041","Skin biopsy: malignancy or pre-malignancy must be clinically suspected"),
        ("medicare","LCD L34958","Mohs surgery: must be performed by same surgeon doing pathology interpretation"),
        ("commercial","BCBS","Skin tag removal requires documented functional impairment or infection"),
        ("commercial","Cigna","Phototherapy frequency limited; prior auth after 20 sessions"),
        ("prior-auth","Biologic agents","Systemic treatments for psoriasis require prior auth with step therapy"),
        ("prior-auth","Laser therapy","Most cosmetic laser procedures non-covered; medical laser needs auth"),
        ("frequency","Skin cancer screens","Annual full-body skin exam covered for high-risk patients only"),
        ("frequency","Phototherapy","PUVA/NB-UVB sessions typically limited to 30 per year without review"),
    ],
    "faq":[
        ("How is the excision code selected for skin lesions?",
         "The code is based on the widest diameter of the lesion PLUS the narrowest margin required for complete excision. Document the measurement in centimeters in the operative note. For example, a 0.8 cm lesion with 0.2 cm margins = 1.0 cm total, selecting the 0.6-1.0 cm code range."),
        ("What documentation prevents cosmetic denial for skin tag removal?",
         "Document functional impairment (e.g., tags catching on clothing causing bleeding, pain, or infection), or a diagnosed medical condition causing the tags. Without this, payers classify removal as cosmetic and deny the claim."),
        ("Can I bill E/M the same day as a skin biopsy?",
         "Yes, but only with modifier 25. The E/M must be a separately identifiable, significant service beyond the pre/post-procedure care. Document a distinct chief complaint and separate assessment in the E/M note."),
        ("What makes Mohs surgery claims high-risk for audit?",
         "High stage counts (more than 3 stages), billing multiple Mohs codes for the same tumor without complete documentation of each stage, or billing by a surgeon who did not perform the pathological interpretation. Each stage must have a complete tissue map and frozen section documentation."),
        ("Is phototherapy (PUVA) covered by Medicare?",
         "Medicare covers PUVA and narrow-band UVB for medically indicated skin conditions like psoriasis, eczema, and vitiligo when topical treatments have failed. Documentation must show prior treatment failure and specific ICD-10 diagnosis. Frequency limits apply."),
    ],
    "examples":[
        ("Malignant Melanoma Excision","11600 (Excision malignant lesion)",["C43.9 (Malignant melanoma)"],[""],
         "Pathology from prior biopsy confirmed melanoma. Surgeon excises lesion with 0.5 cm margin. Operative note documents exact lesion size and margin. Pathology report referenced on claim."),
        ("Mohs Surgery for BCC on Nose","17311 + 17312 x2 (3 stages)",["C44.311 (BCC, skin of nose)"],[""],
         "Basal cell carcinoma on nasal tip. Mohs surgeon performs 3 stages with tissue maps and frozen sections. Both surgery and pathology performed by same surgeon on same date."),
        ("Actinic Keratosis Destruction","17000 + 17003 x5",["L57.0 (Actinic keratosis)"],[""],
         "Six AK lesions on face. Bill 17000 for first lesion, 17003 x5 for additional. Count each lesion in documentation. Cannot bill 17003 without 17000 as primary."),
    ],
})

SPECIALTIES.append({
    "slug":"emergency-medicine","name":"Emergency Medicine","emoji":"[ambulance]",
    "meta_title":"Emergency Medicine CPT Codes & Billing Guide 2026",
    "meta_desc":"Emergency medicine CPT codes, ED E/M levels, critical care billing, modifier usage, and denial prevention for emergency department coders.",
    "keywords":"emergency medicine CPT codes, ED E/M levels, critical care CPT 99291, emergency billing guidelines, ED denial prevention",
    "overview":{
        "coverage":["Emergency department E/M visits (99281-99285)","Critical care services","Observation services","Trauma evaluation and stabilization","Toxicology and overdose management"],
        "services":["ED evaluation and management","Critical care (99291/99292)","Laceration repair","Fracture management","Procedural sedation","Chest pain and cardiac workup"],
        "denials":["E/M level not supported by documentation","Upcoding ED visit levels","Critical care time not documented","Bundling of procedures with ED visit"],
        "scrutiny":["ED level 5 (99285) frequency","Critical care time documentation","Split/shared visits","Incident-to billing in ED setting"]
    },
    "cpts":[
        ("99283","ED visit, moderate complexity","E&M","0","","Moderate MDM; multiple chronic conditions or acute illness","Medium",""),
        ("99284","ED visit, high complexity","E&M","0","25","High MDM; prescription drug management or new problem","High",""),
        ("99285","ED visit, highest complexity","E&M","0","25","Highest MDM; life-threatening illness; most common ED code","High",""),
        ("99291","Critical care, first 30-74 minutes","E&M","0","25","Time must be documented; excludes separately billed procedures","High",""),
        ("99292","Critical care, each additional 30 min","E&M","0","","Add-on to 99291; document cumulative time","High",""),
        ("99218","Observation care, initial, low complexity","E&M","0","","Distinct from ED visit; hospital obs status required","Medium",""),
        ("99220","Observation care, initial, high complexity","E&M","0","","Same day as ED visit requires careful coding","High",""),
        ("12001","Laceration repair, simple, 2.5 cm, scalp/neck","Surgical","0","59","Document wound length in cm; repair type","Low",""),
        ("12011","Laceration repair, simple, face, 2.5 cm","Surgical","0","59","Face codes different from trunk/extremity","Low",""),
        ("27750","Closed treatment distal radius fracture","Surgical","10","25","X-ray documentation required; with/without manipulation","Medium",""),
        ("71046","Chest X-ray, 2 views","Imaging","0","26,TC","Clinical indication required for each view","Low",""),
    ],
    "icd10":[
        ("R07.9","Chest pain, unspecified"),("R51","Headache"),
        ("S09.90XA","Head injury, unspecified, initial"),("I21.4","Acute NSTEMI"),
        ("J18.9","Pneumonia, unspecified"),("N10","Acute pyelonephritis"),
        ("K80.20","Cholelithiasis without obstruction"),("S52.501A","Distal radius fracture, initial"),
        ("L50.0","Allergic urticaria"),("A41.9","Sepsis, unspecified"),
    ],
    "modifiers":["25","59","76","GQ"],
    "spec_modifiers":{},
    "denial_top5":[
        "ED E/M level (99285) not supported -- MDM documentation does not reach highest complexity",
        "Critical care time (99291) missing from documentation -- time must be explicitly stated",
        "Procedures bundled with E/M without modifier 25 on the E/M code",
        "Observation admission billed same day as ED visit without proper sequencing",
        "Missing physician attestation for scribe-documented charts",
    ],
    "risky_combos":[
        ("99285 + 99291","Critical care and ED E/M are mutually exclusive -- use one"),
        ("99285 + 12001 (no 25)","Laceration repair bundled into ED visit without separate E/M modifier"),
        ("99291 without time doc","Critical care denied without documented cumulative minutes"),
        ("99218 + 99285 same day","Obs and ED visit: complex split-billing rules apply"),
        ("99291 + 99232 same day","Inpatient subsequent visit bundled into critical care time period"),
    ],
    "doc_checklist":[
        "Time documentation for critical care: cumulative minutes in critical care activities",
        "Medical decision making (MDM) grid with problems, data, and risk columns",
        "Physician co-signature when resident or mid-level documents the chart",
        "Separate procedure notes for any procedures performed during ED visit",
        "Disposition documentation: admitted, discharged, transferred, or expired",
        "Vital signs and acuity assessment supporting billed level of service",
        "For laceration repair: wound length in cm, repair type, material used",
        "For fracture care: X-ray report, reduction technique, immobilization applied",
    ],
    "compliance":[
        ("medicare","CMS ED Guidelines","ED visits billed by MDM level per 2021 E/M guidelines; time-based also allowed"),
        ("medicare","Critical Care","99291 requires physician presence and active critical care management"),
        ("commercial","UHC","Reviews ED level 5 frequency; high 99285 rates trigger prepayment review"),
        ("commercial","Anthem","Split/shared ED visit rules apply; supervising physician must co-sign"),
        ("prior-auth","Observation","Inpatient observation requires notification within 24 hrs for most plans"),
        ("prior-auth","CT/MRI in ED","Some MA plans require concurrent review for advanced imaging in ED"),
        ("frequency","Critical Care","Unbundling critical care procedures subject to NCCI edits"),
        ("frequency","Observation","Obs services limited to 48 hrs before requiring inpatient admission"),
    ],
    "faq":[
        ("How is the ED E/M level determined post-2021?",
         "Per 2021 CMS guidelines, ED levels 99281-99285 are based on Medical Decision Making (MDM): number/complexity of problems, amount/complexity of data, and risk of complications. Time-based billing is also allowed but MDM is most common in ED settings."),
        ("Can critical care (99291) and an ED visit (99285) be billed on the same day?",
         "No -- these codes are mutually exclusive. If the patient required critical care management, bill 99291/99292. The ED E/M codes (99281-99285) are not reported separately when critical care is provided."),
        ("What documentation is required for critical care billing?",
         "Document the total time spent in critical care activities (minimum 30 minutes for 99291), the life-threatening condition requiring critical care, and specific interventions performed. Excluded from critical care time: separately billed procedures, time with family, administrative tasks."),
        ("How should laceration repairs be coded in the ED?",
         "Select the repair code based on wound length in cm, anatomic site, and repair complexity (simple/intermediate/complex). Document the measured wound length, technique, suture material, and layers repaired. Append modifier 59 if multiple separate wounds at different sites."),
        ("Is observation care different from inpatient admission billing?",
         "Yes -- observation is a hospital outpatient service. ED physicians bill 99218-99220 for initial observation and 99224-99226 for subsequent. Inpatient admission requires distinct documentation of medical necessity for inpatient-level care."),
    ],
    "examples":[
        ("Chest Pain Workup -- Level 5 ED Visit","99285 (ED visit, highest complexity)",["R07.9 (Chest pain), I25.10 (CAD)"],[""],
         "Patient presents with acute chest pain, risk factors for CAD. ECG, troponin, CXR obtained. High MDM documented: new presenting problem requiring additional workup, prescription drug management. Cardiologist consulted."),
        ("Critical Care for Septic Shock","99291 + 99292 (65 min critical care)",["A41.9 (Sepsis), R65.21 (Severe sepsis)"],[""],
         "Patient in septic shock requiring aggressive resuscitation. Physician documents 65 minutes of critical care. Bill 99291 (first 30-74 min) + 99292 (additional 30 min). Time excludes procedures billed separately."),
        ("Laceration Repair + Separate E/M","99283 + 12011",["S01.411A (Open wound of cheek)"],["25"],
         "Patient with facial laceration from fall, also evaluated for head injury. E/M (99283) with modifier 25 for clinical evaluation; 12011 for simple face laceration repair. Separate documentation for each service."),
    ],
})

SPECIALTIES.append({
    "slug":"family-medicine","name":"Family Medicine","emoji":"[stethoscope]",
    "meta_title":"Family Medicine CPT Codes & Billing Guide 2026",
    "meta_desc":"Family medicine CPT codes, preventive care billing, chronic care management, modifier usage, and denial prevention for primary care billing teams.",
    "keywords":"family medicine CPT codes, primary care billing, preventive care CPT, chronic care management billing, family medicine denial prevention",
    "overview":{
        "coverage":["Acute and chronic disease management","Preventive care and wellness visits","Chronic care management (CCM)","Transitional care management (TCM)","Minor office procedures"],
        "services":["Office E/M visits (99202-99215)","Annual wellness visits (AWV)","Preventive medicine visits (99381-99397)","Chronic care management (99490)","Depression screening","Immunizations"],
        "denials":["AWV vs preventive vs sick visit billing conflicts","Chronic care management time documentation","Preventive services billed as sick visit","Incident-to billing compliance"],
        "scrutiny":["AWV frequency (1 per year)","CCM time documentation per month","Transitional care management timeliness","Screening mammogram vs diagnostic coding"]
    },
    "cpts":[
        ("99213","Office visit, established, moderate complexity","E&M","0","25","MDM: 1-2 chronic stable conditions or new acute problem","Medium",""),
        ("99214","Office visit, established, high complexity","E&M","0","25","MDM: 3+ chronic conditions or acute illness with systemic risk","High",""),
        ("99215","Office visit, established, highest complexity","E&M","0","25","High complexity MDM or 55+ minutes total time","High",""),
        ("99203","Office visit, new patient, moderate complexity","E&M","0","","Moderate MDM or 30-44 minutes total time","Medium",""),
        ("99396","Preventive visit, established, 40-64 years","Preventive","0","","Annual preventive; cannot bill with sick visit same day without 25","Medium",""),
        ("99397","Preventive visit, established, 65+ years","Preventive","0","","Medicare covered AWV is different (G0438/G0439)","Medium",""),
        ("G0438","Annual wellness visit, initial (Medicare)","Preventive","0","","Cannot bill with 99397 for Medicare patients","High",""),
        ("G0439","Annual wellness visit, subsequent (Medicare)","Preventive","0","","Once per year; patient must have Medicare 12+ months","High",""),
        ("99490","Chronic care management, 20+ min/month","E&M","0","","Time log required; patient consent documented","High",""),
        ("99495","Transitional care management, moderate complexity","E&M","0","","Contact within 2 business days of discharge required","High",""),
        ("96127","Brief behavioral health screening","Preventive","0","25","PHQ-2, GAD-2, CAGE; document tool used and score","Low",""),
        ("90471","Immunization admin, 1st injection","Preventive","0","","Bill with vaccine product code; document vaccine lot number","Low",""),
        ("99406","Smoking cessation counseling, 3-10 min","Preventive","0","","Document time and cessation advice; not billable by MAs","Low",""),
    ],
    "icd10":[
        ("Z00.00","General adult medical exam, no abnormal findings"),("Z00.01","General adult medical exam, with abnormal findings"),
        ("I10","Essential hypertension"),("E11.9","Type 2 diabetes, without complications"),
        ("J06.9","Acute upper respiratory infection"),("E78.5","Hyperlipidemia, unspecified"),
        ("F32.9","Major depressive disorder, unspecified"),("J45.20","Mild intermittent asthma"),
        ("M54.5","Low back pain"),("Z12.31","Encounter for screening mammogram"),
    ],
    "modifiers":["25","33","KX"],
    "spec_modifiers":{},
    "denial_top5":[
        "Annual wellness visit (G0438) billed for Medicare patient within 12 months of prior AWV",
        "Preventive visit and sick visit billed same day without modifier 25 on the sick E/M",
        "CCM (99490) without documented patient consent, care plan, or 20-minute time log",
        "TCM (99495/99496): contact not documented within 2 business days of discharge",
        "Incident-to billing without supervising physician present in the suite",
    ],
    "risky_combos":[
        ("G0438 + 99397","AWV and preventive cannot both bill for Medicare patient same day"),
        ("99396 + 99213 (no 25)","Preventive and sick visit same day requires modifier 25 on sick E/M"),
        ("99490 x2/month","CCM is once per month per provider; duplicate submission denied"),
        ("99495 <2 day contact","TCM denied if discharge follow-up contact not within 2 business days"),
        ("96127 alone","Depression screening without E/M or AWV on same claim may deny"),
    ],
    "doc_checklist":[
        "MDM grid completed: number of problems, data reviewed, risk level",
        "Patient consent form for Chronic Care Management (CCM) on file",
        "CCM time log: date, time spent, care coordinator name, activities performed",
        "TCM discharge summary received; contact attempts documented within 2 days",
        "Preventive care checklist with age/sex-appropriate screenings completed",
        "Immunization: vaccine product code, lot number, expiration date, site of injection",
        "Smoking cessation: document time spent, cessation advice given, patient response",
        "AWV: health risk assessment, personalized prevention plan, vital signs",
    ],
    "compliance":[
        ("medicare","AWV Frequency","G0438 initial once in patient Medicare lifetime; G0439 annually thereafter"),
        ("medicare","CCM Rules","99490 requires written consent, care plan, 20+ min clinical staff time per month"),
        ("commercial","Anthem","Preventive vs diagnostic mammogram coding affects patient cost-share"),
        ("commercial","UHC","TCM must show discharge follow-up visit within 7-14 days for higher-complexity code"),
        ("prior-auth","Behavioral Health","Mental health referrals may require auth; coordinate with BH carve-out"),
        ("prior-auth","Specialist Referrals","HMO plans require PCP referral authorization before specialist billing"),
        ("frequency","AWV","Medicare AWV once per calendar year; commercial preventive visits annually"),
        ("frequency","Pap Smear","Medicare covers every 24 months; high-risk patients annually"),
    ],
    "faq":[
        ("Can I bill a sick visit the same day as an annual wellness visit?",
         "Yes, with modifier 25 appended to the sick/problem-focused E/M code. The AWV and the sick visit must address different problems, and both must be separately documented. The sick visit should have its own HPI, assessment, and plan."),
        ("What is required to bill Chronic Care Management (99490)?",
         "You need: (1) written patient consent, (2) a documented care plan, (3) at least 20 minutes of clinical staff time per calendar month, and (4) the patient must have two or more chronic conditions expected to last at least 12 months. Time must be logged with dates and activities."),
        ("How does Medicare AWV differ from a preventive visit?",
         "The AWV (G0438/G0439) is Medicare-specific and focuses on a health risk assessment, personalized prevention plan, and updating medical/family history. It is NOT a physical exam. The traditional preventive visit (99397) involves a physical exam and is not covered by Medicare for patients who already have AWV coverage."),
        ("What documentation is required for Transitional Care Management?",
         "TCM requires: (1) contact within 2 business days of discharge, (2) a face-to-face visit within 7 days (99496) or 14 days (99495) of discharge, and (3) medication reconciliation and care coordination documented."),
        ("Can a Medical Assistant bill incident-to services?",
         "No -- incident-to services must be performed by a licensed clinical professional (NP, PA, RN in some states) under physician supervision. The supervising physician must be present in the office suite during the service."),
    ],
    "examples":[
        ("Annual Wellness Visit + Acute Problem","G0439 + 99213",["Z00.00 (AWV), I10 (HTN)"],["25"],
         "Medicare patient for AWV. During visit, patient reports new headache -- evaluated separately. G0439 billed for AWV; 99213 with modifier 25 for the acute headache evaluation. Separate documentation for each service."),
        ("Chronic Care Management Month","99490 (CCM, 20+ min)",["I10 (HTN), E11.9 (DM)"],[""],
         "Care coordinator spends 22 minutes coordinating care for diabetic hypertensive patient. Consent on file, care plan updated, medication reconciliation completed. Time log documents each activity with date and duration."),
        ("New Patient Comprehensive Visit","99203",["J06.9 (URI), E78.5 (Hyperlipidemia)"],[""],
         "New patient with URI symptoms and newly discovered hyperlipidemia. Moderate MDM: 2 conditions, ordered labs, low-risk medication started. Total time 35 minutes documented."),
    ],
})

SPECIALTIES.append({
    "slug":"general-surgery","name":"General Surgery","emoji":"[scalpel]",
    "meta_title":"General Surgery CPT Codes & Billing Guide 2026",
    "meta_desc":"General surgery CPT codes, global period billing, laparoscopic vs open coding, modifier usage, and denial prevention for surgical billing teams.",
    "keywords":"general surgery CPT codes, laparoscopic surgery billing, appendectomy CPT, cholecystectomy billing, surgery global period",
    "overview":{
        "coverage":["Abdominal and gastrointestinal surgery","Hernia repair","Appendectomy and cholecystectomy","Colorectal surgery","Breast surgery and biopsy"],
        "services":["Laparoscopic cholecystectomy","Open and lap appendectomy","Hernia repair (inguinal, umbilical, ventral)","Colectomy procedures","Breast biopsy and lumpectomy","Wound care and I&D"],
        "denials":["Open vs laparoscopic code selection","Global period bundling violations","Conversion from laparoscopic to open","Assistant surgeon billing rules"],
        "scrutiny":["90-day global period compliance","Modifier 78/79 for return to OR","Assistant surgeon qualifications","Multiple procedure reductions (modifier 51)"]
    },
    "cpts":[
        ("47562","Laparoscopic cholecystectomy","Surgical","90","51,80","Pathology of gallbladder required","High",""),
        ("47600","Open cholecystectomy","Surgical","90","80","Document reason for open approach if converted from lap","High",""),
        ("44950","Appendectomy, open, not ruptured","Surgical","90","80","Pathology required; incidental appendectomy coded differently","Medium",""),
        ("44970","Laparoscopic appendectomy","Surgical","90","80","Most common approach; ruptured requires 44960","High",""),
        ("49505","Open repair, initial inguinal hernia, reducible, age 5+","Surgical","90","LT,RT,80","Specify laterality; incarcerated hernia uses different code","High",""),
        ("49650","Laparoscopic repair inguinal hernia, initial","Surgical","90","LT,RT,80","Most payers prefer laparoscopic; bilateral requires modifier 50","High",""),
        ("49560","Open repair initial incisional/ventral hernia, reducible","Surgical","90","80","Mesh use affects coding; document mesh type and size","High",""),
        ("44140","Colectomy partial with anastomosis","Surgical","90","80","Specify extent of resection; colon segment in description","High",""),
        ("19120","Excision breast lesion, open","Surgical","90","LT,RT","Wire localization add-on if used; pathology required","High",""),
        ("10060","I&D abscess, simple","Surgical","10","","Document size, location, material drained","Low",""),
        ("97597","Debridement, open wound, first 20 sq cm","Surgical","0","","Square cm of wound documented","Low",""),
    ],
    "icd10":[
        ("K80.20","Calculus of gallbladder without obstruction"),("K35.2","Acute appendicitis with peritoneal abscess"),
        ("K40.90","Unilateral inguinal hernia, without obstruction"),("K43.9","Ventral hernia without obstruction"),
        ("K57.30","Diverticulitis of large intestine without abscess"),("C18.9","Malignant neoplasm of colon, unspecified"),
        ("N60.11","Diffuse cystic mastopathy of right breast"),("L02.91","Cutaneous abscess, unspecified"),
    ],
    "modifiers":["22","50","51","78","79","80","LT","RT"],
    "spec_modifiers":{},
    "denial_top5":[
        "Global period violation -- billing post-op E/M visits bundled in 90-day global without modifier",
        "Open vs laparoscopic code mismatch -- converted case billed without documentation of conversion",
        "Assistant surgeon (modifier 80) denied -- not medically necessary or PA used 80 instead of AS",
        "Bilateral hernia repair without modifier 50 or RT/LT -- payer reduces payment",
        "Wound debridement area not documented -- sq cm required for 97597/97598 code selection",
    ],
    "risky_combos":[
        ("47562 + E/M within 90 days","Post-op E/M bundled into global; bill only with modifier 24 for unrelated problem"),
        ("49505 no LT/RT","Inguinal hernia without laterality modifier triggers edit or reduced payment"),
        ("44950 + 44970","Open and laparoscopic appendectomy codes are mutually exclusive"),
        ("97597 without sq cm doc","Debridement denied without wound measurement documentation"),
        ("19120 bilateral no 50","Bilateral breast lesion excision without modifier 50: underpayment"),
    ],
    "doc_checklist":[
        "Preoperative diagnosis and indication for surgery",
        "Operative report: approach (open vs lap), technique, complications, instruments",
        "Pathology report for all excised tissue specimens",
        "Laterality for paired organ procedures (LT/RT or bilateral with modifier 50)",
        "Mesh documentation: brand name, size, fixation technique for hernia repairs",
        "Global period tracking: post-op care encounters properly excluded or modified",
        "Assistant surgeon documentation: both surgeons' operative notes confirming assistance",
        "Anesthesia record cross-referencing surgical procedure start/stop times",
    ],
    "compliance":[
        ("medicare","Global Period Rules","90-day global for major surgery; E/M during global requires modifier 24 for unrelated"),
        ("medicare","Assistant Surgeon","Medicare pays ~16% of fee schedule for assistant; many codes not payable"),
        ("commercial","UHC","Lap-to-open conversion requires documentation of conversion reason"),
        ("commercial","Aetna","Multiple procedures: modifier 51 reduces secondary procedures by 50%"),
        ("prior-auth","Elective Hernia Repair","Most commercial plans require prior auth for elective hernia repair"),
        ("prior-auth","Colorectal Surgery","Colectomy and colostomy require pre-certification for non-emergency cases"),
        ("frequency","Hernia Repair","Recurrent hernia billed with different codes; document prior repair in record"),
        ("frequency","Wound Debridement","Frequency limits for repeat debridement; document wound progression"),
    ],
    "faq":[
        ("What is the global surgery period and what is included?",
         "The global surgery period covers all routine pre-operative care from the day before surgery (major) or day of (minor), the surgical procedure itself, and all routine post-operative care for 0, 10, or 90 days. During the global period, E/M visits and related procedures cannot be billed separately without a modifier."),
        ("How is a laparoscopic-to-open conversion coded?",
         "Bill the open procedure code. The laparoscopic code is not separately billable. Document the reason for conversion in the operative note (dense adhesions, bleeding, anatomy). Some payers require an additional notation in the claim."),
        ("Can I bill for a post-op visit during the 90-day global period?",
         "Only with modifier 24 (unrelated E/M) or modifier 79 (unrelated procedure). Routine post-op care is bundled in the global fee. Document clearly that any billed visit is for a problem unrelated to the surgical procedure."),
        ("What documentation does an assistant surgeon need?",
         "The assistant surgeon must document their role in the operative note. The primary surgeon's note should also reference the assistant. Use modifier 80 for MD assistants; modifier 82 when qualified resident is unavailable; modifier AS for PA/NP assistants."),
        ("How are bilateral hernia repairs billed?",
         "For bilateral inguinal hernia repair on the same day: bill the procedure code once with modifier 50, or bill two line items with RT and LT. Confirm payer preference as some plans prefer the two-line approach."),
    ],
    "examples":[
        ("Laparoscopic Cholecystectomy","47562 (Lap chole)",["K80.20 (Cholelithiasis)"],[""],
         "Symptomatic cholelithiasis with recurrent biliary colic. Laparoscopic approach; gallbladder removed intact. Pathology confirms cholecystitis. 90-day global period begins day of surgery. Routine post-op visits bundled."),
        ("Return to OR for Post-op Hemorrhage","Repeat procedure with 78",["K80.20 + T81.010A (Post-proc hemorrhage)"],["78"],
         "Patient returns to OR on day 3 post lap chole for hemorrhage. Bill repeat procedure with modifier 78. Only intraoperative component of new procedure paid within global period."),
        ("Bilateral Inguinal Hernia Repair","49650 bilateral",["K40.20 (Bilateral inguinal hernia)"],["50"],
         "Bilateral inguinal hernias repaired laparoscopically in same session. Bill 49650 once with modifier 50. Some payers require two separate lines with LT and RT. Verify payer preference."),
    ],
})

SPECIALTIES.append({
    "slug":"internal-medicine","name":"Internal Medicine","emoji":"[doctor]",
    "meta_title":"Internal Medicine CPT Codes & Billing Guide 2026",
    "meta_desc":"Internal medicine CPT codes, hospital E/M billing, chronic disease management, modifier rules, and denial prevention for internal medicine practices.",
    "keywords":"internal medicine CPT codes, hospital E/M billing, internal medicine modifiers, chronic disease management billing, internal medicine denial prevention",
    "overview":{
        "coverage":["Office-based chronic disease management","Hospital inpatient and observation care","Preventive services and screenings","Procedural services (thoracentesis, paracentesis)","Consultations and referral management"],
        "services":["Office E/M (99202-99215)","Hospital initial care (99221-99223)","Subsequent hospital care (99231-99233)","Hospital discharge (99238-99239)","Minor procedures"],
        "denials":["Hospital E/M level not supported by documentation","Same-day admission and discharge coding errors","Consultation vs referral distinction","Hospitalist billing for non-hospitalist providers"],
        "scrutiny":["Inpatient E/M level appropriateness","Discharge day management time","Teaching physician documentation","Shared/split visits with residents"]
    },
    "cpts":[
        ("99223","Hospital initial care, high complexity","E&M","0","AI","High MDM; comprehensive H&P; 70+ minutes","High",""),
        ("99222","Hospital initial care, moderate complexity","E&M","0","AI","Moderate MDM; detailed H&P; 50-74 minutes","High",""),
        ("99221","Hospital initial care, low complexity","E&M","0","","Low MDM; detailed H&P; 40-54 minutes","Medium",""),
        ("99233","Subsequent hospital care, high complexity","E&M","0","AI","High MDM; status review, 35+ minutes","High",""),
        ("99232","Subsequent hospital care, moderate complexity","E&M","0","","Moderate MDM; status review, 25-34 minutes","High",""),
        ("99231","Subsequent hospital care, low complexity","E&M","0","","Stable patient, low MDM; 15-24 minutes","Medium",""),
        ("99239","Hospital discharge, more than 30 minutes","E&M","0","","Document total discharge time explicitly","High",""),
        ("99238","Hospital discharge, 30 minutes or less","E&M","0","","Final exam, instructions, prescriptions","Medium",""),
        ("99213","Office visit, established, moderate complexity","E&M","0","25","Stable chronic disease follow-up","Medium",""),
        ("99214","Office visit, established, high complexity","E&M","0","25","Multiple chronic conditions or acute complication","High",""),
        ("32554","Thoracentesis, without imaging guidance","Surgical","0","","Document laterality, volume removed, specimen sent","High",""),
        ("49082","Paracentesis, without imaging guidance","Surgical","0","","Document volume, therapeutic vs diagnostic","High",""),
    ],
    "icd10":[
        ("I10","Essential hypertension"),("E11.9","Type 2 diabetes without complications"),
        ("E11.65","Type 2 diabetes with hyperglycemia"),("J18.9","Pneumonia, unspecified"),
        ("N18.3","Chronic kidney disease, stage 3"),("I50.9","Heart failure, unspecified"),
        ("J44.1","COPD with acute exacerbation"),("E87.1","Hyponatremia"),
        ("R18.0","Malignant ascites"),("J90","Pleural effusion, not elsewhere classified"),
    ],
    "modifiers":["25","AI","GW"],
    "spec_modifiers":{},
    "denial_top5":[
        "Hospital E/M level (99223) not supported -- MDM or time documentation insufficient",
        "Discharge day (99239) without documented total time exceeding 30 minutes",
        "Same physician billing initial hospital care and observation care on same day",
        "Teaching physician attestation missing when resident documented the chart",
        "Paracentesis/thoracentesis billed without imaging guidance code when ultrasound used",
    ],
    "risky_combos":[
        ("99221 + 99223 same admission","Only one initial hospital care code per admission per physician"),
        ("99239 without time doc","Discharge >30 min denied without explicit time documentation"),
        ("99232 + 32554 (no 25)","Procedure and E/M same day without modifier 25 -- E/M bundled"),
        ("99223 teaching (no attestation)","Teaching physician claims denied without resident note attestation"),
        ("99221 + 99218 same day","Hospital admission and observation same day -- complex billing"),
    ],
    "doc_checklist":[
        "Comprehensive H&P for initial hospital care within 24 hours of admission",
        "MDM documentation: problems addressed, data reviewed, risk assessment",
        "Total time documentation for discharge (if billing 99239)",
        "Teaching physician attestation in resident-documented charts",
        "Procedure notes for thoracentesis/paracentesis: indication, technique, volume, complications",
        "Imaging guidance documentation if ultrasound used during procedures",
        "Discharge summary: final diagnosis, disposition, discharge instructions, follow-up plan",
        "Medication reconciliation completed at discharge",
    ],
    "compliance":[
        ("medicare","Teaching Physician Rules","Teaching physician must be present for key portion; must document personal participation"),
        ("medicare","Split/Shared Visits","Substantive portion determines who bills; MDM-based determination required"),
        ("commercial","Anthem","Inpatient level justification reviewed; 99223 requires documented high complexity"),
        ("commercial","BCBS","Discharge day management: time-based coding requires explicit time in note"),
        ("prior-auth","Inpatient Admissions","Concurrent review required for most commercial and MA plans"),
        ("prior-auth","Procedures in Hospital","Paracentesis/thoracentesis: some plans require notification if non-emergent"),
        ("frequency","Subsequent Hospital Visits","Multiple same-physician visits on same day billed as one code"),
        ("frequency","Readmission","30-day readmission policies affect hospital reimbursement; document medical necessity"),
    ],
    "faq":[
        ("What is the difference between 99221, 99222, and 99223?",
         "These are initial hospital care codes differentiated by Medical Decision Making complexity. 99221 = low MDM; 99222 = moderate MDM; 99223 = high MDM. Time-based billing is also allowed. Comprehensive H&P is required for all initial hospital care codes."),
        ("When should modifier AI be used?",
         "Modifier AI identifies the principal physician of record -- the admitting/attending physician. Use it on the initial hospital care code (99221-99223). This helps payers correctly assign payment priority when multiple physicians bill on the same day."),
        ("How is the discharge day code selected?",
         "99238 covers discharge services of 30 minutes or less; 99239 covers more than 30 minutes. The time must be explicitly documented in the note. Discharge day management includes final examination, discharge instructions, coordination of care, and prescription preparation."),
        ("What documentation is required for teaching physicians?",
         "The teaching physician must personally document their presence during key or critical portions of the service. A simple attestation is insufficient -- specific clinical content must be documented or referenced in the note."),
        ("Can thoracentesis be billed with an E/M on the same day?",
         "Yes, with modifier 25 on the E/M code. If ultrasound guidance was used, also add the imaging guidance code (76942) to the thoracentesis claim."),
    ],
    "examples":[
        ("Complex Inpatient Admission","99223 (Initial hosp care, high complexity)",["J18.9 (Pneumonia), I10 (HTN), E11.9 (DM)"],["AI"],
         "Patient admitted for community-acquired pneumonia with comorbidities. High MDM: multiple chronic conditions, IV antibiotics, respiratory therapy. Modifier AI for admitting physician. Comprehensive H&P within 24 hours."),
        ("Hospital Discharge Day Management","99239 (Discharge, >30 min)",["J18.9 (Pneumonia)"],[""],
         "Physician spends 35 minutes on discharge: final exam, discharge instructions, prescribing, coordinating follow-up. Time documented explicitly in note."),
        ("Diagnostic Paracentesis","49082 + 99232",["R18.0 (Malignant ascites)"],["25"],
         "Patient with malignancy develops symptomatic ascites. Hospitalist performs diagnostic paracentesis (49082) and subsequent hospital care E/M (99232) with modifier 25 for separately documented evaluation."),
    ],
})

SPECIALTIES.append({
    "slug":"neurology","name":"Neurology","emoji":"[brain]",
    "meta_title":"Neurology CPT Codes & Billing Guide 2026",
    "meta_desc":"Neurology CPT codes, EEG and EMG billing, neurological E/M, modifier usage, and denial prevention for neurology billing teams.",
    "keywords":"neurology CPT codes, EEG billing CPT, EMG nerve conduction study, neurology billing guidelines, neurology denial prevention",
    "overview":{
        "coverage":["Neurological evaluation and management","Electroencephalography (EEG)","Electromyography (EMG) and nerve conduction","Neuromuscular disease management","Headache and seizure disorder management"],
        "services":["Office E/M visits (99202-99215)","EEG (routine, ambulatory, video)","EMG and nerve conduction studies (NCS)","Intraoperative neurological monitoring","Botulinum toxin injections","Lumbar puncture"],
        "denials":["EMG/NCS medical necessity","EEG frequency limitations","Modifier 26/TC split for diagnostic studies","Botulinum toxin prior authorization"],
        "scrutiny":["EMG units billed vs muscles documented","Video EEG vs routine EEG appropriateness","Botulinum toxin injection frequency","Intraoperative monitoring by non-treating neurologist"]
    },
    "cpts":[
        ("95816","EEG, awake and drowsy","Diagnostic","0","26,TC","Clinical indication for seizure or encephalopathy","Medium",""),
        ("95819","EEG, awake and asleep","Diagnostic","0","26,TC","More comprehensive than 95816","Medium",""),
        ("95860","EMG, one extremity","Diagnostic","0","","Document each muscle tested; clinical indication required","High",""),
        ("95863","EMG, three extremities","Diagnostic","0","","Specify muscles and extremities in report","High",""),
        ("95907","Nerve conduction studies, 1-2 studies","Diagnostic","0","","NCS report with waveforms required","High",""),
        ("95910","Nerve conduction studies, 5-6 studies","Diagnostic","0","","Indicate number of studies and nerve segments","High",""),
        ("64612","Chemodenervation, eccrine glands (hyperhidrosis)","Surgical","0","","Prior auth required; document failed conservative therapy","High",""),
        ("64615","Chemodenervation, facial muscles (hemifacial spasm)","Surgical","0","","Botulinum toxin prior auth; document units injected","High",""),
        ("95920","Intraoperative neurophysiology monitoring","Diagnostic","0","26","Not performed by the surgeon; separate neurologist required","High",""),
        ("62270","Spinal puncture, lumbar, diagnostic","Surgical","0","","Document indication, pressure, fluid characteristics","High",""),
        ("99214","Office visit, established, high complexity","E&M","0","25","Multiple neurological conditions or new diagnosis","Medium",""),
    ],
    "icd10":[
        ("G40.909","Epilepsy, unspecified, not intractable"),("G43.909","Migraine, unspecified, not intractable"),
        ("G35","Multiple sclerosis"),("G62.9","Polyneuropathy, unspecified"),
        ("G47.33","Obstructive sleep apnea"),("G70.01","Myasthenia gravis with acute exacerbation"),
        ("G20","Parkinson's disease"),("G25.0","Essential tremor"),
        ("R51","Headache, unspecified"),("G31.83","Dementia with Lewy bodies"),
    ],
    "modifiers":["26","TC","59","25","51"],
    "spec_modifiers":{},
    "denial_top5":[
        "EMG medical necessity -- muscles tested not correlating with documented clinical symptoms",
        "EEG frequency -- repeat EEGs within 6 months without documented clinical change",
        "Botulinum toxin prior auth missing or incorrect units documented",
        "Intraoperative monitoring billed by the treating surgeon (not allowed)",
        "NCS units billed exceed what is documented in the nerve conduction report",
    ],
    "risky_combos":[
        ("95860 + 95863","Cannot bill single and three extremity EMG on same day -- use correct level"),
        ("95910 + 95907","Higher NCS code replaces lower -- bill only the appropriate level"),
        ("64612 + E/M (no 25)","Botulinum injection with E/M: modifier 25 required on E/M"),
        ("95920 by operating surgeon","Intraoperative monitoring must be by separate monitoring neurologist"),
        ("95816 + 95819 same day","EEG codes are mutually exclusive for the same session"),
    ],
    "doc_checklist":[
        "Clinical indication for EEG: seizure history, encephalopathy, spell classification",
        "EMG report: each muscle tested, needle electrode findings, interpretation",
        "NCS report: nerve studied, stimulation and recording sites, waveform measurements",
        "Botulinum toxin: diagnosis, muscles injected, units per muscle, prior auth number",
        "Failed conservative therapy before botulinum toxin injection",
        "Intraoperative monitoring: separate neurologist attending, modalities monitored, changes noted",
        "Lumbar puncture: opening pressure, appearance, tubes sent for analysis",
        "Sleep study: referring diagnosis, study type, technician present, scoring report",
    ],
    "compliance":[
        ("medicare","LCD L33795","EMG: must document clinical indication; routine use without symptoms denied"),
        ("medicare","LCD L34065","EEG: frequency limitations; repeat requires documented clinical change"),
        ("commercial","UHC","Botulinum toxin requires prior auth with documented failed oral medications"),
        ("commercial","Cigna","Intraoperative monitoring: separate neurologist required; not surgeon billing"),
        ("prior-auth","Botulinum Toxin","Most payers require auth for all chemodenervation procedures"),
        ("prior-auth","Video EEG","Ambulatory and video EEG requires prior auth from most commercial payers"),
        ("frequency","EEG Limits","Routine EEG limited to twice per year without clinical justification"),
        ("frequency","Botulinum","Injection frequency: typically every 3 months; document clinical need"),
    ],
    "faq":[
        ("What documentation is required for EMG studies to pass medical necessity review?",
         "Documentation must include the clinical symptoms and their location/duration, neurological exam findings, specific muscles tested and why, and how EMG findings correlate to the clinical picture. Routine EMG without correlating symptoms or physical findings is routinely denied."),
        ("Can the surgeon bill for intraoperative neurological monitoring?",
         "No -- the operating surgeon cannot bill for intraoperative neurophysiology monitoring (95920). This service must be provided by a separate neurologist or neurophysiologist dedicated to monitoring during the procedure."),
        ("What is required for botulinum toxin injection coverage?",
         "Documentation must include: specific diagnosis, prior authorization number, muscles treated, units injected per muscle, response to prior treatment, and confirmation oral medications were tried and failed. Units billed must match units documented."),
        ("How are nerve conduction studies coded?",
         "NCS codes (95907-95913) are selected based on the number of studies performed. Each nerve segment studied counts as one study. The report must specify each nerve and segment, stimulation and recording sites, latencies, amplitudes, and conduction velocities. Billed code must match count documented."),
        ("When is video EEG appropriate vs routine EEG?",
         "Video EEG is appropriate for epilepsy monitoring unit admissions for seizure characterization, pre-surgical evaluation, or spell classification. Routine EEG (95816/95819) is for standard seizure screening. Most payers require prior auth for video EEG."),
    ],
    "examples":[
        ("EMG/NCS for Peripheral Neuropathy","95863 + 95910",["G62.9 (Polyneuropathy)"],[""],
         "Patient with symmetric distal numbness and tingling. EMG shows 3 extremity findings; NCS shows 5-6 nerve conduction studies. EMG report lists each muscle; NCS report lists each nerve segment with measurements."),
        ("Botulinum Toxin for Cervical Dystonia","64615",["G24.3 (Spasmodic torticollis)"],[""],
         "Patient with cervical dystonia, failed oral muscle relaxants. Prior auth obtained. Neurologist injects 200 units across 4 muscles. Documentation: prior auth number, muscles, units per muscle, prior response."),
        ("EEG for Seizure Evaluation","95819 (EEG, awake and asleep)",["G40.909 (Epilepsy)"],["26"],
         "Patient with new-onset seizures. EEG performed at outpatient lab. Neurologist reviews and interprets remotely. Modifier 26 for professional interpretation. Report includes seizure pattern description."),
    ],
})

SPECIALTIES.append({
    "slug":"orthopedics","name":"Orthopedics","emoji":"[bone]",
    "meta_title":"Orthopedic Surgery CPT Codes & Billing Guide 2026",
    "meta_desc":"Orthopedic CPT codes, fracture care billing, joint injection modifiers, arthroscopy coding, and denial prevention for orthopedic billing teams.",
    "keywords":"orthopedic CPT codes, fracture care billing, joint injection CPT, arthroscopy billing, orthopedic denial prevention",
    "overview":{
        "coverage":["Fracture care and management","Joint replacement surgery","Arthroscopic procedures","Spine surgery","Sports medicine and soft tissue repair"],
        "services":["Fracture closed/open reduction","Total hip/knee replacement","Arthroscopic knee (meniscus, ACL)","Shoulder arthroscopy","Joint injections","Spine fusion procedures"],
        "denials":["Fracture care vs evaluation and management","Global period post-op bundling","Arthroscopic vs open code selection","Prior auth for elective joint replacement"],
        "scrutiny":["Hip/knee replacement prior auth","Spinal fusion multi-level necessity","Fracture global period compliance","Bilateral joint procedures"]
    },
    "cpts":[
        ("27447","Total knee replacement (TKR)","Surgical","90","LT,RT,80","Prior auth required; conservative therapy failure documented","High",""),
        ("27130","Total hip replacement (THR)","Surgical","90","LT,RT,80","Prior auth; X-ray severity documentation","High",""),
        ("29881","Knee arthroscopy with meniscus repair","Surgical","90","LT,RT","MRI correlation required; repair vs resection documentation","High",""),
        ("29880","Knee arthroscopy with meniscectomy","Surgical","90","LT,RT","Medical necessity; no routine meniscectomy without symptoms","High",""),
        ("29827","Shoulder arthroscopy with rotator cuff repair","Surgical","90","LT,RT","MRI pre-op documentation; tear size and extent","High",""),
        ("27750","Closed treatment distal radius fracture","Surgical","90","LT,RT","X-ray required; document displacement status","Medium",""),
        ("20610","Joint aspiration/injection, large joint","Surgical","0","LT,RT","Specify joint; steroid/anesthetic documented","Low",""),
        ("20600","Joint aspiration/injection, small joint","Surgical","0","LT,RT","Finger, toe, acromioclavicular joints","Low",""),
        ("22612","Lumbar fusion, single level","Surgical","90","80","Medical necessity; conservative treatment failure","High",""),
        ("22614","Lumbar fusion, each additional level","Surgical","90","80","Multi-level justification required per level","High",""),
        ("99213","Office visit, established, moderate complexity","E&M","0","25","Musculoskeletal follow-up or new problem","Medium",""),
    ],
    "icd10":[
        ("M17.11","Primary osteoarthritis, right knee"),("M17.12","Primary osteoarthritis, left knee"),
        ("M16.11","Primary osteoarthritis, right hip"),("S52.501A","Unspecified fracture distal radius, initial"),
        ("M75.100","Rotator cuff syndrome, unspecified shoulder"),("M23.200","Derangement of unspecified meniscus"),
        ("M47.816","Spondylosis with radiculopathy, lumbar"),("M54.4","Lumbago with sciatica"),
        ("S82.001A","Fracture upper end of tibia, initial"),("M75.30","Calcific tendinitis, unspecified shoulder"),
    ],
    "modifiers":["22","50","51","LT","RT","78","79","80"],
    "spec_modifiers":{},
    "denial_top5":[
        "Joint replacement denied -- prior auth not obtained or conservative treatment not documented",
        "Arthroscopic meniscectomy medical necessity -- imaging and symptom documentation lacking",
        "Post-op visit during global period billed without appropriate modifier",
        "Bilateral joint procedure without modifier 50 or LT/RT -- underpayment",
        "Spinal fusion additional levels without per-level medical necessity documentation",
    ],
    "risky_combos":[
        ("27447 + E/M within 90 days","Post-TKR visit bundled in global unless modifier 24 with new diagnosis"),
        ("29881 + 29880 same knee","Meniscus repair and resection codes mutually exclusive on same compartment"),
        ("20610 same joint x4+","Frequent joint injections trigger frequency review"),
        ("22612 + 22614 without per-level doc","Additional fusion levels denied without separate medical necessity"),
        ("27750 + 99213 (no 25)","Fracture care and E/M bundled without modifier 25 for new problem"),
    ],
    "doc_checklist":[
        "X-rays (weight-bearing for knee/hip) showing severity of arthritis or fracture",
        "MRI reports correlating with arthroscopic procedure planned",
        "Documentation of failed conservative therapy: PT, NSAIDs, injections",
        "Prior authorization number for elective joint replacement",
        "Laterality clearly documented: right vs left for all extremity procedures",
        "Fracture management: displacement status, reduction technique, immobilization type",
        "Joint injection: exact joint, agent (steroid, hyaluronate, PRP), volume",
        "Global period tracking: all post-op visits identified and properly modified",
    ],
    "compliance":[
        ("medicare","Conservative Therapy","TKR/THR: 3-6 months failed PT and medication required by most payers"),
        ("medicare","Arthroscopy for OA","Medicare LCD limits knee arthroscopy for OA -- non-covered without mechanical symptoms"),
        ("commercial","UHC","Joint replacement requires prior auth; peer-to-peer for complex spinal surgery"),
        ("commercial","Aetna","Multi-level spinal fusion requires documentation per level"),
        ("prior-auth","TKR/THR","Prior auth required by virtually all payers; 30-45 days processing time"),
        ("prior-auth","Spinal Fusion","Pre-cert required; some plans require second opinion for fusion"),
        ("frequency","Joint Injections","Steroid injections limited to 3-4 per joint per year"),
        ("frequency","Arthroscopy Repeat","Repeat arthroscopy on same joint reviewed for medical necessity"),
    ],
    "faq":[
        ("What documentation is required for knee replacement pre-authorization?",
         "Documentation must include: X-rays showing joint space narrowing, documentation of failed conservative therapy (3-6 months PT, NSAIDs, at least one injection), functional limitations, and BMI within payer acceptable range for some plans."),
        ("How is arthroscopic knee surgery coded when both meniscus repair and other procedures are done?",
         "Bill the most comprehensive code describing the primary procedure. Add-on or separate codes may apply for additional work in different compartments. Meniscus repair (29881) and meniscectomy (29880) are mutually exclusive for the same compartment."),
        ("When is a joint injection billed with modifier LT or RT?",
         "Always append LT (left) or RT (right) when performing joint injections on paired structures. For bilateral injections in the same session, bill two lines with LT and RT. Document the specific joint, agent, and volume."),
        ("What constitutes a global period violation in orthopedics?",
         "Billing E/M visits, related procedures, or dressing changes during the 90-day post-op global period without appropriate modifiers. Use modifier 24 for unrelated E/M, modifier 78 for related return-to-OR, and modifier 79 for unrelated procedures."),
        ("Is knee arthroscopy covered by Medicare for osteoarthritis?",
         "Medicare has strict LCD coverage criteria. Routine arthroscopy for OA without mechanical symptoms is generally non-covered. Documentation must show acute mechanical symptoms (loose body, locked knee), not just pain. Review the applicable LCD carefully."),
    ],
    "examples":[
        ("Total Knee Replacement","27447 (TKR)",["M17.11 (OA right knee)"],["RT"],
         "Prior auth obtained. Severity documented by weight-bearing X-rays. Failed PT (12 weeks), 3 steroid injections, NSAIDs. Modifier RT for right-sided procedure. 90-day global begins day of surgery."),
        ("Knee Arthroscopy with Meniscectomy","29880 (Knee arthroscopy, medial meniscectomy)",["M23.200 (Meniscus derangement)"],["LT"],
         "Medial meniscus tear on MRI correlating with mechanical knee pain and locking. Arthroscopic partial meniscectomy performed. Modifier LT for left knee."),
        ("Bilateral Knee Injections","20610 x2",["M17.11 (OA right knee), M17.12 (OA left knee)"],["RT","LT"],
         "Bilateral knee OA requiring steroid injections. Two line items: 20610-RT and 20610-LT. Document steroid agent, volume, each injection performed separately."),
    ],
})

SPECIALTIES.append({
    "slug":"radiology","name":"Radiology","emoji":"[xray]",
    "meta_title":"Radiology CPT Codes & Billing Guide 2026",
    "meta_desc":"Radiology CPT codes, modifier 26 and TC billing, imaging medical necessity, prior auth requirements, and denial prevention for radiology billing teams.",
    "keywords":"radiology CPT codes, modifier 26 TC radiology, MRI billing guidelines, CT scan CPT, radiology denial prevention",
    "overview":{
        "coverage":["Diagnostic imaging (X-ray, CT, MRI, ultrasound)","Interventional radiology procedures","Nuclear medicine imaging","Fluoroscopy-guided procedures","Radiological interpretation and reporting"],
        "services":["Plain film X-rays","CT scans (70450-70553)","MRI (70540-70559)","Ultrasound (76700-76857)","PET/nuclear medicine","Interventional procedures"],
        "denials":["Medical necessity for advanced imaging","Modifier 26/TC split compliance","Prior auth for CT/MRI","Frequency limitations for repeated imaging"],
        "scrutiny":["MRI without prior auth","Repeat CT for same condition within 30 days","Contrast vs non-contrast code selection","Screening vs diagnostic mammogram coding"]
    },
    "cpts":[
        ("71046","Chest X-ray, 2 views","Imaging","0","26,TC","Most common; document clinical indication","Low",""),
        ("70450","CT head/brain, without contrast","Imaging","0","26,TC","Clinical indication required; avoid for headache without red flags","Medium",""),
        ("70460","CT head/brain, with contrast","Imaging","0","26,TC","Prior auth often required; document indication","High",""),
        ("70553","MRI brain, with and without contrast","Imaging","0","26,TC","Prior auth required by most payers","High",""),
        ("72148","MRI lumbar spine, without contrast","Imaging","0","26,TC","Acute LBP without prior conservative therapy often denied","High",""),
        ("72158","MRI lumbar spine, with and without contrast","Imaging","0","26,TC","Enhanced protocol for neoplasm or infection; prior auth","High",""),
        ("76700","Ultrasound abdomen, complete","Imaging","0","26,TC","Clinical indication: RUQ pain, jaundice, ascites","Low",""),
        ("77067","Screening mammogram, bilateral","Imaging","0","TC","Annual screening; ICD-10 Z12.31 required","Low",""),
        ("77065","Diagnostic mammogram, unilateral","Imaging","0","26,TC","Symptomatic; use clinical ICD-10 -- not Z12.31","Medium",""),
        ("78816","PET scan, whole body, with CT","Imaging","0","26,TC","Oncology indication required; prior auth universal","High",""),
        ("27096","Sacroiliac joint injection, fluoroscopic guidance","Surgical","0","26,TC","Prior auth required; clinical indication documented","High",""),
    ],
    "icd10":[
        ("Z12.31","Encounter for screening mammogram"),("R07.9","Chest pain, unspecified"),
        ("R51","Headache"),("M54.5","Low back pain"),
        ("K76.0","Fatty change of liver"),("C71.9","Malignant neoplasm of brain, unspecified"),
        ("M47.816","Lumbar spondylosis with radiculopathy"),("Z08","Follow-up after completed treatment for malignancy"),
        ("R10.11","Right upper quadrant pain"),("N40.0","Benign prostatic hyperplasia without urinary obstruction"),
    ],
    "modifiers":["26","TC","59","GG","LT","RT"],
    "spec_modifiers":{},
    "denial_top5":[
        "MRI/CT without prior authorization -- largest single denial reason in radiology",
        "Medical necessity for advanced imaging -- LBP MRI within 6 weeks of symptom onset",
        "Screening vs diagnostic mammogram code confusion -- wrong ICD-10 causes patient billing issues",
        "Modifier 26 not on interpretation claims when billed by radiologist reading at a facility",
        "Contrast vs non-contrast code mismatch -- physician orders contrast but non-contrast code billed",
    ],
    "risky_combos":[
        ("70450 + 70460 same session","Non-contrast and contrast CT head -- bill highest level only (70460 or 70553)"),
        ("77067 + Z12.39","Screening mammogram must use Z12.31; wrong ICD-10 triggers diagnostic payment rules"),
        ("72148 + 72158 same day","Lumbar MRI with and without contrast is 72158 -- do not bill 72148 separately"),
        ("26 missing on radiologist claim","Radiologist reading at hospital must always append modifier 26"),
        ("78816 without prior auth","PET scan claims almost universally denied without prior authorization"),
    ],
    "doc_checklist":[
        "Physician order with specific clinical indication for each imaging study",
        "Prior authorization number for CT/MRI/PET",
        "Contrast vs non-contrast specification in the order and report",
        "Radiologist signed interpretation report for all professional component billing",
        "Screening vs diagnostic mammogram indication clearly documented",
        "Failed conservative therapy before advanced imaging for LBP (6 weeks minimum)",
        "Anatomic specificity: laterality for paired structures (LT/RT)",
        "Comparison to prior imaging noted in the radiology report",
    ],
    "compliance":[
        ("medicare","LDCT Lung Screening","77065 lung CT screening: annual for qualifying smokers per USPSTF criteria"),
        ("medicare","LCD L36690","MRI lumbar spine: acute LBP requires 6 weeks of failed conservative therapy"),
        ("commercial","AIM Specialty Health","Manages radiology prior auth for many Blue Cross plans; online submission required"),
        ("commercial","Evicore","Manages advanced imaging auth for UHC, Cigna; clinical criteria must be met"),
        ("prior-auth","MRI/CT","Virtually all commercial and MA plans require prior auth for MRI and CT"),
        ("prior-auth","PET Scan","100% prior auth requirement; oncology indication must match LCD criteria"),
        ("frequency","CT Frequency","Repeat CT for same condition within 30 days triggers medical review"),
        ("frequency","Mammogram","Screening mammogram annually; diagnostic as clinically indicated"),
    ],
    "faq":[
        ("When should modifier 26 be used in radiology?",
         "Modifier 26 is used when a radiologist provides only the professional component -- the interpretation and signed report -- for imaging performed at a hospital or facility. The facility bills TC. Never use both 26 and TC on the same claim from the same provider."),
        ("What documentation prevents LBP MRI from being denied?",
         "Most payers require: (1) at least 6 weeks of failed conservative therapy, (2) red flag symptoms (radiculopathy, neurological deficits, bowel/bladder dysfunction), or (3) suspicion of serious pathology (malignancy, infection, fracture). Routine acute LBP MRI without these criteria is routinely denied."),
        ("How is a screening mammogram coded differently from a diagnostic mammogram?",
         "Screening (77067): bilateral, asymptomatic, ICD-10 Z12.31. Diagnostic (77065 unilateral, 77066 bilateral): symptomatic or follow-up of abnormality, use the clinical ICD-10 diagnosis. Never use Z12.31 for a diagnostic mammogram."),
        ("What is the prior auth process for advanced imaging?",
         "Most commercial and Medicare Advantage plans use a Radiology Benefits Manager (RBM) such as Evicore, AIM Specialty Health, or NIA Magellan. The ordering physician must submit clinical criteria before the study is scheduled. Obtain the auth number before the patient arrives."),
        ("Can CT without and with contrast be billed separately?",
         "No -- for head CT, bill 70450 (without), 70460 (with), or 70470 (with and without) based on protocol performed. Do not bill 70450 and 70460 together for the same session. 70470 is the correct code when both protocols are performed."),
    ],
    "examples":[
        ("MRI Lumbar Spine for Radiculopathy","72148 (MRI lumbar without contrast)",["M47.816 (Lumbar spondylosis with radiculopathy)"],["26"],
         "Patient with 8 weeks of LBP with radiation down left leg, positive straight-leg raise. Failed PT and NSAIDs. Prior auth obtained. Radiologist reads at hospital -- modifier 26 for professional interpretation."),
        ("Screening Mammogram","77067 (Screening mammogram, bilateral)",["Z12.31 (Screening mammogram)"],["TC"],
         "Annual screening mammogram for 52-year-old asymptomatic woman. Facility bills TC. ICD-10 Z12.31 confirms screening indication."),
        ("PET Scan for Lung Cancer Staging","78816 (PET scan whole body with CT)",["C34.10 (Lung cancer, upper lobe)"],["26"],
         "Prior auth obtained through Evicore. Oncology indication documented. Radiologist provides interpretation with modifier 26. PET report includes SUV measurements and staging assessment."),
    ],
})

SPECIALTIES.append({
    "slug":"gastroenterology","name":"Gastroenterology","emoji":"[stomach]",
    "meta_title":"Gastroenterology CPT Codes & Billing Guide 2026",
    "meta_desc":"Gastroenterology CPT codes, colonoscopy billing, endoscopy modifiers, GI procedure denial prevention, and payer rules for GI billing teams.",
    "keywords":"gastroenterology CPT codes, colonoscopy billing, EGD CPT codes, GI endoscopy billing, gastroenterology denial prevention",
    "overview":{
        "coverage":["Diagnostic and therapeutic endoscopy","Colonoscopy and sigmoidoscopy","Esophagogastroduodenoscopy (EGD)","Hepatology and liver disease management","Inflammatory bowel disease treatment"],
        "services":["Colonoscopy (diagnostic, screening, therapeutic)","EGD with biopsy","ERCP","Capsule endoscopy","Liver biopsy","Hemorrhoid treatment"],
        "denials":["Screening vs diagnostic colonoscopy coding","Modifier 33 for ACA preventive colonoscopy","Polypectomy code selection based on technique","ERCP component billing"],
        "scrutiny":["Screening colonoscopy converted to diagnostic","Polypectomy technique documentation","Sedation billing concurrent with procedure","Capsule endoscopy medical necessity"]
    },
    "cpts":[
        ("45378","Colonoscopy, diagnostic, with or without biopsy","Surgical","0","33,53","Standard diagnostic colonoscopy; biopsy included","Medium",""),
        ("45380","Colonoscopy with biopsy","Surgical","0","33","Biopsy technique documented; specimen sent to path","Medium",""),
        ("45385","Colonoscopy with polypectomy (snare technique)","Surgical","0","33,59","Snare polypectomy: specify size and location","High",""),
        ("45384","Colonoscopy with polypectomy (hot or cold forceps)","Surgical","0","33","Forceps removal: document technique and size","Medium",""),
        ("45390","Colonoscopy with endoscopic mucosal resection","Surgical","0","","Complex resection; requires pathology correlation","High",""),
        ("43239","EGD with biopsy","Surgical","0","","Specify sites biopsied; pathology required","Medium",""),
        ("43249","EGD with esophageal dilation, balloon","Surgical","0","59","Stricture documentation required; diameter achieved","High",""),
        ("43264","ERCP with stone extraction","Surgical","0","","Specific stone location and extraction technique","High",""),
        ("91110","Capsule endoscopy, small bowel","Diagnostic","0","","Prior imaging and failed scope documented; prior auth","High",""),
        ("99214","Gastroenterology office visit, high complexity","E&M","0","25","IBD management, GI cancer follow-up","Medium",""),
    ],
    "icd10":[
        ("Z12.11","Encounter for screening colonoscopy"),("K57.30","Diverticulosis of large intestine without hemorrhage"),
        ("K92.1","Melena"),("K22.0","Achalasia of cardia"),
        ("K51.90","Ulcerative colitis, unspecified, without complications"),("K50.90","Crohn's disease, unspecified"),
        ("C18.2","Malignant neoplasm of ascending colon"),("K21.0","GERD with esophagitis"),
        ("K80.20","Calculus of gallbladder without obstruction"),("K76.0","Fatty change of liver"),
    ],
    "modifiers":["33","53","59","25","51"],
    "spec_modifiers":{},
    "denial_top5":[
        "Screening colonoscopy (Z12.11) converted to diagnostic/therapeutic without changing code correctly",
        "Modifier 33 missing on screening colonoscopy -- patient billed cost-share incorrectly",
        "Polypectomy technique not documented -- snare vs forceps affects code selection",
        "ERCP component codes billed separately when comprehensive code covers them",
        "Capsule endoscopy without prior authorization or documented failed standard endoscopy",
    ],
    "risky_combos":[
        ("45378 + 45380 same session","Diagnostic colonoscopy includes biopsy -- do not bill separately"),
        ("45385 + 45384 same lesion","Snare and forceps polypectomy for same polyp -- use one technique code"),
        ("43239 + 91110 same day","EGD and capsule endoscopy same day: mutually exclusive for small bowel"),
        ("45378 (Z12.11) without mod 33","Screening colonoscopy without modifier 33: patient liable for cost-share"),
        ("43264 + component ERCP codes","Comprehensive ERCP code includes most component codes -- check NCCI"),
    ],
    "doc_checklist":[
        "Prep quality assessment: Boston Bowel Prep Scale or equivalent",
        "Scope insertion depth: cecal intubation confirmed with photodocumentation",
        "Polyp description: size (in mm), location (segment), number, morphology",
        "Polypectomy technique: snare (hot/cold), forceps (hot/cold), EMR",
        "Pathology correlation: each specimen labeled by anatomic location",
        "Screening vs diagnostic intent documented at time of scheduling",
        "ERCP: anatomy, cannulation technique, stone characteristics, stent type if placed",
        "Sedation: anesthesia provider separate billing if anesthesiologist present",
    ],
    "compliance":[
        ("medicare","ACA Preventive Colonoscopy","Screening colonoscopy every 10 years; high-risk patients every 5 years"),
        ("medicare","Therapeutic Conversion Rule","If screening becomes therapeutic, patient owes cost-share: modifier use is critical"),
        ("commercial","Cigna","Capsule endoscopy requires documentation of failed push enteroscopy"),
        ("commercial","UHC","ERCP components: verify which codes are bundled per NCCI"),
        ("prior-auth","Capsule Endoscopy","Prior auth required by all major payers; document clinical indication"),
        ("prior-auth","Therapeutic ERCP","Therapeutic ERCP requires concurrent review for inpatient"),
        ("frequency","Colonoscopy","Screening: 10-year intervals; surveillance: 1-5 years based on polyp findings"),
        ("frequency","EGD","No fixed frequency limit; document new indication for each EGD within 12 months"),
    ],
    "faq":[
        ("How is a colonoscopy coded when it starts as screening but polyps are found?",
         "The procedure code changes to the therapeutic code (e.g., 45385 for snare polypectomy) but the ICD-10 may remain Z12.11 if screening was the original intent. Modifier 33 should still be appended if the ACA preventive benefit applies. Verify payer policy for cost-sharing conversion."),
        ("What does modifier 33 do for colonoscopy billing?",
         "Modifier 33 indicates the service is a preventive service under the ACA, meaning no patient cost-sharing. It is required when a colonoscopy qualifies as an ACA Grade A/B preventive service. Without modifier 33, the claim may be processed as diagnostic with patient liability."),
        ("How are polypectomy codes selected?",
         "Selection is based on technique: 45384 for hot or cold forceps removal; 45385 for snare technique (hot or cold); 45390 for EMR of larger/complex lesions. The technique must be clearly documented in the procedure note."),
        ("Can sedation be billed separately for endoscopic procedures?",
         "Procedural sedation administered by the performing endoscopist is bundled into the procedure. However, if a separate anesthesiologist or CRNA provides MAC, they can bill separately using anesthesia codes."),
        ("What is required for capsule endoscopy (91110) coverage?",
         "Documentation must show: (1) clinical indication for small bowel evaluation, (2) failed or contraindicated push enteroscopy or standard imaging, (3) prior authorization obtained, and (4) no obstruction suspected."),
    ],
    "examples":[
        ("Screening Colonoscopy with Polypectomy","45385 (Colonoscopy with snare polypectomy)",["Z12.11 (Screening colonoscopy)"],["33"],
         "Annual screening colonoscopy. Two adenomatous polyps found in sigmoid colon. Snare polypectomy performed for both. Modifier 33 ensures ACA preventive coverage -- no patient cost-share."),
        ("EGD for GERD/Esophagitis","43239 (EGD with biopsy)",["K21.0 (GERD with esophagitis)"],[""],
         "Patient with chronic GERD, Barrett's esophagus surveillance. EGD performed with biopsies at GEJ and distal esophagus. Pathology specimens labeled by location."),
        ("ERCP with CBD Stone Extraction","43264 (ERCP with stone extraction)",["K80.50 (Calculus of bile duct)"],[""],
         "Patient with jaundice and elevated LFTs. ERCP reveals CBD stone. Sphincterotomy and stone extraction performed. Comprehensive code 43264 used -- do not separately bill sphincterotomy."),
    ],
})

SPECIALTIES.append({
    "slug":"urology","name":"Urology","emoji":"[kidney]",
    "meta_title":"Urology CPT Codes & Billing Guide 2026",
    "meta_desc":"Urology CPT codes, cystoscopy billing, prostate procedure modifiers, urological denial prevention, and compliance rules for urology billing teams.",
    "keywords":"urology CPT codes, cystoscopy billing, prostate biopsy CPT, urology modifiers, urology denial prevention",
    "overview":{
        "coverage":["Bladder and kidney evaluation","Prostate disease diagnosis and treatment","Urinary incontinence management","Kidney stone treatment","Male reproductive urological procedures"],
        "services":["Cystoscopy (diagnostic and therapeutic)","Prostate biopsy (transrectal/transperineal)","Lithotripsy (ESWL)","Ureteroscopy with laser lithotripsy","TURP and TURBT","Urodynamic studies"],
        "denials":["Cystoscopy medical necessity","Prostate biopsy frequency","Modifier 26/TC for urodynamic studies","Bilateral kidney procedures"],
        "scrutiny":["Repeat cystoscopy frequency","Prostate biopsy indication (PSA threshold)","TURBT vs TURP code selection","Urodynamic study component billing"]
    },
    "cpts":[
        ("52000","Cystoscopy, diagnostic","Surgical","0","","Hematuria, recurrent UTI, voiding symptoms: document indication","Medium",""),
        ("52204","Cystoscopy with biopsy","Surgical","0","","Biopsy of bladder lesion; pathology required","High",""),
        ("52352","Ureteroscopy with stone removal (basket)","Surgical","0","LT,RT","Stone location, size, laterality documented","High",""),
        ("52353","Ureteroscopy with laser lithotripsy","Surgical","0","LT,RT","Laser fiber type; stone size and composition","High",""),
        ("55700","Prostate biopsy, needle, transrectal","Surgical","0","","PSA level and DRE findings; number of cores","High",""),
        ("55866","Robotic laparoscopic radical prostatectomy","Surgical","90","80","Cancer diagnosis confirmed by biopsy required","High",""),
        ("52287","Cystoscopy with Botox bladder injection","Surgical","0","","OAB indication; prior anticholinergic failure","High",""),
        ("51784","Electromyography sphincter","Diagnostic","0","","EMG component of urodynamics","Medium",""),
        ("51741","Uroflowmetry, complex","Diagnostic","0","","Flow rate, voiding pattern, residual volume","Low",""),
        ("99214","Urology office visit, high complexity","E&M","0","25","Prostate cancer management or complex urological workup","Medium",""),
    ],
    "icd10":[
        ("N40.0","Benign prostatic hyperplasia without obstruction"),("C61","Malignant neoplasm of prostate"),
        ("N20.0","Calculus of kidney"),("N20.1","Calculus of ureter"),
        ("N30.00","Acute cystitis without hematuria"),("R31.9","Hematuria, unspecified"),
        ("N39.0","Urinary tract infection, site not specified"),("N39.3","Stress incontinence"),
        ("N39.41","Urge incontinence"),("N43.3","Hydrocele, unspecified"),
    ],
    "modifiers":["LT","RT","50","25","59","51"],
    "spec_modifiers":{},
    "denial_top5":[
        "Cystoscopy medical necessity -- recurring UTI or hematuria not documented before scope",
        "Prostate biopsy -- PSA threshold not documented or prior biopsy within frequency limit",
        "Bilateral ureteral procedure without modifier 50 or LT/RT",
        "Urodynamics component codes billed separately when comprehensive code covers them",
        "Botox bladder injection (52287) without documented failed anticholinergic medications",
    ],
    "risky_combos":[
        ("52352 + 52353 same ureter","Stone basket and laser for same stone -- use higher complexity code"),
        ("52000 + 52204 same session","Diagnostic cystoscopy is component of biopsy cystoscopy -- bill 52204 only"),
        ("55700 < 3 month intervals","Repeat prostate biopsy within short interval triggers medical review"),
        ("52287 without failed med doc","Botox bladder injection denied without documented anticholinergic failure"),
        ("51784 + 51741 without comprehensive","Urodynamics components: verify if comprehensive code covers both"),
    ],
    "doc_checklist":[
        "Hematuria workup: urinalysis, cytology, upper tract imaging before cystoscopy",
        "PSA level, DRE findings, and prostate imaging (MRI) before biopsy",
        "Prostate biopsy: number of cores taken, locations (systematic + targeted), pathology results",
        "Stone characteristics: size, location, laterality, Hounsfield units on CT",
        "BPH treatment: AUA symptom score, uroflowmetry, failed medical therapy (alpha-blocker)",
        "OAB and incontinence: symptom severity, voiding diary, failed anticholinergic documentation",
        "Laterality for all paired urological structures (LT/RT on all kidney/ureter claims)",
        "Cystoscopy report: visualization, mucosal findings, any abnormalities biopsied",
    ],
    "compliance":[
        ("medicare","LCD L33822","Cystoscopy: hematuria or recurrent UTI required; routine screening not covered"),
        ("medicare","Prostate Biopsy","PSA elevation or abnormal DRE documentation required"),
        ("commercial","UHC","Botox bladder injection (52287) requires prior auth and failed medication documentation"),
        ("commercial","Aetna","Robotic prostatectomy (55866) covered with confirmed prostate cancer diagnosis"),
        ("prior-auth","ESWL Lithotripsy","Prior auth required for most commercial plans; stone size criteria"),
        ("prior-auth","UroLift / Rezum","New technologies require prior auth; clinical criteria per payer policy"),
        ("frequency","Cystoscopy","Routine surveillance cystoscopy for bladder cancer at specific intervals"),
        ("frequency","Prostate Biopsy","Rebiopsy within 3 months requires documented clinical change in PSA"),
    ],
    "faq":[
        ("What workup is required before billing a cystoscopy?",
         "Workup should include urinalysis, urine culture (if infection suspected), urine cytology (if hematuria), and for upper tract evaluation, CT urogram or renal ultrasound. Document findings and clinical indication before scheduling."),
        ("How are prostate biopsy codes selected?",
         "55700 is used for transrectal needle biopsy. Document the number of cores taken, PSA value, DRE findings, and any MRI-targeted regions. Pathology results must be tracked and documented."),
        ("When is modifier 50 vs LT/RT used for urological procedures?",
         "For bilateral kidney or ureter procedures: modifier 50 indicates bilateral (150% payment on one line). Alternatively, list two lines with LT and RT. Verify payer preference -- Medicare typically prefers two line items."),
        ("What documentation prevents Botox bladder injection denial?",
         "52287 requires: (1) prior authorization, (2) documented diagnosis (neurogenic bladder, OAB), (3) failed adequate trial of anticholinergic medications (at least 2 agents), and (4) units of Botox injected (100U for OAB; 200U for neurogenic)."),
        ("How is ureteroscopy coded for bilateral kidney stones?",
         "Each ureteroscopic procedure is coded per ureter. If both ureters accessed in same session, bill the code twice with LT and RT. Modifier 50 may also be used depending on payer preference."),
    ],
    "examples":[
        ("Cystoscopy for Hematuria","52000 (Diagnostic cystoscopy)",["R31.9 (Hematuria)"],[""],
         "Patient with gross hematuria. CT urogram negative. Cystoscopy evaluates bladder mucosa. No lesions identified. Documentation includes CT result and hematuria workup."),
        ("Ureteroscopy with Laser Lithotripsy","52353 (URS with laser lithotripsy)",["N20.1 (Calculus of ureter)"],["LT"],
         "Left ureteral stone 8 mm on CT. Ureteroscopy performed; stone fragmented with holmium laser. Fragments basketed and removed. Stone sent for composition analysis. Modifier LT for left ureter."),
        ("Prostate Biopsy for Elevated PSA","55700 (Prostate needle biopsy)",["R97.20 (Elevated PSA)"],[""],
         "PSA 7.2 ng/mL, abnormal DRE. 12-core systematic biopsy. Each core labeled by location. Pathology returns Gleason 7 adenocarcinoma in 4 of 12 cores."),
    ],
})

SPECIALTIES.append({
    "slug":"psychiatry","name":"Psychiatry","emoji":"[brain]",
    "meta_title":"Psychiatry CPT Codes & Billing Guide 2026",
    "meta_desc":"Psychiatry CPT codes, psychotherapy billing, psychiatric E/M, medication management, and denial prevention for behavioral health billing teams.",
    "keywords":"psychiatry CPT codes, psychotherapy billing, psychiatric evaluation CPT, medication management billing, psychiatry denial prevention",
    "overview":{
        "coverage":["Psychiatric diagnostic evaluation","Psychotherapy (individual, group, family)","Pharmacological management","Collaborative care","Crisis services"],
        "services":["Psychiatric evaluation (90791/90792)","Psychotherapy (90832-90838)","E/M with psychotherapy add-on","Group therapy (90853)","Medication management","TMS therapy"],
        "denials":["Psychotherapy time documentation","E/M vs psychotherapy add-on billing","Group therapy participant count","TMS prior authorization"],
        "scrutiny":["Psychotherapy add-on with E/M time documentation","Crisis service medical necessity","Telepsychiatry compliance","Inpatient psychiatric E/M levels"]
    },
    "cpts":[
        ("90791","Psychiatric diagnostic evaluation, without medical services","E&M","0","","New patient evaluation; document DSM-5 diagnosis","Medium",""),
        ("90792","Psychiatric diagnostic evaluation, with medical services","E&M","0","","Includes medication assessment; prescriber only","High",""),
        ("90832","Psychotherapy, 30 minutes","Therapy","0","","Time must be documented; 16-37 minutes","High",""),
        ("90834","Psychotherapy, 45 minutes","Therapy","0","","38-52 minutes face-to-face time","High",""),
        ("90837","Psychotherapy, 60 minutes","Therapy","0","","53+ minutes; most common psychotherapy code","High",""),
        ("90833","Psychotherapy add-on, 30 min with E/M","Therapy","0","","Add-on to E/M; prescriber billing E/M plus therapy","High",""),
        ("90836","Psychotherapy add-on, 45 min with E/M","Therapy","0","","Total time includes both E/M and therapy time","High",""),
        ("90853","Group psychotherapy","Therapy","0","","Document number of participants (3-8 typical)","Medium",""),
        ("99213","Office visit, established, moderate complexity","E&M","0","","Medication management only -- no psychotherapy","Medium",""),
        ("99214","Office visit, established, high complexity","E&M","0","","Complex medication management; multiple diagnoses","High",""),
        ("90867","TMS, initial treatment","Therapy","0","","Prior auth required; depression criteria met","High",""),
        ("90839","Psychotherapy for crisis, 60 min","Therapy","0","","Life-threatening or functional impairment documented","High",""),
    ],
    "icd10":[
        ("F32.1","Major depressive disorder, moderate"),("F41.1","Generalized anxiety disorder"),
        ("F20.9","Schizophrenia, unspecified"),("F31.9","Bipolar disorder, unspecified"),
        ("F43.10","Post-traumatic stress disorder, unspecified"),("F60.3","Borderline personality disorder"),
        ("F90.0","ADHD, predominantly inattentive type"),("F10.20","Alcohol use disorder, moderate"),
        ("F84.0","Autism spectrum disorder"),("F50.00","Anorexia nervosa, unspecified"),
    ],
    "modifiers":["HF","GT","25"],
    "spec_modifiers":{},
    "denial_top5":[
        "Psychotherapy time not documented -- exact start/stop time or total face-to-face minutes required",
        "Psychotherapy add-on (90833) billed without corresponding E/M code from same encounter",
        "Group therapy participant count exceeds payer limits or not documented",
        "TMS (90867) denied without prior authorization or inadequate failed medication documentation",
        "Crisis service (90839) without documented life-threatening or severe functional impairment",
    ],
    "risky_combos":[
        ("90837 + 90833 same session","Cannot bill standalone and add-on psychotherapy for same session"),
        ("90791 + 90832 same day","Diagnostic evaluation and psychotherapy on same day: review payer rules"),
        ("90853 undocumented group size","Group therapy denied without participant count in documentation"),
        ("90867 without prior auth","TMS initial treatment denied without prior authorization"),
        ("90839 without safety assessment","Crisis therapy denied without documented risk assessment and plan"),
    ],
    "doc_checklist":[
        "Psychotherapy: start and stop time or exact face-to-face minutes for each session",
        "Diagnosis: DSM-5 diagnosis with specific code documented at each visit",
        "Medication management: current medications, doses, patient response, side effects",
        "Crisis service: documented safety risk assessment, plan, and clinical rationale",
        "TMS: prior auth number, failed antidepressant trials (2+ adequate trials), PHQ-9 score",
        "Group therapy: number of participants, session duration, therapist credentials",
        "Telehealth: patient location (home, clinic), technology platform, consent for telehealth",
        "Treatment plan: goals, interventions, frequency, estimated duration",
    ],
    "compliance":[
        ("medicare","Psychotherapy Time","Medicare requires face-to-face time documentation; supervising physician must co-sign"),
        ("medicare","TMS Coverage","Covered for depression after 2+ failed antidepressant trials; prior auth required"),
        ("commercial","Anthem","Behavioral health carve-out: verify which entity manages mental health benefits"),
        ("commercial","Cigna","Psychotherapy frequency limits: concurrent authorization often required after 20 sessions"),
        ("prior-auth","TMS","Prior auth required by virtually all payers; clinical criteria include PHQ-9 score"),
        ("prior-auth","Inpatient Psychiatric","Concurrent review required daily for most payers; discharge planning required"),
        ("frequency","Psychotherapy","Many payers limit frequency without concurrent authorization after 20-30 sessions"),
        ("frequency","Group Therapy","Participant limits (typically 3-8); group size must be documented"),
    ],
    "faq":[
        ("How is time documented for psychotherapy billing?",
         "Document exact start and stop time of face-to-face psychotherapy, or total face-to-face minutes. Code selection: 90832 = 16-37 minutes; 90834 = 38-52 minutes; 90837 = 53+ minutes. Do not count time spent on documentation or phone calls."),
        ("What is the difference between 90791 and 90792?",
         "90791 is a psychiatric diagnostic evaluation without medical services -- used by therapists, psychologists, and non-prescribing clinicians. 90792 includes medical services (medication assessment and prescribing) and is used by prescribers."),
        ("How are E/M and psychotherapy billed together?",
         "When a prescriber provides both medication management (E/M) and psychotherapy in the same session, bill the E/M code (99212-99215) plus the psychotherapy add-on code (90833, 90836, or 90838). Time spent on each component must be documented. Modifier 25 is NOT required on the E/M."),
        ("What documentation is required for TMS prior authorization?",
         "Required: PHQ-9 score showing moderate-severe depression, at least 2 adequate antidepressant trials (adequate dose and duration), tolerance issues, current treatment plan, and proposed TMS protocol."),
        ("Can telehealth psychotherapy be billed the same as in-person?",
         "Yes -- for most payers, telehealth psychotherapy using real-time audio-video (modifier GT or 95) is reimbursed at the same rate. Document patient location, platform used, and patient consent for telehealth."),
    ],
    "examples":[
        ("New Psychiatric Evaluation with Medication","90792 (Psychiatric eval with medical services)",["F32.1 (Major depression)"],[""],
         "New patient with depression. Psychiatric evaluation includes mental status exam, DSM-5 diagnosis, medication history, and antidepressant initiation. 90792 appropriate as prescriber conducts both evaluation and medication assessment."),
        ("Psychotherapy plus Medication Management","99214 + 90836",["F41.1 (GAD), F32.1 (MDD)"],[""],
         "First 20 minutes: medication management (E/M 99214 -- two diagnoses, prescription adjustment). Next 45 minutes: psychotherapy (90836 add-on). Total 65 minutes. Document both components time separately."),
        ("TMS for Treatment-Resistant Depression","90867 (TMS, initial)",["F32.2 (MDD, severe)"],[""],
         "Patient with severe depression, failed sertraline and venlafaxine. PHQ-9 score 18. Prior auth obtained. TMS initiated at standard protocol. Document each session duration and patient response."),
    ],
})

SPECIALTIES.append({
    "slug":"oncology","name":"Oncology","emoji":"[ribbon]",
    "meta_title":"Oncology CPT Codes & Billing Guide 2026",
    "meta_desc":"Oncology CPT codes, chemotherapy administration billing, infusion therapy modifiers, and denial prevention for oncology billing teams.",
    "keywords":"oncology CPT codes, chemotherapy billing, infusion therapy CPT, oncology modifiers, cancer treatment billing",
    "overview":{
        "coverage":["Chemotherapy administration (IV, SQ, oral)","Immunotherapy and targeted therapy infusions","Radiation oncology","Surgical oncology","Palliative care and supportive services"],
        "services":["Chemotherapy infusion (96413/96415)","Immunotherapy administration","E/M for oncology (99213-99215)","Port access and flush","Growth factor injections","Biopsy and surgical staging"],
        "denials":["Chemotherapy drug not FDA-approved for diagnosis","Infusion time documentation","Concurrent infusion vs sequential billing","Missing prior auth for immunotherapy"],
        "scrutiny":["Drug compendia compliance","Infusion hierarchy coding","Biosimilar vs reference biologic billing","Clinical trial billing"]
    },
    "cpts":[
        ("96413","Chemotherapy infusion, up to 1 hour","Therapy","0","","Drug name, dose, route, infusion time documented","High",""),
        ("96415","Chemotherapy infusion, each additional hour","Therapy","0","","Add-on to 96413; document each additional hour","High",""),
        ("96417","Chemotherapy infusion, concurrent drug","Therapy","0","","Second chemo drug infused concurrently with first","High",""),
        ("96401","Chemotherapy, SQ/IM injection","Therapy","0","","Drug, dose, injection site documented","Medium",""),
        ("96365","IV infusion, non-chemo, up to 1 hour","Therapy","0","","Supportive therapy (antiemetics, hydration, Zofran)","Medium",""),
        ("96367","IV infusion, non-chemo, each additional hour","Therapy","0","","Add-on to 96365; document additional time","Medium",""),
        ("96360","IV hydration, first 31 min","Therapy","0","","Cannot be primary if other infusion given same day","Medium",""),
        ("96372","Injection, therapeutic/prophylactic","Therapy","0","","Growth factors (Neupogen, Zarxio); drug name required","Low",""),
        ("77385","IMRT treatment delivery","Therapy","0","","Radiation oncology; daily fractions","High",""),
        ("38220","Bone marrow aspiration","Surgical","0","LT,RT","Staging or diagnosis; site documented","High",""),
        ("99214","Oncology office visit, high complexity","E&M","0","25","Treatment decision-making, toxicity management","Medium",""),
    ],
    "icd10":[
        ("C34.10","Malignant neoplasm of upper lobe, bronchus/lung"),
        ("C50.911","Malignant neoplasm of breast, unspecified, female"),
        ("C18.9","Malignant neoplasm of colon, unspecified"),
        ("C61","Malignant neoplasm of prostate"),
        ("C91.00","Acute lymphoblastic leukemia, not achieved remission"),
        ("C83.30","Diffuse large B-cell lymphoma"),
        ("Z79.899","Long-term use of other medication (chemotherapy)"),
        ("T45.1X5A","Adverse effect of antineoplastic drugs, initial encounter"),
    ],
    "modifiers":["JW","JZ","25","59"],
    "spec_modifiers":{},
    "denial_top5":[
        "Chemotherapy drug not covered for the billed diagnosis -- compendia compliance required",
        "Infusion time not documented -- start/stop time required for all infusion codes",
        "Concurrent infusion (96417) without documented second drug infusing simultaneously",
        "Hydration (96360) billed as primary when other infusions given same day",
        "Prior auth missing for immunotherapy or targeted therapy drugs",
    ],
    "risky_combos":[
        ("96413 + 96365 same day","Non-chemo infusion is secondary to chemo; hierarchy rules apply"),
        ("96360 as primary","Hydration cannot be primary if chemo or other infusions administered same session"),
        ("96415 without 96413","Each-additional-hour add-on requires primary code on same claim"),
        ("Drug + J-code mismatch","J-code used must exactly match administered drug"),
        ("No JW/JZ on single-dose vials","Medicare requires waste reporting on single-dose vials"),
    ],
    "doc_checklist":[
        "Drug name, dose, route of administration, and lot number in infusion record",
        "Infusion start and stop time for each agent administered",
        "Drug compendia citation (NCCN, ClinicalEvidence) for off-label use",
        "Prior authorization number for immunotherapy and high-cost targeted agents",
        "Waste documentation: vial size, amount administered, amount discarded (for JW)",
        "Patient weight for weight-based dosing verification",
        "Toxicity assessment and dose modifications documented at each visit",
        "Performance status (ECOG/Karnofsky) documented to support treatment continuation",
    ],
    "compliance":[
        ("medicare","Compendia Compliance","Off-label chemo use must be supported by NCCN, DrugDex, or ClinicalEvidence"),
        ("medicare","Infusion Hierarchy","Primary code = most resource-intensive; subsequent = additional hours/drugs"),
        ("commercial","UHC","Immunotherapy requires prior auth with PD-L1 testing results"),
        ("commercial","Cigna","Biosimilar substitution policies: payer may require biosimilar over reference biologic"),
        ("prior-auth","Immunotherapy","Checkpoint inhibitors require prior auth; biomarker documentation required"),
        ("prior-auth","CAR-T Therapy","Prior auth with oncologist attestation and treatment center certification"),
        ("frequency","Radiation Fractions","Fraction count per course documented; IMRT planning codes once per course"),
        ("frequency","Growth Factors","G-CSF frequency tied to chemotherapy cycle; document nadir ANC"),
    ],
    "faq":[
        ("How is chemotherapy infusion time coded?",
         "96413 covers the first hour of IV chemotherapy infusion. For each additional hour, add 96415. If a second chemotherapy drug is infused concurrently (same time), add 96417. If administered sequentially (after first drug is complete), bill 96413 for each sequential drug. Always document exact start/stop times."),
        ("What are drug compendia and why do they matter?",
         "Drug compendia (NCCN Guidelines, ClinicalEvidence, DrugDex) establish which cancer drugs are appropriate for specific diagnoses. Medicare and commercial payers require that chemotherapy use is supported by compendia listings. Off-label use not listed is routinely denied."),
        ("When is modifier JW required?",
         "Medicare requires modifier JW when a single-dose vial drug has any discarded waste. Bill one line for amount administered (with JZ) and a separate line for discarded amount (with JW). Failure to report waste can be considered fraudulent billing."),
        ("How is hydration coded when given with chemotherapy?",
         "Hydration (96360/96361) is not the primary service when chemotherapy is also administered the same session. It is reported as a sequential or concurrent infusion under infusion hierarchy rules. Document the clinical rationale and timing."),
        ("What documentation is required for immunotherapy prior auth?",
         "Required: (1) confirmed cancer diagnosis with stage, (2) biomarker testing results (e.g., PD-L1 expression), (3) line of therapy (first-line vs second-line), (4) ECOG performance status, and (5) proposed drug, dose, and treatment schedule."),
    ],
    "examples":[
        ("Chemotherapy Infusion for Lung Cancer","96413 + 96415 x2 + 96365",["C34.10 (Lung cancer)"],[""],
         "Patient receives carboplatin over 1 hour (96413) followed by 2 additional hours (96415 x2). Ondansetron administered as non-chemo supportive infusion (96365) before chemo. Total infusion time documented. Drug names, doses, start/stop times recorded."),
        ("Immunotherapy with Pembrolizumab","96413",["C34.10 (Lung cancer), Z79.899"],["JZ"],
         "PD-L1 positive NSCLC. Prior auth obtained. Pembrolizumab 200mg IV over 30 minutes. J-code J9271 used. JZ modifier indicates no drug waste from single-dose vial."),
        ("Oncology Follow-up Visit","99214 (Oncology E/M)",["C50.911 (Breast cancer), T45.1X5A"],[""],
         "Established breast cancer patient on chemotherapy. High complexity E/M: toxicity assessment, dose modification, lab review. Treatment decision-making documented separately from chemotherapy visit."),
    ],
})

SPECIALTIES.append({
    "slug":"nephrology","name":"Nephrology","emoji":"[kidney]",
    "meta_title":"Nephrology CPT Codes & Billing Guide 2026",
    "meta_desc":"Nephrology CPT codes, dialysis billing, ESRD management, renal biopsy coding, and denial prevention for nephrology billing teams.",
    "keywords":"nephrology CPT codes, dialysis billing, ESRD management CPT, renal biopsy billing, nephrology denial prevention",
    "overview":{
        "coverage":["Chronic kidney disease management (CKD stages 1-5)","End-stage renal disease (ESRD) and dialysis","Acute kidney injury management","Kidney transplant care","Glomerular disease management"],
        "services":["ESRD monthly capitation (90957-90970)","Hemodialysis (90935/90937)","Peritoneal dialysis (90945/90947)","Renal biopsy (50200)","Kidney transplant follow-up","AV fistula access management"],
        "denials":["ESRD monthly capitation vs fee-for-service overlap","Dialysis visit count accuracy","Renal biopsy imaging guidance billing","Transplant immunosuppression coverage"],
        "scrutiny":["ESRD capitation vs individual dialysis code overlap","Monthly visit count for ESRD codes","Biopsy approach documentation","ESA administration"]
    },
    "cpts":[
        ("90960","ESRD-related services, monthly (20+ yrs), 4 visits","E&M","0","","Monthly capitation; must document 4+ in-person visits","High",""),
        ("90961","ESRD-related services, monthly (20+ yrs), 2-3 visits","E&M","0","","Document exact visit count; 2-3 visits in month","High",""),
        ("90962","ESRD-related services, monthly (20+ yrs), 1 visit","E&M","0","","Highest payment reduction; document clinical reason","High",""),
        ("90935","Hemodialysis, 1 evaluation","Diagnostic","0","","Single evaluation during HD; outpatient setting","Medium",""),
        ("90937","Hemodialysis, repeated evaluations","Diagnostic","0","","Multiple evaluations for unstable patient","High",""),
        ("50200","Renal biopsy, percutaneous","Surgical","0","","Imaging guidance add-on if used; bilateral involvement","High",""),
        ("36821","AV fistula creation, forearm","Surgical","90","LT,RT","Most common access; document vessels used","High",""),
        ("99232","Subsequent hospital care, moderate complexity","E&M","0","","AKI admission follow-up; fluid/electrolyte management","High",""),
    ],
    "icd10":[
        ("N18.4","Chronic kidney disease, stage 4"),("N18.5","Chronic kidney disease, stage 5"),
        ("N18.6","End-stage renal disease"),("N17.9","Acute kidney failure, unspecified"),
        ("N04.9","Nephrotic syndrome, unspecified"),("N03.9","Chronic nephritic syndrome, unspecified"),
        ("Z99.2","Dependence on renal dialysis"),("T86.10","Kidney transplant rejection"),
        ("E11.65","Type 2 diabetes with hyperglycemia"),("I12.9","Hypertensive CKD"),
    ],
    "modifiers":["25","LT","RT","76","GY"],
    "spec_modifiers":{},
    "denial_top5":[
        "ESRD monthly capitation visit count mismatch -- billed code requires more visits than documented",
        "Individual hemodialysis codes billed when monthly ESRD capitation was already paid",
        "Renal biopsy (50200) without documented imaging guidance when ultrasound was used",
        "AV fistula creation without laterality modifier (LT/RT)",
        "ESA administration without documented hemoglobin level and dose calculation",
    ],
    "risky_combos":[
        ("90960 + 90935 same month","ESRD capitation includes HD evaluations -- cannot bill 90935 separately"),
        ("90960 with only 2 visits","Monthly capitation 4-visit code requires 4 documented in-person visits"),
        ("50200 without imaging code","If ultrasound used for biopsy guidance, add 76942 -- do not omit"),
        ("36821 no laterality","AV fistula creation must always include LT or RT modifier"),
        ("ESA without Hgb documentation","ESA claims denied without hemoglobin level documented before each administration"),
    ],
    "doc_checklist":[
        "ESRD monthly: exact count of in-person physician visits for the calendar month",
        "Dialysis flow sheets: date, duration, machine parameters, access used, patient assessment",
        "Renal biopsy: approach (percutaneous vs open), imaging guidance used, complications",
        "AV fistula: vessels anastomosed, laterality, intraoperative blood flow measurements",
        "ESA administration: hemoglobin level (<10 g/dL for Medicare), dose, route, response",
        "Transplant follow-up: tacrolimus/cyclosporine levels, rejection signs, immunosuppression adjustments",
        "CKD stage: GFR calculation and documentation at each visit",
        "Home dialysis training: session count, patient/caregiver competency demonstrated",
    ],
    "compliance":[
        ("medicare","ESRD Bundled Payment","ESRD monthly codes include most dialysis-related services; few services carve-out"),
        ("medicare","ESA Coverage","Epoetin alfa/darbepoetin: hemoglobin must be <10 g/dL for Medicare coverage"),
        ("commercial","UHC","Dialysis facility and physician services billed separately; verify benefit structure"),
        ("commercial","Aetna","Home dialysis training covered with documented clinical indication"),
        ("prior-auth","Kidney Transplant","Transplant evaluation and all post-transplant services require prior auth coordination"),
        ("prior-auth","ESAs and Iron","Some commercial plans require auth for ESA administration"),
        ("frequency","ESA Hemoglobin","Monitor hemoglobin every 4 weeks during ESA therapy; adjustment required at 11 g/dL"),
        ("frequency","Access Evaluation","AV fistula maturation assessment at 4-6 weeks post-creation"),
    ],
    "faq":[
        ("How are ESRD monthly capitation codes selected?",
         "Code is based on number of face-to-face physician visits in the calendar month: 90960 = 4+ visits; 90961 = 2-3 visits; 90962 = 1 visit. Visit count must be exactly documented. Individual hemodialysis codes cannot be billed additionally within the same month."),
        ("What services are carved out from the ESRD bundle?",
         "Services carved out include: renal biopsy, transplant evaluation, inpatient services, non-ESRD-related services, certain injectable drugs (ESAs, iron), and services for conditions unrelated to ESRD. These can be billed separately."),
        ("How is a renal biopsy coded when ultrasound guidance is used?",
         "Bill 50200 for the percutaneous renal biopsy plus 76942 for ultrasound guidance if real-time imaging was used. Do not bill 50200 alone if guidance was used."),
        ("What are ESA coverage requirements for Medicare?",
         "Medicare Part B covers ESAs for dialysis patients when hemoglobin is <10 g/dL. The hemoglobin level must be documented before each administration. If hemoglobin reaches 11 g/dL, dose adjustment is required."),
        ("How is AV fistula maintenance coded vs creation?",
         "AV fistula creation (36818/36821) is the surgical procedure connecting artery and vein. Maintenance procedures -- angioplasty (36902), thrombectomy (36904), fistulagrams (36901) -- are separate codes billed when the access requires intervention. Always document laterality."),
    ],
    "examples":[
        ("ESRD Monthly Management -- 4 Visits","90960 (ESRD monthly, 4 visits)",["N18.6 (ESRD), Z99.2 (Dialysis dependence)"],[""],
         "Nephrologist sees ESRD patient 4 times in calendar month at dialysis facility. Monthly capitation 90960 billed. Individual HD evaluation codes not separately billable. Visit dates documented."),
        ("Renal Biopsy for Nephrotic Syndrome","50200 + 76942",["N04.9 (Nephrotic syndrome)"],[""],
         "Patient with unexplained nephrotic syndrome. Percutaneous renal biopsy under real-time ultrasound guidance. Bill 50200 (biopsy) and 76942 (US guidance). Both procedure note and radiology report document imaging use."),
        ("AKI Management -- Inpatient","99232 (Subsequent hospital care)",["N17.9 (Acute kidney failure), J18.9 (Pneumonia)"],[""],
         "Patient admitted for pneumonia develops AKI. Nephrology consulted; daily subsequent hospital care for fluid and electrolyte management. Document AKI stage, urine output, BUN/creatinine trends."),
    ],
})

SPECIALTIES.append({
    "slug":"ob-gyn","name":"OB-GYN","emoji":"[baby]",
    "meta_title":"OB-GYN CPT Codes & Billing Guide 2026",
    "meta_desc":"OB-GYN CPT codes, maternity care billing, gynecologic surgery coding, modifier usage, and denial prevention for OB-GYN billing teams.",
    "keywords":"OB-GYN CPT codes, maternity care billing, global OB package, gynecologic surgery CPT, ob-gyn denial prevention",
    "overview":{
        "coverage":["Obstetric care (antepartum, delivery, postpartum)","Gynecological evaluation and surgery","Contraception and family planning","Menopausal management","Oncological gynecology"],
        "services":["Global OB package (59400/59510/59610)","Antepartum care visits","Cesarean delivery","Hysterectomy procedures","Colposcopy and LEEP","Pap smear and pelvic ultrasound"],
        "denials":["Global OB package completeness","OB care split between providers","Elective C-section medical necessity","Laparoscopic vs open hysterectomy code selection"],
        "scrutiny":["Global OB package components","Ectopic pregnancy surgery","VBAC eligibility and documentation","IVF and infertility treatment coverage"]
    },
    "cpts":[
        ("59400","Routine obstetric care, vaginal delivery, global","Surgical","0","","Includes antepartum, delivery, postpartum -- all by same provider","High",""),
        ("59510","Routine obstetric care, cesarean delivery, global","Surgical","0","80","Elective C-section requires medical necessity documentation","High",""),
        ("59409","Vaginal delivery only (no antepartum/postpartum)","Surgical","0","","Used when provider changes during OB course","High",""),
        ("59515","Cesarean delivery only (no antepartum/postpartum)","Surgical","0","80","Split OB care -- different provider does delivery","High",""),
        ("59610","Routine obstetric care, VBAC, global","Surgical","0","","VBAC eligibility documentation required","High",""),
        ("59025","Non-stress test, fetal","Diagnostic","0","26,TC","Indication documented: post-dates, IUGR, high-risk","Medium",""),
        ("76811","Ultrasound OB, complete (after 14 wks)","Imaging","0","26,TC","Anatomy survey documented; measurements","Medium",""),
        ("57461","Colposcopy with loop excision of cervix (LEEP)","Surgical","0","","Abnormal Pap or colposcopy indication required","High",""),
        ("58150","Hysterectomy, abdominal, total","Surgical","90","80","Indication: fibroid, cancer, AUB; pathology required","High",""),
        ("58571","Laparoscopic hysterectomy, total","Surgical","90","80","Laparoscopic approach documented; convert if needed","High",""),
        ("58661","Laparoscopic oophorectomy","Surgical","90","LT,RT,50","Laterality required; pathology required","High",""),
    ],
    "icd10":[
        ("Z34.00","Encounter for supervision of normal first pregnancy"),
        ("O80","Encounter for full-term uncomplicated delivery"),
        ("O82","Encounter for cesarean delivery without indication"),
        ("Z37.0","Single liveborn infant, delivered vaginally"),
        ("N80.0","Endometriosis of uterus"),("D25.9","Leiomyoma of uterus, unspecified"),
        ("N92.0","Excessive/frequent menstruation with regular cycle"),
        ("Z12.72","Encounter for screening for cervical malignancy"),
        ("O20.0","Threatened abortion"),("O30.001","Twin pregnancy, first trimester"),
    ],
    "modifiers":["22","50","51","80","LT","RT","TC","26"],
    "spec_modifiers":{},
    "denial_top5":[
        "Global OB package billed but provider changed mid-course -- must split into components",
        "Elective C-section (59510) without documented medical indication",
        "NST (59025) billed without documented high-risk clinical indication",
        "Hysterectomy approach documentation missing -- laparoscopic vs open code mismatch",
        "Infertility treatments (IVF, IUI) denied -- often explicitly excluded from coverage",
    ],
    "risky_combos":[
        ("59400 + antepartum codes","Global OB code includes antepartum -- do not bill separately"),
        ("59510 without medical indication","Elective C-section denied without documented clinical necessity"),
        ("76805 + 76811 same session","OB ultrasound limited and complete: mutually exclusive for same visit"),
        ("58150 + 58661 same day","Abdominal and laparoscopic hysterectomy codes: mutually exclusive"),
        ("59610 without VBAC eligibility doc","VBAC global denied without documented prior C-section details"),
    ],
    "doc_checklist":[
        "Global OB package: all antepartum visits, delivery note, and postpartum visit documented",
        "Delivery note: presenting part, anesthesia, delivery method, complications, newborn status",
        "C-section: surgical indication documented (failed progress, fetal distress, malpresentation)",
        "Ultrasound: gestational age, fetal measurements, anatomy survey, placenta location",
        "NST/BPP: strip documented, scoring, clinical indication (post-dates, decreased movement)",
        "Hysterectomy: approach, instruments, specimen description, any conversion from lap to open",
        "LEEP/colposcopy: abnormal Pap result, colposcopy findings, biopsy results",
        "Split OB care: each provider bills only their component with appropriate code",
    ],
    "compliance":[
        ("medicare","Global OB Package","Medicare Advantage covers OB; global 59400 includes all routine prenatal visits"),
        ("medicare","C-Section Necessity","Elective C-section at <39 weeks requires documented medical indication"),
        ("commercial","Infertility Coverage","IVF/IUI coverage varies widely; many plans explicitly exclude infertility treatment"),
        ("commercial","BCBS","VBAC: requires documentation of prior C-section type and eligibility criteria"),
        ("prior-auth","Scheduled C-Section","Most plans require notification or auth for elective repeat C-section"),
        ("prior-auth","Hysterectomy","Elective hysterectomy requires prior auth; medical necessity criteria must be met"),
        ("frequency","Prenatal Ultrasounds","Medicare and most payers cover 2 OB ultrasounds; additional require documentation"),
        ("frequency","NST/BPP","Covered as medically indicated for high-risk pregnancies; document risk factor"),
    ],
    "faq":[
        ("What is included in the global OB package?",
         "The global OB package (59400 for vaginal, 59510 for C-section) includes all antepartum visits (typically 13 for uncomplicated pregnancies), the delivery, and one postpartum visit. All services must be by the same physician or group. If care is split, each provider bills only their component."),
        ("How is OB care billed when the provider changes mid-pregnancy?",
         "The prenatal provider bills antepartum care codes (59425 for up to 7 visits; 59426 for 7+ visits); the delivering provider bills delivery-only codes (59409 vaginal or 59515 C-section) plus the postpartum visit (59430). Do not use the global codes."),
        ("What documentation is required for C-section medical necessity?",
         "Document the clinical indication clearly in the delivery note: failure to progress, category II or III fetal heart rate tracing, malpresentation, placenta previa, umbilical cord prolapse, or other documented complications."),
        ("Is infertility treatment covered by insurance?",
         "Coverage varies significantly. Some states mandate infertility coverage; many plans explicitly exclude IVF, IUI, and fertility medications. Diagnostic workup (HSG, semen analysis, hormone tests) is often covered even when treatment is excluded."),
        ("How is laparoscopic hysterectomy coded differently from open?",
         "Laparoscopic hysterectomy uses codes 58570-58573 depending on uterine weight and adnexa removal. Open abdominal hysterectomy uses 58150-58240. Vaginal hysterectomy uses 58260-58294. Code selection must match the documented approach in the operative note."),
    ],
    "examples":[
        ("Global Vaginal Delivery","59400 (Global OB vaginal delivery)",["O80 (Normal delivery), Z37.0 (Liveborn)"],[""],
         "Uncomplicated pregnancy with same OB providing all care. Global code 59400 covers all antepartum visits, vaginal delivery, and postpartum visit. Delivery note documents: spontaneous onset of labor, vertex presentation, uncomplicated delivery, APGAR scores."),
        ("Emergency C-Section for Fetal Distress","59515 (C-section delivery only)",["O82 (C-section), Z37.0 (Liveborn)"],[""],
         "Patient transferred for delivery. Different provider performs C-section. Bill 59515 (delivery only). Medical necessity documented: category III fetal heart rate tracing requiring emergent delivery."),
        ("LEEP for CIN 2","57461 (Colposcopy with LEEP)",["N87.1 (Moderate cervical dysplasia)"],[""],
         "Abnormal Pap with HSIL result. Colposcopy shows CIN 2. LEEP performed in same session. Code 57461 appropriate for colposcopy with loop excision. Document transformation zone involvement and margins."),
    ],
})

SPECIALTIES.append({
    "slug":"ophthalmology","name":"Ophthalmology","emoji":"[eye]",
    "meta_title":"Ophthalmology CPT Codes & Billing Guide 2026",
    "meta_desc":"Ophthalmology CPT codes, cataract surgery billing, retinal procedure coding, eye exam modifiers, and denial prevention for ophthalmology billing teams.",
    "keywords":"ophthalmology CPT codes, cataract surgery billing, eye exam CPT 92002, retinal injection billing, ophthalmology denial prevention",
    "overview":{
        "coverage":["Comprehensive and intermediate eye exams","Cataract surgery and lens implantation","Retinal procedures (injections, laser, surgery)","Glaucoma management","Oculoplastic and orbital surgery"],
        "services":["Eye exams (92002-92014)","Cataract surgery (66984)","Intravitreal injections (67028)","Laser photocoagulation (67228)","Glaucoma procedures","VEGF therapy for AMD"],
        "denials":["Eye exam vs medical E/M code selection","Bilateral cataract surgery timing","VEGF injection prior authorization","Routine vs medical refractive exam coding"],
        "scrutiny":["Cataract surgery medical necessity (visual acuity threshold)","Frequency of intravitreal injections","Routine refraction billing (non-covered)","Glaucoma procedure code selection"]
    },
    "cpts":[
        ("92014","Ophthalmological examination, established, comprehensive","E&M","0","25","Medical eye exam; not for routine refraction","Medium",""),
        ("92004","Ophthalmological examination, new patient, comprehensive","E&M","0","25","New patient; document medical condition examined","Medium",""),
        ("92012","Ophthalmological examination, established, intermediate","E&M","0","25","Established patient with presenting eye complaint","Low",""),
        ("66984","Cataract extraction, phacoemulsification, IOL implant","Surgical","90","LT,RT","VA documentation required; medical necessity criteria","High",""),
        ("66982","Complex cataract extraction, phacoemulsification, IOL","Surgical","90","LT,RT","Complexity factors must be documented in op note","High",""),
        ("67028","Intravitreal injection","Surgical","0","LT,RT","Drug name, dose, route documented; prior auth for VEGF","High",""),
        ("67228","Laser photocoagulation, peripheral retina","Surgical","0","LT,RT","Fundus photo documentation; FA if applicable","High",""),
        ("92083","Visual field examination, extended","Diagnostic","0","","Glaucoma monitoring; specify eye(s) tested","Medium",""),
        ("92250","Fundus photography with interpretation","Diagnostic","0","26","Retinal documentation; signed report required","Low",""),
        ("66170","Trabeculectomy, glaucoma","Surgical","90","LT,RT","IOP documentation; failed medications required","High",""),
    ],
    "icd10":[
        ("H25.11","Age-related nuclear cataract, right eye"),
        ("H25.12","Age-related nuclear cataract, left eye"),
        ("H35.31","Nonexudative AMD, right eye"),
        ("H35.341","Exudative AMD, right eye"),
        ("H40.10X0","Open-angle glaucoma, unspecified"),
        ("H43.39","Other vitreous opacities"),
        ("H02.401","Unspecified ptosis, right eyelid"),
        ("H53.11","Subjective visual disturbances"),
        ("Z01.00","Eye exam without abnormal findings"),
        ("H26.009","Unspecified infantile and juvenile cataract"),
    ],
    "modifiers":["LT","RT","50","25","TC","26"],
    "spec_modifiers":{},
    "denial_top5":[
        "Cataract surgery medical necessity -- visual acuity threshold not documented (usually 20/50 or worse)",
        "VEGF injection (Avastin/Lucentis) prior authorization missing or expired",
        "Routine refraction (92015) billed to Medicare -- non-covered service",
        "Bilateral cataract surgery on same day -- most payers do not allow",
        "Eye exam code (92014) vs E/M code (99214) -- wrong code type for service provided",
    ],
    "risky_combos":[
        ("66984 bilateral same day","Bilateral cataract surgery same session: almost universally denied"),
        ("92015 to Medicare","Refraction code is non-covered by Medicare; patient self-pay only"),
        ("67028 no LT/RT","VEGF injection without laterality modifier: automatic payer edit"),
        ("92014 + 99214 same visit","Eye-specific exam and standard E/M for same visit: cannot bill both"),
        ("66984 + 66982 same eye","Complex and standard cataract surgery codes: mutually exclusive"),
    ],
    "doc_checklist":[
        "Visual acuity (corrected and uncorrected) documented for cataract surgery necessity",
        "Cataract density grading and functional impact on daily activities",
        "Intravitreal injection: drug name, concentration, dose, laterality, consent",
        "Prior authorization number for VEGF therapy and complex retinal procedures",
        "Fundus photographs and fluorescein angiography for retinal procedures",
        "IOP readings and visual field series for glaucoma procedure documentation",
        "Failed medical therapy for glaucoma before surgical intervention",
        "Contact lens fitting: medical indication (not cosmetic), base curve, power",
    ],
    "compliance":[
        ("medicare","Cataract Surgery","Visual acuity must typically be 20/50 or worse with documented functional limitation"),
        ("medicare","Refraction Non-covered","92015 (refraction) is a non-covered Medicare service; patient self-pay only"),
        ("commercial","VEGF Therapy","Avastin, Lucentis: prior auth required; step therapy may apply"),
        ("commercial","BCBS","AMD injections: frequency limits typically every 4-8 weeks; document OCT findings"),
        ("prior-auth","VEGF Injections","Universal prior auth requirement; OCT imaging and VA documentation submitted"),
        ("prior-auth","Glaucoma Surgery","Trabeculectomy and drainage devices require prior auth; failed medication documentation"),
        ("frequency","Intravitreal Injections","Frequency based on OCT and VA response; document clinical need at each injection"),
        ("frequency","Visual Field Testing","Glaucoma monitoring: typically every 6-12 months; more frequent for progression"),
    ],
    "faq":[
        ("When should eye-specific exam codes (92002-92014) be used vs standard E/M codes?",
         "Eye-specific ophthalmological exam codes (92002-92014) are used by ophthalmologists for comprehensive or intermediate eye examinations. Standard E/M codes (99202-99215) are used for medical management of eye conditions rather than a comprehensive eye examination. They should not be billed for the same encounter."),
        ("What visual acuity threshold is required for cataract surgery coverage?",
         "Most payers (including Medicare) require documented best-corrected visual acuity of 20/50 or worse in the affected eye, or documentation of functional limitations (glare, diplopia, inability to drive). The ophthalmologist must document that the cataract is the primary cause."),
        ("How is VEGF injection prior authorization obtained?",
         "Submit prior auth with: (1) diagnosis (wet AMD, DME, CRVO), (2) OCT images showing fluid/hemorrhage, (3) visual acuity measurements, (4) planned drug and frequency. Most payers use drug-specific criteria -- bevacizumab (Avastin) is often required first-line."),
        ("How is complex cataract surgery (66982) documented vs standard (66984)?",
         "Code 66982 requires documentation of complicating conditions: zonular weakness, pseudoexfoliation, poor pupil dilation, extreme axial length, corneal transplant, vitrectomy history, or other factors. These must be documented in both the pre-operative assessment AND the operative note."),
        ("Is bilateral cataract surgery on the same day covered?",
         "Almost universally no -- bilateral same-day cataract surgery is not covered by Medicare or most commercial payers. The second eye must be done in a separate session (typically 2-4 weeks later). Exceptions exist for children under anesthesia."),
    ],
    "examples":[
        ("Phacoemulsification Cataract Surgery","66984 (Cataract extraction with IOL)",["H25.12 (Nuclear cataract, left eye)"],["LT"],
         "VA 20/80 left eye best corrected. Functional limitation: unable to drive. Phacoemulsification with posterior chamber IOL. Modifier LT for left eye. Post-op visits in 90-day global bundled."),
        ("Intravitreal Anti-VEGF Injection","67028 (Intravitreal injection)",["H35.341 (Exudative AMD, right eye)"],["RT"],
         "Prior auth obtained for bevacizumab. OCT shows subretinal fluid. Injection of 1.25mg/0.05mL bevacizumab into right vitreous. Modifier RT. Drug documented by name and dose."),
        ("Comprehensive Eye Exam for Glaucoma","92014 (Comprehensive eye exam, established)",["H40.10X0 (Open-angle glaucoma)"],[""],
         "Established glaucoma patient. IOP 24 mmHg OD, 22 mmHg OS on current drops. Visual fields reviewed. Cup-to-disc ratio documented. Medication adjusted. Medical eye exam code 92014 appropriate."),
    ],
})

SPECIALTIES.append({
    "slug":"pain-management","name":"Pain Management","emoji":"[pill]",
    "meta_title":"Pain Management CPT Codes & Billing Guide 2026",
    "meta_desc":"Pain management CPT codes, epidural injection billing, nerve block coding, spinal cord stimulator modifiers, and denial prevention for pain management billing.",
    "keywords":"pain management CPT codes, epidural injection billing, nerve block CPT, spinal cord stimulator billing, pain management denial prevention",
    "overview":{
        "coverage":["Interventional pain procedures","Spinal injections and nerve blocks","Neuromodulation (SCS, intrathecal pumps)","Medication management for chronic pain","Comprehensive pain management"],
        "services":["Epidural steroid injections","Facet joint injections","Medial branch blocks (MBB)","Radiofrequency ablation (RFA)","Spinal cord stimulator implant","Trigger point injections"],
        "denials":["Injection frequency limits","Imaging guidance bundling","Prior auth for interventional procedures","Fluoroscopy guidance billing with injection codes"],
        "scrutiny":["Fluoroscopy guidance always required with injection codes","MBB followed by RFA timing requirements","Opioid management and urine drug screen billing","SCS trial vs permanent implant criteria"]
    },
    "cpts":[
        ("62323","Epidural injection, lumbar/sacral, with imaging guidance","Surgical","0","LT,RT","Imaging guidance INCLUDED in code; document level","High",""),
        ("62321","Epidural injection, cervical/thoracic, with imaging guidance","Surgical","0","LT,RT","Document level; cervicothoracic approach","High",""),
        ("64490","Injection, paravertebral facet joint, cervical, 1st level","Surgical","0","","Imaging guidance bundled; document joint level","High",""),
        ("64493","Injection, paravertebral facet joint, lumbar, 1st level","Surgical","0","","Imaging guidance included; document L-level","High",""),
        ("64494","Facet injection, lumbar, each additional level","Surgical","0","","Add-on; list each additional joint separately","High",""),
        ("64635","Destruction by neurolytic, cervical paravertebral facet","Surgical","0","LT,RT","Post-MBB diagnostic block required; document response","High",""),
        ("64633","Destruction by neurolytic, lumbar paravertebral facet (RFA)","Surgical","0","LT,RT","Must document 50% pain relief on diagnostic MBBs","High",""),
        ("64634","RFA, lumbar, each additional level","Surgical","0","LT,RT","Add-on; document each level","High",""),
        ("63650","Spinal cord stimulator, percutaneous, electrode","Surgical","90","","Trial vs permanent distinction; trial 7+ days","High",""),
        ("20552","Trigger point injection, 1-2 muscles","Surgical","0","","Palpable tender point required; document muscles","Low",""),
    ],
    "icd10":[
        ("M54.5","Low back pain"),("M54.4","Lumbago with sciatica, unspecified"),
        ("G89.29","Other chronic pain"),("M47.816","Lumbar spondylosis with radiculopathy"),
        ("M54.2","Cervicalgia"),("M54.12","Radiculopathy, cervical"),
        ("M47.812","Spondylosis with radiculopathy, cervical"),("G89.3","Neoplasm related pain"),
        ("M79.3","Panniculitis"),("M54.40","Lumbago with sciatica, unspecified"),
    ],
    "modifiers":["LT","RT","50","59","76"],
    "spec_modifiers":{},
    "denial_top5":[
        "Epidural steroid injection without prior physical therapy or conservative therapy failure",
        "Fluoroscopy billed separately with injection codes that already include imaging guidance",
        "RFA performed without documented diagnostic medial branch blocks showing 50%+ pain relief",
        "Injection frequency exceeding payer limits (typically 3-4 per year per spinal region)",
        "SCS permanent implant denied without successful SCS trial of 7+ days with 50% pain relief",
    ],
    "risky_combos":[
        ("62323 + 77003","Fluoroscopy (77003) is INCLUDED in 62323 -- do not bill separately"),
        ("64493 + 77003","Facet injection codes include imaging guidance -- no add-on fluoroscopy"),
        ("64633 without prior MBB","RFA denied without documented diagnostic medial branch blocks and response"),
        ("64493 x4+ same visit","More than 3 levels of facet injections same session triggers medical review"),
        ("63650 permanent without trial","SCS permanent implant requires documented successful trial period"),
    ],
    "doc_checklist":[
        "Failed conservative therapy documentation before interventional procedures",
        "Diagnostic medial branch block results (50%+ pain relief) before RFA",
        "Fluoroscopy/imaging guidance: images stored in medical record with procedure note",
        "Injection level(s) documented: exact vertebral level (e.g., L4-L5, L5-S1)",
        "Laterality for paired structure injections (bilateral or LT/RT)",
        "SCS trial: daily pain diary, percentage improvement, functional assessment",
        "Drug screening: urine drug screen results if opioid prescribing ongoing",
        "Informed consent for all interventional procedures",
    ],
    "compliance":[
        ("medicare","LCD L34858","Epidural steroid injections: frequency limit 3-4 per region per year; failed conservative therapy"),
        ("medicare","LCD L35944","Facet joint injections: medial branch block required before RFA; 50% pain relief threshold"),
        ("commercial","UHC","SCS permanent implant: successful trial required; behavioral health clearance for most payers"),
        ("commercial","Cigna","Trigger point injections: palpable tender point required; typically limited to 4 per year"),
        ("prior-auth","Epidural Injections","Most commercial plans require prior auth; conservative therapy documentation required"),
        ("prior-auth","SCS Trial and Implant","Both trial and permanent implant require separate prior authorizations"),
        ("frequency","Epidural Steroids","3 injections per episode; no more than 4 per year in same spinal region"),
        ("frequency","Facet Injections","2 diagnostic blocks + RFA per year per region; document each separately"),
    ],
    "faq":[
        ("Is fluoroscopy separately billable with epidural steroid injection codes?",
         "No -- CPT codes 62320-62323 (epidural injections with imaging guidance) already include the imaging guidance. Do NOT add 77003 (fluoroscopy) separately. Billing fluoroscopy with these codes constitutes unbundling and will be denied."),
        ("What documentation is required before radiofrequency ablation?",
         "Prior to RFA, documentation must include: (1) at least two diagnostic medial branch blocks on separate dates, (2) 50%+ pain relief following each diagnostic block, (3) functional improvement documented, and (4) pain consistent with facet joint origin."),
        ("How many epidural steroid injections can be billed per year?",
         "Most payers (including Medicare per LCD) limit epidural steroid injections to 3-4 per spinal region per year. Document each injection date, level, and clinical response. Additional injections require prior authorization."),
        ("What constitutes a successful SCS trial for permanent implant authorization?",
         "A successful trial requires: (1) minimum 7 days of trial stimulation, (2) at least 50% pain reduction, (3) functional improvement in activities of daily living, and (4) patient preference for permanent implant."),
        ("How are bilateral facet injections coded?",
         "For bilateral facet injections at the same level on the same day, bill two units with LT and RT modifiers (or modifier 50 per payer preference). For multiple levels, add the additional level add-on codes."),
    ],
    "examples":[
        ("Lumbar Epidural Steroid Injection","62323 (Epidural, lumbar, with imaging)",["M54.4 (Lumbago with sciatica)"],[""],
         "Failed 6 weeks PT and NSAIDs. L4-L5 disc herniation with radiculopathy. ESI at L4-L5 under fluoroscopic guidance. Code 62323 includes imaging guidance -- no 77003. Prior auth obtained."),
        ("Lumbar RFA Bilateral","64633 + 64634 bilateral",["M47.816 (Lumbar spondylosis)"],["LT","RT"],
         "Patient had bilateral medial branch blocks at L3-L4, L4-L5, L5-S1 with 75% relief. RFA performed bilaterally. Bill 64633 x2 (LT and RT for first level) + 64634 x4 (additional levels). Document prior MBB response."),
        ("Trigger Point Injections","20552 (TPI, 1-2 muscles)",["M79.3 (Panniculitis), G89.29 (Chronic pain)"],[""],
         "Palpable myofascial trigger points in bilateral trapezius. TPI with 1% lidocaine. Document specific muscles injected and palpable tenderness finding."),
    ],
})

SPECIALTIES.append({
    "slug":"pediatrics","name":"Pediatrics","emoji":"[child]",
    "meta_title":"Pediatrics CPT Codes & Billing Guide 2026",
    "meta_desc":"Pediatrics CPT codes, well-child visit billing, immunization coding, developmental screening, and denial prevention for pediatric billing teams.",
    "keywords":"pediatrics CPT codes, well-child visit billing, immunization CPT codes, developmental screening billing, pediatric denial prevention",
    "overview":{
        "coverage":["Well-child preventive care","Acute illness and injury management","Developmental and behavioral screening","Immunizations and vaccine administration","Newborn and infant care"],
        "services":["Well-child visits (99381-99385 new, 99391-99395 established)","Office E/M for acute illness","Immunization administration (90460-90471)","Developmental screening (96110)","Newborn care (99460-99463)"],
        "denials":["Well-child visit coding by age group","Immunization administration code selection","Developmental screening billing with well-child visits","Newborn vs inpatient admission coding"],
        "scrutiny":["Age-based well-child code accuracy","Immunization counseling documentation","ADHD evaluation coding","Autism screening documentation"]
    },
    "cpts":[
        ("99382","Preventive visit, new, 1-4 years","Preventive","0","25","Age-specific developmental milestones documented","Low",""),
        ("99383","Preventive visit, new, 5-11 years","Preventive","0","25","School-age developmental assessment","Low",""),
        ("99384","Preventive visit, new, 12-17 years","Preventive","0","25","Adolescent risk assessment; HEADSS screening","Low",""),
        ("99392","Preventive visit, established, 1-4 years","Preventive","0","25","Age-specific milestones; vaccination update","Low",""),
        ("99393","Preventive visit, established, 5-11 years","Preventive","0","25","School performance, BMI, developmental screening","Low",""),
        ("99394","Preventive visit, established, 12-17 years","Preventive","0","25","Adolescent: substance use, sexual health screening","Low",""),
        ("90460","Immunization admin, first component with counseling","Preventive","0","","Physician/QHP counsels patient/family; under 18","Low",""),
        ("90461","Immunization admin, each additional component","Preventive","0","","Add-on to 90460; each antigen in combo vaccine","Low",""),
        ("90471","Immunization admin, first injection, no counseling","Preventive","0","","When no counseling provided; over 18 or nurse only","Low",""),
        ("96110","Developmental screening with scoring","Preventive","0","","M-CHAT, ASQ, Ages and Stages; tool and score documented","Low",""),
        ("99213","Sick office visit, established, moderate complexity","E&M","0","25","Acute illness; not for well-child same day without 25","Medium",""),
        ("99460","Initial newborn care, per day, hospital","E&M","0","","Normal newborn first day; H&P and newborn exam","Low",""),
    ],
    "icd10":[
        ("Z00.129","Routine child health exam, without findings"),
        ("Z00.121","Routine child health exam, with abnormal findings"),
        ("J06.9","Acute upper respiratory infection, unspecified"),
        ("H66.90","Otitis media, unspecified, unspecified ear"),
        ("F90.0","ADHD, predominantly inattentive type"),
        ("Z23","Encounter for immunization"),
        ("R62.50","Unspecified lack of expected normal physiological development"),
        ("F84.0","Autism spectrum disorder"),
        ("J45.20","Mild intermittent asthma, uncomplicated"),
        ("Z00.110","Encounter for newborn under 8 days old"),
    ],
    "modifiers":["25","33","EP","GY"],
    "spec_modifiers":{},
    "denial_top5":[
        "Wrong age-based well-child code -- age of patient on date of service must match code's age range",
        "Well-child visit and sick visit same day without modifier 25 on the sick E/M code",
        "Immunization counseling (90460) without documented physician counseling in the note",
        "Developmental screening (96110) without documentation of specific tool used and score",
        "Newborn care codes used beyond appropriate timeframe (99460-99462)",
    ],
    "risky_combos":[
        ("99392 + 99213 (no 25)","Well-child and sick visit same day: modifier 25 required on E/M"),
        ("90460 without counseling doc","Immunization counseling code requires documented physician/QHP counseling"),
        ("99382 wrong age","New well-child codes are age-specific: verify DOB vs code age range"),
        ("96110 without score doc","Developmental screening denied without specific tool name and score"),
        ("99460 after day 2","Day 2+ newborn care uses 99462; 99460 is first day only"),
    ],
    "doc_checklist":[
        "Patient date of birth and age on date of service for age-specific code selection",
        "Well-child note: age-appropriate developmental milestones, growth measurements (weight, height, BMI, head circumference for under 2)",
        "Immunization administration: vaccine name, manufacturer, lot number, expiration date, site",
        "Counseling documentation when billing 90460: specific topics covered",
        "Developmental screening: tool name (M-CHAT, ASQ), total score, interpretation",
        "Autism screening at 18 and 24 months: M-CHAT score and follow-up plan",
        "Newborn exam: gestational age, delivery type, newborn physical findings, APGAR scores",
        "Sick visit: separate HPI, assessment, and plan when billing with well-child",
    ],
    "compliance":[
        ("medicare","EPSDT","Medicaid EPSDT covers comprehensive well-child visits plus diagnostic follow-up"),
        ("medicare","Immunizations","Medicare Part B covers specific adult vaccines; Medicaid/CHIP covers child vaccines via VFC"),
        ("commercial","Well-Child Visits","ACA-mandated preventive; Bright Futures schedule determines coverage"),
        ("commercial","Vaccines for Children","VFC program covers vaccines for Medicaid, uninsured, underinsured children"),
        ("prior-auth","ADHD Medications","Stimulant medications often require prior auth; behavioral health documentation"),
        ("prior-auth","Behavioral Therapy","ABA therapy for autism requires prior auth with autism diagnosis confirmation"),
        ("frequency","Well-Child Visits","Frequency per Bright Futures schedule: 12+ visits birth to age 21"),
        ("frequency","Developmental Screening","Recommended at 9, 18, 30 months; autism at 18 and 24 months"),
    ],
    "faq":[
        ("How is the correct well-child visit code selected?",
         "The code is selected based on the patient's age on the date of service: 99381-99385 for new patients; 99391-99395 for established patients. Age ranges: under 1 year, 1-4 years, 5-11 years, 12-17 years, 18-39 years. Use the patient's exact date of birth to confirm the age group."),
        ("How are immunization administration codes (90460 vs 90471) selected?",
         "90460 is used when a physician or qualified healthcare professional provides immunization counseling to the patient or family -- for patients under 18. 90461 is the add-on for each additional antigen in a combination vaccine. 90471 is used when no counseling is provided."),
        ("Can a sick visit and well-child visit be billed on the same day?",
         "Yes -- with modifier 25 on the sick/problem-focused E/M code. The well-child and sick visit must address different problems, and both must be separately documented."),
        ("What documentation is required for developmental screening billing?",
         "Document the specific screening tool used (e.g., M-CHAT-R, Ages and Stages Questionnaire), the total score, whether the score is in the pass/fail range, and any follow-up plan for abnormal results."),
        ("How is the Vaccines for Children (VFC) program billed?",
         "VFC vaccines are provided at no cost to eligible children. The vaccine product is not billed -- only the administration codes (90460/90461 or 90471). For private pay patients: bill both vaccine product code and administration code."),
    ],
    "examples":[
        ("4-Year Well-Child Visit + URI","99392 + 99213",["Z00.129 (Child health exam), J06.9 (URI)"],["25"],
         "4-year-old for annual well-child. Parent reports ear pain -- acute otitis media evaluated separately. Bill 99392 (established, age 1-4) for preventive; 99213 with modifier 25 for acute evaluation. Separate documentation for each."),
        ("18-Month Well-Child with Vaccines","99391 + 90460 + 90461 x5",["Z00.129 (Child health exam), Z23 (Immunization)"],[""],
         "18-month well-child. DTaP-IPV-Hib combination (3 antigens) plus MMR administered. Physician counsels on vaccine risks/benefits. Bill 99391 + 90460 (first antigen, counseling) + 90461 x5 (5 additional antigens)."),
        ("ADHD Evaluation -- New Patient","99384 + 96110",["F90.0 (ADHD, inattentive)"],[""],
         "12-year-old new patient for ADHD evaluation. Comprehensive preventive visit 99384 (new, 12-17 years). ADHD-specific developmental screening using Vanderbilt Assessment Scale. Score documented. Teacher and parent scales obtained."),
    ],
})

SPECIALTIES.append({
    "slug":"physical-therapy","name":"Physical Therapy","emoji":"[runner]",
    "meta_title":"Physical Therapy CPT Codes & Billing Guide 2026",
    "meta_desc":"Physical therapy CPT codes, timed vs service-based billing, supervised vs constant attendance modalities, and denial prevention for PT billing teams.",
    "keywords":"physical therapy CPT codes, PT billing guidelines, timed therapy codes, neuromuscular reeducation CPT, physical therapy denial prevention",
    "overview":{
        "coverage":["Therapeutic exercises and procedures","Manual therapy and mobilization","Modalities (timed and untimed)","Functional training and gait training","Evaluation and re-evaluation"],
        "services":["Therapeutic exercise (97110)","Neuromuscular reeducation (97112)","Manual therapy (97140)","Ultrasound (97035)","Electrical stimulation (97032/97014)","PT evaluation (97161-97163)"],
        "denials":["Timed code unit calculation errors","Unsupervised modalities billed with constant attendance","Medical necessity for physical therapy","Missing functional status documentation"],
        "scrutiny":["8-minute rule for timed codes","Constant attendance vs supervised modality billing","Maintenance therapy coverage","Therapy cap compliance (Medicare)"]
    },
    "cpts":[
        ("97161","PT evaluation, low complexity","E&M","0","","New patient evaluation; standardized outcome measure","Low",""),
        ("97162","PT evaluation, moderate complexity","E&M","0","","Moderate complexity; body structure/function assessment","Low",""),
        ("97163","PT evaluation, high complexity","E&M","0","","High complexity; comorbidities, clinical decision-making","Low",""),
        ("97164","PT re-evaluation","E&M","0","","Significant change in clinical status; cannot repeat within 30 days","Low",""),
        ("97110","Therapeutic exercise","Therapy","0","","Time-based (8-min units); exercises documented with sets/reps","High",""),
        ("97112","Neuromuscular reeducation","Therapy","0","","Time-based; proprioception, balance, coordination goals","High",""),
        ("97140","Manual therapy techniques","Therapy","0","","Time-based; joint mobilization, soft tissue mobilization","High",""),
        ("97530","Therapeutic activities","Therapy","0","","Time-based; functional movement patterns","High",""),
        ("97032","Electrical stimulation, manual","Therapy","0","","Constant attendance required; document time","Medium",""),
        ("97014","Electrical stimulation, unattended","Therapy","0","","Supervised; no constant attendance; time NOT used","Low",""),
        ("97035","Ultrasound therapy","Therapy","0","","Constant attendance; time-based (15 min = 1 unit)","Low",""),
        ("97542","Wheelchair management/propulsion","Therapy","0","","Time-based; document functional goals","Medium",""),
    ],
    "icd10":[
        ("M54.5","Low back pain"),("M75.100","Rotator cuff syndrome, unspecified shoulder"),
        ("M17.11","Primary osteoarthritis, right knee"),("S52.501A","Fracture distal radius, initial"),
        ("G82.50","Paraplegia, unspecified"),("M54.12","Radiculopathy, cervical"),
        ("M79.3","Panniculitis"),("Z47.89","Encounter for other orthopedic aftercare"),
        ("G35","Multiple sclerosis"),("I69.354","Hemiplegia following cerebral infarction"),
    ],
    "modifiers":["GP","GO","GN","59","KX"],
    "spec_modifiers":{},
    "denial_top5":[
        "Timed code unit calculation error -- 8-minute rule misapplied leading to over/under-billing",
        "Missing functional goals or outcome measures in the plan of care",
        "Maintenance therapy billed to Medicare -- only skilled therapy is covered",
        "Constant attendance codes billed with supervised codes on same day without time segregation",
        "Missing GP modifier on all PT claims billed to Medicare",
    ],
    "risky_combos":[
        ("97014 + 97032 same body part","Supervised and constant attendance electrical stimulation same area: mutually exclusive"),
        ("97110 without timed documentation","Therapeutic exercise denied without documented time units (8-min rule)"),
        ("97161 + 97164 within 30 days","Re-evaluation within 30 days requires documented significant clinical change"),
        ("Maintenance therapy after discharge","Medicare covers only skilled therapy; maintenance is non-covered"),
        ("Undercounting timed units","Billing fewer units than time supports: underpayment and documentation mismatch"),
    ],
    "doc_checklist":[
        "Plan of care: diagnosis, long-term goals, specific interventions, estimated duration, frequency",
        "Timed services: total treatment time and time per code to support 8-minute rule unit calculation",
        "Functional outcome measures: LEFS, DASH, Oswestry, Tinetti: score at evaluation and re-evaluation",
        "Skilled therapy justification: why skilled PT is required vs home exercise program",
        "Physician certification of plan of care (required for Medicare)",
        "Progress notes: patient response, progress toward goals, changes in treatment plan",
        "Re-evaluation documentation: what changed clinically to justify re-evaluation",
        "Discharge summary: goals met, home program, follow-up recommendations",
    ],
    "compliance":[
        ("medicare","8-Minute Rule","Timed codes require minimum 8 minutes; unit count based on total timed minutes in session"),
        ("medicare","Therapy Caps","Annual threshold; KX modifier required beyond cap; always-therapy exception applies"),
        ("commercial","UHC","Prior auth often required after 12-20 visits; functional goal documentation required"),
        ("commercial","Anthem","PT authorization required at outset in many markets; frequency limits apply"),
        ("prior-auth","PT Services","Most commercial plans require prior auth after initial evaluation or set number of visits"),
        ("prior-auth","Aquatic Therapy","Aquatic PT requires prior auth from most payers; clinical indication required"),
        ("frequency","PT Visits","Commercial plans typically authorize 20-60 visits per year depending on plan"),
        ("frequency","Re-evaluation","Re-evaluation (97164) limited to once per 30 days without significant clinical change"),
    ],
    "faq":[
        ("How is the 8-minute rule applied for timed PT codes?",
         "Total timed minutes for the session determine the number of units. Each 15-minute block = 1 unit. A code must be performed for at least 8 minutes to count as 1 unit (8-22 min = 1 unit, 23-37 min = 2 units, etc.). Count total timed minutes across all codes to determine total units billable."),
        ("What is the difference between supervised and constant attendance modalities?",
         "Supervised modalities (e.g., 97014 unattended electrical stimulation) do not require the therapist in constant attendance. Constant attendance modalities (e.g., 97032 electrical stimulation with therapist, 97035 ultrasound) require the therapist to be in direct patient contact throughout."),
        ("When can physical therapy re-evaluation (97164) be billed?",
         "97164 is appropriate when there has been a significant change in clinical status, a change in the plan of care is required, or a new clinical finding necessitates reassessment. Most payers limit re-evaluation to once per 30 days."),
        ("What documentation prevents maintenance therapy denial?",
         "Medicare covers only skilled therapy requiring the specialized knowledge and skills of a licensed therapist. Document specific skilled elements: safety training, teaching compensatory techniques, managing unpredictable responses, or preventing deterioration."),
        ("What are the Medicare therapy cap thresholds?",
         "Congress eliminated the hard therapy caps in 2018, but a threshold still exists (updated annually -- approximately $2,150 for PT/SLP combined). Beyond this threshold, modifier KX must be appended. Above a higher threshold, manual medical review may be triggered."),
    ],
    "examples":[
        ("Post-ACL Repair PT (Week 6)","97110 + 97112 + 97140",["Z47.89 (Orthopedic aftercare)"],["GP"],
         "Session: 30 min therapeutic exercise (2 units), 15 min neuromuscular reeducation (1 unit), 15 min manual therapy (1 unit). Total 60 minutes = 4 units. Document exercises, sets, reps, balance activities. Modifier GP required."),
        ("Medicare Patient at Therapy Cap","97110 + 97530",["M54.5 (Low back pain)"],["GP","KX"],
         "Medicare patient has exceeded the annual threshold. KX modifier required on all timed codes. Documentation supports continued skilled physical therapy necessity beyond cap."),
        ("PT Evaluation -- Post-Stroke","97163 (High complexity PT evaluation)",["I69.354 (Hemiplegia post-stroke)"],["GP"],
         "New patient post-CVA with left hemiplegia. High complexity evaluation: multiple comorbidities, complex functional goals. Standardized outcome measure (FIM) administered. Plan of care developed."),
    ],
})

SPECIALTIES.append({
    "slug":"pulmonology","name":"Pulmonology","emoji":"[lungs]",
    "meta_title":"Pulmonology CPT Codes & Billing Guide 2026",
    "meta_desc":"Pulmonology CPT codes, spirometry billing, bronchoscopy coding, sleep study modifiers, and denial prevention for pulmonology billing teams.",
    "keywords":"pulmonology CPT codes, spirometry billing, bronchoscopy CPT, sleep study billing, pulmonology denial prevention",
    "overview":{
        "coverage":["Pulmonary function testing","Bronchoscopy and airway procedures","Sleep medicine","Mechanical ventilation management","COPD and asthma management"],
        "services":["Spirometry (94010/94060)","Bronchoscopy (31622-31641)","Polysomnography (95810)","CPAP/BiPAP initiation","Pulmonary rehabilitation","Thoracentesis"],
        "denials":["Spirometry interpretation documentation","Bronchoscopy component bundling","Sleep study prior authorization","CPAP resupply and compliance"],
        "scrutiny":["Spirometry pre/post bronchodilator billing","BAL and biopsy component codes with bronchoscopy","Home sleep test vs attended polysomnography","CPAP compliance data for resupply"]
    },
    "cpts":[
        ("94010","Spirometry, complete (FVC and MVV)","Diagnostic","0","","Clinical indication; pre and post if bronchodilator given","Medium",""),
        ("94060","Spirometry, pre and post bronchodilator","Diagnostic","0","","Documents reversibility of obstruction","High",""),
        ("94070","Prolonged inhalation challenge","Diagnostic","0","","Methacholine challenge; informed consent required","High",""),
        ("94620","Pulmonary stress testing, simple","Diagnostic","0","26,TC","6-minute walk or simple exercise challenge","Medium",""),
        ("31622","Bronchoscopy, diagnostic, with BAL","Surgical","0","","BAL technique, sites, volume documented","High",""),
        ("31623","Bronchoscopy with brushings","Surgical","0","","Brush sites and locations documented","High",""),
        ("31625","Bronchoscopy with biopsy","Surgical","0","","Number of biopsy samples; locations","High",""),
        ("95810","Polysomnography, 7+ parameters, attended","Diagnostic","0","26,TC","OSA clinical indication; AHI documented in report","High",""),
        ("95806","Home sleep apnea test, unattended","Diagnostic","0","","4-channel minimum; prior evaluation of OSA symptoms","High",""),
        ("94660","CPAP initiation and management","Therapy","0","","Prescription with pressure setting; titration documentation","Medium",""),
        ("99214","Pulmonology office visit, high complexity","E&M","0","25","COPD/ILD management with high MDM","Medium",""),
    ],
    "icd10":[
        ("J44.1","COPD with acute exacerbation"),("J44.0","COPD with acute lower respiratory infection"),
        ("J45.20","Mild intermittent asthma, uncomplicated"),("J45.41","Moderate persistent asthma with acute exacerbation"),
        ("J90","Pleural effusion"),("G47.33","Obstructive sleep apnea (adult)"),
        ("J84.10","Idiopathic interstitial pneumonia, unspecified"),("J18.9","Pneumonia, unspecified"),
        ("J98.11","Atelectasis"),("C34.10","Malignant neoplasm of bronchus/lung"),
    ],
    "modifiers":["26","TC","59","25"],
    "spec_modifiers":{},
    "denial_top5":[
        "Spirometry without signed interpretation report -- interpretation required for professional billing",
        "Bronchoscopy component codes billed separately when comprehensive code covers them",
        "Sleep study (PSG) prior authorization missing -- required by virtually all payers",
        "Home sleep test (HSAT) ordered before clinical evaluation for OSA symptoms",
        "CPAP resupply denied -- compliance data (4 hours/night, 70% of nights) not documented",
    ],
    "risky_combos":[
        ("31622 + 31623 + 31625 same bronchoscopy","Each add-on code must be for separate procedures; verify NCCI edits"),
        ("94010 + 94060 same session","94060 includes spirometry; do not bill 94010 separately with 94060"),
        ("95810 without prior auth","PSG denied without prior authorization from most payers"),
        ("94660 without pressure documentation","CPAP initiation denied without documented titrated pressure settings"),
        ("HSAT before clinical evaluation","Home sleep test must follow clinical evaluation documenting OSA symptoms"),
    ],
    "doc_checklist":[
        "Spirometry: signed interpretation with FVC, FEV1, FEV1/FVC ratio, and clinical correlation",
        "Methacholine challenge: baseline spirometry, dose protocol, post-challenge values, PC20",
        "Bronchoscopy: scope type, visualization findings, BAL sites and volumes, biopsy locations",
        "Sleep study: AHI, RDI, oxygen desaturation nadir, sleep stages documented in report",
        "CPAP prescription: diagnosed OSA with AHI >=15 (or >=5 with symptoms), pressure settings",
        "CPAP compliance: download data showing 4+ hours/night, 70%+ of nights in 30-day period",
        "Thoracentesis: indication, volume removed, appearance, specimens sent",
        "Pulmonary function trends: comparison to prior PFTs for COPD/ILD management",
    ],
    "compliance":[
        ("medicare","LCD L33780","CPAP: AHI >=15 or >=5 with documented symptoms; compliance check at 31-90 days"),
        ("medicare","OSA Criteria","PSG required for initial OSA diagnosis; HSAT only for uncomplicated OSA suspects"),
        ("commercial","UHC","Bronchoscopy with BAL and biopsy: verify NCCI bundles before billing multiple codes"),
        ("commercial","Aetna","Pulmonary rehabilitation requires prior auth; COPD diagnosis and FEV1 documentation"),
        ("prior-auth","Polysomnography","Universal prior auth requirement; clinical criteria include Epworth and symptom history"),
        ("prior-auth","Bronchoscopy","Elective bronchoscopy requires prior auth; malignancy/infection indication documented"),
        ("frequency","PFTs","Spirometry: typically 1 per 6 months for COPD monitoring without new symptoms"),
        ("frequency","CPAP Resupply","Medicare: resupply every 90 days after compliance verified; strict documentation"),
    ],
    "faq":[
        ("What documentation is required for spirometry to be billable?",
         "Spirometry (94010/94060) requires a signed written interpretation by the interpreting physician. The report must include FVC, FEV1, and FEV1/FVC ratio with comparison to predicted values. For pre/post-bronchodilator (94060), document the bronchodilator administered, dose, and both pre- and post-values."),
        ("How are bronchoscopy component codes billed?",
         "Bronchoscopy codes follow an add-on structure: 31622 (diagnostic, BAL) is a primary code. 31623 (brushings), 31625 (biopsy) and others are add-on codes. Check NCCI edits for each combination -- some are bundled. Document each procedure separately."),
        ("What are the Medicare criteria for CPAP coverage?",
         "CPAP is covered for patients with documented OSA: AHI >=15 events/hour OR AHI >=5 events/hour with at least one symptom (excessive daytime sleepiness, impaired cognition, insomnia, hypertension, coronary artery disease, or stroke). Compliance must be documented at 31-90 days showing usage >=4 hours/night on >=70% of nights."),
        ("When is a home sleep test appropriate vs in-lab polysomnography?",
         "HSAT is appropriate for adults with high pre-test probability of moderate-to-severe OSA without significant comorbidities (COPD, heart failure, neuromuscular disorders). In-lab PSG is required for complex patients, pediatric patients, or when HSAT results are negative despite high clinical suspicion."),
        ("How is pulmonary rehabilitation coded?",
         "Pulmonary rehabilitation is coded using G0424 (Medicare) for outpatient services. Documentation must include: COPD diagnosis (typically FEV1 <50% predicted or FEV1/FVC <70%), prior authorization, and a physician-supervised rehabilitation plan."),
    ],
    "examples":[
        ("Spirometry Pre and Post Bronchodilator","94060 (Spirometry with bronchodilator)",["J44.1 (COPD with exacerbation)"],[""],
         "COPD patient with exacerbation. Spirometry performed before and after albuterol 2.5mg nebulizer. Report documents FEV1 pre (42% predicted), FEV1 post (49% predicted). Signed interpretation confirms fixed obstruction. 94060 appropriate -- do not add 94010."),
        ("Flexible Bronchoscopy with BAL and Biopsy","31622 + 31625",["J18.9 (Pneumonia), R04.2 (Hemoptysis)"],[""],
         "Patient with hemoptysis and pulmonary infiltrate. Flexible bronchoscopy: BAL from right lower lobe (31622) and transbronchial biopsy x4 (31625 add-on). Separate documentation for each procedure."),
        ("Sleep Study for OSA Diagnosis","95810 (Attended PSG)",["G47.33 (OSA), G47.09 (Excessive daytime sleepiness)"],["26"],
         "Patient with witnessed apneas, excessive daytime sleepiness. Prior auth obtained. Attended PSG with 7+ parameters. AHI: 28 events/hour (moderate-severe). O2 nadir: 82%. Report signed by sleep medicine physician with modifier 26."),
    ],
})


# ─────────────────────────────────────────────────────────────────────────────
# HTML TEMPLATE ENGINE
# ─────────────────────────────────────────────────────────────────────────────
SVG_INFO = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
SVG_CHEVRON = '<svg class="modifier-intel-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
SVG_FAQ_CHEV = '<svg class="faq-q-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>'
SVG_SEARCH = '<svg class="cpt-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'

CATEGORY_CSS = {
    "Diagnostic":"cpt-cat-diagnostic","Surgical":"cpt-cat-surgical","E&M":"cpt-cat-em",
    "E/M":"cpt-cat-em","Imaging":"cpt-cat-imaging","Therapy":"cpt-cat-therapy","Preventive":"cpt-cat-preventive",
}
COMPLIANCE_CSS  = {"medicare":"medicare","commercial":"commercial","prior-auth":"prior-auth","frequency":"frequency"}
COMPLIANCE_ICON = {"medicare":"🏛️","commercial":"🏢","prior-auth":"🔐","frequency":"📅"}

def risk_badge(level):
    cls = {"High":"denial-risk-high","Medium":"denial-risk-medium","Low":"denial-risk-low"}.get(level,"denial-risk-low")
    sym = "⚠" if level == "High" else "●"
    return f'<span class="denial-risk-badge {cls}">{sym} {level}</span>'

def mod_tags(mods_csv):
    if not mods_csv:
        return '<span style="color:var(--text-disabled);font-size:11px">—</span>'
    tags = "".join(f'<span class="cpt-mod-tag">{m.strip()}</span>' for m in mods_csv.split(",") if m.strip())
    return f'<div class="cpt-modifier-tags">{tags}</div>'

def build_html(sp):
    slug = sp["slug"]
    name = sp["name"]
    url  = f"https://rcmdenials.com/specialties/{slug}-cpt-codes.html"

    # ── Overview cards ──────────────────────────────────────────────────────
    ov = sp["overview"]
    def ov_card(icon, title, items):
        lis = "".join(f"<li>{i}</li>" for i in items)
        return (f'<div class="specialty-overview-card">'
                f'<div class="specialty-overview-card-icon">{icon}</div>'
                f'<div class="specialty-overview-card-title">{title}</div>'
                f'<ul class="specialty-overview-card-list">{lis}</ul></div>')
    overview_html = (
        '<div class="specialty-overview-grid">'
        + ov_card("🏥","Clinical Scope",ov["coverage"])
        + ov_card("📋","Common Services Billed",ov["services"])
        + ov_card("⛔","High-Risk Denial Areas",ov["denials"])
        + ov_card("🔍","Payer Scrutiny Points",ov["scrutiny"])
        + '</div>'
    )

    # ── CPT table ───────────────────────────────────────────────────────────
    rows = ""
    for c in sp["cpts"]:
        code, desc, cat, gdays, mods, doctip, risk, _ = c
        cat_cls = CATEGORY_CSS.get(cat,"cpt-cat-diagnostic")
        rows += (
            f'<tr>'
            f'<td class="cpt-code-cell">{code}</td>'
            f'<td class="cpt-name-cell">{desc}</td>'
            f'<td><span class="cpt-category-badge {cat_cls}">{cat}</span></td>'
            f'<td class="cpt-global-days">{gdays if gdays else "—"}</td>'
            f'<td>{mod_tags(mods)}</td>'
            f'<td style="font-size:12px;color:var(--text-secondary);min-width:120px">{doctip}</td>'
            f'<td>{risk_badge(risk)}</td>'
            f'</tr>'
        )
    cpt_table = (
        f'<div class="cpt-search-wrap">{SVG_SEARCH}'
        f'<input class="cpt-search-input" id="cpt-search-{slug}" placeholder="Filter CPT codes..." '
        f'oninput="filterCPT(this,\'{slug}\')">'
        f'</div>'
        f'<div style="overflow-x:auto"><table class="cpt-table-advanced" id="cpt-table-{slug}">'
        f'<thead><tr><th>CPT Code</th><th>Procedure / Service</th><th>Category</th>'
        f'<th>Global Days</th><th>Common Modifiers</th><th>Documentation Tips</th><th>Denial Risk</th>'
        f'</tr></thead><tbody>{rows}</tbody></table></div>'
    )

    # ── ICD-10 table ────────────────────────────────────────────────────────
    icd_rows = "".join(
        f'<tr><td class="cpt-code-cell">{c}</td>'
        f'<td style="padding:8px 12px;color:var(--text-secondary)">{d}</td></tr>'
        for c, d in sp["icd10"]
    )
    icd_table = (
        f'<div style="overflow-x:auto"><table class="cpt-table-advanced">'
        f'<thead><tr><th>ICD-10 Code</th><th>Description</th></tr></thead>'
        f'<tbody>{icd_rows}</tbody></table></div>'
    )

    # ── Modifier Intelligence cards ─────────────────────────────────────────
    all_mods = {**COMMON_MODIFIERS, **sp.get("spec_modifiers", {})}
    selected = {k: all_mods[k] for k in sp.get("modifiers", []) if k in all_mods}
    mod_cards = ""
    for k, m in selected.items():
        mod_cards += (
            f'<div class="modifier-intel-card" id="mod-{slug}-{k}">'
            f'<div class="modifier-intel-header" onclick="toggleModifier(this)">'
            f'<div class="modifier-intel-icon">{SVG_INFO}</div>'
            f'<div class="modifier-intel-title">'
            f'<div class="modifier-intel-code">Modifier {m["code"]}</div>'
            f'<div class="modifier-intel-name">{m["name"]}</div>'
            f'</div>{SVG_CHEVRON}</div>'
            f'<div class="modifier-intel-body">'
            f'<div class="modifier-intel-row"><div class="modifier-intel-row-label use">✓ When to Use</div>'
            f'<div class="modifier-intel-row-content">{m["use"]}</div></div>'
            f'<div class="modifier-intel-row"><div class="modifier-intel-row-label avoid">✗ When NOT to Use</div>'
            f'<div class="modifier-intel-row-content">{m["avoid"]}</div></div>'
            f'<div class="modifier-intel-row"><div class="modifier-intel-row-label doc">📄 Documentation Required</div>'
            f'<div class="modifier-intel-row-content">{m["doc"]}</div></div>'
            f'<div class="modifier-intel-row"><div class="modifier-intel-row-label warn">⚠ Common Payer Mistakes</div>'
            f'<div class="modifier-intel-row-content">{m["warn"]}</div></div>'
            f'</div></div>'
        )
    if not mod_cards:
        mod_cards = '<p style="color:var(--text-muted);font-size:13px">No specific modifier cards configured for this specialty.</p>'

    # ── Denial Prevention Hub ────────────────────────────────────────────────
    causes_li = "".join(
        f'<li><span class="denial-cause-num">{i+1}</span>{c}</li>'
        for i, c in enumerate(sp["denial_top5"])
    )
    combos_html = "".join(
        f'<div class="risky-combo">'
        f'<span class="risky-combo-code">{c}</span>'
        f'<span class="risky-combo-desc">{d}</span>'
        f'</div>'
        for c, d in sp["risky_combos"]
    )
    checklist_html = "".join(
        f'<li><span class="doc-check-icon">✓</span>{item}</li>'
        for item in sp["doc_checklist"]
    )
    denial_hub = (
        '<div class="denial-prevention-hub">'
        '<div class="denial-prevention-panel">'
        '<div class="denial-prevention-panel-title">⛔ Top 5 Denial Causes</div>'
        f'<ul class="denial-cause-list">{causes_li}</ul>'
        '</div>'
        '<div class="denial-prevention-panel">'
        '<div class="denial-prevention-panel-title">⚠️ High-Risk CPT + Modifier Combos</div>'
        f'{combos_html}'
        '</div>'
        '</div>'
        '<div class="denial-prevention-panel" style="margin-top:14px">'
        '<div class="denial-prevention-panel-title">✅ Documentation Checklist</div>'
        f'<ul class="doc-checklist">{checklist_html}</ul>'
        '</div>'
    )

    # ── Compliance cards ─────────────────────────────────────────────────────
    comp_cards = ""
    for kind, label, content in sp["compliance"]:
        css  = COMPLIANCE_CSS.get(kind, "medicare")
        icon = COMPLIANCE_ICON.get(kind, "📋")
        comp_cards += (
            f'<div class="compliance-card {css}">'
            f'<div class="compliance-card-label">{icon} {label}</div>'
            f'<div class="compliance-card-content">{content}</div>'
            f'</div>'
        )

    # ── FAQ ──────────────────────────────────────────────────────────────────
    faq_items     = ""
    faq_schema_parts = []
    for i, (q, a) in enumerate(sp["faq"]):
        faq_items += (
            f'<div class="faq-item" id="faq-{slug}-{i}">'
            f'<div class="faq-q" onclick="toggleFaq(this)">{q}{SVG_FAQ_CHEV}</div>'
            f'<div class="faq-a">{a}</div>'
            f'</div>'
        )
        faq_schema_parts.append(
            f'{{"@type":"Question","name":{repr(q)},"acceptedAnswer":{{"@type":"Answer","text":{repr(a)}}}}}'
        )
    faq_schema = ",".join(faq_schema_parts)

    # ── Examples ─────────────────────────────────────────────────────────────
    examples_html = ""
    for title, cpt_str, icd_list, mods_list, notes in sp["examples"]:
        mod_str = " ".join(
            f'<code style="background:var(--bg-overlay);padding:1px 5px;border-radius:4px;'
            f'font-family:var(--font-mono);font-size:12px">{m}</code>'
            for m in mods_list if m
        )
        icd_str = ", ".join(icd_list)
        examples_html += (
            f'<div class="example-card">'
            f'<h4>{title}</h4>'
            f'<p><strong>CPT Code:</strong> {cpt_str}</p>'
            f'<p><strong>ICD-10:</strong> {icd_str}</p>'
            + (f'<p><strong>Modifiers:</strong> {mod_str}</p>' if mod_str else "")
            + f'<p><strong>Clinical Notes:</strong> {notes}</p>'
            f'</div>'
        )

    # ── Schema JSON-LD ────────────────────────────────────────────────────────
    schema_article = (
        '{"@context":"https://schema.org","@type":"MedicalWebPage",'
        f'"name":"{name} CPT Codes & Billing Guide 2026",'
        f'"description":"{sp["meta_desc"]}",'
        f'"url":"{url}",'
        '"author":{"@type":"Organization","name":"RCM Denials"},'
        '"publisher":{"@type":"Organization","name":"RCM Denials",'
        '"logo":{"@type":"ImageObject","url":"https://rcmdenials.com/favicon.png"}},'
        '"datePublished":"2026-07-01","dateModified":"2026-07-01",'
        f'"medicalSpecialty":"{name}",'
        f'"mainEntityOfPage":{{"@type":"WebPage","@id":"{url}"}}}}'
    )
    schema_faq = (
        '{"@context":"https://schema.org","@type":"FAQPage",'
        f'"mainEntity":[{faq_schema}]}}'
    )
    schema_bc = (
        '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":['
        '{"@type":"ListItem","position":1,"name":"Home","item":"https://rcmdenials.com/"},'
        '{"@type":"ListItem","position":2,"name":"Specialties","item":"https://rcmdenials.com/specialties"},'
        f'{{"@type":"ListItem","position":3,"name":"{name}","item":"{url}"}}'
        ']}'
    )

    # ── Full HTML ─────────────────────────────────────────────────────────────
    return f"""<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <script>(function(){{var t=localStorage.getItem("rcm_theme");if(t)document.documentElement.setAttribute("data-theme",t);}})()</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6JRMMNNR40"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag("js",new Date());gtag("config","G-6JRMMNNR40");</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>{sp["meta_title"]} | RCM Denials</title>
  <meta name="description" content="{sp["meta_desc"]}">
  <meta name="keywords" content="{sp["keywords"]}">
  <meta name="robots" content="index,follow">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="icon" type="image/png" href="../favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/ico" href="../favicon.ico">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <link rel="manifest" href="../site.webmanifest">
  <link rel="canonical" href="{url}">
  <meta property="og:title" content="{name} CPT Codes &amp; Billing Guide | RCM Denials">
  <meta property="og:description" content="{sp["meta_desc"]}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="https://rcmdenials.com/og-image.png">
  <meta property="og:site_name" content="RCM Denials">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{name} CPT Codes &amp; Billing Guide">
  <meta name="twitter:description" content="{sp["meta_desc"]}">
  <meta name="twitter:image" content="https://rcmdenials.com/og-image.png">
  <link rel="stylesheet" href="../styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <script type="application/ld+json">{schema_article}</script>
  <script type="application/ld+json">{schema_faq}</script>
  <script type="application/ld+json">{schema_bc}</script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<div class="static-page">
  <header class="static-header">
    <div class="static-header-content">
      <a class="logo" href="../index.html"><div class="logo-icon">🏥</div><span class="logo-text">RCM <span>Denials</span></span></a>
      <nav class="static-nav">
        <a href="../index.html">Home</a>
        <a href="../denial-codes">Denial Codes</a>
        <a href="index.html" class="active">Specialties</a>
        <a href="../about.html">About</a>
        <a href="../faq.html">FAQ</a>
        <a href="../contact.html">Contact</a>
      </nav>
    </div>
  </header>
  <main class="static-main" id="main-content">
    <article class="denial-code-article">
      <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Specialties</a> / <span>{name}</span></div>
      <header class="article-header">
        <div class="denial-code-badge">{name}</div>
        <h1>{name} CPT Codes &amp; Billing Guide</h1>
        <p class="article-meta">Last Updated: {TODAY_FMT} &nbsp;|&nbsp; Category: {name} &nbsp;|&nbsp; {len(sp["cpts"])}+ CPT Codes &nbsp;|&nbsp; Billing Intelligence Guide</p>
      </header>
      <div class="article-content">

        <section class="denial-section">
          <h2>🏥 Specialty Overview</h2>
          <div class="info-box">
            <p>{name} billing requires precise documentation to support medical necessity, accurate procedure code selection, and correct modifier usage. This guide covers the most frequently billed CPT codes, high-risk denial areas, modifier intelligence, and compliance requirements specific to {name} practices.</p>
          </div>
          {overview_html}
        </section>

        <section class="denial-section">
          <h2>📋 Table of Contents</h2>
          <div class="info-box">
            <ul>
              <li><a href="#cpt-codes" style="color:var(--brand-400)">Advanced CPT Code Table</a></li>
              <li><a href="#icd10" style="color:var(--brand-400)">Common ICD-10 Diagnosis Codes</a></li>
              <li><a href="#modifiers" style="color:var(--brand-400)">Modifier Intelligence Cards</a></li>
              <li><a href="#denial-prevention" style="color:var(--brand-400)">Denial Prevention Hub</a></li>
              <li><a href="#compliance" style="color:var(--brand-400)">Compliance &amp; Payer Rules</a></li>
              <li><a href="#examples" style="color:var(--brand-400)">Real-World Billing Scenarios</a></li>
              <li><a href="#faq" style="color:var(--brand-400)">Frequently Asked Questions</a></li>
            </ul>
          </div>
        </section>

        <section class="denial-section" id="cpt-codes">
          <h2>📊 Advanced {name} CPT Code Table</h2>
          <p>Frequently billed {name.lower()} CPT codes with category classification, global days, recommended modifiers, documentation tips, and denial risk ratings. Use the search filter to quickly find a code.</p>
          <div class="info-box" style="padding:16px">{cpt_table}</div>
        </section>

        <section class="denial-section" id="icd10">
          <h2>🩺 Common ICD-10 Diagnosis Codes</h2>
          <p>Frequently paired ICD-10 codes for {name.lower()} claims. Always use the highest level of specificity available.</p>
          <div class="info-box" style="padding:16px">{icd_table}</div>
        </section>

        <section class="denial-section" id="modifiers">
          <h2>🔧 Modifier Intelligence — {name}</h2>
          <p>Click any modifier card to expand full billing guidance: when to use, when NOT to use, required documentation, and common payer mistakes.</p>
          <div class="modifier-intel-grid">{mod_cards}</div>
        </section>

        <section class="denial-section" id="denial-prevention">
          <h2>⚠️ Denial Prevention Hub</h2>
          <p>Proactive strategies to prevent the most common {name.lower()} claim denials. Review these before submitting claims.</p>
          {denial_hub}
        </section>

        <section class="denial-section" id="compliance">
          <h2>📜 Compliance &amp; Payer Rules</h2>
          <p>Medicare LCD/NCD requirements, commercial payer trends, prior authorization flags, and frequency limitations specific to {name.lower()} billing.</p>
          <div class="compliance-grid">{comp_cards}</div>
        </section>

        <section class="denial-section" id="examples">
          <h2>📝 Real-World Billing Scenarios</h2>
          <div class="causes-grid">{examples_html}</div>
        </section>

        <section class="denial-section" id="faq">
          <h2>❓ {name} Billing — Frequently Asked Questions</h2>
          <div class="faq-list">{faq_items}</div>
        </section>

        <section class="denial-section">
          <h2>🛠️ Related Billing Tools</h2>
          <p>Use these tools to validate your {name.lower()} claims before submission and reduce denial rates.</p>
          <div class="tools-cta-grid">
            <a href="../cpt-modifier-validator.html" class="tools-cta-card"><div class="tools-cta-icon">✅</div><div><div class="tools-cta-text-title">Validate Modifiers</div><div class="tools-cta-text-sub">Check modifier logic for {name.lower()} CPT codes</div></div></a>
            <a href="../ai-claim-denial-predictor.html" class="tools-cta-card"><div class="tools-cta-icon">⚠️</div><div><div class="tools-cta-text-title">Check Denial Risk</div><div class="tools-cta-text-sub">AI-powered denial risk scoring for any claim</div></div></a>
            <a href="../medical-necessity-checklist-by-cpt.html" class="tools-cta-card"><div class="tools-cta-icon">📋</div><div><div class="tools-cta-text-title">Medical Necessity Checklist</div><div class="tools-cta-text-sub">CPT-specific documentation requirements</div></div></a>
            <a href="../payer-policy-change-log.html" class="tools-cta-card"><div class="tools-cta-icon">📰</div><div><div class="tools-cta-text-title">Payer Policy Updates</div><div class="tools-cta-text-sub">Latest coverage changes by payer</div></div></a>
            <a href="../icd-10-code-lookup.html" class="tools-cta-card"><div class="tools-cta-icon">🔍</div><div><div class="tools-cta-text-title">ICD-10 Code Lookup</div><div class="tools-cta-text-sub">Find and map diagnosis codes</div></div></a>
            <a href="../fee-schedule-lookup.html" class="tools-cta-card"><div class="tools-cta-icon">💰</div><div><div class="tools-cta-text-title">Fee Schedule Lookup</div><div class="tools-cta-text-sub">Medicare reimbursement rates by CPT</div></div></a>
          </div>
        </section>

        <section class="denial-section">
          <h2>🔗 Related Resources</h2>
          <div class="related-codes-grid">
            <a href="index.html" class="related-code-card"><div class="related-code-num">All Specialties</div><div class="related-code-desc">Browse all specialty billing guides</div></a>
            <a href="../denial-codes" class="related-code-card"><div class="related-code-num">Denial Codes</div><div class="related-code-desc">Complete CO, PR, and OA denial code directory</div></a>
            <a href="../icd-10-code-lookup.html" class="related-code-card"><div class="related-code-num">ICD-10 Lookup</div><div class="related-code-desc">Search and map ICD-10 diagnosis codes</div></a>
            <a href="../fee-schedule-lookup.html" class="related-code-card"><div class="related-code-num">Fee Schedule</div><div class="related-code-desc">Medicare 2026 physician fee schedule</div></a>
          </div>
        </section>

        <section class="denial-section cta-section">
          <div class="cta-box">
            <p>RCM Denials helps {name.lower()} billing teams reduce denial rates, validate modifier usage, and stay ahead of payer policy changes.</p>
            <div class="cta-buttons">
              <a href="../index.html" class="btn btn-primary">Explore All Tools</a>
              <a href="index.html" class="btn btn-secondary">Browse All Specialties</a>
            </div>
          </div>
        </section>

      </div>
    </article>
  </main>
  <footer class="static-footer">
    <div class="static-footer-content">
      <div class="footer-links"><a href="../privacy.html">Privacy</a><a href="../terms.html">Terms</a><a href="../contact.html">Contact</a></div>
      <div class="footer-copyright">&copy; 2026 RCM Denials</div>
    </div>
  </footer>
</div>
<script>
function filterCPT(input, slug) {{
  var q = input.value.toLowerCase();
  document.querySelectorAll("#cpt-table-" + slug + " tbody tr").forEach(function(r) {{
    r.classList.toggle("cpt-row-hidden", !r.textContent.toLowerCase().includes(q));
  }});
}}
function toggleModifier(header) {{
  header.closest(".modifier-intel-card").classList.toggle("open");
}}
function toggleFaq(btn) {{
  btn.closest(".faq-item").classList.toggle("open");
}}
document.addEventListener("DOMContentLoaded", function() {{
  var fc = document.querySelector(".modifier-intel-card");
  if (fc) fc.classList.add("open");
  var ff = document.querySelector(".faq-item");
  if (ff) ff.classList.add("open");
}});
</script>
</body>
</html>"""

# ─────────────────────────────────────────────────────────────────────────────
# MAIN — generate all pages
# ─────────────────────────────────────────────────────────────────────────────
def main():
    OUT_DIR.mkdir(exist_ok=True)
    print(f"\nGenerating {len(SPECIALTIES)} specialty pages → {OUT_DIR}\n")
    for sp in SPECIALTIES:
        fname = f"{sp['slug']}-cpt-codes.html"
        fpath = OUT_DIR / fname
        html  = build_html(sp)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(html)
        kb = len(html.encode("utf-8")) / 1024
        print(f"  ✓  {fname}  ({kb:.0f} KB)")
    print(f"\n✅  Done — {len(SPECIALTIES)} pages generated in /specialties/\n")

if __name__ == "__main__":
    main()
