'use strict';

(function () {
  var util = window.util;

  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  var normalizeAds = function (ad, idx) {
    ad.id = idx;
    return ad;
  };

  // Функция для создания по шаблону будуших DOM-элементов, соответствующих меткам на карте
  var renderPin = function (ad) {
    var pin = util.pinsTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');

    pinImg.src = ad.avatar;
    pin.style.left = (ad.location.x - util.PinSize.RADIUS) + 'px';
    pin.style.top = (ad.location.y - util.PinSize.HEIGHT) + 'px';
    pin.dataset.id = ad.id;

    return pin;
  };

  // функция генерации строковых id
  var getAdIds = function (num) {
    return Array(num).fill(null).map(function (_, index) {
      index += 1;
      return index < 10 ? '0' + index : String(index);
    });
  };

  // функция генерации объявлений
  var generateAds = function (num) {
    return getAdIds(num).map(util.makeAd);
  };

  window.ads = generateAds(util.USER_COUNT).map(normalizeAds);

  // Функция внеcения изменений в DOM - отметки на карте
  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });
    util.mapPins.appendChild(fragment);
  };

  // Функция удаления атрибута disabled всем элементам формы в активном состоянии
  var activateFields = function () {
    util.adFields.forEach(unsetDisabled);
    util.filterFields.forEach(unsetDisabled);
  };

  // Функция добавления атрибута disabled всем элементам формы в неактивном состоянии
  var deactivateFields = function () {
    util.adFields.forEach(setDisabled);
    util.filterFields.forEach(setDisabled);
  };

  // Функция вычисления координат главной метки
  var getMainPinCoords = function (height) {
    return {
      x: util.mainPin.offsetLeft + util.MainPinSize.RADIUS,
      y: util.mainPin.offsetTop + height
    };
  };

  // Функция заполнения поля адреса по местоположению главной метки на карте
  var renderAddressInput = function (coords) {
    util.address.value = coords.x + ', ' + coords.y;
  };

  window.card.closeCard = function () {
    var pinPopup = document.querySelector('.map__card');
    if (util.map.contains(pinPopup)) {
      util.map.removeChild(pinPopup);
    }
  };

  // Функция удаления элемента
  var removeElement = function (element) {
    element.remove();
  };

  // Функция удаления пинов
  var removePins = function () {
    var pins = util.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins !== null) {
      pins.forEach(removeElement);
    }
  };

  // Функция переключения страницы с неактивного режима на активный
  var activatePage = function () {
    util.map.classList.remove('map--faded');
    util.adForm.classList.remove('ad-form--disabled');
    renderPins(window.ads);
    activateFields();
    util.mapPins.addEventListener('click', window.card.onPinShowCard);
    renderAddressInput(getMainPinCoords(util.MainPinSize.HEIGHT));
    util.mainPin.removeEventListener('keydown', onMainPinEnterPress);
    util.mainPin.removeEventListener('mousedown', onMainPinMouseDown);
  };

  // Функция переключения страницы с активного режима на неактивный
  var deactivatePage = function () {
    util.map.classList.add('map--faded');
    util.adForm.classList.add('ad-form--disabled');
    util.mapPins.removeEventListener('click', window.card.onPinShowCard);
    removePins();
    window.card.closeCard();
    deactivateFields();
    util.adForm.reset();
    util.filterForm.reset();
    renderAddressInput(getMainPinCoords(util.MainPinSize.RADIUS));
    util.mainPin.addEventListener('keydown', onMainPinEnterPress);
    util.mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  // Функция активации страницы по нажатию кнопки мышки на главную метку
  var onMainPinMouseDown = function () {
    activatePage();
  };

  // Функция активации страницы по нажатию клавиши enter на главную метку
  var onMainPinEnterPress = function (evt) {
    if (util.isEnterKey(evt)) {
      activatePage();
    }
  };

  // Функция деактивации страницы при нажатии на кнопку очистить
  var onFormResetClick = function () {
    deactivatePage();
  };

  // Обработчик события загрузка страницы
  document.addEventListener('DOMContentLoaded', activatePage);

  // Обработчик события переключения страницы с неактивного режима на активный при помощи мышки
  util.mainPin.addEventListener('mousedown', onMainPinMouseDown);

  // Обработчик события переключения страницы с неактивного режима на активный при помощи клавиатуры
  util.mainPin.addEventListener('keydown', onMainPinEnterPress);

  // Обработчик события переключения страницы с активного режима на неактивный при сбросе формы
  util.adFormReset.addEventListener('click', onFormResetClick);

})();
