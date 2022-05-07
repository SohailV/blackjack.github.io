import * as main from './main.js';

function chipsCalc(roundStatus) {
    // chips calculation.
    //  debugger;
    if (roundStatus == "Won") {
        main.values.chips += (main.tags.bet.value * 2);
        main.tags.bet.value = 0;
        main.tags.chips.textContent = "Total Chips : " + main.values.chips;
        main.tags.bet.max = main.values.chips;
    } else if (roundStatus == "BWon") {
        main.values.chips += (main.tags.bet.value * 2.5);
        main.tags.bet.value = 0;
        main.tags.chips.textContent = "Total Chips : " + main.values.chips;
        main.tags.bet.max = main.values.chips;
    } else if (roundStatus == "Tie") {
        main.values.chips += (main.tags.bet.value * 1);
        main.tags.bet.value = 0;
        main.tags.chips.textContent = "Total Chips : " + main.values.chips;
        main.tags.bet.max = main.values.chips;
    } else {
        main.tags.bet.value = 0;
        main.tags.chips.textContent = "Total Chips : " + main.values.chips;
        main.tags.bet.max = main.values.chips;
    }
}

export {chipsCalc};