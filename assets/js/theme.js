(function () {
  var STORAGE_KEY = 'pap-theme';
  var DEFAULT_THEME = 'dark';

  function sendGiscusTheme(name) {
    var frame = document.querySelector('iframe.giscus-frame');
    if (!frame) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: name === 'light' ? 'light' : 'dark_dimmed' } } },
      'https://giscus.app'
    );
  }

  function applyTheme(name) {
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem(STORAGE_KEY, name);
    sendGiscusTheme(name);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME);

    var toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'light' ? 'dark' : 'light');
      });
    }

    // Dropdowns de navegación (Categorías, Archivo)
    document.querySelectorAll('.nav-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        var targetId = btn.id.replace('-toggle', '-dropdown');
        var dropdown = document.getElementById(targetId);
        btn.setAttribute('aria-expanded', !expanded);
        if (dropdown) dropdown.hidden = expanded;
      });
    });

    // Hamburger / drawer del sidebar
    var hamburger = document.getElementById('hamburger-btn');
    var sidebar   = document.getElementById('sidebar');
    var overlay   = document.getElementById('sidebar-overlay');
    var closeBtn  = document.getElementById('sidebar-close');

    function openSidebar() {
      if (!sidebar) return;
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeSidebar() {
      if (!sidebar) return;
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
      if (hamburger) hamburger.focus();
    }

    if (hamburger) hamburger.addEventListener('click', openSidebar);
    if (closeBtn)  closeBtn.addEventListener('click', closeSidebar);
    if (overlay)   overlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('#sidebar .nav-item').forEach(function(link) {
      link.addEventListener('click', closeSidebar);
    });

    // Tabla de contenidos
    (function() {
      var postContent = document.querySelector('.post-content');
      if (!postContent) return;
      var headings = postContent.querySelectorAll('h2, h3');
      if (headings.length < 3) return;

      var toc = document.createElement('nav');
      toc.className = 'toc';
      toc.setAttribute('aria-label', 'Tabla de contenidos');

      var tocTitle = document.createElement('span');
      tocTitle.className = 'toc-title';
      tocTitle.textContent = 'Contenidos';
      toc.appendChild(tocTitle);

      var rootList = document.createElement('ol');
      rootList.className = 'toc-list';
      var currentSubList = null;

      headings.forEach(function(h) {
        if (!h.id) {
          h.id = h.textContent.trim().toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/^-+|-+$/g, '');
        }
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);

        if (h.tagName === 'H2') {
          currentSubList = null;
          rootList.appendChild(li);
        } else {
          if (!currentSubList) {
            currentSubList = document.createElement('ol');
            var lastLi = rootList.lastElementChild;
            if (lastLi) lastLi.appendChild(currentSubList);
            else rootList.appendChild(li);
          }
          if (currentSubList) currentSubList.appendChild(li);
        }
      });

      toc.appendChild(rootList);
      postContent.insertBefore(toc, postContent.firstChild);
    })();

    document.querySelectorAll('.post-content a[href^="http"]').forEach(function(link) {
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });
  });
})();
