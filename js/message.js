'use strict';

(function () {
  var MessageType = {
    SUCCESS: 'success',
    ERROR: 'error',
  };

  var TEXT_CLASSES = [
    'success__message',
    'error__message',
  ];

  var messageBlock = null;

  // Функция закрытия блока с сообщением
  var removeMessageBlock = function () {
    messageBlock.remove();
    messageBlock = null;
    document.removeEventListener('keydown', onMessageBlockEscPress);
  };

  var isNotTextBlock = function (evt) {
    return TEXT_CLASSES.indexOf(evt.target.className) === -1;
  };

  // Функция обработчика события закрытия блока с сообщением при нажатии кнопки мыши
  var onMessageBlockClick = function (evt) {
    if (isNotTextBlock(evt)) {
      removeMessageBlock();
    }
  };

  // Функция обработчика события закрытия блока с сообщением при нажатии кнопки esc
  var onMessageBlockEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      removeMessageBlock();
    }
  };

  // Функция добавления обработчиков события открытия и закрытия окна с сообщением
  var addEventListeners = function () {
    messageBlock.addEventListener('click', onMessageBlockClick);
    document.addEventListener('keydown', onMessageBlockEscPress);
  };

  var makeMessage = function (type) {
    return function showMessage(message) {
      messageBlock = window.domRef.messageToTemplate[type].cloneNode(true);
      if (message) {
        messageBlock.querySelector('.' + type + '__message').textContent = message;
      }

      window.domRef.map.appendChild(messageBlock);
      addEventListeners();
    };
  };

  window.message = {
    showError: makeMessage(MessageType.ERROR),
    showSuccess: makeMessage(MessageType.SUCCESS),
  };
})();
