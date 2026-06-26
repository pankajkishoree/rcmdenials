#!/usr/bin/env python3
"""Generate all 20 specialty HTML pages for RCM Denials."""

import os

SPECIALTIES = [
    {
        "name": "Cardiology",
        "slug": "cardiology",
        "icon": "❤️",
        "description": "Comprehensive cardiology billing guide with top CPT codes, ICD-10 diagnoses, modifiers, denial reasons, and billing tips for AR callers and medical coders.",
        "keywords": "cardiology CPT codes, cardiology billing, cardiology denial codes, cardiac ECG billing, echocardiogram CPT",
        "top_cpt": [
            ("93000", "Electrocardiogram (ECG), 12-lead, with interpretation and report", "$15-$45"),
            ("93005", "Electrocardiogram (ECG), 12-lead, recording only", "$5-$15"),
            ("93010", "Electrocardiogram (ECG), 12-lead, interpretation only", "$10-$25"),
            ("93015", "Cardiovascular stress test, using maximal or submaximal treadmill or bicycle exercise, with ECG recording and monitoring", "$50-$120"),
            ("93016", "Cardiovascular stress test, using maximal or submaximal treadmill or bicycle exercise, with ECG recording only", "$30-$70"),
            ("93018", "Cardiovascular stress test, using maximal or submaximal treadmill or bicycle exercise, interpretation only", "$20-$50"),
            ("93303", "Transthoracic echocardiography for congenital cardiac structural abnormalities", "$150-$350"),
            ("93306", "Transthoracic echocardiography, complete, with Doppler, including real-time with image documentation", "$150-$400"),
            ("93307", "Transthoracic echocardiography, complete, without Doppler", "$100-$250"),
            ("93308", "Transthoracic echocardiography, follow-up or limited, with Doppler", "$75-$200"),
            ("93350", "TTE for congenital cardiac structural abnormalities, with Doppler", "$175-$400"),
            ("93458", "Left heart catheterization", "$300-$800"),
            ("93459", "Left heart catheterization with right heart catheterization", "$400-$1,000"),
            ("93460", "Left heart catheterization with ventriculography", "$350-$900"),
            ("93461", "Left heart catheterization with coronary angiography and ventriculography", "$400-$1,100"),
            ("93224", "External ECG recording for more than 48 hours up to 7 days by continuous rhythm recording and storage", "$100-$300"),
            ("93225", "External ECG recording for more than 48 hours up to 7 days, recording, analysis and report", "$150-$400"),
            ("93226", "External ECG recording for more than 48 hours up to 7 days, recording, analysis and report", "$200-$500"),
            ("93227", "External ECG recording for more than 48 hours up to 7 days, includes recording, scanning with review and interpretation", "$250-$600"),
            ("93352", "TTE with contrast (perfusion), complete", "$200-$450"),
            ("93356", "Transthoracic echocardiography, complete, with Doppler and spectral display", "$175-$425"),
            ("93315", "Transesophageal echocardiography, complete", "$300-$700"),
            ("93316", "Transesophageal echocardiography for congenital cardiac structural abnormalities", "$300-$700"),
            ("93317", "Transesophageal echocardiography, with Doppler", "$350-$800"),
            ("93318", "Transesophageal echocardiography, follow-up or limited", "$200-$400"),
            ("93014", "Exercise tolerance test (cardiovascular stress test) with measurement of arterial blood gases", "$60-$150"),
            ("93319", "Transthoracic echocardiography, congenital cardiac structural abnormalities, with Doppler and spectral display", "$200-$450"),
            ("93320", "Doppler echocardiography, cardiac output", "$150-$350"),
            ("93321", "Doppler echocardiography, color flow mapping", "$125-$300"),
            ("93325", "Doppler echocardiography, pulsed wave, spectral analysis", "$75-$200"),
        ],
        "icd10": [
            ("I25.10", "Atherosclerotic heart disease of native coronary artery without angina pectoris"),
            ("I25.11", "Atherosclerotic heart disease of native coronary artery with angina pectoris"),
            ("I48.0", "Paroxysmal atrial fibrillation"),
            ("I48.1", "Persistent atrial fibrillation"),
            ("I48.91", "Unspecified atrial fibrillation"),
            ("I50.9", "Heart failure, unspecified"),
            ("I10", "Essential (primary) hypertension"),
            ("I20.0", "Unstable angina"),
            ("I20.1", "Angina pectoris with documented spasm"),
            ("I21.0", "Acute ST elevation (STEMI) myocardial infarction of anterior wall"),
            ("I21.1", "Acute ST elevation (STEMI) myocardial infarction of inferior wall"),
            ("I21.4", "Acute non-ST elevation (NSTEMI) myocardial infarction"),
            ("I49.5", "Sick sinus syndrome"),
            ("I44.0", "First-degree atrioventricular block"),
            ("I44.1", "Second-degree atrioventricular block"),
            ("I44.2", "Complete atrioventricular block"),
            ("I49.3", "Ventricular premature depolarizations"),
            ("I50.1", "Left ventricular failure"),
            ("I50.2", "Right-sided heart failure"),
            ("I50.3", "Biventricular heart failure"),
        ],
        "modifiers": [
            ("26", "Professional component — separate interpretation only"),
            ("TC", "Technical component — equipment and technician only"),
            ("59", "Distinct procedural service"),
            ("76", "Repeat procedure by same physician, same day"),
            ("78", "Return to OR for related procedure during global period"),
            ("79", "Unrelated procedure during global period"),
            ("25", "Significant, separately identifiable E/M service on same day as procedure"),
            ("50", "Bilateral procedure"),
            ("LT", "Left side of body"),
            ("RT", "Right side of body"),
            ("51", "Multiple procedures"),
            ("22", "Increased procedural services"),
        ],
        "denial_reasons": [
            ("CO-4", "Procedure code inconsistent with modifier — missing modifier 26/TC split"),
            ("CO-11", "Diagnosis does not support medical necessity for cardiac testing"),
            ("CO-50", "Non-covered services — routine screening ECG not medically necessary"),
            ("CO-97", "NCCI bundling edits — stress test bundled with ECG"),
            ("CO-16", "Missing documentation for medical necessity of echocardiogram"),
            ("CO-45", "Charges exceed fee schedule for cardiac catheterization"),
            ("CO-167", "Diagnosis not covered under patient benefit plan"),
            ("PR-96", "Non-covered charges — patient responsible for preventive cardiac screening"),
            ("CO-22", "Care may be covered by another payer per COB"),
            ("CO-150", "Service not provided by in-network cardiologist"),
        ],
        "doc_requirements": [
            "Physician order with clinical indication for cardiac testing",
            "Complete clinical history including symptoms, prior cardiac history, medications",
            "Resting 12-lead ECG with interpretation and report",
            "Echocardiography report with measurements and interpretation",
            "Stress test protocol with target heart rate achievement documentation",
            "Cardiac catheterization report with contrast used and findings documented",
            "Physician attestation of medical necessity for each procedure",
            "Documentation of clinical symptoms (chest pain, dyspnea, palpitations)",
            "Prior cardiac testing results showing progression or change in condition",
            "Risk factor assessment (hypertension, diabetes, smoking, family history)",
        ],
        "prior_auth": [
            "Cardiac catheterization — often requires prior auth for Medicare Advantage plans",
            "Nuclear stress testing — prior auth commonly required by commercial payers",
            "Cardiac CT angiography — prior auth required by most major payers",
            "Cardiac MRI — prior auth almost universally required",
            "Implantable cardioverter defibrillator (ICD) — requires prior auth and criteria documentation",
            "Coronary stent placement — prior auth and second opinion often required",
        ],
        "global_period": "0 days for most diagnostic ECG and echocardiography. 90 days for major cardiac procedures like CABG and valve replacement. Minor procedures (pacemaker implant) 10 days.",
        "ncci_edits": [
            "ECG (93000) bundled with ECG interpretation (93010) — cannot bill separately",
            "Stress test (93015) includes ECG monitoring — do not bill 93000 separately",
            "Doppler (93307) bundled with complete echo (93306) — bill 93306 only",
            "Right heart catheterization (93434) bundled with left heart cath — use 93459",
            "Echo with contrast — use 93352 add-on if contrast agent used",
            "Pulse oximetry (94762) bundled with critical care E/M codes",
        ],
        "lcd_ncd": [
            "NCD 20.3: Cardiac catheterization — coverage requires documentation of symptoms or abnormal non-invasive testing",
            "NCD 20.8: Coronary CT angiography — limited coverage for specific indications",
            "LCD L37400: Echocardiography — must document clinical indication beyond routine screening",
            "LCD L37450: Nuclear cardiology testing — requires prior non-invasive testing failure documentation",
            "NCD 240.2: PTCA coverage — requires documentation of significant stenosis",
            "LCD L37300: Cardiac stress testing — must meet criteria for medical necessity",
        ],
        "necessity_tips": [
            "Always document specific symptoms (chest pain, dyspnea, syncope) in clinical notes",
            "Include functional status and impact on daily activities for stress testing justification",
            "Document prior conservative treatment failure before ordering invasive procedures",
            "Reference clinical guidelines (ACC/AHA) for appropriate use criteria",
            "Include relevant risk factors and family history in documentation",
            "Ensure the HPI includes onset, location, duration, character, aggravating/relieving factors",
            "Document physical examination findings that support the testing order",
            "For echocardiography, document suspected structural abnormality or functional assessment need",
        ],
        "billing_tips": [
            "Bill ECG with modifier 26 for professional component and TC for technical component when split",
            "Use modifier 59 for separately identifiable stress test performed same day as echo",
            "Ensure correct ICD-10 specificity — I25.11 for angina, I25.10 for no angina",
            "Monitor NCCI edits for echocardiography bundling — 93306 vs 93307/93308",
            "For cardiac cath, ensure both left and right heart cath are documented for 93459",
            "Bill Holter monitoring with correct duration codes (93224-93227)",
            "Use appropriate place of service — outpatient facility vs office-based lab",
            "Verify which CPT codes require physician supervision for technical component",
        ],
        "payer_rules": [
            "Medicare: LCD documentation requirements strict for cardiac cath — must show failed conservative therapy",
            "Medicare: Annual wellness visit does not cover ECG screening unless symptomatic",
            "Medicaid: Varies by state — some states cover stress testing with prior auth",
            "UHC: Requires prior auth for nuclear stress testing and cardiac MRI",
            "Aetna: Follows ACC/AHA appropriate use criteria for cardiac procedures",
            "BCBS: May require peer-to-peer for cardiac catheterization approval",
            "Cigna: Documentation of clinical findings required for echocardiography coverage",
        ],
        "examples": [
            {
                "title": "Stress Echocardiogram for Chest Pain",
                "codes": "93350 (TTE with Doppler) + I20.0 (Unstable angina)",
                "modifiers": "-26 (Professional component if reading only)",
                "notes": "Patient presents with exertional chest pain. Resting ECG shows ST changes. Stress echo ordered per ACC/AHA guidelines. Documentation includes symptoms, risk factors, and prior test results.",
            },
            {
                "title": "Outpatient Cardiac Catheterization",
                "codes": "93458 (Left heart cath) + 93459 (with right heart cath) + I21.4 (NSTEMI)",
                "modifiers": "-26/-TC for split billing in hospital outpatient setting",
                "notes": "NSTEMI patient admitted and taken for emergent cardiac cath. Both left and right heart catheterization performed. Hospital bills technical component, cardiologist bills professional component.",
            },
            {
                "title": "Holter Monitor for Arrhythmia",
                "codes": "93224 (External ECG recording >48hrs) + I48.91 (Atrial fibrillation)",
                "modifiers": "-26 for professional interpretation",
                "notes": "Patient with palpitations and intermittent AF on routine ECG. 48-hour Holter ordered to capture arrhythmia burden. Results show paroxysmal AF requiring anticoagulation decision.",
            },
        ],
        "related_specialties": [
            ("Cardiothoracic Surgery", "cardiology-cpt-codes.html"),
            ("Interventional Cardiology", "cardiology-cpt-codes.html"),
            ("Electrophysiology", "neurology-cpt-codes.html"),
        ],
    },
    {
        "name": "Orthopedics",
        "slug": "orthopedics",
        "icon": "🦴",
        "description": "Comprehensive orthopedic surgery billing guide with top CPT codes, ICD-10 diagnoses, modifiers, denial reasons, and billing tips for AR callers and medical coders.",
        "keywords": "orthopedics CPT codes, orthopedic billing, orthopedic denial codes, joint replacement billing, fracture care CPT",
        "top_cpt": [
            ("27447", "Total knee arthroplasty (replacement)", "$2,500-$5,000"),
            ("27130", "Total hip arthroplasty (replacement)", "$2,500-$5,500"),
            ("29881", "Arthroscopy, knee, surgical, with meniscectomy", "$800-$1,800"),
            ("29880", "Arthroscopy, knee, surgical, with meniscus repair", "$1,000-$2,200"),
            ("29827", "Arthroscopy, shoulder, surgical, with rotator cuff repair", "$1,200-$2,800"),
            ("29826", "Arthroscopy, shoulder, surgical, decompression, subacromial", "$800-$1,600"),
            ("23472", "Total shoulder arthroplasty (anatomic)", "$2,500-$5,000"),
            ("23473", "Total shoulder arthroplasty (reverse)", "$3,000-$6,000"),
            ("27536", "Closed treatment of femoral shaft fracture with manipulation", "$300-$800"),
            ("27752", "Closed treatment of distal radius fracture, with manipulation", "$200-$500"),
            ("26350", "Fusion, first carpometacarpal joint", "$1,500-$3,000"),
            ("20610", "Arthrocentesis, aspiration and/or injection of major joint or bursa", "$30-$100"),
            ("20611", "Arthrocentesis, aspiration and/or injection of major joint with ultrasound guidance", "$50-$150"),
            ("97110", "Therapeutic exercises, each 15 minutes", "$25-$50"),
            ("97140", "Manual therapy techniques, each 15 minutes", "$25-$50"),
            ("29805", "Arthroscopy, shoulder, diagnostic, with or without synovial biopsy", "$500-$1,200"),
            ("29823", "Arthroscopy, shoulder, surgical, extensive debridement", "$1,000-$2,200"),
            ("29824", "Arthroscopy, shoulder, surgical, distal claviculectomy", "$800-$1,600"),
            ("29828", "Arthroscopy, shoulder, surgical, biceps tenodesis", "$1,200-$2,500"),
            ("29882", "Arthroscopy, knee, surgical, with removal of loose body", "$800-$1,800"),
            ("29883", "Arthroscopy, knee, surgical, with synovectomy", "$900-$2,000"),
            ("27187", "Conversion total hip arthroplasty", "$3,000-$6,500"),
            ("27185", "Hip hemiarthroplasty (unipolar)", "$2,000-$4,000"),
            ("27132", "Conversion of previous hip surgery to total hip arthroplasty", "$3,000-$6,000"),
            ("24586", "Revision total elbow arthroplasty", "$2,500-$5,000"),
            ("20680", "Removal of deep implant, forearm or wrist", "$300-$800"),
            ("20685", "Removal of deep implant, femur, tibia, or patella", "$400-$1,000"),
            ("20687", "Removal of deep implant, humerus", "$400-$1,000"),
            ("20604", "Arthrocentesis, aspiration and/or injection of small joint or bursa, with ultrasound guidance", "$40-$120"),
            ("20606", "Arthrocentesis, aspiration and/or injection of medium joint or bursa, with ultrasound guidance", "$50-$140"),
        ],
        "icd10": [
            ("M17.11", "Primary osteoarthritis, right knee"),
            ("M17.12", "Primary osteoarthritis, left knee"),
            ("M16.11", "Primary osteoarthritis, right hip"),
            ("M16.12", "Primary osteoarthritis, left hip"),
            ("S72.001A", "Fracture of unspecified part of neck of right femur, initial encounter"),
            ("S72.002A", "Fracture of unspecified part of neck of left femur, initial encounter"),
            ("S52.501A", "Fracture of unspecified part of lower end of right radius, initial encounter"),
            ("S52.502A", "Fracture of unspecified part of lower end of left radius, initial encounter"),
            ("M75.10", "Unspecified rotator cuff syndrome, unspecified shoulder"),
            ("M75.11", "Rotator cuff syndrome, right shoulder"),
            ("M75.12", "Rotator cuff syndrome, left shoulder"),
            ("M23.21", "Derangement of medial meniscus due to old tear or injury"),
            ("M23.22", "Derangement of lateral meniscus due to old tear or injury"),
            ("S83.211A", "Tear of medial meniscus, right knee, initial encounter"),
            ("S83.212A", "Tear of medial meniscus, left knee, initial encounter"),
            ("M54.5", "Low back pain"),
            ("M51.16", "Intervertebral disc disorders with radiculopathy, lumbar region"),
            ("G56.00", "Carpal tunnel syndrome, unspecified hand"),
            ("G56.01", "Carpal tunnel syndrome, right hand"),
            ("G56.02", "Carpal tunnel syndrome, left hand"),
        ],
        "modifiers": [
            ("RT", "Right side of body"),
            ("LT", "Left side of body"),
            ("50", "Bilateral procedure"),
            ("59", "Distinct procedural service"),
            ("51", "Multiple procedures"),
            ("25", "Significant, separately identifiable E/M service"),
            ("57", "Decision for surgery"),
            ("78", "Return to OR for related procedure during global period"),
            ("79", "Unrelated procedure during global period"),
            ("26", "Professional component"),
            ("TC", "Technical component"),
            ("22", "Increased procedural services"),
        ],
        "denial_reasons": [
            ("CO-4", "Procedure code inconsistent with modifier — laterality mismatch"),
            ("CO-11", "Diagnosis does not support medical necessity for joint replacement"),
            ("CO-50", "Non-covered services — total knee replacement before failed conservative therapy"),
            ("CO-97", "NCCI bundling edits — arthroscopy bundled with surgical repair"),
            ("CO-197", "Precertification/authorization absent — prior auth required for joint replacement"),
            ("CO-252", "An attachment is required — X-ray or MRI results needed"),
            ("CO-204", "Service not supported by diagnosis — degenerative changes only"),
            ("CO-16", "Claim lacks information — missing physical therapy documentation"),
            ("CO-45", "Charges exceed fee schedule for orthopedic procedures"),
            ("CO-167", "Diagnosis not covered under benefit plan for elective surgery"),
        ],
        "doc_requirements": [
            "Pre-operative imaging (X-ray, MRI) with radiologist interpretation",
            "Documentation of failed conservative treatment (PT, injections, medications)",
            "Physical therapy records showing limited improvement or progression",
            "Surgeon's operative report with detailed procedural description",
            "Implant records with device manufacturer, model, and lot numbers",
            "Informed consent documentation",
            "Post-operative follow-up notes with functional outcome assessment",
            "Pre-surgical medical clearance for anesthesia",
            "Documentation of medical necessity criteria met (e.g., KSS score for knee)",
            "History and physical within 30 days of surgery",
        ],
        "prior_auth": [
            "Total knee replacement — requires prior auth with clinical documentation for most payers",
            "Total hip replacement — prior auth required, documentation of failed conservative therapy",
            "Rotator cuff repair — prior auth often required by commercial payers",
            "Spine surgery — prior auth universally required with peer-to-peer review",
            "Arthroscopy — prior auth may be required for non-emergent procedures",
            "MRI — prior auth required by most commercial payers, Medicare Advantage",
        ],
        "global_period": "90 days for major joint replacement (27447, 27130). 90 days for arthroscopic rotator cuff repair. 0 days for closed fracture treatment. 10 days for carpal tunnel release.",
        "ncci_edits": [
            "Arthroscopy (29881) with meniscectomy — do not bill separately with open meniscectomy",
            "Manipulation under anesthesia (20050) bundled with fracture treatment",
            "Closed fracture treatment with manipulation (27752) bundled with X-ray interpretation",
            "Joint injection (20610) should not be billed with therapeutic exercise (97110) on same day",
            "Spinal injection codes — verify correct anatomic specificity for each level",
        ],
        "lcd_ncd": [
            "LCD L37870: Total knee arthroplasty — must document KSS score and radiographic evidence",
            "LCD L38203: Total hip arthroplasty — requires documentation of functional limitation",
            "LCD L38495: Arthroscopic meniscectomy — must document mechanical symptoms",
            "LCD L38570: Spine surgery — requires documented conservative treatment failure",
            "NCD 280.1: Physical therapy — limited visits without documented progress",
            "LCD L36744: MRI spine — must document specific clinical indication",
        ],
        "necessity_tips": [
            "Document specific functional limitations (stairs, walking distance, ADLs)",
            "Include validated outcome scores (KSS, Harris Hip Score, DASH)",
            "Document failure of conservative therapy with specific treatments and duration",
            "Provide clear imaging evidence of structural abnormality correlating with symptoms",
            "Include impact on work and quality of life in documentation",
            "Ensure pre-operative medical clearance is documented and dated",
        ],
        "billing_tips": [
            "Always verify correct laterality — use RT/LT modifiers for unilateral procedures",
            "Bill global surgical package correctly — post-op visits included in global period",
            "Use modifier 57 for decision for surgery on E/M day before procedure",
            "Separate physical therapy from surgical billing to avoid bundling issues",
            "Bill implant devices with appropriate HCPCS codes if not included in CPT",
            "Monitor NCCI edits for arthroscopy and open procedure combinations",
        ],
        "payer_rules": [
            "Medicare: LCD L37870 strict for TKA — must document BMI < 40 and failed conservative therapy",
            "Medicare: 2 Midnight Rule applies for inpatient joint replacement",
            "Medicaid: Varies by state — many states require prior auth for all elective surgery",
            "UHC: Requires prior auth for total joint replacement, spine surgery, arthroscopy",
            "Aetna: Follows AAOS guidelines for orthopedic procedures",
            "BCBS: May require second surgical opinion for total joint replacement",
            "Cigna: Documentation of functional limitation required for all surgical procedures",
        ],
        "examples": [
            {
                "title": "Total Knee Arthroplasty",
                "codes": "27447 (Total knee arthroplasty) + M17.11 (Primary OA, right knee)",
                "modifiers": "-RT (Right knee)",
                "notes": "Patient with severe right knee OA, KSS score 45, failed 6 months of PT and injections. Pre-op X-ray shows bone-on-bone. Implant: Zimmer Persona.",
            },
            {
                "title": "Arthroscopic Meniscectomy",
                "codes": "29881 (Arthroscopic meniscectomy) + S83.211A (Tear medial meniscus, right knee)",
                "modifiers": "-RT (Right knee), -59 if separate from injection",
                "notes": "Active patient with mechanical symptoms, MRI-confirmed medial meniscus tear. Failed conservative treatment. Arthroscopic partial medial meniscectomy performed.",
            },
            {
                "title": "Rotator Cuff Repair",
                "codes": "29827 (Arthroscopic rotator cuff repair) + M75.11 (Rotator cuff syndrome, right shoulder)",
                "modifiers": "-RT (Right shoulder), -22 if complex repair",
                "notes": "Full-thickness rotator cuff tear confirmed by MRI. Patient failed 3 months of PT. Arthroscopic repair of supraspinatus tendon. Post-op sling and structured PT protocol.",
            },
        ],
        "related_specialties": [
            ("Rheumatology", "orthopedics-cpt-codes.html"),
            ("Pain Management", "pain-management-cpt-codes.html"),
            ("Physical Therapy", "physical-therapy-cpt-codes.html"),
        ],
    },
    {
        "name": "Gastroenterology",
        "slug": "gastroenterology",
        "icon": "🔬",
        "description": "Comprehensive gastroenterology billing guide with top CPT codes, ICD-10 diagnoses, modifiers, denial reasons, and billing tips for AR callers and medical coders.",
        "keywords": "gastroenterology CPT codes, GI billing, colonoscopy CPT, endoscopy billing, gastroenterology denial codes",
        "top_cpt": [
            ("45378", "Colonoscopy, flexible, diagnostic, with or without collection of specimen(s) by brushing or washing, with or without colon decompression (not endoscopic diagnosis or treatment)", "$300-$600"),
            ("45380", "Colonoscopy, flexible, with biopsy, single or multiple", "$350-$700"),
            ("45384", "Colonoscopy, flexible, with removal of tumor(s), polyp(s), or other lesion(s) by hot biopsy forceps or bipolar cautery", "$400-$800"),
            ("45385", "Colonoscopy, flexible, with removal of tumor(s), polyp(s), or other lesion(s) by snare technique", "$450-$900"),
            ("45388", "Colonoscopy, flexible, with ablation, tumor(s), polyp(s), or other lesion(s)", "$500-$1,000"),
            ("43239", "Esophagogastroduodenoscopy (EGD), flexible, with biopsy, single or multiple", "$200-$450"),
            ("43249", "EGD, flexible, with control of bleeding, any method", "$250-$550"),
            ("43235", "EGD, flexible, diagnostic", "$150-$350"),
            ("43246", "EGD, flexible, with dilation of esophagus", "$250-$550"),
            ("43264", "EGD, flexible, with transendoscopic ultrasound-guided intramural or transmural fine needle aspiration/biopsy(s)", "$400-$800"),
            ("43272", "EGD, flexible, with endoscopic mucosal resection", "$500-$1,100"),
            ("43644", "Laparoscopy, surgical, gastric restrictive procedure, placement of adjustable gastric band", "$1,500-$3,500"),
            ("43645", "Laparoscopy, surgical, gastric restrictive procedure, vertical banded gastroplasty", "$1,500-$3,500"),
            ("43770", "Laparoscopy, surgical, gastric restrictive procedure, sleeve gastrectomy", "$2,000-$4,500"),
            ("43775", "Laparoscopy, surgical, gastric bypass, Roux-en-Y", "$2,500-$5,500"),
            ("47562", "Laparoscopy, surgical, cholecystectomy (separate procedure)", "$1,200-$2,800"),
            ("47563", "Laparoscopy, surgical, cholecystectomy with cholangiography", "$1,400-$3,200"),
            ("43239", "EGD with biopsy", "$200-$450"),
            ("43249", "EGD with control of bleeding", "$250-$550"),
            ("45380", "Colonoscopy with biopsy", "$350-$700"),
            ("45385", "Colonoscopy with polypectomy by snare", "$450-$900"),
            ("47562", "Laparoscopic cholecystectomy", "$1,200-$2,800"),
            ("43235", "EGD diagnostic", "$150-$350"),
            ("45378", "Colonoscopy diagnostic", "$300-$600"),
            ("74181", "MRI abdomen without contrast", "$300-$700"),
            ("74183", "MRI abdomen with contrast", "$400-$900"),
            ("74185", "MRI abdomen without and with contrast", "$500-$1,100"),
            ("91110", "GI tract capsule endoscopy, small bowel", "$800-$2,000"),
            ("91010", "Esophageal motility study (manometry)", "$150-$400"),
            ("91020", "Gastric motility study (gastric emptying scan)", "$200-$500"),
        ],
        "icd10": [
            ("K21.0", "Gastro-esophageal reflux disease with esophagitis"),
            ("K21.9", "Gastro-esophageal reflux disease without esophagitis"),
            ("K92.2", "Melena (blood in stool)"),
            ("K92.1", "Melenic stool (black tarry stool)"),
            ("K62.5", "Hemorrhage of anus and rectum"),
            ("K63.5", "Polyp of colon"),
            ("Z12.11", "Encounter for screening for malignant neoplasm of colon"),
            ("K59.00", "Constipation, unspecified"),
            ("K59.1", "Functional diarrhea"),
            ("K58.9", "Irritable bowel syndrome without diarrhea"),
            ("K80.20", "Calculus of gallbladder without cholecystitis without obstruction"),
            ("K80.21", "Calculus of gallbladder with cholecystitis without obstruction"),
            ("K80.00", "Calculus of gallbladder with acute cholecystitis without obstruction"),
            ("K81.0", "Acute cholecystitis"),
            ("K81.1", "Chronic cholecystitis"),
            ("K57.32", "Diverticulosis of large intestine without hemorrhage"),
            ("K57.33", "Diverticulosis of large intestine with hemorrhage"),
            ("K50.90", "Crohn's disease, unspecified, without complications"),
            ("K51.90", "Ulcerative colitis, unspecified, without complications"),
            ("Z86.010", "Personal history of colonic polyps"),
        ],
        "modifiers": [
            ("59", "Distinct procedural service"),
            ("25", "Significant, separately identifiable E/M service"),
            ("51", "Multiple procedures"),
            ("26", "Professional component"),
            ("TC", "Technical component"),
            ("76", "Repeat procedure by same physician, same day"),
            ("33", "Preventive service"),
            ("PT", "Beneficiary received screening colonoscopy on date shown"),
            ("33", "Preventive service modifier for colonoscopy screening"),
            ("22", "Increased procedural services"),
            ("53", "Discontinued procedure"),
            ("74", "Discontinued procedure after anesthesia administration"),
        ],
        "denial_reasons": [
            ("CO-4", "Procedure code inconsistent with modifier — missing modifier for screening vs diagnostic"),
            ("CO-11", "Diagnosis does not support medical necessity for colonoscopy"),
            ("CO-50", "Non-covered services — screening colonoscopy before age 45 without risk factors"),
            ("CO-97", "NCCI bundling edits — EGD with biopsy bundled with separate E/M"),
            ("CO-16", "Missing documentation — no indication for diagnostic colonoscopy"),
            ("CO-197", "Precertification/authorization absent"),
            ("CO-252", "Attachment required — pathology results needed for polypectomy claims"),
            ("CO-204", "Service not supported by diagnosis — preventive screening billed with diagnostic codes"),
            ("CO-167", "Diagnosis not covered under benefit plan"),
            ("CO-45", "Charges exceed fee schedule for GI procedures"),
        ],
        "doc_requirements": [
            "Informed consent for sedation and procedure",
            "Clinical indication for procedure (screening vs diagnostic)",
            "Complete procedure report with findings, interventions, and specimen collection",
            "Pathology requisition and results for biopsy specimens",
            "Pre-procedure assessment including anesthesia screening",
            "Sedation monitoring documentation",
            "Procedure quality metrics (cecal intubation rate, withdrawal time)",
            "Surgeon/provider attestation of medical necessity",
            "Post-procedure care instructions and follow-up plan",
            "Documentation of bowel preparation adequacy",
        ],
        "prior_auth": [
            "Most screening colonoscopies — no prior auth required for Medicare",
            "Diagnostic colonoscopy — prior auth may be required by commercial payers",
            "EGD — prior auth sometimes required by managed care plans",
            "Barrett's esophagus surveillance — prior auth may be required",
            "Capsule endoscopy — prior auth commonly required by all payers",
            "ERCP — prior auth required by most commercial payers",
        ],
        "global_period": "0 days for diagnostic colonoscopy and EGD. 0 days for polypectomy. 90 days for bariatric surgery (43644, 43645, 43770, 43775). 0 days for laparoscopic cholecystectomy.",
        "ncci_edits": [
            "Colonoscopy diagnostic (45378) bundled with biopsy (45380) — bill 45380 only",
            "EGD diagnostic (43235) bundled with biopsy (43239) — bill 43239 only",
            "Colonoscopy with ablation (45388) — do not separately bill snare removal (45385)",
            "Laparoscopic cholecystectomy (47562) includes cholangiography — do not bill 47563 separately",
            "Upper GI endoscopy and colonoscopy performed same session — modifier 59 required for separate procedures",
            "Pathology charges bundled with procedure — do not separately bill for specimen handling",
        ],
        "lcd_ncd": [
            "NCD 1.3: Screening colonoscopy — covered for average-risk individuals beginning at age 45",
            "LCD L34595: Colonoscopy screening — requires documentation of risk factors before age 45",
            "LCD L34738: Diagnostic colonoscopy — requires clinical indication beyond routine screening",
            "NCD 20.33: ERCP — coverage requires documentation of clinical indication",
            "LCD L35543: Capsule endoscopy — requires documentation of obscure GI bleeding or suspected small bowel disease",
            "NCD 220.2: Bariatric surgery — requires documentation of BMI > 40 or BMI > 35 with comorbidities",
        ],
        "necessity_tips": [
            "For screening colonoscopy, document family history of colon cancer or polyps for early screening",
            "Include specific symptoms (GI bleeding, weight loss, abdominal pain) for diagnostic procedures",
            "Document prior imaging or lab results that prompted the endoscopic evaluation",
            "Reference USPSTF guidelines for screening colonoscopy age recommendations",
            "For Barrett's surveillance, document prior biopsy results showing intestinal metaplasia",
            "Ensure clear documentation distinguishing screening from diagnostic procedures",
        ],
        "billing_tips": [
            "Use modifier PT for screening colonoscopy performed on Medicare beneficiary",
            "Use modifier 33 for preventive service when applicable",
            "Bill screening colonoscopy with Z12.11 as primary diagnosis",
            "Bill diagnostic colonoscopy with clinical indication codes (K92.1, K92.2, etc.)",
            "Separate E/M service same day as procedure requires modifier 25",
            "Monitor NCCI edits for EGD and colonoscopy same-day bundling",
            "Use correct E/M codes for pre-procedure assessment on day of procedure",
        ],
        "payer_rules": [
            "Medicare: Screening colonoscopy covered every 10 years starting at age 45, or every 4 years with high risk",
            "Medicare: Diagnostic colonoscopy requires clinical indication — not routine",
            "Medicaid: Varies by state — many cover screening colonoscopy at age 50",
            "UHC: Follows USPSTF guidelines for screening colonoscopy",
            "Aetna: May require prior auth for capsule endoscopy and ERCP",
            "BCBS: Covers screening colonoscopy per USPSTF guidelines",
            "Cigna: Documentation of clinical indication required for all diagnostic GI procedures",
        ],
        "examples": [
            {
                "title": "Screening Colonoscopy with Polypectomy",
                "codes": "45385 (Colonoscopy with polypectomy) + Z12.11 (Screening for colon cancer) + K63.5 (Colon polyp)",
                "modifiers": "-PT for Medicare screening",
                "notes": "Average-risk 52-year-old patient presents for routine screening colonoscopy. Two polyps found and removed by snare. Pathology sent. Documentation includes family history, bowel prep adequacy, and cecal intubation time.",
            },
            {
                "title": "Diagnostic EGD for GERD",
                "codes": "43239 (EGD with biopsy) + K21.0 (GERD with esophagitis)",
                "modifiers": "-25 if E/M performed same day",
                "notes": "Patient with chronic GERD symptoms despite PPI therapy. EGD performed with biopsies from squamocolumnar junction. Pathology shows Barrett's esophagus. Follow-up surveillance schedule documented.",
            },
            {
                "title": "Laparoscopic Cholecystectomy",
                "codes": "47562 (Laparoscopic cholecystectomy) + K80.21 (Gallstone with cholecystitis)",
                "modifiers": "-59 if separate from E/M",
                "notes": "Patient with symptomatic gallstones and recurrent cholecystitis. Laparoscopic cholecystectomy performed. Operative report documents acute cholecystitis. Pathology shows chronic cholecystitis with cholesterol stones.",
            },
        ],
        "related_specialties": [
            ("General Surgery", "general-surgery-cpt-codes.html"),
            ("Internal Medicine", "internal-medicine-cpt-codes.html"),
            ("Oncology", "oncology-cpt-codes.html"),
        ],
    },
    {
        "name": "General Surgery",
        "slug": "general-surgery",
        "icon": "🏥",
        "description": "Comprehensive general surgery billing guide with top CPT codes, ICD-10 diagnoses, modifiers, denial reasons, and billing tips for AR callers and medical coders.",
        "keywords": "general surgery CPT codes, general surgery billing, hernia repair CPT, appendectomy billing, surgical denial codes",
        "top_cpt": [
            ("49505", "Repair of inguinal hernia, age 5 years or older, mesh graft", "$500-$1,200"),
            ("49507", "Repair of inguinal hernia, age 5 years or older, without mesh graft", "$500-$1,100"),
            ("49560", "Repair of recurrent inguinal hernia", "$600-$1,500"),
            ("49561", "Repair of recurrent inguinal hernia with mesh", "$700-$1,600"),
            ("49585", "Repair of incisional hernia (including mesh graft)", "$800-$2,000"),
            ("49587", "Repair of incisional hernia (without mesh)", "$700-$1,800"),
            ("49650", "Repair of initial inguinal hernia, laparoscopic, with mesh", "$800-$2,000"),
            ("49651", "Repair of recurrent inguinal hernia, laparoscopic, with mesh", "$900-$2,200"),
            ("49652", "Laparoscopy, surgical, repair, inguinal hernia, initial, using mesh", "$800-$2,000"),
            ("49653", "Laparoscopy, surgical, repair, recurrent inguinal hernia, using mesh", "$900-$2,200"),
            ("49501", "Repair of inguinal hernia, age 1-5 years, with or without hydrocelectomy", "$400-$900"),
            ("44970", "Laparoscopy, surgical, appendectomy", "$1,000-$2,500"),
            ("44950", "Appendectomy (open)", "$800-$2,000"),
            ("44960", "Appendectomy (open), with drainage of abscess", "$1,000-$2,500"),
            ("19301", "Mastectomy, partial (lumpectomy)", "$1,000-$2,500"),
            ("19307", "Mastectomy, modified radical", "$1,500-$3,500"),
            ("35301", "Embolectomy/thrombectomy, arterial, each additional artery", "$800-$2,000"),
            ("35306", "Embolectomy/thrombectomy, aorto-iliac, femoral artery", "$1,000-$2,500"),
            ("35341", "Thromboendarterectomy, carotid artery", "$1,200-$3,000"),
            ("43999", "Laparoscopy, surgical, gastric restrictive procedure, NOS", "$1,500-$3,500"),
            ("11042", "Debridement, skin, full thickness, including epidermis and dermis, first 20 sq cm or less", "$100-$300"),
            ("11043", "Debridement, skin, full thickness, including epidermis and dermis, each additional 20 sq cm", "$50-$150"),
            ("11044", "Debridement, muscle and/or fascia", "$150-$400"),
            ("11045", "Debridement, muscle and/or fascia, each additional 20 sq cm", "$75-$200"),
            ("11046", "Debridement, bone", "$200-$500"),
            ("11047", "Debridement, bone, each additional 20 sq cm", "$100-$300"),
            ("27301", "Incision and drainage of abscess, thigh or knee region", "$200-$500"),
            ("27310", "Incision and drainage of abscess, hip joint", "$300-$700"),
            ("29580", "Application of semi-rigid (unpadded) plaster or fiberglass short leg cast", "$100-$300"),
            ("29581", "Application of semi-rigid (unpadded) plaster or fiberglass long leg cast", "$150-$400"),
        ],
        "icd10": [
            ("K40.90", "Unilateral inguinal hernia, not specified as recurrent, without obstruction or gangrene"),
            ("K40.91", "Unilateral inguinal hernia, not specified as recurrent, with obstruction"),
            ("K40.92", "Unilateral inguinal hernia, not specified as recurrent, with gangrene"),
            ("K41.90", "Unilateral femoral hernia, not specified as recurrent, without obstruction"),
            ("K43.5", "Parastomal hernia with obstruction"),
            ("K43.6", "Other ventral hernia with obstruction"),
            ("K43.7", "Parastomal hernia without obstruction or gangrene"),
            ("K43.9", "Other ventral hernia without obstruction or gangrene"),
            ("K35.80", "Unspecified acute appendicitis without peritonitis"),
            ("K35.81", "Unspecified acute appendicitis with peritonitis"),
            ("K37", "Unspecified appendicitis"),
            ("C50.919", "Malignant neoplasm of unspecified site of unspecified female breast"),
            ("D22.72", "Melanocytic nevi, left lower limb"),
            ("L89.002", "Pressure ulcer of right elbow, stage 2"),
            ("L89.003", "Pressure ulcer of right elbow, stage 3"),
            ("L89.102", "Pressure ulcer of right back, stage 2"),
            ("L89.103", "Pressure ulcer of right back, stage 3"),
            ("I74.3", "Embolism and thrombosis of arteries of the lower extremities"),
            ("I74.2", "Embolism and thrombosis of arteries of the upper extremities"),
            ("I74.5", "Embolism and thrombosis of arteries of the lower extremities"),
        ],
        "modifiers": [
            ("RT", "Right side of body"),
            ("LT", "Left side of body"),
            ("50", "Bilateral procedure"),
            ("59", "Distinct procedural service"),
            ("51", "Multiple procedures"),
            ("22", "Increased procedural services"),
            ("57", "Decision for surgery"),
            ("78", "Return to OR for related procedure during global period"),
            ("79", "Unrelated procedure during global period"),
            ("25", "Significant, separately identifiable E/M service"),
            ("58", "Staged or related procedure during global period"),
            ("80", "Assistant surgeon"),
            ("AS", "Physician assistant, nurse practitioner, or clinical nurse specialist services"),
        ],
        "denial_reasons": [
            ("CO-4", "Procedure code inconsistent with modifier — laterality or site mismatch"),
            ("CO-11", "Diagnosis does not support medical necessity for surgical procedure"),
            ("CO-50", "Non-covered services — elective hernia repair without documented symptoms"),
            ("CO-97", "NCCI bundling edits — procedure bundled with related E/M"),
            ("CO-197", "Precertification/authorization absent"),
            ("CO-252", "Attachment required — operative report or pathology results needed"),
            ("CO-204", "Service not supported by diagnosis"),
            ("CO-16", "Claim lacks information — missing pre-operative documentation"),
            ("CO-45", "Charges exceed fee schedule"),
            ("CO-182", "Services not provided by qualified or credentialed provider"),
        ],
        "doc_requirements": [
            "Pre-operative H&P within 30 days of surgery",
            "Informed consent signed and documented",
            "Operative report with detailed description of procedure, findings, and technique",
            "Pathology requisition and results for tissue specimens",
            "Anesthesia record and monitoring documentation",
            "Implant records if mesh or device used (manufacturer, model, lot number)",
            "Post-operative notes including discharge instructions",
            "Documentation of medical necessity for elective procedures",
            "Documentation of failed conservative treatment when applicable",
            "Wound culture results if infection present",
        ],
        "prior_auth": [
            "Elective inguinal hernia repair — prior auth may be required by managed care",
            "Incisional hernia repair — prior auth often required",
            "Cholecystectomy for biliary colic — prior auth may be required",
            "Laparoscopic appendectomy — generally emergent, no prior auth needed",
            "Mastectomy — prior auth may be required for elective cases",
            "Wound debridement — prior auth may be required for chronic wounds",
        ],
        "global_period": "90 days for open hernia repair. 90 days for laparoscopic hernia repair. 90 days for open cholecystectomy. 0 days for laparoscopic appendectomy. 90 days for wound debridement with flaps.",
        "ncci_edits": [
            "Inguinofemoral hernia repair (49505) bundled with orchiopexy (54620) — do not bill separately",
            "Wound debridement (11042-11047) — do not bill multiple levels of debridement on same wound",
            "Mastectomy (19301) includes lymph node sampling — do not bill sentinel node separately",
            "Laparoscopic cholecystectomy (47562) includes cholangiography — do not bill 47563",
            "Incisional hernia repair (49585) — do not separately bill adhesiolysis during same procedure",
            "Appendectomy (44970) — do not separately bill bowel resection during same encounter",
        ],
        "lcd_ncd": [
            "LCD L37872: Inguinal hernia repair — must document symptoms (pain, obstruction) for elective repair",
            "LCD L38123: Ventral hernia repair — requires documentation of incarceration or symptoms",
            "LCD L34950: Wound debridement — requires documentation of wound stage and treatment plan",
            "NCD 280.1: Physical therapy — limited visits for post-surgical rehabilitation",
            "LCD L36783: Cholecystectomy — requires documentation of symptomatic gallstone disease",
            "LCD L37298: Mastectomy — requires documentation of malignancy or high-risk pathology",
        ],
        "necessity_tips": [
            "Document specific symptoms (pain, obstruction, incarceration) for elective hernia repair",
            "Include clinical findings and imaging results supporting surgical intervention",
            "Document failure of conservative management when applicable",
            "For wound debridement, document wound measurements, depth, and tissue involvement",
            "Include risk factors and comorbidities affecting surgical decision-making",
            "Document informed consent discussion including risks, benefits, and alternatives",
        ],
        "billing_tips": [
            "Use correct laterality modifiers (RT/LT) for all unilateral procedures",
            "Bill mesh placement separately if not included in CPT code descriptor",
            "Separate E/M service same day as procedure requires modifier 25",
            "Use modifier 57 for decision for surgery on E/M day before procedure",
            "Monitor NCCI edits for hernia repair and orchiopexy combinations",
            "Use correct wound debridement codes (11042-11047) based on tissue level",
        ],
        "payer_rules": [
            "Medicare: LCD L37872 requires documented symptoms for elective hernia repair",
            "Medicare: 2 Midnight Rule applies for inpatient surgical procedures",
            "Medicaid: Varies by state — prior auth may be required for elective surgery",
            "UHC: Requires prior auth for elective hernia repair and cholecystectomy",
            "Aetna: Follows ACS guidelines for surgical procedures",
            "BCBS: May require peer-to-peer review for complex surgical cases",
            "Cigna: Documentation of functional limitation required for surgical procedures",
        ],
        "examples": [
            {
                "title": "Inguinal Hernia Repair with Mesh",
                "codes": "49505 (Inguinal hernia repair, age 5+, with mesh) + K40.90 (Unilateral inguinal hernia)",
                "modifiers": "-RT or -LT for laterality",
                "notes": "55-year-old male with symptomatic right inguinal hernia. Pre-op history of groin pain and bulge. Open repair with polypropylene mesh. Post-op follow-up at 2 weeks shows healing incision.",
            },
            {
                "title": "Laparoscopic Appendectomy",
                "codes": "44970 (Laparoscopic appendectomy) + K35.80 (Acute appendicitis without peritonitis)",
                "modifiers": "-59 if separate from E/M",
                "notes": "28-year-old female with acute RLQ pain, elevated WBC, CT showing acute appendicitis. Laparoscopic appendectomy performed. Operative report documents non-perforated appendix. Pathology confirms acute appendicitis.",
            },
            {
                "title": "Wound Debridement, Diabetic Foot Ulcer",
                "codes": "11042 (Debridement, skin full thickness, first 20 sq cm) + 11045 (Debridement, muscle, each additional 20 sq cm) + L89.103 (Pressure ulcer, right back, stage 3)",
                "modifiers": "-RT for right side",
                "notes": "72-year-old diabetic patient with stage 3 pressure ulcer on right back. Wound measures 8cm x 6cm x 2cm depth. Full-thickness skin and muscle debridement performed. Wound cultures obtained.",
            },
        ],
        "related_specialties": [
            ("Gastroenterology", "gastroenterology-cpt-codes.html"),
            ("Orthopedics", "orthopedics-cpt-codes.html"),
            ("Dermatology", "dermatology-cpt-codes.html"),
        ],
    },
    {
        "name": "Radiology",
        "slug": "radiology",
        "icon": "📡",
        "description": "Comprehensive radiology billing guide with top CPT codes, ICD-10 diagnoses, modifiers, denial reasons, and billing tips for AR callers and medical coders.",
        "keywords": "radiology CPT codes, radiology billing, X-ray CPT, CT scan billing, MRI CPT codes, radiology denial codes",
        "top_cpt": [
            ("71046", "Chest X-ray, 2 views (frontal and lateral)", "$15-$40"),
            ("71045", "Chest X-ray, frontal view only", "$10-$30"),
            ("71047", "Chest X-ray, 3 views", "$20-$50"),
            ("73030", "Shoulder X-ray, 3 views", "$25-$60"),
            ("73110", "Wrist X-ray, 2 views", "$20-$50"),
            ("73562", "Hip X-ray, 2 views", "$25-$60"),
            ("73615", "Foot X-ray, 3 views", "$20-$50"),
            ("73721", "MRI lower extremity joint without contrast (knee)", "$200-$500"),
            ("73722", "MRI lower extremity joint with contrast (knee)", "$300-$700"),
            ("73723", "MRI lower extremity joint without and with contrast (knee)", "$400-$900"),
            ("70553", "MRI brain without contrast, with and without contrast", "$300-$800"),
            ("70551", "MRI brain without contrast", "$200-$500"),
            ("70552", "MRI brain with contrast", "$250-$600"),
            ("71260", "CT chest with contrast", "$200-$500"),
            ("71270", "CT chest without contrast", "$150-$400"),
            ("70496", "CT head without contrast", "$150-$400"),
            ("70498", "CT head with contrast", "$200-$500"),
            ("72141", "CT lumbar spine without contrast", "$150-$400"),
            ("72142", "CT lumbar spine with contrast", "$200-$500"),
            ("74177", "CT abdomen and pelvis with contrast", "$250-$600"),
            ("74178", "CT abdomen and pelvis without contrast", "$200-$500"),
            ("74181", "MRI abdomen without contrast", "$300-$700"),
            ("74183", "MRI abdomen with contrast", "$400-$900"),
            ("76700", "Ultrasound, abdomen, complete", "$75-$200"),
            ("76705", "Ultrasound, abdomen, limited", "$50-$150"),
            ("76856", "Ultrasound, pelvis, complete", "$75-$200"),
            ("76857", "Ultrasound, pelvis, limited", "$50-$150"),
            ("77067", "Screening mammography, bilateral (includes CAD)", "$50-$150"),
            ("77063", "Screening digital breast tomosynthesis, bilateral", "$80-$200"),
            ("76831", "Ultrasound, breast, complete", "$100-$250"),
        ],
        "icd10": [
            ("R05.9", "Cough, unspecified"),
            ("R06.00", "Dyspnea, unspecified"),
            ("R06.02", "Shortness of breath"),
            ("R07.9", "Chest pain, unspecified"),
            ("R10.9", "Unspecified abdominal pain"),
            ("R10.0", "Acute abdomen"),
            ("R51.9", "Headache, unspecified"),
            ("G43.909", "Migraine, unspecified, not intractable, without status migrainosus"),
            ("M54.5", "Low back pain"),
            ("M54.9", "Dorsalgia, unspecified"),
            ("S82.001A", "Fracture of unspecified part of right patella, initial encounter"),
            ("S52.501A", "Fracture of lower end of right radius, initial encounter"),
            ("M79.602", "Right arm pain"),
            ("Z12.31", "Encounter for screening mammogram for malignant neoplasm of breast"),
            ("Z87.891", "Personal history of nicotine dependence"),
            ("E11.9", "Type 2 diabetes mellitus without complications"),
            ("I10", "Essential (primary) hypertension"),
            ("J18.9", "Pneumonia, unspecified organism"),
            ("N39.0", "Urinary tract infection, site not specified"),
            ("R33.9", "Retention of urine, unspecified"),
        ],
        "modifiers": [
            ("26", "Professional component"),
            ("TC", "Technical component"),
            ("59", "Distinct procedural service"),
            ("76", "Repeat procedure by same physician, same day"),
            ("77", "Repeat procedure by different physician"),
            ("51", "Multiple procedures"),
            ("74", "Discontinued procedure after anesthesia"),
            ("73", "Discontinued procedure at separate facility"),
            ("52", "Reduced services"),
            ("50", "Bilateral procedure"),
            ("LT", "Left side"),
            ("RT", "Right side"),
        ],
        "denial_reasons": [
            ("CO-4", "Procedure code inconsistent with modifier — missing 26/TC split"),
            ("CO-11", "Diagnosis does not support medical necessity for imaging study"),
            ("CO-50", "Non-covered services — routine imaging without clinical indication"),
            ("CO-97", "NCCI bundling edits — CT/MRI of same region bundled"),
            ("CO-16", "Missing clinical indication documentation"),
            ("CO-45", "Charges exceed fee schedule for radiology services"),
            ("CO-204", "Service not supported by diagnosis"),
            ("CO-252", "Attachment required — prior imaging results needed"),
            ("CO-167", "Diagnosis not covered under benefit plan"),
            ("CO-150", "Service not provided by in-network radiologist"),
        ],
        "doc_requirements": [
            "Clinical indication for imaging study (signs, symptoms, diagnosis)",
            "Complete imaging report with findings, measurements, and impression",
            "Comparison with prior imaging studies when available",
            "Radiologist attestation and signature",
            "Technique description and equipment used",
            "Contrast administration documentation (if applicable) including consent",
            "Documentation of medical necessity for advanced imaging (CT, MRI)",
            "Prior imaging results showing need for advanced modality",
        ],
        "prior_auth": [
            "MRI — prior auth required by most commercial payers and Medicare Advantage",
            "CT scan — prior auth may be required by managed care plans",
            "PET scan — prior auth universally required",
            "Nuclear medicine studies — prior auth commonly required",
            "Interventional radiology procedures — prior auth often required",
            "Screening mammography — no prior auth required for Medicare",
        ],
        "global_period": "0 days for all diagnostic radiology services. Global period does not apply to professional interpretation of imaging studies.",
        "ncci_edits": [
            "CT chest without contrast (71270) and with contrast (71260) — do not bill both on same day",
            "MRI brain without contrast (70551) and with contrast (70552) — bill 70553 if both performed",
            "X-ray and CT of same region — do not bill both without modifier 59",
            "Multiple X-ray views — bill comprehensive code, not individual views separately",
            "Ultrasound and CT of same region — do not bill both without clinical justification",
            "MRI with and without contrast — bill 70553, not separate codes for with and without",
        ],
        "lcd_ncd": [
            "NCD 220.2: MRI — must document clinical indication and prior conservative treatment",
            "LCD L37399: CT scan — must document clinical indication beyond routine screening",
            "NCD 220.1: Screening mammography — covered annually for women 40+",
            "LCD L34595: Advanced imaging — requires documentation of clinical need",
            "NCD 220.3: PET scan — must meet specific clinical criteria for coverage",
            "LCD L37500: Nuclear medicine — must document clinical indication and prior testing",
        ],
        "necessity_tips": [
            "Document specific clinical indication (symptoms, examination findings) for each imaging study",
            "Include comparison with prior imaging and clinical correlation in documentation",
            "For MRI, document failed conservative treatment and specific clinical question",
            "Reference ACR Appropriateness Criteria for imaging study selection",
            "Document clinical urgency for emergent imaging studies",
            "Include relevant lab results and physical examination findings supporting imaging order",
        ],
        "billing_tips": [
            "Use modifier 26 for professional interpretation and TC for technical component when split",
            "Bill comprehensive imaging codes (e.g., 70553) instead of separate with/without contrast codes",
            "Monitor NCCI edits for same-day imaging studies of same body region",
            "Use correct place of service codes for hospital outpatient vs freestanding facility",
            "Bill screening mammography with Z12.31 as primary diagnosis",
            "Separate E/M service same day as imaging requires modifier 25",
        ],
        "payer_rules": [
            "Medicare: LCD L37399 requires clinical indication for all advanced imaging",
            "Medicare: Screening mammography covered annually at no cost sharing",
            "Medicaid: Varies by state — some states require prior auth for MRI",
            "UHC: Requires prior auth for MRI, CT, and nuclear medicine studies",
            "Aetna: Follows ACR Appropriateness Criteria for imaging",
            "BCBS: May require prior auth for advanced imaging based on clinical indication",
            "Cigna: Documentation of clinical indication required for all non-emergent imaging",
        ],
        "examples": [
            {
                "title": "MRI Knee Without Contrast",
                "codes": "73721 (MRI lower extremity without contrast) + S83.211A (Tear medial meniscus, right knee)",
                "modifiers": "-RT (Right knee), -26 for professional component",
                "notes": "Patient with right knee pain after sports injury. Physical exam suggests meniscus tear. MRI ordered to confirm diagnosis before surgical planning. Results show medial meniscus tear and mild effusion.",
            },
            {
                "title": "CT Chest with Contrast for Pulmonary Embolism",
                "codes": "71260 (CT chest with contrast) + R06.02 (Shortness of breath) + I26.99 (Other pulmonary embolism)",
                "modifiers": "-26 for professional interpretation",
                "notes": "Patient with acute shortness of breath and elevated D-dimer. CT pulmonary angiography performed emergently. Results show segmental pulmonary embolism. Anticoagulation initiated.",
            },
            {
                "title": "Screening Mammography",
                "codes": "77067 (Screening mammography, bilateral) + Z12.31 (Screening for breast cancer)",
                "modifiers": "-59 if additional diagnostic mammogram same day",
                "notes": "52-year-old asymptomatic woman presents for annual screening mammogram. Bilateral 2D digital mammography performed. Results: BI-RADS 1 (negative). Follow-up in 12 months.",
            },
        ],
        "related_specialties": [
            ("Cardiology", "cardiology-cpt-codes.html"),
            ("Oncology", "oncology-cpt-codes.html"),
            ("Internal Medicine", "internal-medicine-cpt-codes.html"),
        ],
    },
    {
        "name": "Emergency Medicine",
        "slug": "emergency-medicine",
        "icon": "🚑",
        "description": "Comprehensive emergency medicine billing guide with top CPT codes, ICD-10 diagnoses, modifiers, denial reasons, and billing tips for AR callers and medical coders.",
        "keywords": "emergency medicine CPT codes, emergency billing, ER E/M codes, trauma CPT, critical care billing",
        "top_cpt": [
            ("99281", "Emergency department visit, self-limited or minor problems", "$50-$120"),
            ("99282", "Emergency department visit, low to moderate complexity", "$80-$200"),
            ("99283", "Emergency department visit, moderate complexity", "$120-$300"),
            ("99284", "Emergency department visit, high complexity", "$200-$500"),
            ("99285", "Emergency department visit, high complexity, critical care", "$250-$700"),
            ("99291", "Critical care, first 30-74 minutes", "$200-$500"),
            ("99292", "Critical care, each additional 30 minutes", "$100-$250"),
            ("99293", "Critical care, first 30-74 minutes, patient age 0-1 year", "$250-$600"),
            ("99294", "Critical care, each additional 30 minutes, patient age 0-1 year", "$125-$300"),
            ("99213", "Office visit, established patient, low complexity", "$60-$120"),
            ("99214", "Office visit, established patient, moderate complexity", "$90-$200"),
            ("99215", "Office visit, established patient, high complexity", "$130-$300"),
            ("99221", "Initial hospital care, low complexity", "$100-$250"),
            ("99222", "Initial hospital care, moderate complexity", "$150-$350"),
            ("99223", "Initial hospital care, high complexity", "$200-$500"),
            ("99231", "Subsequent hospital care, low complexity", "$50-$120"),
            ("99232", "Subsequent hospital care, moderate complexity", "$80-$200"),
            ("99233", "Subsequent hospital care, high complexity", "$110-$270"),
            ("99280", "Emergency department visit, self-limited or minor problems", "$40-$100"),
            ("36415", "Venipuncture (collection of venous blood)", "$5-$15"),
            ("3125F", "Pulse oximetry", "$5-$15"),
            ("94660", "Continuous positive airway pressure (CPAP) therapy", "$20-$50"),
            ("93005", "ECG, 12-lead, recording only", "$5-$15"),
            ("94002", "Administration of nebulizer for diagnostic or therapeutic purposes", "$15-$35"),
            ("94640", "Pressurized or non-pressurized inhalation treatment", "$10-$25"),
            ("71046", "Chest X-ray, 2 views", "$15-$40"),
            ("73030", "Shoulder X-ray, 3 views", "$25-$60"),
            ("70496", "CT head without contrast", "$150-$400"),
            ("74177", "CT abdomen and pelvis with contrast", "$250-$600"),
            ("99172", "Visual acuity screening", "$5-$15"),
        ],
        "icd10": [
            ("R07.9", "Chest pain, unspecified"),
            ("R51.9", "Headache, unspecified"),
            ("R10.9", "Unspecified abdominal pain"),
            ("R06.02", "Shortness of breath"),
            ("R55", "Syncope (fainting)"),
            ("R56.0", "Convulsions, not elsewhere classified"),
            ("S06.0X0A", "Concussion without loss of consciousness, initial encounter"),
            ("S72.001A", "Fracture of neck of right femur, initial encounter"),
            ("S82.001A", "Fracture of right patella, initial encounter"),
            ("T78.2XXA", "Anaphylactic shock, initial encounter"),
            ("J18.9", "Pneumonia, unspecified organism"),
            ("I21.4", "Acute NSTEMI myocardial infarction"),
            ("I63.9", "Cerebral infarction, unspecified"),
            ("K35.80", "Acute appendicitis without peritonitis"),
            ("N39.0", "Urinary tract infection"),
            ("E11.65", "Type 2 diabetes with hyperglycemia"),
            ("J44.1", "COPD with acute exacerbation"),
            ("I50.9", "Heart failure, unspecified"),
            ("K80.20", "Calculus of gallbladder without cholecystitis"),
            ("M54.5", "Low back pain"),
        ],
        "modifiers": [
            ("25", "Significant, separately identifiable E/M service"),
            ("59", "Distinct procedural service"),
            ("51", "Multiple procedures"),
            ("76", "Repeat procedure by same physician, same day"),
            ("22", "Increased procedural services"),
            ("26", "Professional component"),
            ("TC", "Technical component"),
            ("78", "Return to OR for related procedure during global period"),
            ("24", "Unrelated E/M service during postoperative period"),
            ("57", "Decision for surgery"),
        ],
        "denial_reasons": [
            ("CO-4", "Procedure code inconsistent with modifier — E/M level too high for documented complexity"),
            ("CO-11", "Diagnosis does not support medical necessity for ED visit"),
            ("CO-50", "Non-covered services — minor problem treated in ED setting"),
            ("CO-97", "NCCI bundling edits — E/M bundled with procedure"),
            ("CO-16", "Missing documentation — insufficient E/M documentation for billed level"),
            ("CO-45", "Charges exceed fee schedule"),
            ("CO-204", "Service not supported by diagnosis"),
            ("CO-252", "Attachment required — medical records needed for review"),
            ("CO-167", "Diagnosis not covered under benefit plan"),
            ("CO-18", "Duplicate claim"),
        ],
        "doc_requirements": [
            "Complete history including HPI, ROS, and medical history",
            "Physical examination findings with organ system documentation",
            "Medical decision-making complexity documented (number of diagnoses, data reviewed, risk)",
            "Time-based documentation for critical care (start and stop times)",
            "Nursing notes and vital signs",
            "Physician orders and treatment documentation",
            "Disposition and discharge instructions",
            "Follow-up plan and return precautions",
            "Informed consent for procedures",
            "Documentation of medical necessity for ED utilization",
        ],
        "prior_auth": [
            "Emergency visits — no prior auth required for true emergencies under EMTALA",
            "Observation stays — prior auth may be required by some payers",
            "Admission to hospital — utilization review required for Medicare",
            "Advanced imaging in ED — prior auth generally not required for emergent imaging",
            "Procedures in ED — prior auth generally not required for emergent procedures",
        ],
        "global_period": "0 days for ED E/M visits. 0 days for critical care services. Global period applies to procedures performed in ED (e.g., laceration repair).",
        "ncci_edits": [
            "ED visit (99281-99285) bundled with minor procedures performed same day",
            "Critical care (99291) should not be billed with concurrent E/M on same date",
            "Venipuncture (36415) bundled with ED visit — do not separately bill",
            "ECG (93005) bundled with ED visit interpretation — do not separately bill",
            "Nebulizer treatment (94002) bundled with ED visit — do not separately bill",
            "X-ray interpretation bundled with ED visit — bill with modifier 26/TC split",
        ],
        "lcd_ncd": [
            "LCD L34700: ED visit — must document clinical findings supporting ED-level care",
            "NCD 280.1: Observation services — must meet criteria for observation status",
            "LCD L36760: Critical care — must document time-based critical care activities",
            "LCD L37562: Advanced imaging in ED — must document clinical urgency",
            "NCD 20.1: Ambulance services — must document medical necessity for transport",
            "LCD L34696: Hospital admission — must meet criteria for inpatient status",
        ],
        "necessity_tips": [
            "Document the clinical urgency and acuity of the patient's condition",
            "Include specific physical examination findings supporting the E/M level billed",
            "Document medical decision-making complexity (diagnoses, data reviewed, risk)",
            "For critical care, document specific time spent on critical care activities",
            "Include disposition rationale (discharge, observation, admission) in documentation",
            "Document why ED-level care was required versus office-based evaluation",
        ],
        "billing_tips": [
            "Bill E/M based on medical decision-making complexity or total time",
            "Use modifier 25 for significant separately identifiable E/M on same day as procedure",
            "Document critical care time with specific start and stop times",
            "Bill critical care (99291) for first 30-74 minutes, then 99292 for each additional 30 minutes",
            "Separate facility and professional billing for ED services",
            "Monitor E/M level distribution — outlier patterns attract audit attention",
        ],
        "payer_rules": [
            "Medicare: EMTALA requires screening and stabilization regardless of ability to pay",
            "Medicare: Observation services require utilization review and documentation",
            "Medicaid: Covers ED visits for emergencies — may require prior auth for non-emergent visits",
            "UHC: May require retrospective review for ED visits billed at high E/M levels",
            "Aetna: Follows ACEP guidelines for ED E/M coding",
            "BCBS: May require peer-to-peer review for high-acuity ED visits",
            "Cigna: Documentation of clinical acuity required for high-level E/M billing",
        ],
        "examples": [
            {
                "title": "ED Visit for Chest Pain — High Complexity",
                "codes": "99285 (ED visit, high complexity) + R07.9 (Chest pain)",
                "modifiers": "-25 if procedure performed same day",
                "notes": "58-year-old male presents with acute chest pain, diaphoresis, and shortness of breath. ECG shows ST depression. Troponin elevated. NSTEMI diagnosed. Admitted to cardiology. Critical care documentation included.",
            },
            {
                "title": "ED Visit for Laceration Repair",
                "codes": "99283 (ED visit, moderate complexity) + 12002 (Repair of laceration, scalp) + S01.01XA (Laceration of scalp)",
                "modifiers": "-59 for separate procedure",
                "notes": "32-year-old male with 4cm scalp laceration from fall. Wound explored, irrigated, and repaired with staples. Tetanus updated. Discharge instructions provided with wound care and return precautions.",
            },
            {
                "title": "Critical Care for Sepsis",
                "codes": "99291 (Critical care, first 30-74 min) + A41.9 (Sepsis, unspecified organism) + R65.20 (Severe sepsis without septic shock)",
                "modifiers": "-22 if extended critical care time documented",
                "notes": "68-year-old female with sepsis from UTI. Septic shock requiring vasopressors. Critical care activities documented from 14:00-17:30 (210 minutes). Fluid resuscitation, antibiotics, and vasopressor management provided.",
            },
        ],
        "related_specialties": [
            ("Internal Medicine", "internal-medicine-cpt-codes.html"),
            ("Cardiology", "cardiology-cpt-codes.html"),
            ("General Surgery", "general-surgery-cpt-codes.html"),
        ],
    },
]

