(function(exports) {

  var query = querystring.parse(location.search.substr(1));
  console.log('query:', query);

  d3.selectAll('[data-bind]')
    .datum(function() {
      return this.getAttribute('data-bind');
    })
    .filter(function(key) { return key in query; })
    .text(function(key) {
      return query[key];
    });

})(this);
