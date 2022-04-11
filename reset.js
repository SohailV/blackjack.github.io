import * as main from './main.js';

function resetAll() {
    main.values.playerValue = 0;
    main.values.dealerValue = 0;
    main.values.pIsAce = false;
    main.values.dIsAce = false;
    main.tags.reset.disabled = true;
    main.tags.deal.disabled = false;
    main.tags.pscore.textContent = "Player Total: " + main.values.playerValue;
    main.tags.dscore.textContent = "Dealer Total: " + main.values.dealerValue;
    main.tags.bet.value = 1;
    main.tags.label.textContent = "Chips to Bet";
    main.tags.bet.disabled = false;
    main.tags.bet.style.cssText = "color: black;";
    // main.shapeArray.splice(0, main.shapeArray.length);
    main.values.roundComplete = false;

    while (main.tags.dealer.firstChild) {
        main.tags.dealer.removeChild(main.tags.dealer.firstChild);
    }
    while (main.tags.player.firstChild) {
        main.tags.player.removeChild(main.tags.player.firstChild);
    }
    while (main.tags.result.firstChild) {
        // main.tags.result.removeChild(main.tags.result.firstChild);
        // main.tags.result.classList.remove('result');
        main.tags.result.textContent = "";
        main.tags.result.style.cssText = "background-color: rgba(0, 0, 0, 0.01);"

    }
}

export{resetAll};
