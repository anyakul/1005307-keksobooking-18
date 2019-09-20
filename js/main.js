'use strict';

var avatar = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var X_MIN = 0;
var X_MAX = 1200;
var Y_MIN = 130;
var Y_MAX = 630;

// Функция получения рандомных чисел в определенном диапозоне
var getRandomNumber = function (valueMin, valueMax) {
  return Math.floor(Math.random() * (valueMax - valueMin) + valueMin);
};

// Делаем карту активной
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var similarPinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

// Показываем фотографии на карте
for (var i = 0; i < avatar.length; i++) {

  var pinsElement = similarPinsTemplate.cloneNode(true);

  var pinsElementImg = similarPinsTemplate.querySelector('img');

  var numberUser = getRandomNumber(1, avatar.length);

  var leftValue = getRandomNumber(X_MIN, X_MAX);

  var topValue = getRandomNumber(Y_MIN, Y_MAX);

  pinsElementImg.src = 'img/avatars/user0' + numberUser + '.png';
  pinsElement.style.left = leftValue + 'px';
  pinsElement.style.top = topValue + 'px';

  fragment.appendChild(pinsElement);
}

mapPins.appendChild(fragment);
