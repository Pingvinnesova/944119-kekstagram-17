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

// ------------------

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var uploadFile = document.querySelector('#upload-file');
var imgUpload = document.querySelector('.img-upload__overlay');
var imgUploadClose = document.querySelector('.img-upload__cancel');

var onImgUploadEscPress = function (evt) {
 if (evt.keyCode === ESC_KEYCODE) {
    closeImgUpload();
  }
};

// var onPopupEscPress = function (evt) {
//   if (userName === document.activeElement) {
//     return evt;
//   } else if (evt.keyCode === ESC_KEYCODE) {
//     closePopup();
//   }
//   return onPopupEscPress();
// };

var openImgUpload = function () {
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onImgUploadEscPress);
};

var closeImgUpload = function () {
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', onImgUploadEscPress);
};

uploadFile.addEventListener('change', function () {
  openImgUpload();
});

imgUploadClose.addEventListener('click', function () {
  closeImgUpload();
});

// ---------------

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview');

scaleControlBigger.addEventListener('click', function () {
  if (parseInt(scaleControlValue.value) < 100) {
    scaleControlValue.value = parseInt(scaleControlValue.value) + 25 + '%';
    imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value) / 100 + ')';
  } else {
    scaleControlValue.value = 100 + '%';
  }
});

scaleControlSmaller.addEventListener('click', function() {
  if (parseInt(scaleControlValue.value) > 25) {
    scaleControlValue.value = parseInt(scaleControlValue.value) - 25 + '%';
    imgUploadPreview.style.transform = 'scale(' + parseInt(scaleControlValue.value) / 100 + ')';
  } else {
    scaleControlValue.value = 25 + '%';
  }
});

var effectsRadio = document.querySelectorAll('.effects__radio');
var preview = document.querySelector('.img-upload__preview');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level');
var proba = document.querySelector('img-upload__effect-level');
var effectLevelValue = document.querySelector('.effect-level__value');

effectLevel.classList.add('hidden');
effectLevelValue.value = 100;

var addFilter = function(pictureEffects) {
  pictureEffects.addEventListener('click', function(evt) {
  preview.className = 'img-upload__preview';
  preview.classList.add('effects__preview--' + evt.target.value);

  if (document.getElementById('effect-none').checked) {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
});
};

for (i = 0; i<effectsRadio.length; i++) {
  addFilter(effectsRadio[i]);
}

effectLevelPin.addEventListener('mouseup', function() {
});
