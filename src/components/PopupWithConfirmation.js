import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleConfirmClick }) {
    super(popupSelector);
    this._handleConfirmClick = handleConfirmClick;
  }

  open(card) {
    super.open();
    this.cardId = card.idCard;
    this.card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._handleConfirmClick(this);
    });
  }
}
