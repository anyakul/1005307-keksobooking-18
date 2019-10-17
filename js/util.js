'use strict';

(function () {
  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Esc',
    ESCAPE_IE: 'Escape',
  };

  // Функция нажатия на клавишу enter
  var isEnterKey = function (evt) {
    return evt.key === KeyboardKey.ENTER;
  };

  // Функция нажатия на клавишу escape
  var isEscKey = function (evt) {
    return evt.key === KeyboardKey.ESCAPE
      || evt.key === KeyboardKey.ESCAPE_IE;
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

  // Функция удаления элемента
  var removeElement = function (element) {
    element.remove();
  };

  var setDisabled = function (element) {
    element.disabled = true;
  };

  var unsetDisabled = function (element) {
    element.disabled = false;
  };

  // Функция добавления шаблона в разметка
  var addTemplate = function (elem, template) {
    elem = template.cloneNode(true);
    elem.appendChild(template);
  };

  // функция показа ошибки
  var onError = function () {
    addTemplate(window.domRef.errorTemplate);
  };

  window.util = {
    setDisabled: setDisabled,
    unsetDisabled: unsetDisabled,
    isEnterKey: isEnterKey,
    KeyboardKey: KeyboardKey,
    isEscKey: isEscKey,
    pluralize: pluralize,
    removeElement: removeElement,
    addTemplate: addTemplate,
    onError: onError,
  };
})();
