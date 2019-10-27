'use strict';

(function () {
  var filterFields = window.domRef.filterForm.querySelectorAll('.map__filter, .map__checkbox');

  // Функция активации фильтров
  var deactivateFilters = function () {
    filterFields.forEach(window.util.setDisabled);
  };

  // Функция активации фильтров
  var activateFilters = function () {
    filterFields.forEach(window.util.unsetDisabled);
  };

  window.filter = {
    deactivate: deactivateFilters,
    activate: activateFilters,
  };
})();
