'use strict';

(function () {

  window.Preview.effectLevelPin.addEventListener('mousedown', function (evt) {

    evt.preventDefault();


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var effects = [
        {
          key: 'chrome',
          style: 'filter: grayscale(' + (((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth / 100) + ')'
        },

        {
          key: 'sepia',
          style: 'filter: sepia(' + (((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth / 100) + ')'
        },

        {
          key: 'marvin',
          style: 'filter: invert(' + (((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth) + '%)'
        },

        {
          key: 'phobos',
          style: 'filter: blur(' + (3 * (((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth / 100)) + 'px)'
        },

        {
          key: 'heat',
          style: 'filter: brightness(' + ((2 * (((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth / 100)) + 1) + ')'
        }
      ];

      if ((((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth) <= 100 && (((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth) >= 0) {

        window.Preview.effectLevelPin.style.left = (((window.Preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.Preview.effectLevelLine.offsetWidth) + '%';
        window.Preview.effectLevelDepth.style.width = window.Preview.effectLevelPin.style.left;
        window.Preview.effectLevelValue.value = window.Preview.effectLevelPin.style.left;

        for (var i = 0; i < effects.length; i++) {
          if (window.Preview.imgUploadPreview.classList.contains('effects--' + effects[i].key)) {
            document.querySelector('.effects__preview--' + effects[i].key).style = effects[i].style;
          }
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
