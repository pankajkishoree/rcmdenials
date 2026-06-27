/* ═══════════════════════════════════════════════════════════════
   RCM DENIALS — GLOBAL SEARCH ENGINE
   Fuzzy matching, typo tolerance, synonym support, normalization
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─── NORMALIZATION ───
  // Strips hyphens, underscores, slashes, extra spaces, punctuation, and lowercases
  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .replace(/[\-_/\\.,;:!?'"()\[\]{}]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // ─── LEVENSHTEIN DISTANCE (typo tolerance) ───
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var matrix = [];
    for (var i = 0; i <= b.length; i++) matrix[i] = [i];
    for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // ─── FUZZY SCORE ───
  // Returns a score 0–100 (higher = better match)
  function fuzzyScore(query, target) {
    var nq = normalize(query);
    var nt = normalize(target);
    if (!nq || !nt) return 0;

    // Exact match
    if (nt === nq) return 100;

    // Starts with
    if (nt.indexOf(nq) === 0) return 95;

    // Contains
    if (nt.indexOf(nq) !== -1) return 85;

    // Word starts with (for multi-word targets)
    var qWords = nq.split(' ');
    var tWords = nt.split(' ');
    var wordMatch = true;
    for (var i = 0; i < qWords.length; i++) {
      var found = false;
      for (var j = 0; j < tWords.length; j++) {
        if (tWords[j].indexOf(qWords[i]) === 0 || tWords[j].indexOf(qWords[i]) !== -1) {
          found = true;
          break;
        }
      }
      if (!found) { wordMatch = false; break; }
    }
    if (wordMatch && qWords.length > 1) return 80;

    // Levenshtein (typo tolerance) — only for short queries
    if (nq.length >= 2) {
      var dist = levenshtein(nq, nt);
      var maxLen = Math.max(nq.length, nt.length);
      var similarity = 1 - (dist / maxLen);
      if (similarity > 0.6) return Math.round(similarity * 70);
    }

    // Partial character match
    var matches = 0;
    var nqi = 0;
    for (i = 0; i < nt.length && nqi < nq.length; i++) {
      if (nt[i] === nq[nqi]) { matches++; nqi++; }
    }
    if (matches > 0 && matches === nq.length) return 60;
    if (matches > 1) return Math.round((matches / nq.length) * 50);

    return 0;
  }

  // ─── HIGHLIGHT MATCHING TEXT ───
  function highlight(text, query) {
    if (!query || !text) return text;
    var nq = normalize(query);
    var words = nq.split(' ').filter(function(w) { return w.length > 1; });
    var result = text;
    words.forEach(function(word) {
      // Escape regex special chars
      var escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var re = new RegExp('(' + escaped + ')', 'gi');
      result = result.replace(re, '<mark>$1</mark>');
    });
    return result;
  }

  // ─── CATEGORY LABELS ───
  var CAT_LABELS = {
    'denial-code': 'Denial Code',
    'specialty': 'Specialty',
    'tool': 'AI Tool',
    'page': 'Page',
    'faq': 'FAQ'
  };

  var CAT_ICONS = {
    'denial-code': '📄',
    'specialty': '🩺',
    'tool': '🛠',
    'page': '📄',
    'faq': '❓'
  };

  // ─── SEARCH ENGINE ───
  function search(query) {
    if (!query || !query.trim()) return [];
    var results = [];
    var seen = {};

    // Generate all query variants for normalization
    var nq = normalize(query);

    // Also try: remove spaces from query (for "co 96" -> "co96")
    var noSpace = nq.replace(/\s/g, '');
    // Try: split into code-like patterns (e.g., "co96" -> "co-96")
    var codeMatch = noSpace.match(/^([a-z]+)(\d+)$/);

    for (var i = 0; i < SEARCH_INDEX.length; i++) {
      var item = SEARCH_INDEX[i];
      if (seen[item.id]) continue;

      var bestScore = 0;
      var bestField = '';

      // Fields to search against
      var fields = [
        { val: item.title, weight: 1.5 },
        { val: item.desc, weight: 1.0 },
        { val: item.code || '', weight: 1.8 },
        { val: item.keywords || '', weight: 1.2 }
      ];

      for (var f = 0; f < fields.length; f++) {
        var field = fields[f];
        if (!field.val) continue;

        // Direct score
        var score = fuzzyScore(query, field.val) * field.weight;
        if (score > bestScore) { bestScore = score; bestField = field.val; }

        // Normalized score (strip hyphens etc)
        var normalizedField = normalize(field.val);
        score = fuzzyScore(query, normalizedField) * field.weight;
        if (score > bestScore) { bestScore = score; bestField = field.val; }

        // Space-removed score
        var noSpaceField = normalizedField.replace(/\s/g, '');
        score = fuzzyScore(noSpace, noSpaceField) * field.weight;
        if (score > bestScore) { bestScore = score; bestField = field.val; }

        // Code variant: "co96" -> check against "co-96" format
        if (codeMatch && item.code) {
          var normalizedCode = normalize(item.code);
          if (normalizedCode === noSpace) { score = 98 * field.weight; }
          else {
            var itemCodeNoSpace = normalizedCode.replace(/[\s\-]/g, '');
            if (itemCodeNoSpace === noSpace) { score = 98 * field.weight; }
          }
          if (score > bestScore) { bestScore = score; bestField = item.code; }
        }
      }

      // Threshold for inclusion
      if (bestScore >= 30) {
        results.push({
          item: item,
          score: bestScore,
          field: bestField
        });
        seen[item.id] = true;
      }
    }

    // Sort by score descending
    results.sort(function(a, b) { return b.score - a.score; });

    return results;
  }

  // ─── GROUP BY CATEGORY ───
  function groupResults(results) {
    var groups = {};
    var order = ['denial-code', 'tool', 'specialty', 'faq', 'page'];

    results.forEach(function(r) {
      var cat = r.item.cat;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(r);
    });

    // Sort groups by predefined order
    var sorted = [];
    order.forEach(function(cat) {
      if (groups[cat]) {
        sorted.push({ cat: cat, label: CAT_LABELS[cat] || cat, items: groups[cat] });
      }
    });

    return sorted;
  }

  // ─── ROTATING PLACEHOLDERS ───
  var PLACEHOLDERS = [
    'Search denial codes...',
    'Search CO-96...',
    'Search specialties...',
    'Search modifiers...',
    'Search CPT codes...',
    'Search ICD codes...',
    'Search AI tools...',
    'Search FAQs...',
    'Search cardiology...',
    'Search medical billing topics...',
    'Search timely filing...',
    'Search prior authorization...',
    'Search coordination of benefits...',
    'Search payer directory...'
  ];

  var placeholderIdx = 0;
  function rotatePlaceholder() {
    var el = document.getElementById('globalSearchInput');
    if (el && !el.value) {
      el.placeholder = PLACEHOLDERS[placeholderIdx % PLACEHOLDERS.length];
      placeholderIdx++;
    }
  }

  // ─── DOM: CREATE SEARCH UI ───
  function initSearch() {
    var headerInner = document.querySelector('.home-header-inner');
    if (!headerInner) return;

    // Create search container
    var searchWrap = document.createElement('div');
    searchWrap.className = 'global-search-wrap';
    searchWrap.innerHTML =
      '<div class="global-search" role="combobox" aria-expanded="false" aria-haspopup="listbox">' +
        '<svg class="global-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
        '<input type="text" id="globalSearchInput" class="global-search-input" placeholder="Search denial codes, specialties, tools..." autocomplete="off" aria-label="Search the entire RCM Denials website" aria-autocomplete="list" aria-controls="globalSearchResults" />' +
        '<kbd class="global-search-kbd">Esc</kbd>' +
      '</div>' +
      '<div class="global-search-dropdown" id="globalSearchResults" role="listbox" aria-label="Search results"></div>';

    // Insert between logo and nav
    var nav = headerInner.querySelector('.home-nav');
    if (nav) {
      headerInner.insertBefore(searchWrap, nav);
    } else {
      headerInner.appendChild(searchWrap);
    }

    var input = document.getElementById('globalSearchInput');
    var dropdown = document.getElementById('globalSearchResults');
    var searchBox = searchWrap.querySelector('.global-search');
    var debounceTimer = null;
    var activeIdx = -1;

    // ─── INPUT HANDLER (debounced) ───
    input.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      var val = input.value.trim();

      if (!val) {
        hideDropdown();
        return;
      }

      debounceTimer = setTimeout(function() {
        var results = search(val);
        if (results.length === 0) {
          showEmpty(val);
        } else {
          showResults(groupResults(results), val);
        }
      }, 150);
    });

    // ─── KEYBOARD NAVIGATION ───
    input.addEventListener('keydown', function(e) {
      var items = dropdown.querySelectorAll('.global-search-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, items.length - 1);
        setActive(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        setActive(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIdx >= 0 && items[activeIdx]) {
          items[activeIdx].click();
        } else if (items.length > 0) {
          items[0].click();
        }
      } else if (e.key === 'Escape') {
        input.blur();
        hideDropdown();
      } else if (e.key === 'Tab') {
        hideDropdown();
      }
    });

    // ─── FOCUS / BLUR ───
    input.addEventListener('focus', function() {
      if (input.value.trim()) {
        var results = search(input.value.trim());
        if (results.length > 0) {
          showResults(groupResults(results), input.value.trim());
        }
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!searchWrap.contains(e.target)) {
        hideDropdown();
      }
    });

    // ─── SHOW RESULTS ───
    function showResults(groups, query) {
      activeIdx = -1;
      var html = '';
      var totalShown = 0;

      groups.forEach(function(group) {
        html += '<div class="global-search-group">';
        html += '<div class="global-search-group-label">' + group.label + '</div>';
        var showCount = Math.min(group.items.length, 8);
        for (var i = 0; i < showCount; i++) {
          var r = group.items[i];
          var item = r.item;
          html += '<a href="' + item.url + '" class="global-search-item" role="option">';
          html += '<span class="global-search-item-icon">' + (item.icon || CAT_ICONS[item.cat] || '📄') + '</span>';
          html += '<span class="global-search-item-body">';
          html += '<span class="global-search-item-title">' + highlight(item.title, query) + '</span>';
          html += '<span class="global-search-item-desc">' + highlight(item.desc, query) + '</span>';
          html += '</span>';
          html += '<span class="global-search-item-cat">' + (CAT_LABELS[item.cat] || item.cat) + '</span>';
          html += '</a>';
          totalShown++;
        }
        if (group.items.length > showCount) {
          html += '<div class="global-search-more">+' + (group.items.length - showCount) + ' more</div>';
        }
        html += '</div>';
      });

      if (totalShown === 0) {
        showEmpty(query);
        return;
      }

      dropdown.innerHTML = html;
      dropdown.classList.add('visible');
      searchBox.classList.add('open');
      searchBox.setAttribute('aria-expanded', 'true');

      // Attach click handlers
      dropdown.querySelectorAll('.global-search-item').forEach(function(el) {
        el.addEventListener('click', function() {
          hideDropdown();
        });
      });
    }

    // ─── EMPTY STATE ───
    function showEmpty(query) {
      dropdown.innerHTML =
        '<div class="global-search-empty">' +
          '<div class="global-search-empty-icon">🔍</div>' +
          '<div class="global-search-empty-title">No results found for "' + query + '"</div>' +
          '<div class="global-search-empty-hint">Try searching for denial codes (CO-96), specialties (Cardiology), or tools (Modifier Validator)</div>' +
        '</div>';
      dropdown.classList.add('visible');
      searchBox.classList.add('open');
    }

    // ─── HIDE DROPDOWN ───
    function hideDropdown() {
      dropdown.classList.remove('visible');
      searchBox.classList.remove('open');
      searchBox.setAttribute('aria-expanded', 'false');
      activeIdx = -1;
    }

    // ─── SET ACTIVE ITEM ───
    function setActive(items) {
      items.forEach(function(el, idx) {
        el.classList.toggle('active', idx === activeIdx);
      });
      if (activeIdx >= 0 && items[activeIdx]) {
        items[activeIdx].scrollIntoView({ block: 'nearest' });
      }
    }

    // ─── ROTATE PLACEHOLDER ───
    setInterval(rotatePlaceholder, 3000);
    rotatePlaceholder();

    // ─── ANALYTICS (localStorage) ───
    function trackSearch(query) {
      try {
        var data = JSON.parse(localStorage.getItem('rcm_search_analytics') || '{}');
        if (!data.queries) data.queries = {};
        data.queries[query] = (data.queries[query] || 0) + 1;
        data.totalSearches = (data.totalSearches || 0) + 1;
        data.lastSearch = query;
        localStorage.setItem('rcm_search_analytics', JSON.stringify(data));
      } catch(e) {}
    }

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && input.value.trim()) {
        trackSearch(input.value.trim());
      }
    });
  }

  // ─── INIT ON DOM READY ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }

})();
