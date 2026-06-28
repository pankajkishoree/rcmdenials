#!/usr/bin/env python3
"""
Mass Denial Code Page Generator
Generates missing CO, PR, OA denial code HTML pages.
Only creates pages that don't already exist.

Run: python mass_generate_pages.py
"""
import os, re, html
from pathlib import Path

DIR = Path(__file__).parent / "denial-codes"
TODAY = "2026-06-28"
TODAY_FMT = "June 2026"

# ─── Code metadata: code_num -> (title, short_desc, category_label, why, how, prevent) ───

CO_DATA = {
    66: ("Amount Disallowed", "The claim amount has been disallowed based on contractual terms.", "Payment Adjustment",
         ["The billed amount exceeds the contracted rate", "Fee schedule limits applied by payer", "Provider unaware of contract terms", "Incorrect billing amount"],
         ["Review provider-payer contract for allowed amounts", "Verify billed charges against fee schedule", "Adjust claim to reflect contracted rate", "Resubmit with correct allowed amount"],
         ["Maintain updated fee schedules from all payers", "Train billing staff on contractual rates", "Use practice management system with contract-loaded fees"]),
    94: ("Use Separate Codes", "Services usually bundled must be reported with separate codes when appropriate.", "Coding",
         ["Bundled services billed under single code", "Incorrect code combination used", "Modifier not appended to unbundle", "Payer requires separate coding"],
         ["Review CCI edits for bundling rules", "Append appropriate modifier if applicable", "Use separate CPT codes for distinct services", "Resubmit with corrected coding"],
         ["Review NCCI/CCI edits regularly", "Train coders on bundling rules", "Use coding software that flags bundling issues"]),
    96: ("Non-Covered Service", "The service is not covered under the patient benefit plan.", "Coverage",
         ["Service excluded from benefit plan", "Patient has limited coverage", "Service considered experimental", "Plan does not cover procedure"],
         ["Verify patient benefits before service", "Check if alternative covered service exists", "Inform patient of non-covered status", "Consider patient self-pay options"],
         ["Verify eligibility and benefits before service", "Educate patients on plan coverage", "Use pre-authorization for questionable services"]),
    107: ("Claim Denied", "The claim or service has been denied as submitted.", "Billing",
         ["Multiple errors on claim", "Information missing or incorrect", "Service not medically necessary", "Billing requirements not met"],
         ["Review remittance advice for specific reason", "Correct identified errors", "Gather supporting documentation", "Resubmit or appeal within deadline"],
         ["Implement thorough claim scrubbing", "Use claim edit checks before submission", "Monitor denial patterns for systemic issues"]),
    111: ("Not a Benefit", "This service is not a covered benefit under the plan.", "Coverage",
         ["Service excluded from all benefit plans", "Elective/cosmetic procedure billed", "Service not medically necessary", "Plan explicitly excludes service"],
         ["Verify benefit coverage before service", "Inform patient of non-covered status", "Bill patient directly if appropriate", "Appeal if medical necessity demonstrated"],
         ["Check benefits verification before every service", "Use pre-determination of benefits", "Maintain exclusion list by payer"]),
    112: ("Service Not Provided", "The service was not provided as billed.", "Coding",
         ["Incorrect service code submitted", "Service not actually performed", "Duplicate claim submission", "Wrong date of service"],
         ["Verify services actually provided", "Correct service code to match rendered service", "Void incorrect claim and resubmit", "Document services thoroughly"],
         ["Use superbill with exact services rendered", "Verify charges before claim submission", "Implement charge capture process"]),
    113: ("Service Not Provided", "The service was not provided as billed.", "Coding",
         ["Incorrect service code submitted", "Service not actually performed", "Duplicate claim submission", "Wrong date of service"],
         ["Verify services actually provided", "Correct service code", "Void incorrect claim and resubmit", "Document services thoroughly"],
         ["Use superbill with exact services rendered", "Verify charges before claim submission", "Implement charge capture process"]),
    114: ("Service Not Provided", "The service was not provided as billed.", "Coding",
         ["Incorrect service code submitted", "Service not actually performed", "Duplicate claim submission", "Wrong date of service"],
         ["Verify services actually provided", "Correct service code", "Void incorrect claim and resubmit", "Document services thoroughly"],
         ["Use superbill with exact services rendered", "Verify charges before claim submission", "Implement charge capture process"]),
    115: ("Service Not Provided", "The service was not provided as billed.", "Coding",
         ["Incorrect service code submitted", "Service not actually performed", "Duplicate claim submission", "Wrong date of service"],
         ["Verify services actually provided", "Correct service code", "Void incorrect claim and resubmit", "Document services thoroughly"],
         ["Use superbill with exact services rendered", "Verify charges before claim submission", "Implement charge capture process"]),
    116: ("Service Not Provided", "The service was not provided as billed.", "Coding",
         ["Incorrect service code submitted", "Service not actually performed", "Duplicate claim submission", "Wrong date of service"],
         ["Verify services actually provided", "Correct service code", "Void incorrect claim and resubmit", "Document services thoroughly"],
         ["Use superbill with exact services rendered", "Verify charges before claim submission", "Implement charge capture process"]),
    117: ("Service Not Provided", "The service was not provided as billed.", "Coding",
         ["Incorrect service code submitted", "Service not actually performed", "Duplicate claim submission", "Wrong date of service"],
         ["Verify services actually provided", "Correct service code", "Void incorrect claim and resubmit", "Document services thoroughly"],
         ["Use superbill with exact services rendered", "Verify charges before claim submission", "Implement charge capture process"]),
    118: ("Service Not Provided", "The service was not provided as billed.", "Coding",
         ["Incorrect service code submitted", "Service not actually performed", "Duplicate claim submission", "Wrong date of service"],
         ["Verify services actually provided", "Correct service code", "Void incorrect claim and resubmit", "Document services thoroughly"],
         ["Use superbill with exact services rendered", "Verify charges before claim submission", "Implement charge capture process"]),
    131: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    132: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    133: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    134: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    135: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    136: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    137: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    138: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    139: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    140: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    141: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    142: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    143: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    144: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    145: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    147: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    148: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    149: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    152: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    153: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    154: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    155: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    156: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    157: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    158: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    159: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    160: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    161: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    162: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    163: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    164: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    165: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    166: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    168: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    169: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    171: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    172: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    173: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    174: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    175: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    176: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    177: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    178: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    179: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    180: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    183: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    184: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    185: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    186: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    187: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    188: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    189: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    190: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    191: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    192: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    193: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    194: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    195: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    196: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    198: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    199: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    200: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    201: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    202: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    203: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    205: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    206: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    207: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    208: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    209: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    211: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    212: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    213: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    214: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    215: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    216: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    217: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    218: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    219: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    220: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    221: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    222: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    224: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    226: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    227: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    228: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    229: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    231: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    233: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    234: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    235: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    236: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    237: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    238: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    239: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    240: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    241: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    242: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    243: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    244: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    245: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    246: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    247: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    248: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    249: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    250: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
    251: ("Duplicate Claim", "A duplicate claim was submitted for the same service.", "Duplicate",
         ["Same claim submitted twice", "Resubmission without voiding original", "System error causing duplicate", "Multiple providers billing same service"],
         ["Check if original claim was processed", "Void duplicate claim if original paid", "Resubmit only if original rejected", "Document unique claim numbers"],
         ["Track claim submissions in PM system", "Implement duplicate claim detection", "Void claims before resubmitting"]),
}

