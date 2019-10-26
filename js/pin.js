'use strict';

(function () {

  // Функция для создания по шаблону будуших DOM-элементов, соответствующих меткам на карте
  var renderPin = function (ad) {
    var pin = window.domRef.pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pinImg.src = ad.author.avatar;
    pin.style.left = (ad.location.x - window.const.PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - window.const.PinSize.HEIGHT) + 'px';
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

      showPins(window.page.ads);
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
    window.domRef.messageTemplate.error.querySelector('.error__message').textContent = errorMessage;
    window.message.showError();
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
