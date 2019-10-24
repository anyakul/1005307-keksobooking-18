'use strict';

(function () {
  var errorBlock = null;

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

  // Функция внеcения изменений в DOM - отметки на карте
  var showPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });
    window.domRef.mapPins.appendChild(fragment);
  };

  // Функция закрытия блока с сообщением об ошибке
  var removeErrorBlock = function () {
    errorBlock.remove();
    errorBlock = null;
    document.removeEventListener('mousedown', onDocumentClick);
    document.removeEventListener('keydown', onEscPress);
  };

  // Функция обработчика события закрытия блока с сообщением об ошибке при нажатии кнопки мыши
  var onDocumentClick = function () {
    removeErrorBlock();
  };

  // Функция обработчика события закрытия блока с сообщением об ошибке при нажатии кнопки esc
  var onEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      removeErrorBlock();
    }
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

  // Функция показа сообщения об ошибке
  var onDataLoadError = function (errorMessage) {
    errorBlock = window.domRef.errorTemplate.cloneNode(true);
    window.domRef.map.appendChild(errorBlock);
    errorBlock.querySelector('.error__message').textContent = errorMessage;
    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onEscPress);
  };

  // Функция удаления пинов
  var removePins = function () {
    var pins = window.domRef.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      pins.forEach(window.util.removeElement);
    }
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
