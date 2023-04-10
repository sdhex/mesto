export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleLikeClick,
      handleDeleteIconClick,
      userId,
      templateSelector
    }) {
    this._title = data.name;
    this._image = data.link;
    this._alt = data.name;
    this.idCard = data._id;
    this._ownerId = data.owner._id;
    this._likesCount = data.likes.length;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._likesArr = data.likes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    return this._likesArr.some((like) => like._id === this._userId)
  }

  renderLikes(data) {
    this._likesArr = data;
    this._likeCount.textContent = data.length;

    if (this.isLiked()) {
      this._buttonLike.classList.add('gallery__like_active');
    } else {
      this._buttonLike.classList.remove('gallery__like_active');
    }
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _deleteTrashButton() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteIconClick();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardTitle = this._card.querySelector('.gallery__title');
    this._cardImage = this._card.querySelector('.gallery__image');
    this._buttonDelete = this._card.querySelector('.gallery__remove');
    this._buttonLike = this._card.querySelector('.gallery__like');
    this._likeCount = this._card.querySelector('.gallery__like-counter');

    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._alt;
    this._cardImage.src = this._image;

    this._deleteTrashButton();
    this.renderLikes(this._likesArr);
    this._setEventListeners();

    return this._card;
  }
}
