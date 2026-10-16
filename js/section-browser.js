(function () {
  'use strict';
  var browser = document.querySelector('.section-browser');
  if (!browser) return;
  var nav = browser.querySelector('.section-navigation');
  var buttons = Array.prototype.slice.call(nav.querySelectorAll('[data-section]'));
  var panels = buttons.map(function (button) {
    return document.getElementById(button.dataset.section);
  });
  if (panels.some(function (panel) { return !panel; })) return;
  var active = 1;

  function hashIndex() {
    return buttons.findIndex(function (button) {
      return '#' + button.dataset.section === window.location.hash;
    });
  }

  function show(index, updateHash) {
    active = (index + panels.length) % panels.length;
    panels.forEach(function (panel, i) {
      panel.hidden = i !== active;
      buttons[i].setAttribute('aria-pressed', String(i === active));
    });
    nav.querySelector('.section-announcement').textContent = buttons[active].textContent;
    if (updateHash) {
      window.history.replaceState(null, '', '#' + buttons[active].dataset.section);
    }
  }

  buttons.forEach(function (button, index) {
    button.addEventListener('click', function () { show(index, true); });
  });
  nav.querySelectorAll('[data-direction]').forEach(function (button) {
    button.addEventListener('click', function () {
      show(active + Number(button.dataset.direction), true);
    });
  });
  nav.addEventListener('keydown', function (event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(active + (event.key === 'ArrowRight' ? 1 : -1), true);
    buttons[active].focus();
  });
  window.addEventListener('hashchange', function () {
    var index = hashIndex();
    if (index >= 0) show(index, false);
  });
  browser.classList.add('is-interactive');
  nav.hidden = false;
  show(hashIndex() >= 0 ? hashIndex() : 1, false);
})();
