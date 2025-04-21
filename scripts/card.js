export default class Card {
  constructor(cardText, cardImage, cardTemplateSelector) {
    this._cardText = cardText;
    this._cardImage = cardImage;
    this._cardTemplateSelector = cardTemplateSelector;
    this._card;
    this._dialog = document.querySelector(".dialog_image-container");
  }

  _getTemplateCard() {
    const templateCard = document.querySelector(
      this._cardTemplateSelector
    ).content;
    const card = templateCard.querySelector(".gallery__card").cloneNode(true);
    const cardImage = card.querySelector(".gallery__image");
    const cardTitle = card.querySelector(".gallery__title");

    cardImage.setAttribute("src", this._cardImage);
    cardImage.setAttribute("alt", this._cardText);
    cardTitle.textContent = this._cardText;

    this._card = card;
  }

  _addEventListener() {
    this._card.addEventListener(
      "click",
      this._handleCardFunctionality.bind(this)
    );
  }

  _handleCardFunctionality(evt) {
    if (evt.target.classList.contains("gallery__button_delete")) {
      this._deleteCard();
    } else if (evt.target.classList.contains("gallery__image")) {
      this._openImageDialog();
    } else if (evt.target.classList.contains("gallery__icon")) {
      this._handleLike();
    }
  }

  _deleteCard() {
    this._card.remove();
  }

  _openImageDialog() {
    this._dialog
      .querySelector(".dialog__image")
      .setAttribute("src", this._cardImage);
    this._dialog
      .querySelector(".dialog__image")
      .setAttribute("alt", this._cardText);
    this._dialog.querySelector(".dialog__paragraph").textContent =
      this._cardText;
    this._dialog.showModal();
  }

  _handleLike() {
    const likeIcon = this._card.querySelector(".gallery__icon-like");
    if (likeIcon.getAttribute("src") === "./images/likeIcon.svg") {
      likeIcon.setAttribute("src", "./images/likedIcon.svg");
    } else {
      likeIcon.setAttribute("src", "./images/likeIcon.svg");
    }
  }

  getCard() {
    this._getTemplateCard();
    this._addEventListener();
    return this._card;
  }
}
