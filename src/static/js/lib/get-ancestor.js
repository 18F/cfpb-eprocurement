module.exports = function getAncestor(element, selector) {
  while (element = element.parentNode) {
    if (element !== document && element.matches(selector)) {
      return element;
    }
  }
};
