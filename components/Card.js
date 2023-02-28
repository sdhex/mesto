export default class Card {
  constructor(cardData, templateSelector, viewCardImage) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._templateSelector = templateSelector;
    this._viewCardImage = viewCardImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  _removeCard() {
    this._card.remove();
    this._card = null;
  }

  _toggleLike() {
    this._buttonLike.classList.toggle('gallery__like_active');
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike()
    });
    this._buttonRemove.addEventListener('click', () => {
      this._removeCard()
    });
    this._cardImage.addEventListener('click', () => {
      this._viewCardImage(this._title, this._image);
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.gallery__image');
    this._buttonRemove = this._card.querySelector('.gallery__remove');
    this._buttonLike = this._card.querySelector('.gallery__like');
    this._cardImage.alt = this._title;
    this._cardImage.src = this._image;
    this._card.querySelector('.gallery__title').textContent = this._title;

    this._setEventListeners();

    return this._card;
  }
}
