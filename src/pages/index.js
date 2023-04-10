import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import { formValidationConfig, apiConfig, buttonEditProfile, buttonAddImage, buttonEditAvatar, formValidators } from '../utils/constants.js';

let currentUserId;

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(formValidationConfig);

function createCard(data) {
  const card = new Card({
    data: data,
    handleCardClick: () => {
      popupWithImage.open(data);
    },
    handleLikeClick: () => {
      if (card.isLiked(card.idCard)) {
        api.deleteCardLike(card.idCard)
          .then((data) => {
            card.renderLikes(data.likes);
          })
          .catch(err => console.log(err));
      } else {
        api.addCardLike(card.idCard)
          .then((data) => {
            card.renderLikes(data.likes);
          })
          .catch(err => console.log(err));
      }
    },
    handleDeleteIconClick: () => {
      popupConfirm.open(card);
    },
    userId: currentUserId,
    templateSelector: '#gallery-template'
  });
  return card.generateCard();
}

const cardSection = new Section({
  renderer: (item) => {
    cardSection.addItem(createCard(item));
  },
  containerSelector: '.gallery'
});

const userInfo = new UserInfo(
  {
    nameSelector: '.profile__name',
    aboutSelector: '.profile__description',
    avatarSelector: '.profile__avatar'
  });

const api = new Api(apiConfig);

api.getLoadingData()
  .then(([user, items]) => {
    currentUserId = user._id;
    userInfo.setUserInfo(user);
    cardSection.renderItems(items)
  })
  .catch(err => console.log(err));

const popupWithImage = new PopupWithImage('.popup_view-image');

const popupProfile = new PopupWithForm(
  '.popup_edit-profile',
  {
    handleFormSubmit: (data) => {
      popupProfile.renderLoading(true, 'Сохранение...');
      api.setUserInfo(data)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupProfile.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupProfile.renderLoading(false);
        });
    }
  });

const popupEditAvatar = new PopupWithForm(
  '.popup_edit-avatar',
  {
    handleFormSubmit: (data) => {
      popupEditAvatar.renderLoading(true, 'Сохранение...');
      api.setAvatar(data)
        .then((res) => {
          userInfo.setUserInfo(res)
          popupEditAvatar.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupEditAvatar.renderLoading(false);
        });
    }
  });

const popupAddCard = new PopupWithForm(
  '.popup_add-image',
  {
    handleFormSubmit: (data) => {
      popupAddCard.renderLoading(true, 'Сохранение...');
      api.addCard(data)
        .then((data) => {
          cardSection.addItem(createCard(data));
          popupAddCard.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupAddCard.renderLoading(false);
        });
    }
  });

const popupConfirm = new PopupWithConfirmation(
  '.popup_confirm-delete',
  {
    handleConfirmClick: ({ cardId, card }) => {
      api.deleteCard(cardId)
        .then(() => {
          card.deleteCard();
          popupConfirm.close();
        })
        .catch(err => console.log(err))
    }
  });

popupWithImage.setEventListeners();
popupProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupConfirm.setEventListeners();

buttonEditProfile.addEventListener('click', () => {
  popupProfile.setInputValues(userInfo.getUserInfo());
  formValidators['profile-form'].resetValidation();
  popupProfile.open();
});

buttonAddImage.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  popupAddCard.open();
});

buttonEditAvatar.addEventListener('click', () => {
  formValidators['avatar-form'].resetValidation();
  popupEditAvatar.open();
});
