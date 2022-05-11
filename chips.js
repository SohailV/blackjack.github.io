import * as main from './main.js';
let chipValue = null;

function chipsCalc(roundStatus) {
    // chips calculation.
    // debugger;

    if (roundStatus == "Won") {
        chipValue = main.tags.bet.value * 2
        numCountplus();
    } else if (roundStatus == "BWon") {
        chipValue = (main.tags.bet.value * 2);
        numCountplus();
    } else if (roundStatus == "Tie") {
        chipValue = (main.tags.bet.value * 1);
        numCountplus();
    } else {
        main.tags.bet.value = 0;
        main.tags.chips.textContent = main.values.chips;
        main.tags.bet.max = main.values.chips;
        main.tags.bet.setAttribute('title', bet.value);
    }
}

function numCountplus() {
     debugger;
    let numcounter = setInterval(() => {

        if ( chipValue < 10 && chipValue > 0) {
            main.values.chips++;
            chipValue--;
            main.tags.chips.textContent = main.values.chips;
        } else if (chipValue == 0) {
            main.tags.bet.value = 0;
            main.tags.bet.max = main.values.chips;
            main.tags.bet.setAttribute('title', bet.value);
            clearInterval(numcounter);
        } else {
            main.values.chips += 10;
            chipValue -= 10;
            main.tags.chips.textContent = main.values.chips;
        }
    }, 10);
}

export { chipsCalc };