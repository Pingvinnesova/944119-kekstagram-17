'use strict';

(function () {
  var imgUpload = document.querySelector('.img-upload');
  var effectsRadio = document.querySelectorAll('.effects__radio');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');

  window.Preview = {
    imgUpload: imgUpload,
    imgUploadPreview: imgUploadPreview,
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
    effectLevelLine: effectLevelLine,
    effectLevelValue: effectLevelValue,
    effectLevel: effectLevel
  };

  effectLevel.classList.add('hidden');
  effectLevelPin.style.left = 100 + '%';
  effectLevelDepth.style.width = 100 + '%';
  effectLevelValue.value = 100 + '%';

  var addFilter = function (pictureEffects) {

    pictureEffects.addEventListener('click', function (evt) {
      window.Preview.imgUploadPreview.className = 'img-upload__preview';
      window.Preview.imgUploadPreview.style = null;
      window.Preview.effectLevelPin.style.left = 100 + '%';
      window.Preview.effectLevelDepth.style.width = 100 + '%';
      window.Preview.effectLevelValue.value = 100 + '%';
      window.Preview.imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
      window.Preview.imgUploadPreview.classList.add('effects--' + evt.target.value);
      if (document.querySelector('#effect-none').checked) {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }
    });
  };

  for (var i = 0; i < effectsRadio.length; i++) {
    addFilter(effectsRadio[i]);
  }
})();
