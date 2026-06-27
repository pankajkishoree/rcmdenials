/* ═══════════════════════════════════════════════════════════
   AI ANALYSIS ENGINE — Rule-Based Claim Risk Analysis
   Simulates AI behavior with deterministic risk scoring
   ═══════════════════════════════════════════════════════════ */
'use strict';

var AIEngine = (function() {

  var CATEGORIES = [
    'Documentation',
    'Coding',
    'Medical Necessity',
    'Authorization',
    'Eligibility',
    'Duplicate Claim',
    'Modifier Review',
    'Timely Filing'
  ];

  function analyze(claim, ruleResults) {
    var categoryScores = {};
    var factors = [];
    var denialTags = [];
    var actions = [];

    // Initialize all categories at 10
    CATEGORIES.forEach(function(c) { categoryScores[c] = 10; });

    // ── DOCUMENTATION ANALYSIS ──
    analyzeDocumentation(claim, categoryScores, factors, actions);

    // ── CODING ANALYSIS ──
    analyzeCoding(claim, categoryScores, factors, actions);

    // ── MEDICAL NECESSITY ──
    analyzeMedicalNecessity(claim, categoryScores, factors, actions);

    // ── AUTHORIZATION ──
    analyzeAuthorization(claim, categoryScores, factors, actions);

    // ── ELIGIBILITY ──
    analyzeEligibility(claim, categoryScores, factors, actions);

    // ── DUPLICATE CLAIM ──
    analyzeDuplicateRisk(claim, categoryScores, factors, actions);

    // ── MODIFIER REVIEW ──
    analyzeModifiers(claim, categoryScores, factors, actions);

    // ── TIMELY FILING ──
    analyzeTimelyFiling(claim, categoryScores, factors, actions);

    // ── INCORPORATE RULE ENGINE WARNINGS ──
    incorporateRuleResults(ruleResults, categoryScores, factors, actions);

    // ── CALCULATE OVERALL SCORE ──
    var overallScore = calculateOverallScore(categoryScores);

    // ── DETERMINE DENIAL TAGS ──
    denialTags = getDenialTags(categoryScores);

    // ── GENERATE CONFIDENCE ──
    var confidence = calculateConfidence(claim);

    return {
      overallScore: overallScore,
      categoryScores: categoryScores,
      factors: factors,
      denialTags: denialTags,
      actions: actions,
      confidence: confidence
    };
  }

  // ── ANALYSIS FUNCTIONS ────────────────────────────────

  function analyzeDocumentation(claim, scores, factors, actions) {
    var note = (claim.clinicalNote || '').trim();
    var noteLen = note.length;
    var cptCodes = claim.cptCodes || [];
    var highLevelEM = cptCodes.filter(function(c) { return c === '99214' || c === '99215' || c === '99204' || c === '99205'; });

    if (!note || noteLen < 20) {
      scores.Documentation += 40;
      factors.push({ text: 'No clinical documentation provided — this is a leading cause of denials', severity: 'high', category: 'Documentation' });
      actions.push('Provide clinical documentation including history, examination, and medical decision-making details');
    } else if (noteLen < 80) {
      scores.Documentation += 25;
      factors.push({ text: 'Clinical note is very brief — may not support the billed service level', severity: 'medium', category: 'Documentation' });
      actions.push('Expand clinical documentation to include HPI, examination findings, and assessment');
    } else if (noteLen < 150) {
      scores.Documentation += 10;
      factors.push({ text: 'Clinical note could be more detailed for the service level billed', severity: 'low', category: 'Documentation' });
    }

    // E/M level support
    if (highLevelEM.length > 0) {
      var lower = note.toLowerCase();
      var hasHPI = lower.indexOf('history') > -1 || lower.indexOf('hpi') > -1 || lower.indexOf('symptom') > -1;
      var hasExam = lower.indexOf('exam') > -1 || lower.indexOf('finding') > -1;
      var hasMDM = lower.indexOf('assessment') > -1 || lower.indexOf('plan') > -1 || lower.indexOf('decision') > -1;

      if (!hasHPI || !hasExam || !hasMDM) {
        scores.Documentation += 20;
        factors.push({ text: 'High-level E/M code(s) (' + highLevelEM.join(', ') + ') require complete documentation of history, exam, and MDM', severity: 'high', category: 'Documentation' });
        actions.push('Review documentation to ensure HPI, examination, and medical decision-making support the billed E/M level');
      }
    }

    // Check for diagnosis support
    var icdCodes = claim.icdCodes || [];
    var hasDiagSupport = note && icdCodes.length > 0 && icdCodes.some(function(icd) {
      return note.toLowerCase().indexOf(icd.toLowerCase()) > -1 ||
             note.toLowerCase().indexOf(getDiagnosisDescription(icd)) > -1;
    });

    if (!hasDiagSupport && noteLen > 20 && icdCodes.length > 0) {
      scores.Documentation += 10;
      scores['Medical Necessity'] += 10;
      factors.push({ text: 'Clinical note does not clearly reference the coded diagnoses — documentation should support each diagnosis', severity: 'medium', category: 'Documentation' });
      actions.push('Ensure clinical documentation references the conditions corresponding to each diagnosis code');
    }
  }

  function analyzeCoding(claim, scores, factors, actions) {
    var cptCodes = claim.cptCodes || [];
    var icdCodes = claim.icdCodes || [];

    // Check for modifier 25 with E/M
    var mods = claim.modifiers || [];
    var hasModifier25 = mods.indexOf('25') > -1;
    var hasEM = cptCodes.some(function(c) { return c.match(/^99[2-3]\d{2}$/); });
    var hasProcedure = cptCodes.some(function(c) { return !c.match(/^99[2-3]\d{2}$/); });

    if (hasModifier25 && hasEM && hasProcedure) {
      scores.Coding += 15;
      scores['Modifier Review'] += 20;
      factors.push({ text: 'Modifier 25 on E/M with procedure — documentation must clearly show a separately identifiable E/M service', severity: 'medium', category: 'Modifier Review' });
      actions.push('Verify documentation shows a significant, separately identifiable E/M service distinct from the procedure');
    }

    // Check for unbundling risk
    if (cptCodes.length > 3) {
      scores.Coding += 10;
      factors.push({ text: 'Multiple CPT codes (' + cptCodes.length + ' codes) on a single claim — review for potential unbundling concerns', severity: 'low', category: 'Coding' });
      actions.push('Review all CPT codes to ensure they represent distinct, separately identifiable services');
    }

    // Check for incompatible CPT combinations
    checkCPTConflicts(cptCodes, scores, factors, actions);
  }

  function checkCPTConflicts(cptCodes, scores, factors, actions) {
    // E/M on same day as significant procedures without modifier
    var emCodes = cptCodes.filter(function(c) { return c.match(/^99[2-3]\d{2}$/); });
    var procCodes = cptCodes.filter(function(c) { return !c.match(/^99[2-3]\d{2}$/); });

    if (emCodes.length > 0 && procCodes.length > 0) {
      var mods = [];
      // Check if any modifier is present
      var hasAnyMod = false;
      cptCodes.forEach(function() {
        // Simplified: check if we have any modifier in the claim
      });

      scores.Coding += 10;
      factors.push({ text: 'E/M service with procedure on the same date — ensure proper modifier usage or bundling rules apply', severity: 'low', category: 'Coding' });
    }

    // Same-day bilateral without 50 modifier
    var ltCodes = cptCodes.filter(function(c) { return c.indexOf('LT') > -1; });
    var rtCodes = cptCodes.filter(function(c) { return c.indexOf('RT') > -1; });
    if (ltCodes.length > 0 && rtCodes.length > 0) {
      scores['Modifier Review'] += 10;
      factors.push({ text: 'Both left and right procedures coded — verify modifier 50 or LT/RT usage is appropriate', severity: 'low', category: 'Modifier Review' });
    }
  }

  function analyzeMedicalNecessity(claim, scores, factors, actions) {
    var note = (claim.clinicalNote || '').toLowerCase();
    var icdCodes = claim.icdCodes || [];
    var cptCodes = claim.cptCodes || [];

    // Check for vague diagnoses
    var vagueICDs = ['R68.89', 'R69', 'R50.9', 'R51.9', 'R05.9', 'R06.02', 'R10.9'];
    var hasVague = icdCodes.some(function(icd) { return vagueICDs.indexOf(icd.replace(/\./g, '')) > -1; });

    if (hasVague) {
      scores['Medical Necessity'] += 20;
      factors.push({ text: 'Vague or unspecified diagnosis codes detected — payers may question medical necessity', severity: 'medium', category: 'Medical Necessity' });
      actions.push('Review diagnosis codes for specificity — consider if more specific codes are clinically appropriate');
    }

    // Check for high-cost procedures without supporting documentation
    var highCostCPTs = ['93306', '70553', '72148', '73721', '74177', '29881'];
    var hasHighCost = cptCodes.some(function(c) { return highCostCPTs.indexOf(c) > -1; });

    if (hasHighCost && note.length < 100) {
      scores['Medical Necessity'] += 15;
      factors.push({ text: 'High-cost procedure(s) with limited documentation — medical necessity should be clearly supported', severity: 'high', category: 'Medical Necessity' });
      actions.push('Document medical necessity clearly — include clinical rationale, failed conservative treatments, and expected outcomes');
    }

    // Age-related screening appropriateness
    var age = parseInt(claim.age);
    var screeningCPTs = ['99381','99382','99383','99384','99391','99392','99393','99394'];
    var hasScreening = cptCodes.some(function(c) { return screeningCPTs.indexOf(c) > -1; });

    if (hasScreening) {
      if (age < 50 && cptCodes.some(function(c) { return c === '77067' || c === '77063'; })) {
        scores['Medical Necessity'] += 10;
        factors.push({ text: 'Mammography screening in patient under 50 — verify payer guidelines for age-appropriate screening', severity: 'low', category: 'Medical Necessity' });
      }
    }
  }

  function analyzeAuthorization(claim, scores, factors, actions) {
    var authStatus = claim.priorAuth;

    if (authStatus === 'required-not-obtained') {
      scores.Authorization += 50;
      factors.push({ text: 'Prior authorization is required but not obtained — high risk of denial', severity: 'high', category: 'Authorization' });
      actions.push('Obtain prior authorization before submitting the claim');
    } else if (authStatus === 'unknown') {
      scores.Authorization += 20;
      factors.push({ text: 'Prior authorization status is unknown — verify payer requirements', severity: 'medium', category: 'Authorization' });
      actions.push('Verify whether prior authorization is required for this payer and procedure combination');
    }

    // Referral check
    if (claim.referralRequired === 'yes') {
      scores.Authorization += 15;
      factors.push({ text: 'Referral is required — verify referral documentation is on file', severity: 'medium', category: 'Authorization' });
      actions.push('Confirm referral is properly documented and attached to the claim');
    }
  }

  function analyzeEligibility(claim, scores, factors, actions) {
    // Check for common eligibility risks based on plan type
    var planType = claim.planType;

    if (planType === 'medicare' || planType === 'advantage') {
      // Medicare-specific checks
      var age = parseInt(claim.age);
      if (age < 65) {
        scores.Eligibility += 15;
        factors.push({ text: 'Patient under 65 on Medicare/Medicare Advantage — verify eligibility and reason for Medicare coverage', severity: 'medium', category: 'Eligibility' });
        actions.push('Verify Medicare eligibility and ensure proper entitlement reason is documented');
      }
    }

    if (planType === 'workers-comp') {
      scores.Eligibility += 10;
      factors.push({ text: 'Workers compensation claim — verify claim is within the allowed period and proper documentation is attached', severity: 'low', category: 'Eligibility' });
      actions.push('Confirm workers compensation claim is within the filing period and has proper authorization');
    }

    // Generic eligibility note
    if (!planType) {
      scores.Eligibility += 10;
      factors.push({ text: 'Plan type not specified — this may affect coverage and filing requirements', severity: 'low', category: 'Eligibility' });
    }
  }

  function analyzeDuplicateRisk(claim, scores, factors, actions) {
    // Check for indicators of potential duplicate
    var cptCodes = claim.cptCodes || [];

    // Same service repeated
    var codeCounts = {};
    cptCodes.forEach(function(c) {
      codeCounts[c] = (codeCounts[c] || 0) + 1;
    });

    var duplicates = Object.keys(codeCounts).filter(function(c) { return codeCounts[c] > 1; });
    if (duplicates.length > 0) {
      scores['Duplicate Claim'] += 15;
      factors.push({ text: 'CPT code(s) ' + duplicates.join(', ') + ' appear multiple times — verify this is intentional (e.g., bilateral procedures)', severity: 'medium', category: 'Duplicate Claim' });
      actions.push('Review duplicate codes to ensure each represents a distinct, separately billable service');
    }

    // Global period check (procedures with global periods)
    var globalPeriods = { '29881': 90, '29880': 90, '27447': 90, '27130': 90, '43644': 90, '43659': 90 };
    cptCodes.forEach(function(c) {
      if (globalPeriods[c]) {
        scores['Duplicate Claim'] += 10;
        factors.push({ text: 'CPT ' + c + ' has a ' + globalPeriods[c] + '-day global period — ensure no conflicting procedures within this window', severity: 'low', category: 'Duplicate Claim' });
      }
    });
  }

  function analyzeModifiers(claim, scores, factors, actions) {
    var mods = claim.modifiers || [];
    var cptCodes = claim.cptCodes || [];

    // Modifier 59 risk
    if (mods.indexOf('59') > -1) {
      scores['Modifier Review'] += 15;
      factors.push({ text: 'Modifier 59 (Distinct procedural service) is frequently audited — ensure services are truly distinct and consider X-modifiers (XE, XS, XP, XU)', severity: 'medium', category: 'Modifier Review' });
      actions.push('Review whether X{E,S,P,U} modifiers could more precisely describe the distinct service');
    }

    // Modifier 25 risk
    if (mods.indexOf('25') > -1) {
      scores['Modifier Review'] += 15;
      factors.push({ text: 'Modifier 25 (Significant separately identifiable E/M) — one of the most commonly denied modifiers', severity: 'medium', category: 'Modifier Review' });
      actions.push('Ensure documentation clearly supports a separate E/M service distinct from the procedure');
    }

    // No modifier on bilateral
    var hasLT = mods.indexOf('LT') > -1;
    var hasRT = mods.indexOf('RT') > -1;
    var has50 = mods.indexOf('50') > -1;
    var has59 = mods.indexOf('59') > -1;

    if (!hasLT && !hasRT && !has50 && cptCodes.length > 1) {
      scores['Modifier Review'] += 5;
      factors.push({ text: 'Multiple procedures without modifiers — consider whether modifiers are needed to distinguish services', severity: 'low', category: 'Modifier Review' });
    }

    // X-modifiers with 59
    if (has59 && (mods.indexOf('XE') > -1 || mods.indexOf('XS') > -1 || mods.indexOf('XP') > -1 || mods.indexOf('XU') > -1)) {
      scores['Modifier Review'] += 10;
      factors.push({ text: 'Modifier 59 with X-modifiers is redundant — CMS recommends using the specific X-modifier instead of 59', severity: 'medium', category: 'Modifier Review' });
      actions.push('Remove modifier 59 and use only the specific X-modifier');
    }
  }

  function analyzeTimelyFiling(claim, scores, factors, actions) {
    if (!claim.dos) return;

    var dosDate = new Date(claim.dos);
    var today = new Date();
    var daysDiff = Math.floor((today - dosDate) / (1000 * 60 * 60 * 24));
    var planType = claim.planType || 'commercial';
    var limits = { medicare: 365, medicaid: 365, commercial: 365, advantage: 365, tricare: 365, 'workers-comp': 90 };
    var limit = limits[planType] || 365;

    if (daysDiff > limit) {
      scores['Timely Filing'] += 60;
      factors.push({ text: 'Claim appears past the timely filing limit (' + daysDiff + ' days since DOS, limit: ' + limit + ' days)', severity: 'high', category: 'Timely Filing' });
      actions.push('Verify filing deadline and gather proof of timely submission if available');
    } else if (daysDiff > limit - 30) {
      scores['Timely Filing'] += 30;
      factors.push({ text: 'Claim approaching timely filing deadline (' + daysDiff + ' of ' + limit + ' days)', severity: 'medium', category: 'Timely Filing' });
      actions.push('Submit claim promptly to avoid timely filing denial');
    } else if (daysDiff > limit - 90) {
      scores['Timely Filing'] += 10;
      factors.push({ text: 'Claim is within 90 days of timely filing deadline — monitor submission timeline', severity: 'low', category: 'Timely Filing' });
    }
  }

  function incorporateRuleResults(ruleResults, scores, factors, actions) {
    if (!ruleResults || !ruleResults.warnings) return;

    ruleResults.warnings.forEach(function(w) {
      var cat = w.category || 'Coding';
      if (scores[cat] !== undefined) {
        if (w.severity === 'error') {
          scores[cat] += 25;
        } else {
          scores[cat] += 10;
        }
      }

      factors.push({
        text: w.msg,
        severity: w.severity === 'error' ? 'high' : 'medium',
        category: cat,
        isRule: true
      });
    });
  }

  // ── SCORING HELPERS ───────────────────────────────────

  function calculateOverallScore(categoryScores) {
    var weights = {
      'Documentation': 0.20,
      'Coding': 0.15,
      'Medical Necessity': 0.20,
      'Authorization': 0.15,
      'Eligibility': 0.05,
      'Duplicate Claim': 0.10,
      'Modifier Review': 0.10,
      'Timely Filing': 0.05
    };

    var weightedSum = 0;
    var totalWeight = 0;

    Object.keys(weights).forEach(function(cat) {
      if (categoryScores[cat] !== undefined) {
        weightedSum += categoryScores[cat] * weights[cat];
        totalWeight += weights[cat];
      }
    });

    var raw = totalWeight > 0 ? weightedSum / totalWeight : 10;
    return Math.min(100, Math.max(0, Math.round(raw)));
  }

  function getDenialTags(categoryScores) {
    var tags = [];
    var thresholds = { high: 40, medium: 25 };

    CATEGORIES.forEach(function(cat) {
      var score = categoryScores[cat];
      if (score >= thresholds.high) {
        tags.push({ category: cat, level: 'high', score: score });
      } else if (score >= thresholds.medium) {
        tags.push({ category: cat, level: 'medium', score: score });
      }
    });

    tags.sort(function(a, b) { return b.score - a.score; });
    return tags;
  }

  function calculateConfidence(claim) {
    var score = 50; // base confidence

    // More data = higher confidence
    if (claim.clinicalNote && claim.clinicalNote.length > 100) score += 15;
    else if (claim.clinicalNote && claim.clinicalNote.length > 50) score += 8;

    if (claim.icdCodes && claim.icdCodes.length > 0) score += 5;
    if (claim.cptCodes && claim.cptCodes.length > 0) score += 5;
    if (claim.modifiers && claim.modifiers.length > 0) score += 3;
    if (claim.dos) score += 5;
    if (claim.planType) score += 5;
    if (claim.specialty) score += 3;
    if (claim.priorAuth && claim.priorAuth !== 'unknown') score += 5;

    return Math.min(95, Math.max(30, score));
  }

  function getDiagnosisDescription(code) {
    // Simple lookup for common codes
    var map = {
      'J06.9': 'acute upper respiratory infection',
      'R05.9': 'cough',
      'R50.9': 'fever',
      'I10': 'essential hypertension',
      'E11.9': 'type 2 diabetes',
      'E78.5': 'hyperlipidemia',
      'J44.1': 'chronic obstructive pulmonary disease',
      'M54.5': 'low back pain',
      'G43.909': 'migraine',
      'F32.1': 'major depressive disorder'
    };
    var clean = code.replace(/\./g, '');
    return map[clean] || '';
  }

  // ── PUBLIC API ────────────────────────────────────────

  return {
    analyze: analyze,
    CATEGORIES: CATEGORIES
  };

})();