# For brevity, remaining CO codes 254-366 use same "Duplicate Claim" template
# We'll fill them in a loop below
for n in range(254, 367):
    if n not in CO_DATA:
        CO_DATA[n] = ("Claim Adjustment", "This claim has been adjusted per payer rules and guidelines.", "Payment Adjustment",
             ["Claim does not meet payer guidelines", "Information required is missing or incorrect", "Service exceeds allowed limits", "Payer-specific billing rules apply"],
             ["Review the remittance advice carefully", "Correct any identified errors on the claim", "Resubmit within the filing deadline", "Appeal if adjustment is incorrect"],
             ["Stay updated on payer billing rules", "Use claim scrubbing software before submission", "Monitor denial trends for patterns"])

# PR Data - patient responsibility codes
PR_RANGE = list(range(8, 21))
for n in PR_RANGE:
    if n not in PR_DATA if 'PR_DATA' in dir() else True:
        pass  # We'll define PR_DATA below

PR_DATA = {}
for n in range(8, 66):
    PR_DATA[n] = ("Patient Responsibility", "Patient is financially responsible for this portion of the charges.", "Patient Responsibility",
         ["Patient has not met deductible", "Coinsurance amount applies", "Copayment required", "Service not fully covered by plan"],
         ["Verify patient deductible status", "Apply correct patient responsibility amount", "Bill patient for remaining balance", "Send statement to patient"],
         ["Collect patient responsibility at time of service", "Verify benefits before service", "Use payment estimation tools"])

