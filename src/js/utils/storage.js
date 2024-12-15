/**
 * Storage utility functions for localStorage and sessionStorage
 */

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage item:', error);
  }
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @returns {*} Stored value
 */
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting localStorage item:', error);
    return null;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing localStorage item:', error);
  }
};