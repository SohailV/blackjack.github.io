import * as main from './main.js';
import * as onHold from './onhold.js';
import * as chips from './chips.js';


// import "main.js" as test1;

// include('main.js');


// Initial Deal function.
function dealing() {
    // Checking chips betted amount.
    if (isNaN(main.tags.bet.value) || main.tags.bet.value == 0 || main.tags.bet.value > main.values.chips) {
        main.tags.label.textContent = "Enter a valid Amount";
        main.tags.label.style.cssText = "color:red;";
    } else {
        // debugger;
        // Dealing cards alternatively, first to player then to dealer.
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
                let numOnCard = main.numOfCard();
                // let numOnCard = array.num[0];
                let shapeOnCard = main.shapeOfCard();
                // Checking number on the card to display.
                if (numOnCard == "J" || numOnCard == "Q" || numOnCard == "K" || numOnCard == "A") {
                    para1.textContent = numOnCard + " of " + shapeOnCard;
                    div.appendChild(para1);
                } else {
                    // Pushing number of shapes equal to the number on cards.
                    for (j = 0; j < [numOnCard]; j++) {
                        main.shapeArray.push(shapeOnCard);
                    }
                    para1.textContent = numOnCard;
                    para1.className = "left";
                    // div.textContent = para + shapeArray.join(" ") + div.appendChild(para);
                    //div.appendChild(para).firstChild;
                    para2.textContent = main.shapeArray.join(" ");
                    para3.textContent = numOnCard;
                    para3.className = "right";
                    div.appendChild(para1);
                    div.appendChild(para2);
                    div.appendChild(para3);

                }

                // console.log(shapeArray);

                main.tags.player.appendChild(div);
                main.values.playerValue += main.array.numValue[main.array.num.indexOf(numOnCard)];
                main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
                // Checking player's value
                if (main.values.playerValue === 21) {
                    // debugger;
                    let text = "Lets check out the dealer";
                    main.finalResult(text);
                } else if (numOnCard === "A") {
                    main.values.pIsAce = true;
                    if (main.values.playerValue > 21) {
                        main.values.playerValue -= 10;
                        main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
                    }
                }
            }
            // Alternative cards to the dealer.
            else {
                let para = document.createElement('p');
                para.id = "para" + i;
                para.className = "cards";
                let numOnCard = main.numOfCard();
                // let numOnCard = array.num[0];
                para.textContent = numOnCard + " of " + main.shapeOfCard();
                main.tags.dealer.appendChild(para);
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
            }
            // Emptying the array after the cards are dealt.
            main.shapeArray.splice(0, main.shapeArray.length);
        }
        main.tags.deal.disabled = true;
        main.tags.hit.disabled = false;
        main.tags.hold.disabled = false;
        main.tags.dscore.style.cssText = "display:none;";
        main.tags.label.textContent = "Chips Betted";
        main.tags.label.style.cssText = "color:blue;";
        main.values.chips -= main.tags.bet.value;
        main.tags.chips.textContent = "Total Chips : " + main.values.chips;
        main.tags.bet.disabled = true;
        main.tags.bet.style.cssText = "color: red;";
        if (main.values.playerValue === 21) {
            onHold.onHold();
        }
    }
}
// Hit function, if the player proceeds for the next card.
function hitme() {
    // debugger;
    let para = document.createElement('p');
    para.className = "cards";
    let numOnCard = main.numOfCard();
    // let numOnCard = array.num[1];
    para.textContent = numOnCard + " of " + main.shapeOfCard();
    main.tags.player.appendChild(para);
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
}

export {dealing, hitme};