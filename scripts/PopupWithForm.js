import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._popupForm = this._popup.querySelector(".form");
  }

  _getInputValues() {
    const data = new FormData(this._popupForm);
    return Object.fromEntries(data.entries());
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      this._handlerFormSubmit({ evt, data: this._getInputValues() });
    });
  }

  setFormValues(data) {
    Array.from(this._popupForm.querySelectorAll(".form__input")).forEach(
      (input) => {
        input.value = data[input.name];
      }
    );
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
