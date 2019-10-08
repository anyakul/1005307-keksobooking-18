'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var filterForm = map.querySelector('.map__filters');
  var filterFields = map.querySelectorAll('.map__filter, .map__checkbox');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var adFields = adForm.querySelectorAll('fieldset');
  var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  window.domRef = {
    map: map,
    mapPins: mapPins,
    notice: notice,
    adForm: adForm,
    adFields: adFields,
    filterForm: filterForm,
    filterFields: filterFields,
    pinsTemplate: pinsTemplate,
    cardTemplate: cardTemplate,
  };
})();
