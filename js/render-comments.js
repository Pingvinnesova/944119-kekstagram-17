'use strict';

(function () {
  var AVATAR_COUNT = 7;
  window.renderComments = function (array) {
    var socialComments = document.querySelector('.social__comments');
    socialComments.innerHTML = '';
    for (var i = 0; i < array.comments.length; i++) {
      var li = document.createElement('li');
      li.classList.add('social__comment');
      socialComments.appendChild(li);
      var img = document.createElement('img');
      img.classList.add('social__picture');
      img.src = 'img/avatar-' + window.getRandomNumber(1, AVATAR_COUNT) + '.svg';
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
})();
