'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) {
    form.querySelector('.img-upload__submit').setAttribute('disabled', 'disabled');
    window.upload(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  var main = document.querySelector('main');

  var successTemplate = document.querySelector('#success').content;

  var renderMessageSuccess = function () {
    return successTemplate.cloneNode(true);
  };

  var errorTemplate = document.querySelector('#error').content;

  var renderMessageError = function () {
    return errorTemplate.cloneNode(true);
  };

  var fragment = document.createDocumentFragment();

  var successHandler = function () {
    form.querySelector('.img-upload__submit').removeAttribute('disabled', 'disabled');
    window.closeImgUpload();
    fragment.appendChild(renderMessageSuccess());
    main.appendChild(fragment);

    var successButton = document.querySelector('.success__button');
    var success = document.querySelector('.success');

    var closeSuccessMessage = function () {
      success.remove();
      document.removeEventListener('keydown', onEscSuccessMessageClick);
      successButton.removeEventListener('keydown', onEnterSuccessMessageClick);
    };

    var onEscSuccessMessageClick = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC_KEYCODE) {
        closeSuccessMessage();
      }
      return onEscSuccessMessageClick;
    };

    var onEnterSuccessMessageClick = function (evt) {
      if (evt.keyCode === window.KeyCode.ENTER_KEYCODE) {
        closeSuccessMessage();
      }
      return onEnterSuccessMessageClick;
    };

    document.addEventListener('keydown', onEscSuccessMessageClick);
    successButton.addEventListener('keydown', onEnterSuccessMessageClick);

    document.addEventListener('click', function () {
      closeSuccessMessage();
    });

    successButton.addEventListener('click', function () {
      closeSuccessMessage();
    });

  };

  var errorHandler = function () {

    window.Preview.imgUpload.classList.add('hidden');
    fragment.appendChild(renderMessageError());
    main.appendChild(fragment);

    var errorButton = document.querySelector('.error__button');
    var error = document.querySelector('.error');

    var closeErrorMessage = function () {
      error.remove();
      document.removeEventListener('keydown', onEscErrorMessageClick);
      errorButton.removeEventListener('keydown', onEscErrorMessageClick);
    };

    var onEscErrorMessageClick = function (evt) {
      if (evt.keyCode === window.KeyCode.ESC_KEYCODE) {
        closeErrorMessage();
      }
      return onEscErrorMessageClick;
    };

    var onEnterErrorMessageClick = function (evt) {
      if (evt.keyCode === window.KeyCode.ENTER_KEYCODE) {
        closeErrorMessage();
      }
      return onEnterErrorMessageClick;
    };

    document.addEventListener('keydown', onEscErrorMessageClick);
    errorButton.addEventListener('keydown', onEscErrorMessageClick);

    document.addEventListener('click', function () {
      closeErrorMessage();
    });

    errorButton.addEventListener('click', function () {
      closeErrorMessage();
    });
  };
})();
