(function() {
  // Theme toggle
  var themeBtn = document.getElementById('btnTheme');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('rcm_theme', next);
      themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
    });
    var saved = localStorage.getItem('rcm_theme');
    if (saved) themeBtn.textContent = saved === 'dark' ? '🌙' : '☀️';
  }

  // Autocomplete setup
  setupAutocomplete('cptInput', 'cptDropdown', CPT_DATABASE, function(item) {
    return item.code + ' ' + item.name;
  }, function(item) {
    return '<span class="mv-dd-code">' + item.code + '</span><span class="mv-dd-name">' + item.name + '</span>';
  }, function(item) { return item.code; });

  setupAutocomplete('modifierInput', 'modifierDropdown', MODIFIER_DATABASE, function(item) {
    return item.code + ' ' + item.name;
  }, function(item) {
    return '<span class="mv-dd-code">' + item.code + '</span><span class="mv-dd-name">' + item.name + '</span>';
  }, function(item) { return item.code; });

  setupAutocomplete('icdInput', 'icdDropdown', ICD_DATABASE, function(item) {
    return item.code + ' ' + item.name;
  }, function(item) {
    return '<span class="mv-dd-code">' + item.code + '</span><span class="mv-dd-name">' + item.name + '</span>';
  }, function(item) { return item.code; });

  var payerList = [];
  for (var key in PAYER_RULES) {
    if (PAYER_RULES.hasOwnProperty(key)) {
      payerList.push(PAYER_RULES[key]);
    }
  }
  setupAutocomplete('payerInput', 'payerDropdown', payerList, function(item) {
    return item.name;
  }, function(item) {
    return '<span class="mv-dd-code">' + item.icon + '</span><span class="mv-dd-name">' + item.name + '</span>';
  }, function(item) { return item.name; });

  loadRecentSearches();
})();

