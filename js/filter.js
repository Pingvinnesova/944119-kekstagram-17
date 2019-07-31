'use strict';

(function () {

  var RANDOM_PICTURES_COUNT = 10;

  var updatesOriginalPictures = function () {
    window.render(window.savedPhotos);
  };

  var updatesRandomPictures = function () {
    var uniquePictures = window.savedPhotos.filter(function (it, i) {
      return window.savedPhotos.indexOf(it) === i;
    });

    var randomPictures = uniquePictures.sort(function () {
      return 0.5 - Math.random();
    });

    window.render(randomPictures.slice(0, RANDOM_PICTURES_COUNT));
  };

  var updatesCommentedPictures = function () {
    var savedPhotosCopy = window.savedPhotos.slice();
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

  var filterPopular = document.querySelector('#filter-popular');

  filterPopular.addEventListener('click', function () {
    window.removePhoto();
    window.debounce(updatesOriginalPictures);
  });

  var filterNew = document.querySelector('#filter-new');

  filterNew.addEventListener('click', function () {
    window.removePhoto();
    window.debounce(updatesRandomPictures);
  });

  var filterDiscussed = document.querySelector('#filter-discussed');

  filterDiscussed.addEventListener('click', function () {
    window.removePhoto();
    window.debounce(updatesCommentedPictures);
  });

  var successHandler = function (photo) {

    window.savedPhotos = photo;

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
