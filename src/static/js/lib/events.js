var getAncestor = require('./get-ancestor');

var functor = function(d) {
  return function() {
    return d;
  };
};

module.exports.delegate = function delegate(selectors) {
  return function(e) {
    var result;
    var delegated = false;
    for (var selector in selectors) {
      var matches = e.target.matches(selector);
      if (!matches) {
        var ancestor = getAncestor(e.target, selector);
        matches = ancestor && this.contains(ancestor);
        if (matches) {
          e.delegatedTarget = ancestor;
        }
      }
      if (matches) {
        result = selectors[selector].call(this, e);
        delegated = true;
        if (result === false) {
          break;
        }
      }
    }
    return result;
  };
};
