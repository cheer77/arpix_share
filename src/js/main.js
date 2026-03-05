// ========================================
// Arpix Share — Main JS Entry Point
// ========================================

// --- Global Styles ---
import '../scss/main.scss';

// --- Component Styles ---
import '../components/layout/header/header.scss';
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

// --- Component Modules ---
import { initHeader } from './components/header.js';
import { initScrollAnimations } from './animations/scroll-animations.js';
import { initProductCards } from './components/product-card.js';

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initHeader === 'function') initHeader();
  if (typeof initScrollAnimations === 'function') initScrollAnimations();
  if (typeof initProductCards === 'function') initProductCards();
});
