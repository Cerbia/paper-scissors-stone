'use strict';

(function () {

    //obiekt game z polami: initliaze, addUser, getResult
    //+ new game kasuje stan poprzedniej gry

    var modalButton = document.getElementById('modal-button');
    var startButton = document.getElementById('game-button');
    var actionButtons = document.getElementsByClassName('player-move');
    var startModal = document.getElementById("start-modal");
    var startModalInfo = document.getElementById("start-modal-info");
    var scoreModal = document.getElementById("score-modal");
    var closeButtonScoreModal = document.getElementById("close-score-modal");
    var closeButtonStartModal = document.getElementById("close-start-modal");

    var output = document.getElementById('output');
    var result = document.getElementById('result');

    var nameInput = document.getElementById('input-name');
    var roundsInput = document.getElementById('input-rounds');

    var counter = void 0;

    var params = {
        userName: '',
        finalPlayerScore: 0,
        finalComputerScore: 0,
        roundsToPlay: 0,
        currentRound: 0,
        gameOver: true,
        progress: []
    };

    startButton.addEventListener('click', function () {
        //TODO: not empty name, input errors
        params.userName = nameInput.value;
        if (!params.userName) {
            params.userName = "Anonymous";
        }
        params.roundsToPlay = roundsInput.value;
        if (!isNaN(params.roundsToPlay) && params.roundsToPlay > 0 && !(params.roundsToPlay === "")) {
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

    modalButton.addEventListener('click', function () {
        toggleStartModal();
    });

    for (var i = 0; i < actionButtons.length; i++) {
        actionButtons[i].addEventListener('click', function () {
            playerMove(this.getAttribute('data-move'));
        }, false);
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
            var computerMove = randomMove();
            if (userMove == computerMove) {
                displayRoundsResult('TIED', userMove, computerMove);
                updateProgress(params.currentRound, userMove, computerMove, 0, 0, params.finalPlayerScore, params.finalComputerScore);
            }
            if (userMove == 'paper') {
                if (computerMove == 'stone') {
                    params.finalPlayerScore++;
                    displayRoundsResult('WON', userMove, computerMove);
                    updateProgress(params.currentRound, userMove, computerMove, 1, 0, params.finalPlayerScore, params.finalComputerScore);
                }
                if (computerMove == 'scissors') {
                    params.finalComputerScore++;
                    displayRoundsResult('LOST', userMove, computerMove);
                    updateProgress(params.currentRound, userMove, computerMove, 0, 1, params.finalPlayerScore, params.finalComputerScore);
                }
            }
            if (userMove == 'stone') {
                if (computerMove == 'paper') {
                    params.finalComputerScore++;
                    displayRoundsResult('LOST', userMove, computerMove);
                    updateProgress(params.currentRound, userMove, computerMove, 0, 1, params.finalPlayerScore, params.finalComputerScore);
                }
                if (computerMove == 'scissors') {
                    params.finalPlayerScore++;
                    displayRoundsResult('WON', userMove, computerMove);
                    updateProgress(params.currentRound, userMove, computerMove, 1, 0, params.finalPlayerScore, params.finalComputerScore);
                }
            }
            if (userMove == 'scissors') {
                if (computerMove == 'paper') {
                    params.finalComputerScore++;
                    displayRoundsResult('LOST', userMove, computerMove);
                    updateProgress(params.currentRound, userMove, computerMove, 0, 1, params.finalPlayerScore, params.finalComputerScore);
                }
                if (computerMove == 'stone') {
                    params.finalPlayerScore++;
                    displayRoundsResult('WON', userMove, computerMove);
                    updateProgress(params.currentRound, userMove, computerMove, 1, 0, params.finalPlayerScore, params.finalComputerScore);
                }
            }
            params.roundsToPlay--;
            if (params.roundsToPlay === 0) {
                params.gameOver = true;
            }
            params.currentRound = counter();
            displayStatistics();
        }
    }
    function randomMove() {
        var computerMove = void 0;
        switch (Math.floor(Math.random() * 3) + 1) {
            case 1:
                computerMove = 'paper';
                break;
            case 2:
                computerMove = 'stone';
                break;
            case 3:
                computerMove = 'scissors';
                break;
        }
        return computerMove;
    }
    function displayRoundsResult(userResult, userMove, computerMove) {
        output.innerHTML = output.innerHTML + ' Round ' + params.currentRound + '. ' + params.userName + ' ' + userResult + ': you played ' + userMove.toUpperCase() + ', computer played ' + computerMove.toUpperCase() + '<br>';
    }
    function displayStatistics() {
        result.innerHTML = 'SCORE: ' + params.userName + ' ' + params.finalPlayerScore + ' : ' + params.finalComputerScore + ' Computer';
        if (params.gameOver) {
            toggleScoreModal();
            if (params.finalPlayerScore > params.finalComputerScore) {
                result.innerHTML = result.innerHTML + ('<br><br> ' + params.userName + ' WON  THE ENTIRE GAME!!! <br><br>');
            } else if (params.finalPlayerScore < params.finalComputerScore) {
                result.innerHTML = result.innerHTML + ('<br><br> ' + params.userName + ' LOST THE ENTIRE GAME!!! <br><br>');
            } else {
                result.innerHTML = result.innerHTML + ('<br><br> ' + params.userName + ' DREW THE ENTIRE GAME!!! <br><br>');
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
            for (var _i = 0; _i < actionButtons.length; _i++) {
                actionButtons[_i].disabled = true;
            }
        } else {
            modalButton.disabled = true;
            for (var _i2 = 0; _i2 < actionButtons.length; _i2++) {
                actionButtons[_i2].disabled = false;
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
        var counter = 0;
        //debugger
        return function () {
            return ++counter;
        };
    }

    function generateProgressTable() {
        //tablica wychodząca poza obszar
        var userNameTableScore = document.getElementById("user-name");
        userNameTableScore.innerHTML = params.userName;

        var tableBody = document.getElementById('table-content');

        for (var _i3 = 0; _i3 < params.progress.length; _i3++) {

            var tableRow = tableBody.insertRow(_i3);
            var newCell = tableRow.insertCell();
            var newText = document.createTextNode(params.progress[_i3].currentRound);
            newCell.appendChild(newText);

            var newCell = tableRow.insertCell();
            var newText = document.createTextNode(params.progress[_i3].playerMove);
            newCell.appendChild(newText);

            var newCell = tableRow.insertCell();
            var newText = document.createTextNode(params.progress[_i3].computerMove);
            newCell.appendChild(newText);

            var newCell = tableRow.insertCell();
            var newText = document.createTextNode(params.progress[_i3].roundPlayerScore + ':' + params.progress[_i3].roundComputerScore);
            newCell.appendChild(newText);

            var newCell = tableRow.insertCell();
            var newText = document.createTextNode(params.progress[_i3].finalPlayerScore + ':' + params.progress[_i3].finalComputerScore);
            newCell.appendChild(newText);
        }
    }

    function cleanProgressTable() {
        var tableBody = document.getElementById('table-content');
        tableBody.innerHTML = "";
    }
})();
