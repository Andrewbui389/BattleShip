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


const wavesSound = new Audio('./Sounds/waves.mp3')

const tableELHum = document.querySelector("#player")

const cellDataHum = [...tableELHum.querySelectorAll('td')]

const tableELComp = document.querySelector("#computer")

const cellDataComp = [...tableELComp.querySelectorAll('td')]

const message = document.querySelector("h1")

tableELHum.addEventListener('click', handleData)

tableELHum.addEventListener('mouseover', highLight)

tableELHum.addEventListener('mouseout', unHighLight)

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
    it.i = 0
    getCoors(evt.target.textContent)
    if(guard())return
    it.shipIdx < 5 ? addData() : fire()
    render()
    it.shipIdx++
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
    renderSound()
}


function renderSound(){
    wavesSound.volume = .5
    wavesSound.play()
}

function renderHumanBoard(){
    for(i of cellDataHum){
        if(player.c[i.textContent]){
            i.style.backgroundColor = '#4F5F63'
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
    
}

function guard(){
    let X = x
    let Y = y
    if(shipsId[it.shipIdx] === undefined)return
    while(it.i < shipsId[it.shipIdx].l){
        if(player.b[Y][X] || player.b[Y][X] === undefined)return true
        rotation === 1 ? X++ : Y++
        it.i++  
    }
    it.i = 0
}

function highLight(evt){
    if(evt.target.tagName !== 'TD')return
    getCoors(evt.target.textContent)
    if(shipsId[it.shipIdx] === undefined)return
    if(guard())return
    if(guard())return
    let X = x
    let Y = y
    while(it.i < shipsId[it.shipIdx].l){
        for(i of cellDataHum){
            if(i.textContent === `${Y}${X}` && i.style.backgroundColor !== '#4F5F63'){i.style.backgroundColor = 'lightgray'}
        }
        rotation === 1 ? X++ : Y++
        it.i++
    }
    it.i = 0
}

function unHighLight(evt){
    if(evt.target.tagName !== 'TD')return
    getCoors(evt.target.textContent)
    if(guard())return
    for(i of cellDataHum){
        if(i.style.backgroundColor === 'lightgray'){
            i.style.backgroundColor = '#5199CC'
        }
    }
}

function rotateBtn() {
    rotation === 1 ? rotation =  0 : rotation = 1;
}

function checkShips() { 
    
}

function fire(){
    console.log('fire')
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