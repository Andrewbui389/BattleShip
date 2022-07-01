const ships = [5,4,3,3,2]

const wordBank = []

const colors = ['gray','red','lightblue', 'green','#588DB3']


let winner 

let computer

let human

let rotation 

let iterator

let phase 

let x

let y

let coorArr

let computerArr

let highlightArr


const tableELHum= document.querySelector("#player")

const cellDataHum = [...tableELHum.querySelectorAll('td')]

const tableELComp = document.querySelector("#computer")

const cellDataComp = [...tableELComp.querySelectorAll('td')]

const rotationButton = document.querySelector('#rotate')

const msgBoard = document.querySelector('h1')

tableELHum.addEventListener('click', handleData)

tableELHum.addEventListener('mouseover', HighLight)

tableELHum.addEventListener('mouseout', unHighLight)

tableELComp.addEventListener('click', handleData)

rotationButton.addEventListener('click', rotateBtn)

init()

function init(){

computer = makeDataBoard();
human = makeDataBoard();
phase = 'planning';
winner = null
rotation = 1
iterator = {
    shipIdx:0,
    iterations:0
}
coorArr = []
computerArr = []
highlightArr = []
resetBoard()
tableELComp.style.pointerEvents = 'none';
}

function resetBoard(){
    cellDataComp.forEach((x) => x.style.backgroundColor = 'lightblue');
    cellDataHum.forEach((x) => x.style.backgroundColor = 'lightblue');
}

//Planning Fuctions 

function makeDataBoard(){
    let board = []
    while(board.length<10){
        board.push([null,null,null,null,null,null,null,null,null,null]);
    }
    return board
}

function handleData(evt){
    getCoors(evt.target.textContent)
    iterator.iterations = 0
    iterator.shipIdx < 5 ? phase = 'planning' : phase = 'gameplay'
    if(guard()){return}
    if(phase === 'planning'){
        addData()
        iterator.shipIdx < 4 ? null : mouseActions()
    }
    else if(phase === 'gameplay'){
        console.log(evt.target.textContent)
        fire()
    }
    render()
    iterator.shipIdx += 1
}

function mouseActions(){
    tableELHum.style.pointerEvents = 'none';
    tableELComp.style.pointerEvents = 'auto';
    rotationButton.style.visibility = 'hidden'
}

function render() {
    renderMsg()
    renderHuman()
    
}

function renderHuman(){
    coorArr.forEach((x) => {
        for(i of cellDataHum){
            if(i.textContent === x){
                i.style.backgroundColor = colors[0]
            }
        }
    })
}

function renderMsg() {
        msgBoard.textContent = 'Great Spot Captain'
        msgBoard.textContent = 'Choose A different spot Captain'
}

function getCoors(int){
    let newArr = int.split('')
    y = parseInt(newArr[0])
    x = parseInt(newArr[1])
}

function addData(){
    let X = x
    let Y = y
    while(iterator.iterations<ships[iterator.shipIdx]){
        coorArr.push(`${Y}${X}`)
        human[Y][X] = 'x'
        rotation === 1 ? X++ : Y++
        iterator.iterations++
    }
    iterator.iterations = 0
    console.log(iterator.shipIdx)
}

function guard(){
    let X = x
    let Y = y
    if(rotation === 1){if(X + ships[iterator.shipIdx]>10)return true}
    else if(Y + ships[iterator.shipIdx]>10)return true
    while(iterator.iterations<ships[iterator.shipIdx]){
        if(human[Y][X])return true
        rotation === 1 ? X++ : Y++
        iterator.iterations++
    }
    iterator.iterations = 0
    return false
}

function rotateBtn() {
    rotation === 1 ? rotation =  0 : rotation = 1;
}

function HighLight(evt){
    if(evt.target.tagName !== 'TD')return
    getCoors(evt.target.textContent)
    let X = x
    let Y = y
    while(iterator.iterations<ships[iterator.shipIdx]){
        highlightArr.push(`${Y}${X}`)
        rotation === 1 ? X++ : Y++
        iterator.iterations++
    }
    iterator.iterations = 0

    highlightArr.forEach((x) => {
        for(i of cellDataHum){
            if(i.textContent === x && i.style.backgroundColor !== colors[0]){
                i.style.backgroundColor = colors[4]
            }
        }
    })
}

function unHighLight(evt){
    highlightArr = []
    if(evt.target.tagName !== 'TD')return
    cellDataHum.forEach((x) => {
    x.style.backgroundColor !== colors[0] ? x.style.backgroundColor = colors[2] : null
    })
}





//Gameplay functions 

function randomCoor(){
    let min = Math.ceil(0)
    let max = Math.floor(10)
    let coorPackage = []
    let randomNum = Math.floor(Math.random() * (max - min) + min)
    return randomNum
}
    