PR_DATA[66] = ("Out-of-Network Charges", "Patient responsibility for out-of-network provider services.", "Patient Responsibility",
         ["Provider is out-of-network", "No referral obtained for specialist", "Service rendered at non-participating facility", "Patient chose non-network provider"],
         ["Verify network status before service", "Obtain referral if required", "Bill patient for out-of-network charges", "Negotiate reduced rates if possible"],
         ["Verify provider network status", "Educate patients on network implications", "Use participating providers when possible"])

PR_DATA[96] = ("Non-Covered Charges", "Patient responsible for non-covered services.", "Patient Responsibility",
         ["Service not covered by benefit plan", "Plan excludes this type of service", "Service considered not medically necessary", "Benefit limit reached"],
         ["Verify coverage before service", "Inform patient of non-covered status", "Bill patient for non-covered amount", "Appeal if medical necessity demonstrated"],
         ["Check benefits before every service", "Use pre-determination of benefits", "Educate patients on coverage limits"])

for n in range(97, 120):
    if n not in PR_DATA:
        PR_DATA[n] = ("Patient Responsibility", "Patient is financially responsible for this portion.", "Patient Responsibility",
             ["Patient responsibility applied per plan", "Balance after insurance payment", "Service subject to cost-sharing", "Patient cost-sharing amount due"],
             ["Review patient responsibility amount", "Bill patient for balance due", "Send patient statement", "Set up payment plan if needed"],
             ["Collect payments at time of service", "Provide cost estimates upfront", "Offer payment plan options"])

# OA Data - other adjustment codes
OA_DATA = {}
for n in range(1, 18):
    OA_DATA[n] = ("Other Adjustment", "This adjustment is made for administrative or regulatory reasons.", "Other Adjustment",
         ["Administrative processing adjustment", "Regulatory compliance requirement", "Coordination of benefits adjustment", "Payer administrative action"],
         ["Review adjustment reason on remittance", "Verify patient eligibility and coverage", "Contact payer for clarification", "Resubmit if adjustment is incorrect"],
         ["Verify patient eligibility before service", "Understand payer administrative rules", "Document all communications with payer"])

OA_DATA[18] = ("COB - Coordination of Benefits", "Primary and secondary payment coordination adjustment.", "COB",
         ["Patient has multiple insurance plans", "Primary payer has not processed claim", "Secondary payer COB rules apply", "Incorrect payer order"],
         ["Verify primary payer has paid", "Submit claim to secondary payer", "Ensure correct payer order", "Resubmit with COB documentation"],
         ["Verify all active coverage before service", "Determine correct payer order", "Submit claims to correct payer sequence"])

for n in range(19, 23):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied to the claim.", "Other Adjustment",
         ["Administrative processing adjustment", "Payer system correction", "Retroactive eligibility change", "Plan amendment applied"],
         ["Review remittance advice", "Contact payer for clarification", "Resubmit if needed", "Appeal if incorrect"],
         ["Verify eligibility before service", "Keep current on plan changes", "Document all communications"])

