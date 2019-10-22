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

  //функция закрытия блока с сообщением об ошибке
  var removeErrorBlock = function () {
    errorBlock.remove();
    window.filter.deactivate();
    document.removeEventListener('click', onClickDocument);
    document.removeEventListener('keydown', onPushEsc);
  };

  // Функция обработчика события закрытия блока с сообщением об ошибке при нажатии кнопки мыши
  var onClickDocument = function () {
    removeErrorBlock();
  };

  // Функция обработчика события закрытия блока с сообщением об ошибке при нажатии кнопки esc
  var onPushEsc = function () {
    if (window.util.isEscKey) {
      removeErrorBlock();
    }
  };

  // функция показа сообщения об ошибке
  var onError = function () {
    window.domRef.errorTemplate.cloneNode(true);
    errorBlock = window.domRef.map.appendChild(window.domRef.errorTemplate);
    document.addEventListener('mousedown', onClickDocument);
    document.addEventListener('keydown', onPushEsc);
  };

  // Функция удаления пинов
  var removePins = function () {
    var pins = window.domRef.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      pins.forEach(window.util.removeElement);
    }
  };

  // Функция загрузки пинов с сервера
  var onDataLoad = function (ads) {
    if (ads.length > 0) {
      showPins(ads);
    }
    window.filter.activate();
  };

  // Отображение пинов объявлений на карте с использованием данных с сервера
  var loadPins = function () {
    window.backend.load(onDataLoad, onError);
  };

  window.pin = {
    show: showPins,
    remove: removePins,
    load: loadPins,
  };
})();
