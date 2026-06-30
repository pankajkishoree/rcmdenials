/* ═══════════════════════════════════════════════════════════
   TOOL.JS — AI CPT & ICD-10 Coding Checker UI Orchestrator
   ═══════════════════════════════════════════════════════════ */
'use strict';

var CWC = (function() {

  var state = {
    icdCodes: [],
    cptCodes: [],
    modifiers: [],
    specialty: '',
    payer: '',
    pos: '',
    gender: '',
    age: '',
    result: null
  };

  function init() {
    bindEvents();
  }

  function bindEvents() {
    var addICD = document.getElementById('addICD');
    var addCPT = document.getElementById('addCPT');
    var addMod = document.getElementById('addMod');
    var analyzeBtn = document.getElementById('analyzeBtn');
    var clearBtn = document.getElementById('clearBtn');
    var exportBtn = document.getElementById('exportBtn');
    var exampleBtn = document.getElementById('loadExample');
    var exampleBtn2 = document.getElementById('loadExample2');

    if (addICD) addICD.addEventListener('click', addICDRow);
    if (addCPT) addCPT.addEventListener('click', addCPTRow);
    if (addMod) addMod.addEventListener('click', addModRow);
    if (analyzeBtn) analyzeBtn.addEventListener('click', runAnalysis);
    if (clearBtn) clearBtn.addEventListener('click', clearAll);
    if (exportBtn) exportBtn.addEventListener('click', exportReport);
    if (exampleBtn) exampleBtn.addEventListener('click', loadExample1);
    if (exampleBtn2) exampleBtn2.addEventListener('click', loadExample2);

    // Delegated remove buttons
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('cwc-remove-btn')) {
        var row = e.target.closest('.cwc-code-row');
        if (row) row.remove();
      }
    });
  }

  // ── Dynamic Row Management ─────────────────────────────
  function addICDRow() {
    var container = document.getElementById('icdContainer');
    var row = document.createElement('div');
    row.className = 'cwc-code-row';
    row.innerHTML = '<input type="text" class="form-input cwc-code-input icd-input" placeholder="e.g. M17.11">';
    container.appendChild(row);
    row.querySelector('input').focus();
  }

  function addCPTRow() {
    var container = document.getElementById('cptContainer');
    var row = document.createElement('div');
    row.className = 'cwc-code-row';
    row.innerHTML = '<input type="text" class="form-input cwc-code-input cpt-input" placeholder="e.g. 29881">';
    container.appendChild(row);
    row.querySelector('input').focus();
  }

  function addModRow() {
    var container = document.getElementById('modContainer');
    var row = document.createElement('div');
    row.className = 'cwc-code-row cwc-mod-row';
    row.innerHTML = '<input type="text" class="form-input cwc-code-input mod-code-input" placeholder="e.g. 25" style="max-width:80px">' +
                    '<input type="text" class="form-input cwc-code-input mod-desc-input" placeholder="Description (optional)">';
    container.appendChild(row);
    row.querySelector('.mod-code-input').focus();
  }

  // ── Data Collection ────────────────────────────────────
  function collectInputs() {
    var icdInputs = document.querySelectorAll('#icdContainer .icd-input');
    var cptInputs = document.querySelectorAll('#cptContainer .cpt-input');
    var modCodeInputs = document.querySelectorAll('#modContainer .mod-code-input');
    var modDescInputs = document.querySelectorAll('#modContainer .mod-desc-input');

    state.icdCodes = [];
    state.cptCodes = [];
    state.modifiers = [];

    icdInputs.forEach(function(input) {
      var val = input.value.trim();
      if (val) state.icdCodes.push(val);
    });

    cptInputs.forEach(function(input) {
      var val = input.value.trim();
      if (val) state.cptCodes.push(val);
    });

    for (var i = 0; i < modCodeInputs.length; i++) {
      var code = modCodeInputs[i].value.trim();
      if (code) {
        state.modifiers.push({
          code: code,
          description: modDescInputs[i] ? modDescInputs[i].value.trim() : ''
        });
      }
    }

    state.specialty = document.getElementById('specialty') ? document.getElementById('specialty').value : '';
    state.payer = document.getElementById('payer') ? document.getElementById('payer').value : '';
    state.pos = document.getElementById('pos') ? document.getElementById('pos').value : '';
    state.gender = document.getElementById('gender') ? document.getElementById('gender').value : '';
    state.age = document.getElementById('age') ? document.getElementById('age').value : '';

    return state;
  }

  // ── Analysis ───────────────────────────────────────────
  function runAnalysis() {
    var inputs = collectInputs();

    if (inputs.cptCodes.length === 0) {
      showNotification('Please add at least one CPT code', 'error');
      return;
    }

    if (inputs.icdCodes.length === 0) {
      showNotification('Please add at least one ICD-10 code', 'error');
      return;
    }

    var loading = document.getElementById('loading');
    if (loading) loading.classList.add('active');

    setTimeout(function() {
      try {
        state.result = ComplianceEngine.analyze(inputs);
        renderResults(state.result);
      } catch(e) {
        showNotification('Analysis error: ' + e.message, 'error');
      } finally {
        if (loading) loading.classList.remove('active');
      }
    }, 800 + Math.random() * 1200);
  }

  // ── Results Rendering ──────────────────────────────────
  function renderResults(result) {
    var resultsEl = document.getElementById('results');
    if (!resultsEl) return;

    var levelClass = 'cwc-risk-' + result.level;

    // Build gauge SVG
    var circumference = 2 * Math.PI * 32;
    var offset = circumference - (result.overallScore / 100) * circumference;

    var html = '';

    // Input Summary
    html += '<div class="cwc-card"><div class="cwc-card-title">Claim Summary</div>';
    html += '<div class="cwc-summary-grid">';
    html += '<div class="cwc-summary-item"><div class="cwc-summary-label">ICD-10 Codes</div><div class="cwc-summary-value">' + state.icdCodes.join(', ') + '</div></div>';
    html += '<div class="cwc-summary-item"><div class="cwc-summary-label">CPT Codes</div><div class="cwc-summary-value">' + state.cptCodes.join(', ') + '</div></div>';
    if (state.modifiers.length > 0) {
      var modStr = state.modifiers.map(function(m) { return m.code + (m.description ? ' (' + m.description + ')' : ''); }).join(', ');
      html += '<div class="cwc-summary-item"><div class="cwc-summary-label">Modifiers</div><div class="cwc-summary-value">' + modStr + '</div></div>';
    }
    if (state.specialty) html += '<div class="cwc-summary-item"><div class="cwc-summary-label">Specialty</div><div class="cwc-summary-value">' + state.specialty + '</div></div>';
    if (state.payer) html += '<div class="cwc-summary-item"><div class="cwc-summary-label">Payer</div><div class="cwc-summary-value">' + state.payer + '</div></div>';
    if (state.pos) html += '<div class="cwc-summary-item"><div class="cwc-summary-label">Place of Service</div><div class="cwc-summary-value">' + state.pos + '</div></div>';
    if (state.age) html += '<div class="cwc-summary-item"><div class="cwc-summary-label">Patient Age</div><div class="cwc-summary-value">' + state.age + '</div></div>';
    if (state.gender) html += '<div class="cwc-summary-item"><div class="cwc-summary-label">Gender</div><div class="cwc-summary-value">' + state.gender + '</div></div>';
    html += '</div></div>';

    // Results Header
    html += '<div class="cwc-results-header">';
    html += '<div class="cwc-risk-gauge ' + levelClass + '">';
    html += '<div class="cwc-gauge-ring"><svg viewBox="0 0 72 72">';
    html += '<circle cx="36" cy="36" r="32" fill="none" stroke="var(--bg-elevated)" stroke-width="6"/>';
    html += '<circle cx="36" cy="36" r="32" fill="none" stroke-width="6" stroke-linecap="round"';
    html += ' stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '"';
    html += ' transform="rotate(-90 36 36)" style="transition:stroke-dashoffset 1s ease"/>';
    html += '</svg><div class="cwc-gauge-score">' + result.overallScore + '</div></div>';
    html += '<div><div class="cwc-risk-label">Compliance Risk: ' + result.level.toUpperCase() + '</div>';
    html += '<div class="cwc-risk-sublabel">' + result.issues.length + ' issue(s) detected across 5 compliance areas</div></div></div>';
    html += '<div class="cwc-results-actions">';
    html += '<button class="btn btn-outline btn-sm" onclick="CWC.exportReport()">Export Report</button>';
    html += '<button class="btn btn-outline btn-sm" onclick="CWC.clearAll()">New Analysis</button>';
    html += '</div></div>';

    // Category Scores
    html += '<div class="cwc-card"><div class="cwc-card-title">Compliance Areas</div>';
    Object.keys(result.categories).forEach(function(cat) {
      var score = result.categories[cat];
      var color = score >= 85 ? 'var(--green-400)' : score >= 60 ? 'var(--amber-400)' : 'var(--red-400)';
      var scoreClass = score >= 85 ? 'low' : score >= 60 ? 'medium' : 'high';
      html += '<div class="cwc-cat-row">';
      html += '<div class="cwc-cat-name">' + cat + '</div>';
      html += '<div class="cwc-cat-bar-wrap"><div class="cwc-cat-bar" style="width:' + score + '%;background:' + color + '"></div></div>';
      html += '<div class="cwc-cat-score ' + scoreClass + '">' + score + '%</div>';
      html += '</div>';
    });
    html += '</div>';

    // Issues
    if (result.issues.length > 0) {
      html += '<div class="cwc-card"><div class="cwc-card-title">Issues (' + result.issues.length + ')</div>';

      var errorIssues = result.issues.filter(function(i) { return i.severity === 'error'; });
      var warnIssues = result.issues.filter(function(i) { return i.severity === 'warning'; });
      var infoIssues = result.issues.filter(function(i) { return i.severity === 'info'; });

      var order = errorIssues.concat(warnIssues, infoIssues);
      var seen = {};
      order.forEach(function(issue) {
        var key = issue.title + issue.category;
        if (seen[key]) return;
        seen[key] = true;
        var icon = issue.severity === 'error' ? '\u2716' : issue.severity === 'warning' ? '\u26A0' : '\u2139';
        html += '<div class="cwc-issue ' + issue.severity + '">';
        html += '<div class="cwc-issue-header">';
        html += '<span class="cwc-issue-icon">' + icon + '</span>';
        html += '<span class="cwc-issue-title">' + escapeHTML(issue.title) + '</span>';
        html += '<span class="cwc-issue-category ' + issue.category + '">' + issue.category + '</span>';
        html += '</div>';
        html += '<div class="cwc-issue-body">' + escapeHTML(issue.body) + '</div>';
        if (issue.codes && issue.codes.length > 0) {
          html += '<div class="cwc-issue-codes">';
          issue.codes.forEach(function(c) {
            html += '<span class="cwc-issue-code">' + escapeHTML(c) + '</span>';
          });
          html += '</div>';
        }
        html += '</div>';
      });
      html += '</div>';
    }

    // Recommended Actions
    if (result.actions.length > 0) {
      html += '<div class="cwc-card"><div class="cwc-card-title">Recommended Actions</div>';
      result.actions.forEach(function(action, i) {
        html += '<div class="cwc-action">';
        html += '<div class="cwc-action-num">' + (i + 1) + '</div>';
        html += '<div class="cwc-action-text">' + escapeHTML(action.text) + '</div>';
        html += '</div>';
      });
      html += '</div>';
    }

    // Code Analysis
    if (result.codeAnalysis.length > 0) {
      html += '<div class="cwc-card"><div class="cwc-card-title">Code Analysis</div>';
      result.codeAnalysis.forEach(function(code) {
        html += '<div class="cwc-code-item">';
        html += '<div class="cwc-code-value">' + escapeHTML(code.value) + '</div>';
        html += '<div class="cwc-code-desc">' + escapeHTML(code.description);
        if (code.modifier) html += ' (Modifier: ' + code.modifier + ')';
        html += '</div>';
        html += '<div class="cwc-code-status ' + code.status + '">' + code.status.toUpperCase() + '</div>';
        html += '</div>';
      });
      html += '</div>';
    }

    // Confidence
    html += '<div class="cwc-card"><div class="cwc-card-title">Confidence</div>';
    html += '<div class="cwc-confidence"><div class="cwc-confidence-bar"><div class="cwc-confidence-fill" style="width:' + result.confidence + '%"></div></div>';
    html += '<div class="cwc-confidence-label">' + result.confidence + '%</div></div>';
    html += '<div class="cwc-confidence-desc">Confidence based on completeness of input data: ICD-CPT linkage, specialty context, payer information.</div>';
    html += '</div>';

    // Disclaimer
    html += '<div class="cwc-disclaimer">';
    html += '<strong>Disclaimer:</strong> This analysis is for informational purposes only and does not constitute billing or legal advice. Always verify compliance with current NCCI, LCD/NCD, and payer-specific guidelines. Consult certified coding specialists for definitive guidance.';
    html += '</div>';

    resultsEl.innerHTML = html;
    resultsEl.style.display = 'block';
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Export ─────────────────────────────────────────────
  function exportReport() {
    if (!state.result) {
      showNotification('Run an analysis first', 'error');
      return;
    }

    var result = state.result;
    var lines = [];
    lines.push('RCM DENIALS — CODING COMPLIANCE REPORT');
    lines.push('Generated: ' + new Date().toLocaleString());
    lines.push('');
    lines.push('=== INPUTS ===');
    lines.push('ICD-10 Codes: ' + state.icdCodes.join(', '));
    lines.push('CPT Codes: ' + state.cptCodes.join(', '));
    if (state.modifiers.length > 0) {
      lines.push('Modifiers: ' + state.modifiers.map(function(m) { return m.code; }).join(', '));
    }
    if (state.specialty) lines.push('Specialty: ' + state.specialty);
    if (state.payer) lines.push('Payer: ' + state.payer);
    if (state.pos) lines.push('Place of Service: ' + state.pos);
    if (state.age) lines.push('Patient Age: ' + state.age);
    if (state.gender) lines.push('Gender: ' + state.gender);
    lines.push('');
    lines.push('=== RESULTS ===');
    lines.push('Overall Score: ' + result.overallScore + '/100');
    lines.push('Risk Level: ' + result.level.toUpperCase());
    lines.push('');
    lines.push('Category Scores:');
    Object.keys(result.categories).forEach(function(cat) {
      lines.push('  ' + cat + ': ' + result.categories[cat] + '%');
    });
    lines.push('');
    lines.push('=== ISSUES (' + result.issues.length + ') ===');
    var seen = {};
    result.issues.forEach(function(issue) {
      var key = issue.title + issue.category;
      if (seen[key]) return;
      seen[key] = true;
      lines.push('');
      lines.push('[' + issue.severity.toUpperCase() + '] ' + issue.title + ' (' + issue.category + ')');
      lines.push('  ' + issue.body);
      if (issue.codes && issue.codes.length > 0) {
        lines.push('  Codes: ' + issue.codes.join(', '));
      }
    });
    lines.push('');
    lines.push('=== RECOMMENDED ACTIONS ===');
    result.actions.forEach(function(action, i) {
      lines.push((i + 1) + '. [' + action.severity.toUpperCase() + '] ' + action.text);
    });
    lines.push('');
    lines.push('Confidence: ' + result.confidence + '%');
    lines.push('');
    lines.push('DISCLAIMER: This report is for informational purposes only and does not constitute billing or legal advice.');

    var text = lines.join('\n');
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'compliance-report-' + Date.now() + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ── Clear ──────────────────────────────────────────────
  function clearAll() {
    document.getElementById('icdContainer').innerHTML = '<div class="cwc-code-row"><input type="text" class="form-input cwc-code-input icd-input" placeholder="e.g. M17.11"></div>';
    document.getElementById('cptContainer').innerHTML = '<div class="cwc-code-row"><input type="text" class="form-input cwc-code-input cpt-input" placeholder="e.g. 29881"></div>';
    document.getElementById('modContainer').innerHTML = '';
    var specialty = document.getElementById('specialty');
    var payer = document.getElementById('payer');
    var pos = document.getElementById('pos');
    var gender = document.getElementById('gender');
    var age = document.getElementById('age');
    if (specialty) specialty.value = '';
    if (payer) payer.value = '';
    if (pos) pos.value = '';
    if (gender) gender.value = '';
    if (age) age.value = '';
    var results = document.getElementById('results');
    if (results) { results.innerHTML = ''; results.style.display = 'none'; }
    state = { icdCodes: [], cptCodes: [], modifiers: [], specialty: '', payer: '', pos: '', gender: '', age: '', result: null };
  }

  // ── Examples ───────────────────────────────────────────
  function loadExample1() {
    clearAll();
    var icdContainer = document.getElementById('icdContainer');
    var cptContainer = document.getElementById('cptContainer');
    var modContainer = document.getElementById('modContainer');

    icdContainer.innerHTML = '';
    cptContainer.innerHTML = '';
    modContainer.innerHTML = '';

    var icds = ['M17.11', 'M17.12', 'E11.9'];
    var cpts = ['29881', '99214'];
    var mods = [{ code: '25', desc: 'Separate E/M' }];

    icds.forEach(function(code) {
      var row = document.createElement('div');
      row.className = 'cwc-code-row';
      row.innerHTML = '<input type="text" class="form-input cwc-code-input icd-input" value="' + code + '">';
      icdContainer.appendChild(row);
    });

    cpts.forEach(function(code) {
      var row = document.createElement('div');
      row.className = 'cwc-code-row';
      row.innerHTML = '<input type="text" class="form-input cwc-code-input cpt-input" value="' + code + '">';
      cptContainer.appendChild(row);
    });

    mods.forEach(function(mod) {
      var row = document.createElement('div');
      row.className = 'cwc-code-row cwc-mod-row';
      row.innerHTML = '<input type="text" class="form-input cwc-code-input mod-code-input" value="' + mod.code + '" style="max-width:80px">' +
                      '<input type="text" class="form-input cwc-code-input mod-desc-input" value="' + mod.desc + '">';
      modContainer.appendChild(row);
    });

    var specialty = document.getElementById('specialty');
    var payer = document.getElementById('payer');
    var pos = document.getElementById('pos');
    var gender = document.getElementById('gender');
    var age = document.getElementById('age');
    if (specialty) specialty.value = 'Orthopedic Surgery';
    if (payer) payer.value = 'Aetna';
    if (pos) pos.value = '11';
    if (gender) gender.value = 'Female';
    if (age) age.value = '58';
  }

  function loadExample2() {
    clearAll();
    var icdContainer = document.getElementById('icdContainer');
    var cptContainer = document.getElementById('cptContainer');
    var modContainer = document.getElementById('modContainer');

    icdContainer.innerHTML = '';
    cptContainer.innerHTML = '';
    modContainer.innerHTML = '';

    var icds = ['I25.10', 'E78.5', 'I10'];
    var cpts = ['93000', '99213', '80053', '83718', '84478'];

    icds.forEach(function(code) {
      var row = document.createElement('div');
      row.className = 'cwc-code-row';
      row.innerHTML = '<input type="text" class="form-input cwc-code-input icd-input" value="' + code + '">';
      icdContainer.appendChild(row);
    });

    cpts.forEach(function(code) {
      var row = document.createElement('div');
      row.className = 'cwc-code-row';
      row.innerHTML = '<input type="text" class="form-input cwc-code-input cpt-input" value="' + code + '">';
      cptContainer.appendChild(row);
    });

    var specialty = document.getElementById('specialty');
    var payer = document.getElementById('payer');
    var pos = document.getElementById('pos');
    var gender = document.getElementById('gender');
    var age = document.getElementById('age');
    if (specialty) specialty.value = 'Cardiology';
    if (payer) payer.value = 'Medicare';
    if (pos) pos.value = '11';
    if (gender) gender.value = 'Male';
    if (age) age.value = '67';
  }

  // ── Utils ──────────────────────────────────────────────
  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function showNotification(msg, type) {
    var existing = document.querySelector('.cwc-notification');
    if (existing) existing.remove();

    var el = document.createElement('div');
    el.className = 'cwc-notification';
    el.style.cssText = 'position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;z-index:1000;animation:slideInRight .3s ease';
    if (type === 'error') {
      el.style.background = 'var(--red-400)';
      el.style.color = '#fff';
    } else {
      el.style.background = 'var(--green-400)';
      el.style.color = '#fff';
    }
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function() { el.remove(); }, 3000);
  }

  return {
    init: init,
    addICDRow: addICDRow,
    addCPTRow: addCPTRow,
    addModRow: addModRow,
    runAnalysis: runAnalysis,
    exportReport: exportReport,
    clearAll: clearAll,
    loadExample1: loadExample1,
    loadExample2: loadExample2
  };

})();

document.addEventListener('DOMContentLoaded', CWC.init);
