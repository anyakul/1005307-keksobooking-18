'use strict';

(function () {
  // Функция переключения страницы с неактивного режима на активный
  var activatePage = function () {
    window.domRef.map.classList.remove('map--faded');
    window.adForm.activate();
    window.pin.load();
  };

  // Функция переключения страницы с активного режима на неактивный
  var deactivatePage = function () {
    window.domRef.map.classList.add('map--faded');
    window.filter.deactivate();
    window.adForm.deactivate();
    window.domRef.filterForm.reset();
    window.mainPin.reset();
    window.pin.remove();
    window.card.close();
  };

  // Функция обработчика события загрузки страницы
  var onDomLoad = function () {
    deactivatePage();
  };

  // Обработчик события загрузка страницы
  document.addEventListener('DOMContentLoaded', onDomLoad);

  window.mainPin.onFirstClick = function () {
    activatePage();
  };

  window.page = {
    ads: [],
    deactivate: deactivatePage,
  };
})();
