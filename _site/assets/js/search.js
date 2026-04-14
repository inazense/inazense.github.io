(function () {
  var INDEX_URL = '/search.json';
  var index = null;
  var debounceTimer;

  function loadIndex(cb) {
    if (index !== null) { cb(index); return; }
    fetch(INDEX_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; cb(index); })
      .catch(function () { index = []; cb(index); });
  }

  function search(query, data) {
    var q = query.toLowerCase().trim();
    if (!q) return [];
    return data.filter(function (post) {
      var haystack = [post.title, post.categories, post.tags].join(' ').toLowerCase();
      return haystack.includes(q);
    }).slice(0, 8);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderResults(results, container) {
    if (!results.length) {
      container.innerHTML = '<p class="search-no-results">Sin resultados</p>';
      container.removeAttribute('hidden');
      return;
    }
    container.innerHTML = results.map(function (post) {
      return '<a href="' + escapeHtml(post.url) + '" class="search-result-item">' +
        '<span class="result-title">' + escapeHtml(post.title) + '</span>' +
        '<span class="result-meta">' + escapeHtml(post.date) +
        (post.categories ? ' &mdash; ' + escapeHtml(post.categories) : '') +
        '</span>' +
        '</a>';
    }).join('');
    container.removeAttribute('hidden');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var input   = document.getElementById('search-input');
    var results = document.getElementById('search-results');
    if (!input || !results) return;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var q = input.value.trim();
      if (!q) {
        results.setAttribute('hidden', '');
        return;
      }
      debounceTimer = setTimeout(function () {
        loadIndex(function (data) {
          renderResults(search(q, data), results);
        });
      }, 250);
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', function (e) {
      if (!input.contains(e.target) && !results.contains(e.target)) {
        results.setAttribute('hidden', '');
      }
    });

    // Cerrar con Escape
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        results.setAttribute('hidden', '');
        input.value = '';
      }
    });
  });
})();
