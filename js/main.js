'use strict';

var USERS = 8;

var PinSize = {
  WIDTH: 70,
  HEIGHT: 50,
  RADIUS: 25,
};

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

var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var Room = {
  MIN: 1,
  MAX: 5
};

var Guest = {
  MIN: 1,
  MAX: 10,
};

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

var description = 'description';

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var fragment = document.createDocumentFragment();

// Функция получения рандомных чисел в определенном диапозоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// функция создания элементов из массива со случайным выбором элементов
var getRandomArray = function (array) {
  return array.slice(0, getRandomNumber(0, array.length));
};

// Функция генерации массива js объектов
var generateAdData = function () {
  var ads = [];
  for (var i = 1; i <= USERS; i++) {
    var coordX = getRandomNumber(MapRect.LEFT, MapRect.RIGHT);
    var coordY = getRandomNumber(MapRect.TOP, MapRect.BOTTOM);
    var ad = {
      avatar: 'img/avatars/user0' + i + '.png',
      offer: {
        title: titles[getRandomNumber(0, titles.length)],
        address: coordX + ', ' + coordY,
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

      location: {
        x: coordX,
        y: coordY,
      }

    };
    ads.push(ad);
  }
  return ads;
};

// Функция для создания по шаблону будуших DOM-элементов, соответствующих меткам на карте
var renderPin = function (ad) {
  var pinsElement = pinsTemplate.cloneNode(true);
  var pinsElementImg = pinsElement.querySelector('img');

  pinsElementImg.src = ad.avatar;
  pinsElement.style.left = (Math.floor(ad.location.x - PinSize.WIDTH / 2)) + 'px';
  pinsElement.style.top = (Math.floor(ad.location.y)) + 'px';

  return pinsElement;
};

// Функция внеcения изменений в DOM
var addDomElement = function (ads) {
  ads.forEach(function (ad) {
    fragment.appendChild(renderPin(ad));
  });
  mapPins.appendChild(fragment);
  return;
};

// На основе данных, созданных в первом пункте, создаю DOM-элементы, соответствующие меткам на карте,
// и заполняю их данными из массива.

var mocks = generateAdData();

// Делаю карту активной
map.classList.remove('map--faded');

// Отрисовываю сгенерированные DOM-элементы в блок .map__pins.
addDomElement(mocks);
