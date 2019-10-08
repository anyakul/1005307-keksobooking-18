'use strict';

(function () {
  var USER_COUNT = 8;

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

  // Словарь типов жилья
  var offerTypeEnToRu = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
  };


  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  // Функция получения рандомных чисел в определенном диапозоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // функция создания элементов из массива со случайным выбором элементов
  var getRandomArray = function (array) {
    return array.slice(0, getRandomNumber(0, array.length + 1));
  };


  // функция генерации строковых id
  var getAdIds = function (num) {
    return Array(num).fill(null).map(function (_, index) {
      index += 1;
      return index < 10 ? '0' + index : String(index);
    });
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

  // функция генерации объявлений
  var generateAds = function (num) {
    return getAdIds(num).map(makeAd);
  };

  var normalizeAds = function (ad, idx) {
    ad.id = idx;
    return ad;
  };

  var ads = generateAds(USER_COUNT).map(normalizeAds);

  window.data = {
    ads: ads,
    offerTypeEnToRu: offerTypeEnToRu,
  };
})();
