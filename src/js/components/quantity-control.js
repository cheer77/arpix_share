export function initQuantityControls(container = document) {
  const controls = container.querySelectorAll('.quantity-control');
  
  controls.forEach(control => {
    const input = control.querySelector('.quantity-control__input');
    const minusBtn = control.querySelector('.quantity-control__btn--minus');
    const plusBtn = control.querySelector('.quantity-control__btn--plus');

    if (!input || !minusBtn || !plusBtn) return;

    // Remove existing listeners if any (simple approach)
    const newMinus = minusBtn.cloneNode(true);
    const newPlus = plusBtn.cloneNode(true);
    minusBtn.parentNode.replaceChild(newMinus, minusBtn);
    plusBtn.parentNode.replaceChild(newPlus, plusBtn);

    newMinus.addEventListener('click', () => {
      let val = parseInt(input.value) || 1;
      if (val > 1) {
        input.value = val - 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    newPlus.addEventListener('click', () => {
      let val = parseInt(input.value) || 1;
      input.value = val + 1;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  });
}
