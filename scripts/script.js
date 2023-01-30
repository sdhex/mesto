const initialCards = [
  {
    name: 'Альпы',
    link: 'https://images.unsplash.com/photo-1673055022236-0bce66b62569?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Афганистан',
    link: 'https://images.unsplash.com/photo-1673860503924-e8085c807ca1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Норвегия',
    link: 'https://images.unsplash.com/photo-1672506107198-865adfdf6db6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//buttons
const editButton = document.querySelector('.profile__edit-button');
const closeEditButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close-button_add');
const closeImageButton = document.querySelector('.popup__close-button_image');

//popups
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddImage = document.querySelector('.popup_add-image');
const popupViewImage = document.querySelector('.popup_view-image');

//inputs
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupName = document.querySelector('.popup__input_type_profile-name');
const popupDescription = document.querySelector('.popup__input_type_profile-description');

const popupGalleryTitle = document.querySelector('.popup__input_type_gallery-title');
const popupGalleryLink = document.querySelector('.popup__input_type_gallery-link');

//forms
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupAddForm = document.querySelector('.popup__form_type_add');

//image
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');


const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
};

editButton.addEventListener('click', function () {
  togglePopup(popupEditProfile);
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
});

closeEditButton.addEventListener('click', function () {
  togglePopup(popupEditProfile);
});

closeAddButton.addEventListener('click', function () {
  togglePopup(popupAddImage);
});

addButton.addEventListener('click', function () {
  togglePopup(popupAddImage);
  popupAddForm.reset();
});

closeImageButton.addEventListener('click', function () {
  togglePopup(popupViewImage);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  togglePopup(popupEditProfile);
};

popupEditForm.addEventListener('submit', handleEditFormSubmit);

const cardTemplate = document.querySelector('#gallery-template').content;
const gallery = document.querySelector('.gallery');

function createGalleryItem(item) {
  const galleryItem = cardTemplate.querySelector('.gallery__item').cloneNode(true);
  const galleryTitle = galleryItem.querySelector('.gallery__title');
  const galleryImage = galleryItem.querySelector('.gallery__image');
  const removeButton = galleryItem.querySelector('.gallery__remove');
  const likeButton = galleryItem.querySelector('.gallery__like');

  galleryTitle.textContent = item.name;
  galleryImage.src = item.link;
  galleryImage.alt = item.name;

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('gallery__like_active');
  });

  removeButton.addEventListener('click', function () {
    galleryItem.remove();
  });

  galleryImage.addEventListener('click', function () {
    togglePopup(popupViewImage);
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupImageTitle.textContent = item.name;
  });

  return galleryItem;
};

const renderGalleryItem = function (item) {
  gallery.append(createGalleryItem(item));
};

initialCards.forEach(function (item) {
  renderGalleryItem(item);
});

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const addItem = ({
    name: popupGalleryTitle.value,
    link: popupGalleryLink.value
  });
  gallery.prepend(createGalleryItem(addItem));
  togglePopup(popupAddImage);
};

popupAddForm.addEventListener('submit', handleAddFormSubmit);
