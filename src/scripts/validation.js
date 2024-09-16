export const enableValidation = (validationConfig) => {
  const formsList = document.querySelectorAll(validationConfig.formSelector);

  formsList.forEach((form) => {
    form.addEventListener("submit", (e) => e.preventDefault());
    setValidateListeners(form, validationConfig);
  });
};

export const clearValidation = (form, validationConfig) => {
  const formInputs = form.querySelectorAll(validationConfig.inputSelector);
  const formButton = form.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(
    formInputs,
    formButton,
    validationConfig.inactiveButtonClass
  );

  formInputs.forEach((input) => {
    removeInputError(form, input, validationConfig);
    input.setCustomValidity("");
  });
};

const setValidateListeners = (form, validationConfig) => {
  const formInputs = form.querySelectorAll(validationConfig.inputSelector);
  const formButton = form.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(
    formInputs,
    formButton,
    validationConfig.inactiveButtonClass
  );

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(form, input, validationConfig);
      toggleButtonState(
        formInputs,
        formButton,
        validationConfig.inactiveButtonClass
      );
    });
  });
};

const toggleButtonState = (formInputs, formButton, inactiveButtonClass) => {
  if (hasInvalidInput(formInputs)) {
    formButton.classList.add(inactiveButtonClass);
    formButton.disabled = true;
  } else {
    formButton.classList.remove(inactiveButtonClass);
    formButton.disabled = false;
  }
};

const validateInput = (form, input, params) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(form, input, params);
  } else {
    removeInputError(form, input, params);
  }
};

const hasInvalidInput = (formInputs) => {
  return Array.from(formInputs).some((input) => {
    return !input.validity.valid;
  });
};

const showInputError = (form, input, params) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add(params.errorClass);
  errorElement.textContent = input.validationMessage;
  input.classList.add(params.inputErrorClass);
};

const removeInputError = (form, input, params) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(params.errorClass);
  errorElement.textContent = "";
  input.classList.remove(params.inputErrorClass);
};

export const setFormValidity = (form, isValid) => {
  const formError = form.querySelector(".form__error");
  if (isValid) {
    formError.textContent = "";
    formError.classList.remove("form__error-active");
  } else {
    formError.textContent = "Ошибка сервера, попробуйте позже";
    formError.classList.remove("form__error-active");
  }
};
