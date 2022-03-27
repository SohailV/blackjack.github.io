//array for the cards
let array = {
    num: ["A", "2", "3", "4", "5", "6", "7",
        "8", "9", "10", "J", "Q", "K"],
            // Heart, Spade, Diamond, club    
    shape: ["\u2764", "\u2660", "\u2666", "\u2663"],
    numValue: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],
};
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
let values = {
    playerValue: 0,
    dealerValue: 0,
    pIsAce: false,
    dIsAce: false,
    chips: 500,
    roundStatus: "initial",
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

function chipsCalc(roundStatus) {
    // chips calculation.
    // debugger;
    if (roundStatus == "Won") {
        values.chips += (tags.bet.value * 2);
        tags.bet.value = 0;
        tags.chips.textContent = "Total Chips : " + values.chips;
    } else if (roundStatus == "Tie") {
        values.chips += (tags.bet.value * 1);
        tags.bet.value = 0;
        tags.chips.textContent = "Total Chips : " + values.chips;
    } else {
        tags.bet.value = 0;
        tags.chips.textContent = "Total Chips : " + values.chips;
    }
}

function finalResult(text) {
    let result = document.createElement('p');
    result.className = "result";
    result.textContent = text;
    result.style.cssText = "background:white;";
    document.body.appendChild(result);
    tags.hit.disabled = true;
    tags.hold.disabled = true;
}
let shapeArray = [];

function dealing() {
    if (isNaN(tags.bet.value) || tags.bet.value == 0 || tags.bet.value > values.chips) {
        label.textContent = "Enter a valid Amount";
        label.style.cssText = "color:red;";
    } else {
        for (let i = 2; i < 6; i++) {
            let j = i % 2;
            if (j === 0) {
                // debugger;
                let div = document.createElement('div');
                let para1 = document.createElement('p');
                let para2 = document.createElement('p');
                let para3 = document.createElement('p');
                para1.id = "para" + i;
                //para1.className = "cards";
                div.className = "cards";
                let numOnCard = numOfCard();
                // let numOnCard = array.num[0];
                let shapeOnCard = shapeOfCard();
                if(numOnCard == "J" || numOnCard == "Q" || numOnCard == "K" || numOnCard == "A") {
                    para1.textContent = numOnCard + " of " + shapeOnCard;    
                    div.appendChild(para1);
                }else {
                    if(shapeOnCard == )
                    for (j = 0; j < [numOnCard]; j++) {
                        shapeArray.push(shapeOnCard);
                    }
                    para1.textContent = numOnCard;
                    para1.className = "left";
                    // div.textContent = para + shapeArray.join(" ") + div.appendChild(para);
                    //div.appendChild(para).firstChild;
                    para2.textContent = shapeArray.join(" ");
                    para3.textContent = numOnCard;
                    para3.className = "right";
                    div.appendChild(para1);
                    div.appendChild(para2);
                    div.appendChild(para3);

                }
                
                // console.log(shapeArray);
                
                tags.player.appendChild(div);
                values.playerValue += array.numValue[array.num.indexOf(numOnCard)];
                pscore.textContent = "Player Total: " + values.playerValue;

                if (values.playerValue === 21) {
                    // debugger;
                    let text = "Lets check out the dealer";
                    finalResult(text);
                } else if (numOnCard === "A") {
                    values.pIsAce = true;
                    if (values.playerValue > 21) {
                        values.playerValue -= 10;
                        pscore.textContent = "Player Total: " + values.playerValue;
                    }
                }
            }
            else {
                let para = document.createElement('p');
                para.id = "para" + i;
                para.className = "cards";
                let numOnCard = numOfCard();
                // let numOnCard = array.num[1];
                para.textContent = numOnCard + " of " + shapeOfCard();
                tags.dealer.appendChild(para);
                values.dealerValue += array.numValue[array.num.indexOf(numOnCard)];
                dscore.textContent = "Dealer Total: " + values.dealerValue;
                if (numOnCard === "A") {
                    values.dIsAce = true;
                    if (values.dealerValue > 21) {
                        values.dealerValue -= 10;
                        dscore.textContent = "Dealer Total: " + values.dealerValue;
                    }
                }
            }
            shapeArray = [];
        }
        tags.deal.disabled = true;
        tags.hit.disabled = false;
        tags.hold.disabled = false;
        tags.dscore.style.cssText = "display:none;";
        tags.label.textContent = "Chips Betted";
        label.style.cssText = "color:blue;";
        values.chips -= tags.bet.value;
        tags.chips.textContent = "Total Chips : " + values.chips;
        tags.bet.disabled = true;
        tags.bet.style.cssText = "color: red;";
        if (values.playerValue === 21) {
            onHold();
        }
    }
}

function hitme() {
    // debugger;
    let para = document.createElement('p');
    para.className = "cards";
    let numOnCard = numOfCard();
    // let numOnCard = array.num[1];
    para.textContent = numOnCard + " of " + shapeOfCard();
    tags.player.appendChild(para);
    values.playerValue += array.numValue[array.num.indexOf(numOnCard)];
    pscore.textContent = "Player Total: " + values.playerValue;
    if (values.playerValue > 21) {
        if (values.pIsAce) {
            values.playerValue -= 10;
            pscore.textContent = "Player Total: " + values.playerValue;
            values.pIsAce = false;
        } else if (numOnCard === "A") {
            values.playerValue -= 10;
            pscore.textContent = "Player Total: " + values.playerValue;
            if (values.playerValue === 21) {
                let text = "Lets check out the dealer";
                finalResult(text);
                onHold();
            }
        }
        else {
            let text = "You Lost";
            finalResult(text);
            tags.reset.disabled = false;
            values.roundStatus = "Lost";
            return chipsCalc(values.roundStatus);
        }
    } else if (values.playerValue === 21) {
        let text = "Lets check out the dealer";
        finalResult(text);
        onHold();
    } else if (numOnCard === "A") {
        values.pIsAce = true;
    }
}

function onHold() {
    // debugger;
    tags.hold.disabled = true;
    tags.reset.disabled = false;
    let para5 = document.getElementById('para5');
    para5.style.cssText = "display:inline-block;";
    tags.dscore.style.cssText = "display:inline-block;"
    tags.hit.disabled = true;
    if (values.dealerValue >= 17 && values.dealerValue < values.playerValue) {
        let text = "You Win";
        finalResult(text);
        values.roundStatus = "Won";
        chipsCalc(values.roundStatus);
    } else if (values.dealerValue >= 17 && values.dealerValue === values.playerValue) {
        let text = "It's a TIE";
        finalResult(text);
        values.roundStatus = "Tie";
        chipsCalc(values.roundStatus);
    } else if (values.dealerValue >= 17 && values.dealerValue > values.playerValue) {
        let text = "You Lose";
        finalResult(text);
        values.roundStatus = "Lost";
        chipsCalc(values.roundStatus);
    } else if (values.dealerValue <= 21 && values.dealerValue > values.playerValue) {
        let text = "You Lose";
        finalResult(text);
        values.roundStatus = "Lost";
        chipsCalc(values.roundStatus);
    } else {
        // debugger;
        for (values.dealerValue; values.dealerValue < 17;) {
            let para = document.createElement('p');
            para.className = "cards";
            let numOnCard = numOfCard();
            //   let numOnCard = array.num[0];
            para.textContent = numOnCard + " of " + shapeOfCard();
            tags.dealer.appendChild(para);
            values.dealerValue += array.numValue[array.num.indexOf(numOnCard)];
            dscore.textContent = "Dealer Total: " + values.dealerValue;
            if (values.dealerValue > 21) {
                if (values.dIsAce) {
                    values.dealerValue -= 10;
                    dscore.textContent = "Dealer Total: " + values.dealerValue;
                    values.dIsAce = false;
                } else if (numOnCard === "A") {
                    values.dealerValue -= 10;
                    dscore.textContent = "Dealer Total: " + values.dealerValue;
                    onHold();
                }
                else {

                    let text = "You Win";
                    finalResult(text);
                    values.roundStatus = "Won";
                    chipsCalc(values.roundStatus);
                }
            } else if (values.dealerValue >= 17 && values.dealerValue < 21) {
                onHold();
            } else if (values.dealerValue === 21) {
                onHold();
            } else if (numOnCard === "A") {
                values.dIsAce = true;
            }
        }
    }
}

function resetAll() {
    values.playerValue = 0;
    values.dealerValue = 0;
    values.pIsAce = false;
    values.dIsAce = false;
    tags.reset.disabled = true;
    tags.deal.disabled = false;
    pscore.textContent = "Player Total: " + values.playerValue;
    dscore.textContent = "Dealer Total: " + values.dealerValue;
    tags.bet.value = 1;
    tags.label.textContent = "Total Chips to Bet";
    tags.bet.disabled = false;
    tags.bet.style.cssText = "color: black;";
    shapeArray = [];

    while (tags.dealer.firstChild) {
        tags.dealer.removeChild(tags.dealer.firstChild);
    }
    while (tags.player.firstChild) {
        tags.player.removeChild(tags.player.firstChild);
    }
    while (document.getElementsByClassName('result')[0]) {
        document.getElementsByClassName('result')[0].remove();
    }
}

deal.addEventListener('click', dealing);
hit.addEventListener('click', hitme);
hold.addEventListener('click', onHold);
reset.addEventListener('click', resetAll);