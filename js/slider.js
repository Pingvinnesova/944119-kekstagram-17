'use strict';

(function () {

  window.preview.effectLevelPin.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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
          style: 'filter: grayscale(' + (((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth / 100) + ')'
        },

        {
          key: 'sepia',
          style: 'filter: sepia(' + (((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth / 100) + ')'
        },

        {
          key: 'marvin',
          style: 'filter: invert(' + (((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth) + '%)'
        },

        {
          key: 'phobos',
          style: 'filter: blur(' + (3 * (((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth / 100)) + 'px)'
        },

        {
          key: 'heat',
          style: 'filter: brightness(' + ((2 * (((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth / 100)) + 1) + ')'
        }
      ];

      if ((((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth) <= 100 && (((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth) >= 0) {

        window.preview.effectLevelPin.style.left = (((window.preview.effectLevelPin.offsetLeft - shift.x) * 100) / window.preview.effectLevelLine.offsetWidth) + '%';
        window.preview.effectLevelDepth.style.width = window.preview.effectLevelPin.style.left;
        window.preview.effectLevelValue.value = window.preview.effectLevelPin.style.left;

        for (var i = 0; i < effects.length; i++) {
          if (window.preview.imgUploadPreview.classList.contains('effects--' + effects[i].key)) {
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

  // При нажатии мыши на слайдер

  window.preview.effectLevelLine.addEventListener('mouseup', function (evt) {
    evt.preventDefault();

    var startCoordsNew = {
      x: evt.offsetX,
      y: evt.offsetY
    };

    window.preview.effectLevelPin.style.left = (startCoordsNew.x * 100) / window.preview.effectLevelLine.offsetWidth + '%';
    window.preview.effectLevelDepth.style.width = window.preview.effectLevelPin.style.left;
    window.preview.effectLevelValue.value = window.preview.effectLevelPin.style.left;


    var effects = [
      {
        key: 'chrome',
        style: 'filter: grayscale(' + ((startCoordsNew.x * 100) / window.preview.effectLevelLine.offsetWidth / 100) + ')'
      },

      {
        key: 'sepia',
        style: 'filter: sepia(' + ((startCoordsNew.x * 100) / window.preview.effectLevelLine.offsetWidth / 100) + ')'
      },

      {
        key: 'marvin',
        style: 'filter: invert(' + (startCoordsNew.x * 100) / window.preview.effectLevelLine.offsetWidth + '%)'
      },

      {
        key: 'phobos',
        style: 'filter: blur(' + (3 * ((startCoordsNew.x * 100) / window.preview.effectLevelLine.offsetWidth / 100)) + 'px)'
      },

      {
        key: 'heat',
        style: 'filter: brightness(' + ((2 * ((startCoordsNew.x * 100) / window.preview.effectLevelLine.offsetWidth / 100)) + 1) + ')'
      }
    ];

    for (var i = 0; i < effects.length; i++) {
      if (window.preview.imgUploadPreview.classList.contains('effects--' + effects[i].key)) {
        document.querySelector('.effects__preview--' + effects[i].key).style = effects[i].style;
      }
    }
  });
})();
