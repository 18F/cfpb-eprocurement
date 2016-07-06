var EVENTS = '__events__';

var EXPANDED = 'aria-expanded';
var CONTROLS = 'aria-controls';
var HIDDEN = 'aria-hidden';
var SELECTED = 'aria-selected';

var events = require('../lib/events');
var getAncestor = require('../lib/get-ancestor');

var onButtonClick = events.delegate({
  '*': function(e) {
    e.stopPropagation();
  },
  'button[aria-haspopup]': function(e) {
    this.toggle();
  },
  'button.clear': function(e) {
    this.clearValue();
    this.close();
  },
  'button.select-all': function(e) {
    this.selectAllValues();
  }
}, true);

var getSelectValue = function(select) {
  if (select.multiple) {
    return [].filter.call(select.options, function(option) {
      return option.selected;
    })
    .map(function(option) {
      return option.value;
    });
  } else {
    return select.value;
  }
};

var setSelectValue = function(select, value) {
  var changed = false;
  var options = [].slice.call(select.options);
  if (Array.isArray(value)) {
    value = value.map(String);
    options.forEach(function(option) {
      var selected = value.indexOf(option.value) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
        changed = true;
      }
    });
  } else {
    value = String(value);
    changed = select.value !== value;
    if (changed) {
      select.value = value;
    }
  }
  return changed;
};

var onClickOff = function(e) {
  if (!this.contains(e.target)) {
    this.close();
  }
};

var redispatchChange = events.delegate({
  'select': function(e) {
    this.updateSelected();
    this.dispatchEvent(new Event(e.type, {bubbles: true}));
  }
});

var closeOnEscape = function(e) {
  if (e.keyCode === 27) {
    this.close();
  }
};

var PopupMenu = {
  prototype: Object.create(HTMLElement.prototype, {

    attachedCallback: {value: function() {
      this[EVENTS] = {
        clickoff: onClickOff.bind(this)
      };
      this.addEventListener('click', onButtonClick);
      this.addEventListener('keydown', closeOnEscape);
      this.addEventListener('change', redispatchChange);
      this.updateSelected();
    }},

    detachedCallback: {value: function() {
      this.removeEventListener('click', onButtonClick);
      this.removeEventListener('keydown', closeOnEscape);
      this.removeEventListener('change', redispatchChange);
      this.expanded = false;
      delete this[EVENTS];
    }},

    button: {
      get: function() {
        return this.querySelector('button[aria-haspopup]');
      }
    },

    menu: {
      get: function() {
        var button = this.button;
        return button.hasAttribute(CONTROLS)
          ? document.getElementById(button.getAttribute(CONTROLS))
          : this.querySelector('menu, [role=menu]');
      }
    },

    expanded: {
      get: function() {
        var expanded = this.button.getAttribute(EXPANDED);
        return expanded === 'true';
      },
      set: function(expanded) {
        if (expanded !== this.expanded) {
          this.button.setAttribute(EXPANDED, expanded);
          this.menu.setAttribute(HIDDEN, !expanded);
          var events = this[EVENTS];
          if (expanded) {
            this.button.addEventListener('blur', events.clickoff);
            window.addEventListener('click', events.clickoff);
          } else {
            this.button.removeEventListener('blur', events.clickoff);
            window.removeEventListener('click', events.clickoff);
          }
        }
      }
    },

    select: {
      get: function() {
        return this.querySelector('select');
      }
    },

    value: {
      get: function() {
        return getSelectValue(this.select);
      },
      set: function(value) {
        var select = this.select;
        var changed = setSelectValue(select, value);
        this.updateSelected();
        if (changed) {
          this.dispatchEvent(new Event('change', {bubbles: true}));
        }
      }
    },

    open: {value: function() {
      this.expanded = true;
    }},

    close: {value: function() {
      this.expanded = false;
    }},

    clearValue: {value: function() {
      this.value = undefined;
    }},

    selectAllValues: {value: function() {
      this.value = [].map.call(this.select.options, function(option) {
        return option.value;
      });
    }},

    toggle: {value: function() {
      this.expanded = !this.expanded;
    }},

    updateSelected: {value: function() {
      var selected = this.select.selectedIndex > -1;
      this.button.setAttribute(SELECTED, selected);
    }}
  })
};

module.exports = PopupMenu;
