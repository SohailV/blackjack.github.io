import * as main from './main.js';
let chipValue = null;

function chipsCalc(roundStatus) {
    // chips calculation.
    //  debugger;
     
    if (roundStatus == "Won") {
        chipValue = main.tags.bet.value * 2
        numCountplus();   
    } else if (roundStatus == "BWon") {
        chipValue = (main.tags.bet.value * 2.5);
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
    // debugger;
    let numcounter = setInterval(() => {
        main.values.chips++;
        chipValue--;
        main.tags.chips.textContent = main.values.chips;
        if(chipValue == 0) {
            main.tags.bet.value = 0;
            main.tags.bet.max = main.values.chips;
            main.tags.bet.setAttribute('title', bet.value);
            clearInterval(numcounter);
        }
    }, 10);
}

export {chipsCalc};