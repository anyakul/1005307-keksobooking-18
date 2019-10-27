'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filterForm = map.querySelector('.map__filters');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var messageTemplate = {
    error: document.querySelector('#error').content.querySelector('.error'),
    success: document.querySelector('#success').content.querySelector('.success'),
  };

  window.domRef = {
    map: map,
    mapPins: mapPins,
    filterForm: filterForm,
    adForm: adForm,
    pinTemplate: pinTemplate,
    cardTemplate: cardTemplate,
    messageTemplate: messageTemplate,
  };
})();
