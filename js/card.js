'use strict';

(function () {
  var FEATURE_MARKUP = '<li class="popup__feature popup__feature--$feature"></li>';
  var PHOTO_MARKUP = '<img src="$url" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

  // Словарь типов жилья
  var offerTypeEnToRu = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец',
  };

  // Функция форматирования строки цены за ночь
  var formatOfferPrice = function (offer) {
    return offer.price + ' \u20bd/ночь';
  };

  // Функция получения типа жилья на русском языке
  var getOfferType = function (offer) {
    return offerTypeEnToRu[offer.type];
  };

  // Функция получения корректной формы слова комната.
  var getRoomEnding = function (rooms) {
    return window.util.pluralize(rooms, 'комната', 'комнаты', 'комнат');
  };

  // Функция получения корректной формы слова гость.
  var getGuestEnding = function (guests) {
    return window.util.pluralize(guests, 'гостя', 'гостей', 'гостей');
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

  // Функция для создания карточки объявления
  var renderCard = function (ad) {
    var card = window.domRef.cardTemplate.cloneNode(true);
    var offer = ad.offer;

    card.querySelector('img').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = offer.title;
    card.querySelector('.popup__text--address').textContent = offer.address;
    card.querySelector('.popup__text--price').textContent = formatOfferPrice(offer);
    card.querySelector('.popup__type').textContent = getOfferType(offer);
    card.querySelector('.popup__text--capacity').textContent = formatOfferCapacity(offer);
    card.querySelector('.popup__text--time').textContent = formatOfferTime(offer);
    card.querySelector('.popup__description').textContent = offer.description;
    card.querySelector('.popup__features').innerHTML = offer.features.length > 0 ? getFeatureTemplate(offer.features) : '';
    card.querySelector('.popup__photos').innerHTML = offer.photos.length > 0 ? getPhotoTemplate(offer.photos) : '';

    return card;
  };

  var setPinActive = function (pin, active) {
    pin.classList[active ? 'add' : 'remove']('map__pin--active');
  };

  // функция удаления класса active
  var removePinActive = function () {
    var activePin = window.domRef.mapPins.querySelector('.map__pin--active:not(.map__pin--main)');
    if (activePin !== null) {
      setPinActive(activePin, false);
    }
  };

  var onCardCloseClick = function (evt) {
    closeCard();
  };

  var onCardEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      closeCard();
    }
  };

  // Функция закрытия карточки объявления
  var closeCard = function () {
    var card = window.domRef.map.querySelector('.map__card');
    if (card !== null) {
      card.remove();
      removePinActive();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  // Функция показа карточки объявления
  var showCard = function (ad) {
    var card = renderCard(ad);
    // Обработчик события закрытие попапа с информацией об объявлении при клике на крестик
    card.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
    // Обработчик события закрытие попапа с информацией об объявлении при нажатии ECS
    document.addEventListener('keydown', onCardEscPress);

    window.domRef.map.appendChild(card);
  };

  // Функция обработчика события показа карточки объявления
  var onMapClick = function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin !== null) {
      closeCard();
      showCard(window.page.ads[+pin.dataset.id]);
      setPinActive(pin, true);
    }
  };

  // Обработчик события открытия карточки объявления
  window.domRef.mapPins.addEventListener('click', onMapClick);

  window.card = {
    close: closeCard,
  };
})();
