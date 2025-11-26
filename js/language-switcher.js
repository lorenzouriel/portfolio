document.addEventListener('DOMContentLoaded', function() {
  const langLinks = document.querySelectorAll('.lang-link');

  langLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetLang = this.getAttribute('data-lang');
      const currentPath = window.location.pathname;

      // Determine the new URL based on the target language
      let newUrl;
      if (targetLang === 'pt') {
        // Switch to Portuguese
        if (currentPath === '/' || currentPath === '/index.html') {
          newUrl = '/pt/';
        } else {
          newUrl = '/pt' + currentPath;
        }
      } else {
        // Switch to English (default)
        if (currentPath.startsWith('/pt/')) {
          newUrl = currentPath.replace('/pt/', '/');
        } else if (currentPath === '/pt' || currentPath === '/pt/index.html') {
          newUrl = '/';
        } else {
          newUrl = currentPath;
        }
      }

      window.location.href = newUrl;
    });
  });
});
