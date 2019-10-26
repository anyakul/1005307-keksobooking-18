'use strict';

(function () {
  var messageBlock = null;

  var messageTemplate = {
    error: document.querySelector('#error').content.querySelector('.error'),
    success: document.querySelector('#success').content.querySelector('.success'),
  };

  // Функция закрытия блока с сообщением
  var removeMessageBlock = function () {
    messageBlock.remove();
    messageBlock = null;
    document.removeEventListener('mousedown', onDocumentClick);
    document.removeEventListener('keydown', onEscPress);
  };

  // Функция обработчика события закрытия блока с сообщением при нажатии кнопки мыши
  var onDocumentClick = function () {
    removeMessageBlock();
  };

  // Функция обработчика события закрытия блока с сообщением при нажатии кнопки esc
  var onEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      removeMessageBlock(messageBlock);
    }
  };

  // Функция добавления обработчиков события открытия и закрытия окна с сообщением
  var getEventListener = function () {
    document.addEventListener('mousedown', onDocumentClick);
    document.addEventListener('keydown', onEscPress);
  };

  // Функция показа окна с сообщением об ошибке
  var showErrorMessage = function (errorMessage) {
    messageBlock = messageTemplate.error.cloneNode(true);
    window.domRef.map.appendChild(messageBlock);
    messageBlock.querySelector('.error__message').textContent = errorMessage;
    getEventListener();
  };

  // Функция показа окна с сообщением об успешной отправке формы
  var showSuccessMessage = function () {
    messageBlock = messageTemplate.success.cloneNode(true);
    window.domRef.map.appendChild(messageBlock);
    getEventListener();
  };

  window.message = {
    showError: showErrorMessage,
    showSuccess: showSuccessMessage,
  };
})();
