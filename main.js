
let array = {
    num: ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
        "Eight", "Nine", "Ten", "Jack", "Queen", "King"],

    shape: ["Heart", "Spade", "Diamond", "Club"],

    numValue: [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10],

};

let tags = {
    deal: document.getElementById("deal"),
    hit: document.getElementById("hit"),
    hold: document.getElementById("hold"),
    player: document.getElementById("player"),
    dealer: document.getElementById("dealer"),
    pscore: document.getElementById('pscore'),
    dscore: document.getElementById('dscore'),
};

let values = {
    playerValue: 0,
    dealerValue: 0,
    pIsAce: false,
    dIsAce: false,
};

let cardNum = () => Math.floor(Math.random() * array.num.length);
let cardShape = () => Math.floor(Math.random() * array.shape.length);
let numOfCard = () => array.num[cardNum()];
let shapeOfCard = () => array.shape[cardShape()];
tags.hit.disabled = true;
tags.hold.disabled = true;


function dealing() {
    tags.hit.disabled = false;
    tags.hold.disabled = false;

    for (let i = 2; i < 6; i++) {
        let j = i % 2;
        if (j === 0) {

            let para = document.createElement('p');
            para.id = "para" + i;
            let numOnCard = numOfCard();
            // let numOnCard = array.num[8];
            para.textContent = numOnCard + " of " + shapeOfCard();
            tags.player.appendChild(para);
            values.playerValue += array.numValue[array.num.indexOf(numOnCard)];
            pscore.textContent = "Player Total: " + values.playerValue;

            if (values.playerValue === 21) {
                let result = document.createElement('p');
                result.textContent = "Lets check out the dealer";
                result.style.cssText = "background:white;";
                document.body.appendChild(result);
                tags.hit.disabled = true;
                tags.hold.disabled = true;

            } else if (numOnCard === "Ace") {
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
            let numOnCard = numOfCard();
            // let numOnCard = array.num[0];
            para.textContent = numOnCard + " of " + shapeOfCard();
            tags.dealer.appendChild(para);
            values.dealerValue += array.numValue[array.num.indexOf(numOnCard)];
            dscore.textContent = "Dealer Total: " + values.dealerValue;

            if (numOnCard === "Ace") {
                values.dIsAce = true;
                if (values.dealerValue > 21) {
                    values.dealerValue -= 10;
                    dscore.textContent = "Dealer Total: " + values.dealerValue;
                }

            }
            if (values.playerValue === 21) {
                onHold();
            }

        }
    }
    tags.deal.disabled = true;

}


function hitme() {
    let para = document.createElement('p');
    para.className = "target";
    let numOnCard = numOfCard();
    // let numOnCard = array.num[0];
    para.textContent = numOnCard + " of " + shapeOfCard();
    tags.player.appendChild(para);
    values.playerValue += array.numValue[array.num.indexOf(numOnCard)];
    pscore.textContent = "Player Total: " + values.playerValue;

    if (values.playerValue > 21) {
        if (values.pIsAce) {
            values.playerValue -= 10;
            pscore.textContent = "Player Total: " + values.playerValue;
            values.pIsAce = false;
        } else if (numOnCard === "Ace") {
            values.playerValue -= 10;
            pscore.textContent = "Player Total: " + values.playerValue;
            if (values.playerValue === 21) {
                let result = document.createElement('p');
                result.textContent = "Lets check out the dealer";
                result.style.cssText = "background:white;";
                document.body.appendChild(result);
                onHold();
                tags.hit.disabled = true;
                tags.hold.disabled = true;
            }
        }
        else {
            let result = document.createElement('p');
            result.textContent = "You Lost";
            result.style.cssText = "background:white;";
            document.body.appendChild(result);
            tags.hit.disabled = true;
            tags.hold.disabled = true;
        }
    } else if (values.playerValue === 21) {
        let result = document.createElement('p');
        result.textContent = "Lets check out the dealer";
        result.style.cssText = "background:white;";
        document.body.appendChild(result);
        onHold();
        tags.hit.disabled = true;
        tags.hold.disabled = true;
    }
}



function onHold() {
    //debugger;
    tags.hold.disabled = true;
    let para5 = document.getElementById('para5');
    para5.style.cssText = "display:inline-block;";
    tags.dscore.style.cssText = "display:inline-block;"
    tags.hit.disabled = true;

    if (values.dealerValue >= 17 && values.dealerValue < values.playerValue) {
        let result = document.createElement('p');
        result.textContent = "You Win";
        result.style.cssText = "background:white;";
        document.body.appendChild(result);
        tags.hit.disabled = true;
        tags.hold.disabled = true;

    } else if (values.dealerValue >= 17 && values.dealerValue === values.playerValue) {
        let result = document.createElement('p');
        result.textContent = "It's a TIE";
        result.style.cssText = "background:white;";
        document.body.appendChild(result);
        tags.hit.disabled = true;
        tags.hold.disabled = true;
    } else if (values.dealerValue >= 17 && values.dealerValue > values.playerValue) {
        let result = document.createElement('p');
        result.textContent = "You Lose";
        result.style.cssText = "background:white;";
        document.body.appendChild(result);
        tags.hit.disabled = true;
        tags.hold.disabled = true;
    } else if (values.dealerValue <= 21 && values.dealerValue > values.playerValue) {
        let result = document.createElement('p');
        result.textContent = "You Lose";
        result.style.cssText = "background:white;";
        document.body.appendChild(result);
        tags.hit.disabled = true;
        tags.hold.disabled = true;
    } else {
        // debugger;
        for (values.dealerValue; values.dealerValue < 17;) {
            let para = document.createElement('p');
            para.className = "target";
            let numOnCard = numOfCard();
            // let numOnCard = array.num[0];
            para.textContent = numOnCard + " of " + shapeOfCard();
            tags.dealer.appendChild(para);
            values.dealerValue += array.numValue[array.num.indexOf(numOnCard)];
            dscore.textContent = "Dealer Total: " + values.dealerValue;

            if (values.dealerValue > 21) {
                if (values.dIsAce) {
                    values.dealerValue -= 10;
                    dscore.textContent = "Dealer Total: " + values.dealerValue;
                    values.dIsAce = false;
                } else if (numOnCard === "Ace") {
                    values.dealerValue -= 10;
                    dscore.textContent = "Dealer Total: " + values.dealerValue;
                    if (values.dealerValue === 21) {
                        onHold();
                    }
                } else if (values.dealerValue >= 17 && values.dealerValue < 21) {
                    onHold(a);
                }
                else {
                    let result = document.createElement('p');
                    result.textContent = "You Win";
                    result.style.cssText = "background:white;";
                    document.body.appendChild(result);
                    tags.hit.disabled = true;
                    tags.hold.disabled = true;
                }
            }else if (values.dealerValue >= 17 && values.dealerValue < 21) {
                onHold();
            } else if (values.dealerValue === 21) {
                onHold();
            }
        }
    }

}

deal.addEventListener('click', dealing);
hit.addEventListener('click', hitme);
hold.addEventListener('click', onHold);