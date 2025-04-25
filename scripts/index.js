import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import Card from "./card.js";

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

const handleCardClick = ({ imageTitle, imageLink }) => {
  const popup = new PopupWithImage(".dialog_image-container", {
    imageTitle,
    imageLink,
  });
  popup.setEventListeners();
  popup.open();
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const card = new Card(name, link, "#template-card", () => {
        handleCardClick({ imageTitle: name, imageLink: link });
      });
      cardsSection.addItem(card.getCard());
    },
  },
  "#gallery"
);

cardsSection.renderItems();

// Forms opener elements
const formProfileOpener = document.querySelector("#edit-button");
const formNewCardOpener = document.querySelector("#add-button");

// Handle forms submit events
const profileFormPopup = new PopupWithForm(
  "#dialog-profile",
  ({ evt, data }) => {
    evt.preventDefault();
    const userInfo = new UserInfo(data);
    userInfo.setUserInfo(userInfo.getUserInfo());
    profileFormPopup.close();
  }
);

profileFormPopup.setEventListeners();
formProfileOpener.addEventListener("click", () => {
  // Set input values to current user
  const profileName = document
    .querySelector("#profile-name")
    .textContent.trim();
  const profileDescription = document
    .querySelector("#profile-description")
    .textContent.trim();
  const values = {
    name: profileName,
    about: profileDescription,
  };
  profileFormPopup.setFormValues(values);
  profileFormPopup.open();
});

const addNewFormPopup = new PopupWithForm(
  "#dialog-add",
  ({ evt, data: { imageTitle, imageLink } }) => {
    evt.preventDefault();
    const card = new Card(imageTitle, imageLink, "#template-card", () => {
      handleCardClick({ imageTitle, imageLink });
    });
    cardsSection.addItem(card.getCard());
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
