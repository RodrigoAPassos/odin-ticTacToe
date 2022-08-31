const Player = sign => {
    let score = 0;
    const getSign = () => sign;
    return {getSign, score};
}

const gameBoard = (() => {
    let gb = ["", "", "", "", "", "", "", "", ""];
    
    const gameMode = (mode) => {
        let playing = "playerX";
        if (mode == "pvp") {
            const playerX = Player("X");
            const playerO = Player("O");
            document.querySelectorAll(".gb").forEach((boardCell) => {
                boardCell.addEventListener("click", () => {
                    let index = Number(boardCell.getAttribute("data-cell"));
                    if (playing == "playerX") {
                        play(playerX, index);
                        playing = "playerO";
                    }else {
                        play(playerO, index);
                        playing = "playerX";
                    }
                })
                
            })
            
        }
    }

    const play = (player, index) => {
                let playerSign = player.getSign();
                gb[index] = playerSign;
                console.log(playerSign);
                display.write();
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

