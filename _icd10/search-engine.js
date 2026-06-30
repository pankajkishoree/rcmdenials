'use strict';
var ICD10Search = (function() {

  var db = null;
  var codeList = [];
  var categoryList = [];
  var searchIndex = {};
  var ready = false;

  function init(callback) {
    if (ready) { if (callback) callback(); return; }
    db = typeof ICD10_DB !== 'undefined' ? ICD10_DB : null;
    if (!db) { return; }
    buildIndex();
    ready = true;
    if (callback) callback();
  }

  function buildIndex() {
    var codes = db.codes;
    var cats = db.categories;
    var k;

    for (k in codes) {
      var c = codes[k];
      var entry = {
        code: c.code,
        description: c.description,
        category: c.category,
        excludes1: c.excludes1 || [],
        excludes2: c.excludes2 || [],
        includes: c.includes || [],
        commonUse: c.commonUse || [],
        documentation: c.documentation || [],
        _searchText: buildSearchText(c),
        _tokens: tokenize(c.description + ' ' + (c.commonUse || []).join(' ') + ' ' + c.code)
      };
      codeList.push(entry);
      searchIndex[c.code.toLowerCase()] = entry;
    }

    for (k in cats) {
      var cat = cats[k];
      categoryList.push({
        code: cat.code,
        description: cat.description,
        chapter: cat.chapter,
        range: cat.range,
        _tokens: tokenize(cat.description + ' ' + cat.code)
      });
    }
  }

  function buildSearchText(c) {
    var parts = [c.code, c.description, c.category];
    if (c.commonUse) parts = parts.concat(c.commonUse);
    if (c.includes) parts = parts.concat(c.includes);
    return parts.join(' ').toLowerCase();
  }

  function tokenize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(function(t) { return t.length > 0; });
  }

  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    var matrix = [];
    var i, j;
    for (i = 0; i <= b.length; i++) matrix[i] = [i];
    for (j = 0; j <= a.length; j++) matrix[0][j] = j;
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

  function scoreMatch(query, entry) {
    var q = query.toLowerCase().trim();
    var score = 0;
    var desc = entry.description.toLowerCase();
    var code = entry.code.toLowerCase();

    // Exact code match (highest priority)
    if (code === q) return 1000;
    if (code.indexOf(q) === 0) score += 500;

    // Exact description match
    if (desc === q) return 950;

    // Code starts with query
    if (code.indexOf(q) === 0) score += 200;

    // Description contains query as whole word
    var descWords = desc.split(/\s+/);
    var qWords = q.split(/\s+/);
    var allQueryWordsFound = true;
    for (var i = 0; i < qWords.length; i++) {
      var found = false;
      for (var j = 0; j < descWords.length; j++) {
        if (descWords[j] === qWords[i] || descWords[j].indexOf(qWords[i]) === 0) {
          found = true;
          score += 30;
          break;
        }
      }
      // Also check commonUse synonyms
      if (!found && entry.commonUse) {
        for (var s = 0; s < entry.commonUse.length; s++) {
          if (entry.commonUse[s].toLowerCase().indexOf(qWords[i]) >= 0) {
            found = true;
            score += 20;
            break;
          }
        }
      }
      if (!found) allQueryWordsFound = false;
    }
    if (allQueryWordsFound && qWords.length > 1) score += 100;

    // Description contains query
    if (desc.indexOf(q) >= 0) score += 80;

    // Fuzzy match tokens
    var qTokens = tokenize(q);
    for (var t = 0; t < qTokens.length; t++) {
      var bestTokenScore = 0;
      for (var d = 0; d < entry._tokens.length; d++) {
        var dist = levenshtein(qTokens[t], entry._tokens[d]);
        var maxLen = Math.max(qTokens[t].length, entry._tokens[d].length);
        var similarity = 1 - (dist / maxLen);
        if (similarity > 0.6) {
          bestTokenScore = Math.max(bestTokenScore, similarity * 40);
        }
      }
      score += bestTokenScore;
    }

    // Common use / synonym match
    if (entry.commonUse) {
      for (var c = 0; c < entry.commonUse.length; c++) {
        var syn = entry.commonUse[c].toLowerCase();
        if (syn === q) { score += 60; break; }
        if (syn.indexOf(q) >= 0) score += 40;
        if (q.indexOf(syn) >= 0 && syn.length > 3) score += 25;
      }
    }

    return score;
  }

  function search(query, maxResults) {
    if (!ready || !query || query.length < 1) return [];
    maxResults = maxResults || 20;
    var q = query.toLowerCase().trim();

    var results = [];
    var seen = {};

    // Direct code lookup
    var directMatch = searchIndex[q] || searchIndex[q.replace(/\./g, '')];
    if (directMatch) {
      results.push({ entry: directMatch, score: 1000, matchType: 'exact' });
      seen[directMatch.code] = true;
    }

    // Score all codes
    for (var i = 0; i < codeList.length; i++) {
      var entry = codeList[i];
      if (seen[entry.code]) continue;
      var s = scoreMatch(q, entry);
      if (s > 15) {
        results.push({ entry: entry, score: s, matchType: s > 100 ? 'strong' : 'fuzzy' });
      }
    }

    results.sort(function(a, b) { return b.score - a.score; });
    return results.slice(0, maxResults);
  }

  function autocomplete(query, maxSuggestions) {
    if (!ready || !query || query.length < 2) return [];
    maxSuggestions = maxSuggestions = maxSuggestions || 8;
    var q = query.toLowerCase().trim();
    var suggestions = [];
    var seen = {};

    // Code prefix matches
    for (var i = 0; i < codeList.length; i++) {
      var entry = codeList[i];
      if (entry.code.toLowerCase().indexOf(q) === 0 && !seen[entry.code]) {
        suggestions.push({
          text: entry.code + ' — ' + entry.description,
          code: entry.code,
          description: entry.description,
          type: 'code'
        });
        seen[entry.code] = true;
        if (suggestions.length >= maxSuggestions) break;
      }
    }

    // Description contains query
    if (suggestions.length < maxSuggestions) {
      for (var j = 0; j < codeList.length; j++) {
        var e = codeList[j];
        if (seen[e.code]) continue;
        var desc = e.description.toLowerCase();
        if (desc.indexOf(q) >= 0) {
          suggestions.push({
            text: e.code + ' — ' + e.description,
            code: e.code,
            description: e.description,
            type: 'description'
          });
          seen[e.code] = true;
          if (suggestions.length >= maxSuggestions) break;
        }
      }
    }

    // Common use synonyms
    if (suggestions.length < maxSuggestions) {
      for (var k = 0; k < codeList.length; k++) {
        var en = codeList[k];
        if (seen[en.code]) continue;
        if (en.commonUse) {
          for (var s = 0; s < en.commonUse.length; s++) {
            if (en.commonUse[s].toLowerCase().indexOf(q) >= 0) {
              suggestions.push({
                text: en.code + ' — ' + en.description,
                code: en.code,
                description: en.description,
                type: 'synonym'
              });
              seen[en.code] = true;
              break;
            }
          }
          if (suggestions.length >= maxSuggestions) break;
        }
      }
    }

    return suggestions.slice(0, maxSuggestions);
  }

  function findByCode(code) {
    if (!ready) return null;
    var normalized = code.toUpperCase().trim();
    return searchIndex[normalized] || searchIndex[normalized.toLowerCase()] || null;
  }

  function findSimilar(code, maxResults) {
    if (!ready) return [];
    maxResults = maxResults || 6;
    var entry = findByCode(code);
    if (!entry) return [];

    var results = [];
    var parentCode = entry.category;

    // Get sibling codes (same category)
    for (var i = 0; i < codeList.length; i++) {
      var c = codeList[i];
      if (c.code === entry.code) continue;
      if (c.category === parentCode) {
        results.push({ entry: c, score: 500, reason: 'same category' });
      }
    }

    // Get parent category
    var catInfo = null;
    for (var j = 0; j < categoryList.length; j++) {
      if (categoryList[j].code === parentCode) {
        catInfo = categoryList[j];
        break;
      }
    }

    // Semantic similarity via shared tokens
    var entryTokens = entry._tokens;
    for (var k = 0; k < codeList.length; k++) {
      var e = codeList[k];
      if (e.code === entry.code) continue;
      if (results.some(function(r) { return r.entry.code === e.code; })) continue;

      var commonTokens = 0;
      for (var t = 0; t < entryTokens.length; t++) {
        if (e._tokens.indexOf(entryTokens[t]) >= 0 && entryTokens[t].length > 2) {
          commonTokens++;
        }
      }
      if (commonTokens >= 2) {
        results.push({ entry: e, score: commonTokens * 10, reason: 'related' });
      }
    }

    // Synonym-based similarity
    if (entry.commonUse && entry.commonUse.length > 0) {
      for (var s = 0; s < codeList.length; s++) {
        var syn = codeList[s];
        if (syn.code === entry.code) continue;
        if (results.some(function(r) { return r.entry.code === syn.code; })) continue;
        if (syn.commonUse) {
          for (var m = 0; m < entry.commonUse.length; m++) {
            for (var n = 0; n < syn.commonUse.length; n++) {
              if (entry.commonUse[m].toLowerCase() === syn.commonUse[n].toLowerCase()) {
                results.push({ entry: syn, score: 25, reason: 'shared synonym' });
                break;
              }
            }
          }
        }
      }
    }

    results.sort(function(a, b) { return b.score - a.score; });
    var unique = [];
    var codesSeen = {};
    for (var r = 0; r < results.length; r++) {
      if (!codesSeen[results[r].entry.code]) {
        codesSeen[results[r].entry.code] = true;
        unique.push(results[r].entry);
      }
    }
    return unique.slice(0, maxResults);
  }

  function getParentCategory(code) {
    if (!ready) return null;
    var entry = findByCode(code);
    if (!entry) return null;
    for (var i = 0; i < categoryList.length; i++) {
      if (categoryList[i].code === entry.category) return categoryList[i];
    }
    return null;
  }

  function getChildCodes(categoryCode) {
    if (!ready) return [];
    var results = [];
    for (var i = 0; i < codeList.length; i++) {
      if (codeList[i].category === categoryCode) {
        results.push(codeList[i]);
      }
    }
    return results;
  }

  function getChapters() {
    return db ? db.chapters : [];
  }

  function getStats() {
    return {
      totalCodes: codeList.length,
      totalCategories: categoryList.length,
      totalChapters: db ? db.chapters.length : 0
    };
  }

  return {
    init: init,
    search: search,
    autocomplete: autocomplete,
    findByCode: findByCode,
    findSimilar: findSimilar,
    getParentCategory: getParentCategory,
    getChildCodes: getChildCodes,
    getChapters: getChapters,
    getStats: getStats
  };

})();
