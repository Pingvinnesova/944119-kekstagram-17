'use strict';

(function () {
  var STEP = 25;
  var MAX_PERCENT = 100;
  var MIN_PERCENT = 25;

  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  scaleControlBigger.addEventListener('click', function () {
    enlargeSize();
  });

  scaleControlSmaller.addEventListener('click', function () {
    decreaseSize();
  });

  var enlargeSize = function () {
    if (parseInt(scaleControlValue.value, 10) < MAX_PERCENT) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) + STEP + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / MAX_PERCENT + ')';
    } else {
      scaleControlValue.value = MAX_PERCENT + '%';
    }
    return enlargeSize;
  };

  var decreaseSize = function () {
    if (parseInt(scaleControlValue.value, 10) > MIN_PERCENT) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) - STEP + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / MAX_PERCENT + ')';
    } else {
      scaleControlValue.value = MIN_PERCENT + '%';
    }
    return decreaseSize;
  };
})();
