// ========================================
// Recommended Slider — Swiper Initialization
// ========================================

export function initRecomSlider() {
  const sliderEl = document.querySelector('.recom-slider__container');
  if (!sliderEl) return;

  const swiper = new window.Swiper(sliderEl, {
    slidesPerView: 'auto',
    spaceBetween: 20,
    speed: 600,
    grabCursor: true,
    navigation: {
      nextEl: '.recom-slider__next',
    },
    scrollbar: {
      el: '.recom-slider__scrollbar',
      draggable: true,
      dragSize: 'auto',
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
      },
      768: {
        spaceBetween: 20,
      },
      1440: {
        spaceBetween: 40,
      }
    }
  });

  return swiper;
}
