export default class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
  }

  _toggleButton() {
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    const isFormValid = this._form.checkValidity();

    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !isFormValid);
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.classList.add(this._config.errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
  }

  _handleInput(inputElement) {
    inputElement.checkValidity()
      ? this._hideInputError(inputElement)
      : this._showInputError(inputElement);
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._handleInput(inputElement);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButton();
  }
}
