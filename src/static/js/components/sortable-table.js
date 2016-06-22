var DATA_KEY = '__data__';
var SORT_KEY = '__sort__';
var FILTER_KEY = '__filter__';

var predicate = require('../lib/predicate');
var compare = require('../lib/compare');

var functional = function(f) {
  return function(list) {
    return f.apply(list, Array.prototype.slice.call(arguments, 1));
  };
};

var _slice = functional(Array.prototype.slice);
var _map = functional(Array.prototype.map);
var _forEach = functional(Array.prototype.forEach);

var getRowData = function(tr, columns) {
  var row = {};
  var cells = tr.querySelectorAll('th, td');
  columns.forEach(function(col, i) {
    row[col] = getCellData(cells[i]);
  });
  return row;
};

var getCellData = function(cell) {
  if (DATA_KEY in cell) {
    return cell[DATA_KEY];
  } else {
    var data = cell.getAttribute('data-value') || cell.textContent;
    if (data.length && !isNaN(Number(data))) {
      data = Number(data);
    }
    cell[DATA_KEY] = data;
    return data;
  }
};

var delegate = function(selectors) {
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


var sortOnClick = function(e) {
  var key = getCellData(e.target);
  var sort = this.sort;
  if (sort.key === key) {
    sort.order = compare.toggle(sort.order);
  } else {
    sort = {key: key, order: compare.ASCENDING};
  }
  this.sort = sort;
  return false;
};

var onDelegatedClick = delegate({
  'thead th': sortOnClick
});

var onFilterChange = function(e) {
  this.setFilter(e.key, e.value);
};

var SortableTable = {
  'extends': 'table',
  prototype: Object.create(HTMLTableElement.prototype, {

    attachedCallback: {value: function() {
      this.addEventListener('click', onDelegatedClick, true);
      this.addEventListener('filter-change', onFilterChange);
    }},

    detachedCallback: {value: function() {
      this.removeEventListener('click', onDelegatedClick, true);
      this.removeEventListener('filter-change', onFilterChange);
    }},

    rows: {
      get: function() {
        return _slice(this.querySelectorAll('tbody tr'));
      }
    },

    headers: {
      get: function() {
        return _slice(this.querySelectorAll('thead tr:last-child > *'));
      }
    },

    columns: {
      get: function() {
        return _map(this.headers, getCellData);
      }
    },

    data: {
      get: function() {
        var columns = this.columns;
        return _map(rows, function(tr) {
          return getRowData(tr, columns);
        });
      }
    },

    sort: {
      get: function() {
        return this[SORT_KEY] || (this[SORT_KEY] = {
          key: undefined,
          asc: undefined
        });
      },
      set: function(sort) {
        this[SORT_KEY] = sort;
        this.updateSort();
      }
    },

    updateSort: {value: function() {
      var sort = this.sort;
      var columns = this.columns;
      var col = sort.key;
      var index = columns.indexOf(col);
      if (index === -1) {
        console.warn('no such column:', col, 'in', columns);
        return false;
      }

      // update aria-sort for each heading
      _forEach(this.headers, function(th) {
        var order = getCellData(th) === col ? sort.order : compare.NONE;
        th.setAttribute('aria-sort', order);
      });

      var selector = 'tr > :nth-child(' + (index + 1) + ')';
      var value = function(row) {
        return (SORT_KEY in row)
          ? row[SORT_KEY]
          : row[SORT_KEY] = getCellData(row.querySelector(selector));
      };

      var comp = compare[sort.order];
      if (!comp) {
        throw new Error('unrecognized sort order: "' + sort.order + '"');
      }

      var tbody = this.querySelector('tbody');

      var rows = _slice(tbody.querySelectorAll('tr'))
        .sort(function(a, b) {
          return comp(value(a), value(b));
        });

      rows.forEach(function(row) {
        delete row[SORT_KEY];
        tbody.appendChild(row);
      });
    }},

    filters: {
      get: function() {
        return this[FILTER_KEY] || (this[FILTER_KEY] = {});
      },
      set: function(filters) {
        this[FILTER_KEY] = filters;
        this.updateFilter();
      }
    },

    updateFilter: {value: function() {
      var cols = this.columns;
      var visible = predicate(filters);
      _forEach(this.rows, function(row) {
        var data = getRowData(row, cols);
        row.hidden = !visible.call(row, data);
      });
    }},

    getFilter: {value: function(key) {
      return this.filters[key];
    }},

    setFilter: {value: function(key, value) {
      var filters = this.filters;
      if (value === null || value === undefined) {
        delete filters[key];
      } else {
        filters[key] = value;
      }
      this.filters = filters;
    }}

  })
};

module.exports = SortableTable;
