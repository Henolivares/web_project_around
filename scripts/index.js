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
const templateCard = document.querySelector("#template-card").content;

const createCard = (titleImage, imageLink) => {
  const card = templateCard.querySelector(".gallery__card").cloneNode(true);
  const cardImage = card.querySelector(".gallery__image");
  const cardTitle = card.querySelector(".gallery__title");

  cardImage.setAttribute("src", imageLink);
  cardImage.setAttribute("alt", titleImage);
  cardTitle.textContent = titleImage;

  return card;
};

const RenderInitialCards = () => {
  initialCards.forEach(({ name, link }) => {
    galleryContainer.append(createCard(name, link));
  });
};

RenderInitialCards();

// Delete card

const deleteCard = (e) => {
  const card = e.target.closest(".gallery__card");
  card.remove();
};

// Dialog image
const dialogImageContainer = document.querySelector(".dialog_image-container");
const dialogImage = dialogImageContainer.querySelector(".dialog__image");
const dialogParagraph =
  dialogImageContainer.querySelector(".dialog__paragraph");
const dialogCloseButton = dialogImageContainer.querySelector(".dialog__close");

const closeDialogImage = () => {
  dialogImageContainer.close();
};

dialogCloseButton.addEventListener("click", closeDialogImage);

const handleDialogImage = (e) => {
  const card = e.target.closest(".gallery__card");

  const image = card.querySelector(".gallery__image");
  const title = card.querySelector(".gallery__title");

  dialogImage.setAttribute("src", image.getAttribute("src"));
  dialogImage.setAttribute("alt", title.textContent);
  dialogParagraph.textContent = title.textContent;

  dialogImageContainer.showModal();
};

// Like button
const handleLike = (e) => {
  if (e.target.getAttribute("src") === "./images/likeIcon.svg") {
    e.target.setAttribute("src", "./images/likedIcon.svg");
  } else {
    e.target.setAttribute("src", "./images/likeIcon.svg");
  }
};

const AllInitialCards = document.querySelectorAll(".gallery__card");
const arrayInitialCards = Array.from(AllInitialCards);
arrayInitialCards.forEach((card) => {
  card
    .querySelector(".gallery__button_delete")
    .addEventListener("click", deleteCard);
  card
    .querySelector(".gallery__image")
    .addEventListener("click", handleDialogImage);
  card
    .querySelector(".gallery__button_like")
    .addEventListener("click", handleLike);
});

const addCard = (card) => {
  galleryContainer.prepend(card);
};

// Edit profile
const editButton = document.querySelector("#edit-button");
const popup = document.querySelector("#popup");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const form = popup.querySelector("#form");
const nameInput = form.querySelector("#name");
const aboutInput = form.querySelector("#about");
const closeButton = popup.querySelector("#close-button");
const saveProfileButton = form.querySelector("#save-profile-button");

const handlePopup = () => {
  popup.classList.toggle("popup_opened");
};

const handleButton = () => {
  if (nameInput.value === "" && aboutInput.value === "") {
    saveProfileButton.toggleAttribute("disabled");
    saveProfileButton.classList.toggle("form__button_disabled");
  }
  saveProfileButton.toggleAttribute("disabled");
  saveProfileButton.classList.toggle("form__button_disabled");
};

const handleForm = (e) => {
  e.preventDefault();

  if (nameInput.value === "" && aboutInput.value === "") {
    handlePopup();
    return;
  }

  profileName.textContent = nameInput.value;
  nameInput.setAttribute("value", nameInput.value);

  profileDescription.textContent = aboutInput.value;
  aboutInput.setAttribute("value", aboutInput.value);

  handlePopup();
};

editButton.addEventListener("click", handlePopup);
closeButton.addEventListener("click", handlePopup);
form.addEventListener("submit", handleForm);
nameInput.addEventListener("keyup", handleButton);
aboutInput.addEventListener("keyup", handleButton);

// Dialog add
const dialog = document.querySelector("#dialog-add");
const closeDialogButton = dialog.querySelector(".dialog__close");
const formAdd = dialog.querySelector("#form-add");
const addButton = document.querySelector("#add-button");
const addButtonForm = document.querySelector("#add-button-form");
const titleInput = formAdd.querySelector("#title-image");
const imageLinkInput = formAdd.querySelector("#image-link");

addButton.addEventListener("click", () => {
  dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
  dialog.close();
});

const handleAddButtonForm = () => {
  if (titleInput.value === "" || imageLinkInput.value === "") {
    addButtonForm.setAttribute("disabled", true);
    addButtonForm.classList.add("form__button_disabled");
    return;
  } else {
    addButtonForm.removeAttribute("disabled");
    addButtonForm.classList.remove("form__button_disabled");
  }
};
const handleFormAdd = (e) => {
  e.preventDefault();

  if (titleInput.value === "" || imageLinkInput.value === "") {
    dialog.close();
    return;
  }

  const card = createCard(titleInput.value, imageLinkInput.value);

  card
    .querySelector(".gallery__button_delete")
    .addEventListener("click", deleteCard);

  card
    .querySelector(".gallery__image")
    .addEventListener("click", handleDialogImage);

  card
    .querySelector(".gallery__button_like")
    .addEventListener("click", handleLike);
  addCard(card);
  titleInput.value = "";
  imageLinkInput.value = "";
  dialog.close();
};

formAdd.addEventListener("submit", handleFormAdd);
titleInput.addEventListener("change", handleAddButtonForm);
imageLinkInput.addEventListener("change", handleAddButtonForm);
