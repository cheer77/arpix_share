import { Scrollbar } from 'swiper/modules';
import { updateCartUI, initCartInteractions } from '../modules/cart-shared.js';

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
      
      if (basketContent) {
        basketContent.scrollTop = 0;
      }

      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      
      basket.classList.add('is-active');
      if (window.innerWidth <= DESKTOP_BP) {
        basket.classList.add('is-mobile-active');
      }
    } else {
      const scrollPos = body.dataset.basketScrollY || '0';
      
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflow = '';
      html.style.overflow = '';
      
      basket.classList.remove('is-active');
      basket.classList.remove('is-mobile-active');

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

  // --- Recommended Slider ---
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
        320: { spaceBetween: 16 },
        768: { spaceBetween: 24 }
      }
    });
  };

  // --- Shared Initialization ---
  const refreshUI = () => updateCartUI(basket);

  initCartInteractions(basket, refreshUI);
  initRecommendedSlider();
  refreshUI();
}
