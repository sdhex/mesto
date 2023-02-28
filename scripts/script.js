import Card from './Card.js'
import FormValidator from './FormValidator.js';

const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const gallery = document.querySelector('.gallery');

const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddImage = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-image');
const popupViewCard = document.querySelector('.popup_view-image');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const profileNameInput = document.querySelector('.popup__input_type_profile-name');
const profileDescriptionInput = document.querySelector('.popup__input_type_profile-description');
const cardTitleInput = document.querySelector('.popup__input_type_gallery-title');
const cardLinkInput = document.querySelector('.popup__input_type_gallery-link');

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

const imageView = document.querySelector('.popup__image');
const imageViewTitle = document.querySelector('.popup__image-title');

const validateProfileForm = new FormValidator(profileForm, formValidationConfig);
const validateCardForm = new FormValidator(cardForm, formValidationConfig);

validateProfileForm.enableValidation();
validateCardForm.enableValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('mousedown', closeByOverlay);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('mousedown', closeByOverlay);
};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};

buttonOpenEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  validateProfileForm.resetValidation();
});

buttonOpenAddImage.addEventListener('click', () => {
  openPopup(popupAddImage);
  cardForm.reset();
  validateCardForm.resetValidation();
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupEditProfile);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = ({
    name: cardTitleInput.value,
    link: cardLinkInput.value
  });
  gallery.prepend(createGalleryCard(cardData));
  closePopup(popupAddImage);
};

cardForm.addEventListener('submit', handleCardFormSubmit);

function createGalleryCard(cardData) {
  const card = new Card(cardData, '#gallery-template', viewCardImage);
  return card.generateCard();
}

function viewCardImage(title, image) {
  openPopup(popupViewCard);
  imageViewTitle.textContent = title;
  imageView.alt = title;
  imageView.src = image;
}

initialCards.forEach(function(cardData) {
  gallery.append(createGalleryCard(cardData));
})
