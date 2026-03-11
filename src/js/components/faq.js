// ========================================
// FAQ Component — Accordion Logic
// ========================================

export function initFaq() {
  const faqList = document.querySelector('.faq__list');
  
  if (!faqList) return;

  faqList.addEventListener('click', (event) => {
    const btn = event.target.closest('.faq__question-btn');
    if (!btn) return;

    const item = btn.closest('.faq__item');
    if (!item) return;

    const isOpen = item.classList.contains('is-open');

    // Close all other items (optional, but often preferred for accordions)
    const allItems = faqList.querySelectorAll('.faq__item');
    allItems.forEach(i => {
      if (i !== item) {
        i.classList.remove('is-open');
        i.querySelector('.faq__question-btn').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current item
    if (isOpen) {
      item.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
}
