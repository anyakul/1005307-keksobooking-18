'use strict';

var users = 8;

var PIN = {
  HEIGHT: 50,
  WIDTH: 70,
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

var price = {
  min: 1,
  max: 1000
};

var type = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var rooms = {
  min: 1,
  max: 5
};

var guests = {
  min: 1,
  max: 10,
};

var checkin = [
  '12.00',
  '13.00',
  '14.00',
];

var checkout = [
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

var description = [
  'description1',
  'description2',
  'description3',
  'description4',
  'description5',
  'description6',
  'description7',
  'description8',
];

var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];


// Функция получения рандомных чисел в определенном диапозоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция генерации массива js объектов
var generateMockData = function () {
  var mocks = [];
  for (var i = 1; i <= users; i++) {
    var coordX = getRandomNumber(MapRect.LEFT, MapRect.RIGHT);
    var coordY = getRandomNumber(MapRect.TOP, MapRect.BOTTOM);
    var mock = {
      avatar: 'img/avatars/user0' + i + '.png',
      offer: {
        title: titles[getRandomNumber(0, titles.length)],
        address: coordX + ', ' + coordY,
        price: getRandomNumber(price.min, price.max),
        type: type[getRandomNumber(0, type.length)],
        rooms: getRandomNumber(rooms.min, rooms.max),
        guests: getRandomNumber(guests.min, guests.max),
        checkin: checkin[getRandomNumber(0, checkin.length)],
        checkout: checkout[getRandomNumber(0, checkout.length)],
        features: [],
        description: description[getRandomNumber(0, description.length)],
        photos: [],
      },

      location: {
        x: coordX,
        y: coordY,
      }
    };
    var k = 0;
    for (var j = 0; j < features.length; j++) {
      if (getRandomNumber(0, 2)) {
        mock.offer.features[k] = features[j];
        k = k + 1;
      }
    }
    k = 0;
    for (var j = 0; j < photos.length; j++) {
      if (getRandomNumber(0, 2)) {
        mock.offer.photos[k] = photos[j];
        k = k + 1;
      }
    }
    mocks.push(mock);
  }

  return mocks;
};

console.log(generateMockData());

// Функция для создания DOM-элементов, соответствующих меткам на карте
var renderPin = function (mock) {
  var pinsElement = pinsTemplate.cloneNode(true);
  var pinsElementImg = pinsElement.querySelector('img');

  pinsElementImg.src = mock.avatar;
  pinsElement.style.left = (Math.floor(mock.location.x - PIN.WIDTH / 2)) + 'px';
  pinsElement.style.top = (Math.floor(mock.location.y - PIN.HEIGHT / 2)) + 'px';

  return pinsElement;
};

// На основе данных, созданных в первом пункте, создаю DOM-элементы, соответствующие меткам на карте,
// и заполняю их данными из массива.
var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var mocks = generateMockData();

var fragment = document.createDocumentFragment();

for (var i = 0; i < mocks.length; i++) {
  fragment.appendChild(renderPin(mocks[i]));
}

// Делаю карту активной
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Отрисщвываю сгенерированные DOM-элементы в блок .map__pins.
var mapPins = map.querySelector('.map__pins');
mapPins.appendChild(fragment);
