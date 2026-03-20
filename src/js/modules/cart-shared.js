import { initQuantityControls } from '../components/quantity-control.js';

/**
 * Shared logic to update cart/summary UI
 * @param {HTMLElement} container - The root element (basket or checkout-summary)
 * @param {Object} options - Configuration options
 */
export const updateCartUI = (container, options = {}) => {
  if (!container) return;

  const {
    itemSelector = '.basket-item',
    priceSelector = '.basket-item__price',
    quantitySelector = '.quantity-control__input',
    subtotalSelector = '.basket__calc-row:nth-child(1) .basket__calc-value',
    totalSelector = '.basket__calc-row--total .basket__calc-value',
    promoThreshold = 500,
    promoAccentSelector = '.basket__promo-accent',
    promoBarSelector = '.basket__promo-bar',
    promoMainSelector = '.basket__promo-main',
    titleSelector = '#basket-title',
    discount = 60
  } = options;

  const items = container.querySelectorAll(itemSelector);
  let subtotal = 0;
  let itemCount = 0;

  items.forEach(item => {
    const priceEl = item.querySelector(priceSelector);
    const quantityEl = item.querySelector(quantitySelector);
    
    if (priceEl && quantityEl) {
      const price = parseFloat(priceEl.textContent.replace(/[^\d.]/g, ''));
      const quantity = parseInt(quantityEl.value);
      subtotal += price * quantity;
      itemCount += quantity;
    }
  });

  // Update Title/Count if exists
  const title = container.querySelector(titleSelector);
  if (title) {
    if (title.id === 'basket-title') {
      title.textContent = `Товарів у кошику: ${itemCount}`;
    } else {
      title.textContent = `${itemCount} товар(ів) на суму:`;
    }
  }

  // Update Summary values
  const subtotalEl = container.querySelector(subtotalSelector);
  const totalEl = container.querySelector(totalSelector);
  
  if (subtotalEl) subtotalEl.textContent = subtotal;
  
  const total = subtotal - discount;
  if (totalEl) totalEl.textContent = total > 0 ? total : 0;

  // Promo Progress Logic
  const promoAccent = container.querySelector(promoAccentSelector);
  const progressBar = container.querySelector(promoBarSelector);
  
  if (promoAccent && progressBar) {
    const remaining = promoThreshold - subtotal;
    if (remaining > 0) {
      promoAccent.textContent = `${remaining} грн`;
      const percentage = Math.min((subtotal / promoThreshold) * 100, 100);
      progressBar.style.width = `${percentage}%`;
    } else {
      promoAccent.textContent = `0 грн`;
      progressBar.style.width = '100%';
      const promoMain = container.querySelector(promoMainSelector);
      if (promoMain) promoMain.innerHTML = 'Ви отримали <span class="basket__promo-accent">найкращий подарунок!</span>';
    }
  }

  return { subtotal, total, itemCount };
};

/**
 * Initialize common cart interactions (remove, quantity change)
 * @param {HTMLElement} container 
 * @param {Function} onUpdate - callback after UI updates
 */
export const initCartInteractions = (container, onUpdate) => {
  if (!container) return;

  // Quantity Control
  initQuantityControls(container);
  
  container.querySelectorAll('.quantity-control__input').forEach(input => {
    input.addEventListener('change', () => {
      onUpdate();
    });
  });

  // Remove Buttons
  const removeBtns = container.querySelectorAll('.basket-item__remove');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.basket-item');
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        setTimeout(() => {
          item.remove();
          onUpdate();
        }, 300);
      }
    });
  });
};
