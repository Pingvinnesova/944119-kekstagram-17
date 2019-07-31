'use strict';

(function () {

  window.KeyCode = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadClose = document.querySelector('.img-upload__cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var onImgUploadEscPress = function (evt) {
    if (window.someVariable.textDescription === document.activeElement || window.someVariable.textHashtags === document.activeElement) {
      return evt;
    } else if (evt.keyCode === window.KeyCode.ESC_KEYCODE) {
      window.closeImgUpload();
    }
    return onImgUploadEscPress;
  };

  var onImgUploadEnterPress = function (evt) {
    if (evt.keyCode === window.KeyCode.ENTER_KEYCODE) {
      window.closeImgUpload();
    }
  };

  var openImgUpload = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImgUploadEscPress);
    imgUploadClose.addEventListener('keydown', onImgUploadEnterPress);
    window.someVariable.textDescription.value = '';
    window.someVariable.textDescription.removeAttribute('style');
  };

  var resetfilterPreview = function () {
    window.Preview.imgUploadPreview.className = 'img-upload__preview';
    window.Preview.imgUploadPreview.style = null;
    window.Preview.effectLevelPin.style.left = 100 + '%';
    window.Preview.effectLevelDepth.style.width = 100 + '%';
    window.Preview.effectLevelValue.value = 100 + '%';
    window.Preview.effectLevel.classList.add('hidden');
    return resetfilterPreview;
  };

  window.closeImgUpload = function () {
    resetfilterPreview();
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.reset();
    uploadFile.value = null;
    window.someVariable.textDescription.removeAttribute('value');
    window.someVariable.textDescription.removeAttribute('style');
    window.someVariable.textHashtags.removeAttribute('value');
    window.someVariable.textHashtags.removeAttribute('style');
    window.someVariable.textHashtags.setCustomValidity('');
    document.removeEventListener('keydown', onImgUploadEscPress);
    imgUploadClose.removeEventListener('keydown', onImgUploadEnterPress);
  };

  uploadFile.addEventListener('change', function () {
    openImgUpload();
  });

  imgUploadClose.addEventListener('click', function () {
    window.closeImgUpload();
  });
})();
