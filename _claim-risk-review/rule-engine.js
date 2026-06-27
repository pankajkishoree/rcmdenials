/* ═══════════════════════════════════════════════════════════
   RULE ENGINE — Deterministic Claim Validation
   Non-AI, explainable, easy to maintain
   ═══════════════════════════════════════════════════════════ */
'use strict';

var RuleEngine = (function() {

  // ── KNOWN DATA ──────────────────────────────────────────
  var VALID_MODIFIERS = [
    '24','25','26','33','50','51','59','76','77','78','79',
    '80','81','82','91','LT','RT','XE','XS','XP','XU',
    'GA','GY','GZ','QW','SA','SB','SC','SE','SF','SG','SH','SI','SJ','SL','SM','SN','T1','T2','T3'
  ];

  var HIGH_RISK_MODIFIERS = {
    '25': { desc: 'Significant, separately identifiable E/M service', requires: 'Documentation must support a separate E/M service beyond the procedure performed' },
    '59': { desc: 'Distinct procedural service', requires: 'Must document why services are distinct; consider X{E,S,P,U} modifiers instead' },
    '76': { desc: 'Repeat procedure by same physician', requires: 'Must justify medical necessity for repeating the same procedure' },
    '77': { desc: 'Repeat procedure by different physician', requires: 'Must justify medical necessity and different provider involvement' },
    '80': { desc: 'Assistant surgeon', requires: 'Must document medical necessity for assistant surgeon' },
    'GA': { desc: 'Waiver on file', requires: 'Must have signed ABN/waiver on file' },
    'GZ': { desc: 'No waiver on file', requires: 'Expected denial; ABN should be obtained' },
    'QW': { desc: 'CLIA waived test', requires: 'Must verify CLIA certificate is current' }
  };

  var PROCEDURE_AGE_RESTRICTIONS = {
    '99381': { minAge: 0, maxAge: 17, desc: 'Preventive Visit New Patient (Pediatric)' },
    '99382': { minAge: 18, maxAge: 39, desc: 'Preventive Visit New Patient (18-39)' },
    '99383': { minAge: 40, maxAge: 64, desc: 'Preventive Visit New Patient (40-64)' },
    '99384': { minAge: 65, maxAge: 120, desc: 'Preventive Visit New Patient (65+)' },
    '99391': { minAge: 0, maxAge: 17, desc: 'Preventive Visit Established (Pediatric)' },
    '99392': { minAge: 18, maxAge: 39, desc: 'Preventive Visit Established (18-39)' },
    '99393': { minAge: 40, maxAge: 64, desc: 'Preventive Visit Established (40-64)' },
    '99394': { minAge: 65, maxAge: 120, desc: 'Preventive Visit Established (65+)' },
    '90471': { minAge: 0, maxAge: 17, desc: 'Immunization Admin (Pediatric only)' },
    '90472': { minAge: 0, maxAge: 17, desc: 'Immunization Additional Vax (Pediatric only)' },
    '92002': { minAge: 0, maxAge: 17, desc: 'Eye Exam (Pediatric focus)' },
    '99213': { minAge: 0, maxAge: 120, desc: 'Office Visit Level 3' },
    '99214': { minAge: 0, maxAge: 120, desc: 'Office Visit Level 4' },
    '99215': { minAge: 0, maxAge: 120, desc: 'Office Visit Level 5' }
  };

  var MODIFIER_PAIR_CONFLICTS = [
    { mods: ['25', '59'], msg: 'Modifiers 25 and 59 together may indicate double-billing for overlapping services' },
    { mods: ['76', '77'], msg: 'Cannot use both repeat procedure modifiers on the same claim' },
    { mods: ['LT', '50'], msg: 'Modifier 50 (bilateral) and LT cannot be used together; use 50 for bilateral or LT/RT for specific side' },
    { mods: ['RT', '50'], msg: 'Modifier 50 (bilateral) and RT cannot be used together' },
    { mods: ['GA', 'GZ'], msg: 'Cannot have both waiver on file (GA) and no waiver (GZ) simultaneously' },
    { mods: ['XE', 'XS', 'XP', 'XU', '59'], msg: 'Using 59 with X-modifiers is redundant; prefer the specific X-modifier' }
  ];

  var GENDER_SPECIFIC_ICD = {
    'Z12.11': { gender: 'female', desc: 'Screening mammogram' },
    'Z12.12': { gender: 'female', desc: 'Screening for cervical cancer' },
    'Z80.3': { gender: 'female', desc: 'Family history of breast cancer' },
    'N40': { gender: 'male', desc: 'Benign prostatic hyperplasia' },
    'N41.1': { gender: 'male', desc: 'Chronic prostatitis' },
    'N47': { gender: 'male', desc: 'Phimosis' },
    'O80': { gender: 'female', desc: 'Encounter for full-term uncomplicated delivery' },
    'O09': { gender: 'female', desc: 'Supervision of pregnancy' },
    'Z33.1': { gender: 'female', desc: 'Pregnant, incidentally' }
  };

  var GENDER_SPECIFIC_CPT = {
    '58661': { gender: 'female', desc: 'Laparoscopy, tubal ligation' },
    '58662': { gender: 'female', desc: 'Laparoscopy, tubal ligation with lysis' },
    '58670': { gender: 'female', desc: 'Laparoscopy, ovarian cystectomy' },
    '55700': { gender: 'male', desc: 'Bladder examination' },
    '54200': { gender: 'male', desc: 'Penile injection therapy' }
  };

  var AUTH_REQUIRED_CPT = {
    '93306': 'Echocardiography (most payers require prior auth)',
    '93307': 'Echocardiography',
    '93303': 'Fetal echocardiography',
    '70553': 'MRI Brain with/without contrast',
    '72148': 'MRI Lumbar spine without contrast',
    '73721': 'MRI Lower extremity joint without contrast',
    '74177': 'MRI Abdomen with/without contrast',
    '71260': 'CT Chest with contrast',
    '74177': 'CT Abdomen with/without contrast',
    '90838': 'Psychotherapy with E/M (most payers require auth)',
    '96127': 'Brief emotional/behavioral assessment',
    '96130': 'Neuropsych testing (2+ hours)',
    '96131': 'Neuropsych testing (additional hour)',
    '97110': 'Therapeutic exercises (PT auth common)',
    '97112': 'Neuromuscular reeducation (PT auth common)',
    '97530': 'Therapeutic activities (PT auth common)',
    '97140': 'Manual therapy (PT auth common)',
    '99205': 'Office visit new patient level 5',
    '99215': 'Office visit established patient level 5',
    '29881': 'Knee arthroscopy with meniscectomy',
    '29880': 'Knee arthroscopy meniscectomy (medial AND lateral)'
  };

  var TIMELY_FILING_DAYS = {
    'medicare': 365,
    'medicaid': 365,
    'commercial': 365,
    'advantage': 365,
    'tricare': 365,
    'workers-comp': 90
  };

  // ── MAIN VALIDATION FUNCTION ──────────────────────────
  function validate(claim) {
    var warnings = [];
    var errors = [];

    // 1. Required field checks
    checkRequiredFields(claim, errors);

    // If there are blocking errors, return early
    if (errors.length > 0) {
      return { valid: false, errors: errors, warnings: warnings };
    }

    // 2. Modifier checks
    checkModifiers(claim, warnings, errors);

    // 3. Age-procedure checks
    checkAgeProcedure(claim, warnings);

    // 4. Gender-procedure checks
    checkGenderProcedure(claim, warnings);

    // 5. Gender-diagnosis checks
    checkGenderDiagnosis(claim, warnings);

    // 6. Prior authorization checks
    checkPriorAuth(claim, warnings);

    // 7. Timely filing check
    checkTimelyFiling(claim, warnings);

    // 8. Duplicate code checks
    checkDuplicateCodes(claim, warnings);

    // 9. Documentation completeness
    checkDocumentation(claim, warnings);

    // 10. E/M level reasonableness
    checkEMLevel(claim, warnings);

    // 11. Referral check
    checkReferral(claim, warnings);

    return {
      valid: errors.length === 0,
      errors: errors,
      warnings: warnings
    };
  }

  // ── INDIVIDUAL CHECKS ────────────────────────────────

  function checkRequiredFields(claim, errors) {
    if (!claim.icdCodes || claim.icdCodes.length === 0) {
      errors.push({ rule: 'REQUIRED_ICD', msg: 'At least one ICD-10 diagnosis code is required', severity: 'error' });
    }
    if (!claim.cptCodes || claim.cptCodes.length === 0) {
      errors.push({ rule: 'REQUIRED_CPT', msg: 'At least one CPT/HCPCS code is required', severity: 'error' });
    }
    if (!claim.age && claim.age !== 0) {
      errors.push({ rule: 'REQUIRED_AGE', msg: 'Patient age is required', severity: 'error' });
    }
    if (!claim.gender) {
      errors.push({ rule: 'REQUIRED_GENDER', msg: 'Patient gender is required', severity: 'error' });
    }
    if (!claim.dos) {
      errors.push({ rule: 'REQUIRED_DOS', msg: 'Date of service is required', severity: 'error' });
    }
    if (!claim.payer) {
      errors.push({ rule: 'REQUIRED_PAYER', msg: 'Payer is required', severity: 'error' });
    }
  }

  function checkModifiers(claim, warnings, errors) {
    var mods = claim.modifiers || [];

    // Check for invalid modifiers
    mods.forEach(function(m) {
      if (VALID_MODIFIERS.indexOf(m) === -1) {
        warnings.push({ rule: 'INVALID_MODIFIER', msg: 'Modifier <strong>' + m + '</strong> is not a recognized standard modifier', severity: 'warning', category: 'Coding' });
      }
    });

    // Check for high-risk modifiers needing documentation
    mods.forEach(function(m) {
      if (HIGH_RISK_MODIFIERS[m]) {
        warnings.push({
          rule: 'HIGH_RISK_MOD_' + m,
          msg: 'Modifier <strong>' + m + '</strong> (' + HIGH_RISK_MODIFIERS[m].desc + ') — requires: ' + HIGH_RISK_MODIFIERS[m].requires,
          severity: 'warning',
          category: 'Modifier Review'
        });
      }
    });

    // Check for modifier conflicts
    MODIFIER_PAIR_CONFLICTS.forEach(function(conflict) {
      var hasAll = conflict.mods.every(function(m) { return mods.indexOf(m) > -1; });
      if (hasAll) {
        warnings.push({ rule: 'MODIFIER_CONFLICT', msg: conflict.msg, severity: 'warning', category: 'Modifier Review' });
      }
    });

    // Modifier 25 without separate E/M code
    if (mods.indexOf('25') > -1) {
      var hasEM = (claim.cptCodes || []).some(function(c) {
        return c.match(/^99[2-3]\d{2}$/);
      });
      if (!hasEM) {
        warnings.push({ rule: 'MOD25_NO_EM', msg: 'Modifier 25 is attached but no E/M code found. Modifier 25 requires a significant, separately identifiable E/M service.', severity: 'error', category: 'Modifier Review' });
      }
    }
  }

  function checkAgeProcedure(claim, warnings) {
    var age = parseInt(claim.age);
    var cptCodes = claim.cptCodes || [];

    cptCodes.forEach(function(cpt) {
      var rule = PROCEDURE_AGE_RESTRICTIONS[cpt];
      if (rule && (age < rule.minAge || age > rule.maxAge)) {
        warnings.push({
          rule: 'AGE_PROCEDURE',
          msg: 'CPT <strong>' + cpt + '</strong> (' + rule.desc + ') — patient age <strong>' + age + '</strong> is outside typical range (' + rule.minAge + '-' + rule.maxAge + ')',
          severity: 'warning',
          category: 'Coding'
        });
      }
    });
  }

  function checkGenderProcedure(claim, warnings) {
    var gender = claim.gender;
    var cptCodes = claim.cptCodes || [];

    cptCodes.forEach(function(cpt) {
      var rule = GENDER_SPECIFIC_CPT[cpt];
      if (rule && rule.gender !== gender) {
        warnings.push({
          rule: 'GENDER_PROCEDURE',
          msg: 'CPT <strong>' + cpt + '</strong> (' + rule.desc + ') — this procedure is typically performed on <strong>' + rule.gender + '</strong> patients',
          severity: 'warning',
          category: 'Coding'
        });
      }
    });
  }

  function checkGenderDiagnosis(claim, warnings) {
    var gender = claim.gender;
    var icdCodes = claim.icdCodes || [];

    icdCodes.forEach(function(icd) {
      var cleanCode = icd.replace(/\./g, '');
      // Check prefix match (first 3 chars)
      Object.keys(GENDER_SPECIFIC_ICD).forEach(function(key) {
        var rule = GENDER_SPECIFIC_ICD[key];
        if (cleanCode.indexOf(key.replace(/\./g, '')) === 0 && rule.gender !== gender) {
          warnings.push({
            rule: 'GENDER_DIAGNOSIS',
            msg: 'ICD-10 <strong>' + icd + '</strong> (' + rule.desc + ') — typically coded for <strong>' + rule.gender + '</strong> patients',
            severity: 'warning',
            category: 'Coding'
          });
        }
      });
    });
  }

  function checkPriorAuth(claim, warnings) {
    var cptCodes = claim.cptCodes || [];
    var authStatus = claim.priorAuth;

    cptCodes.forEach(function(cpt) {
      if (AUTH_REQUIRED_CPT[cpt]) {
        if (authStatus === 'required-not-obtained') {
          warnings.push({
            rule: 'AUTH_REQUIRED',
            msg: 'CPT <strong>' + cpt + '</strong> — ' + AUTH_REQUIRED_CPT[cpt] + ' — <strong>Prior authorization not obtained</strong>',
            severity: 'error',
            category: 'Authorization'
          });
        } else if (authStatus === 'unknown') {
          warnings.push({
            rule: 'AUTH_UNKNOWN',
            msg: 'CPT <strong>' + cpt + '</strong> — ' + AUTH_REQUIRED_CPT[cpt] + ' — <strong>Verify payer prior auth requirements</strong>',
            severity: 'warning',
            category: 'Authorization'
          });
        }
      }
    });
  }

  function checkTimelyFiling(claim, warnings) {
    if (!claim.dos) return;
    var dosDate = new Date(claim.dos);
    var today = new Date();
    var daysDiff = Math.floor((today - dosDate) / (1000 * 60 * 60 * 24));
    var planType = claim.planType || 'commercial';
    var limit = TIMELY_FILING_DAYS[planType] || 365;

    if (daysDiff > limit - 30) {
      warnings.push({
        rule: 'TIMELY_FILING',
        msg: 'Days since DOS: <strong>' + daysDiff + '</strong> — approaching or past timely filing limit (' + limit + ' days for ' + planType + ')',
        severity: daysDiff > limit ? 'error' : 'warning',
        category: 'Timely Filing'
      });
    }
  }

  function checkDuplicateCodes(claim, warnings) {
    var cptCodes = claim.cptCodes || [];
    var icdCodes = claim.icdCodes || [];

    // Duplicate CPT codes
    var seen = {};
    cptCodes.forEach(function(c) {
      if (seen[c]) {
        warnings.push({ rule: 'DUPLICATE_CPT', msg: 'CPT code <strong>' + c + '</strong> appears multiple times — verify this is intentional (e.g., bilateral)', severity: 'warning', category: 'Coding' });
      }
      seen[c] = true;
    });

    // Duplicate ICD codes
    var seenICD = {};
    icdCodes.forEach(function(c) {
      if (seenICD[c]) {
        warnings.push({ rule: 'DUPLICATE_ICD', msg: 'Diagnosis code <strong>' + c + '</strong> appears multiple times', severity: 'info', category: 'Coding' });
      }
      seenICD[c] = true;
    });
  }

  function checkDocumentation(claim, warnings) {
    var note = (claim.clinicalNote || '').trim();

    if (!note || note.length < 20) {
      warnings.push({
        rule: 'NO_CLINICAL_NOTE',
        msg: 'No clinical note or description provided — strongly recommended for claim support',
        severity: 'warning',
        category: 'Documentation'
      });
    } else {
      var lower = note.toLowerCase();

      // Check for HPI elements
      if (lower.length < 50) {
        warnings.push({ rule: 'THIN_DOCUMENTATION', msg: 'Clinical note is very brief — consider adding more detail about history, exam, and medical decision-making', severity: 'warning', category: 'Documentation' });
      }

      // Check for medical necessity keywords
      var hasNecessity = lower.indexOf('medical necessity') > -1 || lower.indexOf('medically necessary') > -1 || lower.indexOf('required') > -1 || lower.indexOf('needed') > -1;
      if (!hasNecessity && claim.cptCodes && claim.cptCodes.length > 0) {
        warnings.push({ rule: 'NO_NECESSITY', msg: 'No medical necessity language found in clinical note — this is a common denial reason', severity: 'info', category: 'Documentation' });
      }

      // Check for E/M components
      var hasHPI = lower.indexOf('history') > -1 || lower.indexOf('hpi') > -1 || lower.indexOf('symptom') > -1 || lower.indexOf('complaint') > -1;
      var hasExam = lower.indexOf('exam') > -1 || lower.indexOf('examination') > -1 || lower.indexOf('findings') > -1 || lower.indexOf('auscultation') > -1 || lower.indexOf('palpation') > -1;
      var hasMDM = lower.indexOf('assessment') > -1 || lower.indexOf('plan') > -1 || lower.indexOf('diagnosis') > -1 || lower.indexOf('medical decision') > -1;

      if (!hasHPI && !hasExam && !hasMDM) {
        warnings.push({ rule: 'NO_E_M_COMPONENTS', msg: 'Clinical note may lack E/M documentation components (HPI, Exam, MDM) — critical for visit level justification', severity: 'info', category: 'Documentation' });
      } else {
        if (!hasHPI) warnings.push({ rule: 'NO_HPI', msg: 'No HPI/history elements found in clinical note', severity: 'info', category: 'Documentation' });
        if (!hasExam) warnings.push({ rule: 'NO_EXAM', msg: 'No examination elements found in clinical note', severity: 'info', category: 'Documentation' });
        if (!hasMDM) warnings.push({ rule: 'NO_MDM', msg: 'No assessment/plan/MDM elements found in clinical note', severity: 'info', category: 'Documentation' });
      }
    }
  }

  function checkEMLevel(claim, warnings) {
    var cptCodes = claim.cptCodes || [];
    var note = (claim.clinicalNote || '').toLowerCase();

    // Flag high-level E/M codes with thin documentation
    var highLevelEM = cptCodes.filter(function(c) { return c === '99214' || c === '99215' || c === '99204' || c === '99205'; });
    if (highLevelEM.length > 0 && note.length < 100) {
      warnings.push({
        rule: 'HIGH_EM_THIN_DOC',
        msg: 'High-level E/M code(s) <strong>' + highLevelEM.join(', ') + '</strong> with brief documentation — E/M level must be supported by documentation complexity',
        severity: 'warning',
        category: 'Documentation'
      });
    }

    // Check for multiple E/M codes on same day
    var emCodes = cptCodes.filter(function(c) { return c.match(/^99[2-3]\d{2}$/); });
    if (emCodes.length > 1) {
      warnings.push({
        rule: 'MULTIPLE_EM',
        msg: 'Multiple E/M codes on the same date of service: <strong>' + emCodes.join(', ') + '</strong> — verify distinct services or use modifier 25',
        severity: 'warning',
        category: 'Coding'
      });
    }
  }

  function checkReferral(claim, warnings) {
    if (claim.referralRequired === 'yes' && claim.priorAuth !== 'obtained') {
      warnings.push({
        rule: 'REFERRAL_NEEDED',
        msg: 'Referral is required but prior authorization status is not "obtained" — verify referral is on file',
        severity: 'warning',
        category: 'Authorization'
      });
    }
  }

  return { validate: validate };

})();
