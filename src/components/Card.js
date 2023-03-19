export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  _handleRemoveCard() {
    this._card.remove();
    this._card = null;
  }

  _handleToggleLike() {
    this._buttonLike.classList.toggle('gallery__like_active');
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleToggleLike()
    });
    this._buttonRemove.addEventListener('click', () => {
      this._handleRemoveCard()
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({
        link: this._image,
        name: this._title,
        alt: this._title
      });
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.gallery__image');
    this._buttonRemove = this._card.querySelector('.gallery__remove');
    this._buttonLike = this._card.querySelector('.gallery__like');
    this._cardTitle = this._card.querySelector('.gallery__title');

    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._cardImage.src = this._image;

    this._setEventListeners();

    return this._card;
  }
}
