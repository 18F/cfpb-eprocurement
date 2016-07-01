var DATA_KEY = '__data__';
var SORT_KEY = '__sort__';
var FILTER_KEY = '__filter__';

var SORTED = 'data-sorted';

var compare = require('../lib/compare');
var events = require('../lib/events');
var predicate = require('../lib/predicate');
var getAncestor = require('../lib/get-ancestor');

var functional = function(f) {
  return function(list) {
    return f.apply(list, Array.prototype.slice.call(arguments, 1));
  };
};

var _slice = functional(Array.prototype.slice);
var _map = functional(Array.prototype.map);
var _filter = functional(Array.prototype.filter);
var _forEach = functional(Array.prototype.forEach);

var getRowData = function(tr, columns) {
  var cells = tr.querySelectorAll('th, td');
  return columns.reduce(function(row, col, i) {
    row[col] = getCellData(cells[i]);
    return row;
  }, {});
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

var onDelegatedClick = events.delegate({
  'thead th': function sortOnClick(e) {
    var key = getCellData(e.delegatedTarget || e.target);
    var sort = this.sort;
    if (sort.key === key) {
      sort.order = compare.toggle(sort.order);
    } else {
      sort = {key: key, order: compare.ASCENDING};
    }
    this.sort = sort;
    e.preventDefault();
    return false;
  }
});

var onFilterChange = events.delegate({
  'cfpb-popup-menu': function setFilterOnChange(e) {
    var menu = e.delegatedTarget || e.target;
    var header = getAncestor(menu, 'th');
    var column = getCellData(header);
    this.setFilter(column, menu.value);
  }
});

var SortableTable = {
  'extends': 'table',
  prototype: Object.create(HTMLTableElement.prototype, {

    attachedCallback: {value: function() {
      var data = this.data;
      this.headers.forEach(function(header) {
        var select = header.querySelector('cfpb-popup-menu select');
        if (!select) {
          return;
        }
        var column = getCellData(header);

        var values = data.map(function(d) {
          return d[column];
        });

        values = values.filter(function(value, i) {
          return values.indexOf(value) === i;
        })
        .sort(); // lexicographic

        values.forEach(function(value) {
          var option = select.appendChild(document.createElement('option'));
          option.value = option.textContent = value;
        });

      }, this);
      this.addEventListener('click', onDelegatedClick);
      this.addEventListener('change', onFilterChange);
    }},

    detachedCallback: {value: function() {
      this.removeEventListener('click', onDelegatedClick);
      this.removeEventListener('change', onFilterChange);
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
        return _map(this.rows, function(tr) {
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

      var selector = 'tr > :nth-child(' + (index + 1) + ')';

      // update aria-sort for each heading
      _forEach(this.headers, function(th) {
        var order = getCellData(th) === col ? sort.order : compare.NONE;
        th.setAttribute('aria-sort', order);
      });

      var value = function(row) {
        var cells = _filter(row.childNodes, function(node) {
          return node.nodeType === Node.ELEMENT_NODE;
        });

        cells.forEach(function(cell, i) {
          if (i === index) {
            cell.setAttribute(SORTED, true);
          } else {
            cell.removeAttribute(SORTED);
          }
        });

        return (SORT_KEY in row)
          ? row[SORT_KEY]
          : row[SORT_KEY] = getCellData(cells[index]);
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
      var visible = predicate(this.filters);
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
      if (value === null ||
          value === undefined ||
          (Array.isArray(value) && !value.length)) {
        delete filters[key];
      } else {
        filters[key] = value;
      }
      this.filters = filters;
    }},

    setCellData: {value: function(cell, data) {
      cell[DATA_KEY] = data;
      cell.setAttribute('data-value', data);
      cell.textContent = String(data);
    }}

  })
};

module.exports = SortableTable;
