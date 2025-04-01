function showInputError(input, errorInfo) {
  input.classList.add(errorInfo.inputErrorClass);
  const errorElement = input.nextElementSibling;
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorInfo.errorClass);
}

function hideInputError(input, errorInfo) {
  input.classList.remove(errorInfo.inputErrorClass);
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  errorElement.classList.remove(errorInfo.errorClass);
}

function checkInputValidity(input, errorInfo) {
  if (!input.validity.valid) {
    showInputError(input, errorInfo);
  } else {
    hideInputError(input, errorInfo);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonInfo) {
  if (hasInvalidInput(inputList)) {
    buttonInfo.buttonElement.classList.add(buttonInfo.inactiveButtonClass);
  } else {
    buttonInfo.buttonElement.classList.remove(buttonInfo.inactiveButtonClass);
  }
}

function setEventListener(inputList, buttonInfo, errorInfo) {
  toggleButtonState(inputList, buttonInfo);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, errorInfo);
      toggleButtonState(inputList, buttonInfo);
    });
  });
}

export default function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    const buttonElement = form.querySelector(submitButtonSelector);
    const buttonInfo = {
      buttonElement,
      inactiveButtonClass,
    };
    const errorInfo = {
      inputErrorClass,
      errorClass,
    };

    const inputList = Array.from(form.querySelectorAll(inputSelector));
    setEventListener(inputList, buttonInfo, errorInfo);
  });
}
