import { queryElement, toggleClass } from '../utils/index.js';

const navigationInit = () => {
  const menuButton = queryElement('.menu-button');
  const navigation = queryElement('.navigation');
  
  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    toggleClass(navigation, 'is-open');
    toggleClass(menuButton, 'is-active');
  });
};

export default navigationInit;