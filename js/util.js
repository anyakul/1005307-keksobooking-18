'use strict';

(function () {
  var USER_COUNT = 8;
  var FEATURE_MARKUP = '<li class="popup__feature popup__feature--$feature"></li>';
  var PHOTO_MARKUP = '<img src="$url" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Esc',
    ESCAPE_IE: 'Escape',
  };

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32,
  };

  var PinSize = {
    WIDTH: 70,
    HEIGHT: 50,
    RADIUS: 25,
  };

  var MapRect = {
    LEFT: 100,
    TOP: 130,
    RIGHT: 1200,
    BOTTOM: 630,
  };

  var Price = {
    MIN: 1,
    MAX: 1000
  };

  var Room = {
    MIN: 1,
    MAX: 5
  };

  var Guest = {
    MIN: 1,
    MAX: 5,
  };

  var description = 'description';

  var titles = [
    'title1',
    'title2',
    'title3',
    'title4',
    'title5',
    'title6',
    'title7',
    'title8'
  ];

  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var checkins = [
    '12.00',
    '13.00',
    '14.00',
  ];

  var checkouts = [
    '12.00',
    '13.00',
    '14.00',
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  // Словарь типов жилья
  var offerTypeEnToRu = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
  };

  var offerTypeToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  // Функция получения рандомных чисел в определенном диапозоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // функция создания элементов из массива со случайным выбором элементов
  var getRandomArray = function (array) {
    return array.slice(0, getRandomNumber(0, array.length + 1));
  };

  // функция создания одного элемента
  var makeAd = function (id) {
    var location = {
      x: getRandomNumber(MapRect.LEFT, MapRect.RIGHT),
      y: getRandomNumber(MapRect.TOP, MapRect.BOTTOM),
    };

    return {
      avatar: 'img/avatars/user' + id + '.png',
      offer: {
        title: titles[getRandomNumber(0, titles.length)],
        address: location.x + ', ' + location.y,
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: types[getRandomNumber(0, types.length)],
        rooms: getRandomNumber(Room.MIN, Room.MAX),
        guests: getRandomNumber(Guest.MIN, Guest.MAX),
        checkin: checkins[getRandomNumber(0, checkins.length)],
        checkout: checkouts[getRandomNumber(0, checkouts.length)],
        features: getRandomArray(features),
        description: description,
        photos: getRandomArray(photos),
      },
      location: location,
    };
  };

  // Функция нажатия на клавишу enter
  var isEnterKey = function (evt) {
    return evt.key === KeyboardKey.ENTER;
  };

  // Функция нажатия на клавишу escape
  var isEscKey = function (evt) {
    return evt.key === KeyboardKey.ESCAPE
      || evt.key === KeyboardKey.ESCAPE_IE;
  };

  // Функция получения корректной формы слова
  var pluralize = function (num, one, two, five) {
    var mod100 = Math.abs(num % 100);
    if (mod100 > 10 && mod100 < 20) {
      return five;
    }

    var mod10 = mod100 % 10;
    if (mod10 > 1 && mod10 < 5) {
      return two;
    }

    return mod10 === 1 ? one : five;
  };

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPin = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
  var mainPin = map.querySelector('.map__pin--main');
  var filterForm = map.querySelector('.map__filters');
  var filterFields = map.querySelectorAll('.map__filter, .map__checkbox');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var adFields = adForm.querySelectorAll('fieldset');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var titleInput = adForm.querySelector('#title');
  var address = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var guestNumber = adForm.querySelector('#capacity');
  var priceInput = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var typeSelect = adForm.querySelector('#type');
  var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  window.util = {
    USER_COUNT: USER_COUNT,
    FEATURE_MARKUP: FEATURE_MARKUP,
    PHOTO_MARKUP: PHOTO_MARKUP,
    KeyboardKey: KeyboardKey,

    MainPinSize: MainPinSize,
    PinSize: PinSize,

    MapRect: MapRect,
    Price: Price,
    Room: Room,
    Guest: Guest,
    address: address,
    description: description,
    titles: titles,
    types: types,
    checkins: checkins,
    checkouts: checkouts,
    features: features,
    photos: photos,
    offerTypeEnToRu: offerTypeEnToRu,
    offerTypeToMinPrice: offerTypeToMinPrice,

    isEnterKey: isEnterKey,
    isEscKey: isEscKey,
    pluralize: pluralize,
    getRandomNumber: getRandomNumber,
    getRandomArray: getRandomArray,

    makeAd: makeAd,

    map: map,
    mapPins: mapPins,
    mapPin: mapPin,
    mainPin: mainPin,
    mainPinSize: MainPinSize,
    filterForm: filterForm,
    filterFields: filterFields,
    notice: notice,
    adForm: adForm,
    adFields: adFields,
    adFormReset: adFormReset,
    titleInput: titleInput,
    roomNumber: roomNumber,
    guestNumber: guestNumber,
    priceInput: priceInput,
    timeInSelect: timeInSelect,
    timeOutSelect: timeOutSelect,
    typeSelect: typeSelect,
    cardTemplate: cardTemplate,
    pinsTemplate: pinsTemplate,
  };
})();
