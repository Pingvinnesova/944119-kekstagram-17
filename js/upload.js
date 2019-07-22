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
  window.upload(new FormData(form), function () {
    // document.querySelector('.social__footer-btn').setAttribute('disabled', 'disabled');
    document.querySelector('.img-upload').classList.add('hidden');
  });
  evt.preventDefault();
});
