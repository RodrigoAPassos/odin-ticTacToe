const Player = (sign) => {
    let score = 0;
    const getSign = () => sign;
    
    return {score, getSign};
}

const gameBoard = (() => {
    const gb = ["", "", "", "", "", "", "", "", ""];
    const playerX = Player("X");
    const playerO = Player("O");
    let playing = playerX;
    
    return {gb, playing, playerX, playerO};
})();

const game = (() => {
    let round = 0;
    const gameMode = (mode) => {
        if (mode == "pvp") {
            display.clear();
            round++;
            document.querySelector(".message").innerHTML = `Round ${round}`
            

            document.querySelectorAll(".gb").forEach((cell) => {
                cell.classList.remove("disabled");
                cell.addEventListener("click", () => {
                    let index = cell.getAttribute("data-cell");
                    play(index);
                })
            })

        }else if (mode == "reset") {
            display.clear();
            round = 0;
            gameBoard.playerX.score = 0;
            gameBoard.playerO.score = 0;
            document.querySelector(".score").innerHTML = `Player ${gameBoard.playerX.getSign()}: ${gameBoard.playerX.score} &#x2694 Player ${gameBoard.playerO.getSign()}: ${gameBoard.playerO.score}`

            document.querySelector(".message").innerHTML = `Round ${round}`
            
            document.querySelectorAll(".gb").forEach((cell) => {
                cell.classList.remove("disabled");
                cell.addEventListener("click", () => {
                    let index = cell.getAttribute("data-cell");
                    play(index);
                })
            })

        }else return;
    }

    const changeTurn = () => {
        if (gameBoard.playing == gameBoard.playerX) {
            gameBoard.playing = gameBoard.playerO;
        }else gameBoard.playing = gameBoard.playerX;
    }

    const play = (index) => {
        if (gameBoard.gb[index] == "") {
            gameBoard.gb[index] = gameBoard.playing.getSign();
            display.write();
            checkwinner();
            changeTurn();
        }else return;
    }

    const checkwinner = () => {
        let checkTie = gameBoard.gb.filter(elem => elem == "X" || elem == "O");
        if (gameBoard.gb[0] === gameBoard.gb[1] && gameBoard.gb[0] === gameBoard.gb[2] && gameBoard.gb[0] != ""){
            winner();
        }else if (gameBoard.gb[3] === gameBoard.gb[4] && gameBoard.gb[3] === gameBoard.gb[5] && gameBoard.gb[3] != ""){
            winner();
        }else if (gameBoard.gb[6] === gameBoard.gb[7] && gameBoard.gb[6] === gameBoard.gb[8] && gameBoard.gb[6] != ""){
            winner();
        }else if (gameBoard.gb[0] === gameBoard.gb[3] && gameBoard.gb[0] === gameBoard.gb[6] && gameBoard.gb[0] != ""){
            winner();
        }else if (gameBoard.gb[1] === gameBoard.gb[4] && gameBoard.gb[1] === gameBoard.gb[7] && gameBoard.gb[1] != ""){
            winner();
        }else if (gameBoard.gb[2] === gameBoard.gb[5] && gameBoard.gb[2] === gameBoard.gb[8] && gameBoard.gb[2] != ""){
            winner();
        }else if (gameBoard.gb[0] === gameBoard.gb[4] && gameBoard.gb[0] === gameBoard.gb[8] && gameBoard.gb[0] != ""){
            winner();
        }else if (gameBoard.gb[2] === gameBoard.gb[4] && gameBoard.gb[2] === gameBoard.gb[6] && gameBoard.gb[2] != ""){
            winner();
        }else if (checkTie.length == 9){
            document.querySelector(".message").innerHTML = "Tie!"
        }
    }

    const winner = () => {
        gameBoard.playing.score++;
        document.querySelector(".message").innerHTML = `Player ${gameBoard.playing.getSign()} Won! Click on PvP button to rematch or reset button to erase score...`
        document.querySelector(".score").innerHTML = `Player ${gameBoard.playerX.getSign()}: ${gameBoard.playerX.score} &#x2694 Player ${gameBoard.playerO.getSign()}: ${gameBoard.playerO.score}`
        document.querySelectorAll(".gb").forEach((cell) => {
            cell.classList.add("disabled");
        })
    }

    return{gameMode};
})();

const display = (() => {

    const write = () => {
        document.querySelectorAll(".gb").forEach((cell) => {
            cell.innerHTML = gameBoard.gb[cell.getAttribute("data-cell")];
        })
    }

    const clear = () => {
        for(let i = 0; i < gameBoard.gb.length; i++) {
            gameBoard.gb[i] = "";
        }
        gameBoard.playing = gameBoard.playerX;
        write();
    }

    return {write, clear};
})();
