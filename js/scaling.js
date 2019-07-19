'use strict';

(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadPreview = document.querySelector('.img-upload__preview');

  scaleControlBigger.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) < 100) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) + 25 + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
    } else {
      scaleControlValue.value = 100 + '%';
    }
  });

  scaleControlSmaller.addEventListener('click', function () {
    if (parseInt(scaleControlValue.value, 10) > 25) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) - 25 + '%';
      imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value, 10) / 100 + ')';
    } else {
      scaleControlValue.value = 25 + '%';
    }
  });
})();
