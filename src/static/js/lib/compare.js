var ASCENDING = 'ascending';
var DESCENDING = 'descending';
var NONE = 'none';

var compare = {
  ASCENDING: ASCENDING,
  DESCENDING: DESCENDING,
  NONE: NONE,
  toggle: function(order) {
    return order === ASCENDING ? DESCENDING : ASCENDING;
  }
};

compare[ASCENDING] = function asc(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};

compare[DESCENDING] = function desc(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
};

module.exports = compare;
