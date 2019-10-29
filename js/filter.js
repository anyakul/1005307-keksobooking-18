'use strict';

(function () {
  var PIN_COUNT = 5;
  var filterFields = window.domRef.filterForm.querySelectorAll('.map__filter, .map__checkbox');
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
  var filterHousingType = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };
  
  // Функция коллбэк фильтрации элементов массива
  var filterAds = function (ad) {
    return filterHousingType(ad);
  };

  // Функция фильтрации элементов массива
  var getFilteredAds = function () {
    return window.page.ads
    .filter(filterAds)
    .slice(0, PIN_COUNT);
  };

  // Обработчик, закрывает объявления, убирает пины и создает новые на основе требований фильтра
  var onFilterChange = window.debounce(function () {
    window.card.close();
    window.pin.remove();
    window.pin.show(getFilteredAds());
  });

  // Обработчик события изменения значения фильтра типа жилья
  window.domRef.filterForm.addEventListener('change', onFilterChange);

  window.filter = {
    deactivate: deactivateFilters,
    activate: activateFilters,
    update: getFilteredAds,
  };
})();
