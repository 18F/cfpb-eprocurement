var INDEX = 0;

var createCheckbox = function(name) {
  var input = document.createElement('input');
  input.type = 'checkbox';
  input.name = 'fave-star-' + (name || ++INDEX);
  return input;
};

var attached = function() {
  this._input = this.querySelector('input[type=checkbox]')
    || this.appendChild(createCheckbox(this.name));
  this._span = this._input.nextSibling
    || this.appendChild(document.createElement('span'));

  this.fetch();
  this.addEventListener('change', onChange);
};

var detached = function() {
  this.removeEventListener('change', onChange);
};

var onChange = function(e) {
  if (e.target === this._input) {
    this.store(e.target.checked);
  }
};

module.exports = {
  'extends': 'label',
  prototype: Object.create(
    HTMLLabelElement.prototype,
    {
      attachedCallback: {value: attached},
      detachedCallback: {value: detached},

      checked: {
        get: function() {
          return this._input.checked;
        },
        set: function(value) {
          value = !!value;
          if (this.checked != value) {
            this._input.checked = value;
            this.store(value);
          }
        }
      },

      toggle: {value: function() {
        this.checked = !this.checked;
      }},

      fetch: {value: function() {
        var value = localStorage.getItem(this._input.name);
        this.checked = value === 'true';
      }},

      store: {value: function(value) {
        localStorage.setItem(this._input.name, value);
      }}
    }
  )
};
