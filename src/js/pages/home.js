import { queryElement } from '../utils/index.js';

const homeInit = () => {
  const heroSection = queryElement('.hero-section');
  
  if (!heroSection) return;

  // Example: Add parallax effect to hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
};

export default homeInit;