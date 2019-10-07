'use strict';

(function () {
  var util = window.util;

  // Функция проверки заголовка требованиям
  var validateTitle = function () {
    if (util.titleInput.validity.tooShort) {
      util.titleInput.setCustomValidity('Длина заголовка должна быть не меньше 30 символов');
    } else if (util.titleInput.validity.tooLong) {
      util.titleInput.setCustomValidity('Длина заголовка должна быть не больше 100 символов');
    } else if (util.titleInput.validity.valueMissing) {
      util.titleInput.setCustomValidity('Пожалуйста, введите заголовок');
    } else {
      util.titleInput.setCustomValidity('');
    }
  };

  // Функция установки установки типа жилья и минимальной цены за ночь
  var getOfferMinPrice = function () {
    return util.offerTypeToMinPrice[util.typeSelect.value];
  };

  // Функция расстановки правильных плейсхолдеров, максимальной цены, и минимальной цены за сутки в зависимости
  // от типа жилья
  var setOfferPrice = function (price) {
    util.priceInput.min = price;
    util.priceInput.placeholder = price;
  };

  // Функция расстановки соответствия времени заезда и времени выезда
  var setTimeOutInput = function () {
    util.timeInSelect.value = util.timeOutSelect.value;
  };

  var setTimeInInput = function () {
    util.timeOutSelect.value = util.timeInSelect.value;
  };

  // Функция установки соответствия количества гостей с количеством комнат.
  var validateRoomAndGuest = function () {
    if (util.roomNumber.value === '1' && util.guestNumber.value !== util.roomNumber.value) {
      util.guestNumber.setCustomValidity('В однокомнатную квартиру разместить можно только 1 гостя');
    } else if (util.roomNumber.value === '2' && (util.guestNumber.value === '0' || util.guestNumber.value > util.roomNumber.value)) {
      util.guestNumber.setCustomValidity('В 2х комнатную квартиру разместить можно только 1 или 2х гостей');
    } else if (util.roomNumber.value === '3' && util.guestNumber.value === '0') {
      util.guestNumber.setCustomValidity('В 3х комнатную квартиру разместить можно только 1, 2х или 3х гостей');
    } else if (util.roomNumber.value === '100' && !(util.guestNumber.value === '0')) {
      util.guestNumber.setCustomValidity('В 100 комнатной квартире резмещать гостей нельзя');
    } else {
      util.guestNumber.setCustomValidity('');
    }
  };

  // Обработчик события проверки соответствия заголовка требованиям
  util.titleInput.addEventListener('blur', function () {
    validateTitle();
  });

  // Обработчик события установки плейсхолдеров и минимальной цены
  util.typeSelect.addEventListener('change', function (evt) {
    setOfferPrice(getOfferMinPrice(evt.target.value));
  });


  // Обработчик события установки соответствия времени заезда и выезда
  util.timeInSelect.addEventListener('change', function () {
    setTimeInInput();
  });

  util.timeOutSelect.addEventListener('change', function () {
    setTimeOutInput();
  });

  // Обработчик события проверки соответствия количества комнат и гостей
  util.roomNumber.addEventListener('change', function () {
    validateRoomAndGuest();
  });
})();
