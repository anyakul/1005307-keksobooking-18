'use strict';

(function () {
  // Функция переключения страницы с неактивного режима на активный
  var activatePage = function () {
    window.domRef.map.classList.remove('map--faded');
    window.domRef.adForm.classList.remove('ad-form--disabled');
    window.adForm.activate();
    window.pin.load();
  };

  // Функция переключения страницы с активного режима на неактивный
  var deactivatePage = function () {
    window.domRef.map.classList.add('map--faded');
    window.domRef.adForm.classList.add('ad-form--disabled');
    window.filter.deactivate();
    window.adForm.deactivate();
    window.domRef.adForm.reset();
    window.domRef.filterForm.reset();
    window.mainPin.reset();
    window.pin.remove();
    window.card.close();
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

  window.mainPin.onFirstClick = function () {
    activatePage();
  };

  window.page = {
    ads: [],
    deactivate: deactivatePage,
  };
})();
