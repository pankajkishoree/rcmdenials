var ValidationEngine = (function() {

  function validate(cptCode, modifierCode, icdCode, payerName) {
    var results = {
      cpt: validateCPT(cptCode),
      modifier: validateModifier(modifierCode),
      cptModifier: validateCPTModifier(cptCode, modifierCode),
      icdCompatibility: validateICDCompatibility(cptCode, icdCode),
      payerRules: validatePayerRules(payerName, modifierCode),
      ncci: validateNCCI(cptCode, modifierCode),
      documentation: generateDocumentationChecklist(cptCode, modifierCode),
      denials: predictDenials(cptCode, modifierCode, icdCode, payerName),
      recommendations: generateRecommendations(cptCode, modifierCode, icdCode, payerName),
      aiExplanation: generateAIExplanation(cptCode, modifierCode, icdCode, payerName)
    };

    results.overallStatus = calculateOverallStatus(results);
    results.confidenceScore = calculateConfidence(results);
    results.denialRisk = calculateDenialRisk(results);

    return results;
  }

  function validateCPT(code) {
    if (!code || code.trim() === '') {
      return { valid: false, status: "error", message: "No CPT code provided.", data: null };
    }
    var found = null;
    for (var i = 0; i < CPT_DATABASE.length; i++) {
      if (CPT_DATABASE[i].code === code.trim()) {
        found = CPT_DATABASE[i];
        break;
      }
    }
    if (found) {
      return { valid: true, status: "pass", message: "✔ Valid CPT Code", data: found };
    }
    return { valid: false, status: "fail", message: "❌ Unknown CPT Code", data: null };
  }

  function validateModifier(code) {
    if (!code || code.trim() === '') {
      return { valid: false, status: "error", message: "No modifier provided.", data: null };
    }
    var found = null;
    for (var i = 0; i < MODIFIER_DATABASE.length; i++) {
      if (MODIFIER_DATABASE[i].code === code.trim()) {
        found = MODIFIER_DATABASE[i];
        break;
      }
    }
    if (found) {
      return { valid: true, status: "pass", message: "✔ Valid Modifier", data: found };
    }
    return { valid: false, status: "fail", message: "❌ Unknown Modifier", data: null };
  }

  function validateCPTModifier(cptCode, modifierCode) {
    if (!cptCode || !modifierCode) {
      return { status: "error", message: "CPT and modifier required for compatibility check.", explanation: "" };
    }

    var cptData = null;
    for (var i = 0; i < CPT_DATABASE.length; i++) {
      if (CPT_DATABASE[i].code === cptCode) { cptData = CPT_DATABASE[i]; break; }
    }
    var modData = null;
    for (var j = 0; j < MODIFIER_DATABASE.length; j++) {
      if (MODIFIER_DATABASE[j].code === modifierCode) { modData = MODIFIER_DATABASE[j]; break; }
    }
    if (!cptData || !modData) {
      return { status: "error", message: "Invalid CPT or modifier code.", explanation: "" };
    }

    var compatibility = {
      "25": {
        "E&M": { status: "allowed", explanation: "Modifier 25 is appropriate for E&M services with a separately identifiable procedure." },
        "default": { status: "review", explanation: "Modifier 25 is primarily used with E&M codes. Review clinical documentation." }
      },
      "26": {
        "Cardiology": { status: "allowed", explanation: "Professional component modifier accepted for diagnostic tests." },
        "Lab": { status: "allowed", explanation: "Professional component modifier accepted for lab tests." },
        "default": { status: "review", explanation: "Modifier 26 is for diagnostic test professional components. Verify applicability." }
      },
      "TC": {
        "Cardiology": { status: "allowed", explanation: "Technical component modifier for facility-billed diagnostic tests." },
        "default": { status: "review", explanation: "Modifier TC is for technical component. Ensure facility billing." }
      },
      "59": {
        "default": { status: "allowed", explanation: "Modifier 59 indicates a distinct procedural service. Use to bypass NCCI edits when appropriate." }
      },
      "76": {
        "default": { status: "allowed", explanation: "Repeat procedure modifier. Ensure medical necessity for repeat service." }
      },
      "77": {
        "default": { status: "allowed", explanation: "Repeat procedure by different physician. Ensure documentation supports different provider." }
      },
      "91": {
        "Lab": { status: "allowed", explanation: "Repeat clinical lab test modifier. Medical necessity for repeat must be documented." },
        "default": { status: "review", explanation: "Modifier 91 is for repeat lab tests. Verify this is a clinical lab service." }
      },
      "95": {
        "E&M": { status: "allowed", explanation: "Telehealth modifier for synchronous telemedicine E&M services." },
        "Psych": { status: "allowed", explanation: "Telehealth modifier accepted for psychotherapy via telemedicine." },
        "default": { status: "review", explanation: "Modifier 95 is for synchronous telemedicine. Verify service was delivered via telehealth." }
      },
      "GA": {
        "default": { status: "allowed", explanation: "Waiver of liability on file. ABN or equivalent documentation required." }
      },
      "GX": {
        "default": { status: "allowed", explanation: "Voluntary notice of liability issued. Patient awareness documented." }
      },
      "GY": {
        "default": { status: "warning", explanation: "Service is statutorily excluded. Will not be paid by most payers." }
      },
      "GZ": {
        "default": { status: "warning", explanation: "Expected to be denied as not medically necessary. Proceed with caution." }
      },
      "24": {
        "E&M": { status: "allowed", explanation: "Unrelated E&M during post-operative period. Must document no relationship to surgery." },
        "default": { status: "review", explanation: "Modifier 24 is for unrelated E&M during post-op. Verify service is truly unrelated." }
      },
      "57": {
        "E&M": { status: "allowed", explanation: "Decision for surgery modifier. E&M resulted in the decision to operate." },
        "default": { status: "review", explanation: "Modifier 57 is for surgical decision E&M. Verify the visit led to surgical decision." }
      },
      "50": {
        "default": { status: "allowed", explanation: "Bilateral procedure modifier. Service performed on both sides." }
      },
      "LT": {
        "default": { status: "allowed", explanation: "Left side designation. Service performed on left side of body." }
      },
      "RT": {
        "default": { status: "allowed", explanation: "Right side designation. Service performed on right side of body." }
      }
    };

    var modRules = compatibility[modifierCode];
    if (!modRules) {
      return { status: "review", message: "Modifier compatibility not specifically defined.", explanation: "Review payer-specific guidelines for this combination." };
    }

    var categoryRule = modRules[cptData.category];
    if (categoryRule) {
      return { status: categoryRule.status === "allowed" ? "pass" : categoryRule.status === "warning" ? "warning" : "review", message: categoryRule.status === "allowed" ? "✔ Compatible" : categoryRule.status === "warning" ? "⚠ Warning" : "🔍 Review Needed", explanation: categoryRule.explanation };
    }

    var defaultRule = modRules["default"];
    if (defaultRule) {
      return { status: defaultRule.status === "allowed" ? "pass" : defaultRule.status === "warning" ? "warning" : "review", message: defaultRule.status === "allowed" ? "✔ Compatible" : defaultRule.status === "warning" ? "⚠ Warning" : "🔍 Review Needed", explanation: defaultRule.explanation };
    }

    return { status: "review", message: "🔍 Review Needed", explanation: "Compatibility not specifically defined. Review payer guidelines." };
  }

  function validateICDCompatibility(cptCode, icdCode) {
    if (!cptCode || !icdCode) {
      return { status: "error", message: "CPT and ICD-10 required for compatibility check." };
    }

    var cptData = null;
    for (var i = 0; i < CPT_DATABASE.length; i++) {
      if (CPT_DATABASE[i].code === cptCode) { cptData = CPT_DATABASE[i]; break; }
    }
    if (!cptData) {
      return { status: "error", message: "Unknown CPT code." };
    }

    var icdData = null;
    for (var j = 0; j < ICD_DATABASE.length; j++) {
      if (ICD_DATABASE[j].code === icdCode) { icdData = ICD_DATABASE[j]; break; }
    }
    if (!icdData) {
      return { status: "review", message: "ICD-10 code not in database. Manual review needed." };
    }

    var categoryMap = ICD_CPT_COMPATIBILITY[cptData.category];
    if (categoryMap && categoryMap[icdCode]) {
      var compat = categoryMap[icdCode];
      return {
        status: compat.status === "likely" ? "pass" : compat.status === "conflict" ? "fail" : "review",
        message: compat.status === "likely" ? "✔ Likely Supported" : compat.status === "conflict" ? "❌ Potential Conflict" : "🔍 Review Needed",
        notes: compat.notes
      };
    }

    return {
      status: "review",
      message: "🔍 Review Needed",
      notes: "ICD-10 compatibility with this CPT category is not specifically defined. Manual review recommended."
    };
  }

  function validatePayerRules(payerName, modifierCode) {
    if (!payerName || !modifierCode) {
      return { status: "error", message: "Payer and modifier required for rule check." };
    }

    var payer = PAYER_RULES[payerName];
    if (!payer) {
      return { status: "error", message: "Unknown payer: " + payerName };
    }

    var policy = payer.modifierPolicies[modifierCode];
    if (!policy) {
      return {
        status: "review",
        message: "🔍 No specific policy found",
        notes: "No specific modifier policy found for " + payerName + ". Review payer guidelines.",
        payer: payer
      };
    }

    var statusMap = {
      "accepted": { status: "pass", message: "✔ Accepted", icon: "✔" },
      "conditional": { status: "review", message: "🔍 Conditional", icon: "🔍" },
      "rejected": { status: "fail", message: "❌ Not Accepted", icon: "❌" },
      "warning": { status: "warning", message: "⚠ Warning", icon: "⚠" }
    };

    var s = statusMap[policy.status] || statusMap["review"];
    return {
      status: s.status,
      message: s.message,
      notes: policy.notes,
      generalRules: payer.generalRules,
      payer: payer
    };
  }

  function validateNCCI(cptCode, modifierCode) {
    if (!cptCode) {
      return { status: "error", message: "CPT code required for NCCI check." };
    }

    var edits = [];
    for (var i = 0; i < NCCI_RULES.length; i++) {
      var rule = NCCI_RULES[i];
      if (rule.cpt1 === cptCode || rule.cpt2 === cptCode) {
        edits.push(rule);
      }
    }

    if (edits.length === 0) {
      return { status: "pass", message: "✔ No NCCI Edit", edits: [] };
    }

    var applicableEdits = [];
    for (var j = 0; j < edits.length; j++) {
      var edit = edits[j];
      if (modifierCode && edit.modifier === modifierCode) {
        applicableEdits.push({ rule: edit, resolved: true, message: "Modifier " + modifierCode + " can bypass this edit." });
      } else if (edit.modifier) {
        applicableEdits.push({ rule: edit, resolved: false, message: "Modifier " + edit.modifier + " required to bypass." });
      } else {
        applicableEdits.push({ rule: edit, resolved: false, message: "Cannot be bypassed with a modifier." });
      }
    }

    var allResolved = true;
    for (var k = 0; k < applicableEdits.length; k++) {
      if (!applicableEdits[k].resolved) { allResolved = false; break; }
    }

    return {
      status: allResolved ? "pass" : "warning",
      message: allResolved ? "✔ Edits Resolved" : "⚠ Unresolved Edits",
      edits: applicableEdits
    };
  }

  function generateDocumentationChecklist(cptCode, modifierCode) {
    var checklist = [];

    checklist.push({ item: "Progress Note", required: true, icon: "📝", description: "Detailed clinical notes supporting medical necessity." });
    checklist.push({ item: "Procedure Note", required: false, icon: "📋", description: "Technical details of any procedures performed." });

    if (modifierCode === "25") {
      checklist.push({ item: "Separate E&M Documentation", required: true, icon: "📄", description: "Documentation showing E&M service was separately identifiable from procedure." });
    }
    if (modifierCode === "59") {
      checklist.push({ item: "Distinct Service Documentation", required: true, icon: "📄", description: "Documentation showing procedure was distinct from other services." });
    }
    if (modifierCode === "95") {
      checklist.push({ item: "Telehealth Visit Log", required: true, icon: "💻", description: "Documentation of synchronous telecommunication modality used." });
    }
    if (modifierCode === "24") {
      checklist.push({ item: "Post-Op Period Documentation", required: true, icon: "📅", description: "Documentation showing service was unrelated to the surgical procedure." });
    }
    if (modifierCode === "57") {
      checklist.push({ item: "Surgical Decision Note", required: true, icon: "📋", description: "Documentation that E&M visit resulted in decision for surgery." });
    }
    if (modifierCode === "GA" || modifierCode === "GX") {
      checklist.push({ item: "ABN (Advance Beneficiary Notice)", required: true, icon: "📄", description: "Signed waiver of liability or advance beneficiary notice." });
    }

    checklist.push({ item: "Authorization", required: false, icon: "🔑", description: "Prior authorization if required by payer." });
    checklist.push({ item: "Referral", required: false, icon: "🔗", description: "Referral documentation if required." });
    checklist.push({ item: "Operative Report", required: false, icon: "📋", description: "Surgical operative report if applicable." });
    checklist.push({ item: "Lab Results", required: false, icon: "🧪", description: "Supporting laboratory results." });
    checklist.push({ item: "Medical Records", required: false, icon: "📁", description: "Complete medical records supporting the service." });

    return checklist;
  }

  function predictDenials(cptCode, modifierCode, icdCode, payerName) {
    var denials = [];
    var cptCheck = validateCPT(cptCode);
    var modCheck = validateModifier(modifierCode);
    var compatCheck = validateCPTModifier(cptCode, modifierCode);
    var payerCheck = validatePayerRules(payerName, modifierCode);
    var ncciCheck = validateNCCI(cptCode, modifierCode);

    if (modCheck.status === "fail") {
      denials.push({
        code: "CO-16",
        name: "Missing Information",
        risk: "high",
        explanation: "Invalid modifier code. Claim may be rejected for incorrect modifier."
      });
    }

    if (compatCheck.status === "warning" || compatCheck.status === "review") {
      denials.push({
        code: "CO-4",
        name: "Procedure Code Incompatible with Modifier",
        risk: "medium",
        explanation: "Modifier may not be compatible with this CPT code. Review payer guidelines."
      });
    }

    if (modifierCode === "25") {
      denials.push({
        code: "CO-97",
        name: "Bundled Service",
        risk: "medium",
        explanation: "E&M service may be bundled with the procedure. Ensure documentation supports separately identifiable service."
      });
    }

    if (payerCheck.status === "fail") {
      denials.push({
        code: "CO-50",
        name: "Not Medically Necessary",
        risk: "high",
        explanation: "Payer does not accept this modifier for this service. Review payer-specific billing guidelines."
      });
    }

    if (ncciCheck.status === "warning") {
      denials.push({
        code: "CO-236",
        name: "This Payment is Adjusted Based on Payment Rules",
        risk: "medium",
        explanation: "NCCI edit applies. Modifier may be required to bypass the edit."
      });
    }

    if (denials.length === 0) {
      denials.push({
        code: "CO-16",
        name: "Missing Information (Low Risk)",
        risk: "low",
        explanation: "Low denial risk. Ensure all documentation is complete before submission."
      });
    }

    return denials;
  }

  function generateRecommendations(cptCode, modifierCode, icdCode, payerName) {
    var recs = [];
    var modData = null;
    for (var i = 0; i < MODIFIER_DATABASE.length; i++) {
      if (MODIFIER_DATABASE[i].code === modifierCode) { modData = MODIFIER_DATABASE[i]; break; }
    }

    if (modData) {
      recs.push("Modifier " + modifierCode + " (" + modData.name + ") appears appropriate for this service.");
    }

    if (modifierCode === "25") {
      recs.push("Ensure documentation clearly supports a separately identifiable E&M service.");
      recs.push("The E&M service must go beyond the pre-operative and post-operative work of the procedure.");
    }
    if (modifierCode === "59") {
      recs.push("Document that the procedure was performed on a different anatomical site or during a separate encounter.");
      recs.push("Modifier 59 is frequently audited - ensure thorough documentation.");
    }
    if (modifierCode === "95") {
      recs.push("Verify that the service was delivered via synchronous telecommunication (real-time audio/video).");
      recs.push("Document the telehealth modality and patient location.");
    }

    var payer = PAYER_RULES[payerName];
    if (payer) {
      recs.push("Verify " + payerName + "-specific billing guidelines before submission.");
      if (payer.denialRisk === "high") {
        recs.push("This payer has a higher denial rate - ensure all documentation is complete.");
      }
    }

    recs.push("Review procedure notes before submission.");
    recs.push("Verify that all diagnosis codes support medical necessity.");

    return recs;
  }

  function generateAIExplanation(cptCode, modifierCode, icdCode, payerName) {
    var cptData = null;
    for (var i = 0; i < CPT_DATABASE.length; i++) {
      if (CPT_DATABASE[i].code === cptCode) { cptData = CPT_DATABASE[i]; break; }
    }
    var modData = null;
    for (var j = 0; j < MODIFIER_DATABASE.length; j++) {
      if (MODIFIER_DATABASE[j].code === modifierCode) { modData = MODIFIER_DATABASE[j]; break; }
    }
    var icdData = null;
    for (var k = 0; k < ICD_DATABASE.length; k++) {
      if (ICD_DATABASE[k].code === icdCode) { icdData = ICD_DATABASE[k]; break; }
    }

    var sections = [];

    if (cptData && modData) {
      sections.push({
        title: "Why Modifier " + modifierCode + " is Accepted",
        content: "CPT " + cptCode + " (" + cptData.name + ") is a " + cptData.category + " code. Modifier " + modifierCode + " (" + modData.name + ") " + validateCPTModifier(cptCode, modifierCode).explanation
      });
    }

    sections.push({
      title: "Potential Risks",
      content: "Modifier " + modifierCode + " usage is subject to payer-specific policies. " + (payerName ? PAYER_RULES[payerName] ? payerName + " may have specific documentation requirements." : "Verify payer guidelines." : "Always verify with the specific payer.") + " Common risks include insufficient documentation, incorrect modifier pairing, and NCCI edit conflicts."
    });

    sections.push({
      title: "Documentation Needed",
      content: "At minimum, ensure: (1) Detailed progress notes supporting medical necessity, (2) Clear documentation that the " + (modData ? modData.name.toLowerCase() : "modifier") + " criteria are met, (3) All diagnosis codes support the services billed, (4) Prior authorization if required by the payer."
    });

    sections.push({
      title: "Next Recommended Action",
      content: "Review the validation report above. Address any warnings or failures before claim submission. Ensure documentation supports the use of modifier " + modifierCode + ". Verify " + (payerName || "the payer") + "-specific guidelines. Consider a pre-submission audit if this is a high-value claim."
    });

    return sections;
  }

  function calculateOverallStatus(results) {
    var issues = 0;
    var warnings = 0;

    if (results.cpt.status === "fail") return { status: "fail", label: "INVALID", color: "red", description: "Invalid CPT code provided." };
    if (results.modifier.status === "fail") return { status: "fail", label: "INVALID", color: "red", description: "Invalid modifier code provided." };

    if (results.cptModifier.status === "warning") warnings++;
    if (results.cptModifier.status === "review") issues++;
    if (results.icdCompatibility.status === "review") issues++;
    if (results.payerRules.status === "fail") issues++;
    if (results.payerRules.status === "warning") warnings++;
    if (results.ncci.status === "warning") warnings++;

    if (issues > 0) return { status: "review", label: "REVIEW REQUIRED", color: "yellow", description: "Issues found that require review before submission." };
    if (warnings > 0) return { status: "warning", label: "CAUTION", color: "yellow", description: "Warnings identified. Proceed with caution." };
    return { status: "pass", label: "VALID", color: "green", description: "All validation checks passed." };
  }

  function calculateConfidence(results) {
    var score = 100;
    if (results.cpt.status === "fail") score -= 40;
    if (results.modifier.status === "fail") score -= 30;
    if (results.cptModifier.status === "review") score -= 10;
    if (results.cptModifier.status === "warning") score -= 15;
    if (results.icdCompatibility.status === "review") score -= 10;
    if (results.payerRules.status === "fail") score -= 20;
    if (results.payerRules.status === "warning") score -= 10;
    if (results.payerRules.status === "conditional") score -= 5;
    if (results.ncci.status === "warning") score -= 15;
    for (var i = 0; i < results.denials.length; i++) {
      if (results.denials[i].risk === "high") score -= 10;
      else if (results.denials[i].risk === "medium") score -= 5;
    }
    return Math.max(0, Math.min(100, score));
  }

  function calculateDenialRisk(results) {
    var riskScore = 0;
    if (results.cpt.status === "fail") riskScore += 40;
    if (results.modifier.status === "fail") riskScore += 30;
    if (results.payerRules.status === "fail") riskScore += 25;
    if (results.payerRules.status === "warning") riskScore += 15;
    if (results.ncci.status === "warning") riskScore += 20;
    if (results.cptModifier.status === "warning") riskScore += 15;
    if (results.cptModifier.status === "review") riskScore += 10;
    for (var i = 0; i < results.denials.length; i++) {
      if (results.denials[i].risk === "high") riskScore += 15;
      else if (results.denials[i].risk === "medium") riskScore += 8;
    }

    var riskLevel, riskColor;
    if (riskScore >= 40) { riskLevel = "High"; riskColor = "red"; }
    else if (riskScore >= 20) { riskLevel = "Medium"; riskColor = "yellow"; }
    else { riskLevel = "Low"; riskColor = "green"; }

    return { level: riskLevel, color: riskColor, percentage: Math.min(100, riskScore) };
  }

  return {
    validate: validate,
    validateCPT: validateCPT,
    validateModifier: validateModifier,
    validateCPTModifier: validateCPTModifier,
    validateICDCompatibility: validateICDCompatibility,
    validatePayerRules: validatePayerRules,
    validateNCCI: validateNCCI,
    generateDocumentationChecklist: generateDocumentationChecklist,
    predictDenials: predictDenials,
    generateRecommendations: generateRecommendations,
    generateAIExplanation: generateAIExplanation
  };
})();
