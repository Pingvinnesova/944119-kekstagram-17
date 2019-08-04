'use strict';
(function () {
  var ORIGINAL_COMMENT_COUNT = 5;
  window.savedPhotos = [];

  var renderUserData = function (currentPhoto) {
    document.querySelector('.big-picture__img img').src = currentPhoto.url;
    document.querySelector('.likes-count').textContent = currentPhoto.likes;
    document.querySelector('.comments-count').textContent = currentPhoto.comments.length;
    document.querySelector('.social__caption').textContent = currentPhoto.description;
    document.querySelector('.social__picture').src = 'img/avatar-' + window.getRandomNumber(1, 7) + '.svg';
  };

  window.setListeners = function () {
    var allPictures = document.querySelectorAll('.picture__img');
    allPictures.forEach(function (item) {
      var renderData = function () {
        var commentsCountShow = 5;
        var socialCounter = document.querySelector('.comment-counter');
        socialCounter.textContent = ORIGINAL_COMMENT_COUNT;
        var currentPhoto;
        window.id = item.getAttribute('data-id');
        window.savedPhotos.forEach(function (savedPhotoItem) {
          if (savedPhotoItem.id === parseFloat(window.id)) {
            currentPhoto = savedPhotoItem;
          }
        });

        window.openBigPicture();
        renderUserData(currentPhoto);
        var commentsLoader = document.querySelector('.comments-loader');
        var socialCommentCount = document.querySelector('.social__comment-count');

        commentsLoader.classList.remove('hidden');
        socialCommentCount.classList.remove('hidden');

        var commentsLength = currentPhoto.comments.length;
        if (commentsLength <= ORIGINAL_COMMENT_COUNT) {
          commentsLoader.classList.add('hidden');
          socialCommentCount.classList.add('hidden');
        }
        var commentsCopy = currentPhoto.comments.slice();
        currentPhoto.comments = currentPhoto.comments.slice(0, commentsCountShow);
        window.renderComments(currentPhoto);

        commentsLoader.addEventListener('click', function () {
          // socialCommentCount.classList.add('hidden');
          if (commentsCountShow < commentsLength) {

            commentsCountShow += ORIGINAL_COMMENT_COUNT;
            socialCounter.textContent = commentsCountShow;
            currentPhoto.comments = commentsCopy.slice(0, commentsCountShow);

            if (commentsCountShow >= commentsLength) {
              commentsLoader.classList.add('hidden');
              socialCommentCount.classList.add('hidden');
            }
          }
          window.renderComments(currentPhoto);
        });
      };

      item.addEventListener('click', function () {
        renderData();
      });
    });
  };
})();
