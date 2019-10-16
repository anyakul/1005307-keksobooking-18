'use strict';

(function () {
  var PinSize = {
    WIDTH: 70,
    HEIGHT: 50,
    RADIUS: 25,
  };

  // Функция для создания по шаблону будуших DOM-элементов, соответствующих меткам на карте
  var renderPin = function (ad) {
    var pin = window.domRef.pinsTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pinImg.src = ad.avatar;
    pin.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';
    pin.dataset.id = ad.id;

    return pin;
  };

  // Функция внеcения изменений в DOM - отметки на карте
  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });
    window.domRef.mapPins.appendChild(fragment);
  };

  // Функция удаления пинов
  var removePins = function () {
    var pins = window.domRef.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      pins.forEach(window.util.removeElement);
    }
  };

  window.pin = {
    render: renderPins,
    remove: removePins,
  };
})();
