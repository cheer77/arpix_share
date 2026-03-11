// ========================================
// Recommended Slider — Swiper Initialization
// ========================================

export function initRecomSlider() {
  const sliders = document.querySelectorAll('.recom-slider');
  
  sliders.forEach(slider => {
    const container = slider.querySelector('.recom-slider__container');
    const nextBtn = slider.querySelector('.recom-slider__next');
    const scrollbar = slider.querySelector('.recom-slider__scrollbar');

    if (!container) return;

    new window.Swiper(container, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      speed: 600,
      grabCursor: true,
      navigation: {
        nextEl: nextBtn,
      },
      scrollbar: {
        el: scrollbar,
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
  });
}
