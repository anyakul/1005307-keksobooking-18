'use strict';

(function () {
  // Функция переключения страницы с неактивного режима на активный
  var activatePage = function () {
    window.domRef.map.classList.remove('map--faded');
    window.domRef.adForm.classList.remove('ad-form--disabled');
    window.mainPin.renderActivation();
    window.adForm.activate();
    window.pin.load();
    window.mainPin.pin.removeEventListener('keydown', onMainPinEnterPress);
    window.mainPin.pin.removeEventListener('mousedown', onMainPinMouseDown);
  };

  // Функция переключения страницы с активного режима на неактивный
  var deactivatePage = function () {
    window.domRef.map.classList.add('map--faded');
    window.domRef.adForm.classList.add('ad-form--disabled');
    window.filter.deactivate();
    window.adForm.deactivate();
    window.domRef.adForm.reset();
    window.domRef.filterForm.reset();
    window.mainPin.renderDeactivation();
    window.mainPin.pin.addEventListener('keydown', onMainPinEnterPress);
    window.mainPin.pin.addEventListener('mousedown', onMainPinMouseDown);
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

  // Функция обработчика события загрузки страницы
  var onDomLoad = function () {
    deactivatePage();
  };

  // Функция обработчика события нажатие на кнопку очистить
  var onFormResetClick = function () {
    deactivatePage();
  };

  // Обработчик события загрузка страницы
  document.addEventListener('DOMContentLoaded', onDomLoad);

  // Обработчик события переключения страницы с активного режима на неактивный при сбросе формы
  window.adForm.reset.addEventListener('click', onFormResetClick);

  window.page = {
    ads: [],
    deactivate: deactivatePage,
  };
})();
