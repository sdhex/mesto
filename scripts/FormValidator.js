export default class FormValidator {
  constructor(form, config) {
    this._form = form;
    this._config = config;
    this._inputList = this._form.querySelectorAll(this._config.inputSelector);
  }

  _disableSubmit(event) {
    event.preventDefault();
  }

  _toggleButton() {
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    const isFormValid = this._form.checkValidity();

    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._config.inactiveButtonClass, !isFormValid);
  }

  _handleFormInput(event) {
    this._input = event.target;
    this._inputId = this._input.id;
    this._errorElement = this._form.querySelector(`#${this._inputId}-error`);
    if (this._input.validity.valid) {
      this._input.classList.remove(this._config.inputErrorClass);
      this._errorElement.classList.remove(this._config.errorClass);
      this._errorElement.textContent = '';
    } else {
      this._input.classList.add(this._config.inputErrorClass);
      this._errorElement.classList.add(this._config.errorClass);
      this._errorElement.textContent = this._input.validationMessage;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((element) => {
      element.addEventListener('input', (event) => {
        this._handleFormInput(event);
        this._toggleButton();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButton();
  }
}
