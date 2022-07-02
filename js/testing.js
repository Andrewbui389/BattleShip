const shipsId = [
                {l:5, s:'c',sank:false,ship:'Carrier'},
                {l:4, s:'d',sank:false,ship:'Battleship'},
                {l:3, s:'s',sank:false,ship:'Cruiser'},
                {l:3, s:'b',sank:false,ship:'Submarine'},
                {l:2, s:'p',sank:false,ship:'Patrol Boat'}
                ]

let player 

let computer 

let x

let y

let rotation

let winner 

let it




const tableELHum = document.querySelector("#player")

const cellDataHum = [...tableELHum.querySelectorAll('td')]

const tableELComp = document.querySelector("#computer")

const cellDataComp = [...tableELComp.querySelectorAll('td')]

const message = document.querySelector("h1")

tableELHum.addEventListener('click', handleData)

document.querySelector('#rotate').addEventListener('click', rotateBtn)

init()

function init() {
    
player = makeDataBoard()

computer = makeDataBoard()

it = {
        i: 0, 
        shipIdx:0
        }

rotation = 1 

winner = null

resetBoard()

}

function resetBoard() {
    for(i of cellDataHum){
        i.style.backgroundColor = '#5199CC'
        i.style.color = '#5199CC'
    }
    for(i of cellDataComp){
        i.style.backgroundColor = '#5199CC'
        i.style.color = '#5199CC'
    }
}

function makeDataBoard(){
    let board = []
    while(board.length<10){
        board.push([null,null,null,null,null,null,null,null,null,null]);
    }
    let data = {
        b: board,
        c: {} 
    }
    return data
}

function handleData(evt){
    if(evt.target.tagName !== 'TD')return
    getCoors(evt.target.textContent)
    if(guard())return true
    it.shipIdx < 5 ? addData() : fire()
    
    render()
}

function addData() {
    let X = x 
    let Y = y
    while(it.i < shipsId[it.shipIdx].l){
        player.c[`${Y}${X}`] = true
        player.b[Y][X] = shipsId[it.shipIdx].s
        it.i++
        rotation === 1 ? X++ : Y++
    }
    it.i = 0
    console.log(shipsId[it.shipIdx].ship)
    it.shipIdx++
    console.table(player.b)
}

function getCoors(int){
    let newArr = int.split('')
    y = parseInt(newArr[0])
    x = parseInt(newArr[1])
}

function render(){
    renderHumanBoard()
    renderCompBoard()
    renderMessage()
}

function renderHumanBoard(){
    for(i of cellDataHum){
        if(player.c[i.textContent]){
            i.style.backgroundColor = 'blue'
        }
        if(player.c[i.textContent] === 'H'){
            i.style.backgroundColor = 'red'
        }
        if(player.c[i.textContent] === 'M'){
            i.style.backgroundColor = 'green'
        }
    }
}

function renderCompBoard(){
    for(i of cellDataComp){
        if(computer.c[i.textContent] === 'H'){
            i.style.backgroundColor = 'red'
        }
        if(computer.c[i.textContent] === 'M'){
            i.style.backgroundColor = 'green'
        }
    }
    
}

function renderMessage(){
    if(it.shipIdx<4){
    message.textContent = `Currently Placing ${shipsId[it.shipIdx].ship}`
    }
}

function guard(){
    let X = x
    let Y = y
    while(it.i < shipsId[it.shipIdx]){
        console.table(player.c[`${Y}${X}`])
        it.i++
        rotation === 1 ? X++ : Y++
    }
    it.i = 0
    
}

function rotateBtn() {
    rotation === 1 ? rotation =  0 : rotation = 1;
}

function checkShips() { 

}

function fire(){
    console.log('fire')
}