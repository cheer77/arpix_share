export default function initProductTabs() {
  const tabs = document.querySelector('.product-tabs');
  if (!tabs) return;

  const sections = tabs.querySelectorAll('.product-tabs__section, .product-tabs__characteristics, .product-tabs__ingredients');
  const sidebarLinks = tabs.querySelectorAll('.product-tabs__nav-link');
  const isMobile = () => window.innerWidth <= 1024;

  // Initialize: only first section open on mobile
  if (isMobile()) {
    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add('is-active');
      } else {
        section.classList.remove('is-active');
      }
    });
  }

  // Mobile Accordion Toggle
  sections.forEach(section => {
    const title = section.querySelector('.product-tabs__section-title, .product-tabs__ingredients-header');
    if (!title) return;

    title.addEventListener('click', () => {
      if (!isMobile()) return;
      
      const isActive = section.classList.contains('is-active');
      
      if (isActive) {
        section.classList.remove('is-active');
      } else {
        section.classList.add('is-active');
      }
    });
  });
}
