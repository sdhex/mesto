import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, formValidationConfig } from '../utils/constants.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddImage = document.querySelector('.profile__add-button');

const profileNameInput = document.querySelector('.popup__input_type_profile-name');
const profileDescriptionInput = document.querySelector('.popup__input_type_profile-description');

const validateProfileForm = new FormValidator(document.forms["profile-form"], formValidationConfig);
validateProfileForm.enableValidation();

const validateCardForm = new FormValidator(document.forms["card-form"], formValidationConfig);
validateCardForm.enableValidation();

const popupWithImage = new PopupWithImage('.popup_view-image');
popupWithImage.setEventListeners();

function handleCardClick(card) {
  popupWithImage.open(card);
}

function createCard(cardData) {
  const card = new Card(cardData, '#gallery-template', handleCardClick);
  return card.generateCard();
}

const cardSection = new Section({
  items: initialCards,
  renderer: (items) => {
    cardSection.addItem(createCard(items));
  }
}, '.gallery');
cardSection.renderItems();

const user = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const popupEditProfile = new PopupWithForm(
  '.popup_edit-profile',
  ({ name, description }) => {
    user.setUserInfo({ name, description });
  });
popupEditProfile.setEventListeners();
buttonEditProfile.addEventListener('click', () => {
  profileNameInput.value = user.getUserInfo().name;
  profileDescriptionInput.value = user.getUserInfo().description;
  popupEditProfile.open();
  validateProfileForm.resetValidation();
});

const popupAddImage = new PopupWithForm(
  '.popup_add-image',
  ({ title, link }) => {
    cardSection.addItem(createCard({
      name: title,
      link: link
    }));
  }
);
popupAddImage.setEventListeners();
buttonAddImage.addEventListener('click', () => {
  popupAddImage.open();
  validateCardForm.resetValidation();
});
