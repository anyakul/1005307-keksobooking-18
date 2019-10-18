'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var DATA_URL = URL + '/data';
  var STATUS_SUCCESS = 200;

  // Обращение к серверу и обработка возможных ошибок
  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Прeвышено время ожидания ответа от сайта. Запрос не успел выполниться за ' + xhr.TIMEOUT + 'мс');
    });

    xhr.TIMEOUT = 15000;

    return xhr;
  };

  // Загрузка данных с сервера
  var load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  window.backend = {
    load: load,
  };
})();
