/* ═══════════════════════════════════════════════════════════
   TOOL.JS — Main orchestrator for Claim Risk Review
   Form handling, analysis, rendering, export
   ═══════════════════════════════════════════════════════════ */
'use strict';

var currentStep = 1;
var analysisResult = null;
var currentClaim = null;

// ── THEME TOGGLE ──
(function(){
  var b=document.getElementById('btnTheme');
  if(b){
    b.addEventListener('click',function(){
      var h=document.documentElement,c=h.getAttribute('data-theme'),n=c==='dark'?'light':'dark';
      h.setAttribute('data-theme',n);localStorage.setItem('rcm_theme',n);
      b.textContent=n==='dark'?'🌙':'☀️';
    });
    var c=document.documentElement.getAttribute('data-theme');
    b.textContent=c==='dark'?'🌙':'☀️';
  }
})();

// ── POPULATE PAYER DROPDOWN ──
(function(){
  var sel=document.getElementById('payer');
  if(typeof PAYER_DB !== 'undefined'){
    PAYER_DB.forEach(function(p){
      var o=document.createElement('option');
      o.value=p.id;o.text=p.name;
      sel.appendChild(o);
    });
  }
})();

// ── STEP NAVIGATION ──
function goToStep(step) {
  // Validate current step before advancing
  if (step > currentStep) {
    if (!validateCurrentStep()) return;
  }

  currentStep = step;

  // Update step forms
  document.querySelectorAll('.crr-form-step').forEach(function(el) { el.classList.remove('active'); });
  var target = document.getElementById('step' + step);
  if (target) target.classList.add('active');

  // Update step indicator
  document.querySelectorAll('.crr-step').forEach(function(el) {
    var s = parseInt(el.getAttribute('data-step'));
    el.classList.remove('active', 'done');
    if (s === step) el.classList.add('active');
    else if (s < step) el.classList.add('done');
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateCurrentStep() {
  switch (currentStep) {
    case 1:
      var age = document.getElementById('patientAge').value;
      var gender = document.getElementById('patientGender').value;
      if (!age) { alert('Please enter patient age.'); return false; }
      if (!gender) { alert('Please select patient gender.'); return false; }
      return true;
    case 2:
      var payer = document.getElementById('payer').value;
      var planType = document.getElementById('planType').value;
      if (!payer) { alert('Please select a payer.'); return false; }
      if (!planType) { alert('Please select a plan type.'); return false; }
      return true;
    case 3:
      var specialty = document.getElementById('specialty').value;
      if (!specialty) { alert('Please select a specialty.'); return false; }
      return true;
    case 4:
      var icd = document.getElementById('icdCodes').value;
      var cpt = document.getElementById('cptCodes').value;
      var dos = document.getElementById('dos').value;
      if (!icd.trim()) { alert('Please enter at least one ICD-10 diagnosis code.'); return false; }
      if (!cpt.trim()) { alert('Please enter at least one CPT/HCPCS code.'); return false; }
      if (!dos) { alert('Please enter a date of service.'); return false; }
      return true;
    default:
      return true;
  }
}

// ── COLLECT CLAIM DATA ──
function collectClaimData() {
  var icdRaw = document.getElementById('icdCodes').value;
  var cptRaw = document.getElementById('cptCodes').value;
  var modRaw = document.getElementById('modifiers').value;

  return {
    age: parseInt(document.getElementById('patientAge').value) || 0,
    gender: document.getElementById('patientGender').value,
    payer: document.getElementById('payer').value,
    planType: document.getElementById('planType').value,
    specialty: document.getElementById('specialty').value,
    state: document.getElementById('providerState').value,
    dos: document.getElementById('dos').value,
    icdCodes: icdRaw.split(',').map(function(s) { return s.trim(); }).filter(Boolean),
    cptCodes: cptRaw.split(',').map(function(s) { return s.trim(); }).filter(Boolean),
    modifiers: modRaw.split(',').map(function(s) { return s.trim(); }).filter(Boolean),
    units: parseInt(document.getElementById('units').value) || 1,
    billedAmount: document.getElementById('billedAmount').value,
    clinicalNote: document.getElementById('clinicalNote').value,
    referralRequired: document.getElementById('referralRequired').value,
    priorAuth: document.getElementById('priorAuth').value,
    placeOfService: document.getElementById('placeOfService').value
  };
}

// ── ANALYZE CLAIM ──
function analyzeClaim() {
  if (!validateCurrentStep()) return;

  var claim = collectClaimData();
  currentClaim = claim;

  // Show loading
  var overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('active');
  var loadingStep = document.getElementById('loadingStep');

  // Simulate analysis steps with delays
  loadingStep.textContent = 'Running rule engine...';

  setTimeout(function() {
    // Step 1: Rule engine
    var ruleResults = RuleEngine.validate(claim);

    if (!ruleResults.valid) {
      overlay.classList.remove('active');
      var errorMsgs = ruleResults.errors.map(function(e) { return '• ' + e.msg; }).join('\n');
      alert('Cannot analyze claim — blocking errors found:\n\n' + errorMsgs);
      return;
    }

    loadingStep.textContent = 'Running AI analysis...';

    setTimeout(function() {
      // Step 2: AI analysis
      var aiResults = AIEngine.analyze(claim, ruleResults);
      analysisResult = aiResults;

      loadingStep.textContent = 'Generating report...';

      setTimeout(function() {
        // Step 3: Render results
        renderResults(claim, ruleResults, aiResults);

        // Save to dashboard data
        saveAnalysisToStorage(claim, aiResults);

        overlay.classList.remove('active');
        goToStep(6);
      }, 400);
    }, 600);
  }, 400);
}

// ── RENDER RESULTS ──
function renderResults(claim, ruleResults, ai) {
  var overallScore = ai.overallScore;
  var riskLevel = overallScore <= 30 ? 'low' : overallScore <= 60 ? 'medium' : 'high';

  // Header
  var header = document.getElementById('resultsHeader');
  header.className = 'crr-results-header crr-risk-' + riskLevel;

  // Gauge
  var arc = document.getElementById('gaugeArc');
  var circumference = 339.3;
  var offset = circumference - (circumference * overallScore / 100);
  setTimeout(function() { arc.style.strokeDashoffset = offset; }, 100);

  document.getElementById('gaugeScore').textContent = overallScore;
  document.getElementById('gaugeScore').className = 'crr-gauge-score';

  var riskLabels = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' };
  var riskSublabels = {
    low: 'This claim appears relatively clean',
    medium: 'Several areas may need review',
    high: 'Multiple risk factors identified'
  };
  document.getElementById('riskLabel').textContent = overallScore + '/100 — ' + riskLabels[riskLevel];
  document.getElementById('riskLabel').className = 'crr-risk-label crr-risk-' + riskLevel;
  document.getElementById('riskSublabel').textContent = riskSublabels[riskLevel];

  // Category Scores
  renderCategoryScores(ai.categoryScores);

  // Risk Factors
  renderRiskFactors(ai.factors);

  // Denial Categories
  renderDenialCategories(ai.denialTags);

  // Suggested Actions
  renderActions(ai.actions);

  // Rule Warnings
  renderRuleWarnings(ruleResults);

  // Confidence
  renderConfidence(ai.confidence, claim);
}

function renderCategoryScores(scores) {
  var html = '';
  AIEngine.CATEGORIES.forEach(function(cat) {
    var score = scores[cat] || 0;
    var level = score <= 25 ? 'low' : score <= 45 ? 'medium' : 'high';
    var barColor = level === 'low' ? 'var(--green-400)' : level === 'medium' ? 'var(--amber-400)' : 'var(--red-400)';
    var barWidth = Math.min(100, score * 1.1);

    var explanation = getCategoryExplanation(cat, score);

    html += '<div class="crr-cat-row">';
    html += '<div class="crr-cat-name">' + cat + '</div>';
    html += '<div class="crr-cat-bar-wrap"><div class="crr-cat-bar" style="width:' + barWidth + '%;background:' + barColor + '"></div></div>';
    html += '<div class="crr-cat-score ' + level + '">' + score + '</div>';
    html += '</div>';
    if (explanation) {
      html += '<div class="crr-cat-explain">' + explanation + '</div>';
    }
  });
  document.getElementById('categoryScores').innerHTML = html;
}

function getCategoryExplanation(cat, score) {
  if (score <= 15) return '';
  var explanations = {
    'Documentation': 'Clinical documentation may not adequately support the billed services. Review for completeness of HPI, examination, and medical decision-making.',
    'Coding': 'Coding patterns suggest potential issues. Verify code selection aligns with documentation and clinical scenario.',
    'Medical Necessity': 'Medical necessity for the service may need stronger documentation support.',
    'Authorization': 'Prior authorization or referral requirements may not be fully met.',
    'Eligibility': 'Patient eligibility or plan-specific requirements need verification.',
    'Duplicate Claim': 'Risk of duplicate or overlapping billing detected. Verify each service is distinct.',
    'Modifier Review': 'Modifier usage may require additional documentation or justification.',
    'Timely Filing': 'Claim filing timeline may be approaching or past the deadline.'
  };
  return explanations[cat] || '';
}

function renderRiskFactors(factors) {
  var sorted = factors.sort(function(a, b) {
    var order = { high: 0, medium: 1, low: 2 };
    return (order[a.severity] || 2) - (order[b.severity] || 2);
  });

  var html = '';
  sorted.forEach(function(f) {
    var icon = f.severity === 'high' ? '🔴' : f.severity === 'medium' ? '🟡' : '🟢';
    html += '<div class="crr-factor">';
    html += '<div class="crr-factor-icon">' + icon + '</div>';
    html += '<div class="crr-factor-text">' + f.text + '</div>';
    html += '</div>';
  });

  if (sorted.length === 0) {
    html = '<div style="color:var(--green-400);font-size:13px;padding:8px">✅ No significant risk factors detected</div>';
  }

  document.getElementById('riskFactors').innerHTML = html;
}

function renderDenialCategories(tags) {
  var html = '<div class="crr-denial-tags">';
  if (tags.length === 0) {
    html += '<span class="crr-denial-tag low">No high-risk denial categories</span>';
  } else {
    tags.forEach(function(t) {
      html += '<span class="crr-denial-tag ' + t.level + '">' + t.category + ' (Score: ' + t.score + ')</span>';
    });
  }
  html += '</div>';
  document.getElementById('denialCategories').innerHTML = html;
}

function renderActions(actions) {
  var html = '';
  var unique = [];
  var seen = {};
  actions.forEach(function(a) {
    if (!seen[a]) { unique.push(a); seen[a] = true; }
  });

  unique.forEach(function(a, i) {
    html += '<div class="crr-action">';
    html += '<div class="crr-action-num">' + (i + 1) + '</div>';
    html += '<div class="crr-action-text">' + a + '</div>';
    html += '</div>';
  });

  if (unique.length === 0) {
    html = '<div style="color:var(--green-400);font-size:13px;padding:8px">✅ No additional actions required</div>';
  }

  document.getElementById('suggestedActions').innerHTML = html;
}

function renderRuleWarnings(ruleResults) {
  var html = '';
  var allWarnings = (ruleResults.errors || []).concat(ruleResults.warnings || []);

  allWarnings.forEach(function(w) {
    var cls = w.severity === 'error' ? 'error' : w.severity === 'warning' ? 'warning' : 'info';
    var icon = w.severity === 'error' ? '❌' : w.severity === 'warning' ? '⚠️' : 'ℹ️';
    html += '<div class="crr-rule ' + cls + '">';
    html += '<div class="crr-rule-icon">' + icon + '</div>';
    html += '<div class="crr-rule-text">' + w.msg + '</div>';
    html += '</div>';
  });

  if (allWarnings.length === 0) {
    html = '<div style="color:var(--green-400);font-size:13px;padding:8px">✅ All rule checks passed</div>';
  }

  document.getElementById('ruleWarnings').innerHTML = html;
}

function renderConfidence(confidence, claim) {
  var level = confidence >= 75 ? 'High' : confidence >= 50 ? 'Moderate' : 'Low';
  var desc = '';
  if (confidence >= 75) desc = 'Good data completeness supports reliable analysis';
  else if (confidence >= 50) desc = 'Moderate data completeness; adding clinical notes would improve accuracy';
  else desc = 'Limited data; add more details for a more reliable analysis';

  var html = '<div class="crr-confidence">';
  html += '<div class="crr-confidence-bar"><div class="crr-confidence-fill" style="width:' + confidence + '%"></div></div>';
  html += '<div class="crr-confidence-label">' + level + ' (' + confidence + '%)</div>';
  html += '</div>';
  html += '<div class="crr-confidence-desc">' + desc + '</div>';

  document.getElementById('confidenceLevel').innerHTML = html;
}

// ── EXPORT REPORT ──
function exportReport() {
  if (!analysisResult || !currentClaim) return;

  var claim = currentClaim;
  var ai = analysisResult;
  var overallScore = ai.overallScore;
  var riskLevel = overallScore <= 30 ? 'Low' : overallScore <= 60 ? 'Medium' : 'High';

  var text = '';
  text += '═══════════════════════════════════════════════════\n';
  text += '     CLAIM RISK REVIEW REPORT — RCM DENIALS\n';
  text += '═══════════════════════════════════════════════════\n';
  text += 'Date: ' + new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' }) + '\n\n';

  text += '── CLAIM SUMMARY ─────────────────────────────────\n';
  text += 'Patient Age: ' + claim.age + '\n';
  text += 'Gender: ' + claim.gender + '\n';
  text += 'Payer: ' + claim.payer + '\n';
  text += 'Plan Type: ' + claim.planType + '\n';
  text += 'Specialty: ' + claim.specialty + '\n';
  text += 'Date of Service: ' + claim.dos + '\n';
  text += 'ICD-10 Codes: ' + claim.icdCodes.join(', ') + '\n';
  text += 'CPT Codes: ' + claim.cptCodes.join(', ') + '\n';
  text += 'Modifiers: ' + (claim.modifiers.length > 0 ? claim.modifiers.join(', ') : 'None') + '\n';
  text += 'Units: ' + claim.units + '\n';
  text += 'Billed Amount: ' + (claim.billedAmount || 'N/A') + '\n';
  text += 'Prior Auth: ' + claim.priorAuth + '\n';
  text += 'Referral Required: ' + claim.referralRequired + '\n\n';

  text += '── RISK SCORE ────────────────────────────────────\n';
  text += overallScore + '/100 — ' + riskLevel + ' Risk\n\n';

  text += '── CATEGORY SCORES ───────────────────────────────\n';
  AIEngine.CATEGORIES.forEach(function(cat) {
    var score = ai.categoryScores[cat] || 0;
    var bar = '';
    for (var i = 0; i < Math.round(score / 10); i++) bar += '█';
    for (var i = Math.round(score / 10); i < 10; i++) bar += '░';
    text += cat + ': ' + bar + ' ' + score + '/100\n';
  });
  text += '\n';

  text += '── PRIMARY RISK FACTORS ──────────────────────────\n';
  ai.factors.sort(function(a, b) {
    var order = { high: 0, medium: 1, low: 2 };
    return (order[a.severity] || 2) - (order[b.severity] || 2);
  });
  ai.factors.forEach(function(f) {
    var icon = f.severity === 'high' ? '[HIGH]' : f.severity === 'medium' ? '[MED] ' : '[LOW] ';
    text += icon + ' ' + f.text.replace(/<[^>]*>/g, '') + '\n';
  });
  text += '\n';

  text += '── LIKELY DENIAL CATEGORIES ──────────────────────\n';
  if (ai.denialTags.length === 0) {
    text += 'No high-risk categories identified\n';
  } else {
    ai.denialTags.forEach(function(t) {
      text += '• ' + t.category + ' (Score: ' + t.score + ')\n';
    });
  }
  text += '\n';

  text += '── SUGGESTED REVIEW ACTIONS ──────────────────────\n';
  var seen = {};
  ai.actions.forEach(function(a, i) {
    if (!seen[a]) {
      text += (i + 1) + '. ' + a + '\n';
      seen[a] = true;
    }
  });
  text += '\n';

  text += '── CONFIDENCE ────────────────────────────────────\n';
  text += ai.confidence + '%\n\n';

  text += '── DISCLAIMER ────────────────────────────────────\n';
  text += 'This analysis is a claim quality review and does not\n';
  text += 'guarantee payer outcomes. It is designed to assist\n';
  text += 'billers in identifying potential areas of concern.\n';
  text += '\n═══════════════════════════════════════════════════\n';
  text += 'Generated by RCM Denials — rcmdenials.com\n';

  var blob = new Blob([text], { type: 'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'claim-risk-report-' + new Date().toISOString().split('T')[0] + '.txt';
  a.click();
}

// ── SAVE TO DASHBOARD ──
function saveAnalysisToStorage(claim, ai) {
  var analyses = JSON.parse(localStorage.getItem('crr_analyses') || '[]');
  analyses.unshift({
    timestamp: new Date().toISOString(),
    claim: {
      payer: claim.payer,
      planType: claim.planType,
      specialty: claim.specialty,
      dos: claim.dos,
      icdCodes: claim.icdCodes,
      cptCodes: claim.cptCodes,
      age: claim.age,
      gender: claim.gender
    },
    result: {
      overallScore: ai.overallScore,
      categoryScores: ai.categoryScores,
      factorCount: ai.factors.length,
      denialTagCount: ai.denialTags.length,
      confidence: ai.confidence
    }
  });
  // Keep last 100
  if (analyses.length > 100) analyses = analyses.slice(0, 100);
  localStorage.setItem('crr_analyses', JSON.stringify(analyses));
}

function saveToDashboard() {
  if (!analysisResult || !currentClaim) return;
  saveAnalysisToStorage(currentClaim, analysisResult);
  alert('Analysis saved to dashboard!');
}

// ── RESET FORM ──
function resetForm() {
  document.getElementById('patientAge').value = '';
  document.getElementById('patientGender').value = '';
  document.getElementById('payer').value = '';
  document.getElementById('planType').value = '';
  document.getElementById('specialty').value = '';
  document.getElementById('providerState').value = '';
  document.getElementById('dos').value = '';
  document.getElementById('icdCodes').value = '';
  document.getElementById('cptCodes').value = '';
  document.getElementById('modifiers').value = '';
  document.getElementById('units').value = '1';
  document.getElementById('billedAmount').value = '';
  document.getElementById('clinicalNote').value = '';
  document.getElementById('referralRequired').value = 'unknown';
  document.getElementById('priorAuth').value = 'unknown';

  // Reset gauge
  document.getElementById('gaugeArc').style.strokeDashoffset = '339.3';
  document.getElementById('gaugeScore').textContent = '0';

  analysisResult = null;
  currentClaim = null;

  goToStep(1);
}

// ── INIT ──
goToStep(1);
