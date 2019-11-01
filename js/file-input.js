'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var PhotoSize = {
    WIDTH: 70,
    HEIGHT: 70,
  };

  var addPhoto = function (fileChooser, isPreview, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (isPreview) {
          preview.src = reader.result;
        } else {
          var newPreview = document.createElement('img');
          newPreview.src = reader.result;
          newPreview.width = PhotoSize.WIDTH;
          newPreview.height = PhotoSize.HEIGHT;
          newPreview.alt = 'Фото жилья';
          preview.insertBefore(newPreview, preview.children[preview.children.length - 1]);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var removePicture = function (imgContainer) {
    var pictures = imgContainer.querySelectorAll('img');
    pictures.forEach(function (picture) {
      imgContainer.removeChild(picture);
    });
  };

  window.fileInput = {
    add: addPhoto,
    remove: removePicture,
  };
})();
