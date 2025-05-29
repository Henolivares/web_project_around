import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._imageTitle = name;
    this._imageLink = link;
  }

  open() {
    this._popup
      .querySelector(".dialog__image")
      .setAttribute("src", this._imageLink);
    this._popup
      .querySelector(".dialog__image")
      .setAttribute("alt", this._imageTitle);
    this._popup.querySelector(".dialog__paragraph").textContent =
      this._imageTitle;
    super.open();
  }
}
