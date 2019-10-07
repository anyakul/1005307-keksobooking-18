'use strict';

(function () {
  var util = window.util;

  // Функция форматирования строки цены за ночь
  var formatOfferPrice = function (offer) {
    return offer.price + ' \u20bd/ночь';
  };

  // Функция получения типа жилья на русском языке
  var getOfferType = function (offer) {
    return util.offerTypeEnToRu[offer.type];
  };

  // Функция получения корректной формы слова комната.
  var getRoomEnding = function (rooms) {
    return util.pluralize(rooms, 'комната', 'комнаты', 'комнат');
  };

  // Функция получения корректной формы слова гость.
  var getGuestEnding = function (guests) {
    return util.pluralize(guests, 'гостя', 'гостей', 'гостей');
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
    return util.FEATURE_MARKUP.replace('$feature', feature);
  };

  // функция добавления фотографий
  var getPhotoMarkup = function (url) {
    return util.PHOTO_MARKUP.replace('$url', url);
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

  // Функция для создания карточки объявления
  var renderCard = function (ad) {
    var card = util.cardTemplate.cloneNode(true);
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

  // Функция внеcения изменений в DOM - карточка объявления
  var showCard = function (ad) {
    util.map.appendChild(renderCard(ad));
  };

  // Функция закрытия карточки объявления
  window.card.closeCard = function () {
    var pinPopup = document.querySelector('.map__card');
    if (util.map.contains(pinPopup)) {
      util.map.removeChild(pinPopup);
    }
  };

  // Функция обработчика события показа карточки объявления
  window.card.onPinShowCard = function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    var pinActive = util.mapPins.querySelector('.map__pin--active:not(.map__pin--main)');
    if (pin !== null) {
      window.card.closeCard();
      showCard(window.ads[+pin.dataset.id]);
      pin.classList.add('map__pin--active');
    }
    if ((pin !== null) && (pinActive !== null)) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  // Обработчик события открытия карточки объявления
  util.mapPins.addEventListener('click', window.card.onPinShowCard);

  // Обработчик события закрытие попапа с информацией об объявлении при нажатии ECS
  document.addEventListener('keydown', function (evt) {
    if (util.isEscKey(evt)) {
      window.card.closeCard();
    }
  });

  // Обработчик события закрытие попапа с информацией об объявлении при клике на крестик
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      window.card.closeCard();
    }
  });
})();
