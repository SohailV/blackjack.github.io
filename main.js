
let num = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

let shape = ["Heart", "Spade", "Diamond", "Club"];

let numValue = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

let playerValue = 0;
let dealerValue = 0;
let deal = document.getElementById("deal");
let hit = document.getElementById("hit");
let hold = document.getElementById("hold");
let isAce = false;
function dealing() {

    for (let i = 0; i < 2; i++) {

        let element = document.createElement('p');
        element.id = "para" + i;
        element.className = "target";
        let handNum = num[Math.floor(Math.random() * num.length)];
        let handShape = shape[Math.floor(Math.random() * shape.length)];
        let hand = handNum + " of " + handShape;
        document.getElementById("player").appendChild(element);
        element.textContent = hand;
        playerValue += numValue[num.indexOf(handNum)];
        //        //console.log(playerValue);
        if (playerValue == 21) {
            //console.log('dealing value');
            let result = document.createElement('p');
            result.textContent = "You Win";
            result.style.cssText = "background:white;";
            document.body.appendChild(result);
            document.getElementById("deal").disabled = false;
            document.getElementById("hit").disabled = true;
            document.getElementById("hold").disabled = true;
        }
        //check isAce is true or false
        if (handNum == "Ace") {
            //set isAce=true
            isAce = true;
        }



    }

    for (let i = 10; i < 12; i++) {
        let element = document.createElement('p');
        element.id = "para" + i;
        let handNum = num[Math.floor(Math.random() * num.length)];
        let handShape = shape[Math.floor(Math.random() * shape.length)];
        let hand = handNum + " of " + handShape;
        document.getElementById("dealer").appendChild(element);
        element.textContent = hand;
        dealerValue += numValue[num.indexOf(handNum)];
        //console.log(dealerValue);
    }

    document.getElementById("deal").disabled = true;
    document.getElementById('pscore').textContent = "Player Total: " + playerValue;
    document.getElementById('dscore').textContent = "Dealer Total: " + dealerValue;

}


function hitme() {
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
    if (handNum == "Ace") {
        isAce = true;
    }
    //check if total had ace
    //Check if greater than 21 set cardvalue as 1      
    if (isAce == true && playerValue > 21) {

        playerValue -= 10;
        isAce = false;
    }
    // if (playerValue > 21) {

    //     let target = document.getElementsByClassName("target");

    //     // for (let i = 0; i < target.length; i++) {
    //     //     if (target[i].textContent.includes("Ace")) {
    //     //         ////console.log('found Ace');

    //     //        // playerValue -= 10;
    //     //         //console.log("inside get ace");
    //     //         document.getElementById('pscore').textContent = "Player Total: " + playerValue;

    //     //     }

    //     // }

    //     document.getElementById('pscore').textContent = "Player Total: " + playerValue;
    //  //   //console.log(" in hit me");
    //    // if (playerValue === 21) {
    //         let result = document.createElement('p');
    //         result.textContent = "You Lose";
    //         result.style.cssText = "background:white;";
    //         document.body.appendChild(result);
    //         document.getElementById("deal").disabled = false;
    //     //}

    // }
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


//     //console.log('found Ace' + boolvalue);
//     return boolvalue;
// }
//     //console.log(bool() + " bool here"); 

//     if(playerValue > 21 && bool()) {
//     numValue[0] = 1;
//     //console.log(numValue[0] + "from array");
//     playerValue -= 10;
//     bool = () => {
//         return false;
//     } 
//     document.getElementById('pscore').textContent = "Player Total: " + playerValue;
//     //console.log(bool() + " inside double condition");
//     return bool();
//     }
//     else 
//     if (playerValue > 21) {

//             let result = document.createElement('p');
//             result.textContent = "You Lose";
//             result.style.cssText = "background:white;";
//             document.body.appendChild(result);
//             document.getElementById('pscore').textContent = "Player Total: " + playerValue;
//             //console.log("You Lose");
//             document.getElementById("hit").disabled = true;
//             document.getElementById("hold").disabled = true;    
//         }  
//     }
// }

function onHold() {
    let hold = document.getElementById('dscore');
    hold.style.cssText = "display:inline-block;";
    let para11 = document.getElementById('para11');
    para11.style.cssText = "display:inline-block;";
    document.getElementById("hit").disabled = true;

}

deal.addEventListener('click', dealing);
hit.addEventListener('click', hitme);
hold.addEventListener('click', onHold);
