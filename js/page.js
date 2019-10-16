'use strict';

(function () {
  // Функция удаления атрибута disabled всем элементам формы в активном состоянии
  var activateFields = function () {
    window.domRef.adFields.forEach(window.util.unsetDisabled);
    window.domRef.filterFields.forEach(window.util.unsetDisabled);
  };

  // Функция добавления атрибута disabled всем элементам формы в неактивном состоянии
  var deactivateFields = function () {
    window.domRef.adFields.forEach(window.util.setDisabled);
    window.domRef.filterFields.forEach(window.util.setDisabled);
  };

  // Функция переключения страницы с неактивного режима на активный
  var activatePage = function () {
    window.domRef.map.classList.remove('map--faded');
    window.domRef.adForm.classList.remove('ad-form--disabled');
    activateFields();
    window.pin.render(window.data.ads);
    window.mainPin.pin.removeEventListener('keydown', onMainPinEnterPress);
    window.mainPin.pin.removeEventListener('mousedown', onMainPinMouseDown);
    window.domRef.mapPins.addEventListener('click', window.card.onPinShowCard);
  };

  // Функция переключения страницы с активного режима на неактивный
  var deactivatePage = function () {
    window.domRef.map.classList.add('map--faded');
    window.domRef.adForm.classList.add('ad-form--disabled');
    window.domRef.adForm.reset();
    window.domRef.filterForm.reset();
    window.mainPin.setStartPosition(window.mainPin.initialCoords);
    deactivateFields();
    window.mainPin.pin.addEventListener('keydown', onMainPinEnterPress);
    window.mainPin.pin.addEventListener('mousedown', onMainPinMouseDown);
    window.mainPin.pin.removeEventListener('click', window.card.onPinShow);
    window.pin.remove();
    window.card.close();
  };

  // Функция активации страницы по нажатию кнопки мышки на главную метку
  var onMainPinMouseDown = function () {
    activatePage();
  };

  // Функция активации страницы по нажатию клавиши enter на главную метку
  var onMainPinEnterPress = function (evt) {
    if (window.util.isEnterKey(evt)) {
      activatePage();
    }
  };

  var onDomLoad = function () {
    deactivatePage();
  };

  // Функция деактивации страницы при нажатии на кнопку очистить
  var onFormResetClick = function () {
    deactivatePage();
  };

  // Обработчик события загрузка страницы
  document.addEventListener('DOMContentLoaded', onDomLoad);

  // Обработчик события переключения страницы с неактивного режима на активный при помощи мышки
  window.mainPin.pin.addEventListener('mousedown', onMainPinMouseDown);

  // Обработчик события переключения страницы с неактивного режима на активный при помощи клавиатуры
  window.mainPin.pin.addEventListener('keydown', onMainPinEnterPress);

  // Обработчик события переключения страницы с активного режима на неактивный при сбросе формы
  window.adForm.adReset.addEventListener('click', onFormResetClick);

})();