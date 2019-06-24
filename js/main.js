'use strict';

var USERS_COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USERS_NAMES = ['Артём'];

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var picturesList = document.querySelector('.pictures');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var photo = [];

for (var i = 0; i < 25; i++) {
  photo[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: [Math.floor(Math.random() * USERS_COMMENTS.length)],
    avatar: 'img/avatar-' + (Math.floor(Math.random() * 6)) + '.svg',
    message: USERS_COMMENTS[Math.floor(Math.random() * USERS_COMMENTS.length)],
    name: USERS_NAMES[Math.floor(Math.random() * USERS_NAMES.length)]
  };
}

var renderPhoto = function (photoElement) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photoElement.url;
  pictureElement.querySelector('.picture__likes').textContent = photoElement.likes;
  pictureElement.querySelector('.picture__comments').textContent = photoElement.comments;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < photo.length; j++) {
  fragment.appendChild(renderPhoto(photo[j]));
}

picturesList.appendChild(fragment);
