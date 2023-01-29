const buttonEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

const popupForm = document.querySelector('.popup__form');

function popupOpen() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
};

function popupClose() {
  popup.classList.remove('popup_opened');
};

buttonEdit.addEventListener('click', popupOpen);
buttonClose.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
};

popupForm.addEventListener('submit', handleFormSubmit);
