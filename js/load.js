'use strict';

// debounce.js

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();

// load.js

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load = function (onSuccess, onError) {
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
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();

// similar.js

(function () {

  var savedPhotos = [];

  // Обновление картинок

  var updatesOriginalPictures = function () {
    window.render(savedPhotos);
  };

  var updatesRandomPictures = function () {
    var uniquePictures = savedPhotos.filter(function (it, i) {
      return savedPhotos.indexOf(it) === i;
    });

    var randomPictures = uniquePictures.sort(function () {
      return 0.5 - Math.random();
    });

    window.render(randomPictures.slice(0, 10));
  };

  var updatesCommentedPictures = function () {
    var savedPhotosCopy = savedPhotos.slice();
    var sortedByComments = savedPhotosCopy.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      return 0;
    });
    window.render(sortedByComments);
  };

  // В изначальном порядке

  var filterPopular = document.querySelector('#filter-popular');

  filterPopular.addEventListener('click', function () {
    window.debounce(updatesOriginalPictures);
  });

  // 10 случайных, не повторяющихся

  var filterNew = document.querySelector('#filter-new');

  filterNew.addEventListener('click', function () {
    window.debounce(updatesRandomPictures);
  });

  // В порядке убывания кол-ва комментов

  var filterDiscussed = document.querySelector('#filter-discussed');

  filterDiscussed.addEventListener('click', function () {
    window.debounce(updatesCommentedPictures);
  });

  var successHandler = function (photo) {

    savedPhotos = photo;

    updatesOriginalPictures();

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
})();

// render.js

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photoElement) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photoElement.url;
    pictureElement.querySelector('.picture__likes').textContent = photoElement.likes;
    pictureElement.querySelector('.picture__comments').textContent = photoElement.comments.length;

    return pictureElement;
  };

  window.render = function (data) {
    var picturesList = document.querySelector('.pictures');
    var takeNumber = data.length > 25 ? 25 : data.length;
    picturesList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      picturesList.appendChild(renderPhoto(data[i]));
    }
  };
})();

// Клик на фото приводит к её открытию

var someArray = [];

for (var i = 0; i < someArray.length; i++) {
  someArray[i].addEventListener('click', function () {
    var bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    document.querySelector('.big-picture__img').src = someArray.url;
    document.querySelector('.likes-count').textContent = someArray.likes;
    document.querySelector('.comments-count').textContent = someArray.comments;
  });
}

