'use strict';

(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32,
  };

  var StartCoordinates = {
    x: 570,
    y: 375
  };

  var mainPin = window.domRef.map.querySelector('.map__pin--main');

  // Функция вычисления координат главной метки
  var getMainPinCoords = function (height) {
    return {
      x: mainPin.offsetLeft + MainPinSize.RADIUS,
      y: mainPin.offsetTop + height
    };
  };

  // Установка главного пина на старотвую позицию при деактивации страницы
  var setPinStartPosition = function () {
    mainPin.style.left = StartCoordinates.x + 'px';
    mainPin.style.top = StartCoordinates.y + 'px';
  };

  // функция вычисления координат главной метки после ее передвижения
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var MAP_MIN_X = window.data.MapRect.LEFT - MainPinSize.RADIUS;
      var MAP_MAX_X = window.data.MapRect.RIGHT - MainPinSize.RADIUS;
      var MAP_MIN_Y = window.data.MapRect.TOP - MainPinSize.RADIUS;
      var MAP_MAX_Y = window.data.MapRect.BOTTOM - MainPinSize.RADIUS;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offsetCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (offsetCoords.x < MAP_MIN_X) {
        offsetCoords.x = MAP_MIN_X;
      } else if (offsetCoords.x > MAP_MAX_X) {
        offsetCoords.x = MAP_MAX_X;
      } else if (offsetCoords.y < MAP_MIN_Y) {
        offsetCoords.y = MAP_MIN_Y;
      } else if (offsetCoords.y > MAP_MAX_Y) {
        offsetCoords.y = MAP_MAX_Y;
      }

      mainPin.style.top = offsetCoords.y + 'px';
      mainPin.style.left = offsetCoords.x + 'px';
      window.adForm.renderAddressInput(getMainPinCoords(MainPinSize.HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.adForm.renderAddressInput(getMainPinCoords(MainPinSize.HEIGHT));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPins = {
    mainPin: mainPin,
    mainPinSize: MainPinSize,
    getMainPinCoords: getMainPinCoords,
    setPinStartPosition: setPinStartPosition,
  };
})();
