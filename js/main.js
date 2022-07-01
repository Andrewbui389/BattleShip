const shipsLength = [5,4,3,3,2]

const LIFE = 16

const shipColor = 'gray'

const waterColor = 'lightblue'

//State

let players = {
    computersBoard: {
                    board:null,
                    lives: 0
                    },
    userBoard: {
                board:null,
                lives: 0
               }
}

let x 

let y 

let rotation 

let winner 

let indx 

//Constants 

const tableEle = document.querySelector('#player')

const tdRow = [...tableEle.querySelectorAll('td')]

const tableEleComp = document.querySelector('#computer')

const tdRowComp = [...tableEleComp.querySelectorAll('td')]

//Event Listeners 
tableEle.addEventListener('click', render)

document.querySelector('#rotate').addEventListener('click', rotationTrack)

//Functions
init()

function init(){
    players.computersBoard.board = makeBoard()
    players.userBoard.board = makeBoard()
    indx = 0
    rotation = 1
    computerAI()
    for(i of tdRowComp){
        i.style.backgroundColor = waterColor
    }
    for(i of tdRow){
        i.style.backgroundColor = waterColor
    }
}

function render(evt){
    if(evt.target.tagName !== 'TD'){
        return
    }
    if(indx < 5){
        console.log(indx)
        tableEleComp.style.pointerEvents = 'none'
        getCoors(evt.target.textContent)
        setShips()
    }
    
    if(indx > 4){
        tableEleComp.style.pointerEvents = 'auto'
        tableEleComp.addEventListener('click', fire)
    }
}

function getCoors(str){
    let arr = str.split('')
    y = parseInt(arr[0])
    x = parseInt(arr[1])
}

function rotationTrack(){
    if(rotation === 1){
        rotation = 0
    }else if(rotation === 0){
        rotation = 1
    }
    console.log(rotation)
}

//Functions to set up the gameboard

function makeBoard() { 
    const board = []
    let count = 0
    while(count<10){
        let row = makeRows()
        board.push(row)
        count++
    }
    return board
}

function makeRows() {
    let row = []
    let count = 0
    while(count<10){
        row.push(null)
        count++
    }
    return row
}

function setShips() {
    if(rotation === 1){
        if(shipPlacementHorizontal()){
            console.log('choose different spot')
    }
    }else if(rotation === 0){
        if(shipPlacementVertical()){
            console.log('choose different spot')
    }
}}

function shipPlacementHorizontal() { 
    let count = 0
    let Y = y //X-coordinate from table value
    let X = x //Y-coodinate from table value

    if(x + shipsLength[indx] > 10)return true 
    while(count<shipsLength[indx]){
    if(players.userBoard.board[Y][X])return true
    X++
    count++
    }
    count = 0
    X = x
    while(count < shipsLength[indx]){
        players.userBoard.board[Y][X] = 'x'
        for(i of tdRow){
            if (i.textContent === `${Y}${X}`){
                i.style.backgroundColor = shipColor
            }
            
        }
        X++
        count++ 
    }
    indx++
}

function shipPlacementVertical() { 
    let count = 0
    let Y = y //X-coordinate from table value
    let X = x //Y-coodinate from table value

    if(Y + shipsLength[indx] > 10){
        return true 
    }
    while(count<shipsLength[indx]){
    if(players.userBoard.board[Y][X])return true
    Y++
    count++
    }
    count = 0
    Y = y
    while(count < shipsLength[indx]){
        players.userBoard.board[Y][X] = 'x'
        for(i of tdRow){
            if (i.textContent === `${Y}${X}`){
                i.style.backgroundColor = shipColor
            }
        }
        Y++
        count++ 
    }
    indx++
}

function winnerTrack(){
    if(players.userBoard.lives === 17){
        winner = 'BOT'
    }else if(players.computersBoard.lives === 17){
        winner = 'Human'
    }
}


//Function for actual gameplay
function fire(evt) {
    getCoors(evt.target.textContent)
    let Y = y
    let X = x
    if(players.computersBoard.board[Y][X] === 'x'){
        players.computersBoard.board[Y][X] = 'h'
        evt.target.style.backgroundColor = 'red'
        players.computersBoard.lives+=1
    }else if(players.computersBoard.board[Y][X] !== 'h'){
        evt.target.style.backgroundColor = 'green'
    }
    console.log(players.computersBoard.lives)
}

function computerAI() {
    let iterator = 0
    while(iterator<=5){
        let randomRotate = randomRotation()
        if(randomRotate === 1){
        if(computerPlaceShipsHor(iterator)){
            console.log('same')
        }else{
            iterator++
        }}else if(randomRotate === 0){
            if(computerPlaceShipsVert(iterator)){
                console.log('same')
            }else{
                iterator++
        }
    }
}
    console.table(players.computersBoard.board)
    countX()
    
   
}

function randomCoor(iterator){
    let min = Math.ceil(0)
    let max = Math.floor(11 - shipsLength[iterator])
    let randomNum = Math.floor(Math.random() * (max - min) + min)
    return randomNum
}

function randomRotation(){
    let min = Math.ceil(0)
    let max = Math.floor(2)
    let randomNum = Math.floor(Math.random() * (max - min) + min)
    return(randomNum)
    }


function computerPlaceShipsHor(int){
    let iterator = 0
    let X = randomCoor(int)
    let Y = randomCoor(int)
    let check = X
    let checkOne = Y
    while(iterator<shipsLength[int]){
        if(players.computersBoard.board[checkOne][check]){
            return true
        }else{
        check++
        iterator++
        }
    }
    iterator = 0
    while(iterator<shipsLength[int]){
        players.computersBoard.board[Y][X] = 'x'
        X++
        iterator++
        }
    }

    function computerPlaceShipsVert(int){
        let iterator = 0
        let X = randomCoor(int)
        let Y = randomCoor(int)
        let check = X
        let checkOne = Y
        while(iterator<shipsLength[int]){
            if(players.computersBoard.board[checkOne][check]){
                return true
            }else{
            checkOne++
            iterator++
            }
        }
        iterator = 0
        while(iterator<shipsLength[int]){
            players.computersBoard.board[Y][X] = 'x'
            Y++
            iterator++
            }
        }
    

function countX(){
    let count = 0
    let inside = 0
    let outside = 0
    while(outside<10){
        if(players.computersBoard.board[outside][inside] === 'x'){
            count+=1
        }
        inside++
        if(inside === 10){
            inside = 0
            outside++
        }

    }
    console.log(count)
}








