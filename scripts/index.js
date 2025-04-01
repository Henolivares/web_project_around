import renderInitialCards from "./initialCards.js";
import enableDialogElements, { closeDialog } from "./dialog.js";
import { addCard, createCard } from "./cards.js";
import enableValidation from "./validate.js";

// Render initial cards
renderInitialCards();

// Enable dialog functionality
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