function setupAutocomplete(inputId, dropdownId, data, searchTextFn, renderFn, valueFn) {
  var input = document.getElementById(inputId);
  var dropdown = document.getElementById(dropdownId);
  if (!input || !dropdown) return;

  input.addEventListener('input', function() {
    var val = input.value.toLowerCase().trim();
    if (val.length < 1) { dropdown.classList.remove('open'); return; }

    var matches = [];
    for (var i = 0; i < data.length && matches.length < 8; i++) {
      if (searchTextFn(data[i]).toLowerCase().indexOf(val) !== -1) {
        matches.push(data[i]);
      }
    }

    if (matches.length === 0) { dropdown.classList.remove('open'); return; }

    dropdown.innerHTML = '';
    for (var j = 0; j < matches.length; j++) {
      var div = document.createElement('div');
      div.className = 'mv-dropdown-item';
      div.innerHTML = renderFn(matches[j]);
      div.setAttribute('data-value', valueFn(matches[j]));
      div.addEventListener('click', (function(item) {
        return function() {
          input.value = valueFn(item);
          input.setAttribute('data-selected', valueFn(item));
          dropdown.classList.remove('open');
        };
      })(matches[j]));
      dropdown.appendChild(div);
    }
    dropdown.classList.add('open');
  });

  input.addEventListener('focus', function() {
    if (input.value.trim().length >= 1) {
      input.dispatchEvent(new Event('input'));
    }
  });

  document.addEventListener('click', function(e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}

function fillModifier(code) {
  var input = document.getElementById('modifierInput');
  if (input) {
    input.value = code;
    input.setAttribute('data-selected', code);
  }
}

function getVal(id) {
  var el = document.getElementById(id);
  if (!el) return '';
  return el.value.trim();
}

function runValidation() {
  var cpt = getVal('cptInput');
  var modifier = getVal('modifierInput');
  var icd = getVal('icdInput');
  var payer = getVal('payerInput');

  if (!cpt && !modifier && !icd) {
    alert('Please enter at least a CPT code, modifier, or ICD-10 code.');
    return;
  }

  document.getElementById('reportPanel').style.display = 'block';
  document.getElementById('reportContent').style.display = 'none';
  document.getElementById('loadingOverlay').style.display = 'block';

  var steps = [
    'Checking CPT...',
    'Checking Modifier...',
    'Checking ICD-10...',
    'Checking Payer Rules...',
    'Checking NCCI Edits...',
    'Evaluating Compatibility...',
    'Generating Report...'
  ];

  var stepsEl = document.getElementById('loadingSteps');
  var progressEl = document.getElementById('loadingProgress');
  stepsEl.innerHTML = '';

  for (var i = 0; i < steps.length; i++) {
    var stepDiv = document.createElement('div');
    stepDiv.className = 'mv-loading-step';
    stepDiv.innerHTML = '<span class="mv-loading-step-icon">⏳</span> ' + steps[i];
    stepsEl.appendChild(stepDiv);
  }

  var stepEls = stepsEl.querySelectorAll('.mv-loading-step');
  var currentStep = 0;

  function showNextStep() {
    if (currentStep > 0 && currentStep < stepEls.length) {
      stepEls[currentStep - 1].classList.remove('active');
      stepEls[currentStep - 1].classList.add('done');
      stepEls[currentStep - 1].querySelector('.mv-loading-step-icon').textContent = '✔';
    }
    if (currentStep < stepEls.length) {
      stepEls[currentStep].classList.add('active');
      progressEl.style.width = ((currentStep + 1) / stepEls.length * 100) + '%';
      currentStep++;
      setTimeout(showNextStep, 280 + Math.random() * 180);
    } else {
      setTimeout(function() {
        finishValidation(cpt, modifier, icd, payer);
      }, 300);
    }
  }

  setTimeout(showNextStep, 200);
}

function finishValidation(cpt, modifier, icd, payer) {
  var results = ValidationEngine.validate(cpt, modifier, icd, payer);

  document.getElementById('loadingOverlay').style.display = 'none';
  document.getElementById('reportContent').style.display = 'block';

  renderStatusBanner(results.overallStatus);
  renderScores(results.confidenceScore, results.denialRisk);
  renderSummary(results);
  renderDocChecklist(results.documentation);
  renderDenials(results.denials);
  renderRecommendations(results.recommendations);
  renderAIExplanation(results.aiExplanation);

  saveToRecent(cpt, modifier, icd, payer);

  document.getElementById('reportPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderStatusBanner(status) {
  var el = document.getElementById('statusBanner');
  var colorClass = status.color === 'green' ? 'green' : status.color === 'yellow' ? 'yellow' : 'red';
  el.className = 'mv-status-banner ' + colorClass;
  el.innerHTML = '<div class="mv-status-badge ' + colorClass + '">' + status.label + '</div><div class="mv-status-desc">' + status.description + '</div>';
}

function renderScores(confidence, denialRisk) {
  var confCircle = document.getElementById('confidenceFill');
  var riskCircle = document.getElementById('riskFill');
  var circumference = 2 * Math.PI * 54;

  setTimeout(function() {
    confCircle.style.strokeDashoffset = circumference - (confidence / 100) * circumference;
  }, 100);
  setTimeout(function() {
    riskCircle.style.strokeDashoffset = circumference - (denialRisk.percentage / 100) * circumference;
  }, 100);

  document.getElementById('confidenceValue').textContent = confidence + '%';
  document.getElementById('riskValue').textContent = denialRisk.percentage + '%';

  var riskLevel = document.getElementById('riskLevel');
  riskLevel.textContent = denialRisk.level;
  riskLevel.className = 'mv-risk-level ' + denialRisk.color;
}

function renderSummary(results) {
  var grid = document.getElementById('summaryGrid');
  var items = [];

  items.push({
    icon: '🔍',
    title: 'CPT Code',
    status: results.cpt.status,
    statusText: results.cpt.message,
    explanation: results.cpt.data ? results.cpt.data.name + ' (' + results.cpt.data.category + ')' : 'Not found in database'
  });

  items.push({
    icon: '🔧',
    title: 'Modifier',
    status: results.modifier.status,
    statusText: results.modifier.message,
    explanation: results.modifier.data ? results.modifier.data.name : 'Not found in database'
  });

  items.push({
    icon: '🔗',
    title: 'CPT-Modifier Compatibility',
    status: results.cptModifier.status,
    statusText: results.cptModifier.message,
    explanation: results.cptModifier.explanation
  });

  items.push({
    icon: '🏥',
    title: 'ICD-10 Compatibility',
    status: results.icdCompatibility.status,
    statusText: results.icdCompatibility.message,
    explanation: results.icdCompatibility.notes || ''
  });

  items.push({
    icon: '📋',
    title: 'Payer Rules',
    status: results.payerRules.status,
    statusText: results.payerRules.message,
    explanation: results.payerRules.notes || ''
  });

  items.push({
    icon: '⚡',
    title: 'NCCI Edit',
    status: results.ncci.status,
    statusText: results.ncci.message,
    explanation: results.ncci.edits && results.ncci.edits.length > 0 ? results.ncci.edits.length + ' edit(s) found' : 'No edits found for this CPT'
  });

  grid.innerHTML = '';
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var div = document.createElement('div');
    div.className = 'mv-summary-item';
    div.innerHTML = '<div class="mv-summary-icon">' + item.icon + '</div>' +
      '<div class="mv-summary-content">' +
      '<div class="mv-summary-title">' + item.title + '</div>' +
      '<div class="mv-summary-status ' + item.status + '">' + item.statusText + '</div>' +
      '<div class="mv-summary-explanation">' + item.explanation + '</div>' +
      '</div>';
    grid.appendChild(div);
  }
}

function renderDocChecklist(checklist) {
  var el = document.getElementById('docChecklist');
  el.innerHTML = '';
  for (var i = 0; i < checklist.length; i++) {
    var c = checklist[i];
    var div = document.createElement('div');
    div.className = 'mv-checklist-item';
    div.innerHTML = '<span class="mv-checklist-icon">' + c.icon + '</span>' +
      '<span class="mv-checklist-text">' + c.item + ' — ' + c.description + '</span>' +
      '<span class="mv-checklist-required ' + (c.required ? 'required' : 'optional') + '">' + (c.required ? 'Required' : 'Optional') + '</span>';
    el.appendChild(div);
  }
}

function renderDenials(denials) {
  var el = document.getElementById('denialCards');
  el.innerHTML = '';
  for (var i = 0; i < denials.length; i++) {
    var d = denials[i];
    var div = document.createElement('div');
    div.className = 'mv-denial-card';
    div.innerHTML = '<div class="mv-denial-code ' + d.risk + '">' + d.code + '</div>' +
      '<div class="mv-denial-info">' +
      '<div class="mv-denial-name">' + d.name + '</div>' +
      '<div class="mv-denial-explanation">' + d.explanation + '</div>' +
      '</div>';
    el.appendChild(div);
  }
}

function renderRecommendations(recs) {
  var el = document.getElementById('recommendations');
  el.innerHTML = '';
  for (var i = 0; i < recs.length; i++) {
    var div = document.createElement('div');
    div.className = 'mv-rec-item';
    div.innerHTML = '<span class="mv-rec-icon">▸</span> ' + recs[i];
    el.appendChild(div);
  }
}

function renderAIExplanation(sections) {
  var el = document.getElementById('aiExplanation');
  el.innerHTML = '';
  for (var i = 0; i < sections.length; i++) {
    var s = sections[i];
    var div = document.createElement('div');
    div.innerHTML = '<div class="mv-ai-section-title">' + s.title + '</div>' +
      '<div class="mv-ai-section-content">' + s.content + '</div>';
    el.appendChild(div);
  }
}

function resetForm() {
  document.getElementById('cptInput').value = '';
  document.getElementById('modifierInput').value = '';
  document.getElementById('icdInput').value = '';
  document.getElementById('payerInput').value = '';
  document.getElementById('reportPanel').style.display = 'none';
  document.getElementById('reportContent').style.display = 'none';
  document.getElementById('loadingOverlay').style.display = 'none';
}

// Recent Searches
function saveToRecent(cpt, modifier, icd, payer) {
  var searches = JSON.parse(localStorage.getItem('mv_recent') || '[]');
  searches.unshift({
    cpt: cpt, modifier: modifier, icd: icd, payer: payer,
    time: new Date().toLocaleString()
  });
  if (searches.length > 10) searches = searches.slice(0, 10);
  localStorage.setItem('mv_recent', JSON.stringify(searches));
  loadRecentSearches();
}

function loadRecentSearches() {
  var searches = JSON.parse(localStorage.getItem('mv_recent') || '[]');
  var card = document.getElementById('recentCard');
  var list = document.getElementById('recentList');
  if (!card || !list) return;

  if (searches.length === 0) { card.style.display = 'none'; return; }
  card.style.display = 'block';
  list.innerHTML = '';

  for (var i = 0; i < searches.length; i++) {
    var s = searches[i];
    var div = document.createElement('div');
    div.className = 'mv-recent-item';
    var parts = [];
    if (s.cpt) parts.push('CPT ' + s.cpt);
    if (s.modifier) parts.push('Mod ' + s.modifier);
    if (s.icd) parts.push(s.icd);
    if (s.payer) parts.push(s.payer);
    div.innerHTML = '<span class="mv-recent-code">' + parts.join(' · ') + '</span>' +
      '<span class="mv-recent-time">' + s.time + '</span>';
    div.addEventListener((function(search) {
      return function() {
        if (search.cpt) document.getElementById('cptInput').value = search.cpt;
        if (search.modifier) document.getElementById('modifierInput').value = search.modifier;
        if (search.icd) document.getElementById('icdInput').value = search.icd;
        if (search.payer) document.getElementById('payerInput').value = search.payer;
      };
    })(s));
    list.appendChild(div);
  }
}

// Export
function copyReport() {
  var content = generateTextReport();
  navigator.clipboard.writeText(content).then(function() {
    alert('Report copied to clipboard!');
  }).catch(function() {
    var textarea = document.createElement('textarea');
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Report copied to clipboard!');
  });
}

function printReport() {
  var content = generateHTMLReport();
  var win = window.open('', '_blank');
  win.document.write(content);
  win.document.close();
  win.print();
}

function downloadPDF() {
  var content = generateHTMLReport();
  var blob = new Blob([content], { type: 'text/html' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'modifier-validation-report.html';
  a.click();
  URL.revokeObjectURL(url);
}

function shareReport() {
  var cpt = getVal('cptInput');
  var modifier = getVal('modifierInput');
  var icd = getVal('icdInput');
  var payer = getVal('payerInput');
  var url = window.location.href;
  if (cpt) url += '?cpt=' + encodeURIComponent(cpt);
  if (modifier) url += '&mod=' + encodeURIComponent(modifier);
  if (icd) url += '&icd=' + encodeURIComponent(icd);
  if (payer) url += '&payer=' + encodeURIComponent(payer);
  navigator.clipboard.writeText(url).then(function() {
    alert('Share link copied to clipboard!');
  }).catch(function() {
    prompt('Copy this link:', url);
  });
}

function generateTextReport() {
  var cpt = getVal('cptInput');
  var modifier = getVal('modifierInput');
  var icd = getVal('icdInput');
  var payer = getVal('payerInput');

  var results = ValidationEngine.validate(cpt, modifier, icd, payer);

  var lines = [];
  lines.push('=== MODIFIER VALIDATION REPORT ===');
  lines.push('Generated: ' + new Date().toLocaleString());
  lines.push('');
  lines.push('INPUT:');
  lines.push('  CPT Code: ' + (cpt || 'N/A'));
  lines.push('  Modifier: ' + (modifier || 'N/A'));
  lines.push('  ICD-10: ' + (icd || 'N/A'));
  lines.push('  Payer: ' + (payer || 'N/A'));
  lines.push('');
  lines.push('STATUS: ' + results.overallStatus.label);
  lines.push('CONFIDENCE: ' + results.confidenceScore + '%');
  lines.push('DENIAL RISK: ' + results.denialRisk.level + ' (' + results.denialRisk.percentage + '%)');
  lines.push('');
  lines.push('--- VALIDATION SUMMARY ---');
  lines.push('CPT: ' + results.cpt.message);
  lines.push('Modifier: ' + results.modifier.message);
  lines.push('CPT-Modifier: ' + results.cptModifier.message);
  lines.push('ICD-10: ' + results.icdCompatibility.message);
  lines.push('Payer: ' + results.payerRules.message);
  lines.push('NCCI: ' + results.ncci.message);
  lines.push('');
  lines.push('--- RECOMMENDATIONS ---');
  for (var i = 0; i < results.recommendations.length; i++) {
    lines.push('  • ' + results.recommendations[i]);
  }
  return lines.join('\n');
}

function generateHTMLReport() {
  var cpt = getVal('cptInput');
  var modifier = getVal('modifierInput');
  var icd = getVal('icdInput');
  var payer = getVal('payerInput');
  var results = ValidationEngine.validate(cpt, modifier, icd, payer);

  return '<!DOCTYPE html><html><head><title>Modifier Validation Report</title><style>' +
    'body{font-family:Inter,system-ui,sans-serif;max-width:800px;margin:0 auto;padding:40px 20px;color:#1a1a2e;background:#f8fafc}' +
    'h1{color:#00b4a0;border-bottom:2px solid #00b4a0;padding-bottom:8px}' +
    '.badge{display:inline-block;padding:6px 16px;border-radius:20px;font-weight:700;font-size:14px}' +
    '.badge.green{background:#dcfce7;color:#16a34a}.badge.yellow{background:#fef9c3;color:#ca8a04}.badge.red{background:#fee2e2;color:#dc2626}' +
    '.section{margin:20px 0;padding:16px;background:#fff;border-radius:10px;border:1px solid #e2e8f0}' +
    '.section h2{font-size:16px;margin:0 0 12px;color:#334155}' +
    '.item{padding:8px 0;border-bottom:1px solid #f1f5f9;font-size:14px}' +
    '.item:last-child{border:none}' +
    '</style></head><body>' +
    '<h1>Modifier Validation Report</h1>' +
    '<p>Generated: ' + new Date().toLocaleString() + '</p>' +
    '<div class="section"><h2>Input</h2>' +
    '<div class="item"><strong>CPT:</strong> ' + (cpt || 'N/A') + '</div>' +
    '<div class="item"><strong>Modifier:</strong> ' + (modifier || 'N/A') + '</div>' +
    '<div class="item"><strong>ICD-10:</strong> ' + (icd || 'N/A') + '</div>' +
    '<div class="item"><strong>Payer:</strong> ' + (payer || 'N/A') + '</div></div>' +
    '<div class="section"><h2>Result: <span class="badge ' + results.overallStatus.color + '">' + results.overallStatus.label + '</span></h2>' +
    '<div class="item"><strong>Confidence:</strong> ' + results.confidenceScore + '%</div>' +
    '<div class="item"><strong>Denial Risk:</strong> ' + results.denialRisk.level + ' (' + results.denialRisk.percentage + '%)</div></div>' +
    '<div class="section"><h2>Recommendations</h2>' +
    results.recommendations.map(function(r) { return '<div class="item">• ' + r + '</div>'; }).join('') +
    '</div></body></html>';
}

// URL params preload
(function() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('cpt')) document.getElementById('cptInput').value = params.get('cpt');
  if (params.get('mod')) document.getElementById('modifierInput').value = params.get('mod');
  if (params.get('icd')) document.getElementById('icdInput').value = params.get('icd');
  if (params.get('payer')) document.getElementById('payerInput').value = params.get('payer');
  if (params.get('cpt') || params.get('mod')) {
    setTimeout(function() { runValidation(); }, 500);
  }
})();
