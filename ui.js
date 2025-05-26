// ui.js

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card', 'back');
  cardElement.dataset.id = card.id;

  // Front side
  const front = document.createElement('div');
  front.classList.add('front');
  const img = document.createElement('img');
  img.src = card.image;
  img.alt = card.name;
  front.appendChild(img);

  const info = document.createElement('div');
  info.classList.add('info');
  info.innerHTML = `<h3>${card.name}</h3>`;
  for (const [key, value] of Object.entries(card.categories)) {
    info.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
  }
  front.appendChild(info);

  // Back side
  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = "url('card_back.png.png')";

  cardElement.appendChild(front);
  cardElement.appendChild(back);

  return cardElement;
}

function renderCards(cards, container) {
  container.innerHTML = '';
  cards.forEach(card => {
    const cardEl = createCardElement(card);
    container.appendChild(cardEl);
  });
}