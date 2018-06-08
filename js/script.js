'use strict'

var startButton = document.getElementById('start-button');
var actionButtons = document.getElementsByClassName('player-move');

var output = document.getElementById('output');
var result = document.getElementById('result');
var playerScore = 0;
var computerScore = 0;
var rounds = 0;

console.log(actionButtons);

startButton.addEventListener('click', function(){
    output.innerHTML = "";
    result.innerHTML = "";
    rounds = window.prompt("How mamy rounds would you like to play?");
});

for(var i=0;i<actionButtons.length; i++) {
    actionButtons[i].addEventListener('click', function() { playerMove(this.getAttribute('data-move')); } , false);
}
function playerMove(userMove) {
    if(rounds===0 && result.innerHTML!= "") {
        //if button is inactive
        result.innerHTML=result.innerHTML + "<br>Game over, please press the new game button!<br>";
    }
    if (rounds>0) {
        var computerMove = randomMove();
        if (userMove==computerMove) {
            displayResult('TIED',userMove,computerMove)
        }
        if (userMove=='paper') {
            if (computerMove=='stone') {
                playerScore++;
                displayResult('WON',userMove,computerMove)
        }
            if (computerMove=='scissors') {
                computerScore++;
                displayResult('LOST',userMove,computerMove)
            }
        }
        if (userMove=='stone') {
            if (computerMove=='paper') {
                computerScore++;
                displayResult('LOST',userMove,computerMove)
            }
            if (computerMove=='scissors') {
                playerScore++;
                displayResult('WON',userMove,computerMove)
            }
        }
        if (userMove=='scissors') {
            if (computerMove=='paper') {
                computerScore++;
                displayResult('LOST',userMove,computerMove)
            }
            if (computerMove=='stone') {
                playerScore++;
                displayResult('WON',userMove,computerMove)
            }
        }
        rounds--;
        displayStatistics();
    }
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
}
function displayStatistics(){
    result.innerHTML = "YOU " + playerScore + " - " + computerScore + " Computer";
    if(rounds==0){
        if(playerScore>computerScore) {
            result.innerHTML = result.innerHTML + "<br><br> YOU WON  THE ENTIRE GAME!!! <br><br>";
        }else if (playerScore<computerScore) {
            result.innerHTML = result.innerHTML + "<br><br> YOU LOST THE ENTIRE GAME!!! <br><br>";
        }else {
            result.innerHTML = result.innerHTML + "<br><br> YOU DREW THE ENTIRE GAME!!! <br><br>";
        }
    }
}
