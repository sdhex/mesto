const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let popupName = document.querySelector('.popup__input_type_name');
let popupDescription = document.querySelector('.popup__input_type_description');

let popupForm = document.querySelector('.popup__form');

buttonEdit.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

buttonClose.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});


function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popup.classList.remove('popup_opened');
}

popupForm.addEventListener('submit', handleFormSubmit);
