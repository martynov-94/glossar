const linkToWordTexts = {
  "de": "zum Glossar",
  "en": "to the dictionary",
  "ru": "в словарь"
};


// scroll-up button
let scrollButton = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {
  if (pageYOffset > 350) {
    scrollButton.classList.remove('visually-hidden');
  } else {
    scrollButton.classList.add('visually-hidden');
  }
});

scrollButton.onclick = () => {
  window.scrollTo(pageYOffset, 0);
}



// adding ids and h2-titles to each card
let definitionCards = document.querySelectorAll("div[class*=definition__");
console.log(definitionCards);

definitionCards.forEach(card => {
  card.classList.add("definition-card");
  card.id = card.dataset.word.split(" ").join("_").toLowerCase();

  let cardTitle = document.createElement("h2");
  cardTitle.textContent = card.dataset.word;
  card.prepend(cardTitle);

  card.dataset.word = card.dataset.word.toLowerCase();
  card.id = card.dataset.word.split(" ").join("_");
});



// adding click handlers to all links
let popupLinks = document.querySelectorAll('.definition a');

popupLinks.forEach(link => {
  link.classList.add('popup-link');

  link.onclick = () => {  
    showPopup(link.dataset.word);
  };
})



// opening and closing a popup window
let popupWindow = document.querySelector('.popup-window');
let popupContent = document.querySelector('.popup-content');
let popupCloseButton = document.querySelector('.popup-content__close-btn');

popupWindow.onclick = (e) => {
  if (!popupContent.contains(e.target) || e.target.tagName == "A") {
    popupWindow.classList.add("visually-hidden");
  }
};

popupCloseButton.onclick = () => {
  popupWindow.classList.add("visually-hidden");
};

document.onkeydown = (evt) => {
  if (evt.key == "Escape") popupWindow.classList.add("visually-hidden");
}



// contents of the popup window
let popupText = document.querySelector('.popup-content__text');

function showPopup(word) {
  popupWindow.classList.remove("visually-hidden");
  popupText.innerHTML = "";

  let contentFromCard = document.createElement("div");
  let definitionCard = document.querySelector("div[data-word='" + word.toLowerCase() + "']");
  if (definitionCard) {
    contentFromCard.innerHTML = definitionCard.innerHTML;
  } else {
    let stubTitle = document.createElement("h2");
    stubTitle.textContent = word;
    contentFromCard.append(stubTitle);
  }

  let popupLinks = contentFromCard.querySelectorAll('.popup-link');

  popupLinks.forEach(link => {
    link.href = "#" + link.dataset.word.split(" ").join("_").toLowerCase();
  });

  let popupTitle = contentFromCard.querySelector('h2');
  let linkToWord = document.createElement('a');
  linkToWord.classList.add("popup-content__link");

  let cardLanguage = "";
  try {
    cardLanguage = definitionCard.classList.value.match(/definition__([a-z]{2})/)[1];
  } catch {
    cardLanguage = "de";
  }

  let linkToWordText = linkToWordTexts.de;

  if (cardLanguage == "en") linkToWordText = linkToWordTexts.en;
  if (cardLanguage == "ru") linkToWordText = linkToWordTexts.ru;

  linkToWordText += " ➜";

  linkToWord.textContent = linkToWordText;
  linkToWord.href = "#" + word.split(" ").join("_").toLowerCase();
  popupTitle.after(linkToWord);

  popupText.innerHTML = contentFromCard.innerHTML;
}