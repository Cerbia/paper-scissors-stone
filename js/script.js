'use strict'

var paperButton = document.getElementById('paper-button');
var stoneButton = document.getElementById('stone-button');
var scissorsButton = document.getElementById('scissors-button');
var output = document.getElementById('output');
var result = document.getElementById('result');
var playerScore = 0;
var computerScore = 0;


paperButton.addEventListener('click', function() { playerMove('paper'); } , false);
stoneButton.addEventListener('click', function() { playerMove('stone'); } , false);
scissorsButton.addEventListener('click', function() { playerMove('scissors'); } , false);

function playerMove(userMove) {
    var computerMove = randomMove();
    if (userMove==computerMove) {
        displayResult('TIED',userMove,computerMove)
        //display draw
        //"YOU WON: you played PAPER, computer played ROCK".
    }
    if (userMove=='paper') {
        if (computerMove=='stone') {
            //user wins
            playerScore++;
            displayResult('WON',userMove,computerMove)
    }
        if (computerMove=='scissors') {
            //computer wins
            computerScore++;
            displayResult('LOST',userMove,computerMove)
        }
    }
    if (userMove=='stone') {
        if (computerMove=='paper') {
            //computer wins
            computerScore++;
            displayResult('LOST',userMove,computerMove)
        }
        if (computerMove=='scissors') {
            //user wins
            playerScore++;
            displayResult('WON',userMove,computerMove)
        }
    }
    if (userMove=='scissors') {
        if (computerMove=='paper') {
            //computer wins
            computerScore++;
            displayResult('LOST',userMove,computerMove)
        }
        if (computerMove=='stone') {
            //user wins
            playerScore++;
            displayResult('WON',userMove,computerMove)
        }
    }
    displayStatistics();
}
function randomMove(){
    var computerMove;
    switch(Math.floor(Math.random()*3)+1){
        case 1: computerMove='paper';
            break;
        case 2: computerMove='stone';
            break;
        case 3: computerMove='scissors';
            break;
    }
    return computerMove;
}
function displayResult(userResult,userMove,computerMove){
    output.innerHTML = "YOU " + userResult + ": you played " + userMove.toUpperCase() + ", computer played " +computerMove.toUpperCase();
    console.log("YOU " + userResult + ": you played " + userMove.toUpperCase() + ", computer played " +computerMove.toUpperCase());
}
function displayStatistics(){
    result.innerHTML = "YOU " + playerScore + " - " + computerScore + " Computer";
    console.log("YOU " + playerScore + " - " + computerScore + " Computer");
}
