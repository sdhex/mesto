const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button')
const popup = document.querySelector('.popup');

let profileTitle = document.querySelector('.profile__name').textContent;
let profileDescription = document.querySelector('.profile__description').textContent;

let popupTitle = document.querySelector('.popup__input_type_name');
let popupDescription = document.querySelector('.popup__input_type_description');

buttonEdit.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupTitle.value = profileTitle;
  popupDescription.value = profileDescription;
});

buttonClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

