 import * as deal from './deal.js';
 import * as chips from './chips.js';
 import * as reset from './reset.js';
 import * as onHold from './onhold.js';
// include('deal.js');
//array for the cards
let array = {
    num: ["A", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "J", "Q", "K"],
    // Hearts, Spade, Diamond, Club.
    shape: ["\u2764", "\u2660", "\u2666", "\u2663"],
    numValue: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
};

// Array to store the shapes.
let shapeArray = [];
//object for all the tags.
let tags = {
    deal: document.getElementById("deal"),
    hit: document.getElementById("hit"),
    hold: document.getElementById("hold"),
    reset: document.getElementById("reset"),
    player: document.getElementById("player"),
    dealer: document.getElementById("dealer"),
    pscore: document.getElementById('pscore'),
    dscore: document.getElementById('dscore'),
    chips: document.getElementById('chips'),
    bet: document.getElementById('bet'),
    label: document.getElementById('label'),
};
// All values included in the game.
let values = {
    playerValue: 0,
    dealerValue: 0,
    pIsAce: false,
    dIsAce: false,
    chips: 500,
    roundStatus: "initial",
    roundComplete: false,
};
//Math random function for card deal.
let cardNum = () => Math.floor(Math.random() * array.num.length);
let cardShape = () => Math.floor(Math.random() * array.shape.length);
let numOfCard = () => array.num[cardNum()];
let shapeOfCard = () => array.shape[cardShape()];
tags.hit.disabled = true;
tags.hold.disabled = true;
tags.reset.disabled = true;
tags.chips.textContent = "Total Chips : " + values.chips;
tags.label.textContent = "Total Chips to Bet";
tags.bet.value = 1;

// Display final result.
function finalResult(text) {
    let result = document.createElement('p');
    result.className = "result";
    result.textContent = text;
    result.style.cssText = "background:white;";
    document.body.appendChild(result);
    tags.hit.disabled = true;
    tags.hold.disabled = true;
}

tags.deal.addEventListener('click', deal.dealing);
tags.hit.addEventListener('click', deal.hitme);
tags.hold.addEventListener('click', onHold.onHold);
tags.reset.addEventListener('click', reset.resetAll);

export {
    array, tags, values, cardNum, cardShape, numOfCard,
    shapeOfCard, finalResult, shapeArray,
};