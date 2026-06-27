#!/usr/bin/env python3
"""
Generate denial code HTML pages, index cards, and data.js entries.
Run: python generate_denial_codes.py
"""

import os
import json
from datetime import datetime

DENIAL_CODES_DIR = os.path.join(os.path.dirname(__file__), "denial-codes")
TODAY = datetime.now().strftime("%Y-%m-%d")
MONTH_YEAR = datetime.now().strftime("%B %Y")

# ─── EXISTING CODES (do not recreate) ────────────────────────
EXISTING_PAGES = {
    "CO-2", "CO-4", "CO-11", "CO-12", "CO-16", "CO-18", "CO-22", "CO-23",
    "CO-27", "CO-29", "CO-31", "CO-45", "CO-50", "CO-56", "CO-57", "CO-90",
    "CO-97", "CO-119", "CO-130", "CO-146", "CO-150", "CO-167", "CO-170",
    "CO-182", "CO-197", "CO-204", "CO-252", "CO-253", "CO-341", "CO-343",
    "PR-1", "PR-2", "PR-3", "PR-4", "PR-5", "PR-6", "PR-7", "PR-17",
    "PR-96", "PR-97", "PR-98", "PR-99", "PR-204",
    "OA-18", "OA-23",
}

# ─── ALL NEW CODES TO GENERATE ──────────────────────────────
CODES = [
    # ═══ CO CODES ═══
    {
        "code": "CO-1", "title": "Deductible Amount", "category": "CO", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR", "Front Desk"],
        "desc": "The deductible amount has been applied to this claim. The patient is responsible for the deductible before insurance pays.",
        "causes": [
            "Patient has not met annual deductible",
            "Deductible applies to the specific service billed",
            "Deductible reset at plan year beginning",
            "Services applied to wrong patient deductible",
        ],
        "fix": [
            "Verify patient's current deductible status with payer",
            "Confirm deductible applies to the specific CPT/ICD codes billed",
            "Apply patient responsibility correctly in billing system",
            "If deductible was met, resubmit with proof of met deductible",
        ],
        "prevention": [
            "Verify deductible status before every claim submission",
            "Track cumulative deductible amounts per patient per year",
            "Educate patients on their deductible responsibility",
            "Check for family deductible vs individual deductible",
        ],
        "related": ["CO-2", "CO-3", "PR-1"],
    },
    {
        "code": "CO-3", "title": "Coinsurance Amount", "category": "CO", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR", "Front Desk"],
        "desc": "The coinsurance amount has been applied. The patient is responsible for a percentage of the allowed amount.",
        "causes": [
            "Patient plan requires coinsurance payment (e.g., 20% of allowed amount)",
            "Coinsurance applies after deductible is met",
            "Different coinsurance rates for in-network vs out-of-network",
            "Service-specific coinsurance rules apply",
        ],
        "fix": [
            "Calculate the correct coinsurance percentage per the patient's plan",
            "Apply patient responsibility for the coinsurance amount",
            "Verify in-network vs out-of-network coinsurance rates",
            "If coinsurance calculation is wrong, appeal with plan documents",
        ],
        "prevention": [
            "Verify coinsurance percentages before claim submission",
            "Track in-network vs out-of-network rates for each patient",
            "Apply correct coinsurance based on service type",
            "Educate patients on their coinsurance responsibility",
        ],
        "related": ["CO-1", "CO-2", "PR-2"],
    },
    {
        "code": "CO-5", "title": "The Fee Schedule Limit", "category": "CO", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR", "Coding"],
        "desc": "The billed charge exceeds the fee schedule or maximum allowable amount. Payment is based on the fee schedule limit.",
        "causes": [
            "Billed amount exceeds payer's fee schedule",
            "Contractual rate is lower than billed charge",
            "Medicare/Medicaid fee schedule applies",
            "Out-of-network provider not contracted with payer",
        ],
        "fix": [
            "Review the payer's fee schedule for the specific CPT code",
            "Verify contractual allowable amount",
            "Adjust patient responsibility to reflect fee schedule difference",
            "If you believe the fee schedule is wrong, appeal with supporting documentation",
        ],
        "prevention": [
            "Know each payer's fee schedule before billing",
            "Use fee schedule verification tools",
            "Contract with payers for fair reimbursement rates",
            "Monitor fee schedule updates annually",
        ],
        "related": ["CO-45", "CO-119", "CO-130"],
    },
    {
        "code": "CO-6", "title": "Code-Level Agreed Price", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment is based on a code-level agreed price or contracted rate between the provider and payer.",
        "causes": [
            "Provider has a contracted rate with the payer for this code",
            "Bundled payment arrangement applies",
            "Code-specific pricing agreement in effect",
            "Capitated or set-fee arrangement",
        ],
        "fix": [
            "Review the contracted rate for the specific code",
            "Verify the agreed price is correctly applied",
            "If rate is incorrect, review the provider-payer contract",
            "Adjust billing to reflect the agreed price",
        ],
        "prevention": [
            "Maintain current fee schedules for all contracted payers",
            "Review contract terms annually",
            "Track agreed prices per code per payer",
            "Train billing staff on contracted rates",
        ],
        "related": ["CO-5", "CO-45"],
    },
    {
        "code": "CO-7", "title": "The Benefit for This Service", "category": "CO", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Coverage",
        "departments": ["AR", "Eligibility", "Front Desk"],
        "desc": "The benefit for this service is included in the payment for another service that has already been adjudicated.",
        "causes": [
            "Service is bundled with another already-paid service",
            "Benefit already exhausted for this service type",
            "Global period includes this service",
            "Bundled payment covers this service",
        ],
        "fix": [
            "Identify which service the benefit was included in",
            "Verify the global period or bundling rules",
            "If incorrect bundling, appeal with clinical documentation",
            "Resubmit as a corrected claim if appropriate",
        ],
        "prevention": [
            "Check global period before submitting related procedures",
            "Verify bundling rules for procedure combinations",
            "Review NCCI edits before claim submission",
            "Track benefit exhaustion per patient per service type",
        ],
        "related": ["CO-97", "CO-236"],
    },
    {
        "code": "CO-8", "title": "Duplicate Claim/Service", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Duplicate Claim",
        "departments": ["Billing", "AR", "Charge Entry"],
        "desc": "This claim or service has been previously submitted and processed. It is a duplicate of a claim already on file.",
        "causes": [
            "Same claim submitted twice by mistake",
            "Billing system automatically resubmitted",
            "Different date of service but same CPT codes",
            "Correction claim submitted without proper identifier",
        ],
        "fix": [
            "Check if the original claim was processed correctly",
            "If original was correct, no action needed on duplicate",
            "If correction is needed, submit as a corrected claim with modifier 76/77 or appropriate indicator",
            "Void the duplicate if submitted in error",
        ],
        "prevention": [
            "Track all submitted claims in a tracking system",
            "Check claim status before resubmitting",
            "Use unique identifiers for each claim submission",
            "Set up edit checks to prevent duplicate submissions",
        ],
        "related": ["CO-23", "CO-182"],
    },
    {
        "code": "CO-9", "title": "The Claim/Service Has Been Denied", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Coding",
        "departments": ["Coding", "AR", "Billing"],
        "desc": "The claim or service has been denied because it does not meet the payer's criteria for coverage or medical necessity.",
        "causes": [
            "Service does not meet medical necessity criteria",
            "Diagnosis does not support the procedure",
            "Service not covered under patient's plan",
            "Missing or insufficient clinical documentation",
        ],
        "fix": [
            "Review the specific denial reason on the remittance advice",
            "Verify medical necessity criteria for the service",
            "Gather supporting clinical documentation",
            "Appeal with additional medical records if appropriate",
        ],
        "prevention": [
            "Verify medical necessity before claim submission",
            "Use clinical decision support tools",
            "Document medical necessity thoroughly in the patient record",
            "Review payer coverage policies regularly",
        ],
        "related": ["CO-50", "CO-227"],
    },
    {
        "code": "CO-10", "title": "The Claim/Service Denied", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coding",
        "departments": ["Coding", "AR", "Billing"],
        "desc": "The claim or service has been denied due to a coding or billing error that needs correction.",
        "causes": [
            "Invalid procedure code submitted",
            "Incorrect diagnosis code",
            "Mismatched procedure and diagnosis",
            "Coding edits triggered",
        ],
        "fix": [
            "Review the denied claim for coding errors",
            "Correct the procedure or diagnosis code",
            "Verify code validity for the date of service",
            "Resubmit the corrected claim",
        ],
        "prevention": [
            "Perform pre-submission coding audits",
            "Use coding validation software",
            "Train coders on annual code updates",
            "Implement edit checks in the billing system",
        ],
        "related": ["CO-4", "CO-11", "CO-16"],
    },
    {
        "code": "CO-15", "title": "Authorization/precertification Not Obtained", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Authorization",
        "departments": ["Authorization", "AR", "Front Desk"],
        "desc": "The required authorization or precertification was not obtained before the service was rendered.",
        "causes": [
            "Prior authorization was required but not obtained",
            "Authorization expired before service date",
            "Wrong procedure code on the authorization",
            "Authorization obtained for wrong date of service",
        ],
        "fix": [
            "Check if retro-authorization is available",
            "Obtain authorization and resubmit claim",
            "If retro-auth is not available, appeal with clinical justification",
            "Verify authorization requirements for the specific service",
        ],
        "prevention": [
            "Verify authorization requirements before scheduling",
            "Track authorization expiration dates",
            "Implement authorization tracking system",
            "Train front desk staff on authorization requirements",
        ],
        "related": ["CO-197", "CO-198"],
    },
    {
        "code": "CO-24", "title": "Payment Adjusted Due to Charges", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the charges have been paid by another payer or source.",
        "causes": [
            "Coordination of benefits adjustment",
            "Secondary insurance payment applied",
            "Workers compensation or liability payment",
            "Medicare Secondary Payer (MSP) adjustment",
        ],
        "fix": [
            "Verify the primary payer's payment",
            "Confirm coordination of benefits is correct",
            "Submit to secondary payer if applicable",
            "If adjustment is incorrect, appeal with COB documentation",
        ],
        "prevention": [
            "Verify all insurance coverage before billing",
            "Check coordination of benefits",
            "Submit claims to correct payer first",
            "Track all payments across payers",
        ],
        "related": ["CO-22", "CO-23"],
    },
    {
        "code": "CO-26", "title": "Payment Adjusted Because Expenses", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim expenses have been previously paid by another source.",
        "causes": [
            "Expenses covered by another payer",
            "Coordination of benefits adjustment",
            "Duplicate payment prevention",
            "Multiple coverage coordination",
        ],
        "fix": [
            "Verify primary payer payment amount",
            "Submit claim to secondary payer with primary EOB",
            "If adjustment is incorrect, appeal with supporting documentation",
        ],
        "prevention": [
            "Check all coverage sources before billing",
            "Coordinate benefits between payers",
            "Track all payments systematically",
        ],
        "related": ["CO-22", "CO-24"],
    },
    {
        "code": "CO-51", "title": "Exceeds Maximum allowable", "category": "CO", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "The claim amount exceeds the maximum allowable for the service under the patient's plan.",
        "causes": [
            "Billed amount exceeds plan maximum",
            "Out-of-network charges exceed allowed amount",
            "Plan has specific maximum reimbursement limits",
            "Fee schedule maximum reached",
        ],
        "fix": [
            "Review the plan's maximum allowable for the service",
            "Adjust patient responsibility to reflect the excess",
            "If you believe the maximum is wrong, appeal with contract review",
        ],
        "prevention": [
            "Know each plan's maximum allowable amounts",
            "Verify reimbursement limits before billing",
            "Contract for fair maximum rates",
        ],
        "related": ["CO-5", "CO-45"],
    },
    {
        "code": "CO-54", "title": "The Clia Certification", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Provider",
        "departments": ["Credentialing", "AR", "Coding"],
        "desc": "The CLIA (Clinical Laboratory Improvement Amendments) certification number is missing or invalid for the laboratory service billed.",
        "causes": [
            "CLIA number not included on claim",
            "CLIA number is expired",
            "CLIA number does not match the performing lab",
            "Lab service billed without required CLIA certificate",
        ],
        "fix": [
            "Verify the correct CLIA number for the laboratory",
            "Update the CLIA number on the claim",
            "Resubmit with valid CLIA certification",
            "If CLIA is expired, obtain renewed certification",
        ],
        "prevention": [
            "Maintain current CLIA certification on file",
            "Include CLIA number on all lab claims",
            "Track CLIA expiration dates",
            "Verify CLIA before each lab claim submission",
        ],
        "related": ["CO-182", "CO-252"],
    },
    {
        "code": "CO-55", "title": "Claim/Service Requires", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Documentation",
        "departments": ["Medical Records", "AR", "Coding"],
        "desc": "The claim or service requires a different or additional information to process the claim.",
        "causes": [
            "Missing or incomplete clinical documentation",
            "Additional records requested by payer",
            "Clarification needed on the claim",
            "Supporting documentation not submitted",
        ],
        "fix": [
            "Review the denial for specific documentation requests",
            "Gather and submit the required documentation",
            "Respond to payer request within the specified timeframe",
            "If documentation is already submitted, resubmit with proper reference",
        ],
        "prevention": [
            "Submit complete documentation with initial claim",
            "Use documentation checklists for common services",
            "Respond to payer requests promptly",
            "Maintain organized medical records",
        ],
        "related": ["CO-16", "CO-182"],
    },
    {
        "code": "CO-58", "title": "Services Furnished to Patients", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coverage",
        "departments": ["Eligibility", "AR", "Front Desk"],
        "desc": "Services furnished to patients in a hospital outpatient setting are not covered under the physician fee schedule.",
        "causes": [
            "Service billed under wrong place of service",
            "Hospital outpatient facility rules apply",
            "Bundled into facility payment",
            "Wrong billing provider selected",
        ],
        "fix": [
            "Verify the correct place of service code",
            "Bill under the appropriate provider/facility",
            "Check if facility fee already covers the service",
            "Resubmit with correct place of service if applicable",
        ],
        "prevention": [
            "Use correct place of service codes",
            "Understand facility vs professional billing rules",
            "Verify bundling rules for outpatient services",
        ],
        "related": ["CO-45", "CO-59"],
    },
    {
        "code": "CO-59", "title": "Services Not Covered", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Coverage",
        "departments": ["Eligibility", "AR", "Billing"],
        "desc": "The services are not covered under the patient's current benefit plan or are excluded from coverage.",
        "causes": [
            "Service is excluded from patient's plan",
            "Benefit not available under current plan",
            "Service considered not medically necessary",
            "Plan limitations reached",
        ],
        "fix": [
            "Verify patient's current benefits and coverage",
            "Check if service is covered under the specific plan",
            "If coverage denial is incorrect, appeal with plan documentation",
            "Inform patient of out-of-pocket responsibility",
        ],
        "prevention": [
            "Verify coverage before every service",
            "Check benefit exclusions and limitations",
            "Inform patients of potential non-coverage",
            "Use pre-authorization for questionable services",
        ],
        "related": ["CO-7", "CO-50"],
    },
    {
        "code": "CO-63", "title": "Services Not Provided", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coding",
        "departments": ["Coding", "AR", "Billing"],
        "desc": "The services have not been shown to be necessary or proper for the diagnosis or treatment.",
        "causes": [
            "Service not supported by diagnosis",
            "Service not medically necessary",
            "Clinical documentation insufficient",
            "Treatment protocol not followed",
        ],
        "fix": [
            "Review clinical documentation for medical necessity",
            "Provide additional clinical justification",
            "Appeal with peer-to-peer review if appropriate",
            "Correct diagnosis code if it doesn't match the service",
        ],
        "prevention": [
            "Document medical necessity thoroughly",
            "Use evidence-based clinical guidelines",
            "Verify diagnosis supports the procedure",
            "Implement clinical review before claim submission",
        ],
        "related": ["CO-50", "CO-9"],
    },
    {
        "code": "CO-70", "title": "The Billed Charges", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "The billed charges exceed the allowed amount. Payment is based on the allowed amount per the fee schedule or contract.",
        "causes": [
            "Billed charges higher than fee schedule allowed",
            "Contractual adjustment required",
            "Out-of-network provider charges",
            "Balance billing restrictions apply",
        ],
        "fix": [
            "Review the allowed amount for the service",
            "Apply contractual adjustment",
            "If you believe the allowed amount is wrong, review the contract",
            "Balance bill patient only if permitted by law",
        ],
        "prevention": [
            "Know each payer's allowed amounts",
            "Contract for appropriate reimbursement rates",
            "Understand balance billing restrictions",
            "Track allowed amounts per payer per code",
        ],
        "related": ["CO-5", "CO-45"],
    },
    {
        "code": "CO-109", "title": "Claim/Service Cannot Be Identified", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Billing",
        "departments": ["Billing", "AR", "Charge Entry"],
        "desc": "The claim or service cannot be identified by the payer's system. The claim may have been submitted with incorrect identifiers.",
        "causes": [
            "Incorrect patient identifying information",
            "Wrong member ID or subscriber ID",
            "Claim submitted to wrong payer",
            "Invalid NPI or Tax ID on the claim",
        ],
        "fix": [
            "Verify patient demographic information",
            "Confirm the correct payer and plan",
            "Validate NPI and Tax ID numbers",
            "Resubmit with corrected identifying information",
        ],
        "prevention": [
            "Verify patient demographics at every visit",
            "Confirm insurance eligibility before billing",
            "Use clean claim editing software",
            "Double-check NPI and Tax ID on every claim",
        ],
        "related": ["CO-110", "CO-16"],
    },
    {
        "code": "CO-110", "title": "Claim/Service Adjusted", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Billing",
        "departments": ["Billing", "AR"],
        "desc": "The claim or service has been adjusted because the billing information is not as submitted or needs correction.",
        "causes": [
            "Billing information contains errors",
            "Claim submitted with incorrect codes",
            "Modifiers missing or incorrect",
            "Diagnosis code mismatch",
        ],
        "fix": [
            "Review the remittance advice for specific corrections needed",
            "Correct the billing errors identified",
            "Resubmit the claim with accurate information",
            "Verify all claim fields before resubmission",
        ],
        "prevention": [
            "Implement pre-submission claim scrubbing",
            "Use clean claim editing tools",
            "Train billing staff on common errors",
            "Audit claims regularly for accuracy",
        ],
        "related": ["CO-109", "CO-16"],
    },
    {
        "code": "CO-129", "title": "Payment Adjusted Due to", "category": "CO", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted due to the amount being applied to the patient's cost-sharing obligations.",
        "causes": [
            "Patient deductible applied",
            "Coinsurance applied",
            "Copay applied",
            "Cost-sharing arrangement in effect",
        ],
        "fix": [
            "Verify the correct patient responsibility amount",
            "Confirm cost-sharing is correctly calculated",
            "If adjustment is wrong, appeal with plan documents",
        ],
        "prevention": [
            "Verify patient cost-sharing before billing",
            "Calculate deductible, coinsurance, and copay correctly",
            "Track patient cost-sharing across services",
        ],
        "related": ["CO-1", "CO-3", "PR-1"],
    },
    {
        "code": "CO-151", "title": "The Claim/Service", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coding",
        "departments": ["Coding", "AR", "Billing"],
        "desc": "The claim or service has been denied because the diagnosis code is not valid for the date of service.",
        "causes": [
            "Diagnosis code not valid for the date of service",
            "ICD code has been deleted or replaced",
            "Diagnosis code requires additional specificity",
            "Code not recognized by the payer",
        ],
        "fix": [
            "Verify the diagnosis code is valid for the date of service",
            "Update to the current version of the ICD code",
            "Add required specificity to the diagnosis code",
            "Resubmit with the corrected diagnosis",
        ],
        "prevention": [
            "Use current ICD-10 code sets",
            "Update coding systems annually",
            "Validate diagnosis codes before submission",
            "Track code deletions and replacements",
        ],
        "related": ["CO-11", "CO-167"],
    },
    {
        "code": "CO-181", "title": "Payment Adjusted Because", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the procedure code and modifier combination is not recognized for payment.",
        "causes": [
            "Invalid CPT/modifier combination",
            "Modifier not applicable to the procedure",
            "Code not recognized by the payer",
            "Billing error in code selection",
        ],
        "fix": [
            "Review the CPT/modifier combination for validity",
            "Remove or change the inappropriate modifier",
            "Use the correct procedure code for the service",
            "Resubmit with corrected coding",
        ],
        "prevention": [
            "Validate CPT/modifier combinations before submission",
            "Use coding reference tools",
            "Train staff on valid code combinations",
            "Implement edit checks for common errors",
        ],
        "related": ["CO-4", "CO-182"],
    },
    {
        "code": "CO-210", "title": "Payment Adjusted Because", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the service is not payable under the patient's current benefit plan.",
        "causes": [
            "Service not covered under the plan",
            "Benefit limitation reached",
            "Service excluded from coverage",
            "Plan does not cover this type of service",
        ],
        "fix": [
            "Verify the patient's benefit plan coverage",
            "Check if alternative billing is available",
            "Inform patient of non-coverage status",
            "If denial is incorrect, appeal with plan documentation",
        ],
        "prevention": [
            "Verify coverage before providing services",
            "Check benefit exclusions and limitations",
            "Use pre-authorization for coverage verification",
            "Inform patients of potential non-coverage",
        ],
        "related": ["CO-59", "CO-7"],
    },
    {
        "code": "CO-225", "title": "Payment Denied/Adjusted", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coding",
        "departments": ["Coding", "AR", "Billing"],
        "desc": "The claim or service has been denied or adjusted because the ICD and CPT/HCPCS codes are inconsistent.",
        "causes": [
            "Diagnosis does not support the procedure",
            "ICD/CPT combination not recognized",
            "Medical necessity not established",
            "Mismatched code pair",
        ],
        "fix": [
            "Review the ICD/CPT code combination",
            "Verify medical necessity for the service",
            "Correct the diagnosis or procedure code",
            "Resubmit with consistent coding",
        ],
        "prevention": [
            "Validate ICD/CPT combinations before submission",
            "Use clinical decision support tools",
            "Train coders on code pairing rules",
            "Implement automated code validation",
        ],
        "related": ["CO-11", "CO-227"],
    },
    {
        "code": "CO-230", "title": "Payment Adjusted Because", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim does not meet the requirements for the billing rules applied.",
        "causes": [
            "Claim does not meet billing rules",
            "Incorrect place of service",
            "Wrong provider type for the service",
            "Billing format not accepted",
        ],
        "fix": [
            "Review the specific billing rule that was not met",
            "Correct the claim to meet billing requirements",
            "Resubmit with proper billing format",
            "Verify provider type matches the service",
        ],
        "prevention": [
            "Know each payer's billing rules",
            "Use claim editing software",
            "Train staff on billing requirements",
            "Audit claims for rule compliance",
        ],
        "related": ["CO-16", "CO-110"],
    },
    {
        "code": "CO-232", "title": "Claim/Service Denied", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coding",
        "departments": ["Coding", "AR", "Billing"],
        "desc": "The claim or service has been denied because the procedure code is inconsistent with the modifier used.",
        "causes": [
            "Modifier not valid for the procedure",
            "Incorrect modifier selection",
            "Modifier combination invalid",
            "Modifier sequencing error",
        ],
        "fix": [
            "Review the modifier used for the procedure",
            "Remove or change the inappropriate modifier",
            "Verify modifier guidelines for the CPT code",
            "Resubmit with correct modifier",
        ],
        "prevention": [
            "Validate modifiers before claim submission",
            "Use modifier validation tools",
            "Train staff on modifier rules",
            "Implement modifier edit checks",
        ],
        "related": ["CO-4", "CO-181"],
    },
    {
        "code": "CO-297", "title": "The Claim Was Denied", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Timely Filing",
        "departments": ["AR", "Billing"],
        "desc": "The claim was denied because it was not submitted within the payer's timely filing deadline.",
        "causes": [
            "Claim submitted after filing deadline",
            "Late submission without good cause",
            "Filing deadline exceeded",
            "No proof of timely submission",
        ],
        "fix": [
            "Gather proof of timely filing (electronic confirmation, paper receipt)",
            "Appeal with proof of timely submission",
            "If no proof exists, request good cause exception",
            "Document the filing timeline",
        ],
        "prevention": [
            "Submit claims promptly after service",
            "Track filing deadlines per payer",
            "Maintain proof of all claim submissions",
            "Set up filing deadline alerts",
        ],
        "related": ["CO-204", "CO-341"],
    },
    {
        "code": "CO-300", "title": "Payment Denied", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coverage",
        "departments": ["Eligibility", "AR", "Front Desk"],
        "desc": "The claim has been denied because the patient's coverage was not effective on the date of service.",
        "causes": [
            "Insurance coverage lapsed on the date of service",
            "Patient's eligibility was not verified",
            "Coverage terminated before the service date",
            "Wrong effective date used",
        ],
        "fix": [
            "Verify the patient's coverage on the date of service",
            "If coverage was active, appeal with proof of eligibility",
            "If coverage lapsed, submit to correct payer or patient",
            "Update eligibility verification processes",
        ],
        "prevention": [
            "Verify eligibility before every visit",
            "Check coverage effective dates",
            "Use real-time eligibility verification",
            "Re-verify eligibility at check-in",
        ],
        "related": ["CO-4", "CO-18"],
    },
    {
        "code": "CO-331", "title": "Claim Denied", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Timely Filing",
        "departments": ["AR", "Billing"],
        "desc": "The claim has been denied because the appeal was not submitted within the required appeal timeframe.",
        "causes": [
            "Appeal deadline missed",
            "Late appeal submission",
            "No documentation of appeal timeframe",
            "Appeal not filed timely",
        ],
        "fix": [
            "Check if the appeal deadline can be extended",
            "Gather proof of timely appeal submission",
            "If deadline was met, appeal the denial with proof",
            "Request good cause exception if applicable",
        ],
        "prevention": [
            "Track all appeal deadlines in a calendar",
            "Set up reminders for appeal submissions",
            "Document all appeal submissions with proof",
            "Train staff on appeal timeframe requirements",
        ],
        "related": ["CO-297", "CO-341"],
    },
    {
        "code": "CO-340", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim does not meet the criteria for the billing code used.",
        "causes": [
            "Wrong code billed for the service",
            "Code does not meet billing criteria",
            "Incorrect code selection",
            "Service does not match the code",
        ],
        "fix": [
            "Review the billing criteria for the code used",
            "Select the correct code for the service",
            "Resubmit with the appropriate code",
            "Verify code descriptions match the service",
        ],
        "prevention": [
            "Verify code criteria before billing",
            "Use code lookup tools",
            "Train staff on correct code selection",
            "Audit code usage regularly",
        ],
        "related": ["CO-16", "CO-110"],
    },
    {
        "code": "CO-342", "title": "Services Not Covered", "category": "CO", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coverage",
        "departments": ["Eligibility", "AR", "Billing"],
        "desc": "The services are not covered because they are considered experimental, investigational, or cosmetic.",
        "causes": [
            "Service deemed experimental or investigational",
            "Cosmetic procedure not covered",
            "Service not approved by the payer",
            "Off-label use of device or drug",
        ],
        "fix": [
            "Check the payer's policy on the specific service",
            "Gather clinical evidence supporting the service",
            "Appeal with peer-reviewed literature if appropriate",
            "Consider patient financial responsibility",
        ],
        "prevention": [
            "Verify coverage for experimental/investigational services",
            "Check payer policies on cosmetic procedures",
            "Inform patients of potential non-coverage",
            "Use pre-authorization for coverage verification",
        ],
        "related": ["CO-59", "CO-210"],
    },
    {
        "code": "CO-349", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim was not properly coded or does not meet billing requirements.",
        "causes": [
            "Claim not properly coded",
            "Billing requirements not met",
            "Incorrect claim format",
            "Missing required fields",
        ],
        "fix": [
            "Review the specific billing requirement that was not met",
            "Correct the coding or billing information",
            "Resubmit with proper formatting",
            "Verify all required fields are complete",
        ],
        "prevention": [
            "Use claim editing software",
            "Verify billing requirements before submission",
            "Train staff on proper claim formatting",
            "Audit claims for completeness",
        ],
        "related": ["CO-16", "CO-230"],
    },
    {
        "code": "CO-351", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim does not meet the criteria for the benefit requested.",
        "causes": [
            "Benefit criteria not met",
            "Service does not qualify for the benefit",
            "Benefit limitation reached",
            "Wrong benefit category",
        ],
        "fix": [
            "Review the benefit criteria for the service",
            "Verify the service qualifies for the benefit",
            "If criteria are met, appeal with supporting documentation",
        ],
        "prevention": [
            "Verify benefit criteria before billing",
            "Check benefit limitations",
            "Use pre-authorization for benefit verification",
            "Train staff on benefit criteria",
        ],
        "related": ["CO-7", "CO-59"],
    },
    {
        "code": "CO-357", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the service was not provided in accordance with applicable healthcare regulations.",
        "causes": [
            "Service not compliant with regulations",
            "Regulatory requirements not met",
            "Documentation does not meet standards",
            "Service outside scope of practice",
        ],
        "fix": [
            "Review the regulatory requirement that was not met",
            "Ensure compliance with applicable regulations",
            "Resubmit with proper documentation",
            "Verify provider scope of practice",
        ],
        "prevention": [
            "Stay updated on healthcare regulations",
            "Train staff on regulatory compliance",
            "Implement compliance monitoring",
            "Audit services for regulatory compliance",
        ],
        "related": ["CO-349", "CO-342"],
    },
    {
        "code": "CO-360", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim was not submitted with the required documentation.",
        "causes": [
            "Required documentation not submitted",
            "Incomplete claim submission",
            "Missing supporting records",
            "Documentation not attached",
        ],
        "fix": [
            "Identify the required documentation",
            "Gather and submit the missing documentation",
            "Resubmit the claim with complete documentation",
        ],
        "prevention": [
            "Submit complete documentation with initial claim",
            "Use documentation checklists",
            "Train staff on documentation requirements",
            "Audit claims for completeness",
        ],
        "related": ["CO-55", "CO-16"],
    },
    {
        "code": "CO-362", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim or service does not meet the payer's coverage criteria.",
        "causes": [
            "Coverage criteria not met",
            "Service not covered under the plan",
            "Benefit limitation reached",
            "Service excluded from coverage",
        ],
        "fix": [
            "Review the payer's coverage criteria",
            "If criteria are met, appeal with supporting documentation",
            "If criteria are not met, inform patient of responsibility",
        ],
        "prevention": [
            "Verify coverage criteria before billing",
            "Use pre-authorization for coverage verification",
            "Inform patients of coverage limitations",
            "Track coverage changes",
        ],
        "related": ["CO-59", "CO-342"],
    },
    {
        "code": "CO-365", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim does not meet the requirements for the service billed.",
        "causes": [
            "Service requirements not met",
            "Claim does not meet service criteria",
            "Incorrect service code",
            "Service not authorized",
        ],
        "fix": [
            "Review the service requirements",
            "Verify the claim meets all requirements",
            "Correct any deficiencies",
            "Resubmit with proper documentation",
        ],
        "prevention": [
            "Verify service requirements before billing",
            "Use pre-authorization",
            "Train staff on service criteria",
            "Audit claims for compliance",
        ],
        "related": ["CO-349", "CO-360"],
    },
    {
        "code": "CO-367", "title": "Payment Adjusted", "category": "CO", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment has been adjusted because the claim was submitted after the allowed filing period.",
        "causes": [
            "Claim filed late",
            "Filing deadline exceeded",
            "Late submission without exception",
            "No proof of timely filing",
        ],
        "fix": [
            "Gather proof of timely filing",
            "Appeal with proof if available",
            "Request good cause exception",
        ],
        "prevention": [
            "Submit claims promptly",
            "Track filing deadlines",
            "Maintain proof of submissions",
        ],
        "related": ["CO-297", "CO-331"],
    },
    {
        "code": "CO-167", "title": "Claim/Service Denied", "category": "CO", "priority": "High",
        "correctable": "Correctable", "category_tag": "Coding",
        "departments": ["Coding", "AR", "Billing"],
        "desc": "The claim or service has been denied because the diagnosis code does not meet the payer's criteria for the procedure.",
        "causes": [
            "Diagnosis code not supported by clinical documentation",
            "Diagnosis lacks specificity for the procedure",
            "ICD code mismatched with CPT code",
            "Clinical indication not documented",
        ],
        "fix": [
            "Review the diagnosis code for accuracy and specificity",
            "Verify the diagnosis supports the procedure medically",
            "Update the diagnosis code if a more specific code applies",
            "Resubmit with corrected diagnosis-procedure pairing",
        ],
        "prevention": [
            "Use the most specific ICD-10 code available",
            "Validate ICD/CPT combinations before submission",
            "Ensure clinical documentation supports the diagnosis",
            "Implement automated diagnosis-procedure validation",
        ],
        "related": ["CO-11", "CO-225"],
    },

    # ═══ PR CODES ═══
    {
        "code": "PR-22", "title": "This Care May Be Covered", "category": "PR", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Front Desk", "Eligibility", "Billing"],
        "desc": "This care may be covered by another payer. Coordination of benefits may apply.",
        "causes": [
            "Patient has multiple insurance plans",
            "Secondary insurance may cover this service",
            "Coordination of benefits needed",
            "Primary insurance denied, secondary may cover",
        ],
        "fix": [
            "Verify all patient insurance coverage",
            "Submit claim to secondary payer with primary EOB",
            "Coordinate benefits between payers",
            "If no other coverage exists, patient responsibility applies",
        ],
        "prevention": [
            "Verify all insurance coverage at registration",
            "Check coordination of benefits",
            "Submit claims to correct payer order",
            "Track all payer responses",
        ],
        "related": ["PR-23", "CO-22"],
    },
    {
        "code": "PR-23", "title": "Payment Adjusted", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim was denied by the primary payer. Patient responsible for remaining balance.",
        "causes": [
            "Primary payer denied the claim",
            "Patient responsibility after primary denial",
            "Secondary payer applies primary denial rules",
            "Patient's primary coverage issue",
        ],
        "fix": [
            "Resolve the primary payer denial first",
            "If primary is correct, patient responsibility applies",
            "Submit corrected claim to primary if appropriate",
            "Appeal primary denial if warranted",
        ],
        "prevention": [
            "Resolve primary denials promptly",
            "Verify primary coverage before secondary billing",
            "Track primary payer responses",
        ],
        "related": ["PR-22", "CO-22"],
    },
    {
        "code": "PR-24", "title": "Patient Responsibility", "category": "PR", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR", "Front Desk"],
        "desc": "The patient is responsible for the charges after insurance payment. This includes copays, coinsurance, or deductible amounts.",
        "causes": [
            "Patient has copay responsibility",
            "Coinsurance amount due from patient",
            "Deductible not yet met",
            "Service not fully covered by insurance",
        ],
        "fix": [
            "Bill patient for the remaining balance",
            "Set up payment plan if needed",
            "Send patient statement with itemized charges",
            "Verify patient responsibility amount is correct",
        ],
        "prevention": [
            "Collect copays at time of service",
            "Verify patient responsibility before visit",
            "Inform patients of potential out-of-pocket costs",
            "Use payment collection tools",
        ],
        "related": ["PR-1", "PR-3"],
    },
    {
        "code": "PR-26", "title": "Patient Responsibility", "category": "PR", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "The patient is responsible for the cost of the service. Insurance has applied the patient's cost-sharing obligations.",
        "causes": [
            "Deductible applied to patient",
            "Coinsurance responsibility",
            "Copay amount due",
            "Service subject to patient cost-sharing",
        ],
        "fix": [
            "Verify the patient responsibility amount",
            "Send statement to patient for payment",
            "Set up payment arrangement if needed",
        ],
        "prevention": [
            "Collect patient responsibility at time of service",
            "Verify cost-sharing before visit",
            "Inform patients of financial obligations",
        ],
        "related": ["PR-24", "CO-1"],
    },
    {
        "code": "PR-27", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "The patient is responsible for charges after the allowed amount has been paid by insurance.",
        "causes": [
            "Balance after insurance payment",
            "Excess charges above allowed amount",
            "Patient cost-sharing obligations",
            "Non-covered service charges",
        ],
        "fix": [
            "Bill patient for the remaining balance",
            "Verify the charges are correct",
            "Send patient statement",
        ],
        "prevention": [
            "Inform patients of potential balance billing",
            "Verify coverage before service",
            "Collect patient responsibility estimates",
        ],
        "related": ["PR-24", "PR-26"],
    },
    {
        "code": "PR-31", "title": "Patient Responsibility", "category": "PR", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR", "Front Desk"],
        "desc": "The patient is responsible for the denied claim amount. Insurance has determined the service is not covered.",
        "causes": [
            "Service denied by insurance",
            "Non-covered service billed to patient",
            "Patient's plan does not cover this service",
            "Coverage exclusion applies",
        ],
        "fix": [
            "Verify the denial reason",
            "If denial is incorrect, appeal with documentation",
            "If denial is correct, bill patient for services",
            "Set up payment plan if needed",
        ],
        "prevention": [
            "Verify coverage before providing services",
            "Inform patients of coverage limitations",
            "Use pre-authorization for questionable services",
        ],
        "related": ["PR-24", "CO-59"],
    },
    {
        "code": "PR-32", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "The patient is responsible for the service charges. The claim has been processed and patient cost-sharing applies.",
        "causes": [
            "Patient cost-sharing applies",
            "Deductible, coinsurance, or copay due",
            "Service covered but patient responsibility remains",
        ],
        "fix": [
            "Bill patient for the applicable amount",
            "Send patient statement with payment options",
        ],
        "prevention": [
            "Collect patient responsibility at time of service",
            "Verify cost-sharing amounts before visit",
        ],
        "related": ["PR-24", "PR-26"],
    },
    {
        "code": "PR-33", "title": "Co-payment Amount", "category": "PR", "priority": "Medium",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Front Desk", "Billing", "AR"],
        "desc": "The copayment amount is due from the patient. This is the fixed amount the patient pays at the time of service.",
        "causes": [
            "Copay not collected at time of service",
            "Copay amount applies to the service",
            "Patient owes copay for office visit",
            "Specialist copay applies",
        ],
        "fix": [
            "Bill patient for the copay amount",
            "Collect copay at next visit if possible",
            "Send patient statement for copay",
        ],
        "prevention": [
            "Collect copay at time of service",
            "Verify copay amount before visit",
            "Train front desk on copay collection",
            "Implement copay collection policies",
        ],
        "related": ["PR-1", "PR-24"],
    },
    {
        "code": "PR-36", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "The patient is responsible for charges related to services not covered by their insurance plan.",
        "causes": [
            "Non-covered service charges",
            "Patient opted for non-covered service",
            "Service excluded from plan",
            "Elective procedure not covered",
        ],
        "fix": [
            "Bill patient for non-covered services",
            "Verify patient was informed of non-coverage",
            "Set up payment arrangement",
        ],
        "prevention": [
            "Inform patients of non-covered services before treatment",
            "Obtain patient acknowledgment of financial responsibility",
            "Verify coverage before providing services",
        ],
        "related": ["PR-31", "CO-59"],
    },
    {
        "code": "PR-39", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "The patient is responsible for charges that exceed the allowed amount under their insurance plan.",
        "causes": [
            "Charges exceed allowed amount",
            "Patient responsible for excess",
            "Out-of-network charges",
            "Balance billing applies",
        ],
        "fix": [
            "Bill patient for the excess amount",
            "Verify balance billing is permitted",
            "Send patient statement",
        ],
        "prevention": [
            "Verify allowed amounts before billing",
            "Inform patients of potential balance billing",
            "Use in-network providers when possible",
        ],
        "related": ["PR-27", "CO-45"],
    },
    {
        "code": "PR-40", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient responsibility for charges after insurance adjudication. The balance is due from the patient.",
        "causes": [
            "Remaining balance after insurance payment",
            "Patient cost-sharing obligations",
            "Service partially covered",
        ],
        "fix": [
            "Bill patient for the remaining balance",
            "Send patient statement with payment options",
        ],
        "prevention": [
            "Estimate patient responsibility before visit",
            "Collect cost-sharing at time of service",
        ],
        "related": ["PR-24", "PR-32"],
    },
    {
        "code": "PR-41", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient responsible for charges related to a service that was denied or not covered.",
        "causes": [
            "Service denied by payer",
            "Non-covered service",
            "Patient elected non-covered service",
        ],
        "fix": [
            "Bill patient for the denied charges",
            "Verify denial was appropriate",
            "Set up payment arrangement",
        ],
        "prevention": [
            "Verify coverage before service",
            "Inform patients of non-coverage",
        ],
        "related": ["PR-31", "PR-36"],
    },
    {
        "code": "PR-42", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the coverage limit has been reached.",
        "causes": [
            "Coverage limit exceeded",
            "Benefit maximum reached",
            "Annual or lifetime limit applied",
        ],
        "fix": [
            "Bill patient for charges beyond the limit",
            "Verify the coverage limit with the payer",
        ],
        "prevention": [
            "Track patient benefit utilization",
            "Inform patients of coverage limits",
        ],
        "related": ["PR-31", "CO-7"],
    },
    {
        "code": "PR-45", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges due to a service not meeting medical necessity criteria.",
        "causes": [
            "Service deemed not medically necessary",
            "Patient elected non-necessary service",
            "Coverage denied for medical necessity",
        ],
        "fix": [
            "Bill patient if they elected the service",
            "Appeal if medical necessity can be demonstrated",
        ],
        "prevention": [
            "Verify medical necessity before service",
            "Document clinical justification",
        ],
        "related": ["PR-31", "CO-50"],
    },
    {
        "code": "PR-49", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges related to services rendered by a non-participating provider.",
        "causes": [
            "Non-participating provider rendered service",
            "Out-of-network charges",
            "Patient chose non-network provider",
        ],
        "fix": [
            "Bill patient for the non-network charges",
            "Verify if any network benefits apply",
        ],
        "prevention": [
            "Inform patients about network status",
            "Use participating providers when possible",
        ],
        "related": ["PR-39", "CO-45"],
    },
    {
        "code": "PR-50", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service is not a covered benefit under their plan.",
        "causes": [
            "Service not covered under plan",
            "Benefit exclusion applies",
            "Elective procedure not covered",
        ],
        "fix": [
            "Bill patient for non-covered services",
            "Verify the patient was informed",
        ],
        "prevention": [
            "Verify benefits before service",
            "Inform patients of exclusions",
        ],
        "related": ["PR-36", "CO-59"],
    },
    {
        "code": "PR-51", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service was provided during a waiting period.",
        "causes": [
            "Service during plan waiting period",
            "Coverage not yet effective",
            "New employee waiting period",
        ],
        "fix": [
            "Bill patient for services during waiting period",
            "Verify coverage effective dates",
        ],
        "prevention": [
            "Verify coverage effective dates before service",
            "Inform patients of waiting periods",
        ],
        "related": ["PR-31", "CO-300"],
    },
    {
        "code": "PR-52", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges related to a service that was not authorized or referred.",
        "causes": [
            "Service not authorized",
            "No referral obtained",
            "Patient self-referred to specialist",
        ],
        "fix": [
            "Bill patient for unauthorized services",
            "Obtain retro-authorization if possible",
        ],
        "prevention": [
            "Verify authorization requirements",
            "Obtain referrals before specialist visits",
        ],
        "related": ["PR-31", "CO-15"],
    },
    {
        "code": "PR-53", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service was provided outside the coverage area.",
        "causes": [
            "Service outside coverage area",
            "Geographic restriction applies",
            "Travel outside plan area",
        ],
        "fix": [
            "Bill patient for out-of-area services",
            "Verify if emergency exception applies",
        ],
        "prevention": [
            "Verify coverage area before service",
            "Inform patients of geographic restrictions",
        ],
        "related": ["PR-31", "PR-53"],
    },
    {
        "code": "PR-54", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service exceeds the plan's benefit limit.",
        "causes": [
            "Benefit limit exceeded",
            "Service count limit reached",
            "Frequency limit exceeded",
        ],
        "fix": [
            "Bill patient for services beyond the limit",
            "Verify the benefit limit with the payer",
        ],
        "prevention": [
            "Track benefit utilization",
            "Inform patients of limits",
        ],
        "related": ["PR-42", "CO-7"],
    },
    {
        "code": "PR-55", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service was provided by an excluded provider.",
        "causes": [
            "Provider excluded from network",
            "Sanctioned provider",
            "Terminated provider contract",
        ],
        "fix": [
            "Bill patient for services from excluded provider",
            "Verify provider network status",
        ],
        "prevention": [
            "Verify provider network status before referral",
            "Check provider exclusion lists",
        ],
        "related": ["PR-49", "PR-31"],
    },
    {
        "code": "PR-56", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service was not medically necessary as determined by the payer.",
        "causes": [
            "Payer determined service not medically necessary",
            "Clinical criteria not met",
            "Service not supported by diagnosis",
        ],
        "fix": [
            "Bill patient if they elected the service",
            "Appeal with additional clinical documentation",
        ],
        "prevention": [
            "Document medical necessity thoroughly",
            "Use clinical decision support tools",
        ],
        "related": ["PR-45", "CO-50"],
    },
    {
        "code": "PR-59", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service was provided during a period of non-coverage.",
        "causes": [
            "Service during non-coverage period",
            "Coverage gap applied",
            "Service between plan effective dates",
        ],
        "fix": [
            "Bill patient for non-covered period charges",
            "Verify coverage dates",
        ],
        "prevention": [
            "Verify coverage dates before service",
            "Inform patients of coverage gaps",
        ],
        "related": ["PR-31", "CO-300"],
    },
    {
        "code": "PR-66", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for charges where the service was provided by an out-of-network provider without authorization.",
        "causes": [
            "Out-of-network service without authorization",
            "Non-emergency out-of-network service",
            "Patient chose non-network provider",
        ],
        "fix": [
            "Bill patient for non-network charges",
            "Verify if network exception applies",
        ],
        "prevention": [
            "Verify provider network status",
            "Obtain authorization for out-of-network services",
        ],
        "related": ["PR-49", "PR-52"],
    },
    {
        "code": "PR-119", "title": "Patient Responsibility", "category": "PR", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Patient Responsibility",
        "departments": ["Billing", "AR"],
        "desc": "Patient is responsible for the benefit limit for this service. The plan's maximum benefit has been reached.",
        "causes": [
            "Benefit limit reached for the service",
            "Maximum benefit applied",
            "Service exceeds plan allowance",
        ],
        "fix": [
            "Bill patient for charges beyond the benefit limit",
            "Verify the benefit limit with the payer",
        ],
        "prevention": [
            "Track benefit utilization per patient",
            "Inform patients of benefit limits",
        ],
        "related": ["PR-42", "PR-54"],
    },

    # ═══ OA CODES ═══
    {
        "code": "OA-24", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the charges have been paid by another payer or source. Coordination of benefits applies.",
        "causes": [
            "Another payer has already paid",
            "Coordination of benefits adjustment",
            "Workers compensation payment applied",
            "Liability insurance payment applied",
        ],
        "fix": [
            "Verify primary payer payment",
            "Submit to correct secondary payer",
            "If adjustment is incorrect, appeal with COB documentation",
        ],
        "prevention": [
            "Check all insurance coverage before billing",
            "Coordinate benefits between payers",
            "Submit claims to correct payer order",
        ],
        "related": ["OA-23", "CO-22"],
    },
    {
        "code": "OA-26", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim expenses were previously paid by another source.",
        "causes": [
            "Duplicate payment prevention",
            "Expenses covered by another payer",
            "Coordination of benefits adjustment",
        ],
        "fix": [
            "Verify primary payer payment",
            "Submit to secondary payer with primary EOB",
        ],
        "prevention": [
            "Track all payer responses",
            "Coordinate benefits",
        ],
        "related": ["OA-23", "OA-24"],
    },
    {
        "code": "OA-27", "title": "Payment Denied", "category": "OA", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Coverage",
        "departments": ["Eligibility", "AR"],
        "desc": "Payment denied because the patient was not eligible for coverage on the date of service.",
        "causes": [
            "Patient eligibility not verified",
            "Coverage lapsed on date of service",
            "Wrong insurance plan billed",
            "Eligibility termination date passed",
        ],
        "fix": [
            "Verify patient eligibility on the date of service",
            "If eligible, appeal with proof of coverage",
            "If not eligible, bill correct payer or patient",
        ],
        "prevention": [
            "Verify eligibility before every visit",
            "Use real-time eligibility verification",
            "Re-verify at check-in",
        ],
        "related": ["OA-18", "CO-300"],
    },
    {
        "code": "OA-29", "title": "Timely Filing", "category": "OA", "priority": "High",
        "correctable": "Correctable", "category_tag": "Timely Filing",
        "departments": ["AR", "Billing"],
        "desc": "The claim was not submitted within the payer's timely filing deadline.",
        "causes": [
            "Claim filed after deadline",
            "Late submission without exception",
            "Filing deadline exceeded",
        ],
        "fix": [
            "Gather proof of timely filing",
            "Appeal with proof if available",
            "Request good cause exception",
        ],
        "prevention": [
            "Submit claims promptly",
            "Track filing deadlines",
            "Maintain proof of submissions",
        ],
        "related": ["CO-297", "CO-331"],
    },
    {
        "code": "OA-45", "title": "Fee Schedule Adjustment", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted based on the fee schedule or contracted rate. The billed amount exceeds the allowed amount.",
        "causes": [
            "Fee schedule applies",
            "Contracted rate lower than billed",
            "Maximum allowable reached",
        ],
        "fix": [
            "Review the fee schedule for the service",
            "Apply contractual adjustment",
        ],
        "prevention": [
            "Know payer fee schedules",
            "Contract for appropriate rates",
        ],
        "related": ["CO-5", "CO-45"],
    },
    {
        "code": "OA-94", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim was processed under a different plan or program.",
        "causes": [
            "Claim processed under wrong plan",
            "Different benefit program applies",
            "Plan migration or transition",
        ],
        "fix": [
            "Verify the correct plan for the date of service",
            "Resubmit to the correct plan if needed",
        ],
        "prevention": [
            "Verify plan information at each visit",
            "Track plan changes",
        ],
        "related": ["OA-18", "CO-300"],
    },
    {
        "code": "OA-96", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim does not meet the requirements for the benefit requested.",
        "causes": [
            "Benefit criteria not met",
            "Service does not qualify",
            "Benefit limitation reached",
        ],
        "fix": [
            "Review benefit criteria",
            "If criteria met, appeal with documentation",
        ],
        "prevention": [
            "Verify benefit criteria before billing",
            "Use pre-authorization",
        ],
        "related": ["OA-94", "CO-59"],
    },
    {
        "code": "OA-109", "title": "Claim Cannot Be Identified", "category": "OA", "priority": "High",
        "correctable": "Correctable", "category_tag": "Billing",
        "departments": ["Billing", "AR"],
        "desc": "The claim cannot be identified by the payer's system. The claim may have incorrect identifiers.",
        "causes": [
            "Incorrect patient information",
            "Wrong member ID",
            "Invalid provider identifiers",
        ],
        "fix": [
            "Verify patient demographics",
            "Confirm payer and plan information",
            "Resubmit with corrected identifiers",
        ],
        "prevention": [
            "Verify patient information at every visit",
            "Use clean claim editing",
        ],
        "related": ["OA-110", "CO-109"],
    },
    {
        "code": "OA-110", "title": "Claim Adjusted", "category": "OA", "priority": "Medium",
        "correctable": "Correctable", "category_tag": "Billing",
        "departments": ["Billing", "AR"],
        "desc": "The claim has been adjusted because billing information needs correction.",
        "causes": [
            "Billing errors detected",
            "Incorrect codes submitted",
            "Missing information",
        ],
        "fix": [
            "Review the remittance advice",
            "Correct the identified errors",
            "Resubmit the claim",
        ],
        "prevention": [
            "Use claim editing software",
            "Train billing staff",
            "Audit claims regularly",
        ],
        "related": ["OA-109", "CO-110"],
    },
    {
        "code": "OA-170", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the service is not payable under the current benefit plan.",
        "causes": [
            "Service not covered",
            "Benefit plan does not include this service",
            "Exclusion applies",
        ],
        "fix": [
            "Verify coverage for the service",
            "If covered, appeal with documentation",
        ],
        "prevention": [
            "Verify coverage before service",
            "Inform patients of exclusions",
        ],
        "related": ["OA-96", "CO-59"],
    },
    {
        "code": "OA-181", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the procedure code and modifier combination is not recognized.",
        "causes": [
            "Invalid code/modifier combination",
            "Modifier not applicable",
            "Coding error",
        ],
        "fix": [
            "Review the code/modifier combination",
            "Correct the coding",
            "Resubmit",
        ],
        "prevention": [
            "Validate code combinations before submission",
            "Use coding reference tools",
        ],
        "related": ["CO-181", "CO-4"],
    },
    {
        "code": "OA-182", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim does not meet the payer's specific requirements.",
        "causes": [
            "Payer-specific requirements not met",
            "Claim format not accepted",
            "Missing required fields",
        ],
        "fix": [
            "Review payer-specific requirements",
            "Correct the claim format",
            "Resubmit",
        ],
        "prevention": [
            "Know each payer's requirements",
            "Use payer-specific claim formats",
        ],
        "related": ["CO-230", "OA-110"],
    },
    {
        "code": "OA-190", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim was not submitted with the required documentation.",
        "causes": [
            "Missing documentation",
            "Incomplete claim",
            "Supporting records not submitted",
        ],
        "fix": [
            "Submit the required documentation",
            "Resubmit the claim",
        ],
        "prevention": [
            "Submit complete documentation",
            "Use documentation checklists",
        ],
        "related": ["CO-55", "CO-360"],
    },
    {
        "code": "OA-197", "title": "Payment Denied", "category": "OA", "priority": "High",
        "correctable": "Correctable", "category_tag": "Authorization",
        "departments": ["Authorization", "AR"],
        "desc": "Payment denied because the required prior authorization was not obtained.",
        "causes": [
            "Prior authorization not obtained",
            "Authorization expired",
            "Wrong procedure on authorization",
        ],
        "fix": [
            "Obtain retro-authorization if available",
            "Appeal with clinical justification",
        ],
        "prevention": [
            "Verify authorization requirements",
            "Track authorization dates",
        ],
        "related": ["CO-197", "CO-15"],
    },
    {
        "code": "OA-198", "title": "Payment Denied", "category": "OA", "priority": "High",
        "correctable": "Correctable", "category_tag": "Authorization",
        "departments": ["Authorization", "AR"],
        "desc": "Payment denied because the certification/recertification was not obtained.",
        "causes": [
            "Certification not obtained",
            "Recertification expired",
            "Home health certification missing",
        ],
        "fix": [
            "Obtain certification/recertification",
            "Appeal if certification was obtained",
        ],
        "prevention": [
            "Track certification dates",
            "Obtain certifications timely",
        ],
        "related": ["CO-198", "OA-197"],
    },
    {
        "code": "OA-204", "title": "Timely Filing", "category": "OA", "priority": "High",
        "correctable": "Correctable", "category_tag": "Timely Filing",
        "departments": ["AR", "Billing"],
        "desc": "The claim was not submitted within the required filing timeframe.",
        "causes": [
            "Filing deadline exceeded",
            "Late submission",
            "No proof of timely filing",
        ],
        "fix": [
            "Gather proof of timely filing",
            "Appeal with proof if available",
            "Request good cause exception",
        ],
        "prevention": [
            "Submit claims promptly",
            "Track filing deadlines",
        ],
        "related": ["CO-297", "OA-29"],
    },
    {
        "code": "OA-223", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim is for services related to a work-related injury covered by workers' compensation.",
        "causes": [
            "Workers' compensation applies",
            "Work-related injury",
            "Employer liability",
        ],
        "fix": [
            "Submit claim to workers' compensation carrier",
            "Verify workers' compensation coverage",
        ],
        "prevention": [
            "Determine if injury is work-related",
            "Verify workers' compensation coverage",
        ],
        "related": ["OA-234", "CO-24"],
    },
    {
        "code": "OA-234", "title": "Payment Adjusted", "category": "OA", "priority": "Low",
        "correctable": "Non-Correctable", "category_tag": "Payment Adjustment",
        "departments": ["Billing", "AR"],
        "desc": "Payment adjusted because the claim is for services related to a motor vehicle accident.",
        "causes": [
            "Motor vehicle accident coverage applies",
            "Auto insurance is primary",
            "No-fault insurance applies",
        ],
        "fix": [
            "Submit claim to auto insurance carrier",
            "Verify auto insurance coverage",
        ],
        "prevention": [
            "Determine if accident-related",
            "Verify auto insurance coverage",
        ],
        "related": ["OA-223", "CO-24"],
    },
]

