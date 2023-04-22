const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__form-input_invalid",
  errorClass: "popup__form-error_visible",
};

function setInputValidState(
  { inputErrorClass, errorClass },
  input,
  errorElement
) {
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function setInputInvalidState(
  { inputErrorClass, errorClass },
  input,
  errorElement
) {
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
}

function checkInputValidity({ errorClass, inputErrorClass }, input) {
  const errorElement = document.querySelector(`#error-${input.id}`);

  if (input.checkValidity()) {
    //   валидный
    setInputValidState({ errorClass, inputErrorClass }, input, errorElement);
  } else {
    //   не валидный
    setInputInvalidState({ errorClass, inputErrorClass }, input, errorElement);
  }
}

function disableButton({ inactiveButtonClass }, button) {
  button.setAttribute("disabled", "");
  button.classList.add(inactiveButtonClass);
}

function enableButton({ inactiveButtonClass }, button) {
  button.removeAttribute("disabled");
  button.classList.remove(inactiveButtonClass);
}

function toggleButtonValidity({ submitButtonSelector, ...rest }, form) {
  const submitButton = form.querySelector(submitButtonSelector);
  if (form.checkValidity()) {
    enableButton(rest, submitButton);
  } else {
    disableButton(rest, submitButton);
  }
}

function setSubmitListener(config, form) {
  form.addEventListener("submit", function (event) {
    form.reset();

    toggleButtonValidity(config, form);
  });
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(function (form) {
    setSubmitListener(rest, form);
    toggleButtonValidity(rest, form);

    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach(function (input) {
      input.addEventListener("input", () => {
        checkInputValidity(rest, input);
        toggleButtonValidity(rest, form);
      });
    });
  });
}

enableValidation(validationConfig);
