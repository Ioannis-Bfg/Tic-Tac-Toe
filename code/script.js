function createGameBoard(){
    const board=[['','',''],['','',''],['','','']];
    return board;
}

function createPlayer(name,marker,board){
    let user_name=name;
    let score=0;
    const getScore=()=>score;
    const addpoints=()=>++score;
    const turn=function(row,column){
        board[row][column]=marker;
    }
    return{user_name:name,getScore, addpoints ,turn};
}


let gameBoard=createGameBoard();

let mike = createPlayer('Mike','X',gameBoard);
let nick=createPlayer('Nick','O',gameBoard);

function play(player1,player2,gameBoard){
    count=1;
    let playGame=function (){
        if(count%2==0){
            let input1=prompt(`Enter your 1st move ${player1['user_name']}`,0,0);
            let input2=prompt(`Enter your 2nd move ${player1['user_name']}`,0,0);
            player2.turn(input1,input2);
            count+=1;
            console.log(count);
            console.table(gameBoard);
        } else{
            let input1=prompt(`Enter your 1st move ${player2['user_name']}`,0,0);
            let input2=prompt(`Enter your 2nd move ${player2['user_name']}`,0,0);
            player1.turn(input1,input2);
            count+=1;
            console.log(count);
            console.table(gameBoard);
        }
    }
    return{playGame};
}



// nick.turn(0,1);
// nick.turn(0,0);
// nick.turn()
// mike.turn(1,2);

let Match=play(mike,nick,gameBoard);
Match.playGame();
Match.playGame();
Match.playGame();



// console.table(gameBoard);