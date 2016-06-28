require('document-register-element');

var prefix = 'cfpb-';

var SortableTable = document.registerElement(
  prefix + 'sortable-table',
  require('./sortable-table')
);

var PopupMenu = document.registerElement(
  prefix + 'popup-menu',
  require('./popup-menu')
);

module.exports = {
  SortableTable: SortableTable,
  PopupMenu: PopupMenu
};
