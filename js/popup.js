'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.KeyCode.ESC_KEYCODE) {
      closeBigPicture();
    }
    return onBigPictureEscPress;
  };

  var onBigPictureEnterPress = function (evt) {
    if (evt.keyCode === window.KeyCode.ENTER_KEYCODE) {
      closeBigPicture();
    }
    return onBigPictureEnterPress;
  };

  window.openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
    bigPictureCancel.addEventListener('keydown', onBigPictureEnterPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    bigPictureCancel.removeEventListener('keydown', onBigPictureEnterPress);
  };

  bigPictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });
})();

