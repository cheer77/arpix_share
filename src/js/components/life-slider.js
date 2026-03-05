import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

export function initLifeSlider() {
  const lifeSlider = document.querySelector('.life__slider');
  if (!lifeSlider) return;

  // Initialize Swiper
  new Swiper('.life__slider', {
    modules: [Pagination],
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30, // Space between slides
    loop: true, // Allow infinite looping
    grabCursor: true, // Show grab cursor for better UX
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 10
      },
      768: {
        spaceBetween: 20
      },
      1024: {
        spaceBetween: 30
      }
    }
  });
}
