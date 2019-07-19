'use strict';

(function () {

  var ESC_KEYCODE = 27;


  var uploadFile = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadClose = document.querySelector('.img-upload__cancel');
  var textDescription = document.querySelector('.text__description');

  var onImgUploadEscPress = function (evt) {
    if (textDescription === document.activeElement) {
      return evt;
    } else if (evt.keyCode === ESC_KEYCODE) {
      closeImgUpload();
    }
    return onImgUploadEscPress();
  };

  var openImgUpload = function () {
    imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
  };

  var closeImgUpload = function () {
    imgUpload.classList.add('hidden');
    uploadFile.value = null;
    document.removeEventListener('keydown', onImgUploadEscPress);
  };

  uploadFile.addEventListener('change', function () {
    openImgUpload();
  });

  imgUploadClose.addEventListener('click', function () {
    closeImgUpload();
  });
})();
