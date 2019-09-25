'use strict';

var USER_COUNT = 8;

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
  MAX: 10,
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

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


// Функция получения рандомных чисел в определенном диапозоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// функция создания элементов из массива со случайным выбором элементов
var getRandomArray = function (array) {
  return array.slice(0, getRandomNumber(0, array.length));
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

// Функция для создания по шаблону будуших DOM-элементов, соответствующих меткам на карте
var renderPin = function (ad) {
  var pins = pinsTemplate.cloneNode(true);
  var pinsImg = pins.querySelector('img');

  pinsImg.src = ad.avatar;
  pins.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
  pins.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';

  return pins;
};

// Функция внеcения изменений в DOM
var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();
  ads.forEach(function (ad) {
    fragment.appendChild(renderPin(ad));
  });
  mapPins.appendChild(fragment);
};

// На основе данных, созданных в первом пункте, создаю DOM-элементы, соответствующие меткам на карте,
// и заполняю их данными из массива.

var mocks = generateAds(USER_COUNT);

// Делаю карту активной
map.classList.remove('map--faded');

// Отрисовываю сгенерированные DOM-элементы в блок .map__pins.
renderPins(mocks);
