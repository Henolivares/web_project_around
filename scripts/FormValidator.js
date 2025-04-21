export default class FormValidator {
  constructor(configuration, formInput) {
    this._configuration = configuration;
    this._form = document.querySelector(this._configuration.formSelector);
    this._formInput = formInput;
  }

  _showInputError() {
    this._formInput.classList.add(this._configuration.inputErrorClass);
    const errorElement = this._formInput.nextElementSibling;
    errorElement.textContent = this._formInput.validationMessage;
    errorElement.classList.add(this._configuration.errorClass);
  }

  _hideInputError() {
    this._formInput.classList.remove(this._configuration.inputErrorClass);
    const errorElement = this._formInput.nextElementSibling;
    errorElement.textContent = "";
    errorElement.classList.remove(this._configuration.errorClass);
  }

  _checkInputValidity() {
    if (!this._formInput.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  _isInvalidInput() {
    return !this._formInput.validity.valid;
  }

  _toggleButtonState() {
    const button = this._form.querySelector(
      this._configuration.submitButtonSelector
    );
    if (this._isInvalidInput()) {
      button.classList.add(this._configuration.inactiveButtonClass);
      button.setAttribute("disabled", true);
    } else {
      button.classList.remove(this._configuration.inactiveButtonClass);
      button.removeAttribute("disabled");
    }
  }

  _setEventListener() {
    this._toggleButtonState();
    this._formInput.addEventListener("input", () => {
      this._checkInputValidity();
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._setEventListener();
  }
}
