function createGameBoard(){
    const board=[['','',''],['','',''],['','','']];
    return board;
}

function createPlayer(name,marker){
    let score=0;
    const getScore=()=>score;
    const addpoints=()=>++score;
    return{name,getScore, addpoints,marker};
}

function playRound(player,gameBoard){
    let playGame=function (){
        let input1=prompt(`Enter your 1st move ${player['name']}`,0,0);
        let input2=prompt(`Enter your 2nd move ${player['name']}`,0,0);
        console.log(player["marker"]);
        gameBoard[input1][input2]=player["marker"];
        console.table(gameBoard);
    }
    return{playGame};
}

let gameBoard=createGameBoard();
let mike = createPlayer('Mike','X');
let nick=createPlayer('Nick','O');

let player1_round=playRound(mike,gameBoard);
let player2_round=playRound(nick,gameBoard);


player1_round.playGame();
player2_round.playGame();




// console.table(gameBoard);