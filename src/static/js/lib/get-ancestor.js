module.exports = function getAncestor(element, selector) {
  while (element = element.parentNode) {
    if (element.matches(selector)) {
      return element;
    }
  }
};
