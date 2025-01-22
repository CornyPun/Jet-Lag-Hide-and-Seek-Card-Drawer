const cardDiv = document.querySelector(".card");
const cardInnerDiv = document.querySelector(".card-inner");
const cardBackImage = document.querySelector(".card-back-image");
const handButtonDiv = document.querySelector(".hand-button");
const toggleContainerDiv = document.querySelector(".toggle-container");
const handContainerDiv = document.querySelector(".hand-container");

const HIDDEN_STATE = 1;
const UNFLIPPED_STATE = 2;
const FLIPPED_STATE = 3;
let cardState = HIDDEN_STATE;
let animPlaying = false;

let cardDeck = [];
let drawnCardName, drawnCardFilePath;

function createCardDeck() {
    for (let i = 0; i < 100; i++) {
        switch (true) {
            case (i < 24):
                cardDeck.push("c-" + (i + 1));
                break;
            case (i < 49):
                cardDeck.push("tb-red");
                break;
            case (i < 64):
                cardDeck.push("tb-orange");
                break;
            case (i < 74):
                cardDeck.push("tb-yellow");
                break;
            case (i < 77):
                cardDeck.push("tb-green");
                break;
            case (i < 79):
                cardDeck.push("tb-blue");
                break;
            case (i < 83):
                cardDeck.push("pu-randomize");
                break;
            case (i < 87):
                cardDeck.push("pu-veto");
                break;
            case (i < 89):
                cardDeck.push("pu-duplicate");
                break;
            case (i < 90):
                cardDeck.push("pu-move");
                break;
            case (i < 94):
                cardDeck.push("pu-discard1draw2");
                break;
            case (i < 98):
                cardDeck.push("pu-discard2draw3");
                break;
            case (i < 100):
                cardDeck.push("pu-draw1expand1");
                break;
        }
    }
}

createCardDeck();

function drawCard() {
    const drawnCardName = cardDeck[Math.floor(Math.random() * cardDeck.length)];
    const drawnCardFilePath = "card-images/" + drawnCardName + ".png";
    cardBackImage.src = drawnCardFilePath;

    return [drawnCardName, drawnCardFilePath];
}

function addCard(drawnCardName, drawnCardFilePath) {
    cardDeck.splice(cardDeck.indexOf(drawnCardName), 1);

    const cardCopyDiv = document.createElement("div");
    cardCopyDiv.classList.add("card-copy");
    cardCopyDiv.id = drawnCardName;
    
    const cardCopyImage = document.createElement("img");
    cardCopyImage.classList.add("card-copy-image");
    cardCopyImage.src = drawnCardFilePath;

    const cardCopyDiscardDiv = document.createElement("div");
    cardCopyDiscardDiv.classList.add('card-copy-discard');
    cardCopyDiscardDiv.classList.add('card-copy-discard-hidden');

    const cardCopyDiscardHeader = document.createElement("h1");
    cardCopyDiscardHeader.innerHTML = "DISCARD";
    cardCopyDiscardHeader.classList.add("card-copy-discard-header");
    cardCopyDiscardDiv.appendChild(cardCopyDiscardHeader);

    cardCopyDiv.appendChild(cardCopyImage);
    cardCopyDiv.appendChild(cardCopyDiscardDiv);
    handContainerDiv.appendChild(cardCopyDiv);

    cardCopyDiv.addEventListener("click", e => {
        cardCopyDiscardDiv.classList.toggle("card-copy-discard-hidden");
        cardCopyDiv.classList.toggle("card-copy-extended");
    })

    cardCopyDiscardDiv.addEventListener("click", e => {
        cardCopyDiv.remove();
        cardDeck.push(cardCopyDiv.id);
        console.log(cardDeck);
    })
}

function toggleState() {
    animPlaying = true;

    if (cardState === HIDDEN_STATE) {
        //console.log(drawCard())
        [drawnCardName, drawnCardFilePath] = drawCard();

        cardInnerDiv.classList.toggle("card-hidden");
        cardInnerDiv.classList.toggle("card-unflipped");

        cardState = UNFLIPPED_STATE;
    } else if (cardState === UNFLIPPED_STATE) {
        cardInnerDiv.classList.toggle("card-unflipped");
        cardInnerDiv.classList.toggle("card-flipped");

        cardState = FLIPPED_STATE;
    } else {
        addCard(drawnCardName, drawnCardFilePath);

        cardInnerDiv.classList.toggle("card-flipped");
        cardInnerDiv.classList.toggle("card-disappear");

        cardState = HIDDEN_STATE;
    }
}

cardDiv.addEventListener("click", e => {
    if (animPlaying === false) {
        toggleState(); 
        setTimeout(() => { 
            if (cardState === HIDDEN_STATE) {
                cardInnerDiv.classList.toggle("card-disappear");
                cardInnerDiv.classList.toggle("card-hidden");
            }
            animPlaying = false;
        }, 800);    
    }
});

handButtonDiv.addEventListener("click", e => {
    toggleContainerDiv.classList.toggle("toggle-container-visible");
});