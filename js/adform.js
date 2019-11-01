'use strict';

(function () {
  var PREVIEW_IMG = 'img/muffin-grey.svg';

  var adForm = document.querySelector('.ad-form');

  var adFields = adForm.querySelectorAll('fieldset');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var fileChooserAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = adForm.querySelector('.ad-form-header__preview img');
  var titleInput = adForm.querySelector('#title');
  var address = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var guestNumber = adForm.querySelector('#capacity');
  var priceInput = adForm.querySelector('#price');
  var timeField = adForm.querySelector('.ad-form__element--time');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  var typeSelect = adForm.querySelector('#type');
  var fileChooserPhotoHouse = adForm.querySelector('.ad-form__upload input[type=file]');
  var previewPhotoHouse = adForm.querySelector('.ad-form__photo');

  var offerTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  // Функция активации формы отправки объявления
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFields.forEach(window.util.unsetDisabled);
  };

  // Функция деактивации формы отправки объявления
  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
    adFields.forEach(window.util.setDisabled);
    adForm.reset();
    resetPictures();
  };

  // Функция заполнения поля адреса по местоположению главной метки на карте
  var renderAddressInput = function (coords) {
    address.value = coords.x + ', ' + coords.y;
  };

  // Функция проверки заголовка требованиям
  var validateTitle = function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Длина заголовка должна быть не меньше 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Длина заголовка должна быть не больше 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Пожалуйста, введите заголовок');
    } else {
      titleInput.setCustomValidity('');
    }
  };

  // Функция установки типа жилья и минимальной цены за ночь
  var getOfferMinPrice = function () {
    return offerTypeToMinPrice[typeSelect.value];
  };

  // Функция расстановки правильных плейсхолдеров и минимальной цены за сутки в зависимости от типа жилья
  var setOfferPrice = function (price) {
    priceInput.min = price;
    priceInput.placeholder = price;
  };

  // Функция проверки соответствия количества гостей и количества комнат.
  var validateRoomAndGuest = function () {
    var rooms = +roomNumber.value;
    var guests = +guestNumber.value;

    if (rooms === 1 && rooms !== guests) {
      guestNumber.setCustomValidity('В однокомнатную квартиру разместить можно только 1 гостя');
    } else if (rooms === 2 && (guests === 0 || guests > rooms)) {
      guestNumber.setCustomValidity('В 2х комнатную квартиру разместить можно только 1 или 2х гостей');
    } else if (rooms === 3 && guests === 0) {
      guestNumber.setCustomValidity('В 3х комнатную квартиру разместить можно только 1, 2х или 3х гостей');
    } else if (rooms === 100 && guests !== 0) {
      guestNumber.setCustomValidity('В 100 комнатной квартире резмещать гостей нельзя');
    } else {
      guestNumber.setCustomValidity('');
    }
  };

  // Функция сброса изображений
  var resetPictures = function () {
    previewAvatar.src = PREVIEW_IMG;
    window.fileInput.remove(previewPhotoHouse);
  };

  // Функции расстановки соответствия времени заезда и времени выезда
  var syncTime = function (time) {
    timeInSelect.value = time;
    timeOutSelect.value = time;
  };

  var onTimeChange = function (evt) {
    syncTime(evt.target.value);
  };

  timeField.addEventListener('change', onTimeChange);

  // Обработчик события загрузки аватара
  fileChooserAvatar.addEventListener('change', function () {
    window.fileInput.add(fileChooserAvatar, true, previewAvatar);
  });

  // Обработчик события загрузки фото жилья
  fileChooserPhotoHouse.addEventListener('change', function () {
    window.fileInput.add(fileChooserPhotoHouse, false, previewPhotoHouse);
  });

  // Обработчик события проверки соответствия заголовка требованиям
  titleInput.addEventListener('blur', function () {
    validateTitle();
  });

  // Обработчик события установки плейсхолдеров и минимальной цены
  typeSelect.addEventListener('change', function (evt) {
    setOfferPrice(getOfferMinPrice(evt.target.value));
  });

  guestNumber.addEventListener('change', function () {
    validateRoomAndGuest();
  });

  // Обработчик события проверки соответствия количества комнат и гостей
  roomNumber.addEventListener('change', function () {
    validateRoomAndGuest();
  });

  // функция успешной отправки формы
  var onDataSaveSuccess = function () {
    window.message.showSuccess();
    window.page.deactivate();
  };

  // Функция обработчика показа ошибки сервера
  var onDataSaveError = function () {
    window.message.showError();
  };

  // Функция добавления нового пина при отправке формы из формы
  var onSendForm = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onDataSaveSuccess, onDataSaveError);
  };

  // Функция обработчика события нажатие на кнопку очистить
  var onFormResetClick = function () {
    window.page.deactivate();
  };

  // Обработчик события отправки формы
  adForm.addEventListener('submit', onSendForm);

  // Обработчик события переключения страницы с активного режима на неактивный при сбросе формы
  adFormReset.addEventListener('click', onFormResetClick);

  window.mainPin.onReset = function (coords) {
    renderAddressInput(coords);
  };

  window.mainPin.onMove = function (coords) {
    renderAddressInput(coords);
  };

  window.adForm = {
    activate: activateForm,
    deactivate: deactivateForm,
  };
})();
