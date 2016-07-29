'use strict';

global.cfpb = {
  components: require('./components')
};

global.$ = require('jquery');
global.moment = require('moment');

global.d3 = require('d3');
global.colorbrewer = require('colorbrewer');

global.querystring = require('querystring');

require('cf-expandables');
require('cf-tables');
