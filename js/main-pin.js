'use strict';

(function () {
  var MainPinRect = {
    LEFT: window.const.MapRect.LEFT - window.const.MainPinSize.RADIUS,
    RIGHT: window.const.MapRect.RIGHT - window.const.MainPinSize.RADIUS,
    TOP: window.const.MapRect.TOP - window.const.MainPinSize.HEIGHT,
    BOTTOM: window.const.MapRect.BOTTOM - window.const.MainPinSize.HEIGHT,
  };

  var mainPin = window.domRef.map.querySelector('.map__pin--main');

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

  var resetPin = function () {
    renderMainPinPos(initialCoords);
    mainPin.addEventListener('keydown', onMainPinEnterPress);
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    window.mainPin.onReset(getMainPinCoords(window.const.MainPinSize.RADIUS));
  };

  var onMainPinMouseDown = function () {
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    window.mainPin.onFirstClick();
  };

  var onMainPinEnterPress = function (evt) {
    if (window.util.isEnterKey(evt)) {
      window.mainPin.onFirstClick();
    }
  };

  // Функция получения координат главной метки
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

    window.mainPin.onMove(getMainPinCoords(window.const.MainPinSize.HEIGHT));

    var onMouseMove = function (moveEvt) {
      var x = startCoords.x + moveEvt.clientX - evt.clientX;
      var y = startCoords.y + moveEvt.clientY - evt.clientY;

      renderMainPinPos(getMainPinOffset(x, y));
      window.mainPin.onMove(getMainPinCoords(window.const.MainPinSize.HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  });

  window.mainPin = {
    reset: resetPin,
    onFirstClick: window.util.noop,
    onReset: window.util.noop,
    onMove: window.util.noop,
  };
})();
