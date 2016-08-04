(function(exports) {

  var query = querystring.parse(location.search.substr(1));

  console.log('query:', query);

  var templates = d3.selectAll('[data-bind]')
    .datum(function() {
      return this.getAttribute('data-bind');
    })
    .filter(function(key) { return key in query; });

  templates
    .filter(function(key) {
      return typeof query[key] === 'string';
    })
    .text(function(key) {
      return query[key];
    });


  templates
    .each(function(key) {
      this.setAttribute('data-' + key, query[key]);
    });

    if (query.locked === "true") {
      var h2 = document.createElement('h3');
      h2.textContent = 'Sample view-only (locked or non-editable) document on Sharepoint';
      document.querySelector('[data-bind=title]').appendChild(h2);
    }

})(this);
