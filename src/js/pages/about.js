import { queryElements } from '../utils/index.js';

const aboutInit = () => {
  const teamMembers = queryElements('.team-member');
  
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
      member.querySelector('.member-bio')?.classList.add('is-visible');
    });
    
    member.addEventListener('mouseleave', () => {
      member.querySelector('.member-bio')?.classList.remove('is-visible');
    });
  });
};

export default aboutInit;