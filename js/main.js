'use strict';

var USER_COUNT = 8;

var FEATURE_MARKUP = '<li class="popup__feature popup__feature--$feature"></li>';
var PHOTO_MARKUP = '<img src="$url" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

var KeyboardKey = {
  ENTER: 'Enter',
  escKeyMap: {
    Esc: true,
    Escape: true,
  },
};

var PinSize = {
  WIDTH: 70,
  HEIGHT: 50,
  RADIUS: 25,
};

var MainPinSize = {
  WIDTH: 65,
  HEIGHT: 80,
  RADIUS: 32,
};

var MapRect = {
  LEFT: 100,
  TOP: 130,
  RIGHT: 1200,
  BOTTOM: 630,
};

var offerTypeToMinPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
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

// ФУНКЦИИ ДЛЯ СЛУЧАЙНОГО СОЗДАНИЯ ОБЪЯВЛЕНИЙ

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

// Функция форматирования строки цены за ночь
var formatOfferPrice = function (offer) {
  return offer.price + ' \u20bd/ночь';
};

// Функция получения типа жилья на русском языке
var getOfferType = function (offer) {
  return offerTypeEnToRu[offer.type];
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

// функция генерации объявлений
var generateAds = function (num) {
  return getAdIds(num).map(makeAd);
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

// Функция генерации конечного шаблона списка фотографий
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

var mocks = generateAds(USER_COUNT);

// Функция внеcения изменений в DOM - карточка объявления
var renderCards = function () {
  map.appendChild(renderCard(mocks[0]));
};

// Функция показа объявлений
var showAds = function () {
  renderPins(mocks);
};

// АКТИВАЦИЯ И ДЕАКТИВАЦИЯ СТРАНИЦЫ.

// Функция вычисления координат главной метки
var getMainPinCoords = function (height) {
  return {
    x: mainPin.offsetLeft + MainPinSize.RADIUS,
    y: mainPin.offsetTop + height
  };
};

// Функция заполнения поля адреса по местоположению главной метки на карте
var renderAddressInput = function (coords) {
  address.value = coords.x + ', ' + coords.y;
};

var setDisabled = function (element) {
  element.disabled = true;
};

var unsetDisabled = function (element) {
  element.disabled = false;
};

// Функция удаления атрибута disabled всем элементам формы в активном состоянии
var activateFields = function () {
  adFields.forEach(unsetDisabled);
  filterFields.forEach(unsetDisabled);
};

// Функция добавления атрибута disabled всем элементам формы в неактивном состоянии
var deactivateFields = function () {
  adFields.forEach(setDisabled);
  filterFields.forEach(setDisabled);
};

// Функция переключения страницы с неактивного режима на активный
var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  showAds();
  activateFields();
  renderAddressInput(getMainPinCoords(MainPinSize.HEIGHT));

  mainPin.removeEventListener('keydown', onMainPinEnterPress);
  mainPin.removeEventListener('mousedown', onMainPinMouseDown);
};

// Функция переключения страницы с активного режима на неактивный
var deactivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  deactivateFields();
  adForm.reset();
  filterForm.reset();
  renderAddressInput(getMainPinCoords(MainPinSize.RADIUS));

  mainPin.addEventListener('keydown', onMainPinEnterPress);
  mainPin.addEventListener('mousedown', onMainPinMouseDown);
};

// Функция активации страницы по нажатию кнопки мышки на главную метку
var onMainPinMouseDown = function () {
  activatePage();
};

// Функция нажатия на клавишу enter
var isEnterKey = function (evt) {
  return evt.key === KeyboardKey.ENTER || evt.key === KeyboardKey.ESC_IE;
};

// Функция нажатия на клавишу escape
var isEscKey = function (evt) {
  return KeyboardKey.escKeyMap[evt.key];
};

// Функция активации страницы по нажатию клавиши enter на главную метку
var onMainPinEnterPress = function (evt) {
  if (isEnterKey(evt)) {
    activatePage();
  }
};

// Функция деактивации страницы при нажатии на кнопку очистить
var onFormResetClick = function () {
  deactivatePage();
};

renderAddressInput(getMainPinCoords(MainPinSize.RADIUS));

// Обработчик события переключения страницы с неактивного режима на активный при помощи мышки
mainPin.addEventListener('mousedown', onMainPinMouseDown);

