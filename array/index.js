/**
 * check typeof array.
 * 
 * @param {array}
 * @returns {boolean}
 */

const isArray = (arr) => Array.isArray(arr);

/**
 * Returns a sorted array by prop.
 * 
 * @param {array}
 * @param {string}
 * @returns {array}
 */

const getSortedArray = (arr, sortBy = 'date') => {
  if (!isArray(arr)) {
    return [];
  }
  return arr.slice().sort( (a,b) => new Date(a[sortBy]) - new Date(b[sortBy]));
}

module.exports = {
  isArray,
  getSortedArray,
};