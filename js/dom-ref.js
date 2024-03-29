'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var messageToTemplate = {
    error: document.querySelector('#error').content.querySelector('.error'),
    success: document.querySelector('#success').content.querySelector('.success'),
  };

  window.domRef = {
    map: map,
    mapPins: mapPins,
    pinTemplate: pinTemplate,
    cardTemplate: cardTemplate,
    messageToTemplate: messageToTemplate,
  };
})();
