const shipsLength = [{l:5, s:'C',sank:false},{l:4, s:'D',sank:false},{l:3, s:'S',sank:false},{l:3, s:'S',sank:false},{l:2, s:'P',sank:false}]

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
    addData()
    render()
}

function addData() {
    let X = x 
    let Y = y
    while(it.i < shipsLength[it.shipIdx].l){
        player.c[`${Y}${X}`] = true
        player.b[Y][X] = shipsLength[it.shipIdx].s
        it.i++
        rotation === 1 ? X++ : Y++
    }
    it.i = 0
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
    
}

function guard(){
    let X = x
    let Y = y
    while(it.i < shipsLength[it.shipIdx]){
        console.table(player.c[`${Y}${X}`])
        it.i++
        rotation === 1 ? X++ : Y++
    }
    it.i = 0
    
}

function rotateBtn() {
    rotation === 1 ? rotation =  0 : rotation = 1;
}

