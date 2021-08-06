// Вся страница
const page = document.querySelector('.page');

// Область добавления карточек
const cardsArea = page.querySelector('.elements');

// Формы
const popUpProfile = page.querySelector('.edit-form');
const popUpNewPlace = page.querySelector('.add-form');
const popUpImage = page.querySelector('.image-popup');

// Кнопки закрытия форм
const buttonClosePopUpProfile = popUpProfile.querySelector('.button_type_close');
const buttonClosePopUpNewPlace = popUpNewPlace.querySelector('.button_type_close');
const buttonClosePopUpImage = popUpImage.querySelector('.button_type_close');

// Контейнеры форм
const popUpProfileContainer = popUpProfile.closest('.form-container');
const popUpNewPlaceContainer = popUpNewPlace.closest('.form-container');
const popUpImageContainer = popUpImage.closest('.form-container');

// Кнопки страницы
const buttonOpenPopUpProfile = page.querySelector('.button_type_edit');
const buttonOpenPopUpNewPlace = page.querySelector('.button_type_add');

// Данные профиля
let profileName = page.querySelector('.profile__name');
let profileActivityType = page.querySelector('.profile__text');

// Поля ввода форм
let profileNameInput = popUpProfile.querySelector('.form__item[name=name]');
let profileActivityTypeInput = popUpProfile.querySelector('.form__item[name=activity-type]');

// Открыть PopUp
function openPopUp(popUp) {
    popUp.classList.add('form-container_opened');
}

// Закрыть PopUp
function closePopUp(popUp) {
    popUp.classList.remove('form-container_opened');
}

// Открыть модальное окно "Редактировать профиль"
function openPopUpProfile() {
    openPopUp(popUpProfileContainer);

    // Присвоить текущие значения профиля полям формы
    profileNameInput.value = profileName.textContent;
    profileActivityTypeInput.value = profileActivityType.textContent;
}

// Сохранение данных профиля
function submitFormProfile(event) {
    // Отключить стандартное поведение
    event.preventDefault();

    // Присвоить введённые значения на форме полям профиля
    profileName.textContent = profileNameInput.value;
    profileActivityType.textContent = profileActivityTypeInput.value;

    // Закрыть модальное окно
    closePopUp(popUpProfileContainer);
};

// Открыть модальное окно "Добавить место"
function openPopupAddPlace() {
    openPopUp(popUpNewPlaceContainer);
}

// Открыть модальное окно с изображением
function openImage(event) {
    openPopUp(popUpImageContainer);

    let imageUrl = popUpImageContainer.querySelector('.image-popup__image').getAttribute('src');
    let imageName = popUpImageContainer.querySelector('.image-popup__image').getAttribute('alt');

    imageUrl = event.target.getAttribute('src');
    imageName = event.target.getAttribute('alt');

    popUpImageContainer.querySelector('.image-popup__image').setAttribute('src', imageUrl);
    popUpImageContainer.querySelector('.image-popup__name').textContent = imageName;
}

// Сформировать карточку (без добавления на страницу)
function createCard(cardData) {
    const cardTemplate = page.querySelector('#element-template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    const cardImage = card.querySelector('.element__image');
    const cardLabel = card.querySelector('.element__label');

    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    cardLabel.textContent = cardData.name;

    // Добавить обработчик на лайк
    const likeButton = card.querySelector('.element__like');

    function like(event) {
        event.target.classList.toggle("element__like_on");
    }

    likeButton.addEventListener('click', like);

    // Добавить обработчик на удаление
    const deleteButton = card.querySelector('.element__delete');

    function deleteCard(event) {
        event.target.closest('.element').remove();
    }

    deleteButton.addEventListener('click', deleteCard);

    // Добавить обработчик на открытие изображения
    let placeImage = card.querySelector('.element__image');

    placeImage.addEventListener('click', openImage);

    // Вернуть сформированную карточку
    return card;
}

// Добавить карточку
function addCard(cardData, cardsArea) {
    const card = createCard(cardData);
    cardsArea.prepend(card);
}

// Создать карточку вручную
function createCardHandle(event) {

    // Отключить стандартное поведение
    event.preventDefault();

    // Определить значения полей формы
    const name = popUpNewPlace.querySelector('.form__item[name=name]').value;
    const link = popUpNewPlace.querySelector('.form__item[name=url]').value;

    addCard({ name, link }, cardsArea);

    closePopUp(popUpNewPlaceContainer);

    popUpNewPlace.reset();
}

// Создать стандартные карточки из массива
initialCards.forEach(function (cardData) {
    createCard(cardData);
    addCard(cardData, cardsArea);
});

// Установка слушателей на элементы
buttonOpenPopUpProfile.addEventListener('click', openPopUpProfile);
buttonOpenPopUpNewPlace.addEventListener('click', openPopupAddPlace);
popUpProfile.addEventListener('submit', submitFormProfile);
popUpNewPlace.addEventListener('submit', createCardHandle);
buttonClosePopUpProfile.addEventListener('click', () => closePopUp(popUpProfileContainer));
buttonClosePopUpNewPlace.addEventListener('click', () => closePopUp(popUpNewPlaceContainer));
buttonClosePopUpImage.addEventListener('click', () => closePopUp(popUpImageContainer));