# ─── HTML TEMPLATE ──────────────────────────────────────────
def slugify(code):
    return code.lower().replace("-", "-")

def make_page(code_data):
    code = code_data["code"]
    title = code_data["title"]
    category = code_data["category"]
    priority = code_data["priority"]
    correctable = code_data["correctable"]
    category_tag = code_data["category_tag"]
    departments = code_data["departments"]
    desc = code_data["desc"]
    causes = code_data["causes"]
    fix_steps = code_data["fix"]
    prevention = code_data["prevention"]
    related = code_data.get("related", [])

    slug = slugify(code)
    safe_title = title.replace('"', '&quot;')
    desc_escaped = desc.replace('"', '&quot;')

    causes_html = "\n".join(f'                <li>{c}</li>' for c in causes)
    fix_html = "\n".join(f'                  <li>{f}</li>' for f in fix_steps)
    prevention_html = "\n".join(f'              <li><strong>{p.split(":")[0]}:</strong>{":".join(p.split(":")[1:])}</li>' if ":" in p else f'              <li><strong>{p}</strong></li>' for p in prevention)

    related_html = ""
    if related:
        cards = []
        for r in related:
            r_slug = slugify(r)
            r_title_map = {
                "CO-1": "Deductible Amount", "CO-2": "COB Adjustment", "CO-3": "Coinsurance Amount",
                "CO-4": "Modifier Error", "CO-5": "Fee Schedule Limit", "CO-7": "Benefit Included",
                "CO-8": "Duplicate Claim", "CO-11": "Diagnosis Inconsistent", "CO-15": "Authorization Not Obtained",
                "CO-16": "Missing Information", "CO-18": "Eligibility Issue", "CO-22": "COB Issue",
                "CO-23": "COB Adjustment", "CO-24": "Paid by Another", "CO-27": "Coverage Terminated",
                "CO-29": "Timely Filing", "CO-31": "Patient Cannot Be Identified", "CO-45": "Fee Schedule Limit",
                "CO-50": "Medical Necessity", "CO-55": "Additional Info Needed", "CO-56": "Ineligible Services",
                "CO-57": "Service Not Provided", "CO-58": "Hospital Outpatient", "CO-59": "Services Not Covered",
                "CO-63": "Services Not Necessary", "CO-70": "Billed Charges Exceed", "CO-90": "Inpatient Not Approved",
                "CO-97": "Bundled Services", "CO-109": "Cannot Identify Claim", "CO-110": "Billing Info Incorrect",
                "CO-119": "Benefit Maximum Reached", "CO-129": "Cost Sharing Applied", "CO-130": "Claim Adjusted",
                "CO-146": "Service Not Authorized", "CO-150": "Notification Not Received",
                "CO-151": "Invalid Diagnosis", "CO-167": "Diagnosis Mismatch",
                "CO-170": "Payment Adjusted", "CO-181": "Invalid Code Combo", "CO-182": "No Documentation",
                "CO-197": "Auth Not Obtained", "CO-198": "Cert Not Obtained", "CO-204": "Timely Filing",
                "CO-210": "Not Payable", "CO-225": "ICD/CPT Inconsistent", "CO-230": "Billing Rules Not Met",
                "CO-232": "Modifier Inconsistent", "CO-236": "Bundled Services",
                "CO-240": "Routing Error", "CO-242": "Claim Not Timely",
                "CO-252": "Sequestration", "CO-253": "Sequestration",
                "CO-297": "Timely Filing", "CO-300": "Coverage Inactive",
                "CO-331": "Appeal Deadline", "CO-340": "Incorrect Code", "CO-341": "Timely Filing",
                "CO-342": "Not Covered", "CO-343": "Sequestration", "CO-349": "Billing Error",
                "CO-351": "Benefit Not Met", "CO-357": "Regulatory Non-Compliance",
                "CO-360": "Missing Documentation", "CO-362": "Not Covered", "CO-365": "Requirements Not Met",
                "CO-367": "Late Filing",
                "PR-1": "Deductible", "PR-2": "Coinsurance", "PR-3": "Copayment",
                "PR-4": "Coinsurance", "PR-5": "Copay", "PR-6": "Coinsurance",
                "PR-7": "Copay", "PR-17": "Coinsurance", "PR-22": "Other Coverage",
                "PR-23": "Primary Denied", "PR-24": "Patient Responsibility",
                "PR-26": "Patient Cost Share", "PR-27": "Balance After Insurance",
                "PR-31": "Non-Covered", "PR-32": "Patient Responsibility",
                "PR-33": "Copayment", "PR-36": "Non-Covered", "PR-39": "Excess Charges",
                "PR-40": "Balance Due", "PR-41": "Denied Service", "PR-42": "Limit Exceeded",
                "PR-45": "Not Medically Necessary", "PR-49": "Non-Participating",
                "PR-50": "Not Covered", "PR-51": "Waiting Period",
                "PR-52": "Not Authorized", "PR-53": "Out of Area",
                "PR-54": "Benefit Limit", "PR-55": "Excluded Provider",
                "PR-56": "Not Necessary", "PR-59": "Non-Coverage Period",
                "PR-66": "Non-Network", "PR-96": "Non-Covered Charges",
                "PR-97": "Payment Included", "PR-98": "Patient Responsibility",
                "PR-99": "Patient Responsibility", "PR-119": "Benefit Limit",
                "PR-204": "Timely Filing",
                "OA-18": "Eligibility Issue", "OA-23": "COB Adjustment",
                "OA-24": "Paid by Another", "OA-26": "Previously Paid",
                "OA-27": "Not Eligible", "OA-29": "Timely Filing",
                "OA-45": "Fee Schedule", "OA-94": "Different Plan",
                "OA-96": "Benefit Not Met", "OA-109": "Cannot Identify",
                "OA-110": "Billing Error", "OA-170": "Not Payable",
                "OA-181": "Invalid Code", "OA-182": "Requirements Not Met",
                "OA-190": "Missing Documentation", "OA-197": "Auth Not Obtained",
                "OA-198": "Cert Not Obtained", "OA-204": "Timely Filing",
                "OA-223": "Workers Comp", "OA-234": "Auto Accident",
            }
            r_desc = r_title_map.get(r, "Related denial code")
            r_class = "badge-pr" if r.startswith("PR") else ("badge-oa" if r.startswith("OA") else "")
            cards.append(f'''            <a href="{r_slug}-denial-code.html" class="related-code-card">
              <div class="related-code-num {r_class}">{r}</div>
              <div class="related-code-desc">{r_desc}</div>
            </a>''')
        related_html = f'''
        <section class="denial-section">
          <h2>🔗 Related Denial Codes</h2>
          <div class="related-codes-grid">
{chr(10).join(cards)}
          </div>
        </section>'''

    badge_class = "badge-pr" if category == "PR" else ("badge-oa" if category == "OA" else "")

    causes_items = "\n".join(f'              <li>{c}</li>' for c in causes)
    fix_items = "\n".join(f'                <li>{f}</li>' for f in fix_steps)
    prev_items = "\n".join(f'              <li><strong>{p.split(":")[0].strip()}:</strong> {":".join(p.split(":")[1:]).strip()}</li>' if ":" in p else f'              <li><strong>{p}</strong></li>' for p in prevention)

    return f'''<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <script>(function(){{var t=localStorage.getItem("rcm_theme");if(t)document.documentElement.setAttribute("data-theme",t);document.addEventListener("DOMContentLoaded",function(){{var t2=localStorage.getItem("rcm_theme");if(t2)document.documentElement.setAttribute("data-theme",t2);}});}})();</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-6JRMMNNR40"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-6JRMMNNR40');</script>
  <meta charset="UTF-8" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{code} Denial Code: {safe_title} | Resolution Guide</title>
  <meta name="description" content="Complete guide to resolving {code} denial code ({safe_title}). Learn causes, resolution steps, and prevention strategies for medical billers and AR teams." />
  <meta name="keywords" content="{code} denial code, {safe_title.lower()}, medical billing, RCM denials, denial management, {category_tag.lower()}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://rcmdenials.com/denial-codes/{slug}-denial-code.html" />
  <meta property="og:title" content="{code} Denial Code: {safe_title} | Resolution Guide" />
  <meta property="og:description" content="Complete guide to resolving {code} denial code ({safe_title})." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://rcmdenials.com/denial-codes/{slug}-denial-code.html" />
  <meta property="og:image" content="https://rcmdenials.com/og-image.png" />
  <meta property="og:site_name" content="RCM Denials" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{code} Denial Code: {safe_title}" />
  <meta name="twitter:description" content="Complete guide to resolving {code} denial code ({safe_title})." />
  <meta name="twitter:image" content="https://rcmdenials.com/og-image.png" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{code} Denial Code: {safe_title} | Resolution Guide",
    "description": "Complete guide to resolving {code} denial code ({safe_title}).",
    "author": {{"@type": "Organization", "name": "RCM Denials"}},
    "publisher": {{"@type": "Organization", "name": "RCM Denials", "logo": {{"@type": "ImageObject", "url": "https://rcmdenials.com/favicon.png"}}}},
    "mainEntityOfPage": {{"@type": "WebPage", "@id": "https://rcmdenials.com/denial-codes/{slug}-denial-code.html"}},
    "datePublished": "{TODAY}",
    "dateModified": "{TODAY}"
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://rcmdenials.com/"}},
      {{"@type": "ListItem", "position": 2, "name": "Denial Codes", "item": "https://rcmdenials.com/denial-codes"}},
      {{"@type": "ListItem", "position": 3, "name": "{code}", "item": "https://rcmdenials.com/denial-codes/{slug}-denial-code.html"}}
    ]
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{"@type": "Question", "name": "What is {code} denial code?", "acceptedAnswer": {{"@type": "Answer", "text": "{desc_escaped}"}}}},
      {{"@type": "Question", "name": "How to resolve {code} denial code?", "acceptedAnswer": {{"@type": "Answer", "text": "Review the denial details, verify patient records, correct any errors, and resubmit the claim with supporting documentation."}}}},
      {{"@type": "Question", "name": "What questions should I ask the payer about {code}?", "acceptedAnswer": {{"@type": "Answer", "text": "Ask about the specific denial reason, what documentation is needed, the appeal deadline, and whether the claim can be corrected and resubmitted."}}}}
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
        <a href="index.html" class="active">Denial Codes</a>
        <a href="../specialties">🩺 Specialties</a>
        <a href="../about.html">About</a>
        <a href="../faq.html">FAQ</a>
        <a href="../contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main class="static-main" id="main-content">
    <article class="denial-code-article">
      <div class="breadcrumb">
        <a href="../index.html">Home</a> / <a href="index.html">Denial Codes</a> / <span>{code}</span>
      </div>

      <header class="article-header">
        <div class="denial-code-badge {badge_class}">{code}</div>
        <h1>{code} Denial Code: {safe_title}</h1>
        <p class="article-meta">Last Updated: {MONTH_YEAR} | Category: {category_tag}</p>
      </header>

      <div class="article-content">
        <section class="denial-section">
          <h2>📋 What is {code} Denial Code?</h2>
          <div class="info-box">
            <p><strong>{code}</strong> indicates that {desc.lower() if desc[0].isupper() else desc}</p>
          </div>
        </section>

        <section class="denial-section">
          <h2>🔍 Common Causes of {code} Denials</h2>
          <div class="causes-grid">
            <div class="cause-card">
              <div class="cause-icon">❌</div>
              <h3>Common Causes</h3>
              <ul>
{causes_items}
              </ul>
            </div>
          </div>
        </section>

        <section class="denial-section">
          <h2>✅ How to Resolve {code} Denials</h2>
          <div class="resolution-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Review the Denial</h3>
                <p>Carefully review the remittance advice to understand the specific denial reason.</p>
                <ul>
{fix_items}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="denial-section">
          <h2>📞 What to Ask the Payer</h3>
          <div class="questions-box">
            <h3>Essential Questions for {code} Denials:</h3>
            <ol>
              <li>"What specific documentation is needed to resolve this denial?"</li>
              <li>"What is the appeal deadline for this denial?"</li>
              <li>"Can this claim be corrected and resubmitted?"</li>
              <li>"Is there a retro-authorization or exception process available?"</li>
            </ol>
          </div>
        </section>

        <section class="denial-section">
          <h2>💡 Prevention Strategies</h2>
          <div class="prevention-box">
            <ul class="prevention-list">
{prev_items}
            </ul>
          </div>
        </section>
{related_html}
        <section class="denial-section cta-section">
          <h2>🚀 Need Help with {code}?</h2>
          <div class="cta-box">
            <p>RCM Denials helps you resolve denial codes quickly and prevent future denials.</p>
            <div class="cta-buttons">
              <a href="../index.html" class="btn btn-primary">Get Started Free</a>
            </div>
          </div>
        </section>

      </div>
    </article>
  </main>

  <footer class="static-footer">
    <div class="static-footer-content">
      <div class="footer-links">
        <a href="../privacy.html">Privacy</a>
        <a href="../terms.html">Terms</a>
        <a href="../contact.html">Contact</a>
      </div>
      <div class="footer-copyright">&copy; 2026 RCM Denials</div>
    </div>
  </footer>
</div>
</body>
</html>'''


