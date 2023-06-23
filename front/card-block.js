/*
function decreaseSpaceBetweenCards() {
  const cardBlockWidth = cardBlock.offsetWidth;
  const cardsCount = cards.length;
  const minMarginLeft = 0; // Убираем фиксированный margin для карточки
  const cardWidth = cards[0].offsetWidth;
  const spaceWidth = cardBlockWidth - (cardsCount - 1) * cardWidth; // Учитываем количество промежутков между карточками
  const marginLeft = Math.floor(spaceWidth / (cardsCount - 1));

  cards.forEach((card, index) => {
    card.style.marginLeft = `${minMarginLeft + marginLeft}px`; // Устанавливаем динамический margin для карточки
    card.style.zIndex = `${cardsCount - index}`; // Устанавливаем z-index, чтобы карточки наслаивались друг на друга
  });
}


// Устанавливаем начальные отступы между карточками
cards.forEach((card, index) => {
  if (index !== 0) {
    const previousCard = cards[index - 1];
    const marginLeft = previousCard.offsetWidth; // Убираем деление на 2, чтобы карточки наслаивались друг на друга
    card.style.marginLeft = `-${marginLeft}px`;
    card.style.zIndex = `${cards.length - index}`;
  }
});



const zone1=document.querySelector('.card-block1')
const zone2=document.querySelector('.card-block2')
const ufo=document.querySelector('#card')

zone1.ondragover = allowDrop;


function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const newCard = document.getElementById(data).cloneNode(true);
  cardBlock.appendChild(newCard);
  cards = cardBlock.querySelectorAll('.card');
  decreaseSpaceBetweenCards();

  // Устанавливаем отступы для новой карточки
  const previousCard = cards[cards.length - 2];
  const marginLeft = previousCard.offsetWidth / 2;
  const lastCard = cards[cards.length - 1];
  lastCard.style.marginLeft = `-${marginLeft}px`;
  lastCard.style.zIndex = `${cards.length}`;
}


*/
let cardsZone1 = document.querySelector("#cards-1");
let cardsZone2 = document.querySelector("#cards-2");
let cardsZone3 = document.querySelector("#cards-3");
let cardsZone4 = document.querySelector("#cards-4");
let cardsZone5 = document.querySelector("#cards-5");
let allCards = document.querySelectorAll('.card');
let currentDrag;

function dragstart_handler(e) {
  currentDrag = e.target.closest('.card');
}

function dragover_handler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  const target = e.target.closest('.card');
  if (target && target !== currentDrag) {
    if (currentDrag.parentElement === target.parentElement) {
      currentDrag.parentElement.insertBefore(currentDrag, target.nextSibling);
    } else {
      currentDrag.parentElement.removeChild(currentDrag);
      target.parentElement.insertBefore(currentDrag, target.nextSibling);
    }
  } else if (target === null && e.target.closest('.cards-zone')) {
    e.target.closest('.cards-zone').appendChild(currentDrag);
  }
}

function drop_handler(e) {
  // Prevent default action (open as link for some elements)
  e.preventDefault();
  const target = e.target.closest('.card');
  const zone = e.target.closest('.cards-zone');
  zone.insertBefore(currentDrag, target.nextSibling);
}

allCards.forEach(item => {
  item.addEventListener('dragstart', dragstart_handler);
  item.addEventListener('dragover', dragover_handler);
  item.addEventListener('drop', drop_handler);
});