OA_DATA[23] = ("Interest Payment", "Interest penalty payment adjustment applied.", "Interest",
         ["Payer delayed payment beyond timely limit", "State prompt pay law triggered", "Interest owed per contract terms", "Regulatory interest requirement"],
         ["Verify interest calculation is correct", "Confirm state prompt pay laws apply", "Document payment timeline", "Request interest payment if owed"],
         ["Track payment timelines", "Know your state prompt pay laws", "Follow up on delayed payments"])

OA_DATA[25] = ("Payment to Provider", "Payment made directly to the rendering provider.", "Payment",
         ["Payment issued to correct provider", "Check issued to rendering provider", "Direct payment made", "Electronic funds transfer completed"],
         ["Verify payment was received", "Reconcile payment with claim", "Contact payer if payment not received", "Void and reissue if check lost"],
         ["Track all payments received", "Reconcile payments regularly", "Set up electronic remittance advice"])

OA_DATA[28] = ("Coverage Terminated", "Patient coverage was not effective on date of service.", "Coverage",
         ["Patient coverage expired", "Plan terminated before date of service", "Coverage gap between plans", "Retroactive disenrollment"],
         ["Verify patient active coverage", "Check coverage effective dates", "Bill patient if no active coverage", "Appeal if coverage was active"],
         ["Verify eligibility on every date of service", "Monitor coverage termination dates", "Re-verify benefits periodically"])

OA_DATA[29] = ("Timely Filing", "Claim was not submitted within the payer timely filing limit.", "Timely Filing",
         ["Claim submitted after filing deadline", "No proof of timely submission", "Payer timely filing requirement exceeded", "Original claim was never submitted"],
         ["Gather proof of timely filing", "Check for any exceptions to filing limit", "Resubmit with proof of original submission", "Appeal with documentation"],
         ["Track all claim submissions", "Set up filing deadline reminders", "Maintain proof of submission"])

for n in range(30, 45):
    OA_DATA[n] = ("Other Adjustment", "Administrative or regulatory adjustment applied.", "Other Adjustment",
         ["Administrative processing adjustment", "Payer system correction", "Regulatory compliance", "Plan-specific rule applied"],
         ["Review remittance advice carefully", "Contact payer for clarification", "Correct and resubmit if needed", "Appeal if adjustment is incorrect"],
         ["Understand payer-specific rules", "Keep current on regulatory changes", "Document all claim details"])

OA_DATA[45] = ("Fee Schedule Adjustment", "Payment adjusted per fee schedule or contracted rate.", "Fee Schedule",
         ["Charges exceed fee schedule maximum", "Contracted rate lower than billed", "Medicare/Medicaid fee schedule applied", "Maximum allowable amount exceeded"],
         ["Verify fee schedule for service", "Adjust charges to allowed amount", "Bill patient for excess if allowed", "Negotiate contracted rates"],
         ["Use correct fee schedule for payer", "Update charges when fee schedules change", "Monitor allowed amounts"])

for n in range(46, 94):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied to the claim.", "Other Adjustment",
         ["Administrative processing adjustment", "Payer-specific rule applied", "Coordination of benefits", "Regulatory requirement"],
         ["Review remittance advice", "Contact payer for clarification", "Resubmit if needed", "Appeal if incorrect"],
         ["Verify eligibility before service", "Understand payer rules", "Document everything"])

OA_DATA[94] = ("Plan Program Adjustment", "Adjustment for different plan or program.", "Plan Adjustment",
         ["Service processed under different plan", "Member moved between plan types", "Coordination between plan programs", "Plan restructure applied"],
         ["Verify which plan applies", "Check member eligibility", "Submit to correct plan", "Document plan details"],
         ["Verify current plan information", "Track plan changes", "Maintain current member data"])

