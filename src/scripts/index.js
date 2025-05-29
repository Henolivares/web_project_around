import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Card from "./card.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

// API instance
const apiErrorElement = document.querySelector(".error-messages");
function errorApi(err) {
  console.log(err);
  apiErrorElement.classList.add("error-messages--show");
  setTimeout(() => {
    apiErrorElement.classList.remove("error-messages--show");
  }, 4000);
}
const api = new Api(
  {
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
      authorization: "16a8de88-1676-493f-a3df-9f202d4cb954",
      "Content-Type": "application/json",
    },
  },
  errorApi
);

// Set user info
async function getUserInfo() {
  const userData = await api.getUserData();
  const userInfo = new UserInfo(userData);
  userInfo.setUserInfo();
  return userInfo;
}

const userInfo = await getUserInfo();

// Edit user
const formProfileOpener = document.querySelector("#edit-button");

// Handle form submit event
const profileFormPopup = new PopupWithForm(
  "#dialog-profile",
  async ({ evt, data }) => {
    evt.preventDefault();
    profileFormPopup.changeTextButton("Guardando...");
    const userData = await api.editUser(data);
    if (userData) {
      userInfo.editUserInfo(userData);
    }
    profileFormPopup.changeTextButton("Guardar");
    profileFormPopup.close();
  }
);

profileFormPopup.setEventListeners();
formProfileOpener.addEventListener("click", () => {
  // Set input values to current user
  const userData = userInfo.getUserInfo();
  profileFormPopup.setFormValues(userData);
  profileFormPopup.open();
});

// Edit avatar
const formChangeAvatarOpener = document.querySelector("#edit-avatar-button");

const formChangeAvatarPopup = new PopupWithForm(
  "#dialog-change-avatar",
  async ({ evt, data }) => {
    evt.preventDefault();
    formChangeAvatarPopup.changeTextButton("Guardando...");
    const userDataAvatar = await api.editAvatar(data);
    if (userDataAvatar) {
      userInfo.editAvatarInfo(userDataAvatar);
    }
    formChangeAvatarPopup.changeTextButton("Guardar");
    formChangeAvatarPopup.close();
  }
);

formChangeAvatarPopup.setEventListeners();
formChangeAvatarOpener.addEventListener("click", () => {
  formChangeAvatarPopup.open();
});

// Card functionality
async function likeCard({ id, isLiked, like }) {
  const message = await api.likeCard(id, isLiked);
  if (message) like(message.isLiked);
}

async function deleteCard({ id, deleteCard, evt }) {
  const popup = new PopupWithConfirmation("#dialog-delete", async () => {
    evt.preventDefault();
    const message = await api.deleteCard(id);
    if (message) {
      deleteCard(id);
    }
    popup.close();
  });
  popup.setEventListeners();
  popup.open();
}

function popupCard({ name, link }) {
  const popup = new PopupWithImage("#dialog-image", {
    name,
    link,
  });
  popup.setEventListeners();
  popup.open();
}

function handleCardClick({ action, ...data }) {
  if (action === "popup") popupCard(data);

  if (action === "like") likeCard(data);

  if (action === "delete") deleteCard(data);
}

// Render initial cards
async function renderInitialCards() {
  const cards = await api.getCards();
  const cardsSection = new Section(
    {
      items: cards,
      renderer: (data) => {
        const card = new Card({ ...data }, "#template-card", handleCardClick);
        cardsSection.addItem(card.getCard());
      },
    },
    "#gallery"
  );
  cardsSection.renderItems();

  return cardsSection;
}

// Card section instance
const cardsSection = await renderInitialCards();

// Add a new card
const formNewCardOpener = document.querySelector("#add-button");
const addNewFormPopup = new PopupWithForm(
  "#dialog-add",
  async ({ evt, data }) => {
    evt.preventDefault();
    const cardData = await api.addCard(data);
    if (cardData) {
      addNewFormPopup.changeTextButton("Creando...");
      const card = new Card(cardData, "#template-card", handleCardClick);
      cardsSection.addItem(card.getCard());
    }
    addNewFormPopup.changeTextButton("Crear");
    addNewFormPopup.close();
  }
);

addNewFormPopup.setEventListeners();
formNewCardOpener.addEventListener("click", () => {
  addNewFormPopup.open();
});

// Enable form validation
const profileForm = document.querySelector("#form-profile");
const newCardForm = document.querySelector("#form-add");
const changeAvatarForm = document.querySelector("#form-change-avatar");

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
  newCardForm.querySelector("#image-title")
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

const formValidatorEditAvatar = new FormValidator(
  {
    formSelector: "#form-change-avatar",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  },
  changeAvatarForm.querySelector("#avatar-link")
);
formValidatorEditAvatar.enableValidation();
