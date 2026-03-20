export function initCheckout() {
  const checkoutForm = document.querySelector('.checkout-form');
  if (!checkoutForm) return;

  // Handle Delivery Type Switching (Post vs Pickup)
  const deliveryRadios = checkoutForm.querySelectorAll('input[name="delivery_type"]');
  const deliveryOperators = checkoutForm.querySelector('.checkout-delivery-operators');
  const deliverySuboptions = checkoutForm.querySelector('.checkout-delivery-suboptions');
  const branchFields = checkoutForm.querySelectorAll('.checkout-form__grid .checkout-field select[name="city"], .checkout-form__grid .checkout-field select[name="office"]');

  const updateDeliveryUI = () => {
    const selectedType = checkoutForm.querySelector('input[name="delivery_type"]:checked').value;
    const methodCards = checkoutForm.querySelectorAll('.checkout-method-card');
    
    methodCards.forEach(card => {
       const radio = card.querySelector('input');
       if (radio.checked) {
         card.classList.add('is-active');
       } else {
         card.classList.remove('is-active');
       }
    });

    if (selectedType === 'pickup') {
      if (deliveryOperators) deliveryOperators.style.display = 'none';
      if (deliverySuboptions) deliverySuboptions.style.display = 'none';
      branchFields.forEach(f => f.closest('.checkout-field').style.display = 'none');
    } else {
      if (deliveryOperators) deliveryOperators.style.display = 'block';
      if (deliverySuboptions) deliverySuboptions.style.display = 'block';
      branchFields.forEach(f => f.closest('.checkout-field').style.display = 'flex');
    }
  };

  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', updateDeliveryUI);
  });

  // Handle Operator Switching (Nova Poshta vs Ukrposhta)
  const operatorRadios = checkoutForm.querySelectorAll('input[name="delivery_operator"]');
  const updateOperatorUI = () => {
    const operatorCards = checkoutForm.querySelectorAll('.checkout-operator-card');
    operatorCards.forEach(card => {
      const radio = card.querySelector('input');
      if (radio.checked) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });
  };

  operatorRadios.forEach(radio => {
    radio.addEventListener('change', updateOperatorUI);
  });

  // Initial call
  updateDeliveryUI();
  updateOperatorUI();

  // Payment UI
  const paymentRadios = checkoutForm.querySelectorAll('input[name="payment_method"]');
  const updatePaymentUI = () => {
    const paymentOptions = checkoutForm.querySelectorAll('.checkout-payment-option');
    paymentOptions.forEach(option => {
      const radio = option.querySelector('input');
      if (radio.checked) {
        option.classList.add('is-active');
      } else {
        option.classList.remove('is-active');
      }
    });
  };

  paymentRadios.forEach(radio => {
    radio.addEventListener('change', updatePaymentUI);
  });
  updatePaymentUI();
}
