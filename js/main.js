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

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

// Функция получения рандомных чисел в определенном диапозоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// функция создания элементов из массива со случайным выбором элементов
var getRandomArray = function (array) {
  return array.slice(0, getRandomNumber(0, array.length - 1));
};

// функция генерации строковых id
var getAdIds = function (num) {
  return Array(num).fill(null).map(function (_, index) {
    index += 1;
    return index < 10 ? '0' + index : String(index);
  });
};

// Функция получения корректной формы слова гость.
var setNounFormGuests = function (number) {
  return number === 1 ? 'гостя' : 'гостей';
};

// Функция получения корректной формы слова комната.
var setNounFormRooms = function (number) {
  return number === 1 ? 'комната' : 'комнаты';
};

// Функция перевода типов жилья на русский язык
var setType = function (ad) {
  if (ad.offer.type === 'palace') {
    return 'Дворец';
  }
  if (ad.offer.type === 'flat') {
    return 'Квартира';
  }
  if (ad.offer.type === 'house') {
    return 'Дом';
  }
  if (ad.offer.type === 'bungalo') {
    return 'Бунгало';
  }
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
  var pin = pinsTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pinImg.src = ad.avatar;
  pin.style.left = (ad.location.x - PinSize.RADIUS) + 'px';
  pin.style.top = (ad.location.y - PinSize.HEIGHT) + 'px';

  return pin;
};

// Функция для создания карточки объявления
var renderCard = function (ad) {
  var card = cardTemplate.cloneNode(true);

  // Функция добавления фотографий
  var addPhotos = function () {
    var photos = card.querySelectorAll('.popup__photo');
    var adPhotos = card.querySelector('.popup__photos');

    if (ad.offer.photos.length > 1) {
      for (var i = 1; i < ad.offer.photos.length; i++) {
        adPhotos.appendChild(photos[0].cloneNode());
        photos = card.querySelectorAll('.popup__photo');
        photos[i].setAttribute('src', ad.offer.photos[i]);
      }
    }
    photos[0].setAttribute('src', ad.offer.photos[0]);
  };

  // Функция добавления удобств
  function setFeatures() {
    var popupFeatures = card.querySelector('.popup__features');
    var popupFeature = card.querySelectorAll('.popup__feature');
    for (var i = ad.offer.features.length; i < popupFeature.length; i++) {
      popupFeatures.removeChild(popupFeature[i]);
    }
  }

  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price + ' ' + '₽/ночь';
  card.querySelector('.popup__type').textContent = setType(ad);
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' + setNounFormRooms(ad.offer.rooms) + ' ' + 'для' + ' ' + ad.offer.guests + ' ' + setNounFormGuests(ad.offer.guests);
  card.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + ad.offer.checkin + ', выезд до' + ' ' + ad.offer.checkout;
  card.querySelector('.popup__description').textContent = ad.offer.description;
  // card.querySelector('.popup__photo').setAttribute('src', ad.offer.photos);
  card.querySelector('.popup__avatar').setAttribute('src', ad.avatar);
  addPhotos(ad);
  setFeatures(ad);
  return card;
};

// Функция внеcения изменений в DOM - отметки на карте
var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();
  ads.forEach(function (ad) {
    fragment.appendChild(renderPin(ad));
  });
  mapPins.appendChild(fragment);
};

// Функция внеcения изменений в DOM - карточка объявления
var renderCards = function (ads) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(ads[0]));
  map.appendChild(fragment);
};

// На основе данных, созданных в первом пункте, создаю DOM-элементы, соответствующие меткам на карте,
// и заполняю их данными из массива.

var mocks = generateAds(USER_COUNT);

map.classList.remove('map--faded');

renderPins(mocks);

renderCards(mocks);
