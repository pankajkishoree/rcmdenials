/* ═══════════════════════════════════════════════════════════
   COMPLIANCE ENGINE — 5-Area Coding Compliance Analysis
   1. ICD-CPT Validation
   2. Modifier Compliance
   3. Medical Necessity
   4. NCCI Edits
   5. LCD/NCD Coverage
   ═══════════════════════════════════════════════════════════ */
'use strict';

var ComplianceEngine = (function() {

  // E/M code to complexity mapping
  var emLevels = {
    '99202': { level: 'level1', mdm: 'straightforward', pts: 'low' },
    '99203': { level: 'level2', mdm: 'low', pts: 'moderate' },
    '99204': { level: 'level3', mdm: 'moderate', pts: 'high' },
    '99205': { level: 'level4', mdm: 'high', pts: 'high' },
    '99212': { level: 'level1', mdm: 'straightforward', pts: 'low' },
    '99213': { level: 'level2', mdm: 'low', pts: 'low' },
    '99214': { level: 'level3', mdm: 'moderate', pts: 'moderate' },
    '99215': { level: 'level4', mdm: 'high', pts: 'moderate' }
  };

  // Modifier 25 scenarios — E/M + Procedure
  var modifier25Triggers = {
    emCodes: ['99202','99203','99204','99205','99211','99212','99213','99214','99215','99381','99382','99383','99384','99385','99386','99387','99391','99392','99393','99394','99395','99396','99397'],
    procedureCPTs: [
      '11042','11043','11044','11045','11046',
      '17000','17001','17002','17003','17004',
      '20610','20611',
      '20550','20551','20552','20553',
      '20600','20604','20605','20606',
      '21501','21502',
      '29805','29806','29807','29819','29820','29821','29822','29823','29824','29825','29826','29827','29828',
      '29881','29882','29883','29884','29885','29886','29887',
      '36000','36002','36003','36005','36010','36011','36012','36013','36014','36015',
      '43239','43249','43250','43251','43255','43259',
      '45378','45380','45384','45385',
      '64450','64455','64461','64462','64463','64466','64467','64468','64470','64471','64472','64473','64474','64475','64476','64479','64480','64481','64483','64484','64487','64488','64489','64490','64493','64494','64495',
      '96372','96374','96375','96376',
      '97110','97112','97140','97530','97533','97542',
      '97810','97811','97813','97814',
      '99213','99214','99215'
    ]
  };

  // ── ICD-CPT Linkage Helper ─────────────────────────────
  // Maps ICD chapter prefixes to common CPT ranges for basic linkage check
  var icdCPTMap = {
    'M':  'musculoskeletal',   // M00-M99 musculoskeletal
    'S':  'musculoskeletal',   // S00-S99 injury
    'J':  'respiratory',       // J00-J99 respiratory
    'I':  'cardiovascular',    // I00-I99 circulatory
    'K':  'digestive',         // K00-K93 digestive
    'G':  'neurological',      // G00-G99 nervous system
    'E':  'endocrine',         // E00-E89 endocrine/metabolic
    'N':  'genitourinary',     // N00-N99 genitourinary
    'F':  'behavioral',        // F01-F99 mental/behavioral
    'C':  'oncology',          // C00-D49 neoplasms
    'D':  'oncology',          // C00-D49 neoplasms (blood)
    'L':  'dermatologic',      // L00-L99 skin
    'H':  'sensory',           // H00-H59 eye/ear
    'R':  'symptoms',          // R00-R99 symptoms
    'Z':  'preventive',        // Z00-Z99 preventive/external
    'O':  'obstetric',         // O00-O9A pregnancy
    'P':  'perinatal',         // P00-P96 perinatal
    'Q':  'congenital',        // Q00-Q99 congenital
    'V':  'external',          // V00-Y99 external causes
    'W':  'external',
    'X':  'external',
    'Y':  'external'
  };

  var cptCategoryMap = {
    'musculoskeletal': ['20000','29999','97001','98999'],
    'respiratory':     ['30000','32999','94000','94799','96000','96099'],
    'cardiovascular':  ['33016','37799','93000','93799'],
    'digestive':       ['40000','49999'],
    'neurological':    ['61000','64999','95000','95999'],
    'endocrine':       ['80000','89399'],
    'genitourinary':   ['50010','53899'],
    'dermatologic':    ['10000','19999'],
    'sensory':         ['92000','92499'],
    'behavioral':      ['90800','90999','96000','96399'],
    'oncology':        ['80000','89399'],
    'preventive':      ['99381','99499'],
    'obstetric':       ['59000','59899'],
    'symptoms':        ['80000','89399']
  };

  function simpleICDCPTLink(icdCode, cptCode) {
    if (!icdCode || !cptCode) return false;
    var firstChar = icdCode.charAt(0).toUpperCase();
    var chapter = icdCPTMap[firstChar];
    if (!chapter) return true; // Unknown chapter — don't flag
    var ranges = cptCategoryMap[chapter];
    if (!ranges) return true;
    var numCPT = parseInt(cptCode, 10);
    for (var i = 0; i < ranges.length; i += 2) {
      var low = parseInt(ranges[i], 10);
      var high = parseInt(ranges[i + 1], 10);
      if (numCPT >= low && numCPT <= high) return true;
    }
    // Special: E/M codes (99202-99215, 99381-99499) link to anything
    var emNum = numCPT;
    if ((emNum >= 99202 && emNum <= 99215) || (emNum >= 99381 && emNum <= 99499)) return true;
    // Lab codes (80000-89399) link to anything
    if (emNum >= 80000 && emNum <= 89399) return true;
    return false;
  }

  // ── AREA 1: ICD-CPT Validation ─────────────────────────
  function validateICDCPT(icdCodes, cptCodes, modifiers, specialty) {
    var issues = [];
    var cptList = cptCodes.filter(function(c) { return c.trim() !== ''; });
    var icdList = icdCodes.filter(function(c) { return c.trim() !== ''; });
    var modList = modifiers.map(function(m) { return m.code ? m.code.trim() : ''; }).filter(function(m) { return m !== ''; });

    // Check: No CPT codes
    if (cptList.length === 0) {
      issues.push({
        severity: 'error',
        category: 'ICD-CPT',
        title: 'No CPT Codes Provided',
        body: 'At least one CPT code is required for claim submission.',
        codes: []
      });
    }

    // Check: No ICD codes
    if (icdList.length === 0) {
      issues.push({
        severity: 'error',
        category: 'ICD-CPT',
        title: 'No ICD-10 Codes Provided',
        body: 'At least one ICD-10 diagnosis code is required to support medical necessity for CPT codes.',
        codes: cptList
      });
    }

    // Check: CPT codes without ICD support
    if (icdList.length > 0 && cptList.length > 0) {
      var unlinked = [];
      cptList.forEach(function(cpt) {
        var cleanCPT = cpt.replace(/[^0-9]/g, '');
        var linked = false;
        icdList.forEach(function(icd) {
          var cleanICD = icd.replace(/[^A-Z0-9]/g, '');
          if (simpleICDCPTLink(cleanICD, cleanCPT)) {
            linked = true;
          }
        });
        if (!linked) {
          unlinked.push(cpt);
        }
      });
      if (unlinked.length > 0 && icdList.length > 0) {
        issues.push({
          severity: 'warning',
          category: 'ICD-CPT',
          title: 'Weak ICD-CPT Linkage Detected',
          body: 'These CPT codes may not have strong clinical linkage to the provided ICD-10 diagnoses. Review for medical necessity.',
          codes: unlinked
        });
      }
    }

    // Check: Duplicate CPT codes
    var cptCounts = {};
    cptList.forEach(function(c) {
      cptCounts[c] = (cptCounts[c] || 0) + 1;
    });
    var duplicates = Object.keys(cptCounts).filter(function(c) { return cptCounts[c] > 1; });
    if (duplicates.length > 0) {
      issues.push({
        severity: 'error',
        category: 'ICD-CPT',
        title: 'Duplicate CPT Codes Detected',
        body: 'These CPT codes appear multiple times. Unless distinct services on different dates/sites, duplicates will cause rejection.',
        codes: duplicates
      });
    }

    // Check: Duplicate ICD codes
    var icdCounts = {};
    icdList.forEach(function(c) {
      icdCounts[c] = (icdCounts[c] || 0) + 1;
    });
    var icdDups = Object.keys(icdCounts).filter(function(c) { return icdCounts[c] > 1; });
    if (icdDups.length > 0) {
      issues.push({
        severity: 'info',
        category: 'ICD-CPT',
        title: 'Duplicate ICD-10 Codes',
        body: 'These ICD-10 codes appear multiple times. Duplicates are typically unnecessary.',
        codes: icdDups
      });
    }

    return issues;
  }

  // ── AREA 2: Modifier Compliance ────────────────────────
  function checkModifiers(cptCodes, modifiers) {
    var issues = [];
    var cptList = cptCodes.filter(function(c) { return c.trim() !== ''; });

    // Check: Modifiers without CPT codes
    var modsUsed = modifiers.filter(function(m) { return m.code && m.code.trim() !== ''; });
    if (modsUsed.length === 0 && cptList.length > 0) {
      // Check if any CPT needs modifiers
      cptList.forEach(function(cpt) {
        var reqs = NCCIEDits.getCPTModifierRequirements().filter(function(r) { return r.cpt === cpt; });
        if (reqs.length > 0) {
          issues.push({
            severity: 'warning',
            category: 'modifier',
            title: 'Missing Modifier — ' + cpt,
            body: 'CPT ' + cpt + ' may require a modifier. ' + reqs[0].desc,
            codes: [cpt]
          });
        }
      });
    }

    // Check: Modifier 25 with E/M + Procedure
    var emCodes = [];
    var procCodes = [];
    cptList.forEach(function(cpt) {
      if (modifier25Triggers.emCodes.indexOf(cpt) !== -1) emCodes.push(cpt);
      else procCodes.push(cpt);
    });

    if (emCodes.length > 0 && procCodes.length > 0) {
      var hasMod25 = modifiers.some(function(m) { return m.code === '25'; });
      if (!hasMod25) {
        issues.push({
          severity: 'error',
          category: 'modifier',
          title: 'Modifier 25 Likely Required',
          body: 'E/M code(s) ' + emCodes.join(', ') + ' billed with procedure(s) ' + procCodes.join(', ') + ' on same date. Modifier 25 is required to indicate a separately identifiable E/M service.',
          codes: emCodes.concat(procCodes)
        });
      }
    }

    // Check: Modifier 59 for NCCI edits
    var pairedCPTs = [];
    for (var i = 0; i < cptList.length; i++) {
      for (var j = i + 1; j < cptList.length; j++) {
        var edit = NCCIEDits.findEdit(cptList[i], cptList[j]);
        if (edit && edit.modifierAllowed) {
          var hasMod59 = modifiers.some(function(m) { return m.code === '59' || m.code === 'XE' || m.code === 'XS' || m.code === 'XP' || m.code === 'XU'; });
          if (!hasMod59) {
            pairedCPTs.push({ pair: [cptList[i], cptList[j]], edit: edit });
          }
        }
      }
    }
    pairedCPTs.forEach(function(p) {
      issues.push({
        severity: 'warning',
        category: 'modifier',
        title: 'NCCI Edit — Modifier 59 May Override Bundle',
        body: 'CPT ' + p.pair[0] + ' and ' + p.pair[1] + ' are bundled per NCCI. ' + p.edit.desc + '. If services are truly separate, use modifier 59 (or XE/XS/XP/XU).',
        codes: p.pair
      });
    });

    // Check: Bilateral codes without side modifier
    var bilateralCPTs = ['29880','29881','29882','27447','27130','43644','49505','64483','64484','64487','64488','64489'];
    cptList.forEach(function(cpt) {
      if (bilateralCPTs.indexOf(cpt) !== -1) {
        var hasLT = modifiers.some(function(m) { return m.code === 'LT'; });
        var hasRT = modifiers.some(function(m) { return m.code === 'RT'; });
        var has50 = modifiers.some(function(m) { return m.code === '50'; });
        if (!hasLT && !hasRT && !has50) {
          issues.push({
            severity: 'warning',
            category: 'modifier',
            title: 'Bilateral Procedure Without Side Modifier',
            body: 'CPT ' + cpt + ' typically requires LT, RT, or modifier 50 to indicate laterality.',
            codes: [cpt]
          });
        }
      }
    });

    return issues;
  }

  // ── AREA 3: Medical Necessity ──────────────────────────
  function checkNecessity(icdCodes, cptCodes, age, gender, specialty) {
    var issues = [];
    var cptList = cptCodes.filter(function(c) { return c.trim() !== ''; });
    var icdList = icdCodes.filter(function(c) { return c.trim() !== ''; });

    // Check: Pediatric codes on adult
    if (age && age >= 18) {
      var pediatricCPTs = cptList.filter(function(c) {
        var clean = c.replace(/[^0-9]/g, '');
        return clean.indexOf('99216') === 0 || clean.indexOf('99217') === 0;
      });
      if (pediatricCPTs.length > 0) {
        issues.push({
          severity: 'warning',
          category: 'necessity',
          title: 'Pediatric Code on Adult Patient',
          body: 'Patient age ' + age + ' — these CPT codes are intended for pediatric patients.',
          codes: pediatricCPTs
        });
      }
    }

    // Check: Gender-specific codes
    var genderMismatch = {
      'male': ['58661','58662','58663','58670','58671','58672','58673','58674','58675','58676','58677','58678','58679','58680','58681','58682','58683','58684','58685','58686','58700','58720','58740','58750','58760','58770','58780','58800','58805','58810','58820','58825','58870','58875','58880','58885','58890','58895'],
      'female': ['55250','55251','55300','55310','55320','55330','55350','55390','55400','55520','55530','55535','55540','55550','55559','55560','55569','55570','55579','55580','55589','55590','55599','55600','55605','55610','55615','55620','55625','55630','55635','55640','55645','55650','55655','55660','55665','55670','55680','55690','55700','55705','55710','55715','55720','55725','55730','55735','55740','55750','55760','55770','55780','55790','55800','55810','55820','55830','55840','55845','55860','55865','55870','55875']
    };

    if (gender) {
      var genderKey = gender.toLowerCase();
      if (genderMismatch[genderKey]) {
        var mismatched = cptList.filter(function(c) {
          return genderMismatch[genderKey].indexOf(c) !== -1;
        });
        if (mismatched.length > 0) {
          issues.push({
            severity: 'error',
            category: 'necessity',
            title: 'Gender-Inappropriate Procedure',
            body: 'Patient gender: ' + gender + ' — these CPT codes are specific to the opposite gender.',
            codes: mismatched
          });
        }
      }
    }

    // Check: Age-specific ICD-CPT conflicts
    if (age && age < 18) {
      var adultOnlyCPTs = cptList.filter(function(c) {
        return ['43239','43249','45378','45380','45385'].indexOf(c) !== -1;
      });
      if (adultOnlyCPTs.length > 0) {
        issues.push({
          severity: 'warning',
          category: 'necessity',
          title: 'Adult Procedure on Pediatric Patient',
          body: 'Patient age ' + age + ' — these endoscopy codes may require pediatric-specific indications.',
          codes: adultOnlyCPTs
        });
      }
    }

    // Check: ICD-CPT incompatibilities
    if (icdList.length > 0) {
      cptList.forEach(function(cpt) {
        var conflicts = NCCIEDits.findConflicts(cpt, icdList);
        conflicts.forEach(function(conflict) {
          issues.push({
            severity: 'warning',
            category: 'necessity',
            title: 'ICD-CPT Mismatch — ' + cpt,
            body: conflict.reason,
            codes: [cpt]
          });
        });
      });
    }

    return issues;
  }

  // ── AREA 4: NCCI Edits ────────────────────────────────
  function checkNCCIEdits(cptCodes, modifiers) {
    var issues = [];
    var cptList = cptCodes.filter(function(c) { return c.trim() !== ''; });

    for (var i = 0; i < cptList.length; i++) {
      for (var j = i + 1; j < cptList.length; j++) {
        var edit = NCCIEDits.findEdit(cptList[i], cptList[j]);
        if (edit) {
          if (!edit.modifierAllowed) {
            issues.push({
              severity: 'error',
              category: 'ncci',
              title: 'NCCI Mutually Exclusive Edit',
              body: 'CPT ' + cptList[i] + ' and ' + cptList[j] + ' are mutually exclusive per NCCI. ' + edit.desc + '. Cannot be billed together even with a modifier.',
              codes: [cptList[i], cptList[j]]
            });
          } else {
            var hasOverride = modifiers.some(function(m) {
              return m.code === '59' || m.code === 'XE' || m.code === 'XS' || m.code === 'XP' || m.code === 'XU';
            });
            if (hasOverride) {
              issues.push({
                severity: 'info',
                category: 'ncci',
                title: 'NCCI Edit — Modifier Override Used',
                body: 'CPT ' + cptList[i] + ' and ' + cptList[j] + ' are bundled per NCCI. ' + edit.desc + '. A modifier (59/XE/XS/XP/XU) is being used to override. Ensure services are truly separate.',
                codes: [cptList[i], cptList[j]]
              });
            }
          }
        }
      }
    }

    return issues;
  }

  // ── AREA 5: LCD/NCD Coverage ───────────────────────────
  function checkLCDNCD(icdCodes, cptCodes, payer) {
    var issues = [];
    var cptList = cptCodes.filter(function(c) { return c.trim() !== ''; });
    var icdList = icdCodes.filter(function(c) { return c.trim() !== ''; });

    cptList.forEach(function(cpt) {
      var lcdRules = NCCIEDits.findLCDNCD(cpt, icdList);
      lcdRules.forEach(function(rule) {
        issues.push({
          severity: rule.covered ? 'info' : 'warning',
          category: 'lcd',
          title: rule.desc,
          body: 'LCD/NCD: ' + rule.lcd + '. ' + (rule.conditions || ''),
          codes: [cpt]
        });
      });
    });

    // Payer-specific warnings
    if (payer) {
      var payerLower = payer.toLowerCase();
      var payerWarnings = {
        'medicare': { cpt: '70553', msg: 'Medicare requires prior authorization for certain MRI studies' },
        'medicaid': { cpt: '45378', msg: 'Medicaid may require prior authorization for colonoscopy' },
        'unitedhealthcare': { cpt: '29881', msg: 'UHC may require prior authorization for knee arthroscopy' },
        'aetna': { cpt: '72148', msg: 'Aetna may require prior authorization for lumbar MRI' },
        'cigna': { cpt: '43239', msg: 'Cigna may require prior authorization for upper endoscopy' }
      };

      Object.keys(payerWarnings).forEach(function(key) {
        if (payerLower.indexOf(key) !== -1 || payerLower.indexOf(key.substring(0, 4)) !== -1) {
          var warn = payerWarnings[key];
          if (cptList.indexOf(warn.cpt) !== -1) {
            issues.push({
              severity: 'info',
              category: 'lcd',
              title: 'Payer-Specific Requirement — ' + payer,
              body: warn.msg,
              codes: [warn.cpt]
            });
          }
        }
      });
    }

    return issues;
  }

  // ── MAIN ANALYSIS ORCHESTRATOR ─────────────────────────
  function analyze(inputs) {
    var icdCodes = inputs.icdCodes || [];
    var cptCodes = inputs.cptCodes || [];
    var modifiers = inputs.modifiers || [];
    var specialty = inputs.specialty || '';
    var payer = inputs.payer || '';
    var pos = inputs.pos || '';
    var age = inputs.age ? parseInt(inputs.age, 10) : null;
    var gender = inputs.gender || null;

    // Run all 5 areas
    var area1 = validateICDCPT(icdCodes, cptCodes, modifiers, specialty);
    var area2 = checkModifiers(cptCodes, modifiers);
    var area3 = checkNecessity(icdCodes, cptCodes, age, gender, specialty);
    var area4 = checkNCCIEdits(cptCodes, modifiers);
    var area5 = checkLCDNCD(icdCodes, cptCodes, payer);

    var allIssues = area1.concat(area2, area3, area4, area5);

    // Category scores
    var categories = {
      'ICD-CPT Validation': calculateCategoryScore(area1),
      'Modifier Compliance': calculateCategoryScore(area2),
      'Medical Necessity': calculateCategoryScore(area3),
      'NCCI Edits': calculateCategoryScore(area4),
      'LCD/NCD Coverage': calculateCategoryScore(area5)
    };

    // Overall score
    var overallScore = calculateOverallScore(categories);

    // Compliance level
    var level;
    if (overallScore >= 85) level = 'low';
    else if (overallScore >= 60) level = 'medium';
    else level = 'high';

    // Generate recommended actions
    var actions = generateActions(allIssues);

    // Generate code analysis
    var codeAnalysis = analyzeCodes(cptCodes, modifiers);

    // Estimate confidence
    var confidence = estimateConfidence(icdCodes, cptCodes, specialty, payer);

    return {
      overallScore: overallScore,
      level: level,
      categories: categories,
      issues: allIssues,
      actions: actions,
      codeAnalysis: codeAnalysis,
      confidence: confidence
    };
  }

  function calculateCategoryScore(issues) {
    if (issues.length === 0) return 100;
    var errorCount = issues.filter(function(i) { return i.severity === 'error'; }).length;
    var warningCount = issues.filter(function(i) { return i.severity === 'warning'; }).length;
    var infoCount = issues.filter(function(i) { return i.severity === 'info'; }).length;
    var deductions = (errorCount * 20) + (warningCount * 10) + (infoCount * 2);
    return Math.max(0, 100 - deductions);
  }

  function calculateOverallScore(categories) {
    var keys = Object.keys(categories);
    var total = 0;
    keys.forEach(function(k) { total += categories[k]; });
    return Math.round(total / keys.length);
  }

  function generateActions(issues) {
    var actions = [];
    var sorted = issues.slice().sort(function(a, b) {
      var order = { error: 0, warning: 1, info: 2 };
      return order[a.severity] - order[b.severity];
    });

    var seen = {};
    sorted.forEach(function(issue) {
      var key = issue.title + issue.category;
      if (!seen[key]) {
        actions.push({
          text: issue.body.length > 200 ? issue.body.substring(0, 200) + '...' : issue.body,
          severity: issue.severity,
          category: issue.category
        });
        seen[key] = true;
      }
    });

    return actions.slice(0, 15);
  }

  function analyzeCodes(cptCodes, modifiers) {
    var cptList = cptCodes.filter(function(c) { return c.trim() !== ''; });
    return cptList.map(function(cpt) {
      var cleanCPT = cpt.replace(/[^0-9]/g, '');
      var mod = modifiers.find(function(m) { return m.code && m.code.trim() !== ''; });
      var modCode = mod ? mod.code.trim() : null;
      var reqs = NCCIEDits.getCPTModifierRequirements().filter(function(r) { return r.cpt === cleanCPT; });

      var status = 'valid';
      var desc = 'No known bundling or compliance issues';

      if (reqs.length > 0) {
        if (!modCode || reqs[0].mods.indexOf(modCode) === -1) {
          status = 'warning';
          desc = reqs[0].desc;
        }
      }

      // Check for NCCI involvement
      var ncciInvolved = false;
      cptList.forEach(function(other) {
        if (other !== cpt) {
          var edit = NCCIEDits.findEdit(cleanCPT, other.replace(/[^0-9]/g, ''));
          if (edit) ncciInvolved = true;
        }
      });
      if (ncciInvolved && status === 'valid') {
        status = 'info';
        desc = 'Part of NCCI edit pair — verify bundling rules';
      }

      return {
        value: cpt,
        description: desc,
        status: status,
        modifier: modCode
      };
    });
  }

  function estimateConfidence(icdCodes, cptCodes, specialty, payer) {
    var score = 70;
    if (icdCodes.length >= 2) score += 10;
    if (cptCodes.length >= 1 && cptCodes.length <= 5) score += 10;
    if (specialty) score += 5;
    if (payer) score += 5;
    return Math.min(score, 95);
  }

  return {
    analyze: analyze,
    validateICDCPT: validateICDCPT,
    checkModifiers: checkModifiers,
    checkNecessity: checkNecessity,
    checkNCCIEdits: checkNCCIEdits,
    checkLCDNCD: checkLCDNCD
  };

})();
