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
