'use strict';
(function () {
  var COMMENTS_COUNT_SHOW = 5;
  window.savedPhotos = [];

  var renderUserData = function () {
    document.querySelector('.big-picture__img').src = window.savedPhotos[window.index].url;
    document.querySelector('.likes-count').textContent = window.savedPhotos[window.index].likes;
    document.querySelector('.comments-count').textContent = window.savedPhotos[window.index].comments.length;
    document.querySelector('.social__caption').textContent = window.savedPhotos[window.index].description;
    document.querySelector('.social__picture').src = 'img/avatar-' + window.getRandomNumber(1, 7) + '.svg';
    return renderUserData;
  };

  window.setListners = function () {
    document.querySelectorAll('.picture__img').forEach(function (item) {
      item.addEventListener('click', function (evt) {
        window.index = evt.target.getAttribute('data-id');
        window.openBigPicture();
        renderUserData();

        var commentsLoader = document.querySelector('.comments-loader');
        var commentsLength = window.savedPhotos[window.index].comments.length;
        var commentsCopy = window.savedPhotos[window.index].comments.slice();
        window.savedPhotos[window.index].comments = window.savedPhotos[window.index].comments.slice(0, COMMENTS_COUNT_SHOW);
        window.renderComments(window.savedPhotos[window.index]);

        commentsLoader.addEventListener('click', function () {
          document.querySelector('.social__comment-count').classList.add('hidden');

          if (COMMENTS_COUNT_SHOW < commentsLength) {
            COMMENTS_COUNT_SHOW += COMMENTS_COUNT_SHOW;
            window.savedPhotos[window.index].comments = commentsCopy.slice(0, COMMENTS_COUNT_SHOW);
            if (COMMENTS_COUNT_SHOW >= commentsLength) {
              document.querySelector('.comments-loader').classList.add('hidden');
            }
          }
          window.renderComments(window.savedPhotos[window.index]);
        });
      });
    });
  };
})();
