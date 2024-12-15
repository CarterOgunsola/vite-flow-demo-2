import PageRouter from "./pages/index.js";
import globalInit from "./global/globalInit.js";
import { initializeComponents } from "./components/index.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize global functionality
  globalInit();

  // Initialize components
  initializeComponents();

  // Initialize page-specific logic
  PageRouter();
});
