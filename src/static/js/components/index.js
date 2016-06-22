require('document-register-element');

var prefix = 'cfpb-';

var SortableTable = document.registerElement(
  prefix + 'sortable-table',
  require('./sortable-table')
);

module.exports = {
  SortableTable: SortableTable
};
