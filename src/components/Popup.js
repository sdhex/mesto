export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    this._buttonClose.addEventListener('click', this.close.bind(this));
  }
}
