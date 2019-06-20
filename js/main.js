'use strict';

var USERS_COMMENTS = ['Всё отлично', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USERS_NAMES = [''];

var picture = document.querySelector('#picture');

var photoDescription = [];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomName(name) {
  return name[Math.floor(Math.random() * name.length)];
}

for (var i = 0; i < 25; i++) {
  photoDescription[i] = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: {
      avatar: 'img/avatar-6.svg',
      message: USERS_COMMENTS[Math.floor(Math.random() * USERS_COMMENTS.length)],
      name: USERS_NAMES[Math.floor(Math.random() * USERS_NAMES.length)]
    }
  };
}

var renderPicture = function (photoDescription) {
  var pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img src').textContent = photoDescription.url;
  pictureElement.querySelector('.picture__likes').textContent = photoDescription.likes;
  pictureElement.querySelector('.picture__comments').textContent = photoDescription.likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoDescription.length; i++) {
  fragment.appendChild(renderPicture(photoDescription[i]));
}

picture.appendChild(fragment);
