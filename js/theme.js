(function () {
  'use strict';
  var root = document.documentElement;
  var dark = false;
  try { dark = localStorage.getItem('portfolio-theme') === 'dark'; } catch (error) {}
  root.setAttribute('data-theme', dark ? 'dark' : 'light');

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    function render() {
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      button.setAttribute('aria-pressed', String(dark));
      button.querySelector('i').className = dark ? 'fa fa-sun-o' : 'fa fa-moon-o';
    }
    button.hidden = false;
    render();
    button.addEventListener('click', function () {
      dark = !dark;
      render();
      try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch (error) {}
    });
  });
})();
