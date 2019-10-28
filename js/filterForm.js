'use strict';

(function () {
  var filterFields = window.domRef.filterForm.querySelectorAll('.map__filter, .map__checkbox');
  var PINS_COUNT = 5;
  var housingType = window.domRef.filterForm.querySelector('#housing-type');

  // Функция деактивации фильтров
  var deactivateFilters = function () {
    filterFields.forEach(window.util.setDisabled);
  };

  // Функция активации фильтров
  var activateFilters = function () {
    filterFields.forEach(window.util.unsetDisabled);
  };

  // Функция проверки для каждого элемента массива на основе значения фильтра типа жилья
  var getHousingType = function (item) {
    if (housingType.value === 'any') {
      return true;
    }
    return item.offer.type === housingType.value;
  };

  // Функция фильтрации элементов массива
  var filterAll = function () {
    return window.page.ads
    .filter(function (item) {
      return getHousingType(item);
    })
    .slice(0, PINS_COUNT);
  };

  // Обработчик, закрывает объявления, убирает пины и создает новые на основе требований фильтра
  var onFilterChange = window.debounce(function () {
    window.card.close();
    window.pin.remove();
    window.pin.show(filterAll());
  });

  // Обработчик события изменения значения фильтра типа жилья
  window.domRef.filterForm.addEventListener('change', onFilterChange);

  window.filter = {
    deactivate: deactivateFilters,
    activate: activateFilters,
    all: filterAll,
  };
})();