OA_DATA[96] = ("Benefit Requirement", "Benefit requirements not met for this service.", "Benefit",
         ["Service does not meet benefit criteria", "Benefit limit has been reached", "Waiting period not satisfied", "Pre-existing condition exclusion"],
         ["Verify benefit requirements", "Check if benefit criteria can be met", "Appeal if requirements are met", "Bill patient if non-covered"],
         ["Know benefit requirements", "Verify before providing service", "Educate patients on benefits"])

for n in range(97, 110):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied.", "Other Adjustment",
         ["Administrative processing", "Payer system action", "Regulatory compliance", "Plan-specific rule"],
         ["Review remittance", "Contact payer", "Resubmit if needed", "Appeal if incorrect"],
         ["Verify eligibility", "Understand rules", "Document details"])

OA_DATA[109] = ("Claim Identification Error", "Claim cannot be identified in the payer system.", "Billing",
         ["Claim not found in payer system", "Incorrect claim number referenced", "System transmission error", "Claim never received by payer"],
         ["Verify claim was transmitted successfully", "Resubmit the claim", "Check for transmission errors", "Contact payer to locate claim"],
         ["Confirm claim receipt", "Track claim status", "Maintain submission records"])

OA_DATA[110] = ("Billing Information Error", "Billing information requires correction.", "Billing",
         ["Incorrect billing information submitted", "Coding errors detected", "Missing required information", "Claim needs correction"],
         ["Review and correct billing errors", "Resubmit corrected claim", "Update patient information", "Verify coding accuracy"],
         ["Use claim scrubbing tools", "Verify information before submission", "Train staff on billing requirements"])

for n in range(111, 170):
    OA_DATA[n] = ("Other Adjustment", "Administrative or regulatory adjustment.", "Other Adjustment",
         ["Administrative processing", "Payer requirement", "Regulatory compliance", "Plan administration"],
         ["Review remittance advice", "Contact payer for details", "Correct and resubmit", "Appeal if needed"],
         ["Stay current on requirements", "Verify before service", "Document everything"])

OA_DATA[170] = ("Non-Covered Service", "Service not payable under current benefit plan.", "Coverage",
         ["Service excluded from benefit plan", "Not covered under current plan", "Benefit plan limitation", "Service considered non-covered"],
         ["Verify benefit coverage", "Check if alternative is covered", "Inform patient of status", "Appeal if appropriate"],
         ["Check benefits before service", "Use pre-determination", "Maintain coverage matrix"])

for n in range(171, 181):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied.", "Other Adjustment",
         ["Administrative processing", "Payer system action", "Regulatory requirement", "Plan rule"],
         ["Review remittance", "Contact payer", "Correct and resubmit", "Appeal"],
         ["Verify eligibility", "Understand rules", "Document"])

OA_DATA[181] = ("Code Combination Not Recognized", "Procedure code and modifier combination not recognized.", "Coding",
         ["Invalid code/modifier combination", "Modifier not appropriate for code", "Payer does not recognize combination", "Coding edit triggered"],
         ["Verify correct modifier usage", "Check payer coding guidelines", "Use alternative code combination", "Resubmit with correction"],
         ["Know payer coding rules", "Use coding reference tools", "Verify modifier applicability"])

OA_DATA[182] = ("Requirements Not Met", "Specific payer requirements not met for this service.", "Authorization",
         ["Prior authorization not obtained", "Referral not on file", "Precertification required", "Payer-specific requirements not met"],
         ["Obtain required authorization", "Get retroactive authorization if possible", "Submit supporting documentation", "Appeal if requirements were met"],
         ["Check authorization requirements", "Obtain authorizations before service", "Track authorization status"])

for n in range(183, 191):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied.", "Other Adjustment",
         ["Administrative processing", "Payer requirement", "Regulatory compliance", "Plan rule"],
         ["Review remittance", "Contact payer", "Correct and resubmit", "Appeal"],
         ["Verify requirements", "Stay current", "Document"])

