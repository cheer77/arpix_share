// ========================================
// Arpix Share — Main JS Entry Point
// ========================================

// --- Global Styles ---
import 'swiper/css/bundle';
import '../scss/main.scss';

// --- Component Styles ---
import '../components/layout/header/header.scss';
import '../components/layout/basket/basket.scss';
import '../components/ui/breadcrumbs/breadcrumbs.scss';
import '../components/pages/product/product-hero/product-hero.scss';
import '../components/pages/product/product-tabs/product-tabs.scss';
import '../components/shared/recom-slider/recom-slider.scss';
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
import '../components/pages/product/faq/faq.scss';
import '../components/pages/product/product-blog/product-blog.scss';
import '../components/pages/product/product-dealers/product-dealers.scss';
import '../components/pages/catalog/catalog-hero/catalog-hero.scss';
import '../components/pages/catalog/catalog-banner/catalog-banner.scss';

// --- Global Modules ---
import Swiper from 'swiper/bundle';
window.Swiper = Swiper;

// --- Component Modules ---
import { initHeader } from './components/header.js';
import { initScrollAnimations } from './animations/scroll-animations.js';
import { initProductCards } from './components/product-card.js';
import { initLifeSlider } from './components/life-slider.js';
import { initProductGallery } from './components/product-gallery.js';
import { initBasket } from './components/basket.js';
import initProductTabs from './components/product-tabs.js';
import { initRecomSlider } from './components/recom-slider.js';
import { initFaq } from './components/faq.js';

import { initQuantityControls } from './components/quantity-control.js';

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initHeader === 'function') initHeader();
  if (typeof initScrollAnimations === 'function') initScrollAnimations();
  if (typeof initProductCards === 'function') initProductCards();
  if (typeof initLifeSlider === 'function') initLifeSlider();
  if (typeof initBasket === 'function') initBasket();
  if (typeof initProductGallery === 'function') initProductGallery();
  if (typeof initQuantityControls === 'function') initQuantityControls();
  if (typeof initProductTabs === 'function') initProductTabs();
  if (typeof initRecomSlider === 'function') initRecomSlider();
  if (typeof initFaq === 'function') initFaq();
});

