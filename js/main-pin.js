'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32,
  };

  var mainPin = window.domRef.map.querySelector('.map__pin--main');

  // Функция вычисления координат главной метки
  var getMainPinCoords = function (height) {
    return {
      x: mainPin.offsetLeft + MainPinSize.RADIUS,
      y: mainPin.offsetTop + height
    };
  };

  window.mainPins = {
    mainPin: mainPin,
    mainPinSize: MainPinSize,
    getMainPinCoords: getMainPinCoords,
  };
})();