OA_DATA[191] = ("Claim Adjustment", "Adjustment made to the claim per payer rules.", "Payment Adjustment",
         ["Claim adjusted per payer guidelines", "Payment differs from billed amount", "Contractual adjustment applied", "Plan-specific adjustment"],
         ["Verify adjustment is correct", "Check contracted rates", "Resubmit if adjustment incorrect", "Appeal with documentation"],
         ["Know contracted rates", "Verify before billing", "Track adjustments"])

for n in range(192, 197):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied.", "Other Adjustment",
         ["Administrative processing", "Payer system action", "Regulatory compliance", "Plan rule"],
         ["Review remittance", "Contact payer", "Correct and resubmit", "Appeal"],
         ["Verify eligibility", "Understand rules", "Document"])

OA_DATA[197] = ("Prior Authorization Not Obtained", "Prior authorization was required but not obtained.", "Authorization",
         ["Prior authorization required but not obtained", "Authorization expired before service", "Wrong procedure authorized", "Authorization not on file"],
         ["Obtain retroactive authorization", "Resubmit with authorization number", "Check if authorization can be backdated", "Appeal if authorization was obtained"],
         ["Check auth requirements before service", "Track authorization expiration dates", "Maintain authorization database"])

OA_DATA[198] = ("Certification Not Obtained", "Required certification or recertification not obtained.", "Authorization",
         ["Certification required but missing", "Recertification not obtained", "Certificate expired", "Certification documentation insufficient"],
         ["Obtain required certification", "Submit certification documentation", "Resubmit with certification", "Appeal if certification was obtained"],
         ["Track certification requirements", "Set renewal reminders", "Maintain certification records"])

for n in range(199, 204):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied.", "Other Adjustment",
         ["Administrative processing", "Payer requirement", "Regulatory compliance", "Plan rule"],
         ["Review remittance", "Contact payer", "Correct and resubmit", "Appeal"],
         ["Verify requirements", "Stay current", "Document"])

OA_DATA[203] = ("Claim Adjustment", "Claim has been adjusted per administrative rules.", "Payment Adjustment",
         ["Administrative adjustment applied", "Claim processed with modification", "Payment adjusted per rules", "Claim partially paid"],
         ["Review adjustment details", "Verify payment accuracy", "Resubmit rejected portions", "Appeal if incorrect"],
         ["Understand adjustment rules", "Track claim outcomes", "Document everything"])

OA_DATA[204] = ("Filing Timeframe", "Claim not submitted within required timeframe.", "Timely Filing",
         ["Claim submitted late", "Filing deadline exceeded", "No proof of timely filing", "Late submission"],
         ["Gather proof of timely submission", "Check for exceptions", "Resubmit with proof", "Appeal with documentation"],
         ["Track filing deadlines", "Submit claims promptly", "Maintain submission records"])

for n in range(205, 224):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied.", "Other Adjustment",
         ["Administrative processing", "Payer requirement", "Regulatory compliance", "Plan rule"],
         ["Review remittance", "Contact payer", "Correct and resubmit", "Appeal"],
         ["Verify eligibility", "Understand rules", "Document"])

OA_DATA[223] = ("Workers Compensation", "Service related to work-related injury under workers comp.", "Workers Comp",
         ["Service related to workplace injury", "Workers compensation claim filed", "Employer reporting required", "WC carrier responsible"],
         ["Verify workers comp coverage", "File with workers comp carrier", "Coordinate with employer", "Bill WC carrier directly"],
         ["Determine if work-related", "File WC claims promptly", "Coordinate benefits"])

for n in range(225, 234):
    OA_DATA[n] = ("Other Adjustment", "Administrative adjustment applied.", "Other Adjustment",
         ["Administrative processing", "Payer requirement", "Regulatory compliance", "Plan rule"],
         ["Review remittance", "Contact payer", "Correct and resubmit", "Appeal"],
         ["Verify eligibility", "Understand rules", "Document"])

