import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup__image-title');
    this._image = this._popup.querySelector('.popup__image');
  }

  open(cardData) {
    this._title.textContent = cardData.name;
    this._image.alt = cardData.name;
    this._image.src = cardData.link;
    super.open();
  }
}
