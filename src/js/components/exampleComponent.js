import { queryElement, addClass } from '../utils/index.js';

/**
 * Example component demonstrating component structure
 */
export const exampleComponent = () => {
  const element = queryElement('.example-component');
  
  if (!element) return;

  // Example initialization
  addClass(element, 'is-initialized');
  
  // Example event listener
  element.addEventListener('click', () => {
    console.log('Example component clicked!');
  });
};