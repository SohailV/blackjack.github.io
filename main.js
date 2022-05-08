 import * as deal from './deal.js';
 import * as reset from './reset.js';
 import * as onHold from './onhold.js';
// include('deal.js');
//array for the cards
let array = {
    num: ["A", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "J", "Q", "K"],
    // Hearts, Spade, Diamond, Club.
    shape: ["\u2665", "\u2660", "\u2666", "\u2663"],
    numValue: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
};

// Array to store the shapes.
// let shapeArray = [];
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
    result: document.getElementById('fResult')
    
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
tags.label.textContent = "Bet Value : 0";
tags.bet.value = 0;
tags.bet.max = values.chips;


// slider
function slideValue() {
    label.textContent = "Bet Value : " + bet.value;
    bet.setAttribute('title', bet.value) ;
}
// Display final result.
function finalResult(text) {
    // debugger;
    let result = document.getElementById('fResult');
    result.textContent = text;
    // result.style.cssText = "background:white;";
    tags.hit.disabled = true;
    tags.hold.disabled = true;
}

function buttonClick() {
    console.log(this.id);
let buttonClicked = document.getElementById(this.id);
if (buttonClicked.classList == "buttonclick") {
    buttonClicked.classList.remove('buttonclick');
} else {
    buttonClicked.classList.add('buttonclick');
}
}

tags.deal.addEventListener('click', deal.dealing);
tags.hit.addEventListener('click', deal.hitme);
tags.hold.addEventListener('click', onHold.onHold);
tags.reset.addEventListener('click', reset.resetAll);
tags.bet.addEventListener('input', slideValue);
tags.deal.addEventListener('mousedown', buttonClick);
tags.deal.addEventListener('mouseup', buttonClick);
tags.hit.addEventListener('mousedown', buttonClick);
tags.hit.addEventListener('mouseup', buttonClick);
tags.hold.addEventListener('mousedown', buttonClick);
tags.hold.addEventListener('mouseup', buttonClick);
tags.reset.addEventListener('mousedown', buttonClick);
tags.reset.addEventListener('mouseup', buttonClick);

tags.deal.addEventListener('touchstart', buttonClick);
tags.deal.addEventListener('touchend', buttonClick);
tags.hit.addEventListener('touchstart', buttonClick);
tags.hit.addEventListener('touchend', buttonClick);
tags.hold.addEventListener('touchstart', buttonClick);
tags.hold.addEventListener('touchend', buttonClick);
tags.reset.addEventListener('touchstart', buttonClick);
tags.reset.addEventListener('touchend', buttonClick);




export {
    array, tags, values, cardNum, cardShape, numOfCard,
    shapeOfCard, finalResult,
};