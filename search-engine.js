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

  // ─── RELEVANCE SCORING ───
  // Returns a score 0–1000+ (higher = better match)
  // This is the core ranking algorithm that determines result order.
  function scoreItem(item, nq, rawQuery) {
    var nTitle = normalize(item.title);
    var nDesc = normalize(item.desc || '');
    var nCode = normalize(item.code || '');
    var nKeywords = normalize(item.keywords || '');
    var noSpace = nq.replace(/\s/g, '');
    var score = 0;

    // ── PRIORITY 1: Exact title match (+1000) ──
    if (nTitle === nq) { score = 1000; return score; }

    // ── PRIORITY 2: Exact code match (+950) ──
    if (nCode) {
      var codeNoSpace = nCode.replace(/[\s\-]/g, '');
      if (nCode === nq || codeNoSpace === nq || codeNoSpace === noSpace) {
        score = 950; return score;
      }
      // Code variant: "co96" matches "co-96"
      var codeParts = nCode.match(/^([a-z]+)[\s\-]?(\d+)$/);
      if (codeParts && noSpace === codeParts[1] + codeParts[2]) {
        score = 940; return score;
      }
    }

    // ── PRIORITY 3: Title starts-with (+850) ──
    if (nTitle.indexOf(nq) === 0) { score = 850; return score; }

    // ── PRIORITY 4: Exact keyword match (+800) ──
    if (nKeywords) {
      var kwParts = nKeywords.split(/[\s,]+/);
      for (var k = 0; k < kwParts.length; k++) {
        if (kwParts[k] === nq) { score = 800; return score; }
      }
    }

    // ── PRIORITY 5: Synonym / keyword contains exact match (+750) ──
    if (nKeywords && nKeywords.indexOf(nq) !== -1) {
      // Check if query is a standalone word in keywords
      var kwRegex = new RegExp('(?:^|[\\s,])' + nq.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:[\\s,]|$)');
      if (kwRegex.test(nKeywords)) { score = 750; return score; }
    }

    // ── PRIORITY 6: Title contains query (+700) ──
    if (nTitle.indexOf(nq) !== -1) { score = 700; return score; }

    // ── PRIORITY 7: Description starts-with (+650) ──
    if (nDesc && nDesc.indexOf(nq) === 0) { score = 650; return score; }

    // ── PRIORITY 8: Description contains (+550) ──
    if (nDesc && nDesc.indexOf(nq) !== -1) { score = 550; return score; }

    // ── PRIORITY 9: Keywords contain query as substring (+500) ──
    if (nKeywords && nKeywords.indexOf(nq) !== -1) { score = 500; return score; }

    // ── PRIORITY 10: Word-level match in title (+450) ──
    var tWords = nTitle.split(' ');
    var allWordsFound = true;
    for (var w = 0; w < tWords.length; w++) {
      if (tWords[w].indexOf(nq) === -1 && nq.indexOf(tWords[w]) === -1) {
        allWordsFound = false; break;
      }
    }
    if (allWordsFound && tWords.length > 1) { score = 450; return score; }

    // ── PRIORITY 11: Word-level match in keywords (+400) ──
    if (nKeywords) {
      var kwWords = nKeywords.split(/[\s,]+/);
      var kwMatch = true;
      var qWords = nq.split(' ');
      for (var qw = 0; qw < qWords.length; qw++) {
        var found = false;
        for (var kw = 0; kw < kwWords.length; kw++) {
          if (kwWords[kw].indexOf(qWords[qw]) !== -1 || qWords[qw].indexOf(kwWords[kw]) !== -1) {
            found = true; break;
          }
        }
        if (!found) { kwMatch = false; break; }
      }
      if (kwMatch && qWords.length > 1) { score = 400; return score; }
    }

    // ── PRIORITY 12: Fuzzy title match (Levenshtein) (+100 to +300) ──
    if (nq.length >= 3) {
      var dist = levenshtein(nq, nTitle);
      var maxLen = Math.max(nq.length, nTitle.length);
      var similarity = 1 - (dist / maxLen);
      var fuzzyThreshold = maxLen <= 5 ? 0.75 : 0.7;
      if (similarity > fuzzyThreshold) {
        score = Math.round(similarity * 300);
        return score;
      }
    }

    // ── PRIORITY 13: Fuzzy keyword match (+50 to +200) ──
    if (nq.length >= 3 && nKeywords) {
      var kwDist = levenshtein(nq, nKeywords);
      var kwMax = Math.max(nq.length, nKeywords.length);
      var kwSim = 1 - (kwDist / kwMax);
      var kwThreshold = kwMax <= 10 ? 0.7 : 0.6;
      if (kwSim > kwThreshold) {
        score = Math.round(kwSim * 200);
        return score;
      }
    }

    // ── PRIORITY 14: Partial character match (+50 to +150) ──
    var matches = 0;
    var nqi = 0;
    for (var ci = 0; ci < nTitle.length && nqi < nq.length; ci++) {
      if (nTitle[ci] === nq[nqi]) { matches++; nqi++; }
    }
    if (matches > 0 && matches === nq.length) { score = 150; return score; }
    if (matches > 1) { score = Math.round((matches / nq.length) * 100); return score; }

    return 0;
  }

  // Legacy wrapper for backward compatibility
  function fuzzyScore(query, target) {
    var nq = normalize(query);
    var nt = normalize(target);
    if (!nq || !nt) return 0;
    if (nt === nq) return 100;
    if (nt.indexOf(nq) === 0) return 95;
    if (nt.indexOf(nq) !== -1) return 85;
    if (nq.length >= 2) {
      var dist = levenshtein(nq, nt);
      var maxLen = Math.max(nq.length, nt.length);
      var similarity = 1 - (dist / maxLen);
      if (similarity > 0.6) return Math.round(similarity * 70);
    }
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

    var nq = normalize(query);
    var noSpace = nq.replace(/\s/g, '');

    for (var i = 0; i < SEARCH_INDEX.length; i++) {
      var item = SEARCH_INDEX[i];
      if (seen[item.id]) continue;

      // Use the new relevance scoring algorithm
      var score = scoreItem(item, nq, query);

      // Also check space-removed variant (e.g., "co 96" -> "co96")
      if (score < 800 && noSpace !== nq) {
        var spaceScore = scoreItem(item, noSpace, query);
        if (spaceScore > score) score = spaceScore;
      }

      // Threshold for inclusion
      if (score >= 30) {
        results.push({
          item: item,
          score: score,
          field: item.title
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

    results.forEach(function(r) {
      var cat = r.item.cat;
      if (!groups[cat]) groups[cat] = { cat: cat, label: CAT_LABELS[cat] || cat, items: [], bestScore: 0 };
      groups[cat].items.push(r);
      if (r.score > groups[cat].bestScore) groups[cat].bestScore = r.score;
    });

    // Sort groups by their best item's score (highest first)
    // This ensures the category containing the best overall match appears first
    var sorted = [];
    for (var cat in groups) {
      if (groups.hasOwnProperty(cat)) {
        sorted.push(groups[cat]);
      }
    }
    sorted.sort(function(a, b) { return b.bestScore - a.bestScore; });

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
