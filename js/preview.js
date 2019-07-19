'use strict';

(function () {

  var effectsRadio = document.querySelectorAll('.effects__radio');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevel = document.querySelector('.effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');

  window.preview = {
    imgUploadPreview: imgUploadPreview,
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
    effectLevelLine: effectLevelLine,
    effectLevelValue: effectLevelValue,
  };

  effectLevel.classList.add('hidden');
  effectLevelPin.style.left = 100 + '%';
  effectLevelDepth.style.width = 100 + '%';
  effectLevelValue.value = 100 + '%';

  var addFilter = function (pictureEffects) {
    pictureEffects.addEventListener('click', function (evt) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.style = null;
      effectLevelPin.style.left = 100 + '%';
      effectLevelDepth.style.width = 100 + '%';
      effectLevelValue.value = 100 + '%';
      imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
      imgUploadPreview.classList.add('effects--' + evt.target.value);
      if (document.getElementById('effect-none').checked) {
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
