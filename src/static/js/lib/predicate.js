module.exports = function predicate(filters) {
  var functions = Object.keys(filters).map(function(key) {
    var value = filters[key];
    if (typeof value === 'function') {
      return function(d) {
        return value.call(this, d[key], key);
      };
    } else if (Array.isArray(value)) {
      return function(d) {
        return value.indexOf(String(d[key])) > -1;
      };
    }
    return function(d) {
      return d[key] == value;
    };
  });
  return function(d, i) {
    return functions.every(function(f) {
      return f.call(this, d, i);
    }, this);
  };
};
