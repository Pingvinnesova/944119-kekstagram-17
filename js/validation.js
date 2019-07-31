'use strict';

(function () {

  var MAX_COMMENT_LENGTH = 140;
  var MAX_HASHTAG_LENGTH = 20;
  var HASHTAG_COUNT = 5;
  var SPACE = ' ';
  var HASHTAG_SYMBOL = 1;

  var addRedBorder = function (inp) {
    inp.style.border = '1px solid red';
  };

  var removeRedBorder = function (inp) {
    inp.removeAttribute('style');
  };

  window.someVariable.textDescription.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > MAX_COMMENT_LENGTH) {
      target.setCustomValidity('Комментарий не должен превышать 140 символов');
      addRedBorder(window.someVariable.textDescription);
    } else {
      target.setCustomValidity('');
      removeRedBorder(window.someVariable.textDescription);
    }
  });

  var arrayOfHashtags = [];

  var turnStringToArray = function () {
    arrayOfHashtags = window.someVariable.textHashtags.value.split(SPACE);
  };

  var checkUnique = function (array) {
    var obj = {};
    for (var i = 0; i < array.length; i++) {
      if (obj[array[i].toLowerCase()]) {
        return false;
      }
      obj[array[i].toLowerCase()] = true;
    }
    return true;
  };

  window.someVariable.textHashtags.addEventListener('change', function () {
    turnStringToArray();
  });

  window.someVariable.textHashtags.addEventListener('input', function (evt) {
    turnStringToArray();
    var target = evt.target;
    if ((arrayOfHashtags.length + 1) > HASHTAG_COUNT) {
      target.setCustomValidity('Хештегов не может быть больше 5х');
      addRedBorder(window.someVariable.textHashtags);
    } else {
      target.setCustomValidity('');
      removeRedBorder(window.someVariable.textHashtags);
      window.someVariable.textHashtags.removeAttribute('value');
      window.someVariable.textHashtags.removeAttribute('style');
    }

    for (var i = 0; i < arrayOfHashtags.length; i++) {
      if (!arrayOfHashtags[i].startsWith('#')) {
        target.setCustomValidity('Хештег должен начинаться с #');
        addRedBorder(window.someVariable.textHashtags);
      } else if (arrayOfHashtags[i].length > MAX_HASHTAG_LENGTH) {
        target.setCustomValidity('Длина 1го хештега не больше 20 символов');
        addRedBorder(window.someVariable.textHashtags);
      } else if (arrayOfHashtags[i].length === HASHTAG_SYMBOL) {
        target.setCustomValidity('Хештег не может состоять из 1го символа');
        addRedBorder(window.someVariable.textHashtags);
      } else if (!checkUnique(arrayOfHashtags)) {
        target.setCustomValidity('Хештеги не должны повторяться');
        addRedBorder(window.someVariable.textHashtags);
      } else {
        target.setCustomValidity('');
        removeRedBorder(window.someVariable.textHashtags);
        window.someVariable.textHashtags.removeAttribute('value');
        window.someVariable.textHashtags.removeAttribute('style');
      }
    }
  });
})();
