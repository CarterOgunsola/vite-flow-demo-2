import { queryElements } from '../utils/index.js';

const footerInit = () => {
  const accordions = queryElements('.footer-accordion');
  
  accordions.forEach(accordion => {
    const trigger = accordion.querySelector('.accordion-trigger');
    const content = accordion.querySelector('.accordion-content');
    
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      content.style.height = content.style.height ? '' : `${content.scrollHeight}px`;
    });
  });
};

export default footerInit;