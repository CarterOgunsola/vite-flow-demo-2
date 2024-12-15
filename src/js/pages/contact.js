import { queryElement } from '../utils/index.js';

const contactInit = () => {
  const form = queryElement('.contact-form');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form handling logic here
    console.log('Form submitted!');
  });
};

export default contactInit;