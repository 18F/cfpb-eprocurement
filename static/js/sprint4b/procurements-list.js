(function(exports) {

  var procs = d3.selectAll('section.procurement')
    .datum(function() {
      var json = this.getAttribute('data-json');
      var data = JSON.parse(json || '{}');
      data.favorite = this.querySelector('input[type=checkbox]').checked;
      return data;
    })
    .attr('hidden', null);

  var query = querystring.parse(location.search.substr(1));
  if (query.sort) {
    var sortField = query.sort;

    // update the sort input
    d3.select('[name=sort]')
      .property('value', sortField);

    // the default sort is by requested_award_date
    var defaultField = 'requested_award_date';
    var defaultOrder = d3.ascending;
    var defaultSort = function(a, b) {
      return defaultOrder(a[defaultField], b[defaultField]);
    };

    var order = d3[query.order] || d3.descending;
    procs.sort((sortField === defaultField)
      ? defaultSort
      : function(a, b) {
          return order(a[sortField], b[sortField])
              || defaultSort(a, b);
        });
  }

  // auto-submit forms when they change
  d3.selectAll('.js-autosubmit')
    .on('change', function() {
      (this.form || this).submit();
    });

})(this);
