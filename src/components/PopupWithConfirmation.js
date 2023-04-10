import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleConfirmClick }) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._handleConfirmClick(this._card);
    });
  }
}
