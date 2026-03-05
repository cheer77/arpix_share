// ========================================
// Scroll Animations — JS Module
// (Intersection Observer for reveal-on-scroll)
// ========================================

export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.hero__content, .hero__media, ' +
    '.brand__title, .brand__content, .brand__banner, ' +
    '.choose__header, .choose__card, ' +
    '.quality__item, ' +
    '.promo__content, .promo__visual, ' +
    '.community__content, .community__media'
  );

  if (!animatedElements.length) return;

  // Add initial hidden state
  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger animation for grid items
          const parent = entry.target.parentElement;
          const siblings = parent
            ? Array.from(parent.children).filter((child) =>
                animatedElements.contains
                  ? [...animatedElements].includes(child)
                  : true
              )
            : [];
          const index = siblings.indexOf(entry.target);
          const delay = index > 0 ? index * 100 : 0;

          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
}
