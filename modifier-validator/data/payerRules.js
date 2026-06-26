var PAYER_RULES = {
  "Medicare": {
    name: "Medicare",
    icon: "🏛️",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Must document separately identifiable E&M service. Commonly audited." },
      "26": { status: "accepted", notes: "Professional component of diagnostic tests." },
      "TC": { status: "accepted", notes: "Technical component billed by facility." },
      "59": { status: "accepted", notes: "Use to bypass NCCI edits. Must document distinct service." },
      "76": { status: "accepted", notes: "Repeat procedure same day by same physician." },
      "77": { status: "accepted", notes: "Repeat procedure by different physician." },
      "91": { status: "accepted", notes: "Repeat lab same day. Must justify medical necessity." },
      "95": { status: "conditional", notes: "Telehealth modifier. Must meet Medicare telehealth requirements." },
      "GA": { status: "accepted", notes: "Waiver of liability on file. Required for certain services." },
      "GX": { status: "conditional", notes: "Voluntary ABN. Patient chose to proceed knowing non-coverage." },
      "GY": { status: "rejected", notes: "Statutory exclusion. Not a Medicare benefit." },
      "GZ": { status: "warning", notes: "Expected denial. Will likely be denied as not medically necessary." },
      "24": { status: "accepted", notes: "Unrelated E&M during post-op. Must document no relationship to surgery." },
      "57": { status: "accepted", notes: "Decision for surgery. E&M resulted in surgical decision." },
      "58": { status: "accepted", notes: "Staged procedure post-op management." },
      "50": { status: "accepted", notes: "Bilateral procedure modifier." },
      "LT": { status: "accepted", notes: "Left side designation." },
      "RT": { status: "accepted", notes: "Right side designation." }
    },
    generalRules: [
      "Modifiers must be appended correctly to the CPT code.",
      "Documentation must support the use of each modifier.",
      "Modifier 59 is frequently audited - ensure distinct service is documented.",
      "ABN (Advance Beneficiary Notice) required for services not clearly covered."
    ],
    denialRisk: "medium"
  },
  "Medicaid": {
    name: "Medicaid",
    icon: "🏥",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with supporting documentation of separately identifiable E&M." },
      "26": { status: "accepted", notes: "Professional component recognized." },
      "TC": { status: "accepted", notes: "Technical component recognized." },
      "59": { status: "accepted", notes: "Accepted but state-specific guidelines may apply." },
      "76": { status: "accepted", notes: "Repeat procedure same physician." },
      "91": { status: "conditional", notes: "Some states limit repeat lab coverage." },
      "95": { status: "conditional", notes: "Telehealth policies vary by state Medicaid program." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "conditional", notes: "State-dependent acceptance." },
      "GY": { status: "rejected", notes: "Service excluded from Medicaid coverage." },
      "GZ": { status: "warning", notes: "Expected non-payment." }
    },
    generalRules: [
      "State-specific Medicaid rules may override general guidelines.",
      "Prior authorization often required for specialty services.",
      "Documentation requirements vary by state.",
      "Managed Medicaid plans may have additional requirements."
    ],
    denialRisk: "medium"
  },
  "UnitedHealthcare": {
    name: "UnitedHealthcare",
    icon: "🟠",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with documentation of separately identifiable service." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "accepted", notes: "Accepted to bypass NCCI. May require additional documentation." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab may require preauthorization." },
      "95": { status: "accepted", notes: "Telehealth modifier accepted per UHC telehealth policy." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "accepted", notes: "Voluntary ABN accepted." },
      "GY": { status: "rejected", notes: "Statutory exclusion applies." },
      "GZ": { status: "warning", notes: "Expected denial as not medically necessary." }
    },
    generalRules: [
      "Prior authorization required for many specialty services.",
      "Claims must be submitted within 90 days of service.",
      "Modifier 25 is a common audit target - ensure documentation is thorough.",
      "Electronic claims preferred; paper claims may face longer processing."
    ],
    denialRisk: "low"
  },
  "Aetna": {
    name: "Aetna",
    icon: "🔵",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with clear documentation of separate E&M service." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "accepted", notes: "Distinct procedural service accepted with documentation." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab may need preauthorization." },
      "95": { status: "accepted", notes: "Telehealth services accepted per Aetna policy." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "accepted", notes: "Voluntary notice accepted." },
      "GY": { status: "rejected", notes: "Excluded service." },
      "GZ": { status: "warning", notes: "Expected non-payment." }
    },
    generalRules: [
      "Prior authorization required for advanced imaging and specialty procedures.",
      "Claims must include all relevant ICD-10 codes.",
      "Modifier usage is audited regularly.",
      "Electronic claims submission preferred."
    ],
    denialRisk: "low"
  },
  "Humana": {
    name: "Humana",
    icon: "🟡",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with documentation of separately identifiable E&M." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "accepted", notes: "Distinct service accepted with proper documentation." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab coverage varies by plan." },
      "95": { status: "accepted", notes: "Telehealth modifier accepted." },
      "GA": { status: "accepted", notes: "Waiver accepted." },
      "GX": { status: "accepted", notes: "Voluntary notice accepted." },
      "GY": { status: "rejected", notes: "Excluded service." },
      "GZ": { status: "warning", notes: "Expected denial." }
    },
    generalRules: [
      "Prior authorization required for certain procedures.",
      "Claims must be filed within the timely filing limit.",
      "Modifier 25 documentation must show distinct E&M service.",
      "Utilization management applies to advanced imaging."
    ],
    denialRisk: "medium"
  },
  "Cigna": {
    name: "Cigna",
    icon: "🟢",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with separately identifiable E&M documentation." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "accepted", notes: "Distinct procedural service accepted." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab may require preauthorization." },
      "95": { status: "accepted", notes: "Telehealth modifier accepted." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "accepted", notes: "Voluntary notice accepted." },
      "GY": { status: "rejected", notes: "Excluded service." },
      "GZ": { status: "warning", notes: "Expected denial." }
    },
    generalRules: [
      "Prior authorization required for specialty referrals.",
      "Claims should include diagnosis codes supporting medical necessity.",
      "Modifier 59 requires documentation of distinct service.",
      "Precertification needed for advanced imaging."
    ],
    denialRisk: "low"
  },
  "BCBS": {
    name: "Blue Cross Blue Shield",
    icon: "🔷",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with clear documentation of separate E&M service." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "accepted", notes: "Accepted to indicate distinct service. Documentation required." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab requires justification." },
      "95": { status: "accepted", notes: "Telehealth modifier accepted per BCBS policy." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "accepted", notes: "Voluntary notice accepted." },
      "GY": { status: "rejected", notes: "Statutory exclusion." },
      "GZ": { status: "warning", notes: "Expected non-payment." }
    },
    generalRules: [
      "Plan-specific rules may vary by Blue Cross Blue Shield affiliate.",
      "Prior authorization required for many procedures.",
      "Modifier 25 is frequently audited by BCBS plans.",
      "Electronic claims submission recommended."
    ],
    denialRisk: "low"
  },
  "Anthem": {
    name: "Anthem",
    icon: "🔷",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with documentation of separately identifiable service." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "accepted", notes: "Distinct service modifier accepted with documentation." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab may need preauthorization." },
      "95": { status: "accepted", notes: "Telehealth modifier accepted." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "accepted", notes: "Voluntary notice accepted." },
      "GY": { status: "rejected", notes: "Excluded service." },
      "GZ": { status: "warning", notes: "Expected denial." }
    },
    generalRules: [
      "Prior authorization required for advanced imaging and procedures.",
      "Claims must include supporting diagnosis codes.",
      "Modifier usage is subject to audit.",
      "Timely filing limits apply."
    ],
    denialRisk: "medium"
  },
  "Tricare": {
    name: "Tricare",
    icon: "🎖️",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with documentation of separately identifiable E&M." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "accepted", notes: "Distinct service accepted with documentation." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab may require authorization." },
      "95": { status: "accepted", notes: "Telehealth services accepted per Tricare policy." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "accepted", notes: "Voluntary notice accepted." },
      "GY": { status: "rejected", notes: "Excluded service." },
      "GZ": { status: "warning", notes: "Expected denial." }
    },
    generalRules: [
      "Referral required for specialty care.",
      "Prior authorization for advanced imaging and procedures.",
      "Documentation must support military/dependent medical necessity.",
      "TRICARE for Life follows Medicare guidelines for most services."
    ],
    denialRisk: "low"
  },
  "Molina": {
    name: "Molina Healthcare",
    icon: "🟣",
    modifierPolicies: {
      "25": { status: "accepted", notes: "Accepted with separately identifiable E&M documentation." },
      "26": { status: "accepted", notes: "Professional component accepted." },
      "TC": { status: "accepted", notes: "Technical component accepted." },
      "59": { status: "conditional", notes: "Accepted but closely audited. Strong documentation required." },
      "76": { status: "accepted", notes: "Repeat procedure accepted." },
      "91": { status: "conditional", notes: "Repeat lab coverage varies." },
      "95": { status: "conditional", notes: "Telehealth policies vary by state." },
      "GA": { status: "accepted", notes: "Waiver on file accepted." },
      "GX": { status: "conditional", notes: "State-dependent acceptance." },
      "GY": { status: "rejected", notes: "Excluded service." },
      "GZ": { status: "warning", notes: "Expected denial." }
    },
    generalRules: [
      "State Medicaid managed care rules apply.",
      "Prior authorization required for most specialty services.",
      "Modifier 59 is heavily audited - ensure distinct service documentation.",
      "Claims must be filed within 90 days of service."
    ],
    denialRisk: "high"
  }
};
