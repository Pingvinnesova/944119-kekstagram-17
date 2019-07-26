// 'use strict';

// (function () {

//   // var pictureTemplate = document.querySelector('#picture')
//   //   .content
//   //   .querySelector('.picture');

//   // var picturesList = document.querySelector('.pictures');

//   // var renderPhoto = function (photoElement) {
//   //   var pictureElement = pictureTemplate.cloneNode(true);

//   //   pictureElement.querySelector('.picture__img').src = photoElement.url;
//   //   pictureElement.querySelector('.picture__likes').textContent = photoElement.likes;
//   //   pictureElement.querySelector('.picture__comments').textContent = photoElement.comments.length;

//   //   return pictureElement;
//   // };

//   // var savedPhotos = [];

//   var successHandler = function (photo) {

//     window.render(photo);
//     // savedPhotos = photo;
//     // // window.render(savedPhotos);

//     // window.render = function () {

//     //   var fragment = document.createDocumentFragment();

//     //   for (var i = 0; i < 25; i++) {
//     //     fragment.appendChild(renderPhoto(photo[i]));
//     //   }
//     //   picturesList.appendChild(fragment);

//     // }

//     var imgFilters = document.querySelector('.img-filters');
//     imgFilters.classList.remove('img-filters--inactive');
//   };

//   var errorHandler = function (errorMessage) {
//     var node = document.createElement('div');
//     node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
//     node.style.position = 'absolute';
//     node.style.left = 0;
//     node.style.right = 0;
//     node.style.fontSize = '30px';

//     node.textContent = errorMessage;
//     document.body.insertAdjacentElement('afterbegin', node);
//   };

//   window.load(successHandler, errorHandler);
// })();
