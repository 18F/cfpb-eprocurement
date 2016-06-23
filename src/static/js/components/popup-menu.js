var events = require('../lib/events');

var EVENTS = '__events__';
var EXPANDED = 'aria-expanded';
var CONTROLS = 'aria-controls';
var HIDDEN = 'aria-hidden';

var onButtonClick = events.delegate({
  'button[aria-haspopup]': function(e) {
    this.toggle();
  }
});

var onClickOff = function(e) {
  if (!this.contains(e.target)) {
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
    }},

    detachedCallback: {value: function() {
      this.removeEventListener('click', onButtonClick);
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

    open: {value: function() {
      this.expanded = true;
    }},

    close: {value: function() {
      this.expanded = false;
    }},

    toggle: {value: function() {
      this.expanded = !this.expanded;
    }}
  })
};

module.exports = PopupMenu;
