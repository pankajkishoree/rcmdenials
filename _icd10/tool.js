'use strict';
var ICD10Tool = (function() {

  var searchInput, autocompleteEl, resultsContainer, resultsList, resultsCount;
  var detailOverlay, detailPanel;
  var clearBtn;
  var debounceTimer = null;
  var activeAcIndex = -1;
  var currentQuery = '';

  function init() {
    searchInput = document.getElementById('icdSearchInput');
    autocompleteEl = document.getElementById('icdAutocomplete');
    resultsContainer = document.getElementById('icdResults');
    resultsList = document.getElementById('icdResultsList');
    resultsCount = document.getElementById('icdResultsCount');
    detailOverlay = document.getElementById('icdDetailOverlay');
    detailPanel = document.getElementById('icdDetailPanel');
    clearBtn = document.getElementById('icdSearchClear');

    if (!searchInput) return;

    ICD10Search.init(function() {
      updateStats();
      renderChapters();
      checkUrlCode();
    });

    searchInput.addEventListener('input', onSearchInput);
    searchInput.addEventListener('keydown', onSearchKeydown);
    searchInput.addEventListener('focus', function() {
      if (searchInput.value.length >= 2) showAutocomplete(searchInput.value);
    });

    document.addEventListener('click', function(e) {
      if (!autocompleteEl.contains(e.target) && e.target !== searchInput) {
        hideAutocomplete();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentQuery = '';
        clearBtn.classList.remove('visible');
        hideAutocomplete();
        resultsContainer.classList.remove('visible');
        searchInput.focus();
        history.replaceState(null, '', window.location.pathname);
      });
    }

    if (detailOverlay) {
      detailOverlay.addEventListener('click', function(e) {
        if (e.target === detailOverlay) closeDetail();
      });
      var closeBtn = detailOverlay.querySelector('.icd-detail-close');
      if (closeBtn) closeBtn.addEventListener('click', closeDetail);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (detailOverlay && detailOverlay.classList.contains('open')) {
          closeDetail();
        } else {
          hideAutocomplete();
        }
      }
    });
  }

  function updateStats() {
    var stats = ICD10Search.getStats();
    var el;
    el = document.getElementById('icdStatCodes');
    if (el) el.textContent = stats.totalCodes.toLocaleString();
    el = document.getElementById('icdStatCats');
    if (el) el.textContent = stats.totalCategories.toLocaleString();
    el = document.getElementById('icdStatChapters');
    if (el) el.textContent = stats.totalChapters;
  }

  function renderChapters() {
    var container = document.getElementById('icdChaptersGrid');
    if (!container) return;
    var chapters = ICD10Search.getChapters();
    var html = '';
    for (var i = 0; i < chapters.length; i++) {
      var ch = chapters[i];
      html += '<div class="icd-chapter-item" onclick="ICD10Tool.searchChapter(\'' + ch.range.split('-')[0] + '\')">';
      html += '<span class="icd-chapter-num">' + ch.code + '</span>';
      html += '<span class="icd-chapter-name">' + ch.name + '</span>';
      html += '<span class="icd-chapter-range">' + ch.range + '</span>';
      html += '</div>';
    }
    container.innerHTML = html;
  }

  function onSearchInput() {
    var val = searchInput.value.trim();
    currentQuery = val;

    if (clearBtn) {
      clearBtn.classList.toggle('visible', val.length > 0);
    }

    clearTimeout(debounceTimer);
    if (val.length >= 2) {
      debounceTimer = setTimeout(function() {
        showAutocomplete(val);
      }, 150);
    } else {
      hideAutocomplete();
    }

    if (val.length >= 2) {
      debounceTimer = setTimeout(function() {
        performSearch(val);
      }, 250);
    } else {
      resultsContainer.classList.remove('visible');
    }
  }

  function onSearchKeydown(e) {
    var items = autocompleteEl.querySelectorAll('.icd-autocomplete-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeAcIndex = Math.min(activeAcIndex + 1, items.length - 1);
      updateActiveAc(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeAcIndex = Math.max(activeAcIndex - 1, -1);
      updateActiveAc(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeAcIndex >= 0 && items[activeAcIndex]) {
        var code = items[activeAcIndex].getAttribute('data-code');
        if (code) selectCode(code);
      } else {
        hideAutocomplete();
        performSearch(searchInput.value.trim());
      }
    }
  }

  function updateActiveAc(items) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('active', i === activeAcIndex);
    }
    if (activeAcIndex >= 0 && items[activeAcIndex]) {
      items[activeAcIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function showAutocomplete(query) {
    var suggestions = ICD10Search.autocomplete(query, 8);
    if (!suggestions.length) {
      hideAutocomplete();
      return;
    }

    activeAcIndex = -1;
    var html = '';
    for (var i = 0; i < suggestions.length; i++) {
      var s = suggestions[i];
      var typeLabel = s.type === 'code' ? 'Code' : s.type === 'synonym' ? 'Synonym' : 'Match';
      html += '<div class="icd-autocomplete-item" data-code="' + s.code + '" onclick="ICD10Tool.selectCode(\'' + s.code + '\')">';
      html += '<span class="icd-ac-code">' + s.code + '</span>';
      html += '<span class="icd-ac-desc">' + escapeHtml(s.description) + '</span>';
      html += '<span class="icd-ac-type">' + typeLabel + '</span>';
      html += '</div>';
    }
    autocompleteEl.innerHTML = html;
    autocompleteEl.classList.add('open');
  }

  function hideAutocomplete() {
    autocompleteEl.classList.remove('open');
    activeAcIndex = -1;
  }

  function performSearch(query) {
    if (!query || query.length < 2) return;
    var results = ICD10Search.search(query, 20);
    renderResults(results, query);
  }

  function renderResults(results, query) {
    resultsContainer.classList.add('visible');
    hideAutocomplete();

    if (!results.length) {
      resultsCount.innerHTML = '';
      resultsList.innerHTML = '<div class="icd-no-results"><div class="icd-no-results-icon">🔍</div><div class="icd-no-results-title">No codes found</div><div class="icd-no-results-hint">Try different keywords, medical terms, or ICD-10 code format (e.g., E11.9, M54.5)</div></div>';
      return;
    }

    resultsCount.innerHTML = 'Showing <strong>' + results.length + '</strong> results for "<strong>' + escapeHtml(query) + '</strong>"';

    var html = '';
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      var entry = r.entry;
      html += '<div class="icd-result-card" onclick="ICD10Tool.openDetail(\'' + entry.code + '\')">';
      html += '<div class="icd-result-top">';
      html += '<div class="icd-result-code">' + entry.code + '</div>';
      html += '<div class="icd-result-info">';
      html += '<div class="icd-result-desc">' + escapeHtml(entry.description) + '</div>';
      html += '<div class="icd-result-category">Category: ' + entry.category;
      var cat = ICD10Search.getParentCategory(entry.code);
      if (cat) html += ' — ' + escapeHtml(cat.description);
      html += '</div>';
      if (entry.commonUse && entry.commonUse.length > 0) {
        html += '<div class="icd-result-synonyms">';
        var shown = 0;
        for (var s = 0; s < entry.commonUse.length && shown < 3; s++) {
          html += '<span class="icd-synonym-tag">' + escapeHtml(entry.commonUse[s]) + '</span>';
          shown++;
        }
        html += '</div>';
      }
      html += '</div>';
      html += '<div class="icd-result-score">' + (r.matchType === 'exact' ? 'Exact' : r.matchType === 'strong' ? 'Strong' : 'Related') + '</div>';
      html += '</div>';
      html += '</div>';
    }
    resultsList.innerHTML = html;
  }

  function selectCode(code) {
    searchInput.value = code;
    currentQuery = code;
    hideAutocomplete();
    if (clearBtn) clearBtn.classList.add('visible');
    performSearch(code);
    openDetail(code);
  }

  function openDetail(code) {
    var entry = ICD10Search.findByCode(code);
    if (!entry) return;

    history.pushState({ code: code }, '', 'index.html?code=' + encodeURIComponent(code));
    document.title = 'ICD-10 Code ' + code + ' — ' + entry.description + ' | RCM Denials';

    var cat = ICD10Search.getParentCategory(code);
    var similar = ICD10Search.findSimilar(code, 6);
    var children = ICD10Search.getChildCodes(entry.category);
    var chapterName = '';
    if (cat) {
      var chapters = ICD10Search.getChapters();
      for (var i = 0; i < chapters.length; i++) {
        if (chapters[i].code === cat.chapter) {
          chapterName = chapters[i].name;
          break;
        }
      }
    }

    var html = '';
    html += '<div class="icd-detail-breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">ICD-10 Search</a> / <span>' + code + '</span></div>';
    html += '<div class="icd-detail-header">';
    html += '<div class="icd-detail-code">' + code + '</div>';
    html += '<button class="icd-detail-close" onclick="ICD10Tool.closeDetail()">✕</button>';
    html += '</div>';
    html += '<div class="icd-detail-body">';

    // Description
    html += '<div class="icd-detail-section">';
    html += '<div class="icd-detail-section-title">Description</div>';
    html += '<div class="icd-detail-desc">' + escapeHtml(entry.description) + '</div>';
    html += '</div>';

    // Meta info
    html += '<div class="icd-detail-section">';
    html += '<div class="icd-detail-meta">';
    html += '<div class="icd-detail-meta-item"><div class="icd-detail-meta-label">Category</div><div class="icd-detail-meta-value">' + entry.category + '</div></div>';
    if (cat) {
      html += '<div class="icd-detail-meta-item"><div class="icd-detail-meta-label">Category Name</div><div class="icd-detail-meta-value">' + escapeHtml(cat.description) + '</div></div>';
    }
    if (chapterName) {
      html += '<div class="icd-detail-meta-item"><div class="icd-detail-meta-label">Chapter</div><div class="icd-detail-meta-value">' + cat.chapter + ' — ' + escapeHtml(chapterName) + '</div></div>';
    }
    if (cat && cat.range) {
      html += '<div class="icd-detail-meta-item"><div class="icd-detail-meta-label">Code Range</div><div class="icd-detail-meta-value" style="font-family:var(--font-mono)">' + cat.range + '</div></div>';
    }
    html += '</div>';
    html += '</div>';

    // Common Use
    if (entry.commonUse && entry.commonUse.length > 0) {
      html += '<div class="icd-detail-section">';
      html += '<div class="icd-detail-section-title">Common Usage / Synonyms</div>';
      html += '<ul class="icd-detail-list">';
      for (var u = 0; u < entry.commonUse.length; u++) {
        html += '<li>' + escapeHtml(entry.commonUse[u]) + '</li>';
      }
      html += '</ul>';
      html += '</div>';
    }

    // Includes
    if (entry.includes && entry.includes.length > 0) {
      html += '<div class="icd-detail-section">';
      html += '<div class="icd-detail-section-title">Includes</div>';
      html += '<ul class="icd-detail-list">';
      for (var inc = 0; inc < entry.includes.length; inc++) {
        html += '<li>' + escapeHtml(entry.includes[inc]) + '</li>';
      }
      html += '</ul>';
      html += '</div>';
    }

    // Excludes1
    if (entry.excludes1 && entry.excludes1.length > 0) {
      html += '<div class="icd-detail-section">';
      html += '<div class="icd-detail-section-title">Excludes1</div>';
      for (var e1 = 0; e1 < entry.excludes1.length; e1++) {
        html += '<div class="icd-exclusion-note">' + escapeHtml(entry.excludes1[e1]) + '</div>';
      }
      html += '</div>';
    }

    // Excludes2
    if (entry.excludes2 && entry.excludes2.length > 0) {
      html += '<div class="icd-detail-section">';
      html += '<div class="icd-detail-section-title">Excludes2</div>';
      for (var e2 = 0; e2 < entry.excludes2.length; e2++) {
        html += '<div class="icd-exclusion-note">' + escapeHtml(entry.excludes2[e2]) + '</div>';
      }
      html += '</div>';
    }

    // Documentation
    if (entry.documentation && entry.documentation.length > 0) {
      html += '<div class="icd-detail-section">';
      html += '<div class="icd-detail-section-title">Documentation Tips</div>';
      html += '<ul class="icd-detail-list">';
      for (var d = 0; d < entry.documentation.length; d++) {
        html += '<li>' + escapeHtml(entry.documentation[d]) + '</li>';
      }
      html += '</ul>';
      html += '</div>';
    }

    // Child codes
    if (children.length > 1) {
      html += '<div class="icd-detail-section">';
      html += '<div class="icd-detail-section-title">Subcodes in ' + entry.category + '</div>';
      html += '<div class="icd-similar-grid">';
      for (var ch = 0; ch < children.length; ch++) {
        if (children[ch].code === code) continue;
        html += '<div class="icd-similar-card" onclick="ICD10Tool.openDetail(\'' + children[ch].code + '\')">';
        html += '<div class="icd-similar-code">' + children[ch].code + '</div>';
        html += '<div class="icd-similar-desc">' + escapeHtml(children[ch].description) + '</div>';
        html += '</div>';
      }
      html += '</div>';
      html += '</div>';
    }

    // Similar Codes
    if (similar.length > 0) {
      html += '<div class="icd-detail-section">';
      html += '<div class="icd-detail-section-title">Related / Similar Codes</div>';
      html += '<div class="icd-similar-grid">';
      for (var sm = 0; sm < similar.length; sm++) {
        html += '<div class="icd-similar-card" onclick="ICD10Tool.openDetail(\'' + similar[sm].code + '\')">';
        html += '<div class="icd-similar-code">' + similar[sm].code + '</div>';
        html += '<div class="icd-similar-desc">' + escapeHtml(similar[sm].description) + '</div>';
        html += '</div>';
      }
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    detailPanel.innerHTML = html;
    detailOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDetail() {
    detailOverlay.classList.remove('open');
    document.body.style.overflow = '';
    history.pushState(null, '', window.location.pathname);
    document.title = 'ICD-10 Code Lookup — Free ICD-10-CM Search Tool | RCM Denials';
  }

  function searchChapter(startCode) {
    searchInput.value = startCode;
    currentQuery = startCode;
    if (clearBtn) clearBtn.classList.add('visible');
    performSearch(startCode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function checkUrlCode() {
    var params = new URLSearchParams(window.location.search);
    var code = params.get('code');
    if (code) {
      searchInput.value = code;
      currentQuery = code;
      if (clearBtn) clearBtn.classList.add('visible');
      performSearch(code);
      setTimeout(function() { openDetail(code); }, 100);
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  return {
    init: init,
    selectCode: selectCode,
    openDetail: openDetail,
    closeDetail: closeDetail,
    searchChapter: searchChapter
  };

})();

document.addEventListener('DOMContentLoaded', ICD10Tool.init);
