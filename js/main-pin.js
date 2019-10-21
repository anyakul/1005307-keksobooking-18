'use strict';

(function () {
  var MainPinRect = {
    LEFT: window.const.MapRect.LEFT - window.const.MainPinSize.RADIUS,
    RIGHT: window.const.MapRect.RIGHT - window.const.MainPinSize.RADIUS,
    TOP: window.const.MapRect.TOP - window.const.MainPinSize.HEIGHT,
    BOTTOM: window.const.MapRect.BOTTOM - window.const.MainPinSize.HEIGHT,
  };

  var mainPin = window.domRef.map.querySelector('.map__pin--main');

  var address = window.domRef.adForm.querySelector('#address');

  var initialCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  // Функция вычисления координат главной метки
  var getMainPinCoords = function (height) {
    return {
      x: mainPin.offsetLeft + window.const.MainPinSize.RADIUS,
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

  // Функция заполнения поля адреса по местоположению главной метки на карте
  var renderAddressInput = function (coords) {
    address.value = coords.x + ', ' + coords.y;
  };

  // Функция связанная с главной меткой вызывающаяся при деактивации страницы
  var renderDeactivation = function () {
    setPinStartPosition();
    renderAddressInput(getMainPinCoords(window.const.MainPinSize.RADIUS));
  };

  // Функция связанная с главной меткой вызывающаяся при активации страницы
  var renderActivation = function () {
    renderAddressInput(getMainPinCoords(window.const.MainPinSize.HEIGHT));
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
      renderActivation();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      renderActivation();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  });

  window.mainPin = {
    pin: mainPin,
    renderActivation: renderActivation,
    renderDeactivation: renderDeactivation,
  };
})();
