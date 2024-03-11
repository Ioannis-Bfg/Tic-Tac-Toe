function createGameBoard(){
    const board=[['','',''],['','',''],['','','']];
    return {board};
}

function createPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const addPoints = () => score++;

    const playerRound = (input1, input2, gameBoard) => {
        if(gameBoard[input1][input2]==''){
            gameBoard[input1][input2] = marker;
        } else{
            return false;
        }
    };

    return { name, getScore, addPoints, marker, playerRound };
}

function winCheck(board){
    const winc=function() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                return 1;
            }
        }
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '' && board[0][j] === board[1][j] && board[0][j] === board[2][j]) {
                return 1;
            }
        }
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return 1;
        }
        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return 1;
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
            return -1;
        }

        return null;
    }
    return{winc};
}


function updateGameDisplay() {
    function gameDisplay(board) {
        board.forEach((row, rowIndex) => {
            row.forEach((box, colIndex) => {
                if (box === 'X' || box === 'O') {
                    if(box==='X'){
                        let html_box = document.querySelector(`#box-${rowIndex}${colIndex}`);
                        html_box.textContent = box;
                        html_box.style.color='rgb(224, 188, 89)';
                    }else{
                        let html_box = document.querySelector(`#box-${rowIndex}${colIndex}`);
                        html_box.textContent = box;
                        html_box.style.color='#4c8edf';
                    }

                } else {
                    let html_box = document.querySelector(`#box-${rowIndex}${colIndex}`);
                    html_box.textContent = '';
                }
            });
        });
    }

    return { gameDisplay };
}


function resetGame(board) {
    board.forEach(row => {
        row.fill('');
    });
}

function printBoxId(event) {
    const boxId = event.target.id;
    let input1 = parseInt(boxId.charAt(4));
    let input2 = parseInt(boxId.charAt(5));
    return[input1,input2];
}




function playGame() {
    let mike = createPlayer('Mike', 'X');
    let nick = createPlayer('Nick', 'O');
    let gameBoard = createGameBoard().board;
    let gamed = updateGameDisplay();
    let gameDisplay = gamed.gameDisplay;
    gameDisplay(gameBoard); 
    const boxes = document.querySelectorAll('.box');
    let currentPlayer = mike;
    let score1=document.querySelector('#score1');
    let score2=document.querySelector('#score2');
    let reset_btn=document.querySelector('#reset');

    score1.textContent=mike.getScore();
    score2.textContent=nick.getScore();


    function handleGame(event) {
        let [input1, input2] = printBoxId(event);
        let currentmove=currentPlayer.playerRound(input1, input2, gameBoard);
        gameDisplay(gameBoard); 
        let check = winCheck(gameBoard).winc();
        console.log(check);
        if (check == null && currentmove!==false) {
            currentPlayer = (currentPlayer === mike) ? nick : mike;
        } else if(check==null && currentmove==false){
            return;
        }
        else {
            if(check==1){
                currentPlayer.addPoints();
                let score = currentPlayer.getScore();
                console.log(mike.getScore(),nick.getScore());
                score1.textContent=mike.getScore();
                score2.textContent=nick.getScore();
                setTimeout(() => {
                    resetGame(gameBoard);
                    gameDisplay(gameBoard); 
                    alert(`${currentPlayer.marker} won ! Click Ok to reset the game`);
                }, 100);
            } else {
                console.log(mike.getScore(),nick.getScore());
                setTimeout(() => {
                    resetGame(gameBoard);
                    gameDisplay(gameBoard); 
                    alert(`Draw! Click Ok to reset the game`);
                }, 100);
                setTimeout(() => {
                }, 100);
            }
            } 
        
    }

    boxes.forEach(box => {
        box.addEventListener('click', handleGame);
    });

    document.addEventListener('click', function(event) {
        if (event.target.textContent === 'OK' && trigger) {
            resetGame(gameBoard);
            gameDisplay(gameBoard);
            trigger = false; 
        }
    });

    reset_btn.addEventListener('click',()=>{
        resetGame(gameBoard);
        gameDisplay(gameBoard); 
    })
}



playGame();


