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

  // Функция внеcения изменений в DOM - отметки на карте
  var showPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });
    window.domRef.mapPins.appendChild(fragment);
  };

  var onCloseError = function () {
    window.util.removeElement(window.domRef.errorTemplate);
  };

  // функция показа ошибки
  var onError = function () {
    window.domRef.map.appendChild(window.domRef.errorTemplate);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onCloseError);
    document.addEventListener('keydown', function (evt) {
      if (window.util.isEscKey(evt)) {
        onCloseError();
      }
    });
    document.addEventListener('click', function (evt) {
      var errorMassage = evt.target.closest('.error__message');
      if (errorMassage === null) {
        onCloseError();
      }
    });
  };

  // Функция удаления пинов
  var removePins = function () {
    var pins = window.domRef.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      pins.forEach(window.util.removeElement);
    }
  };

  var onDataLoad = function (ads) {
    if (ads.length > 0) {
      showPins(ads);
    }
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
