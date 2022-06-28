const shipsObj = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
}




const startBtn = document.querySelector('.startGame')


let testBoard 

function makeBoard() { 
    const board = []
    let count = 0
    while(count<11){
        let row = makeRows()
        board.push(row)
        count++
    }
    
    testBoard = board

}

function makeRows() {
    let row = []
    let count = 0
    while(count<11){
        row.push(null)
        count++
    }
    return row
}

function currentShip() {
    for(i of shipsObj){
        console.log(i)
    }
}

function shipPlacementVertical(length) { 
    let shipLength = length
    let count = 0
    let locationY = 0
    while(count<shipLength){
    if(testBoard[count][locationY])return('spot taken')
    count++
    }
    count = 0
    while(count < shipLength){
        testBoard[count][locationY] = 'x'
        count++ 
    }
}

function fire() {
    let x = 0
    let y = 0

    if(testBoard[y][x]){
        testBoard[y][x] = 'h'
    }else{
        testBoard[y][x] = 'm'
    }
}

makeBoard()
testBoard[0][0] = 'x'