/**
 * Catalog Interactivity
 * Handles:
 * - Filter accordions (expand/collapse)
 * - Sorting dropdown
 * - Mobile filter toggle (TBD)
 */

export function initCatalog() {
  const filterGroups = document.querySelectorAll('.filter-group');
  const mainFilterTrigger = document.getElementById('main-filter-trigger');
  const mainFilterContent = document.getElementById('main-filter-content');
  const sortDropdown = document.querySelector('.catalog-nav__sort');

  function toggleIcon(icon, isActive) {
    if (!icon) return;
    if (isActive) {
      icon.classList.remove('ph-plus');
      icon.classList.add('ph-minus');
    } else {
      icon.classList.remove('ph-minus');
      icon.classList.add('ph-plus');
    }
  }

  // Main Filter Accordion
  if (mainFilterTrigger && mainFilterContent) {
    mainFilterTrigger.addEventListener('click', () => {
      const isActive = mainFilterTrigger.classList.contains('is-active');
      mainFilterTrigger.classList.toggle('is-active');
      mainFilterContent.classList.toggle('is-active');
      
      const icon = mainFilterTrigger.querySelector('.catalog-filter__header-icon');
      toggleIcon(icon, !isActive);
    });
  }

  // Filter Group Accordions
  filterGroups.forEach(group => {
    const trigger = group.querySelector('.filter-group__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = group.classList.contains('is-active');
      group.classList.toggle('is-active');
      trigger.setAttribute('aria-expanded', !isActive);
      
      const icon = trigger.querySelector('.filter-group__icon');
      toggleIcon(icon, !isActive);
    });
  });

  // Sorting Dropdown
  if (sortDropdown) {
    const trigger = sortDropdown.querySelector('.dropdown__trigger');
    const items = sortDropdown.querySelectorAll('.dropdown__item');
    const currentLabel = sortDropdown.querySelector('.catalog-nav__sort-current');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      sortDropdown.classList.toggle('is-active');
      const isActive = sortDropdown.classList.contains('is-active');
      trigger.setAttribute('aria-expanded', isActive);
    });

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        const value = item.dataset.value;
        const text = item.textContent;

        // Update UI
        if (currentLabel) currentLabel.textContent = text;
        
        // Update selection
        items.forEach(i => i.setAttribute('aria-selected', 'false'));
        item.setAttribute('aria-selected', 'true');

        // Close dropdown
        sortDropdown.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');

        // Dispatch custom event for filtering logic
        document.dispatchEvent(new CustomEvent('catalog:sort', { detail: { value } }));
      });
    });

    // Close on click outside
    document.addEventListener('click', () => {
      sortDropdown.classList.remove('is-active');
      trigger.setAttribute('aria-expanded', 'false');
    });
  }
}