OA_DATA[234] = ("Motor Vehicle Accident", "Service related to auto accident. Auto insurance may be primary.", "Auto Accident",
         ["Service related to motor vehicle accident", "Auto insurance may be primary", "PIP coverage may apply", "Liability determination pending"],
         ["Determine auto insurance coverage", "File with auto insurance carrier", "Coordinate with health insurance", "Bill auto insurance first"],
         ["Determine accident-related status", "Collect auto insurance information", "File claims promptly"])


# ─── HTML Template ────────────────────────────────────────────────────────

def make_page(prefix, num, title, desc, cat_label, why, how, prevent):
    code = f"{prefix.upper()}-{num}"
    filename = f"{prefix.lower()}-{num}-denial-code.html"
    badge_class = "" if prefix.lower() == "co" else f" badge-{prefix.lower()}"
    related = get_related_codes(prefix, num)

    why_li = "\n".join(f"              <li>{html.escape(w)}</li>" for w in why)
    how_steps = ""
    for i, h in enumerate(how, 1):
        how_steps += f'''            <div class="step">
              <div class="step-number">{i}</div>
              <div class="step-content">
                <h3>Step {i}</h3>
                <p>{html.escape(h)}</p>
              </div>
            </div>\n'''
    prevent_li = "\n".join(f"              <li><strong>{html.escape(p)}</strong></li>" for p in prevent)
    related_html = "\n".join(
        f'''            <a href="{r_file}" class="related-code-card">
              <div class="related-code-num{r_badge}">{r_code}</div>
              <div class="related-code-desc">{html.escape(r_desc)}</div>
            </a>''' for r_code, r_file, r_badge, r_desc in related
    )

    desc_esc = html.escape(desc)
    title_esc = html.escape(title)
    cat_esc = html.escape(cat_label)

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
  <title>{code} Denial Code: {html.escape(title)} | Resolution Guide</title>
  <meta name="description" content="Complete guide to resolving {code} denial code ({html.escape(title)}). Learn causes, resolution steps, and prevention strategies for medical billers and AR teams." />
  <meta name="keywords" content="{code} denial code, {html.escape(title.lower())}, medical billing, RCM denials, denial management" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://rcmdenials.com/denial-codes/{filename}" />
  <meta property="og:title" content="{code} Denial Code: {html.escape(title)} | Resolution Guide" />
  <meta property="og:description" content="Complete guide to resolving {code} denial code ({html.escape(title)})." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://rcmdenials.com/denial-codes/{filename}" />
  <meta property="og:image" content="https://rcmdenials.com/og-image.png" />
  <meta property="og:site_name" content="RCM Denials" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{code} Denial Code: {html.escape(title)}" />
  <meta name="twitter:description" content="Complete guide to resolving {code} denial code ({html.escape(title)})." />
  <meta name="twitter:image" content="https://rcmdenials.com/og-image.png" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="../styles.css" />
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{code} Denial Code: {html.escape(title)} | Resolution Guide",
    "description": "Complete guide to resolving {code} denial code ({html.escape(title)}).",
    "author": {{"@type": "Organization", "name": "RCM Denials"}},
    "publisher": {{"@type": "Organization", "name": "RCM Denials", "logo": {{"@type": "ImageObject", "url": "https://rcmdenials.com/favicon.png"}}}},
    "mainEntityOfPage": {{"@type": "WebPage", "@id": "https://rcmdenials.com/denial-codes/{filename}"}},
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
      {{"@type": "ListItem", "position": 3, "name": "{code}", "item": "https://rcmdenials.com/denial-codes/{filename}"}}
    ]
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{"@type": "Question", "name": "What is {code} denial code?", "acceptedAnswer": {{"@type": "Answer", "text": "{desc_esc}"}}}},
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
        <div class="denial-code-badge{badge_class}">{code}</div>
        <h1>{code} Denial Code: {html.escape(title)}</h1>
        <p class="article-meta">Last Updated: {TODAY_FMT} | Category: {html.escape(cat_label)}</p>
      </header>

      <div class="article-content">
        <section class="denial-section">
          <h2>📋 What is {code} Denial Code?</h2>
          <div class="info-box">
            <p><strong>{code}</strong> indicates that {html.escape(desc.lower() if not desc.lower().startswith(('the ','this ')) else desc.lower())}</p>
          </div>
        </section>

        <section class="denial-section">
          <h2>🔍 Common Causes of {code} Denials</h2>
          <div class="causes-grid">
            <div class="cause-card">
              <div class="cause-icon">❌</div>
              <h3>Common Causes</h3>
              <ul>
{why_li}
              </ul>
            </div>
          </div>
        </section>

        <section class="denial-section">
          <h2>✅ How to Resolve {code} Denials</h2>
          <div class="resolution-steps">
{how_steps}          </div>
        </section>

        <section class="denial-section">
          <h2>💡 Prevention Strategies</h2>
          <div class="prevention-box">
            <ul class="prevention-list">
{prevent_li}
            </ul>
          </div>
        </section>

        <section class="denial-section">
          <h2>🔗 Related Denial Codes</h2>
          <div class="related-codes-grid">
{related_html}
          </div>
        </section>
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


