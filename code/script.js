function createGameBoard(){
    const board=[['','',''],['','',''],['','','']];
    return {board};
}

function createPlayer(name,marker){
    let score=0;
    const getScore=()=>score;
    const addpoints=()=>++score;
    return{name,getScore, addpoints,marker};
}

function playRound(player,gameBoard){
    let playerRound=function (input1,input2){
        gameBoard[input1][input2]=player["marker"];
    }
    return{playerRound};
}


function winCheck(board){
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
    return{winc};
}


function updateGameDisplay() {
    function gameDisplay(board) {
        board.forEach((row, rowIndex) => {
            row.forEach((box, colIndex) => {
                if(box==='X' || box==='O'){
                    let html_box=document.querySelector(`#box-${rowIndex}${colIndex}`)
                    html_box.textContent=box;
                }else{
                    return 'no';
                }
                // console.log(`Box value: ${box}, Row index: ${rowIndex}, Column index: ${colIndex}`);
            });
        });
    }

    return {gameDisplay};
}




function playGame(){
    let gameBoardCreate=createGameBoard();
    let gameBoard=gameBoardCreate.board;
    let mike = createPlayer('Mike','X');
    let nick=createPlayer('Nick','O');
    const boxes = document.querySelectorAll('.box');
    let gameDisplayF=updateGameDisplay();
    let gameDisplay=gameDisplayF.gameDisplay;
    let currentPlayer=mike;



    boxes.forEach(box => {
        box.addEventListener('click', (event) => printBoxId(event, gameBoard));
    });

    
    function printBoxId(event,board) {
        const boxId = event.target.id;
        console.log("Clicked box ID:", boxId);
        let input1 = parseInt(boxId.charAt(4));
        let input2 = parseInt(boxId.charAt(5));
        let playerTurn=playRound(currentPlayer,gameBoard);
        playerTurn.playerRound(input1,input2);
        // console.table(board);
        gameDisplay(board);
        console.log(currentPlayer.name);
        let check_object=winCheck(board);
        let  check=check_object.winc();
        if (check==null){
            currentPlayer = (currentPlayer === mike) ? nick : mike;
        } else{
            console.log(`You won${check}`);
        }
    }
}
    // while(true){
    //     player1_round.playerRound();
    //     gameDisplay(gameBoard.board);
    //     let check_object=winCheck(gameBoard.board);
    //     let  check=check_object.winc();
    //     if(check!==null){
    //         console.log('player 1');
    //         break
    //     }
    //     player2_round.playerRound();
    //     gameDisplay(gameBoard.board);
    //     check=check_object.winc();
    //     if(check!==null){
    //         console.log('player 2');
    //         break;
    //     }
    // }







playGame();


// player2_round.playerRound();






// console.table(gameBoard);

