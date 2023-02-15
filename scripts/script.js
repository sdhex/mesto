const gallery = document.querySelector('.gallery');

//buttons
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddImage = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

//popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-image');
const popupViewCard = document.querySelector('.popup_view-image');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
//inputs
const profileNameInput = document.querySelector('.popup__input_type_profile-name');
const profileDescriptionInput = document.querySelector('.popup__input_type_profile-description');
const cardTitleInput = document.querySelector('.popup__input_type_gallery-title');
const cardLinkInput = document.querySelector('.popup__input_type_gallery-link');

//forms
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

//image
const imageView = document.querySelector('.popup__image');
const imageViewTitle = document.querySelector('.popup__image-title');

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
  resetValidation(profileForm, formValidationConfig);
});

buttonOpenAddImage.addEventListener('click', () => {
  openPopup(popupAddImage);
  profileForm.reset();
  resetValidation(cardForm, formValidationConfig);
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

const cardTemplate = document.querySelector('#gallery-template').content;

function createGalleryCard(cardData) {
  const galleryCard = cardTemplate.cloneNode(true);
  const card = galleryCard.querySelector('.gallery__item');
  const cardTitle = galleryCard.querySelector('.gallery__title');
  const cardImage = galleryCard.querySelector('.gallery__image');
  const buttonRemove = galleryCard.querySelector('.gallery__remove');
  const buttonLike = galleryCard.querySelector('.gallery__like');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  function toggleLikeButton () {
    buttonLike.classList.toggle('gallery__like_active');
  };

  function viewCardImage () {
    openPopup(popupViewCard);
    imageView.src = cardData.link;
    imageView.alt = cardData.name;
    imageViewTitle.textContent = cardData.name;
  };

  function removeCard () {
    card.remove();
  };

  buttonLike.addEventListener('click', toggleLikeButton);
  cardImage.addEventListener('click', viewCardImage);
  buttonRemove.addEventListener('click', removeCard);

  return galleryCard;
};

initialCards.forEach(function (cardData) {
  gallery.append(createGalleryCard(cardData));
});

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
