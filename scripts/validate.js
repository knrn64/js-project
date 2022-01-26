const checkInputValidity = (formElement, inputElement) => {
    console.log('checkInputValidity works');
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    console.log("showInputError works");
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add("popup__form-field_type_error");
    errorElement.textContent = errorMessage;
    //errorElement.classList.add("popup__form-field-error"); // этот класс что делает?
};

const hideInputError = (formElement, inputElement) => {
    console.log("hideInputError works");
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove("popup__form-field_type_error");
    //errorElement.classList.remove("popup__form-field-error");
    errorElement.textContent = "";
};

// define toggleButtonState

const setEventListeners = (formElement, ...rest) => {
    console.log('setEventListeners works');
    const inputList = Array.from(formElement.querySelectorAll(".popup__form-field"));
    console.log('inputList: ' + inputList);

    inputList.forEach((inputElement) => {
        console.log('inputList.forEach in setEventListeners works');
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement);
            // call toggleButtonState
        });
    });
};

const enableValidation = ({ formSelector, ...rest }) => { 
    console.log("enableValidation works");
    const formList = Array.from(document.querySelectorAll(".popup__form-el"));

    formList.forEach((formElement, ...rest) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
});