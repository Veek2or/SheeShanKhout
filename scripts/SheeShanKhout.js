let score = JSON.parse(localStorage.getItem("score")) ||  {
        wins: 0,
        losses: 0,
        ties: 0
    };

updateScoreElement();

function pickComputerMove () {
    const randomNumber = Math.random();
    let computerMove = "";

    if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Hlan';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Dar';
} else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Kat Kyee';
}
    return computerMove;
}

function resetScore() {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            updateScoreElement();
        };

function showResetConfirmation() {
    document.querySelector(".js-reset-score-confirmation")
        .innerHTML = `
            Are you sure you want to reset the score?
            <button class="js-reset-confirm-yes">Yes</button>
            <button class="js-reset-confirm-no">No</button>
        `;

    document.querySelector(".js-reset-confirm-yes")
        .addEventListener("click", () => {
            resetScore();
            hideResetConfirmation();
        });

    document.querySelector(".js-reset-confirm-no")
        .addEventListener("click", ()=> {
            hideResetConfirmation();
        })
}

function hideResetConfirmation() {
    document.querySelector(".js-reset-score-confirmation")
        .innerHTML = "";
}

document.querySelector(".js-reset-score-button")
    .addEventListener("click", () => {
        showResetConfirmation();
    });

let isAutoPlaying = false;
let intervalId;
const autoPlayStatus = document.querySelector(".auto-play-status-js");

function autoPlay() {
    if (!isAutoPlaying) {
        autoPlayStatus.innerHTML = 'Autoplaying...  Click the "Auto Play" button again to stop.';
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        autoPlayStatus.innerHTML = "";
        clearInterval(intervalId);
        isAutoPlaying = false;
    }  
}

document.querySelector(".js-auto-play-button")
    .addEventListener("click", () => {
        autoPlay();
    });

document.querySelector(".js-hlan-button")
    .addEventListener("click", () => {
        playGame("Hlan");
    });

document.querySelector(".js-dar-button")
    .addEventListener("click", () => {
        playGame("Dar");
    })

document.querySelector(".js-kat-kyee-button")
    .addEventListener("click", () => {
        playGame("Kat Kyee");
    })

document.body.addEventListener("keydown", (event) => {
    if (event.key === "1") {
        playGame("Hlan");
    } else if (event.key === "2") {
        playGame("Dar"); 
    } else if (event.key === "3") {
        playGame("Kat Kyee");
    } else if (event.key === "a") {
        autoPlay();
    }  else if (event.key === "Backspace") {
        showResetConfirmation();
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = "";

    if (playerMove === "Hlan") {
        if (computerMove === 'Hlan') {
            result = 'Tie.';
        } else if (computerMove === 'Dar') {
            result = 'You Win.';
        } else if (computerMove === 'Kat Kyee') {
            result = 'You Lose.';
        }
        
    } else if (playerMove === "Dar") {
        if (computerMove === 'Hlan') {
            result = 'You Lose.';
        } else if (computerMove === 'Dar') {
            result = 'Tie.';
        } else if (computerMove === 'Kat Kyee') {
            result = 'You Win.';
        }
        
    } else if (playerMove === "Kat Kyee") {
        if (computerMove === 'Hlan') {
            result = 'You Win.';
        } else if (computerMove === 'Dar') {
            result = 'You Lose.';
        } else if (computerMove === 'Kat Kyee') {
            result = 'Tie.';
        }
    }

    if (result === "You Win.") {
        score.wins += 1;
    } else if (result === "You Lose.") {
        score.losses += 1;
    } else if (result === "Tie.") {
        score.ties += 1;
    }

    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElement();

    document.querySelector(".js-result").innerHTML = result;

    document.querySelector(".js-moves").innerHTML = `You
<img src="images/${playerMove}.png" class="move-icon">
<img src="images/${computerMove}.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
    document.querySelector(".js-score")
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties ${score.ties}`;
}