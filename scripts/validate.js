const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorSelector: '.popup__error',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function disableSubmit(event) {
  event.preventDefault();
};

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  formList.forEach((form) => {
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
      toggleButton(form, config);
    });

    addInputListeners(form, config);
    toggleButton(form, config);
  });
};

function handleFormInput(event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  }
};

function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.submitButtonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.inactiveButtonClass, !isFormValid);
};


function addInputListeners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);

  inputList.forEach(element => {
    element.addEventListener('input', (event) => {
      handleFormInput(event, config);
    });
  });
};

function resetValidation(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const errorList = form.querySelectorAll(config.errorSelector);
  const buttonSubmit = form.querySelector(config.submitButtonSelector);

  inputList.forEach(element => {
    element.classList.remove(config.inputErrorClass);
  });

  errorList.forEach(element => {
    element.classList.remove(config.errorClass);
  });

  buttonSubmit.disabled = true;
  buttonSubmit.classList.add(config.inactiveButtonClass);
}

enableValidation(formValidationConfig);
