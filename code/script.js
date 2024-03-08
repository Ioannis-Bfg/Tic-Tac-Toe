function createGameBoard(){
    const board=[['','',''],['','',''],['','','']];
    const winc=function() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                return board[i][0];
            }
        }
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
                return board[0][j];
            }
        }
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return board[0][2];
        }
        let tie = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    tie = false;
                    break;
                }
            }
        }
        if (tie) {
            return 'N';
        }

        return null;
    }
    return {board,winc};
}

function createPlayer(name,marker){
    let score=0;
    const getScore=()=>score;
    const addpoints=()=>++score;
    return{name,getScore, addpoints,marker};
}

function playRound(player,gameBoard){
    let playGame=function (){
        let input1 = parseInt(prompt(`Enter your 1st move ${player['name']}`));
        let input2 = parseInt(prompt(`Enter your 2nd move ${player['name']}`));
        // console.log(player["marker"]);
        gameBoard[input1][input2]=player["marker"];
        // console.table(gameBoard);
    }
    return{playGame};
}


let gameBoard=createGameBoard();
let mike = createPlayer('Mike','X');
let nick=createPlayer('Nick','O');

let player1_round=playRound(mike,gameBoard.board);
let player2_round=playRound(nick,gameBoard.board);


player1_round.playGame();
player1_round.playGame();
player1_round.playGame();
// player2_round.playGame();


console.log(gameBoard.winc());




// console.table(gameBoard);

