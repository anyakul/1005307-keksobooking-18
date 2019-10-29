'use strict';

(function () {
  var PIN_COUNT = 5;
  var filterFields = window.domRef.filterForm.querySelectorAll('.map__filter, .map__checkbox');
  var housingType = window.domRef.filterForm.querySelector('#housing-type');
  var housingPrice = window.domRef.filterForm.querySelector('#housing-price');
  var housingRooms = window.domRef.filterForm.querySelector('#housing-rooms');
  var housingGuests = window.domRef.filterForm.querySelector('#housing-guests');
  var housingFeatures = window.domRef.filterForm.querySelector('#housing-features');

  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  // Функция деактивации фильтров
  var deactivateFilters = function () {
    filterFields.forEach(window.util.setDisabled);
  };

  // Функция активации фильтров
  var activateFilters = function () {
    filterFields.forEach(window.util.unsetDisabled);
  };

  // Функция фильтрации по типу жилья
  var filterHousingType = function (ad) {
    return housingType.value === 'any' || ad.offer.type === housingType.value;
  };

  // Функция фильтра по цене жилья
  var filterHousingPrice = function (ad) {
    var isСhoosePrice;
    switch (housingPrice.value) {
      case 'middle':
        isСhoosePrice = (ad >= Price.MIN) && (ad <= Price.MAX);
        break;
      case 'low':
        isСhoosePrice = (ad < Price.MIN);
        break;
      case 'high':
        isСhoosePrice = (ad > Price.MAX);
        break;
      default:
        isСhoosePrice = true;
    }
    return isСhoosePrice;
  };

  // Функция фильтра по количеству комнат
  var filterHousingRooms = function (ad) {
    return housingRooms.value === 'any' || ad.offer.rooms === parseInt(housingRooms.value, 10);
  };

  // Функция фильтра по количеству гостей
  var filterHousingGuests = function (ad) {
    return housingGuests.value === 'any' || ad.offer.guests === parseInt(housingGuests.value, 10);
  };

  // Функция фильтра по наличию удобств
  var filterHousingFeatures = function (ad) {
    return Array.from(housingFeatures.children)
      .filter(function (feature) {
        return feature.checked === true;
      })
      .map(function (feature) {
        return feature.value;
      })
      .every(function (feature) {
        return ad.offer.features.indexOf(feature) !== -1;
      });
  };

  // Функция коллбэк фильтрации элементов массива
  var filterAds = function (ad) {
    return filterHousingType(ad) &&
    filterHousingPrice(ad.offer.price) &&
    filterHousingRooms(ad) &&
    filterHousingGuests(ad) &&
    filterHousingFeatures(ad);
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
