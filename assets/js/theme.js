(function () {
  var STORAGE_KEY = 'pap-theme';
  var DEFAULT_THEME = 'dark';

  function applyTheme(name) {
    document.documentElement.setAttribute('data-theme', name);
    localStorage.setItem(STORAGE_KEY, name);
    document.querySelectorAll('.theme-dot').forEach(function (dot) {
      dot.classList.toggle('active', dot.dataset.theme === name);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Aplicar tema guardado y marcar el dot activo
    applyTheme(localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME);

    // Clicks en los dots de tema
    document.querySelectorAll('.theme-dot').forEach(function (dot) {
      dot.addEventListener('click', function () {
        applyTheme(dot.dataset.theme);
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

    // Cerrar drawer con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });
  });
})();
