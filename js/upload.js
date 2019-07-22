'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

// Подписываемся на событие submit и отправляе данные формы на сервер

var form = document.querySelector('.img-upload__form');

form.addEventListener('submit', function (evt) {
  form.querySelector('.img-upload__submit').setAttribute('disabled', 'disabled');
  window.upload(new FormData(form), function () {
    form.querySelector('.img-upload__submit').removeAttribute('disabled', 'disabled');
    document.querySelector('.img-upload').classList.add('hidden');
  });
  evt.preventDefault();
});
