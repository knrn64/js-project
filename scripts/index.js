const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

const editProfilePopupCloseButton = document.querySelector(".popup__close-button_edit-profile");
const editProfilePopup = document.querySelector(".popup_edit-profile");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-card-button");
const addCardPopup = document.querySelector(".popup_add-place");
const addCardPopupСloseButton = document.querySelector(".popup__close-button_add-place");

const editProfileFormElement = document.querySelector(".popup__form-el_edit-profile");

const nameInput = document.querySelector("#profile-name");
const titleInput = document.querySelector("#profile-title");
const profileName = document.querySelector(".profile__info-name");
const profileTitle = document.querySelector(".profile__info-title");

nameInput.value = profileName.textContent;
titleInput.value = profileTitle.textContent;

const addNewPlaceFormElement = document.querySelector(".popup__form-el_add-place");

const imagePopup = document.querySelector(".image-popup");
const imageInPopup = document.querySelector(".image-popup__image");
const captionInPopup = document.querySelector(".image-popup__caption");
const imagePopupCloseButton = document.querySelector(".popup__close-button_image-popup");

// const popups = [imagePopup, addCardPopup, editProfilePopup];

document.addEventListener('click', function (event) {
    //console.log("click event target:" + event.target);
        if (event.target == (addCardPopup || addCardPopupСloseButton)) {
            addCardPopup.classList.toggle('popup_visible');
        }
        if (event.target == (editProfilePopup || editProfilePopupCloseButton)) {
            editProfilePopup.classList.toggle('popup_visible');
        }
        if (event.target == (imagePopup || imagePopupCloseButton)) {
            imagePopup.classList.toggle('popup_visible');
            //console.log("image popoup should be closed");
        }
    }
)

// зарытие по эскейпу - надо будет доделать закрытие попапов нормально
// document.addEventListener("keydown", function (evt) {
//     if (evt.key === "Escape") {
//         console.log("Escape");
//     };
// });

function setEventListenersForClickable() { // так себе название функции конечно
    let likeButtonList = document.querySelectorAll(".gallery__button-like");
    let cardRemoveButtonList = document.querySelectorAll(".gallery__button-remove");
    let cardImageList = document.querySelectorAll(".gallery__image");

    likeButtonList.forEach(likeButton => likeButton.addEventListener('click', handleLike));
    cardRemoveButtonList.forEach(cardRemoveButton => cardRemoveButton.addEventListener('click', removeCard));
    cardImageList.forEach(cardImage => cardImage.addEventListener('click', openImagePopup));
}

//отрисовываем карточки
function renderInitialCards(array) {
    array.forEach((item) => {
        const cardTemplate = document.querySelector('#card-template').content;
        const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
        const cardNameElement = cardElement.querySelector('.gallery__card-name');
        const cardImageElement = cardElement.querySelector('.gallery__image');
        const cardsContainer = document.querySelector('.gallery');

        cardNameElement.textContent = item.name;
        cardImageElement.src = item.link;

        cardsContainer.prepend(cardElement);

        setEventListenersForClickable();
    })
}

renderInitialCards(initialCards);

function handleLike(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('gallery__button-like_active');
}

function removeCard(evt) {
    const cardForRemoval = evt.target.closest('.gallery__card');
    cardForRemoval.remove();
}

function toggleEditProfilePopup() {
    editProfilePopup.classList.toggle('popup_visible');
}

function toggleAddCardPopup() {
    addCardPopup.classList.toggle('popup_visible');
}

editProfileButton.addEventListener("click", toggleEditProfilePopup);
editProfilePopupCloseButton.addEventListener("click", toggleEditProfilePopup);

addCardButton.addEventListener("click", toggleAddCardPopup);
addCardPopupСloseButton.addEventListener("click", toggleAddCardPopup);

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileTitle.textContent = titleInput.value;
    toggleEditProfilePopup();
    // nameInput.value = ""; - нужна ли ф-ть ресета полей?
    // titleInput.value = "";
}

editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

// adding custom cards by user

function handleAddNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const placeNameInput = document.querySelector("#place-name");
    const placeImageUrl = document.querySelector("#place-image-url");

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
    const cardNameElement = cardElement.querySelector('.gallery__card-name');
    const cardImageElement = cardElement.querySelector('.gallery__image');
    const cardsContainer = document.querySelector('.gallery');

    const newCardLikeButton = cardElement.querySelector('.gallery__button-like');
    const newCardRemoveCardButton = cardElement.querySelector('.gallery__button-remove');

    cardNameElement.textContent = placeNameInput.value;
    cardImageElement.src = placeImageUrl.value;

    newCardLikeButton.addEventListener('click', handleLike);
    newCardRemoveCardButton.addEventListener('click', removeCard);

    cardsContainer.prepend(cardElement);

    toggleAddCardPopup();
    addNewPlaceFormElement.reset();
}

addNewPlaceFormElement.addEventListener('submit', handleAddNewPlaceFormSubmit);

// image popup logic

//set listeners for every image - it's done inside the seteventlisterns fucntions

function toggleImagePopup() {
    imagePopup.classList.toggle('popup_visible');
}

function openImagePopup(evt) {
    //const eventTarget = evt.target;
    //const eventTargetParent = evt.target.closest('.gallery__card');
    //console.log(eventTarget);

    //console.log(evt.target.closest('.gallery__card').querySelector('.image-popup__caption'));
    //console.log(evt.target.closest('.image-popup__caption'));

    // get caption
    // firsts, find the parent
    // console.log(evt.target.closest('.gallery__card'));
    const eventTargetParent = evt.target.closest('.gallery__card');

    // second, find the caption
    // console.log(eventTargetParent.querySelector('.gallery__card-name'));

    imageInPopup.src = evt.target.src;
    captionInPopup.textContent = evt.target.closest('.gallery__card').querySelector('.gallery__card-name').textContent;

    toggleImagePopup();

}
