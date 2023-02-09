
const form = document.querySelector(".form")
const inputList = Array.from(form.querySelectorAll(".form__input"))
const inputLogin = document.querySelector(".form__input_login")
const inputSafeword = document.querySelector(".form__input_safeword")
const inputNewPassword = document.querySelector(".form__input_new-password")
const inputNewPasswordRepeat = document.querySelector(".form__input_new-password-repeat")
const buttonSubmit = document.querySelector(".form__button")
const buttonClassDisabled = ".form__button:disabled"
//тестовое контрольное слово
const safeword = "qwerty"

buttonSubmit.addEventListener('click', () => {
    checkPasswordSimilarity()
    event.preventDefault()
})


//проверяем валидность заполнения формы и блокируем кнопку
function toggleButtonState() {
    if (hasInvalidInput()) {
        buttonSubmit.classList.add(buttonClassDisabled)
        buttonSubmit.setAttribute('disabled', '')
    } else {
        buttonSubmit.classList.remove(buttonClassDisabled)
        buttonSubmit.removeAttribute('disabled')
    }
}
function hasInvalidInput() {
    return inputList.some(input => {
        return !input.validity.valid
    })
}
function checkPasswordSimilarity() {
    if (inputNewPasswordRepeat.value != inputNewPassword.value) {
        showInputError(inputNewPasswordRepeat, "Пароли не совпадают")
        buttonSubmit.classList.add(buttonClassDisabled)
        buttonSubmit.setAttribute('disabled', '')
    }
}


//проверяем валидность каждого инпута в отдельности
function showInputError(input, errorMessage) {
    const inputErrorClass = "form__input-error";
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.style.display = "inline"
    input.classList.add(inputErrorClass)
    errorElement.textContent = errorMessage
};
function hideInputError(input) {
    const inputErrorClass = "form__input-error";
    const errorElement = form.querySelector(`#${input.id}-error`);
    input.classList.remove(inputErrorClass)
    errorElement.textContent = ''
};
function checkInputValidity(input) {
    if (!input.validity.valid) {
        showInputError(input, input.validationMessage)
    } else {
        hideInputError(input)
    }
}


//устанавливаем слушатели на форму и инпуты
function setEventListeners() {
    toggleButtonState();
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(input)
            this.toggleButtonState();
        })

    })
    inputNewPasswordRepeat.addEventListener('input', () => {
        checkPasswordSimilarity()
    })
    inputSafeword.addEventListener('input', () => {
        if (inputSafeword.value != safeword) {
            showInputError(inputSafeword, "Неверное контрольное слово")
        }
    })
}
setEventListeners()