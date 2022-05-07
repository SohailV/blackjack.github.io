import * as main from './main.js';
import * as onHold from './onhold.js';
import * as chips from './chips.js';

let numOnCard;

function card(idNo) {
    console.log(idNo);
    let div = document.createElement('div');
    let para1 = document.createElement('p');
    let para2 = document.createElement('p');
    let para3 = document.createElement('p');
    if (idNo != undefined) {
        para1.id = "para" + idNo;

        div.id = "Card" + idNo;
    }

    numOnCard = main.numOfCard();
    // numOnCard = main.array.num[2];
    // if(idNo == 2) {
    //     numOnCard = main.array.num[10];
    // }else if(idNo == 4) {
    //     numOnCard = main.array.num[0];
    // }else {
    //     numOnCard = main.numOfCard();
    // }
    let shapeOnCard = main.shapeOfCard();

    // Checking shape on the card to display.
    if (shapeOnCard == "\u2665" || shapeOnCard == "\u2666") {
        div.className = "cards red";
    } else {
        div.className = "cards black";
    }
    para1.textContent = numOnCard;
    para1.className = "scard left";
    para2.textContent = shapeOnCard;
    para2.className = "scard";
    // para2.className = "card" + numOnCard;
    para3.textContent = numOnCard;
    para3.className = "scard right";
    div.appendChild(para1);
    div.appendChild(para2);
    div.appendChild(para3);
    return div;
};

// Initial Deal function.
function dealing() {
    const music = new Audio('./audio/cards.mp3');
    // music.play();
    // music.loop = true;
    // music.playbackRate = 2;
    // Checking chips betted amount.
    if (isNaN(main.tags.bet.value) || main.tags.bet.value == 0 || main.tags.bet.value > main.values.chips ||
        main.tags.bet.value < 0) {
        main.tags.label.textContent = "Enter a valid Amount";
        main.tags.label.style.cssText = "color:red;";
        let text = "Enter Bet Amount";
        main.finalResult(text);
    } else {
        // debugger;
        // Dealing cards alternatively, first to player then to dealer.
        let text = "";
        main.finalResult(text);
        music.play();
        music.playbackRate = 1.3;
        let shuffle = document.querySelector('.deck img:nth-child(2)');
        shuffle.style.cssText = "animation-name: shuffle;";

        setTimeout(function () {
            shuffle.style.cssText =
                "animation-name: dealCard; animation-duration: 1.2s; animation-iteration-count: 2; animation-direction: normal;";
        }, 850);
        setTimeout(function () {

            for (let i = 2; i < 6; i++) {
                let pCard;
                let j = i % 2;
                if (j === 0) {
                    // debugger;

                    let cards = card(i);
                    console.log("Cards", cards);
                    main.tags.player.appendChild(cards);
                    main.values.playerValue += main.array.numValue[main.array.num.indexOf(numOnCard)];
                    main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
                    pCard = numOnCard;
                    if (pCard === "A") {
                        main.values.pIsAce = true;
                        if (main.values.playerValue > 21) {
                            main.values.playerValue -= 10;
                            main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
                        }
                    }



                }
                // Alternative cards to the dealer.
                else {


                    let cards = card(i);
                    main.tags.dealer.appendChild(cards);
                    main.values.dealerValue += main.array.numValue[main.array.num.indexOf(numOnCard)];
                    main.tags.dscore.textContent = "Dealer Total: " + main.values.dealerValue;
                    // Ace value check for the dealer.
                    if (numOnCard === "A") {
                        main.values.dIsAce = true;
                        if (main.values.dealerValue > 21) {
                            main.values.dealerValue -= 10;
                            main.tags.dscore.textContent = "Dealer Total: " + main.values.dealerValue;
                        }
                    }
                    if (main.values.playerValue === 21) {
                        onHold.onHold();
                    }

                }
                // Checking player's value
                // if (main.values.playerValue === 21) {
                //     debugger;
                //     let text = "Lets check out the dealer";
                //     main.finalResult(text);

                // } else 


            }
        }, 3000);

        main.tags.deal.disabled = true;
        main.tags.hit.disabled = false;
        main.tags.hold.disabled = false;
        // main.tags.dscore.style.cssText = "display:none;";
        // main.tags.label.textContent = "Chips_Betted";
        main.tags.label.style.cssText = "color:blue;";
        main.values.chips -= main.tags.bet.value;
        main.tags.chips.textContent = "Total Chips : " + main.values.chips;
        // main.tags.bet.max = main.values.chips;
        main.tags.bet.disabled = true;
        main.tags.bet.style.cssText = "color: red;";

    }
}
// Hit function, if the player proceeds for the next card.
function hitme() {
    // debugger;

    let shuffle = document.querySelector('.deck img:nth-child(2)');
    const music = new Audio('./audio/singlecard.mp3');
    music.play();
    shuffle.style.cssText =
        "animation-name: playerHit; animation-duration: 0.5s; animation-iteration-count: 1; animation-direction: normal;";
    setTimeout(function () {
        shuffle.style.cssText =
            "animation-name: willshuffle;";
        let cards = card();
        main.tags.player.appendChild(cards);
        main.values.playerValue += main.array.numValue[main.array.num.indexOf(numOnCard)];
        main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
        // value check for the player.
        if (main.values.playerValue > 21) {
            // Ace check for the player.
            if (main.values.pIsAce) {
                main.values.playerValue -= 10;
                main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
                main.values.pIsAce = false;
            } else if (numOnCard === "A") {
                main.values.playerValue -= 10;
                main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
                if (main.values.playerValue === 21) {
                    let text = "Lets check out the dealer";
                    main.finalResult(text);
                    onHold.onHold();
                }
            }
            else {
                let text = "You Lost";
                main.finalResult(text);
                main.tags.reset.disabled = false;
                main.values.roundStatus = "Lost";
                return chips.chipsCalc(main.values.roundStatus);
            }
            // Value check for the dealer Calling onHold function.    
        } else if (main.values.playerValue === 21) {
            let text = "Lets check out the dealer";
            main.finalResult(text);
            onHold.onHold();
        } else if (numOnCard === "A") {
            main.values.pIsAce = true;
        }

    }, 650);

}

export { dealing, hitme, card, numOnCard };