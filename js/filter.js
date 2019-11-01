'use strict';

(function () {
  var PIN_COUNT = 5;
  var HousePrice  = {
    MIN: 10000,
    MAX: 50000
  };

  var filterFields = window.domRef.filterForm.querySelectorAll('.map__filter, .map__checkbox');
  var housingType = window.domRef.filterForm.querySelector('#housing-type');
  var housingPrice = window.domRef.filterForm.querySelector('#housing-price');
  var housingRooms = window.domRef.filterForm.querySelector('#housing-rooms');
  var housingGuests = window.domRef.filterForm.querySelector('#housing-guests');
  var housingFeatures = window.domRef.filterForm.querySelector('#housing-features');


  var priceToValue = {
    low: function (price) {
      return price < HousePrice.MIN;
    },
    middle: function (price) { 
      return price >= HousePrice.MIN && 
      price <= HousePrice.MAX; 
    },
    high: function (price) { 
      return price > HousePrice.MAX; 
    },
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
    return housingType.value === 'any' || 
    housingType.value === ad.offer.type;
  };

  // Функция фильтра по цене жилья
  var filterHousingPrice = function (ad) {
    return housingPrice.value === 'any' || 
    priceToValue[housingPrice.value](ad.offer.price);
  };

  // Функция фильтра по количеству комнат
  var filterHousingRooms = function (ad) {
    return housingRooms.value === 'any' || 
    +housingRooms.value === ad.offer.rooms;
  };

  // Функция фильтра по количеству гостей
  var filterHousingGuests = function (ad) {
    return housingGuests.value === 'any' || 
    +housingGuests.value === ad.offer.guests;
  };
  
  var checkedFeatures = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
  var filterEvery = Array.prototype.every;

  var filterHousingFeatures = function (ad) {
    return filterEvery.call(checkedFeatures, function (feature) {
      return ad.offer.features.indexOf(feature) !== -1;
    });
  };

  // Функция коллбэк фильтрации элементов массива
  var filterAds = function (ad) {
    return filterHousingType(ad) &&
    filterHousingPrice(ad) &&
    filterHousingRooms(ad) &&
    filterHousingGuests(ad) &&
    filterHousingFeatures(ad);
  };

  // Функция фильтрации элементов массива
  var getFilteredAds = function () {
    checkedFeatures = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
    return window.page.ads
    .filter(filterAds)
    .slice(0, PIN_COUNT);
  };

  // Обработчик, закрывает объявления, убирает пины и создает новые на основе требований фильтра
  var onFilterChange = window.debounce(function (ad) {
    window.card.close();
    window.pin.remove();
    window.pin.show(getFilteredAds(ad));
  });

  // Обработчик события изменения значения фильтров
  window.domRef.filterForm.addEventListener('change', onFilterChange);

  window.filter = {
    deactivate: deactivateFilters,
    activate: activateFilters,
    update: getFilteredAds,
  };
})();
