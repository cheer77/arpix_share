import Swiper from 'swiper/bundle';

export function initProductGallery() {
  const thumbsEl = document.querySelector('.gallery__thumbnails');
  const mainEl = document.querySelector('.gallery__main-slider');
  const videoEl = document.querySelector('.video-reviews__swiper');

  let thumbsSwiper = null;

  if (thumbsEl) {
    thumbsSwiper = new Swiper(thumbsEl, {
      direction: 'vertical',
      slidesPerView: 'auto',
      spaceBetween: 10,
      freeMode: true,
      watchSlidesProgress: true,
      scrollbar: {
        el: thumbsEl.querySelector('.swiper-scrollbar'),
        draggable: true,
        hide: false,
      },
      mousewheel: true,
      breakpoints: {
        320: {
          direction: 'horizontal',
          spaceBetween: 16,
        },
        1024: {
          direction: 'vertical',
          spaceBetween: 10,
        }
      }
    });
  }

  if (mainEl) {
    new Swiper(mainEl, {
      spaceBetween: 0,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }

  // Video Reviews Slider
  if (videoEl) {
    const prevBtn = document.querySelector('.video-reviews__prev');
    
    const updatePrevBtnVisibility = (swiper) => {
      if (!prevBtn) return;
      if (swiper.isBeginning) {
        prevBtn.style.opacity = '0';
        prevBtn.style.pointerEvents = 'none';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
      }
    };

    const videoSwiper = new Swiper(videoEl, {
      slidesPerView: 'auto',
      spaceBetween: 8,
      rewind: true,
      navigation: {
        nextEl: '.video-reviews__next',
        prevEl: '.video-reviews__prev',
      },
      on: {
        init: (swiper) => {
          updatePrevBtnVisibility(swiper);
        },
        slideChange: (swiper) => {
          updatePrevBtnVisibility(swiper);
        }
      }
    });
  }
}
