const gallery = document.querySelector('.gallery');

//buttons
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseEditProfile = document.querySelector('.popup__close-button');
const buttonOpenAddImage = document.querySelector('.profile__add-button');
const buttonCloseAddImage = document.querySelector('.popup__close-button_add');
const buttonCloseViewImage = document.querySelector('.popup__close-button_image');

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
const formEditProfile = document.querySelector('.popup__form_type_edit');
const formAddImage = document.querySelector('.popup__form_type_add');

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
  resetValidation(formAddImage, formValidationConfig);
});

buttonOpenAddImage.addEventListener('click', () => {
  openPopup(popupAddImage);
  formAddImage.reset();
  resetValidation(formEditProfile, formValidationConfig);
});

buttonCloseAddImage.addEventListener('click', () => closePopup(popupAddImage));
buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseViewImage.addEventListener('click', () => closePopup(popupViewCard));

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  openPopup(popupEditProfile);
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', handleEditFormSubmit);

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

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardData = ({
    name: cardTitleInput.value,
    link: cardLinkInput.value
  });
  gallery.prepend(createGalleryCard(cardData));
  closePopup(popupAddImage);
};

formAddImage.addEventListener('submit', handleAddFormSubmit);

