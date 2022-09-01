const Player = sign => {
    let score = 0;
    const getSign = () => sign;
    return {getSign, score};
}

const gameBoard = (() => {
    let gb = ["", "", "", "", "", "", "", "", ""];
    let round = 0;
    const playerX = Player("X");
    const playerO = Player("O");
    
    const gameMode = (mode) => {
        let playing = "playerX";
        round = 0;
        if (mode == "pvp") {
            document.querySelectorAll(".gb").forEach((boardCell) => {
                boardCell.addEventListener("click", () => {
                    let index = Number(boardCell.getAttribute("data-cell"));
                    console.log(playing);
                    if (boardCell.innerHTML == "") {
                        if (playing == "playerX") {
                            play(playerX, index);
                            playing = "playerO";
                        }else {
                            play(playerO, index);
                            playing = "playerX";
                        }
                    } else return;
                })
                
            })
              
        }
    }

    const checkWinner = (player, round) => {
        let playerSign = player.getSign();
        if (gb[0] === gb[1] && gb[0] === gb[2] && gb[0] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (gb[3] === gb[4] && gb[3] === gb[5] && gb[3] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (gb[6] === gb[7] && gb[6] === gb[8] && gb[6] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (gb[0] === gb[3] && gb[0] === gb[6] && gb[0] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (gb[1] === gb[4] && gb[1] === gb[7] && gb[1] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (gb[2] === gb[5] && gb[2] === gb[8] && gb[2] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (gb[0] === gb[4] && gb[0] === gb[8] && gb[0] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (gb[2] === gb[4] && gb[2] === gb[6] && gb[2] != ""){
            console.log(`Player ${playerSign} wins!`);
            player.score++;
            console.log(`Player ${playerSign} has ${player.score} wins!`);
            winner(player);
        }else if (round > 8){
            console.log("Tie!");
        }
    }

    const winner = (player) => {
        for (let i = 0; i < gameBoard.gb.length; i++){
            gameBoard.gb[i] = "";
        }
        display.write();
        gameMode("pvp");
    }

    const play = (player, index) => {
        let playerSign = player.getSign();
        gb[index] = playerSign;
        display.write();
        round++;
        checkWinner(player, round);
                
    }
        

    return {gb, gameMode};
})();

const display = (() => {
    const write = () => {
        const board = document.querySelectorAll(".gb");
        board.forEach((cell) => {
            cell.innerHTML = gameBoard.gb[cell.getAttribute("data-cell")];
        })
    }
    return {write};
})();

const start = (() => {
    document.querySelector(".PvP").addEventListener("click", () => {
        for (let i = 0; i < gameBoard.gb.length; i++){
            gameBoard.gb[i] = "";
        }
        display.write();
        gameBoard.gameMode("pvp");
    })
})();

