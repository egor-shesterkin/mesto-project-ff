// Объект с конфигом для валидации данных в полях форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Функция очистки ошибок валидации
export const clearValidation = (profileForm, validationConfig) => {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
  
  const errorElements = [];
  inputList.forEach((input) => {
    input.classList.remove(validationConfig.inputErrorClass);
    errorElements.push(profileForm.querySelector(`.${input.id}-error`));
  });

  errorElements.forEach((element) => {
    element.classList.remove(validationConfig.errorClass);
    element.textContent = '';
  })

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);

};

// Функция отображения ошибок при валидации формы
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Функция скрытия ошибок при валидации формы
const hideInputError = (formElement, inputElement, settings) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
}; 

// Функция проверки наличия ошибок в полях формы и отображения описания ошибок
const isValid = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, settings);
  }
}; 

// Функция проверки наличия ошибок при вводе данных в поля формы
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция изменения состояния кнопки в зависимости от наличия ошибок в полях формы
const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

// Функция активации валидации на полях внутри формы
const setEventListeners = (formElement, settings) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

   // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, settings);

      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}; 

// Функция активации валидации в формах
export const enableValidation = (settings) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, settings);
  });
};
