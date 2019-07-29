'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  var uploadFile = document.querySelector('#upload-file');
  var imgUpload = document.querySelector('.img-upload__overlay');
  var imgUploadClose = document.querySelector('.img-upload__cancel');
  window.form.textDescription = document.querySelector('.text__description');
  window.form.textHashtags = document.querySelector('.text__hashtags');

  var onImgUploadEscPress = function (evt) {
    if (window.form.textDescription === document.activeElement || window.form.textHashtags === document.activeElement) {
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
    document.removeEventListener('keydown', onImgUploadEnterPress);
  };

  var onImgUploadEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeImgUpload();
    }
  };

  uploadFile.addEventListener('change', function () {
    openImgUpload();
  });

  imgUploadClose.addEventListener('click', function () {
    closeImgUpload();
  });

  imgUploadClose.addEventListener('keydown', function () {
    onImgUploadEnterPress();
  });
})();

// валидация комментов

// validation.js

(function () {

  var MAX_COMMENT_LENGTH = 140;

  window.form.textDescription.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > MAX_COMMENT_LENGTH) {
      target.setCustomValidity('Комментарий не должен превышать 140 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // Валидация хештегов
  var textHashtags = document.querySelector('.text__hashtags');
  var arrayOfHashtags = [];

  // Из строки в массив
  var stringToArray = function () {
    var space = ' ';
    arrayOfHashtags = textHashtags.value.split(space);
  };

  // Проверка повторяются ли хештеги
  var checkUnique = function (array) {
    var obj = {};
    for (var i = 0; i < array.length; i++) {
      if (obj[array[i]]) {
        return false;
      }
      obj[array[i]] = true;
    }
    return true;
  };

  // Ввод в поле input
  textHashtags.addEventListener('change', function () {
    stringToArray();
  });

  // Валидация введённых хештегов
  textHashtags.addEventListener('input', function (evt) {
    stringToArray();
    var target = evt.target;
    if ((arrayOfHashtags.length + 1) > 5) {
      target.setCustomValidity('Хештегов не может быть больше 5х');
    } else {
      target.setCustomValidity('');
    }
    // Проверка по каждому хештегу
    for (var i = 0; i < arrayOfHashtags.length; i++) {
      if (!arrayOfHashtags[i].startsWith('#')) {
        target.setCustomValidity('Хештег должен начинаться с #');
      }  else if (arrayOfHashtags[i].length > 20) {
        target.setCustomValidity('Длина 1го хештега не больше 20 символов');
      } else if (arrayOfHashtags[i].length === 1) {
        target.setCustomValidity('Хештег не может состоять из 1го символа');
      } else if (!checkUnique(arrayOfHashtags)) {
        target.setCustomValidity('Хештеги не должны повторяться');
      } else {
        target.setCustomValidity('');
      }
    }
  });
})();
