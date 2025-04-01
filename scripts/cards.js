const templateCard = document.querySelector("#template-card").content;
const galleryContainer = document.querySelector(".gallery");
const imageDialog = document.querySelector(".dialog_image-container");

export function createCard(titleImage, imageLink) {
  const card = templateCard.querySelector(".gallery__card").cloneNode(true);
  const cardImage = card.querySelector(".gallery__image");
  const cardTitle = card.querySelector(".gallery__title");

  cardImage.setAttribute("src", imageLink);
  cardImage.setAttribute("alt", titleImage);
  cardTitle.textContent = titleImage;

  return card;
}

export function addCard(card) {
  galleryContainer.prepend(card);
}

function handleCardFunctionality(evt) {
  if (evt.target.classList.contains("gallery__button_delete")) {
    deleteCard(evt);
  } else if (evt.target.classList.contains("gallery__image")) {
    openImageDialog(evt);
  } else if (evt.target.classList.contains("gallery__icon")) {
    handleLike(evt);
  }
}

function deleteCard(evt) {
  const card = evt.target.closest(".gallery__card");
  card.remove();
}

function openImageDialog(evt) {
  const img = evt.target.src;
  const title =
    evt.target.parentElement.querySelector(".gallery__title").textContent;
  imageDialog.querySelector(".dialog__image").setAttribute("src", img);
  imageDialog.querySelector(".dialog__image").setAttribute("alt", title);
  imageDialog.querySelector(".dialog__paragraph").textContent = title;
  imageDialog.showModal();
}

function handleLike(evt) {
  if (evt.target.getAttribute("src") === "./images/likeIcon.svg") {
    evt.target.setAttribute("src", "./images/likedIcon.svg");
  } else {
    evt.target.setAttribute("src", "./images/likeIcon.svg");
  }
}

galleryContainer.addEventListener("click", handleCardFunctionality);
