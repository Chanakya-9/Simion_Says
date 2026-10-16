let isStart = false;
let computerturn = false;
let game = [];
let user = [];
let level = 0;
let hiscore = 0;

let colors = ["red", "green", "blue", "yellow"];

const btns = document.querySelectorAll(`.red,.green,.blue,.yellow`);
const container = document.querySelector(`.container`);
const h3 = document.querySelector(`h3`);
const h4 = document.querySelector(`h4`);
const restartBtn = document.querySelector(`#restart-btn`);

btns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
});

restartBtn.addEventListener("click", start);

function start() {
    if (!isStart) {
        isStart = true;
        restartBtn.style.visibility = "hidden";
        level = 0;
        game = [];
        container.classList.remove(`game-over`);
        levelUp();
    }
}

function levelUp() {
    let color = colors[Math.floor(Math.random() * 4)];
    game.push(color);
    user = [];
    level++;
    if (level > hiscore) {
        hiscore = level;
        h4.innerText = `Hiscore: ${hiscore}`;
    }

    h3.innerText = `level: ${level}`;
    container.classList.remove(`levelUp`);

    playSeq();
}

function playSeq() {
    computerturn = true;
    for (let i = 0; i < game.length; i++) {
        setTimeout(
            () => {
                flash(game[i]);
            },
            (i + 1) * 600,
        );
    }
    setTimeout(
        () => {
            computerturn = false;
        },
        (game.length + 1) * 600,
    );
}

function flash(btnColor) {
    let btn = document.querySelector(`.${btnColor}`);
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 300);
}

function btnPress(e) {
    if (!isStart || computerturn) return;

    let colorPress = colors.find((c) => e.target.classList.contains(c));

    user.push(colorPress);
    flash(colorPress);
    checkAns();
}

function checkAns() {
    let i = user.length - 1;
    if (user[i] === game[i]) {
        if (user.length === game.length) {
            computerturn = true;
            container.classList.add(`levelUp`);
            setTimeout(levelUp, 800);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    container.classList.add(`game-over`);
    h3.innerText = `Game Over! Score: ${level}`;
    isStart = false;
    restartBtn.innerText = "RESTART GAME";
    restartBtn.style.visibility = "visible";
}
