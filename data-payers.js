/* ============================================================
   RCM DENIALS — TIMELY FILING PAYER DATABASE
   Advanced structured JSON DB for Timely Filing deadlines
   Categories: Medicare, Medicaid, Commercial, Government
   ============================================================ */
'use strict';

const TIMELY_FILING_PAYERS = [
  // 🏥 US Government Programs
  {
    id: "MEDICARE_PART_AB",
    name: "Medicare (Part A & Part B)",
    category: "Government",
    type: "Federal",
    timely_filing_days: 365,
    claim_type_rules: {
      original: 365,
      corrected: 365,
      appeal: 120,    // Redetermination
      secondary: 365
    },
    notes: "Must be filed exactly 1 calendar year from Date of Service.",
    override_holidays: true // Adjusts for weekends and federal holidays
  },
  {
    id: "MEDICARE_ADVANTAGE",
    name: "Medicare Advantage (Part C)",
    category: "Government",
    type: "Commercial Administered",
    timely_filing_days: 180, // Often varies by HMO/PPO, baseline 180
    claim_type_rules: {
      original: 180,
      corrected: 180,
      appeal: 60,
      secondary: 180
    },
    notes: "Varies by specific plan sponsor (e.g., UHC Medicare Advantage). Standard is 180 days out-of-network.",
    override_holidays: false
  },
  {
    id: "MEDICAID_DEFAULT",
    name: "Medicaid (Standard/Out-of-State)",
    category: "Government",
    type: "State",
    timely_filing_days: 365,
    claim_type_rules: {
      original: 365,
      corrected: 180,
      appeal: 90,
      secondary: 180 // Usually from date of primary EOB
    },
    notes: "Medicaid limits vary heavily by state (from 90 to 365 days).",
    override_holidays: true
  },
  {
    id: "TRICARE",
    name: "TRICARE (All Regions)",
    category: "Government",
    type: "Federal",
    timely_filing_days: 365,
    claim_type_rules: {
      original: 365,
      corrected: 365,
      appeal: 90,
      secondary: 365
    },
    notes: "One year from the date of service or date of discharge.",
    override_holidays: true
  },
  {
    id: "VA_CHAMPVA",
    name: "VA / CHAMPVA",
    category: "Government",
    type: "Federal",
    timely_filing_days: 365,
    claim_type_rules: {
      original: 365,
      corrected: 365,
      appeal: 365,
      secondary: 365
    },
    notes: "VA claims allow up to one year.",
    override_holidays: true
  },

  // 🏢 Major Commercial Insurers
  {
    id: "AETNA",
    name: "Aetna",
    category: "Commercial",
    type: "National",
    timely_filing_days: 120, // Common physician contract
    claim_type_rules: {
      original: 120,
      corrected: 90, // Often 90-180 days for reconsiderations
      appeal: 180,
      secondary: 120
    },
    notes: "Contract specific. Typically 120 days for physicians and 365 for hospitals.",
    override_holidays: false
  },
  {
    id: "UHC",
    name: "UnitedHealthcare (UHC)",
    category: "Commercial",
    type: "National",
    timely_filing_days: 90,
    claim_type_rules: {
      original: 90,
      corrected: 90,
      appeal: 180,
      secondary: 90
    },
    notes: "Standard physician contract is 90 days. Varies by state law.",
    override_holidays: false
  },
  {
    id: "CIGNA",
    name: "Cigna",
    category: "Commercial",
    type: "National",
    timely_filing_days: 90,
    claim_type_rules: {
      original: 90,
      corrected: 90,
      appeal: 180,
      secondary: 90
    },
    notes: "OON providers typically have 180 days; INN is 90 days.",
    override_holidays: false
  },
  {
    id: "BCBS_DEFAULT",
    name: "Blue Cross Blue Shield (Standard)",
    category: "Commercial",
    type: "National",
    timely_filing_days: 180,
    claim_type_rules: {
      original: 180,
      corrected: 180,
      appeal: 180,
      secondary: 180
    },
    notes: "Differs widely by local state plan (e.g., BCBS TX = 95 days, Anthem = 120-365 days).",
    override_holidays: false
  },
  {
    id: "HUMANA",
    name: "Humana",
    category: "Commercial",
    type: "National",
    timely_filing_days: 90,
    claim_type_rules: {
      original: 90,
      corrected: 90,
      appeal: 180,
      secondary: 90
    },
    notes: "Varies by plan type and provider contract.",
    override_holidays: false
  },
  {
    id: "KAISER",
    name: "Kaiser Permanente",
    category: "Commercial",
    type: "Regional",
    timely_filing_days: 180,
    claim_type_rules: {
      original: 180,
      corrected: 180,
      appeal: 365,
      secondary: 180
    },
    notes: "Generally 180 days for non-contracted emergency claims.",
    override_holidays: false
  },
  {
    id: "MOLINA",
    name: "Molina Healthcare",
    category: "Commercial",
    type: "National",
    timely_filing_days: 180,
    claim_type_rules: {
      original: 180,
      corrected: 90,
      appeal: 90,
      secondary: 90 // From primary EOB
    },
    notes: "Often mirrors state Medicaid rules.",
    override_holidays: true
  },
  {
    id: "CENTENE",
    name: "Centene Corporation",
    category: "Commercial",
    type: "National",
    timely_filing_days: 180,
    claim_type_rules: {
      original: 180,
      corrected: 90,
      appeal: 90,
      secondary: 180
    },
    notes: "Check specific subsidiary (Ambetter, WellCare, etc).",
    override_holidays: true
  }
];

// US Federal Holidays helper for advanced calculation
const US_HOLIDAYS_2026_2027 = [
  "2026-01-01", "2026-01-19", "2026-02-16", "2026-05-25", "2026-06-19", "2026-07-03", "2026-09-07", "2026-10-12", "2026-11-11", "2026-11-26", "2026-12-25",
  "2027-01-01", "2027-01-18", "2027-02-15", "2027-05-31", "2027-06-18", "2027-07-05", "2027-09-06", "2027-10-11", "2027-11-11", "2027-11-25", "2027-12-24"
];
