import Card from "./card.js";
import FormValidator from "./FormValidator.js";
import { openDialog, closeDialog } from "./utils.js";

// Cards
const imageDialog = document.querySelector(".dialog_image-container");

function addCard(card) {
  galleryContainer.prepend(card);
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
    const card = new Card(name, link, "#template-card");
    galleryContainer.append(card.getCard());
  });
}

renderInitialCards();

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
  const card = new Card(
    formData.get("title-image"),
    formData.get("image-link"),
    "#template-card"
  );

  addCard(card.getCard());
  newCardForm.reset();
  closeDialog(evt);
}

newCardForm.addEventListener("submit", handleFormAdd);

// Enable form validation
const formValidatorProfileName = new FormValidator(
  {
    formSelector: "#form-profile",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  profileForm.querySelector("#name")
);
formValidatorProfileName.enableValidation();

const formValidatorProfileAbout = new FormValidator(
  {
    formSelector: "#form-profile",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  profileForm.querySelector("#about")
);
formValidatorProfileAbout.enableValidation();

const formValidatorAddTitle = new FormValidator(
  {
    formSelector: "#form-add",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  newCardForm.querySelector("#title-image")
);
formValidatorAddTitle.enableValidation();

const formValidatorAddLink = new FormValidator(
  {
    formSelector: "#form-add",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  newCardForm.querySelector("#image-link")
);
formValidatorAddLink.enableValidation();
