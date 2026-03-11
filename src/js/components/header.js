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
  let savedScrollY = 0; // Store in closure for reliable access

  const handleToggle = (isActive) => {
    toggle.classList.toggle('header__mobile-toggle--active', isActive);
    nav.classList.toggle('is-active', isActive);
    navGroup.classList.toggle('is-active', isActive);
    toggle.setAttribute('aria-expanded', isActive);

    const width = window.innerWidth;

    if (width <= DESKTOP_BP) {
      nav.setAttribute('aria-hidden', !isActive);
    } else {
      nav.removeAttribute('aria-hidden');
    }

    // Body scroll lock logic
    if (width <= TABLET_BP) {
      // Mobile full-screen drawer: full lock with position:fixed
      if (isActive) {
        savedScrollY = window.scrollY;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.width = '100%';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, savedScrollY);
      }
    } else if (width <= DESKTOP_BP) {
      // Intermediate dropdown: soft lock (just block scroll, no position change)
      document.documentElement.style.overflow = isActive ? 'hidden' : '';
      document.body.style.overflow = isActive ? 'hidden' : '';
    } else {
      // Desktop: clear everything
      document.documentElement.style.overflow = '';
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
      if (width <= DESKTOP_BP) {
        handleToggle(false);
      }
    });
  });

  // --- Dynamic DOM Reparenting ---
  const langDropdown = document.getElementById('lang-dropdown');
  const searchBtn = document.querySelector('.header__action-btn--search');
  const cabinetBtn = document.querySelector('.header__action-btn--cabinet');
  const ctaBtn = document.querySelector('.header__cta');

  const desktopActionsSlot = document.querySelector('.header__actions');
  const desktopGroupSlot = document.querySelector('.header__group');

  const mobileSearchSlot = document.querySelector('.header__nav-search-slot');
  const mobileFooterSlot = document.querySelector('.header__nav-footer');
  const mobileCtaSlot = document.querySelector('.header__nav-cta-slot');

  const moveElementsForMobile = () => {
    if (searchBtn && mobileSearchSlot) mobileSearchSlot.appendChild(searchBtn);
    if (langDropdown && mobileFooterSlot) mobileFooterSlot.appendChild(langDropdown);
    if (cabinetBtn && mobileFooterSlot) mobileFooterSlot.appendChild(cabinetBtn);
    if (ctaBtn && mobileCtaSlot) mobileCtaSlot.appendChild(ctaBtn);
  };

  const moveElementsForDesktop = () => {
    // Desktop order in actions: lang, search, cabinet, cart
    // Since cart is always there at the end, we can insert before it
    const cartBtn = desktopActionsSlot.querySelector('.header__cart');
    
    if (cartBtn) {
      if (langDropdown && desktopActionsSlot) desktopActionsSlot.insertBefore(langDropdown, cartBtn);
      if (searchBtn && desktopActionsSlot) desktopActionsSlot.insertBefore(searchBtn, cartBtn);
      if (cabinetBtn && desktopActionsSlot) desktopActionsSlot.insertBefore(cabinetBtn, cartBtn);
    }

    // CTA goes to the end of the group
    if (ctaBtn && desktopGroupSlot) desktopGroupSlot.appendChild(ctaBtn);
  };

  const handleReparenting = () => {
    const width = window.innerWidth;
    if (width <= TABLET_BP) {
      moveElementsForMobile();
    } else {
      moveElementsForDesktop();
    }
  };

  // Initial call
  handleReparenting();

  // --- Unified Language Switcher ---
  if (langDropdown) {
    const trigger = langDropdown.querySelector('.header__lang-trigger');
    const list = langDropdown.querySelector('.header__lang-list');
    const options = langDropdown.querySelectorAll('.header__lang-option');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
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
        list.classList.remove('is-active');
        trigger.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target)) {
        list.classList.remove('is-active');
        trigger.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Reset accessibility and classes on resize
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    
    handleReparenting();

    if (width > DESKTOP_BP) {
      handleToggle(false);
    } else {
      const isActive = toggle.classList.contains('header__mobile-toggle--active');
      nav.setAttribute('aria-hidden', !isActive);
      
      if (isActive) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        if (document.body.style.top === '') {
          savedScrollY = window.scrollY;
          document.body.style.top = `-${savedScrollY}px`;
          document.body.style.width = '100%';
        }
      }
    }

    if (langDropdown) {
       langDropdown.querySelector('.header__lang-list').classList.remove('is-active');
       langDropdown.querySelector('.header__lang-trigger').classList.remove('is-active');
    }
  });
}
