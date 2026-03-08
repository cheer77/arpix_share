// ========================================
// Arpix Share — Main JS Entry Point
// ========================================

// --- Global Styles ---
import 'swiper/css/bundle';
import '../scss/main.scss';

// --- Component Styles ---
import '../components/layout/header/header.scss';
import '../components/layout/basket/basket.scss';
import '../components/shared/hero/hero.scss';
import '../components/pages/home/benefits/benefits.scss';
import '../components/pages/home/about/about.scss';
import '../components/pages/home/hits/hits.scss';
import '../components/pages/home/life/life.scss';
import '../components/pages/home/features/features.scss';
import '../components/pages/home/dealers/dealers.scss';
import '../components/pages/home/club/club.scss';
import '../components/pages/home/offer/offer.scss';
import '../components/layout/footer/footer.scss';

// --- Global Modules ---
import Swiper from 'swiper';
window.Swiper = Swiper; // Make it globally available if needed, though we import it directly below where used. Or better yet, just use standard imports in specific files.

// --- Component Modules ---
import { initHeader } from './components/header.js';
import { initScrollAnimations } from './animations/scroll-animations.js';
import { initProductCards } from './components/product-card.js';
import { initLifeSlider } from './components/life-slider.js';
import { initBasket } from './components/basket.js';

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initHeader === 'function') initHeader();
  if (typeof initScrollAnimations === 'function') initScrollAnimations();
  if (typeof initProductCards === 'function') initProductCards();
  if (typeof initLifeSlider === 'function') initLifeSlider();
  if (typeof initBasket === 'function') initBasket();
});
