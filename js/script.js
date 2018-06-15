'use strict'

let startButton = document.getElementById('start-button');
let actionButtons = document.getElementsByClassName('player-move');
let overlay = document.querySelector(".overlay");
let closeButton = document.querySelector(".close-button");

let output = document.getElementById('output');
let result = document.getElementById('result');


let counter;
let cancelWasClicked;

let params = {
    finalPlayerScore: 0,
    finalComputerScore: 0,
    roundsToPlay: 0,
    currentRound: 0,
    gameOver: true,
    progress: []
};

startButton.addEventListener('click', () => {    
    params.roundsToPlay = window.prompt("How mamy rounds would you like to play?");
    
    if(params.roundsToPlay===null) {
        cancelWasClicked = true;
    }

    params.roundsToPlay = parseInt(params.roundsToPlay);

    if(!isNaN(params.roundsToPlay) && params.roundsToPlay>0) {
        //zastanowić się nad tym
        params.gameOver = false;
        toggleGameButtons();
        output.innerHTML = "";
        params.progress = [];
        cleanProgressTable();
        counter = roundGenerator();
        params.currentRound = counter();

    } else if(cancelWasClicked) {
        output.innerHTML = "";
    } else {
        output.innerHTML = "Please, provide the correct number of rounds";
    }
    result.innerHTML = "";
});

for(let i = 0; i < actionButtons.length; i++) {
    actionButtons[i].addEventListener('click', function () { playerMove(this.getAttribute('data-move')); } , false);
}
closeButton.addEventListener('click', toggleModal);

//?
window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
    if (event.target === overlay) {
        toggleModal();
    }
}

function playerMove(userMove) {
    if (params.roundsToPlay > 0) {
        let computerMove = randomMove();
        if (userMove == computerMove) {
            displayRoundsResult('TIED',userMove,computerMove);
            updateProgress(params.currentRound, userMove,computerMove,0,0,params.finalPlayerScore,params.finalComputerScore);
            //console.log(params.progress)
        }
        if (userMove == 'paper') {
            if (computerMove == 'stone') {
                params.finalPlayerScore++;
                displayRoundsResult('WON',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,1,0,params.finalPlayerScore,params.finalComputerScore);
                //console.log(params.progress)
        }
            if (computerMove == 'scissors') {
                params.finalComputerScore++;
                displayRoundsResult('LOST',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,0,1,params.finalPlayerScore,params.finalComputerScore);
                //console.log(params.progress)
            }
        }
        if (userMove == 'stone') {
            if (computerMove == 'paper') {
                params.finalComputerScore++;
                displayRoundsResult('LOST',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,0,1,params.finalPlayerScore,params.finalComputerScore);
                //console.log(params.progress)
            }
            if (computerMove == 'scissors') {
                params.finalPlayerScore++;
                displayRoundsResult('WON',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,1,0,params.finalPlayerScore,params.finalComputerScore);
                //console.log(params.progress)
            }
        }
        if (userMove == 'scissors') {
            if (computerMove == 'paper') {
                params.finalComputerScore++;
                displayRoundsResult('LOST',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,0,1,params.finalPlayerScore,params.finalComputerScore);
                //console.log(params.progress)
            }
            if (computerMove == 'stone') {
                params.finalPlayerScore++;
                displayRoundsResult('WON',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,1,0,params.finalPlayerScore,params.finalComputerScore);
                //console.log(params.progress)
            }
        }
        params.roundsToPlay--;
        if(params.roundsToPlay === 0) {
            params.gameOver = true;
        }
        params.currentRound = counter();
        //console.log('params.currentRound : ' + params.currentRound )
        displayStatistics();
    }
}
function randomMove() {
    let computerMove;
    switch(Math.floor(Math.random() * 3) + 1) {
        case 1: computerMove = 'paper';
            break;
        case 2: computerMove = 'stone';
            break;
        case 3: computerMove = 'scissors';
            break;
    }
    return computerMove;
}
function displayRoundsResult(userResult,userMove,computerMove) {
    output.innerHTML = `${output.innerHTML} Round ${params.currentRound}. YOU ${userResult}: you played ${userMove.toUpperCase()}, computer played ${computerMove.toUpperCase()}<br>`;
}
function displayStatistics(){
    result.innerHTML = "SCORE: YOU " + params.finalPlayerScore + " - " + params.finalComputerScore + " Computer";
    if(params.gameOver) {
        toggleModal();
        if(params.finalPlayerScore > params.finalComputerScore) {
            result.innerHTML = result.innerHTML + "<br><br> YOU WON  THE ENTIRE GAME!!! <br><br>";
        }else if (params.finalPlayerScore<params.finalComputerScore) {
            result.innerHTML = result.innerHTML + "<br><br> YOU LOST THE ENTIRE GAME!!! <br><br>";
        }else {
            result.innerHTML = result.innerHTML + "<br><br> YOU DREW THE ENTIRE GAME!!! <br><br>";
        }
        result.innerHTML = result.innerHTML + "<br>Game over, please press the new game button! <br><br>";
        generateProgressTable();
        resetGame();
    }
}
// pomyśleć nad zmianami stanów gry
function resetGame() {
    params.finalPlayerScore = 0;
    params.finalComputerScore = 0;
    toggleGameButtons();
}

function toggleGameButtons() {
    if (startButton.disabled) {
        startButton.disabled = false;
        for(let i = 0; i < actionButtons.length; i++) {
            actionButtons[i].disabled = true;
        }
    } else {
        startButton.disabled = true;
        for(let i = 0; i < actionButtons.length; i++) {
            actionButtons[i].disabled = false;
        }
    }
}

function toggleModal() {
    overlay.classList.toggle("show-modal");
}
function updateProgress(round, playerMove, computerMove, roundPlayerScore, roundComputerScore, finalPlayerScore, finalComputerScore) {
    params.progress.push({
        currentRound: round,
        playerMove: playerMove,
        computerMove: computerMove,
        roundPlayerScore: roundPlayerScore,
        roundComputerScore: roundComputerScore,
        finalPlayerScore: finalPlayerScore,
        finalComputerScore: finalComputerScore
    });
}

function roundGenerator() {
    let counter = 0;
    //debugger
    return function() {
        return ++counter;
    };
}

function generateProgressTable() {
    //tablica wychodząca poza obszar
    let tableBody = document.getElementById('table-content');

    for(let i = 0; i < params.progress.length; i++) {

        let tableRow = tableBody.insertRow(i);
        var newCell = tableRow.insertCell();
        var newText  = document.createTextNode(params.progress[i].currentRound)
        newCell.appendChild(newText);

        var newCell = tableRow.insertCell();
        var newText  = document.createTextNode(params.progress[i].playerMove)
        newCell.appendChild(newText);

        var newCell = tableRow.insertCell();
        var newText  = document.createTextNode(params.progress[i].computerMove)
        newCell.appendChild(newText);

        var newCell = tableRow.insertCell();
        var newText  = document.createTextNode(`${params.progress[i].roundPlayerScore}:${params.progress[i].roundComputerScore}`)
        newCell.appendChild(newText);

        var newCell = tableRow.insertCell();
        var newText  = document.createTextNode(`${params.progress[i].finalPlayerScore}:${params.progress[i].finalComputerScore}`)
        newCell.appendChild(newText);
    }
}

function cleanProgressTable() {
    let tableBody = document.getElementById('table-content');
    tableBody.innerHTML = "";
}

