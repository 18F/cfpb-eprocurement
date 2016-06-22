'use strict';

var cfpb = {};
global.cfpb = cfpb;

global.$ = require('jquery');
global.tagalong = require('tagalong');

cfpb.components = require('./components');

require('cf-expandables');
require('cf-tables');