def make_page(s):
    html = f'''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6JRMMNNR40"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-6JRMMNNR40');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{s["name"]} CPT Codes & Billing Guide | RCM Denials</title>
  <meta name="description" content="{s["description"]}" />
  <meta name="keywords" content="{s["keywords"]}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://rcmdenials.com/specialties/{s["slug"]}-cpt-codes.html" />
  <meta property="og:title" content="{s["name"]} CPT Codes & Billing Guide | RCM Denials" />
  <meta property="og:description" content="Comprehensive {s["name"].lower()} billing guide with CPT codes, denial resolution, and billing tips." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://rcmdenials.com/specialties/{s["slug"]}-cpt-codes.html" />
  <meta property="og:image" content="https://rcmdenials.com/og-image.png" />
  <meta property="og:site_name" content="RCM Denials" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{s["name"]} CPT Codes & Billing Guide" />
  <meta name="twitter:description" content="Comprehensive {s["name"].lower()} billing guide with CPT codes and billing tips." />
  <meta name="twitter:image" content="https://rcmdenials.com/og-image.png" />
  <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
  <link rel="stylesheet" href="../styles.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{s["name"]} CPT Codes & Billing Guide | RCM Denials",
    "description": "{s["description"]}",
    "author": {{"@type": "Organization", "name": "RCM Denials"}},
    "publisher": {{"@type": "Organization", "name": "RCM Denials", "logo": {{"@type": "ImageObject", "url": "https://rcmdenials.com/favicon.png"}}}},
    "mainEntityOfPage": {{"@type": "WebPage", "@id": "https://rcmdenials.com/specialties/{s["slug"]}-cpt-codes.html"}},
    "datePublished": "2026-06-26",
    "dateModified": "2026-06-26"
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://rcmdenials.com/"}},
      {{"@type": "ListItem", "position": 2, "name": "Specialties", "item": "https://rcmdenials.com/specialties/index.html"}},
      {{"@type": "ListItem", "position": 3, "name": "{s["name"]}", "item": "https://rcmdenials.com/specialties/{s["slug"]}-cpt-codes.html"}}
    ]
  }}
  </script>
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>
<div class="static-page">
  <header class="static-header">
    <div class="static-header-content">
      <a class="logo" href="../index.html">
        <div class="logo-icon">🏥</div>
        <span class="logo-text">RCM <span>Denials</span></span>
      </a>
      <nav class="static-nav">
        <a href="../index.html">Home</a>
        <a href="../denial-codes/index.html">Denial Codes</a>
        <a href="index.html" class="active">Specialties</a>
        <a href="../about.html">About</a>
        <a href="../faq.html">FAQ</a>
        <a href="../contact.html">Contact</a>
      </nav>
    </div>
  </header>
  <main class="static-main" id="main-content">
    <article class="denial-code-article">
      <div class="breadcrumb">
        <a href="../index.html">Home</a> / <a href="index.html">Specialties</a> / <span>{s["name"]}</span>
      </div>
      <header class="article-header">
        <div class="denial-code-badge">{s["icon"]} {s["name"]}</div>
        <h1>{s["name"]} CPT Codes & Billing Guide</h1>
        <p class="article-meta">Last Updated: June 2026 | Category: {s["name"]} | 25+ CPT Codes</p>
      </header>
      <div class="article-content">
        <section class="denial-section">
          <h2>📋 Overview</h2>
          <div class="info-box">
            <p>This comprehensive <strong>{s["name"].lower()}</strong> billing guide provides medical coders and AR callers with the most frequently used CPT codes, ICD-10 diagnosis codes, modifiers, denial resolution strategies, and specialty-specific billing tips. Use this resource to reduce claim denials and improve revenue cycle management for {s["name"].lower()} practices.</p>
          </div>
        </section>

        <section class="denial-section">
          <h2>📝 Table of Contents</h2>
          <div class="info-box">
            <ul>
              <li><a href="#top-cpt" style="color:var(--brand-400)">Top {s["name"]} CPT Codes</a></li>
              <li><a href="#icd10" style="color:var(--brand-400)">Common ICD-10 Diagnosis Codes</a></li>
              <li><a href="#modifiers" style="color:var(--brand-400)">Frequently Used Modifiers</a></li>
              <li><a href="#denials" style="color:var(--brand-400)">Common Denial Reasons</a></li>
              <li><a href="#documentation" style="color:var(--brand-400)">Documentation Requirements</a></li>
              <li><a href="#prior-auth" style="color:var(--brand-400)">Prior Authorization Requirements</a></li>
              <li><a href="#global" style="color:var(--brand-400)">Global Surgery Period</a></li>
              <li><a href="#ncci" style="color:var(--brand-400)">NCCI Edit Information</a></li>
              <li><a href="#lcd" style="color:var(--brand-400)">LCD/NCD Coverage Notes</a></li>
              <li><a href="#necessity" style="color:var(--brand-400)">Medical Necessity Tips</a></li>
              <li><a href="#billing" style="color:var(--brand-400)">Billing Guidelines</a></li>
              <li><a href="#payer" style="color:var(--brand-400)">Common Payer-Specific Rules</a></li>
              <li><a href="#examples" style="color:var(--brand-400)">Example Claim Scenarios</a></li>
            </ul>
          </div>
        </section>

        <section class="denial-section" id="top-cpt">
          <h2>📋 Top {s["name"]} CPT Codes</h2>
          <p>The following are the most frequently used CPT codes in {s["name"].lower()} practice.</p>
          <div class="info-box" style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead><tr style="border-bottom:2px solid var(--border);">
                <th style="padding:10px 12px;text-align:left;color:var(--text-muted);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">CPT Code</th>
                <th style="padding:10px 12px;text-align:left;color:var(--text-muted);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Description</th>
                <th style="padding:10px 12px;text-align:left;color:var(--text-muted);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Reimbursement</th>
              </tr></thead>
              <tbody>
'''
    for code, desc, reimb in s['top_cpt']:
        html += f'                <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 12px;font-family:var(--font-mono);font-weight:600;color:var(--brand-400);">{code}</td><td style="padding:8px 12px;color:var(--text-secondary);">{desc}</td><td style="padding:8px 12px;color:var(--green-400);font-family:var(--font-mono);font-weight:600;">{reimb}</td></tr>\n'
    html += '''              </tbody>
            </table>
          </div>
        </section>

        <section class="denial-section" id="icd10">
          <h2>🔍 Common ICD-10 Diagnosis Codes</h2>
          <p>Frequently paired ICD-10 codes for ''' + s["name"].lower() + ''' claims.</p>
          <div class="info-box" style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead><tr style="border-bottom:2px solid var(--border);">
                <th style="padding:10px 12px;text-align:left;color:var(--text-muted);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">ICD-10</th>
                <th style="padding:10px 12px;text-align:left;color:var(--text-muted);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.5px;">Description</th>
              </tr></thead>
              <tbody>
'''
    for code, desc in s['icd10']:
        html += f'                <tr style="border-bottom:1px solid var(--border);"><td style="padding:8px 12px;font-family:var(--font-mono);font-weight:600;color:var(--brand-400);">{code}</td><td style="padding:8px 12px;color:var(--text-secondary);">{desc}</td></tr>\n'
    html += '''              </tbody>
            </table>
          </div>
        </section>

        <section class="denial-section" id="modifiers">
          <h2>🔧 Frequently Used Modifiers</h2>
          <div class="causes-grid">
'''
    for mod, desc in s['modifiers']:
        html += f'            <div class="cause-card"><div class="cause-icon">🏷️</div><h3>Modifier {mod}</h3><p style="font-size:13px;color:var(--text-secondary);margin:0;">{desc}</p></div>\n'
    html += '''          </div>
        </section>

        <section class="denial-section" id="denials">
          <h2>❌ Common Denial Reasons</h2>
          <div class="causes-grid">
'''
    for code, desc in s['denial_reasons']:
        html += f'            <div class="cause-card"><div class="cause-icon">⚠️</div><h3>{code}</h3><p style="font-size:13px;color:var(--text-secondary);margin:0;">{desc}</p></div>\n'
    html += '''          </div>
        </section>

        <section class="denial-section" id="documentation">
          <h2>📄 Documentation Requirements</h2>
          <div class="prevention-box"><ul class="prevention-list">
'''
    for req in s['doc_requirements']:
        html += f'            <li><strong>✓</strong> {req}</li>\n'
    html += '''          </ul></div>
        </section>

        <section class="denial-section" id="prior-auth">
          <h2>📋 Prior Authorization Requirements</h2>
          <div class="causes-grid">
'''
    for i, auth in enumerate(s['prior_auth'], 1):
        html += f'            <div class="cause-card"><div class="cause-icon">{i}</div><h3>Requires Auth</h3><p style="font-size:13px;color:var(--text-secondary);margin:0;">{auth}</p></div>\n'
    html += '''          </div>
        </section>

        <section class="denial-section" id="global">
          <h2>⏱️ Global Surgery Period</h2>
          <div class="info-box"><p><strong>Global Period Rules:</strong></p><p>''' + s["global_period"] + '''</p></div>
        </section>

        <section class="denial-section" id="ncci">
          <h2>📦 NCCI Edit Information</h2>
          <div class="causes-grid">
'''
    for edit in s['ncci_edits']:
        html += f'            <div class="cause-card"><div class="cause-icon">📦</div><h3>NCCI Edit</h3><p style="font-size:13px;color:var(--text-secondary);margin:0;">{edit}</p></div>\n'
    html += '''          </div>
        </section>

        <section class="denial-section" id="lcd">
          <h2>📋 LCD/NCD Coverage Notes</h2>
          <div class="causes-grid">
'''
    for lcd in s['lcd_ncd']:
        html += f'            <div class="cause-card"><div class="cause-icon">📋</div><h3>Coverage Policy</h3><p style="font-size:13px;color:var(--text-secondary);margin:0;">{lcd}</p></div>\n'
    html += '''          </div>
        </section>

        <section class="denial-section" id="necessity">
          <h2>💡 Medical Necessity Tips</h2>
          <div class="prevention-box"><ul class="prevention-list">
'''
    for tip in s['necessity_tips']:
        html += f'            <li><strong>✓</strong> {tip}</li>\n'
    html += '''          </ul></div>
        </section>

        <section class="denial-section" id="billing">
          <h2>📝 Billing Guidelines</h2>
          <div class="prevention-box"><ul class="prevention-list">
'''
    for tip in s['billing_tips']:
        html += f'            <li><strong>✓</strong> {tip}</li>\n'
    html += '''          </ul></div>
        </section>

        <section class="denial-section" id="payer">
          <h2>🏢 Common Payer-Specific Rules</h2>
          <div class="causes-grid">
'''
    for payer in s['payer_rules']:
        html += f'            <div class="cause-card"><div class="cause-icon">🏢</div><h3>Payer Rule</h3><p style="font-size:13px;color:var(--text-secondary);margin:0;">{payer}</p></div>\n'
    html += '''          </div>
        </section>

        <section class="denial-section" id="examples">
          <h2>📊 Example Claim Scenarios</h2>
          <div class="causes-grid">
'''
    for ex in s['examples']:
        html += f'            <div class="example-card"><h4>{ex["title"]}</h4><p><strong>CPT + ICD-10:</strong> {ex["codes"]}</p><p><strong>Modifiers:</strong> {ex["modifiers"]}</p><p><strong>Notes:</strong> {ex["notes"]}</p></div>\n'
    html += '''          </div>
        </section>

        <section class="denial-section">
          <h2>🔗 Related Resources</h2>
          <div class="related-codes-grid">
            <a href="index.html" class="related-code-card"><div class="related-code-num">All Specialties</div><div class="related-code-desc">Browse all 20 medical specialty billing guides</div></a>
            <a href="../denial-codes/index.html" class="related-code-card"><div class="related-code-num">Denial Codes</div><div class="related-code-desc">Complete directory of CO, PR, and OA denial codes</div></a>
          </div>
        </section>

        <section class="denial-section cta-section">
          <h2>🚀 Reduce Claim Denials</h2>
          <div class="cta-box">
            <p>RCM Denials helps ''' + s["name"].lower() + ''' practices identify denial patterns and prevent revenue loss.</p>
            <div class="cta-buttons">
              <a href="../index.html" class="btn btn-primary">Try RCM Denials Free</a>
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
<script src="../nav-enhancement.js" defer></script>
</body>
</html>'''
    return html


if __name__ == '__main__':
    outdir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'specialties')
    os.makedirs(outdir, exist_ok=True)
    for s in SPECIALTIES:
        fname = os.path.join(outdir, f"{s['slug']}-cpt-codes.html")
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(make_page(s))
        print(f"Created {fname}")
    print("Done! Generated 5 specialty pages.")
