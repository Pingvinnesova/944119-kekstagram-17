'use strict';
(function () {

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
        var commentsCommentShow = 5;
        var socialCounter = document.querySelector('.comment-counter');
        socialCounter.textContent = 5;
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
        if (commentsLength <= 5) {
          commentsLoader.classList.add('hidden');
          socialCommentCount.classList.add('hidden');
        }
        var commentsCopy = currentPhoto.comments.slice();
        currentPhoto.comments = currentPhoto.comments.slice(0, commentsCommentShow);
        window.renderComments(currentPhoto);
        // var commentsCount = document.querySelector('.comment-count');

        commentsLoader.addEventListener('click', function () {
          // socialCommentCount.classList.add('hidden');
          if (commentsCommentShow < commentsLength) {

            commentsCommentShow += 5;
            socialCounter.textContent = commentsCommentShow;
            currentPhoto.comments = commentsCopy.slice(0, commentsCommentShow);

            if (commentsCommentShow >= commentsLength) {
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

      var onSmallPictureEnter = function (evt) {
        if (evt.keyCode === window.KeyCode.ENTER_KEYCODE) {
          renderData();
        }
        return onSmallPictureEnter;
      };

      // enter на сфокусированную миниатюру
      item.addEventListener('keydown', onSmallPictureEnter);
    });
  };
})();
