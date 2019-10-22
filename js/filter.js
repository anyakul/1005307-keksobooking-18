'use strict';

(function () {
  // Функция активации фильтров
  var deactivateFilters = function () {
    window.domRef.filterFields.forEach(window.util.setDisabled);
  };
  
  // Функция активации фильтров
  var activateFilters = function () {
    window.domRef.filterFields.forEach(window.util.unsetDisabled);
  };

  window.filter = {
    deactivate: deactivateFilters,
    activate: activateFilters,
  }
})();