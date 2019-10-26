'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filterForm = map.querySelector('.map__filters');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');

  window.domRef = {
    map: map,
    mapPins: mapPins,
    filterForm: filterForm,
    adForm: adForm,
  };
})();
