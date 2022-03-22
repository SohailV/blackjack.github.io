
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
    isAce: false,
};

let cardNum = () => Math.floor(Math.random() * array.num.length);
let cardShape = () => Math.floor(Math.random() * array.shape.length);
let numOfCard = () => array.num[cardNum()];
let shapeOfCard = () => array.shape[cardShape()];


function dealing() {


    for (let i = 2; i < 6; i++) {
        let j = i % 2;
        if (j === 0) {

            let para = document.createElement('p');
            para.id = "para" + i;
            let numOnCard = numOfCard();
            para.textContent = numOnCard + " of " + shapeOfCard();
            tags.player.appendChild(para);
            values.playerValue += array.numValue[array.num.indexOf(numOnCard)];
            pscore.textContent = values.playerValue;
        }
        else {
            let para = document.createElement('p');
            para.id = "para" + i;
            let numOnCard = numOfCard();
            para.textContent = numOnCard + " of " + shapeOfCard();
            tags.dealer.appendChild(para);
            values.dealerValue += array.numValue[array.num.indexOf(numOnCard)];
            dscore.textContent = values.dealerValue;
       
        }
    }
    tags.deal.disabled = true;

}


function hitme() {
    // Tasks
    // end game on win and disable everything
    // add dealer logic 
    // generalize same logic to function
    console.log(isAce);
    let element = document.createElement('p');
    element.className = "target";
    let handNum = num[Math.floor(Math.random() * num.length)];
    // handNum="Ace";
    let handShape = shape[Math.floor(Math.random() * shape.length)];
    let hand = handNum + " of " + handShape;
    document.getElementById("player").appendChild(element);
    element.textContent = hand;

    let cardValue = numValue[num.indexOf(handNum)];
    //set total


    playerValue += cardValue;

    //currenthand is ace
    if (handNum === "Ace") {
        isAce = true;
    }
    //check if total had ace
    //Check if greater than 21 set cardvalue as 1      
    if (isAce && playerValue > 21) {

        playerValue -= 10;
        isAce = false;
    }

    document.getElementById('pscore').textContent = "Player Total: " + playerValue;
    //console.log(playerValue);
    if (playerValue > 21) {
        let result = document.createElement('p');
        result.textContent = "You Lose";
        result.style.cssText = "background:white;";
        document.body.appendChild(result);
        document.getElementById('pscore').textContent = "Player Total: " + playerValue;
        //console.log("You Lose");
        document.getElementById("hit").disabled = true;
        document.getElementById("hold").disabled = true;
    } else if (playerValue == 21) {
        let result = document.createElement('p');
        result.textContent = "You win";
        result.style.cssText = "background:white;";
        document.body.appendChild(result);
        document.getElementById("deal").disabled = false;
    }
}



function onHold() {
    // on hold switch hitme() to dealerValue
    let hold = document.getElementById('dscore');
    hold.style.cssText = "display:inline-block;";
    let para11 = document.getElementById('para11');
    para11.style.cssText = "display:inline-block;";
    document.getElementById("hit").disabled = true;

}

deal.addEventListener('click', dealing);
hit.addEventListener('click', hitme);
hold.addEventListener('click', onHold);


// if (values.playerValue == 21 && values.dealerValue == 21) {
//     let result = document.createElement('p');
//     result.textContent = "It's a Tie";
//     result.style.cssText = "background:white;";
//     document.body.appendChild(result);

// } else if (values.playerValue == 21) {
//     let result = document.createElement('p');
//     result.textContent = "You Win";
//     result.style.cssText = "background:white;";
//     document.body.appendChild(result);

// } 
