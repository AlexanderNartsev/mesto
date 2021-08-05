const page = document.querySelector('.page');

//Слушатель на всю страницу для определения кнопок
page.addEventListener('click', function (event) {
    //Закрытие модальных окон
    if (event.target.classList.contains('button__icon_el_close')) {
        event.target.closest('.form-container').classList.toggle('form-container_opened');
    }
});

// Открыть модальное окно "Редактировать профиль"
const forms = page.querySelectorAll('.form-container');
const editForm = forms[0];
const addForm = forms[1];
const imageForm = forms[2];
const editButton = page.querySelector('.button_type_edit');
const closeButton = page.querySelector('.button_type_close');

function openProfileEditor() {
    editForm.classList.add('form-container_opened');

    // Выбрать текущие значения полей профиля
    let name = page.querySelector('.profile__name');
    let job = page.querySelector('.profile__text');

    // Присвоить текущие значения профиля полям формы
    let item = page.querySelectorAll('.form__item');
    item[0].value = name.textContent;
    item[1].value = job.textContent;
}

editButton.addEventListener('click', openProfileEditor);

// Открыть модальное окно "Добавитьь место"
const addButton = page.querySelector('.button_type_add');

function addPlace() {
    addForm.classList.add('form-container_opened');
}

addButton.addEventListener('click', addPlace);

// Сохранение данных профиля
const saveButton = page.querySelector('.button_type_save');

function formSubmitHandler(event) {
    // Отключить стандартное поведение
    event.preventDefault();

    // Выбрать введённые значения
    let Input = page.querySelectorAll('.form__item');
    let nameInput = Input[0].value;
    let jobInput = Input[1].value;

    // Присвоить введённые значения
    let name = page.querySelector('.profile__name');
    let job = page.querySelector('.profile__text');
    name.textContent = nameInput;
    job.textContent = jobInput;

    // Закрыть модальное окно
    editForm.classList.toggle('form-container_opened')
};

saveButton.addEventListener('click', formSubmitHandler);

// Создание карточки вручную
const cardContainer = page.querySelector('.elements');

function createCard(event) {
    // Отключить стандартное поведение
    event.preventDefault();

    // Клонировать разметку тимплейта
    const elementTemplate = page.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);

    // Добавить даные из аргумента
    let placeName = element.querySelector('.element__label');
    let placeUrl = element.querySelector('.element__image');

    const Input = page.querySelectorAll('.form__item');
    placeName.textContent = Input[2].value;
    placeUrl.src = Input[3].value;

    // Добавить обработчик на лайк
    const likeButton = element.querySelector('.element__like');

    function like(event) {
        event.target.classList.toggle("element__like_on");
    }

    likeButton.addEventListener('click', like);

    // Добавить обработчик на удаление
    const deleteButton = element.querySelector('.element__delete');

    function deleteCard(event) {
        event.target.closest('.element').remove();
    }

    deleteButton.addEventListener('click', deleteCard);


    // Добавить обработчик на открытие картинки
    let placeImage = element.querySelector('.element__image');

    function openImage() {
        imageForm.classList.add('form-container_opened');
    }

    placeImage.addEventListener('click', openImage);

    // Вернуть карточку через return
    cardContainer.prepend(element);
}

const addPlaceButton = page.querySelectorAll('.button_type_save')[1];

addPlaceButton.addEventListener('click', createCard);

// Создать карточку (без добавления)
function createCarde(cardData) {
    const cardTemplate = page.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

    const elementImage = cardElement.querySelector('.element__image');
    const elementLabel = cardElement.querySelector('.element__label');

    elementImage.setAttribute('src', cardData.link);
    elementImage.setAttribute('alt', cardData.name);
    elementLabel.textContent = cardData.name;

    // Добавить обработчик на лайк
    const likeButton = cardElement.querySelector('.element__like');

    function like(event) {
        event.target.classList.toggle("element__like_on");
    }

    likeButton.addEventListener('click', like);

    // Добавить обработчик на удаление
    const deleteButton = cardElement.querySelector('.element__delete');

    function deleteCard(event) {
        event.target.closest('.element').remove();
    }

    deleteButton.addEventListener('click', deleteCard);

    // Добавить обработчик на открытие картинки
    let placeImage = cardElement.querySelector('.element__image');

    function openImage(event) {
        imageForm.classList.add('form-container_opened');

        let imageUrl = imageForm.querySelector('.image-popup__image').getAttribute('src');
        let imageName = imageForm.querySelector('.image-popup__image').getAttribute('alt');

        imageUrl = event.target.getAttribute('src');
        imageName = event.target.getAttribute('alt');

        imageForm.querySelector('.image-popup__image').setAttribute('src', imageUrl);
        imageForm.querySelector('.image-popup__name').textContent = imageName;

    }

    placeImage.addEventListener('click', openImage);

    return cardElement;
}

// Добавить карточку

function addCarde(cardData, cardContainer) {
    const card = createCarde(cardData);
    cardContainer.prepend(card);
}

// Добавление карточек по умолчанию
// Массив карточек по умолчанию
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Создание стандартных карточек из массива
initialCards.forEach(function (cardData) {
    createCarde(cardData);
    addCarde(cardData, cardContainer);
});
