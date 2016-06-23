module.exports.delegate = function delegate(selectors) {
  return function(e) {
    var result;
    for (var selector in selectors) {
      if (e.target.matches(selector)) {
        result = selectors[selector].call(this, e);
        if (result === false) {
          break;
        }
      }
    }
    return result;
  };
};
