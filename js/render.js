// 'use strict';

// (function () {
//   var pictureTemplate = document.querySelector('#picture')
//     .content
//     .querySelector('.picture');

//   var picturesList = document.querySelector('.pictures');

//   var renderPhoto = function (photoElement) {
//     var pictureElement = pictureTemplate.cloneNode(true);

//     pictureElement.querySelector('.picture__img').src = photoElement.url;
//     pictureElement.querySelector('.picture__likes').textContent = photoElement.likes;
//     pictureElement.querySelector('.picture__comments').textContent = photoElement.comments.length;

//     return pictureElement;
//   };

//       window.render = function () {

//       var fragment = document.createDocumentFragment();

//       for (var i = 0; i < 25; i++) {
//         fragment.appendChild(renderPhoto(photo[i]));
//       }
//       picturesList.appendChild(fragment);

//     }
// })();
