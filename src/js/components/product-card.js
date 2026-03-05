// ========================================
// Product Card — JS Module
// ========================================

export function initProductCards() {
  const cartButtons = document.querySelectorAll('.product-card__action--cart');

  // --- Cart Button Logic ---
  cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); 
      button.classList.add('is-added');

      const headerCartCount = document.querySelector('.header__cart-count');
      if (headerCartCount) {
        let currentCount = parseInt(headerCartCount.textContent.trim(), 10) || 0;
        headerCartCount.textContent = currentCount + 1;
        headerCartCount.classList.add('bump');
        setTimeout(() => headerCartCount.classList.remove('bump'), 300);
      }
      
      setTimeout(() => {
        button.classList.remove('is-added');
      }, 3000);
    });
  });

  // --- Dropdown Logic ---
  const dropdowns = document.querySelectorAll('.product-card__dropdown');
  
  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.product-card__dropdown-trigger');
    const triggerText = trigger.querySelector('span');
    const options = dropdown.querySelectorAll('[role="option"]');

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      // Close other open dropdowns first (optional)
      document.querySelectorAll('.product-card__dropdown.is-open').forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('is-open');
          d.querySelector('.product-card__dropdown-trigger').setAttribute('aria-expanded', 'false');
        }
      });
      // Toggle current
      const isOpen = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen);
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        // Update trigger text
        triggerText.textContent = option.textContent;
        // Update selection states
        options.forEach(opt => opt.setAttribute('aria-selected', 'false'));
        option.setAttribute('aria-selected', 'true');
        // Close dropdown
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.product-card__dropdown')) {
      document.querySelectorAll('.product-card__dropdown.is-open').forEach(dropdown => {
        dropdown.classList.remove('is-open');
        dropdown.querySelector('.product-card__dropdown-trigger').setAttribute('aria-expanded', 'false');
      });
    }
  });
}
