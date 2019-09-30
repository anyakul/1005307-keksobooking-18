'use strict';

var USER_COUNT = 8;

var FEATURE_MARKUP = '<li class="popup__feature popup__feature--$feature"></li>';
var PHOTO_MARKUP = '<img src="$url" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

var KeyboardKey = {
  ENTER: 'Enter',
};

var PinSize = {
  WIDTH: 70,
  HEIGHT: 50,
  RADIUS: 25,
};

var MainPinSizeNonActive = {
  WIDTH: 156,
  HEIGHT: 156,
  RADIUS: 78,
};

var MainPinSizeActive = {
  WIDTH: 65,
  HEIGHT: 65,
  RADIUS: 32.5,
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

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var notice = document.querySelector('.notice');
var adForm = notice.querySelector('.ad-form');
var address = adForm.querySelector('#address');
var pageReset = adForm.querySelector('.ad-form__reset');
var pageSubmit = adForm.querySelector('.ad-form__submit');
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
  return array.slice(0, getRandomNumber(0, array.length + 1));
};

// функция генерации строковых id
var getAdIds = function (num) {
  return Array(num).fill(null).map(function (_, index) {
    index += 1;
    return index < 10 ? '0' + index : String(index);
  });
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

// Функция получения корректной формы слова комната.
var getRoomEnding = function (rooms) {
  return pluralize(rooms, 'комната', 'комнаты', 'комнат');
};

// Функция получения корректной формы слова гость.
var getGuestEnding = function (guests) {
  return pluralize(guests, 'гостя', 'гостей', 'гостей');
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

// Функция форматирования строки цены за ночь
var formatOfferPrice = function (offer) {
  return offer.price + ' \u20bd/ночь';
};

// Функция получения типа жилья на русском языке
var getOfferType = function (offer) {
  return offerTypeEnToRu[offer.type];
};

// Функция для форматирования строки количества гостей и комнат.
var formatOfferCapacity = function (offer) {
  return offer.rooms + ' ' + getRoomEnding(offer.rooms) + ' для ' + offer.guests + ' ' + getGuestEnding(offer.guests);
};

// Функция для форматирования строки времени заезда и выезда из квартиры.
var formatOfferTime = function (offer) {
  return 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
};

// Функция добавления удобств
var getFeatureMarkup = function (feature) {
  return FEATURE_MARKUP.replace('$feature', feature);
};

// функция добавления фотографий
var getPhotoMarkup = function (url) {
  return PHOTO_MARKUP.replace('$url', url);
};

// Функция генерации конечного шаблона списка удобств
var getFeatureTemplate = function (feature) {
  return feature
    .map(getFeatureMarkup)
    .join('\n');
};

// Функция генерации конечного шаблона фотографий
var getPhotoTemplate = function (photo) {
  return photo
    .map(getPhotoMarkup)
    .join('\n');
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
  var offer = ad.offer;

  card.querySelector('img').src = ad.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = formatOfferPrice(offer);
  card.querySelector('.popup__type').textContent = getOfferType(offer);
  card.querySelector('.popup__text--capacity').textContent = offer.rooms > 0 ? formatOfferCapacity(offer) : '';
  card.querySelector('.popup__text--time').textContent = formatOfferTime(offer);
  card.querySelector('.popup__description').textContent = offer.description;
  card.querySelector('.popup__features').innerHTML = offer.features.length > 0 ? getFeatureTemplate(offer.features) : '';
  card.querySelector('.popup__photos').innerHTML = offer.photos.length > 0 ? getPhotoTemplate(offer.photos) : '';

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
var renderCards = function (mocks) {
  map.appendChild(renderCard(mocks[0]));
};

// Функция показа объявлений
var showAds = function () {
  var mocks = generateAds(USER_COUNT);
  renderPins(mocks);
  renderCards(mocks);
};

// Функция переключения страницы с неактивного режима на активный
var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  showAds();
};

// Функция переключения страницы с активного режима на неактивный
var deactivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
};

// Функция вычисления координат
var getLocationMain = function () {
  var locationMain = {
    x: mapPinMain.offsetLeft + MainPinSizeNonActive.RADIUS,
    y: mapPinMain.offsetTop + (MainPinSizeNonActive.RADIUS + (MainPinSizeNonActive.RADIUS + MainPinSizeActive.RADIUS) / 2),
  };
  return locationMain;
};

// Функция заполнения поля адреса по местоположению главной метки на карте
var renderAddress = function () {
  address.value = getLocationMain().x + '. ' + getLocationMain().y;
};

// Функция нажатия на клавишу enter
var isEnterKey = function (evt) {
  return evt.key === KeyboardKey.ENTER;
};

// Функция активации страницы по нажатию кнопки мышки на главную метку
var mousedown = function () {
  activatePage();
  mapPinMain.removeEventListener('click', mousedown);
};

// Функция активации страницы по нажатию клавиши enter на главную метку
var keydown = function () {
  if (isEnterKey(keydown)) {
    activatePage();
    mapPinMain.removeEventListener('click', keydown);
  }
};

// Обработчик события переключения страницы с неактивного режима на активный при помощи мышки
mapPinMain.addEventListener('click', mousedown);

// Обработчик события переключения страницы с неактивного режима на активный при помощи клавиатуры
mapPinMain.addEventListener('keydown', keydown);

// Обработчик события переключения страницы с активного режима на неактивный при сбросе формы
pageReset.addEventListener('click', function () {
  deactivatePage();
});

// Обработчик события переключения страницы с активного режима на неактивный при отправке формы
pageSubmit.addEventListener('click', function () {
  deactivatePage();
});

renderAddress();
