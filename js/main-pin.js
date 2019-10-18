'use strict';

(function () {
  var MapRect = {
    LEFT: 1,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630,
  };

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32,
  };

  var MainPinRect = {
    LEFT: MapRect.LEFT - MainPinSize.RADIUS,
    RIGHT: MapRect.RIGHT - MainPinSize.RADIUS,
    TOP: MapRect.TOP - MainPinSize.HEIGHT,
    BOTTOM: MapRect.BOTTOM - MainPinSize.HEIGHT,
  };

  var mainPin = window.domRef.map.querySelector('.map__pin--main');

  var initialCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  // Функция вычисления координат главной метки
  var getMainPinCoords = function (height) {
    return {
      x: mainPin.offsetLeft + MainPinSize.RADIUS,
      y: mainPin.offsetTop + height
    };
  };

  // Функция изменения положения главной метки
  var renderMainPinPos = function (coords) {
    mainPin.style.left = coords.x + 'px';
    mainPin.style.top = coords.y + 'px';
  };

  // Функция становки главного пина на старотвую позицию при деактивации страницы
  var setPinStartPosition = function () {
    renderMainPinPos(initialCoords);
  };

  var getMainPinOffset = function (x, y) {
    return {
      x: Math.min(Math.max(x, MainPinRect.LEFT), MainPinRect.RIGHT),
      y: Math.min(Math.max(y, MainPinRect.TOP), MainPinRect.BOTTOM),
    };
  };

  // функция вычисления координат главной метки после ее передвижения
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop,
    };

    var onMouseMove = function (moveEvt) {
      var x = startCoords.x + moveEvt.clientX - evt.clientX;
      var y = startCoords.y + moveEvt.clientY - evt.clientY;

      renderMainPinPos(getMainPinOffset(x, y));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.adForm.renderAddressInput(getMainPinCoords(MainPinSize.HEIGHT));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  });

  window.mainPin = {
    MainPinSize: MainPinSize,
    pin: mainPin,
    initialCoords: initialCoords,
    setStartPosition: setPinStartPosition,
    getMainPinCoords: getMainPinCoords,
  };
})();
