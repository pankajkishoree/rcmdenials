/* ═══════════════════════════════════════════════════════════
   NCCI EDITS DATABASE — Common Bundling Rules
   Column 1 / Column 2 pairs with modifier indicators
   ═══════════════════════════════════════════════════════════ */
'use strict';

var NCCIEDits = (function() {

  // NCCI Column 1 / Column 2 edit pairs
  // modifierAllowed: true = modifier can override the bundle
  // modifierAllowed: false = always bundled (mutually exclusive)
  var edits = [
    // E/M + Procedure bundling
    { col1: '99213', col2: '99214', desc: 'Office visit levels — cannot bill higher and lower level on same date', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '99214', col2: '99215', desc: 'Office visit levels — cannot bill higher and lower level on same date', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '99213', col2: '99215', desc: 'Office visit levels — cannot bill higher and lower level on same date', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '99203', col2: '99204', desc: 'New patient visit levels — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '99204', col2: '99205', desc: 'New patient visit levels — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '99385', col2: '99386', desc: 'Preventive visit levels — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },

    // Knee arthroscopy
    { col1: '29881', col2: '29887', desc: 'Knee arthroscopy meniscectomy and chondroplasty — typically bundled', modifierAllowed: true, type: 'bundled' },
    { col1: '29881', col2: '29882', desc: 'Knee arthroscopy meniscectomy and meniscus repair — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '29880', col2: '29881', desc: 'Knee arthroscopy bilateral vs unilateral meniscectomy — use modifier 50', modifierAllowed: true, type: 'bundled' },
    { col1: '29880', col2: '29877', desc: 'Knee arthroscopy meniscectomy and chondroplasty — bundled', modifierAllowed: true, type: 'bundled' },

    // Shoulder arthroscopy
    { col1: '29827', col2: '29826', desc: 'Shoulder arthroscopy rotator cuff and acromioplasty — bundled', modifierAllowed: true, type: 'bundled' },
    { col1: '29827', col2: '29828', desc: 'Shoulder arthroscopy biceps tenodesis — bundled', modifierAllowed: true, type: 'bundled' },

    // Cardiac catheterization
    { col1: '93458', col2: '93459', desc: 'Cardiac catheterization with left heart — right heart bundled', modifierAllowed: false, type: 'bundled' },
    { col1: '93460', col2: '93461', desc: 'Cardiac catheterization with right and left heart — combined', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '93015', col2: '93016', desc: 'Cardiovascular stress test components — bundled', modifierAllowed: false, type: 'bundled' },
    { col1: '93015', col2: '93018', desc: 'Cardiovascular stress test components — bundled', modifierAllowed: false, type: 'bundled' },

    // Lab bundling
    { col1: '80053', col2: '82947', desc: 'Comprehensive metabolic panel includes glucose — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84443', desc: 'CMP includes total protein — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84445', desc: 'CMP includes albumin — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '82310', desc: 'CMP includes calcium — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '82948', desc: 'CMP includes BUN — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84132', desc: 'CMP includes total protein — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84133', desc: 'CMP includes AST — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84134', desc: 'CMP includes total bilirubin — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84135', desc: 'CMP includes alkaline phosphatase — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84136', desc: 'CMP includes creatinine — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80053', col2: '84137', desc: 'CMP includes electrolytes — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '85025', col2: '85027', desc: 'CBC with differential vs without — do not bill both', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '80061', col2: '82465', desc: 'Lipid panel includes cholesterol — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80061', col2: '84478', desc: 'Lipid panel includes triglycerides — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80061', col2: '83718', desc: 'Lipid panel includes LDL — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80061', col2: '83719', desc: 'Lipid panel includes VLDL — do not separately bill', modifierAllowed: false, type: 'bundled' },
    { col1: '80061', col2: '84479', desc: 'Lipid panel includes HDL — do not separately bill', modifierAllowed: false, type: 'bundled' },

    // Radiology bundling
    { col1: '70553', col2: '70551', desc: 'MRI brain with and without contrast — do not bill both', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '70553', col2: '70552', desc: 'MRI brain with/without contrast — do not bill standalone', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '72148', col2: '72149', desc: 'MRI lumbar spine with and without contrast — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '73721', col2: '73722', desc: 'MRI lower extremity joint with and without contrast — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '74177', col2: '74178', desc: 'MRI abdomen with and without contrast — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '71260', col2: '71270', desc: 'CT chest with and without contrast — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },

    // E/M + Lab bundling
    { col1: '99213', col2: '85025', desc: 'Office visit does not include CBC — may be separately billable with modifier', modifierAllowed: true, type: 'bundled' },
    { col1: '99214', col2: '85025', desc: 'Office visit does not include CBC — may be separately billable with modifier', modifierAllowed: true, type: 'bundled' },

    // PT bundling
    { col1: '97110', col2: '97112', desc: 'Therapeutic exercises and neuromuscular reeducation — typically bundled per session', modifierAllowed: true, type: 'bundled' },
    { col1: '97110', col2: '97530', desc: 'Therapeutic exercises and activities — may be bundled per session', modifierAllowed: true, type: 'bundled' },
    { col1: '97140', col2: '97530', desc: 'Manual therapy and therapeutic activities — may be bundled', modifierAllowed: true, type: 'bundled' },
    { col1: '97112', col2: '97530', desc: 'Neuromuscular reeducation and therapeutic activities — may be bundled', modifierAllowed: true, type: 'bundled' },

    // Surgery bundling
    { col1: '43644', col2: '43645', desc: 'Laparoscopic gastric bypass components — bundled', modifierAllowed: false, type: 'bundled' },
    { col1: '27447', col2: '27446', desc: 'Total knee replacement components — bundled', modifierAllowed: false, type: 'bundled' },
    { col1: '27130', col2: '27125', desc: 'Total hip replacement components — bundled', modifierAllowed: false, type: 'bundled' },
    { col1: '49505', col2: '49568', desc: 'Inguinal hernia repair components — bundled', modifierAllowed: true, type: 'bundled' },

    // Endoscopy bundling
    { col1: '45378', col2: '45380', desc: 'Colonoscopy with biopsy — biopsy bundled into colonoscopy', modifierAllowed: false, type: 'bundled' },
    { col1: '45378', col2: '45385', desc: 'Colonoscopy with tumor removal — polypectomy bundled', modifierAllowed: false, type: 'bundled' },
    { col1: '45380', col2: '45385', desc: 'Colonoscopy biopsy vs polypectomy — cannot bill both', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '43239', col2: '43249', desc: 'Upper endoscopy biopsy vs lesion removal — bundled', modifierAllowed: false, type: 'bundled' },

    // Injection bundling
    { col1: '20610', col2: '20611', desc: 'Joint injection with and without ultrasound — use 20611 when US guided', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '20604', col2: '20606', desc: 'Arthrocentesis with and without ultrasound — use 20606 when US guided', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '20600', col2: '20604', desc: 'Arthrocentesis with and without aspiration — bundled', modifierAllowed: false, type: 'bundled' },

    // Wound care bundling
    { col1: '11042', col2: '11043', desc: 'Debridement depth levels — cannot bill both depth levels on same wound', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '11043', col2: '11044', desc: 'Debridement depth levels — cannot bill both depth levels on same wound', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '11042', col2: '11044', desc: 'Debridement depth levels — cannot bill both depth levels on same wound', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '11045', col2: '11046', desc: 'Debridement depth levels per wound — cannot bill both', modifierAllowed: false, type: 'mutually-exclusive' },

    // Skin lesion bundling
    { col1: '17000', col2: '17003', desc: 'Destruction of skin lesions — cannot bill multiple destruction codes for same lesion', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '17000', col2: '17004', desc: 'Destruction of skin lesions — cannot bill multiple destruction codes for same lesion', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '11102', col2: '11103', desc: 'Tangential biopsy of skin — single vs multiple specimens', modifierAllowed: false, type: 'bundled' },
    { col1: '11104', col2: '11105', desc: 'Punch biopsy of skin — single vs multiple specimens', modifierAllowed: false, type: 'bundled' },
    { col1: '11106', col2: '11107', desc: 'Incisional biopsy of skin — single vs multiple specimens', modifierAllowed: false, type: 'bundled' },

    // Eye bundling
    { col1: '92002', col2: '92004', desc: 'Comprehensive eye exam new vs established — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '92004', col2: '92014', desc: 'Comprehensive eye exam — new vs established patient', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '92012', col2: '92014', desc: 'Eye exam levels — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '92250', col2: '92255', desc: 'Fundus photography — single vs multi-field', modifierAllowed: false, type: 'mutually-exclusive' },

    // Neurology bundling
    { col1: '95907', col2: '95908', desc: 'Nerve conduction studies — cannot bill different duration levels', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '95908', col2: '95909', desc: 'Nerve conduction studies — cannot bill different duration levels', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '95910', col2: '95911', desc: 'Nerve conduction studies — cannot bill different duration levels', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '95912', col2: '95913', desc: 'Nerve conduction studies — cannot bill different duration levels', modifierAllowed: false, type: 'mutually-exclusive' },

    // Psychotherapy bundling
    { col1: '90832', col2: '90833', desc: 'Psychotherapy 30 min vs add-on — cannot bill standalone with add-on', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '90834', col2: '90836', desc: 'Psychotherapy 45 min vs add-on — cannot bill standalone with add-on', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '90837', col2: '90838', desc: 'Psychotherapy 60 min vs add-on — cannot bill standalone with add-on', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '90832', col2: '90834', desc: 'Psychotherapy duration levels — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '90834', col2: '90837', desc: 'Psychotherapy duration levels — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' },
    { col1: '90832', col2: '90837', desc: 'Psychotherapy duration levels — mutually exclusive', modifierAllowed: false, type: 'mutually-exclusive' }
  ];

  // ICD-CPT incompatibility patterns
  // When a CPT code is commonly denied with certain ICD categories
  var icdCptConflicts = [
    { cpt: '29881', icdPrefix: ['J06', 'J20', 'R05'], reason: 'Knee arthroscopy with respiratory diagnosis — no clinical correlation' },
    { cpt: '29881', icdPrefix: ['I10', 'I25'], reason: 'Knee arthroscopy with cardiovascular diagnosis — unlikely medical necessity' },
    { cpt: '70553', icdPrefix: ['M54', 'M51'], reason: 'MRI brain with spinal diagnosis — wrong imaging study for the diagnosis' },
    { cpt: '72148', icdPrefix: ['R51', 'G43'], reason: 'MRI lumbar spine with headache/migraine diagnosis — wrong region' },
    { cpt: '99215', icdPrefix: ['Z00', 'Z01'], reason: 'High-level E/M with preventive visit code — may need preventive code instead' },
    { cpt: '43239', icdPrefix: ['J06', 'R05'], reason: 'Upper endoscopy with upper respiratory diagnosis — no GI correlation' },
    { cpt: '45378', icdPrefix: ['K21'], reason: 'Colonoscopy with GERD diagnosis — upper GI scope may be more appropriate' },
    { cpt: '93306', icdPrefix: ['M54', 'M79'], reason: 'Echocardiography with musculoskeletal diagnosis — cardiac study unlikely indicated' },
    { cpt: '97110', icdPrefix: ['I69', 'G81'], reason: 'Therapeutic exercises with stroke/hemiplegia — may need more specific PT codes' }
  ];

  // CPT codes that commonly require specific modifiers
  var cptModifierRequirements = [
    { cpt: '99213', mods: ['25'], when: 'with procedure', desc: 'When billed with a procedure on same date, modifier 25 required for separate E/M' },
    { cpt: '99214', mods: ['25'], when: 'with procedure', desc: 'When billed with a procedure on same date, modifier 25 required for separate E/M' },
    { cpt: '99215', mods: ['25'], when: 'with procedure', desc: 'When billed with a procedure on same date, modifier 25 required for separate E/M' },
    { cpt: '99203', mods: ['25'], when: 'with procedure', desc: 'When billed with a procedure on same date, modifier 25 required for separate E/M' },
    { cpt: '99204', mods: ['25'], when: 'with procedure', desc: 'When billed with a procedure on same date, modifier 25 required for separate E/M' },
    { cpt: '99205', mods: ['25'], when: 'with procedure', desc: 'When billed with a procedure on same date, modifier 25 required for separate E/M' },
    { cpt: '29881', mods: ['LT', 'RT', '50'], when: 'bilateral', desc: 'Bilateral knee arthroscopy requires LT, RT, or modifier 50' },
    { cpt: '29880', mods: ['LT', 'RT', '50'], when: 'bilateral', desc: 'Bilateral knee arthroscopy requires LT, RT, or modifier 50' },
    { cpt: '27447', mods: ['LT', 'RT', '50'], when: 'bilateral', desc: 'Bilateral knee replacement requires LT, RT, or modifier 50' },
    { cpt: '27130', mods: ['LT', 'RT', '50'], when: 'bilateral', desc: 'Bilateral hip replacement requires LT, RT, or modifier 50' },
    { cpt: '64483', mods: ['LT', 'RT'], when: 'unilateral', desc: 'Lumbar transforaminal epidural — specify side' },
    { cpt: '64484', mods: ['LT', 'RT'], when: 'unilateral', desc: 'Lumbar transforaminal epidural — specify side' }
  ];

  // LCD/NCD coverage indicators (simplified)
  var lcdNcdRules = [
    { cpt: '70553', icdPrefix: ['G43'], lcd: 'L33438', desc: 'MRI brain for migraine — must meet specific criteria', covered: true, conditions: 'Requires documentation of failed conservative therapy' },
    { cpt: '72148', icdPrefix: ['M54.5'], lcd: 'L38218', desc: 'MRI lumbar spine for low back pain — must meet criteria', covered: true, conditions: 'Requires 6 weeks conservative treatment failure' },
    { cpt: '73721', icdPrefix: ['M17', 'M23'], lcd: 'L38223', desc: 'MRI knee — coverage depends on clinical presentation', covered: true, conditions: 'Requires specific clinical findings' },
    { cpt: '93306', icdPrefix: ['R07', 'R09'], lcd: 'L33345', desc: 'Echocardiography — must have cardiac indication', covered: true, conditions: 'Must have cardiac symptoms or risk factors' },
    { cpt: '29881', icdPrefix: ['M23'], lcd: 'L37418', desc: 'Knee arthroscopy — must meet surgical criteria', covered: true, conditions: 'Requires mechanical symptoms or failed conservative treatment' },
    { cpt: '43239', icdPrefix: ['K21', 'K31'], lcd: 'L35038', desc: 'Upper endoscopy — must meet clinical criteria', covered: true, conditions: 'Requires GI symptoms or screening criteria' },
    { cpt: '45378', icdPrefix: ['Z12.11'], lcd: 'L35067', desc: 'Colonoscopy screening — age and risk criteria apply', covered: true, conditions: 'Must meet age/risk criteria for screening' },
    { cpt: '96127', icdPrefix: ['F32', 'F41'], lcd: 'L37460', desc: 'Brief emotional assessment — must be clinically appropriate', covered: true, conditions: 'Must have behavioral health indication' }
  ];

  // Public API
  function getEdits() { return edits; }
  function getICDCPTConflicts() { return icdCptConflicts; }
  function getCPTModifierRequirements() { return cptModifierRequirements; }
  function getLCDNCDRules() { return lcdNcdRules; }

  function findEdit(cpt1, cpt2) {
    return edits.find(function(e) {
      return (e.col1 === cpt1 && e.col2 === cpt2) || (e.col1 === cpt2 && e.col2 === cpt1);
    });
  }

  function findConflicts(cpt, icdCodes) {
    var matches = [];
    icdCptConflicts.forEach(function(conflict) {
      if (conflict.cpt === cpt) {
        icdCodes.forEach(function(icd) {
          var cleanICD = icd.replace(/\./g, '');
          conflict.icdPrefix.forEach(function(prefix) {
            if (cleanICD.indexOf(prefix.replace(/\./g, '')) === 0) {
              matches.push(conflict);
            }
          });
        });
      }
    });
    return matches;
  }

  function findModifierReqs(cpt, modifiers) {
    return cptModifierRequirements.filter(function(req) {
      return req.cpt === cpt;
    });
  }

  function findLCDNCD(cpt, icdCodes) {
    var matches = [];
    lcdNcdRules.forEach(function(rule) {
      if (rule.cpt === cpt) {
        icdCodes.forEach(function(icd) {
          var cleanICD = icd.replace(/\./g, '');
          rule.icdPrefix.forEach(function(prefix) {
            if (cleanICD.indexOf(prefix.replace(/\./g, '')) === 0) {
              matches.push(rule);
            }
          });
        });
      }
    });
    return matches;
  }

  return {
    getEdits: getEdits,
    getICDCPTConflicts: getICDCPTConflicts,
    getCPTModifierRequirements: getCPTModifierRequirements,
    getLCDNCDRules: getLCDNCDRules,
    findEdit: findEdit,
    findConflicts: findConflicts,
    findModifierReqs: findModifierReqs,
    findLCDNCD: findLCDNCD
  };

})();
