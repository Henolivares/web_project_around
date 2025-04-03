import enableValidation from "./validate.js";
// Cards
const templateCard = document.querySelector("#template-card").content;
const imageDialog = document.querySelector(".dialog_image-container");

function createCard(titleImage, imageLink) {
  const card = templateCard.querySelector(".gallery__card").cloneNode(true);
  const cardImage = card.querySelector(".gallery__image");
  const cardTitle = card.querySelector(".gallery__title");

  cardImage.setAttribute("src", imageLink);
  cardImage.setAttribute("alt", titleImage);
  cardTitle.textContent = titleImage;

  return card;
}

function addCard(card) {
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
// Render initial cards
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

const galleryContainer = document.querySelector("#gallery");

function renderInitialCards() {
  initialCards.forEach(({ name, link }) => {
    galleryContainer.append(createCard(name, link));
  });
}

renderInitialCards();

galleryContainer.addEventListener("click", handleCardFunctionality);

// Enable dialog functionality
const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const dialogs = document.querySelectorAll(".dialog");

function openDialog(dialogElement) {
  dialogElement.showModal();
}

function closeDialogEvent(evt, dialog) {
  if (
    evt.target.classList.contains("dialog") ||
    evt.target.classList.contains("dialog__close")
  ) {
    dialog.close();
  }
}

function closeDialog(evt) {
  evt.target.parentElement.close();
}

function enableDialogElements() {
  Array.from(dialogs).forEach((dialog) => {
    if (dialog.id === "dialog-profile") {
      editProfileButton.addEventListener("click", () => openDialog(dialog));
    } else if (dialog.id === "dialog-add") {
      addNewCardButton.addEventListener("click", () => openDialog(dialog));
    }

    dialog.addEventListener("click", (evt) => closeDialogEvent(evt, dialog));
  });
}

enableDialogElements();

// Handle profile form
const profileForm = document.querySelector("#form-profile");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

function handleProfileForm(evt) {
  evt.preventDefault();
  const formData = new FormData(profileForm);
  profileName.textContent = formData.get("name");
  profileDescription.textContent = formData.get("about");
  closeDialog(evt);
}

profileForm.addEventListener("submit", handleProfileForm);

// Handle add card form
const newCardForm = document.querySelector("#form-add");

function handleFormAdd(evt) {
  evt.preventDefault();
  const formData = new FormData(newCardForm);
  const card = createCard(
    formData.get("title-image"),
    formData.get("image-link")
  );

  addCard(card);
  newCardForm.reset();
  closeDialog(evt);
}

newCardForm.addEventListener("submit", handleFormAdd);

// Enable form validation
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
});
