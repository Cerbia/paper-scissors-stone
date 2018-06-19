'use strict'

let modalButton = document.getElementById('modal-button');
let startButton = document.getElementById('game-button');
let actionButtons = document.getElementsByClassName('player-move');
let startModal = document.getElementById("start-modal");
let startModalInfo = document.getElementById("start-modal-info");
let scoreModal = document.getElementById("score-modal");
let closeButtonScoreModal = document.getElementById("close-score-modal");
let closeButtonStartModal = document.getElementById("close-start-modal");

let output = document.getElementById('output');
let result = document.getElementById('result');

let nameInput = document.getElementById('input-name');
let roundsInput = document.getElementById('input-rounds');

let counter;

let params = {
    userName: '',
    finalPlayerScore: 0,
    finalComputerScore: 0,
    roundsToPlay: 0,
    currentRound: 0,
    gameOver: true,
    progress: []
};

startButton.addEventListener('click', () => {  
    //TODO: not empty name, input errors
    params.userName = nameInput.value;
    if(!params.userName) {
        params.userName = "Anonymous"
    }
    params.roundsToPlay = roundsInput.value;
    if(!isNaN(params.roundsToPlay) && params.roundsToPlay>0 && !(params.roundsToPlay==="")) {
        toggleStartModal();
        //zastanowić się nad tym
        params.gameOver = false;
        toggleGameButtons();
        output.innerHTML = "";
        params.progress = [];
        cleanProgressTable();
        counter = roundGenerator();
        params.currentRound = counter();
    } else {
        startModalInfo.innerHTML = "Please, provide the correct number of rounds";
    }
    result.innerHTML = "";
    startModalInfo.innerHTML = "";
});

modalButton.addEventListener('click', () => {  
    toggleStartModal();
});

for(let i = 0; i < actionButtons.length; i++) {
    actionButtons[i].addEventListener('click', function () { playerMove(this.getAttribute('data-move')); } , false);
}

closeButtonScoreModal.addEventListener('click', toggleScoreModal);

closeButtonStartModal.addEventListener('click', toggleStartModal);

//?
window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
    if (event.target === startModal) {
        //https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        toggleStartModal();
    }
    if (event.target === scoreModal) {
        //https://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        toggleScoreModal();
    }
}

function playerMove(userMove) {
    if (params.roundsToPlay > 0) {
        let computerMove = randomMove();
        if (userMove == computerMove) {
            displayRoundsResult('TIED',userMove,computerMove);
            updateProgress(params.currentRound, userMove,computerMove,0,0,params.finalPlayerScore,params.finalComputerScore);
        }
        if (userMove == 'paper') {
            if (computerMove == 'stone') {
                params.finalPlayerScore++;
                displayRoundsResult('WON',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,1,0,params.finalPlayerScore,params.finalComputerScore);
        }
            if (computerMove == 'scissors') {
                params.finalComputerScore++;
                displayRoundsResult('LOST',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,0,1,params.finalPlayerScore,params.finalComputerScore);
            }
        }
        if (userMove == 'stone') {
            if (computerMove == 'paper') {
                params.finalComputerScore++;
                displayRoundsResult('LOST',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,0,1,params.finalPlayerScore,params.finalComputerScore);
            }
            if (computerMove == 'scissors') {
                params.finalPlayerScore++;
                displayRoundsResult('WON',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,1,0,params.finalPlayerScore,params.finalComputerScore);
            }
        }
        if (userMove == 'scissors') {
            if (computerMove == 'paper') {
                params.finalComputerScore++;
                displayRoundsResult('LOST',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,0,1,params.finalPlayerScore,params.finalComputerScore);
            }
            if (computerMove == 'stone') {
                params.finalPlayerScore++;
                displayRoundsResult('WON',userMove,computerMove);
                updateProgress(params.currentRound, userMove,computerMove,1,0,params.finalPlayerScore,params.finalComputerScore);
            }
        }
        params.roundsToPlay--;
        if(params.roundsToPlay === 0) {
            params.gameOver = true;
        }
        params.currentRound = counter();
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
    output.innerHTML = `${output.innerHTML} Round ${params.currentRound}. ${params.userName} ${userResult}: you played ${userMove.toUpperCase()}, computer played ${computerMove.toUpperCase()}<br>`;
}
function displayStatistics(){
    result.innerHTML = `SCORE: ${params.userName} ${params.finalPlayerScore} : ${params.finalComputerScore} Computer`;
    if(params.gameOver) {
        toggleScoreModal();
        if(params.finalPlayerScore > params.finalComputerScore) {
            result.innerHTML = result.innerHTML + `<br><br> ${params.userName} WON  THE ENTIRE GAME!!! <br><br>`;
        }else if (params.finalPlayerScore<params.finalComputerScore) {
            result.innerHTML = result.innerHTML + `<br><br> ${params.userName} LOST THE ENTIRE GAME!!! <br><br>`;
        }else {
            result.innerHTML = result.innerHTML + `<br><br> ${params.userName} DREW THE ENTIRE GAME!!! <br><br>`;
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
    if (modalButton.disabled) {
        modalButton.disabled = false;
        for(let i = 0; i < actionButtons.length; i++) {
            actionButtons[i].disabled = true;
        }
    } else {
        modalButton.disabled = true;
        for(let i = 0; i < actionButtons.length; i++) {
            actionButtons[i].disabled = false;
        }
    }
}

function toggleStartModal() {
    startModal.classList.toggle("show-modal");
}
function toggleScoreModal() {
    scoreModal.classList.toggle("show-modal");
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
    let userNameTableScore = document.getElementById("user-name"); 
    userNameTableScore.innerHTML = params.userName;

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

