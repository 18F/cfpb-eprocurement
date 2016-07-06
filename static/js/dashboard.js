(function(exports) {
  var plusMinus = d3.format('+d');

  var tables = d3.selectAll('table[is=cfpb-sortable-table].events')
    .datum(function() { return this.data; })

  var rows = tables.selectAll('tbody tr')
    .data(function(data) { return data; });

  // max "acceptable" delay of a single milestone
  var DELAY_MAX = 14;
  // max "acceptable" cumulative delay of a procurement
  var CUMULATIVE_DELAY_MAX = 30;

  // colors to use for both the milestone and procurement
  // delay cells
  var colors = colorbrewer.PuOr[11].slice().reverse();

  var delayScale = d3.scale.quantile()
    .domain([-DELAY_MAX, DELAY_MAX])
    .range(colors);

  var cumulativeDelayScale = d3.scale.quantile()
    .domain([-CUMULATIVE_DELAY_MAX, CUMULATIVE_DELAY_MAX])
    .range(colors);

  // calculate the delay in days for each row
  rows.select('[data-key=delay]')
    .text(function(d) {
      var forecast = d['Forecasted Date'];
      var complete = d['Actual Completion Date'];
      d.delay = (forecast && complete)
        ? getDelay(forecast, complete)
        : 0;
      return plusMinus(d.delay);
    })
    // color-code the cell
    .style('background-color', function(d) {
      return delayScale(d.delay);
    });

  // calculate the running cumulative delay for each row
  tables.each(function() {
    var delay = 0;
    d3.select(this).selectAll('tbody tr')
      .select('[data-key=cumulativeDelay]')
        .text(function(d) {
          delay += d.delay || 0;
          d.cumulativeDelay = delay;
          return plusMinus(d.cumulativeDelay);
        })
        // color-code the cell
        .style('background-color', function(d) {
          return cumulativeDelayScale(d.cumulativeDelay);
        });
  });

  rows.selectAll('[data-format]')
    .html(function(d) {
      var value = this.getAttribute('data-value');
      var key = this.getAttribute('data-key');
      
      if (value) {
        var format = this.getAttribute('data-format');

        // TODO: this can be cleaned up, should add a range data type
        if (key === 'Forecasted Date') {
          return getDateRange(value, 2);
        }

        var date = moment(value, 'YYYY-MM-DD').toDate();
        return d3.time.format(format)(date);
      }
      return this.textContent;
    });

  /**
   * get the delay between a forecast and completion date, with a
   * positive delay meaning "behind schedule" and a negative delay
   * indicating ahead of schedule.
   */
  function getDelay(forecast, complete) {
    return moment(complete, 'YYYY-MM-DD')
      .diff(forecast, 'days');
  }

  /**
   * Given a date, return a new string representing a range of dates around
   * the supplied date
   * @param  {String} date    in the format of YYYY MM DD
   * @param  {Number} before  number of days before start date
   * @param  {Number} after   number of days after start date (optional)
   * @return {String}         range of dates e.g. '01/01/2016 - 01/03/2016'
   */
  function getDateRange(date, before, after) {
    var FORMAT = 'MM/DD/YYYY';

    var startDate = moment(date, 'YYYY-MM-DD');
    var rangeStart = moment(startDate).subtract(before, 'days').format(FORMAT);
    var rangeEnd = startDate.format(FORMAT);

    if (after) {
      rangeEnd = moment(startDate).add(after, 'days').format(FORMAT);
    }

    return rangeStart + ' - ' + rangeEnd;
  }

})(this);
