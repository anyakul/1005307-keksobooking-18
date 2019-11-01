'use strict';

(function () {
  var PIN_COUNT = 5;
  var HousePrice = {
    MIN: 10000,
    MAX: 50000,
  };

  var filterForm = window.domRef.map.querySelector('.map__filters');
  var filterFields = filterForm.querySelectorAll('.map__filter, .map__checkbox');
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var housingFeatures = filterForm.querySelector('#housing-features');
  var checkedFeatures = housingFeatures.querySelectorAll('input[type=checkbox]:checked');

  var priceToFilter = {
    low: function (price) {
      return price < HousePrice.MIN;
    },
    middle: function (price) {
      return price >= HousePrice.MIN && price <= HousePrice.MAX;
    },
    high: function (price) {
      return price >= HousePrice.MAX;
    },
  };

  // Функция деактивации фильтров
  var deactivateFilters = function () {
    filterFields.forEach(window.util.setDisabled);
    filterForm.reset();
  };

  // Функция активации фильтров
  var activateFilters = function () {
    filterFields.forEach(window.util.unsetDisabled);
  };

  // Функция фильтрации по типу жилья
  var filterHousingType = function (ad) {
    return housingType.value === 'any'
      || housingType.value === ad.offer.type;
  };

  // Функция фильтра по цене жилья
  var filterHousingPrice = function (ad) {
    return housingPrice.value === 'any'
      || priceToFilter[housingPrice.value](ad.offer.price);
  };

  // Функция фильтра по количеству комнат
  var filterHousingRooms = function (ad) {
    return housingRooms.value === 'any'
      || +housingRooms.value === ad.offer.rooms;
  };

  // Функция фильтра по количеству гостей
  var filterHousingGuests = function (ad) {
    return housingGuests.value === 'any'
      || +housingGuests.value === ad.offer.guests;
  };

  // Функция фильтра по наличию удобств
  var filterEvery = Array.prototype.every;

  var filterHousingFeatures = function (ad) {
    return filterEvery.call(checkedFeatures, function (feature) {
      return ad.offer.features.indexOf(feature.value) > -1;
    });
  };

  // Функция коллбэк фильтрации элементов массива
  var filterAd = function (ad) {
    return filterHousingType(ad)
      && filterHousingPrice(ad)
      && filterHousingRooms(ad)
      && filterHousingGuests(ad)
      && filterHousingFeatures(ad);
  };

  // Функция фильтрации элементов массива
  var getFilteredAds = function () {
    checkedFeatures = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
    return window.page.ads
      .filter(filterAd)
      .slice(0, PIN_COUNT);
  };

  var updateFilter = function () {
    window.pin.remove();
    window.pin.show(getFilteredAds());
  };

  var onFilterChange = function () {
    window.card.close();
    updateFilter();
  };

  var onDebouncedFilterChange = window.debounce(onFilterChange);

  // Обработчик события изменения значения фильтров
  filterForm.addEventListener('change', onDebouncedFilterChange);

  window.filter = {
    deactivate: deactivateFilters,
    activate: activateFilters,
    update: updateFilter,
  };
})();
