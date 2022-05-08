import * as main from './main.js';
import * as chips from './chips.js';
import * as deal from './deal.js';

const losemusic = new Audio('./audio/youlose.mp3');
const winmusic = new Audio('./audio/youwin.mp3');
const itsatie = new Audio('./audio/itsatie.mp3');
const music = new Audio('./audio/singlecard.mp3');

function playTune(tuneName) {
tuneName.play();
}

function onHold() {
    // debugger;

    main.tags.hold.disabled = true;
    main.tags.reset.disabled = false;

    let card5 = document.querySelector('#Card5');
    let card5p = document.querySelectorAll('#Card5 > .scard');
    console.log(card5p);
    card5.style.cssText = "background-image: none";
    card5p[0].style.cssText = "display: inline-block";
    card5p[1].style.cssText = "display: inline-block";
    card5p[2].style.cssText = "display: inline-block";
    main.tags.dscore.style.cssText = "visibility: visible;"
    main.tags.hit.disabled = true;
    // Checking dealer's value for the final result.
    if (main.values.dealerValue >= 17 && main.values.dealerValue < main.values.playerValue) {
        if (main.values.playerValue === 21 && document.getElementById("player").childElementCount < 3) {
            main.values.roundStatus = "BWon";
            chips.chipsCalc(main.values.roundStatus);
        } else {
            main.values.roundStatus = "Won";
            chips.chipsCalc(main.values.roundStatus);
        }
        let text = "You Win";
        main.finalResult(text);
        main.values.roundComplete = true;
        playTune(winmusic);
        

    } else if (main.values.dealerValue >= 17 && main.values.dealerValue === main.values.playerValue) {
        let text = "It's a TIE";
        main.finalResult(text);
        main.values.roundStatus = "Tie";
        chips.chipsCalc(main.values.roundStatus);
        main.values.roundComplete = true;
        playTune(itsatie);
        

    } else if ((main.values.dealerValue >= 17 && main.values.dealerValue > main.values.playerValue) ||
        (main.values.dealerValue <= 21 && main.values.dealerValue > main.values.playerValue)) {
        let text = "You Lose";
        main.finalResult(text);
        main.values.roundStatus = "Lost";
        chips.chipsCalc(main.values.roundStatus);
        main.values.roundComplete = true;
        playTune(losemusic);
        

    }
    else {
        // Adding third or more cards to the dealer's hand
        //  debugger;
        let shuffle = document.querySelector('.deck img:nth-child(2)');
        let dealerCard = document.getElementById("imgTop");
        function dealerAnimation() {
            
            
            setTimeout(function () {

                for (main.values.dealerValue; main.values.dealerValue < 17;) {
                    
                    if (main.values.roundComplete) {
                        break;
                    }
                    playTune(music);
                    
                    shuffle.style.cssText =
                "animation-name: dealerHit; animation-duration: 0.6s; animation-iteration-count: 1; animation-direction: normal;";
                    let cards = deal.card();
                    main.tags.dealer.appendChild(cards);
                    main.values.dealerValue += main.array.numValue[main.array.num.indexOf(deal.numOnCard)];
                    main.tags.dscore.textContent = "Dealer Total: " + main.values.dealerValue;
                    // shuffle.style.cssText =
                    //     "animation-name: dealerHit;";
                    if (main.values.dealerValue > 21) {
                        if (main.values.dIsAce) {
                            main.values.dealerValue -= 10;
                            main.tags.dscore.textContent = "Dealer Total: " + main.values.dealerValue;
                            main.values.dIsAce = false;
                            onHold();
                        } else if (deal.numOnCard === "A") {
                            main.values.dealerValue -= 10;
                            main.tags.dscore.textContent = "Dealer Total: " + main.values.dealerValue;
                            onHold();
                        }
                        else {

                            let text = "You Win";
                            main.finalResult(text);
                            main.values.roundStatus = "Won";
                            chips.chipsCalc(main.values.roundStatus);
                            winmusic.play();

                        }
                    } else if (main.values.dealerValue >= 17 && main.values.dealerValue < 21) {
                        onHold();
                    } else if (main.values.dealerValue === 21) {
                        onHold();
                    } else if (deal.numOnCard === "A") {
                        main.values.dIsAce = true;
                    } else if (main.values.dealerValue > main.values.playerValue) {
                        onHold();
                    } else {
                        shuffle.style.cssText = 
                        "animation-name: dealerHitTwo; animation-duration: 0.6s; animation-iteration-count: 1; animation-direction: normal;";
                        dealerCard.classList.add('.dealeranime');
                        dealerAnimation();
                        break;
                    }


                }
            }, 1000);
        }


        dealerAnimation();

    }
}

export { onHold, playTune };