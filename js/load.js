'use strict';

var savedPhotos = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// var rndNumber = getRandomNumber(1, 7);

var renderComments = function (array) {
   var socialComments = document.querySelector('.social__comments');
      socialComments.innerHTML = '';
  for (var i = 0; i < array.comments.length; i++) {
        var li = document.createElement('li');
        li.classList.add('social__comment');
        socialComments.appendChild(li);
        var rndNumber = getRandomNumber(1, 7);
        var img = document.createElement('img');
        img.classList.add('social__picture');
        img.src = 'img/avatar-' + getRandomNumber(1, 7) + '.svg';
        img.alt = array.comments[i].name;
        img.width = '35';
        img.height = '35';
        li.appendChild(img);

        var p = document.createElement('p');
        p.classList.add('social__text');
        p.textContent = array.comments[i].message;
        li.appendChild(p);
    }
  };


var setListners = function () {
  document.querySelectorAll('.picture__img').forEach(function (item) {
    item.addEventListener('click', function(event) {
      var index = event.target.getAttribute('data-id');
      console.log(savedPhotos[index].message);
      var bigPicture = document.querySelector('.big-picture');
      bigPicture.classList.remove('hidden');
      document.querySelector('.big-picture__img').src = savedPhotos[index].url;
      document.querySelector('.likes-count').textContent = savedPhotos[index].likes;
      document.querySelector('.comments-count').textContent = savedPhotos[index].comments.length;
      document.querySelector('.social__caption').textContent = savedPhotos[index].description;
      document.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 7) + '.svg';

      var commentsLength = savedPhotos[index].comments.length;
      var commentsCopy = savedPhotos[index].comments.slice();
      var count = 5;
      savedPhotos[index].comments = savedPhotos[index].comments.slice(0, count);
      renderComments(savedPhotos[index]);

      var commentsLoader = document.querySelector('.comments-loader');
      commentsLoader.addEventListener('click', function() {
        document.querySelector('.social__comment-count').classList.add('hidden');
        if (count < commentsLength) {
          count += count;
          console.log(count);
          savedPhotos[index].comments = commentsCopy.slice(0, count);
          if (count >= commentsLength) {
            document.querySelector('.comments-loader').classList.add('hidden');
          }
        }
          renderComments(savedPhotos[index]);
      });
    });
  });
};

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
    window.removePhoto();
    window.debounce(updatesOriginalPictures);
  });

  // 10 случайных, не повторяющихся

  var filterNew = document.querySelector('#filter-new');

  filterNew.addEventListener('click', function () {
    window.removePhoto();
    window.debounce(updatesRandomPictures);
  });

  // В порядке убывания кол-ва комментов

  var filterDiscussed = document.querySelector('#filter-discussed');

  filterDiscussed.addEventListener('click', function () {
    window.removePhoto();
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

  var picturesList = document.querySelector('.pictures');

  var renderPhoto = function (photoElement, id) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').setAttribute('data-id', id);
    pictureElement.querySelector('.picture__img').src = photoElement.url;
    pictureElement.querySelector('.picture__likes').textContent = photoElement.likes;
    pictureElement.querySelector('.picture__comments').textContent = photoElement.comments.length;

    return pictureElement;
  };

  var removeChild = function (elements, block) {
    for (var i = 0; i < elements.length; i++) {
      block.removeChild(elements[i]);
    }
  }

  window.removePhoto = function () {
    removeChild(picturesList.querySelectorAll('.picture'), picturesList)
  }

  window.render = function (data) {
    var takeNumber = data.length > 25 ? 25 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      picturesList.appendChild(renderPhoto(data[i], i));
    }

    setListners();
  };
})();

