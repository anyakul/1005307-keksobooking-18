'use strict';

(function () {
  var messageBlock = null;

  // Функция закрытия блока с сообщением
  var removeMessageBlock = function () {
    messageBlock.remove();
    messageBlock = null;
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscPress);
  };

  // Функция обработчика события закрытия блока с сообщением при нажатии кнопки мыши
  var onDocumentClick = function () {
    removeMessageBlock();
  };

  // Функция обработчика события закрытия блока с сообщением при нажатии кнопки esc
  var onEscPress = function (evt) {
    if (window.util.isEscKey(evt)) {
      removeMessageBlock();
    }
  };

  // Функция добавления обработчиков события открытия и закрытия окна с сообщением
  var addEventListeners = function () {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onEscPress);
  };

  // Функция показа окна с сообщением об ошибке
  var showErrorMessage = function () {
    messageBlock = window.domRef.messageTemplate.error.cloneNode(true);
    window.domRef.map.appendChild(messageBlock);
    addEventListeners();
  };

  // Функция показа окна с сообщением об успешной отправке формы
  var showSuccessMessage = function () {
    messageBlock = window.domRef.messageTemplate.success.cloneNode(true);
    window.domRef.map.appendChild(messageBlock);
    addEventListeners();
  };

  window.message = {
    showError: showErrorMessage,
    showSuccess: showSuccessMessage,
  };
})();
