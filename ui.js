// ui.js

function createCardElement(card, isBackSide, selectedCategory, isOpponent = false) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  if (isBackSide) {
    cardElement.classList.add('back');
    cardElement.style.backgroundImage = "url('card_back.png')";
  } else {
    cardElement.classList.add('front');
    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.name}" />
      <div class="info">
        <h3>${card.name}</h3>
        ${Object.entries(card.categories).map(([key, value]) => {
          const highlightClass = (key === selectedCategory) ? 'highlight' : '';
          return `<p class="${highlightClass}"><strong>${key}:</strong> ${value}</p>`;
        }).join('')}
      </div>
    `;
  }
  if (isOpponent) {
    cardElement.classList.add('opponent-card');
  }
  return cardElement;
}