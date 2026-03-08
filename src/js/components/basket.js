// ========================================
// Basket — JS Module
// ========================================

import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

export function initBasket() {
  const basket = document.getElementById('basket');
  const openBtns = document.querySelectorAll('.header__cart');
  const closeBtns = document.querySelectorAll('#basket-close, #basket-backdrop, #basket-continue');
  const DESKTOP_BP = 1200;

  if (!basket) return;

  const handleToggle = (isActive) => {
    const html = document.documentElement;
    const body = document.body;
    const basketContent = basket.querySelector('.basket__content');

    if (isActive) {
      const scrollY = window.pageYOffset || html.scrollTop;
      body.dataset.basketScrollY = scrollY;
      
      // Ensure basket content starts at the top
      if (basketContent) {
        basketContent.scrollTop = 0;
      }

      // Apply body lock
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      
      // Add classes for animations
      basket.classList.add('is-active');
      if (window.innerWidth <= DESKTOP_BP) {
        basket.classList.add('is-mobile-active');
      }
    } else {
      const scrollPos = body.dataset.basketScrollY || '0';
      
      // Remove body lock
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';
      
      basket.classList.remove('is-active');
      basket.classList.remove('is-mobile-active');

      // Prevent scrolling back if mobile menu is still open (shared lock state)
      const isNavActive = document.querySelector('.header__nav.is-active');
      if (!isNavActive) {
        window.scrollTo(0, parseInt(scrollPos));
      }
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleToggle(true);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      handleToggle(false);
    });
  });

  // --- Basket UI Updates ---
  const updateBasketUI = () => {
    const items = basket.querySelectorAll('.basket-item');
    let subtotal = 0;
    let itemCount = 0;

    items.forEach(item => {
      const priceText = item.querySelector('.basket-item__price').textContent;
      const quantityValue = parseInt(item.querySelector('.quantity-control__input').value);
      const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
      
      subtotal += price * quantityValue;
      itemCount += quantityValue;
    });

    // Update Title
    const title = basket.querySelector('#basket-title');
    if (title) title.textContent = `Товарів у кошику: ${itemCount}`;

    // Update Summary
    const discount = 60; // Mock discount for now
    const total = subtotal - discount;

    const subtotalEl = basket.querySelector('.basket__calc-row:nth-child(1) .basket__calc-value');
    const discountEl = basket.querySelector('.basket__calc-discount .basket__calc-value');
    const totalEl = basket.querySelector('.basket__calc-row--total .basket__calc-value');
    const savingsEl = basket.querySelector('.basket__savings-value');

    if (subtotalEl) subtotalEl.textContent = subtotal;
    if (totalEl) totalEl.textContent = total > 0 ? total : 0;
    
    // Promo Progress Logic
    const PROMO_THRESHOLD = 500; // Example threshold for the "best gift"
    const promoAccent = basket.querySelector('.basket__promo-accent');
    const progressBar = basket.querySelector('.basket__promo-bar');
    
    if (promoAccent && progressBar) {
      const remaining = PROMO_THRESHOLD - subtotal;
      if (remaining > 0) {
        promoAccent.textContent = `${remaining} грн`;
        const percentage = Math.min((subtotal / PROMO_THRESHOLD) * 100, 100);
        progressBar.style.width = `${percentage}%`;
      } else {
        promoAccent.textContent = `0 грн`;
        progressBar.style.width = '100%';
        const promoMain = basket.querySelector('.basket__promo-main');
        if (promoMain) promoMain.innerHTML = 'Ви отримали <span class="basket__promo-accent">найкращий подарунок!</span>';
      }
    }
  };

  // --- Quantity Control ---
  const initQuantityControls = () => {
    const containers = basket.querySelectorAll('.quantity-control');
    containers.forEach(container => {
      const input = container.querySelector('.quantity-control__input');
      const minusBtn = container.querySelector('.quantity-control__btn--minus');
      const plusBtn = container.querySelector('.quantity-control__btn--plus');

      if (!input || !minusBtn || !plusBtn) return;

      minusBtn.addEventListener('click', () => {
        const val = parseInt(input.value);
        if (val > 1) {
          input.value = val - 1;
          updateBasketUI();
        }
      });

      plusBtn.addEventListener('click', () => {
        const val = parseInt(input.value);
        input.value = val + 1;
        updateBasketUI();
      });
    });
  };

  // --- Remove Items ---
  const initRemoveButtons = () => {
    const removeBtns = basket.querySelectorAll('.basket-item__remove');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.basket-item');
        if (item) {
          item.style.opacity = '0';
          item.style.transform = 'translateX(20px)';
          setTimeout(() => {
            item.remove();
            updateBasketUI();
          }, 300);
        }
      });
    });
  };

  // --- Recommended Slider (Swiper) ---
  const initRecommendedSlider = () => {
    const sliderSelector = '.basket__recommended-swiper';
    const sliderEl = basket.querySelector(sliderSelector);
    
    if (!sliderEl) return;

    new Swiper(sliderSelector, {
      modules: [Scrollbar],
      slidesPerView: 'auto',
      spaceBetween: 24,
      grabCursor: true,
      freeMode: true,
      scrollbar: {
        el: '.basket__recommended-scrollbar',
        draggable: true,
        dragSize: 'auto',
        hide: false,
      },
      breakpoints: {
        320: {
          spaceBetween: 16
        },
        768: {
          spaceBetween: 24
        }
      }
    });
  };

  initQuantityControls();
  initRemoveButtons();
  initRecommendedSlider();
  updateBasketUI();
}