def make_card(code_data):
    code = code_data["code"]
    title = code_data["title"]
    category = code_data["category"]
    priority = code_data["priority"]
    correctable = code_data["correctable"]
    category_tag = code_data["category_tag"]
    desc = code_data["desc"]
    slug = slugify(code)

    badge_class = ""
    if category == "PR":
        badge_class = " badge-pr"
    elif category == "OA":
        badge_class = " badge-oa"

    priority_icon = "⚡ High Priority" if priority == "High" else ("⚠️ Medium Priority" if priority == "Medium" else "📋 Low Priority")
    correct_icon = "✅ Correctable" if correctable == "Correctable" else "🔒 Non-Correctable"

    return f'''          <a href="{slug}-denial-code.html" class="denial-code-card" data-code="{code}" data-category="{category}">
            <div class="denial-code-header">
              <div class="denial-code-num{badge_class}">{code}</div>
              <div class="denial-code-category">{category_tag}</div>
            </div>
            <div class="denial-code-desc">
              {desc[:100]}{'...' if len(desc) > 100 else ''}
            </div>
            <div class="denial-code-meta">
              <span class="meta-item">{priority_icon}</span>
              <span class="meta-item">{correct_icon}</span>
            </div>
          </a>'''


def main():
    # Filter out existing codes
    new_codes = [c for c in CODES if c["code"] not in EXISTING_PAGES]
    print(f"Existing pages: {len(EXISTING_PAGES)}")
    print(f"New codes to generate: {len(new_codes)}")

    # Generate HTML pages
    generated = 0
    for code_data in new_codes:
        code = code_data["code"]
        slug = slugify(code)
        filename = f"{slug}-denial-code.html"
        filepath = os.path.join(DENIAL_CODES_DIR, filename)

        if os.path.exists(filepath):
            print(f"  SKIP (exists): {filename}")
            continue

        html = make_page(code_data)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)
        generated += 1
        print(f"  Generated: {filename}")

    print(f"\nTotal pages generated: {generated}")

    # Generate card HTML snippets for index.html
    cards_by_category = {"CO": [], "PR": [], "OA": []}
    for code_data in new_codes:
        cat = code_data["category"]
        cards_by_category[cat].append(make_card(code_data))

    # Write cards to a temp file for manual insertion
    cards_file = os.path.join(os.path.dirname(__file__), "_new_cards.html")
    with open(cards_file, "w", encoding="utf-8") as f:
        for cat in ["CO", "PR", "OA"]:
            if cards_by_category[cat]:
                f.write(f"\n<!-- NEW {cat} CARDS -->\n")
                for card in cards_by_category[cat]:
                    f.write(card + "\n")
    print(f"Card snippets written to: {cards_file}")

    # Generate data.js entries
    data_file = os.path.join(os.path.dirname(__file__), "_new_data_entries.js")
    with open(data_file, "w", encoding="utf-8") as f:
        f.write("// New denial code entries for data.js DENIAL_CODES array\n")
        f.write("// Append these to the existing array\n\n")
        for code_data in new_codes:
            f.write(f"  {{ code: '{code_data['code']}', desc: '{code_data['desc'][:80]}' }},\n")
    print(f"Data entries written to: {data_file}")

    # Count by category
    co_count = sum(1 for c in new_codes if c["category"] == "CO")
    pr_count = sum(1 for c in new_codes if c["category"] == "PR")
    oa_count = sum(1 for c in new_codes if c["category"] == "OA")
    print(f"\nBreakdown: {co_count} CO, {pr_count} PR, {oa_count} OA")
    print(f"Total after generation: {len(EXISTING_PAGES) + len(new_codes)} pages")


if __name__ == "__main__":
    main()
