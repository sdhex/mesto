export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '5760e1bd-a575-4d8a-8630-9dac34ee6bda',
    'Content-Type': 'application/json'
  }
}

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddImage = document.querySelector('.profile__add-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');

export const formValidators = {};
