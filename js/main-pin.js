'use strict';

(function () {
  var MapRect = {
    LEFT: 0,
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
      y: mainPin.offsetTop + height,
    };
  };

  // Функция изменения положения главной метки
  var renderMainPinPos = function (coords) {
    mainPin.style.left = coords.x + 'px';
    mainPin.style.top = coords.y + 'px';
  };

  var addMainPinListeners = function () {
    mainPin.addEventListener('keydown', onMainPinEnterPress);
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  var removeMainPinListeners = function () {
    mainPin.removeEventListener('keydown', onMainPinEnterPress);
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
  };

  var resetMainPin = function () {
    renderMainPinPos(initialCoords);
    addMainPinListeners();
    window.mainPin.onReset(getMainPinCoords(MainPinSize.RADIUS));
  };

  var initFirstClick = function () {
    removeMainPinListeners();
    window.mainPin.onReset(getMainPinCoords(MainPinSize.HEIGHT));
    window.mainPin.onFirstClick();
  };

  var onMainPinMouseDown = function () {
    initFirstClick();
  };

  var onMainPinEnterPress = function (evt) {
    if (window.util.isEnterKey(evt)) {
      initFirstClick();
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

    window.mainPin.onMove(getMainPinCoords(MainPinSize.HEIGHT));

    var onMouseMove = function (moveEvt) {
      var x = startCoords.x + moveEvt.clientX - evt.clientX;
      var y = startCoords.y + moveEvt.clientY - evt.clientY;

      renderMainPinPos(getMainPinOffset(x, y));
      window.mainPin.onMove(getMainPinCoords(MainPinSize.HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, {once: true});
  });

  window.mainPin = {
    reset: resetMainPin,
    onFirstClick: window.util.noop,
    onReset: window.util.noop,
    onMove: window.util.noop,
  };
})();
