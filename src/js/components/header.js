// ========================================
// Header — JS Module
// ========================================

export function initHeader() {
  const header = document.getElementById('header');
  const toggle = document.querySelector('.header__mobile-toggle');
  const navGroup = document.querySelector('.header__group');
  const nav = document.getElementById('header-nav');
  if (!header || !navGroup || !nav) return;

  let lastScrollY = 0;
  const SCROLL_THRESHOLD = 50;
  const DESKTOP_BP = 1300;
  const TABLET_BP = 768;

  // --- Scroll hide/show ---
  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;

      if (currentY > SCROLL_THRESHOLD) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      if (currentY > lastScrollY && currentY > 300) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }

      lastScrollY = currentY;
    },
    { passive: true }
  );

  // --- Adaptive menu toggle ---
  const handleToggle = (isActive) => {
    toggle.classList.toggle('header__mobile-toggle--active', isActive);
    nav.classList.toggle('is-active', isActive);
    navGroup.classList.toggle('is-active', isActive);
    toggle.setAttribute('aria-expanded', isActive);

    const width = window.innerWidth;
    if (width <= DESKTOP_BP) {
      nav.setAttribute('aria-hidden', !isActive);
      if (isActive) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.width = '100%';
        document.body.dataset.scrollY = window.scrollY; // Store scroll position
      } else {
        const scrollY = document.body.dataset.scrollY || 0;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0'));
      }
    } else {
      nav.removeAttribute('aria-hidden');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }
  };

  toggle.addEventListener('click', () => {
    const isActive = !toggle.classList.contains('header__mobile-toggle--active');
    handleToggle(isActive);
  });

  // Handle the "X" Close button inside the mobile drawer
  const closeBtn = document.querySelector('.header__nav-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      handleToggle(false);
    });
  }

  // Close menu when clicking on a link
  const navLinks = navGroup.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const width = window.innerWidth;
      const isCatalog = link.classList.contains('header__nav-link--catalog') || link.classList.contains('header__nav-catalog-card');
      
      if (width <= DESKTOP_BP) {
        // If it's a catalog link on intermediate screens, we don't necessarily close it here 
        // unless it's mobile view. Actually, most sites close the menu on link click.
        handleToggle(false);
      }
    });
  });

  // --- Language Switcher ---
  const desktopLang = document.getElementById('lang-dropdown');
  if (desktopLang) {
    const trigger = desktopLang.querySelector('.header__lang-trigger');
    const list = desktopLang.querySelector('.header__lang-list');
    const options = desktopLang.querySelectorAll('.header__lang-option');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = list.classList.toggle('is-active');
      trigger.classList.toggle('is-active', isActive);
      trigger.setAttribute('aria-expanded', isActive);
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.dataset.lang;
        const text = option.textContent.slice(0, 3); // Short code or first 3 chars
        
        // Update UI
        trigger.querySelector('span').textContent = text;
        options.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Close dropdown
        list.classList.remove('is-active');
        trigger.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!desktopLang.contains(e.target)) {
        list.classList.remove('is-active');
        trigger.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const mobileLang = document.getElementById('mobile-lang-dropdown');
  if (mobileLang) {
    const trigger = mobileLang.querySelector('.header__nav-lang-trigger');
    const list = mobileLang.querySelector('.header__nav-lang-list');
    const options = mobileLang.querySelectorAll('.header__nav-lang-option');

    trigger.addEventListener('click', () => {
      const isActive = list.classList.toggle('is-active');
      trigger.classList.toggle('is-active', isActive);
      trigger.setAttribute('aria-expanded', isActive);
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        const text = option.textContent.slice(0, 3);
        trigger.querySelector('span').textContent = text;
        options.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Optionally close on select or keep open for multiple changes? Usually close.
        list.classList.remove('is-active');
        trigger.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reset accessibility and classes on resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    if (width > DESKTOP_BP) {
      handleToggle(false);
    } else {
      const isActive = toggle.classList.contains('header__mobile-toggle--active');
      nav.setAttribute('aria-hidden', !isActive);
      
      if (width > DESKTOP_BP) {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      } else if (isActive) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        // Only set top if not already fixed to avoid jumping
        if (document.body.style.top === '') {
          document.body.style.top = `-${window.scrollY}px`;
          document.body.style.width = '100%';
          document.body.dataset.scrollY = window.scrollY;
        }
      }
    }

    // Reset lang dropdowns on resize for safety
    if (desktopLang) {
       desktopLang.querySelector('.header__lang-list').classList.remove('is-active');
       desktopLang.querySelector('.header__lang-trigger').classList.remove('is-active');
    }
  });
}
