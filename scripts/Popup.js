export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.showModal();
  }

  close() {
    this._popup.removeEventListener("click", this._handleEscClose);
    this._popup.removeEventListener("click", this._handleCloseEvent);
    this._popup.close();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleCloseEvent(evt) {
    if (
      evt.target.classList.contains("dialog") ||
      evt.target.classList.contains("dialog__close")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("keyup", this._handleEscClose.bind(this));
    this._popup.addEventListener("click", this._handleCloseEvent.bind(this));
  }
}
