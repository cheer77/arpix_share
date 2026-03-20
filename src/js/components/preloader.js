export function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Function to hide preloader
  const hidePreloader = () => {
    // We add a small delay so the logo has time to "shine"
    setTimeout(() => {
      preloader.classList.add('preloader--hidden');
      
      // Cleanup after transition
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }, 800);
  };

  // 1. Hide on load
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader);
  }

  // 2. Optional: Show on transition (multi-page app approach)
  // This makes it feel like an app where the splash screen shows up between pages
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only for internal links that are not fragments, buttons or external
      if (
        href && 
        !href.startsWith('#') && 
        !href.startsWith('mailto:') && 
        !href.startsWith('tel:') && 
        !link.getAttribute('target') &&
        !e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey
      ) {
        // Show preloader
        preloader.style.display = 'flex';
        // Need a tiny timeout for display:flex to register before opacity change
        setTimeout(() => {
          preloader.classList.remove('preloader--hidden');
        }, 10);
      }
    });
  });
}
