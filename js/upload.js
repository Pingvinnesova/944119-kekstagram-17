'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/';

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

// Подписываемся на событие submit и отправляе данные формы на сервер

var form = document.querySelector('.img-upload__form');

form.addEventListener('submit', function (evt) {
  form.querySelector('.img-upload__submit').setAttribute('disabled', 'disabled');
  window.upload(new FormData(form), successHandler, errorHandler)
  evt.preventDefault();
});

  var main = document.querySelector('main');

  var successTemplate = document.querySelector('#success').content;

  var renderMessageSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    return successElement;
  };

    var errorTemplate = document.querySelector('#error').content;

  var renderMessageError = function () {
    var errorElement = errorTemplate.cloneNode(true);
    return errorElement;
  };

var successHandler = function () {
  console.log('успех');
  form.querySelector('.img-upload__submit').removeAttribute('disabled', 'disabled');
  document.querySelector('.img-upload').classList.add('hidden');

  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMessageSuccess());
  main.appendChild(fragment);
};

var errorHandler = function () {
  console.log('ошибка');
  document.querySelector('.img-upload').classList.add('hidden');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderMessageError());
  main.appendChild(fragment);
};

// Пример



  // var successHandler = function (wizards) {
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < 4; i++) {
  //     fragment.appendChild(renderWizard(wizards[i]));
  //   }
  //   similarListElement.appendChild(fragment);

  //   userDialog.querySelector('.setup-similar').classList.remove('hidden');
  // };
































// 'use strict';

// (function () {
//   var URL = 'https://js.dump.academy/kekstagram/';

//   window.upload = function (data, onSuccess) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.addEventListener('load', function () {
//       onSuccess(xhr.response);
//     });

//     xhr.open('POST', URL);
//     xhr.send(data);
//   };
// })();

// // Подписываемся на событие submit и отправляе данные формы на сервер

// var form = document.querySelector('.img-upload__form');

// form.addEventListener('submit', function (evt) {
//   form.querySelector('.img-upload__submit').setAttribute('disabled', 'disabled');
//   window.upload(new FormData(form), function () {
//     form.querySelector('.img-upload__submit').removeAttribute('disabled', 'disabled');
//     document.querySelector('.img-upload').classList.add('hidden');
//   });
//   evt.preventDefault();
// });
