'use strict';

(function () {
  var offerTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var adFields = window.domRef.adForm.querySelectorAll('fieldset');
  var adFormReset = window.domRef.adForm.querySelector('.ad-form__reset');
  var titleInput = window.domRef.adForm.querySelector('#title');
  var address = window.domRef.adForm.querySelector('#address');
  var roomNumber = window.domRef.adForm.querySelector('#room_number');
  var guestNumber = window.domRef.adForm.querySelector('#capacity');
  var priceInput = window.domRef.adForm.querySelector('#price');
  var timeInSelect = window.domRef.adForm.querySelector('#timein');
  var timeOutSelect = window.domRef.adForm.querySelector('#timeout');
  var typeSelect = window.domRef.adForm.querySelector('#type');

  // Функция активации формы отправки объявления
  var activateForm = function () {
    adFields.forEach(window.util.unsetDisabled);
  };

  // Функция деактивации формы отправки объявления
  var deactivateForm = function () {
    adFields.forEach(window.util.setDisabled);
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

  // Функция установки установки типа жилья и минимальной цены за ночь
  var getOfferMinPrice = function () {
    return offerTypeToMinPrice[typeSelect.value];
  };

  // Функция расстановки правильных плейсхолдеров и минимальной цены за сутки в зависимости от типа жилья
  var setOfferPrice = function (price) {
    priceInput.min = price;
    priceInput.placeholder = price;
  };

  // Функции расстановки соответствия времени заезда и времени выезда
  var setTimeOutInput = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  var setTimeInInput = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  // Функция проверки соответствия количества гостей и количества комнат.
  var validateRoomAndGuest = function () {
    if (roomNumber.value === '1' && guestNumber.value !== roomNumber.value) {
      guestNumber.setCustomValidity('В однокомнатную квартиру разместить можно только 1 гостя');
    } else if (roomNumber.value === '2' && (guestNumber.value === '0' || guestNumber.value > roomNumber.value)) {
      guestNumber.setCustomValidity('В 2х комнатную квартиру разместить можно только 1 или 2х гостей');
    } else if (roomNumber.value === '3' && guestNumber.value === '0') {
      guestNumber.setCustomValidity('В 3х комнатную квартиру разместить можно только 1, 2х или 3х гостей');
    } else if (roomNumber.value === '100' && !(guestNumber.value === '0')) {
      guestNumber.setCustomValidity('В 100 комнатной квартире резмещать гостей нельзя');
    } else {
      guestNumber.setCustomValidity('');
    }
  };

  // Обработчик события проверки соответствия заголовка требованиям
  titleInput.addEventListener('blur', function () {
    validateTitle();
  });

  // Обработчик события установки плейсхолдеров и минимальной цены
  typeSelect.addEventListener('change', function (evt) {
    setOfferPrice(getOfferMinPrice(evt.target.value));
  });

  // Обработчик события установки соответствия времени заезда и выезда
  timeInSelect.addEventListener('change', function () {
    setTimeInInput();
  });

  timeOutSelect.addEventListener('change', function () {
    setTimeOutInput();
  });

  // Обработчик события проверки соответствия количества комнат и гостей
  roomNumber.addEventListener('change', function () {
    validateRoomAndGuest();
  });

  // функция успешной отправки формы
  var onDataSaveSuccess = function () {
    window.message.showSuccess();
  };

  // Функция обработчика показа ошибки сервера
  var onDataSaveError = function (errorMessage) {
    window.domRef.messageTemplate.error.querySelector('.error__message').textContent = errorMessage;
    window.message.showError();
  };

  // Функция добавления нового пина при отправке формы из формы
  var sendForm = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.domRef.adForm), onDataSaveSuccess, onDataSaveError);
  };
  
  var onSendForm = function (evt) {
    sendForm(evt);
    window.page.deactivate();
  };

  // Обработчик события отправки формы
  window.domRef.adForm.addEventListener('submit', onSendForm);

  window.adForm = {
    reset: adFormReset,
    activate: activateForm,
    deactivate: deactivateForm,
    address: address,
  };
})();
