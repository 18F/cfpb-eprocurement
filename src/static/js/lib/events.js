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

module.exports.every = function every(handlers) {
  return function(e) {
    var result;
    handlers.some(function(fn) {
      result = fn.call(this, e);
      if (result !== undefined) {
        return true;
      }
    }, this);
    return result;
  };
};
