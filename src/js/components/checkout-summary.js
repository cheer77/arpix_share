import { updateCartUI, initCartInteractions } from '../modules/cart-shared.js';

export function initCheckoutSummary() {
  const summary = document.querySelector('.checkout-summary');
  if (!summary) return;

  // ─── Shared Cart Logic ──────────────────────────────
  const options = {
    titleSelector: '.checkout-summary__count',
    subtotalSelector: '.checkout-summary__price .value',
    totalSelector: '.checkout-total-line--final .value',
    promoAccentSelector: '.basket__promo-accent',
    promoBarSelector: '.basket__promo-bar',
    promoMainSelector: '.basket__promo-main',
    discount: 60
  };

  const refreshUI = () => updateCartUI(summary, options);

  initCartInteractions(summary, refreshUI);
  refreshUI();
}
