const shipsObj = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
}


let computersBoard

let playersBoard 

let x 

let y 

let currentTurn 

let rotation 

function makeBoard() { 
    const board = []
    let count = 0
    while(count<11){
        let row = makeRows()
        board.push(row)
        count++
    }
    
    playersBoard = board

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

function shipPlacementHorizontal(length) { 
    let shipLength = length
    let count = 0
    let locationX = 0 //X-coordinate from table value
    let locationY = 0 //Y-coodinate from table value
    while(count<shipLength){
    if(playersBoard[locationX][locationY])return('spot taken')
    locationY++
    count++
    }
    count = 0
    locationY = 0
    while(count < shipLength){
        playersBoard[locationX][locationY] = 'x'
        locationY++
        count++ 
    }
}

function shipPlacementVertical(length) { 
    let shipLength = length
    let count = 0
    let locationX = 0
    let locationY = 0
    while(count<shipLength){
        if(playersBoard[locationX][locationY])return('spot taken')
            locationX++
            count++
        }
    count = 0
    locationX = 0 
    while(count < shipLength){
        playersBoard[locationX][locationY] = 'x'
        locationX++
        count++ 
    }
}

function fire() {
    let x = 0
    let y = 0

    if(testBoard[y][x]){
        playersBoard[y][x] = 'h'
    }else{
        playersBoard[y][x] = 'm'
    }
}

makeBoard()
playersBoard[0][0] = 'x'