'use strict';

(function () {
  var DELAY = 500; // ms

  window.debounce = function (onDelay) {
    var lastTimeoutId = 0;

    return function () {
      var parameters = arguments;

      if (lastTimeoutId > 0) {
        window.clearTimeout(lastTimeoutId);
      }

      lastTimeoutId = window.setTimeout(function () {
        onDelay.apply(null, parameters);
      }, DELAY);
    };
  };
})();
