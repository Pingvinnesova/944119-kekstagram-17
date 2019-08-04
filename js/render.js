'use strict';

(function () {
  var PICTURE_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var picturesList = document.querySelector('.pictures');

  var renderPhoto = function (photoElement, id) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').setAttribute('data-id', photoElement.id);
    pictureElement.querySelector('.picture__img').src = photoElement.url;
    pictureElement.querySelector('.picture__likes').textContent = photoElement.likes;
    pictureElement.querySelector('.picture__comments').textContent = photoElement.comments.length;

    return pictureElement;
  };

  var removeChild = function (elements, block) {
    for (var i = 0; i < elements.length; i++) {
      block.removeChild(elements[i]);
    }
  };

  window.removePhoto = function () {
    removeChild(picturesList.querySelectorAll('.picture'), picturesList);
  };

  window.render = function (data) {
    var takeNumber = data.length > PICTURE_COUNT ? PICTURE_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      picturesList.appendChild(renderPhoto(data[i], i));
    }

    window.setListeners();
  };
})();
