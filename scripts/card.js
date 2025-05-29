export default class Card {
  constructor(
    { name, link, isLiked, _id, owner },
    cardTemplateSelector,
    handleCardClick
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._id = _id;
    this._owner = owner;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._likeIcon;
    this._card;
  }

  _getTemplateCard() {
    const templateCard = document.querySelector(
      this._cardTemplateSelector
    ).content;
    const card = templateCard.querySelector(".gallery__card").cloneNode(true);
    const cardImage = card.querySelector(".gallery__image");
    const cardTitle = card.querySelector(".gallery__title");

    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    cardTitle.textContent = this._name;

    this._card = card;
    this._likeIcon = this._card.querySelector(".gallery__icon-like");
  }

  _addEventListener() {
    this._card.addEventListener(
      "click",
      this._handleCardFunctionality.bind(this)
    );
  }

  _handleCardFunctionality(evt) {
    if (evt.target.classList.contains("gallery__button_delete")) {
      this._handleCardClick({
        action: "delete",
        id: this._id,
        deleteCard: () => {
          this._deleteCard();
        },
        evt,
      });
    } else if (evt.target.classList.contains("gallery__image")) {
      this._handleCardClick({
        action: "popup",
        name: this._name,
        link: this._link,
      });
    } else if (evt.target.classList.contains("gallery__icon-like")) {
      this._handleCardClick({
        action: "like",
        isLiked: this._isLiked,
        id: this._id,
        like: (isLike) => {
          this._likeCard(isLike);
        },
      });
    }
  }

  _deleteCard() {
    this._card.remove();
  }

  _likeCard(isLike) {
    this._isLiked = isLike;
    this._isCardLike();
  }

  _isCardLike() {
    if (this._isLiked) {
      this._likeIcon.setAttribute("src", "./images/likedIcon.svg");
    } else {
      this._likeIcon.setAttribute("src", "./images/likeIcon.svg");
    }
  }

  getCard() {
    this._getTemplateCard();
    this._addEventListener();
    this._isCardLike();
    return this._card;
  }
}