// Обработчик события переключения страницы с неактивного режима на активный при помощи клавиатуры
mainPin.addEventListener('keydown', onMainPinEnterPress);

// Обработчик события переключения страницы с активного режима на неактивный при сбросе формы
adFormReset.addEventListener('click', onFormResetClick);


// ОТКРЫТИЕ И ЗАКРЫТИЕ КАРТОЧКИ ОБЪЯВЛЕНИЯ

// Функция закрытия карточки объявления
var closeCard = function () {
  var pinPopup = document.querySelector('.map__card');
  if (map.contains(pinPopup)) {
    map.removeChild(pinPopup);
  }
};

mapPins.addEventListener('click', function (evt) {
  if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
    var currentData = evt.target.closest('.map__pin:not(.map__pin--main)');
    map.appendChild(renderCard(mocks[currentData]));
  }
});

// Обработчик события закрытие попапа с информацией об объявлении при нажатии ECS
document.addEventListener('keydown', function (evt) {
  if (isEscKey(evt)) {
    closeCard();
  }
});

// Обработчик события закрытие попапа с информацией об объявлении при клике на крестик (при помощи делегирования)
document.addEventListener('click', function (evt) {
  if (evt.target.matches('.popup__close')) {
    closeCard();
  }
});

// ВАЛИДАЦИЯ ФОРМЫ ОБЪЯВЛЕНИЯ
// Функция проверки заголовка требованиям
var validateTitle = function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Длина заголовка должна быть не меньше 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Длина заголовка должна быть не больше 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Пожалуйста, введите заголовок');
  } else {
    titleInput.setCustomValidity('');
  }
};

// Функция установки установки типа жилья и минимальной цены за ночь
var getOfferMinPrice = function () {
  return offerTypeToMinPrice[typeSelect.value];
};

// Функция расстановки правильных плейсхолдеров, максимальной цены, и минимальной цены за сутки в зависимости
// от типа жилья
var setOfferPrice = function (price) {
  priceInput.min = price;
  priceInput.placeholder = price;
};

// Функция проверки соответствия введенной цены минимальной цене выбранного типа жилья
var validateTypePrice = function () {
  if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Цена не может превышать 1 000 000 рублей');
  } else if (setOfferPrice('flat') && priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Значение должно быть больше или равно 1000');
  } else if (setOfferPrice('house') && priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Значение должно быть больше или равно 5000');
  } else if (setOfferPrice('palace') && priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Значение должно быть больше или равно 10000');
  }
};

// Функция расстановки соответствия времени заезда и времени выезда
var setTimeOutInput = function () {
  timeInSelect.value = timeOutSelect.value;
};

var setTimeInInput = function () {
  timeOutSelect.value = timeInSelect.value;
};

// Функция установки соответствия количества гостей с количеством комнат.
var validateRoomAndGuest = function () {
  if (roomNumber.value === '1' && guestNumber.value !== roomNumber.value) {
    guestNumber.setCustomValidity('В однокомнатную квартиру разместить можно только 1 гостя');
  } else if (roomNumber.value === '2' && (guestNumber.value === '0' || guestNumber.value > roomNumber.value)) {
    guestNumber.setCustomValidity('В 2х комнатную квартиру разместить можно только 1 или 2х гостей');
  } else if (roomNumber.value === '3' && guestNumber.value === '0') {
    guestNumber.setCustomValidity('В 3х комнатную квартиру разместить можно только 1, 2х или 3х гостей');
  } else if (roomNumber.value === '100' && !(guestNumber.value === '0')) {
    guestNumber.setCustomValidity('В 100 комнатной квартире резмещать гостей нельзя');
  } else {
    guestNumber.setCustomValidity('');
  }
};

// Обработчик события проверки соответствия заголовка требованиям
titleInput.addEventListener('blur', function () {
  validateTitle();
});

// Обработчик события установки плейсхолдеров и минимальной цены
typeSelect.addEventListener('change', function (evt) {
  setOfferPrice(getOfferMinPrice(evt.target.value));
});


// Обработчик события установки соответствия времени заезда и выезда
timeInSelect.addEventListener('change', function () {
  setTimeInInput();
});

timeOutSelect.addEventListener('change', function () {
  setTimeOutInput();
});

// Обработчик события проверки соответствия количества комнат и гостей
roomNumber.addEventListener('change', function () {
  validateRoomAndGuest();
});

adForm.addEventListener('submit', function () {
  validateTypePrice();
});
