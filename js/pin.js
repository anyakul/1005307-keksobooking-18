'use strict';

(function () {
  var PinSize = {
    WIDTH: 70,
    HEIGHT: 50,
    RADIUS: 25,
  };

  // Функция для создания по шаблону будуших DOM-элементов, соответствующих меткам на карте
  var renderPin = function (ad) {
    var pin = window.domRef.pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.src = ad.author.avatar;
    pinImage.alt = ad.offer.title;
    pin.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';
    pin.dataset.id = ad.id;

    return pin;
  };

  // Функция показа пинов на карте
  var showPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });
    window.domRef.mapPins.appendChild(fragment);
  };

  var normalizeAds = function (ad, idx) {
    ad.id = idx;
    return ad;
  };

  // Функция загрузки пинов с сервера
  var onDataLoad = function (ads) {
    if (ads.length > 0) {
      window.page.ads = ads.map(normalizeAds);
      window.filter.update();
      window.filter.activate();
    }
  };

  // Функция удаления пинов
  var removePins = function () {
    var pins = window.domRef.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      pins.forEach(window.util.removeElement);
    }
  };

  // Функция обработчика показа ошибки сервера
  var onDataLoadError = function (errorMessage) {
    window.message.showError(errorMessage);
  };

  // Отображение пинов объявлений на карте с использованием данных с сервера
  var loadPins = function () {
    window.backend.load(onDataLoad, onDataLoadError);
  };

  window.pin = {
    show: showPins,
    remove: removePins,
    load: loadPins,
  };
})();
