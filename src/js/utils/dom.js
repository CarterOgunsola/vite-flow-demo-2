/**
 * DOM utility functions for common operations
 */

/**
 * Query a single element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export const queryElement = (selector) => document.querySelector(selector);

/**
 * Query multiple elements
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
export const queryElements = (selector) => document.querySelectorAll(selector);

/**
 * Add class to element
 * @param {Element} el - Target element
 * @param {string} className - Class to add
 */
export const addClass = (el, className) => el.classList.add(className);

/**
 * Remove class from element
 * @param {Element} el - Target element
 * @param {string} className - Class to remove
 */
export const removeClass = (el, className) => el.classList.remove(className);

/**
 * Toggle class on element
 * @param {Element} el - Target element
 * @param {string} className - Class to toggle
 */
export const toggleClass = (el, className) => el.classList.toggle(className);