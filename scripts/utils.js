// Enable dialog functionality
const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

const dialogs = document.querySelectorAll(".dialog");

export function openDialog(dialogElement) {
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

export function closeDialog(evt) {
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
