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

  // Функция показа карточки объявления
  var onDataLoad = function (ad) {
    window.domRef.map.appendChild(renderCard(ad));
  };

  // функция удаления класса active
  var removeClassActive = function () {
    var pinActive = window.domRef.mapPins.querySelector('.map__pin--active:not(.map__pin--main)');
    if (pinActive !== null) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  // Функция закрытия карточки объявления
  var closeCard = function () {
    var pinPopup = document.querySelector('.map__card');
    if (window.domRef.map.contains(pinPopup)) {
      window.domRef.map.removeChild(pinPopup);
      removeClassActive();
    }
  };

  // Функция загрузки карточки объявления из сервера
  var loadCard = function () {
    window.backend.load(onDataLoad, window.pin.onDataLoadError);
  };

  // Функция обработчика события показа карточки объявления
  var onPinShow = function (evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin !== null) {
      closeCard();
      loadCard();
      pin.classList.add('map__pin--active');
    }
  };

  // Обработчик события открытия карточки объявления
  window.domRef.mapPins.addEventListener('click', onPinShow);

  // Обработчик события закрытие попапа с информацией об объявлении при нажатии ECS
  document.addEventListener('keydown', function (evt) {
    if (window.util.isEscKey(evt)) {
      closeCard();
    }
  });

  // Обработчик события закрытие попапа с информацией об объявлении при клике на крестик
  document.addEventListener('click', function (evt) {
    if (evt.target.matches('.popup__close')) {
      closeCard();
    }
  });

  window.card = {
    close: closeCard,
    load: loadCard,
  };
})();
