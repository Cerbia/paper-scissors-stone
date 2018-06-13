'use strict'

var startButton = document.getElementById('start-button');
var actionButtons = document.getElementsByClassName('player-move');
var overlay = document.querySelector(".overlay");
var closeButton = document.querySelector(".close-button");

var output = document.getElementById('output');
var result = document.getElementById('result');

var params = {
    playerScore: 0,
    computerScore: 0,
    roundsToPlay: 0,
    currentRound: 0,
    gameOver: true,
    progress: [] //tablica z postępem gry 
    // numer rundy, ruch gracza, ruch komputera, wynik rundy, wynik gry po tej rundzie (np. "0-1" jeśli to pierwsza runda i wygrał komputer).
};

startButton.addEventListener('click', function(){    
    params.roundsToPlay = window.prompt("How mamy rounds would you like to play?");
    
    if(params.roundsToPlay===null) {
        var cancelWasClicked = true;
    }

    params.roundsToPlay = parseInt(params.roundsToPlay);

    if(!isNaN(params.roundsToPlay) && params.roundsToPlay>0) {
        params.currentRound = 1;
        params.gameOver = false;
        enableGameButtons();
        disableStartButton();
        output.innerHTML = "";
    } else if(cancelWasClicked) {
        output.innerHTML = "";
    } else {
        output.innerHTML = "Please, provide the correct number of rounds";
    }
    result.innerHTML = "";
});

for(var i = 0; i < actionButtons.length; i++) {
    actionButtons[i].addEventListener('click', function() { playerMove(this.getAttribute('data-move')); } , false);
}
closeButton.addEventListener('click', toggleModal);

//?
window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
    if (event.target === overlay) {
        toggleModal();
    }
}

resetGame();

function playerMove(userMove) {
    if (params.roundsToPlay > 0) {
        var computerMove = randomMove();
        if (userMove == computerMove) {
            displayRoundsResult('TIED',userMove,computerMove)
        }
        if (userMove == 'paper') {
            if (computerMove == 'stone') {
                params.playerScore++;
                displayRoundsResult('WON',userMove,computerMove)
        }
            if (computerMove == 'scissors') {
                params.computerScore++;
                displayRoundsResult('LOST',userMove,computerMove)
            }
        }
        if (userMove == 'stone') {
            if (computerMove == 'paper') {
                params.computerScore++;
                displayRoundsResult('LOST',userMove,computerMove)
            }
            if (computerMove == 'scissors') {
                params.playerScore++;
                displayRoundsResult('WON',userMove,computerMove)
            }
        }
        if (userMove == 'scissors') {
            if (computerMove == 'paper') {
                params.computerScore++;
                displayRoundsResult('LOST',userMove,computerMove)
            }
            if (computerMove == 'stone') {
                params.playerScore++;
                displayRoundsResult('WON',userMove,computerMove)
            }
        }
        params.roundsToPlay--;
        if(params.roundsToPlay === 0){
            params.gameOver = true;
        }
        params.currentRound++;
        console.log('params.gameOver: ' + params.gameOver)
        displayStatistics();
    }
}
function randomMove(){
    var computerMove;
    switch(Math.floor(Math.random()*3)+1){
        case 1: computerMove = 'paper';
            break;
        case 2: computerMove = 'stone';
            break;
        case 3: computerMove = 'scissors';
            break;
    }
    return computerMove;
}
function displayRoundsResult(userResult,userMove,computerMove){
    output.innerHTML = output.innerHTML + "Round " + params.currentRound + ". YOU " + userResult + ": you played " + userMove.toUpperCase() + ", computer played " +computerMove.toUpperCase() + "<br>";
}
function displayStatistics(){
    result.innerHTML = "SCORE: YOU " + params.playerScore + " - " + params.computerScore + " Computer";
    if(params.gameOver) {
        toggleModal();
        if(params.playerScore > params.computerScore) {
            result.innerHTML = result.innerHTML + "<br><br> YOU WON  THE ENTIRE GAME!!! <br><br>";
        }else if (params.playerScore<params.computerScore) {
            result.innerHTML = result.innerHTML + "<br><br> YOU LOST THE ENTIRE GAME!!! <br><br>";
        }else {
            result.innerHTML = result.innerHTML + "<br><br> YOU DREW THE ENTIRE GAME!!! <br><br>";
        }
        result.innerHTML = result.innerHTML + "<br>Game over, please press the new game button!<br>";
        
        resetGame();
    }
}
function enableGameButtons() {
    for(var i = 0; i < actionButtons.length; i++) {
            actionButtons[i].disabled = false;
        }
}
function resetGame() {
    params.playerScore = 0;
    params.computerScore = 0;
    disableGameButtons();
    enableStartButton();
}
function disableGameButtons() {
    for(var i = 0; i < actionButtons.length; i++) {
            actionButtons[i].disabled = true;
        }
}
function disableStartButton() {
    startButton.disabled = true;   
}
function enableStartButton() {
    startButton.disabled = false;   
}
function toggleModal() {
    overlay.classList.toggle("show-modal");
}
