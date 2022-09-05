//Player factory
const Player = (sign) => {
    let score = 0;
    const getSign = () => sign;
    
    return {score, getSign};
}

//All things necessary to play
const gameBoard = (() => {
    const gb = ["", "", "", "", "", "", "", "", ""];
    const playerX = Player("X");
    const playerO = Player("O");
    let playing = playerX;
    
    return {gb, playing, playerX, playerO};
})();

//game
const game = (() => {
    let round = 0;
    let ended = false;
    const gameMode = (mode) => {
        if (mode == "pvp") {
            ended = false;
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
            window.location.reload();

        }else if (mode == "pvm") {
            ended = false;
            display.clear();
            round++;

            document.querySelector(".PvP").setAttribute("disabled", "true");
            document.querySelector(".PvP").classList.add("b-disabled");
            document.querySelector(".message").innerHTML = `Round ${round}`;

            document.querySelectorAll(".gb").forEach((cell) => {
                cell.classList.remove("disabled");
                cell.addEventListener("click", () => {
                    let index = cell.getAttribute("data-cell");
                    play(index);
                    
                    if (ended == false && gameBoard.playing == gameBoard.playerO) {
                        let rIndex = Math.floor(Math.random() * 9);
                        let possibleMoves = gameBoard.gb.filter(played => played == "X" || played == "O");
                        if (possibleMoves.length < 9) {
                            while (gameBoard.gb[rIndex] != ""){
                                rIndex = Math.floor(Math.random() * 9);
                            }
                            play(rIndex);
                        }else checkwinner();
                    }else return;
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
            ended = true;
            winner();
        }else if (gameBoard.gb[3] === gameBoard.gb[4] && gameBoard.gb[3] === gameBoard.gb[5] && gameBoard.gb[3] != ""){
            ended = true;
            winner();
        }else if (gameBoard.gb[6] === gameBoard.gb[7] && gameBoard.gb[6] === gameBoard.gb[8] && gameBoard.gb[6] != ""){
            ended = true;
            winner();
        }else if (gameBoard.gb[0] === gameBoard.gb[3] && gameBoard.gb[0] === gameBoard.gb[6] && gameBoard.gb[0] != ""){
            ended = true;
            winner();
        }else if (gameBoard.gb[1] === gameBoard.gb[4] && gameBoard.gb[1] === gameBoard.gb[7] && gameBoard.gb[1] != ""){
            ended = true;
            winner();
        }else if (gameBoard.gb[2] === gameBoard.gb[5] && gameBoard.gb[2] === gameBoard.gb[8] && gameBoard.gb[2] != ""){
            ended = true;
            winner();
        }else if (gameBoard.gb[0] === gameBoard.gb[4] && gameBoard.gb[0] === gameBoard.gb[8] && gameBoard.gb[0] != ""){
            ended = true;
            winner();
        }else if (gameBoard.gb[2] === gameBoard.gb[4] && gameBoard.gb[2] === gameBoard.gb[6] && gameBoard.gb[2] != ""){
            ended = true;
            winner();
        }else if (checkTie.length == 9){
            ended = true;
            document.querySelector(".message").innerHTML = "Tie! Click on PvP/PvC button to rematch or reset button to erase score..."
        }
    }

    const winner = () => {
        gameBoard.playing.score++;
        document.querySelector(".message").innerHTML = `Player ${gameBoard.playing.getSign()} Won! Click on PvP/PvC button to rematch or reset button to erase score...`
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