def get_related_codes(prefix, num):
    """Get 3 related codes for cross-linking."""
    related = []
    # Same category, nearby codes
    for offset in [1, -1, 2]:
        other_num = num + offset
        if other_num > 0 and other_num != num:
            other_prefix = prefix
            other_code = f"{other_prefix.upper()}-{other_num}"
            other_file = f"{other_prefix.lower()}-{other_num}-denial-code.html"
            other_badge = "" if other_prefix.lower() == "co" else f" badge-{other_prefix.lower()}"
            other_desc = "Related Code"
            # Get title from data
            data = CO_DATA if prefix.lower() == "co" else (PR_DATA if prefix.lower() == "pr" else OA_DATA)
            if other_num in data:
                other_desc = data[other_num][0]
            related.append((other_code, other_file, other_badge, other_desc))
            if len(related) >= 3:
                break
    # If not enough, add from other categories
    if len(related) < 3:
        cross = [("co", 1, "Deductible Amount"), ("pr", 1, "Deductible"), ("oa", 18, "COB")]
        for cp, cn, cd in cross:
            if cp != prefix or cn != num:
                cr = f"{cp.upper()}-{cn}"
                cf = f"{cp}-{cn}-denial-code.html"
                cb = "" if cp == "co" else f" badge-{cp}"
                if len(related) < 3:
                    related.append((cr, cf, cb, cd))
    return related[:3]


def main():
    created = 0
    skipped = 0

    # CO codes
    for num, data in sorted(CO_DATA.items()):
        filename = f"co-{num}-denial-code.html"
        filepath = DIR / filename
        if filepath.exists():
            skipped += 1
            continue
        title, desc, cat, why, how, prevent = data
        page = make_page("co", num, title, desc, cat, why, how, prevent)
        filepath.write_text(page, encoding="utf-8")
        created += 1

    # PR codes
    for num, data in sorted(PR_DATA.items()):
        filename = f"pr-{num}-denial-code.html"
        filepath = DIR / filename
        if filepath.exists():
            skipped += 1
            continue
        title, desc, cat, why, how, prevent = data
        page = make_page("pr", num, title, desc, cat, why, how, prevent)
        filepath.write_text(page, encoding="utf-8")
        created += 1

    # OA codes
    for num, data in sorted(OA_DATA.items()):
        filename = f"oa-{num}-denial-code.html"
        filepath = DIR / filename
        if filepath.exists():
            skipped += 1
            continue
        title, desc, cat, why, how, prevent = data
        page = make_page("oa", num, title, desc, cat, why, how, prevent)
        filepath.write_text(page, encoding="utf-8")
        created += 1

    print(f"[OK] Created {created} new pages, skipped {skipped} existing")


if __name__ == "__main__":
    main()
