import homeInit from "./home.js";
import aboutInit from "./about.js";
import contactInit from "./contact.js";

const routes = {
  home: homeInit,
  about: aboutInit,
  contact: contactInit,
  "extra-page": homeInit,
};

const PageRouter = () => {
  const route = document.body.dataset.route;
  const initFunction = routes[route];

  if (initFunction) {
    initFunction();
  } else {
    console.log(`No specific script for route: ${route}`);
  }
};

export default PageRouter;

//old version

// import homeInit from './home.js';
// import aboutInit from './about.js';
// import contactInit from './contact.js';

// const PageRouter = () => {
//   const route = document.body.dataset.route;

//   switch (route) {
//     case 'home':
//       homeInit();
//       break;
//     case 'about':
//       aboutInit();
//       break;
//     case 'contact':
//       contactInit();
//       break;
//     case 'extra-page':
//       homeInit();
//       break;
//     default:
//       console.log(`No specific script for route: ${route}`);
//   }
// };

// export default PageRouter;
