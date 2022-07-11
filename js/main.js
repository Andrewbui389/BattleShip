const shipsId = [
                {l:5, s:'c',sank:false,ship:'Carrier',msgRead:false},
                {l:4, s:'d',sank:false,ship:'Battleship',msgRead:false},
                {l:3, s:'s',sank:false,ship:'Cruiser',msgRead:false},
                {l:3, s:'b',sank:false,ship:'Submarine',msgRead:false},
                {l:2, s:'p',sank:false,ship:'Patrol Boat',msgRead:false}
                ];

const wavesSound = new Audio('./Sounds/waves.mp3');

const cannonFire = new Audio('./Sounds/cannonEffect.mp3');

let player; 

let computer; 

let x;

let y;

let sound; 

let rotation;

let winner;

let it;

const tableELHum = document.querySelector("#player");

const cellDataHums = [...tableELHum.querySelectorAll('td')];

const tableELComp = document.querySelector("#computer");

const cellDataComps = [...tableELComp.querySelectorAll('td')];

const message = document.querySelector("h1");

const rotateButton = document.querySelector('#rotate');

const resetGameBtn = document.querySelector('#reset');


tableELHum.addEventListener('click', handleData);

tableELHum.addEventListener('mouseover', highLight);

tableELHum.addEventListener('mouseout', unHighLight);

tableELComp.addEventListener('click', handleData);

rotateButton.addEventListener('click', rotateBtn);

resetGameBtn.addEventListener('click', init);

document.querySelector('#sounds').addEventListener('click', soundBtn);

init();

function init() {
    player = makeDataBoard();
    computer = makeDataBoard();
    it = {
         i: 0, 
         shipIdx:0,
         shipMsg: 0
         };
    x = null;
    y = null;
    rotation = 1; 
    winner = null;
    sound = 1
    tableELHum.style.pointerEvents = 'auto';
    tableELComp.style.pointerEvents = 'none';
    resetGameBtn.style.visibility = 'hidden';
    rotateButton.style.visibility = 'visible';
    renderMessage();
    compPlace();
    resetBoard();
};

function resetBoard() {
    for(i of cellDataHums){
        i.style.backgroundColor = '#5199CC';
        i.style.color = '#5199CC';
    };
    for(i of cellDataComps){
        i.style.backgroundColor = '#5199CC';
        i.style.color = '#5199CC';
    };
};

function makeDataBoard() {
    let board = [];
    while(board.length<10){
        board.push([null,null,null,null,null,null,null,null,null,null]);
    };
    let data = {
        b: board,
        c: {} 
    };
    return data;
};

function handleData(evt) {
    if(winner !== null)return;
    if(evt.target.tagName !== 'TD')return;
    getCoors(evt.target.textContent);
    humTrack();
    compTrack();
    it.i = 0;
    if(guard())return;
    else{
    it.shipIdx < 5 ? addData() : fire();
    it.shipIdx < 4 ? null : mouseActions();
    render();
    it.shipIdx++;
    };
};

function addData() {
    let X = x;
    let Y = y;
    while(it.i < shipsId[it.shipIdx].l){
        player.c[`${Y}${X}`] = true;
        player.b[Y][X] = shipsId[it.shipIdx].s;
        it.i++;
        rotation === 1 ? X++ : Y++;
    };
    it.i = 0;
};

function mouseActions() { 
        tableELHum.style.pointerEvents = 'none';
        tableELComp.style.pointerEvents = 'auto';
        rotateButton.style.visibility = 'hidden';
};

function getCoors(int) {
    let newArr = int.split('');
    y = parseInt(newArr[0]);
    x = parseInt(newArr[1]);
};

function render() {
    renderHumanBoard();
    renderCompBoard();
    renderMessage();
    renderSound();
};

function renderSound() {
    if(sound === 1){
        wavesSound.volume = 1;
        cannonFire.volume = .2;
    }
    if(sound === 0){
        wavesSound.volume = 0;
        cannonFire.volume = 0;
    }
    
    cannonFire.duration = .1;
    wavesSound.play();
    if(it.shipIdx>4){
        cannonFire.duration = .1;
        cannonFire.play();
    };
};

function renderHumanBoard() {
    for(i of cellDataHums) {
        if(player.c[i.textContent]){
            i.style.backgroundColor = '#4F5F63';
        };
        if(player.c[i.textContent] === 'H'){
            i.style.backgroundColor = 'red';
        };
        if(player.c[i.textContent] === 'M'){
            i.style.backgroundColor = 'green';
        };
    };
};

function renderCompBoard() {
    for(i of cellDataComps) {
        if(computer.c[i.textContent] === 'H') {
            i.style.backgroundColor = 'red';
        };
        if(computer.c[i.textContent] === 'M') {
            i.style.backgroundColor = 'green';
        };
    };
};

function renderMessage() {
    if(it.shipIdx < 4) {
        message.textContent = `Admiral Please Place ${shipsId[it.shipMsg].ship}`;
        it.shipMsg++;
    };
    if(it.shipIdx > 4) {
        if(computer.c[`${y}${x}`] === 'H') {
            message.textContent = 'Hit';
        } else if(computer.c[`${y}${x}`] !== 'H') {
            message.textContent = 'Miss';
        };
    };
    if(it.shipIdx === 4) {
        message.textContent = `God Speed Admiral`;
    };
    if(winner === 'Computer Won') {
        message.textContent = 'Admiral you have been Defeated';
    };
    if(winner === 'Human Won') {
        message.textContent = 'The Enemy Has been defeated congratualations Admiral';
    };
};

function guard() {
    if(i.shipIdx > 4)return; 
    let X = x;
    let Y = y;
    if(shipsId[it.shipIdx] === undefined)return;
    while(it.i < shipsId[it.shipIdx].l){
        if(Y > 9)return true;
        if(player.b[Y][X] || player.b[Y][X] === undefined)return true;
        rotation === 1 ? X++ : Y++;
        it.i++;  
    };
    it.i = 0;
};

function rotateBtn() {
    rotation === 1 ? rotation =  0 : rotation = 1;
};

function fire() {
    if(computer.c[`${y}${x}`] === 'H' || computer.c[`${y}${x}`] === 'M')return

    while(compfire()) {
        continue;
    }

    if(computer.c[`${y}${x}`] === 'M')return;
    if(computer.b[y][x]){
        computer.c[`${y}${x}`] = 'H';
        computer.b[y][x] = 'H';
        return;
    }else{
        (computer.c[`${y}${x}`] = 'M');
    };
};

function soundBtn() {
    sound === 1 ? sound = 0 : sound = 1;
    renderSound();
};

//Functions for Highlighting and Unhighlighting ships

function highLight(evt) {
    it.i = 0;
    if(evt.target.tagName !== 'TD')return;
    getCoors(evt.target.textContent);
    if(guard())return;
    let X = x;
    let Y = y;
    while(it.i < shipsId[it.shipIdx].l){
        for(i of cellDataHums){
            if(i.textContent === `${Y}${X}` && i.style.backgroundColor !== '#4F5F63'){i.style.backgroundColor = 'lightgray'};
        };
        rotation === 1 ? X++ : Y++;
        it.i++;
    };
    it.i = 0;
};

function unHighLight(evt) {
    if(evt.target.tagName !== 'TD')return;
    getCoors(evt.target.textContent);
    if(guard())return;
    for(i of cellDataHums){
        if(i.style.backgroundColor === 'lightgray'){
            i.style.backgroundColor = '#5199CC';
        };
    };
};

//Computer Functions 

function compPlace() { 
    let count = 0;
    while(count < 5){
        if(randomLocation(count))continue
        else{
            count++;
        };
        
    };
};

function randomLocation(int) {
    let count = 0;
    let x = randomCoor(int);
    let y = randomCoor(int);
    let X = x;
    let Y = y;
    let randomRotation = Math.floor(Math.random() * 2);
    while(count<shipsId[int].l){
        if(computer.b[Y][X])return true;
        count++;
        randomRotation === 1 ? X++ : Y++;
    };

    X = x
    Y = y
    count = 0

    while(count<shipsId[int].l){
        computer.b[Y][X] = shipsId[int].s;
        computer.c[`${Y}${X}`] = true;
        count++;
        randomRotation === 1 ? X++ : Y++;
    };
};

function randomCoor(int) {
    let min = Math.ceil(0);
    let max = Math.floor(11 - shipsId[int].l);
    let randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
};

function randomFireCoor() {
    let num = Math.floor(Math.random() * 10);
    return num
};

function compfire() {
    let X = randomFireCoor();
    let Y = randomFireCoor();
    if(player.c[`${Y}${X}`] === 'M')return true;
    if(player.c[`${Y}${X}`] === true){
        player.c[`${Y}${X}`] = 'H';
        player.b[Y][X]= 'H';
        return false;
    }else if(player.c[`${Y}${X}`] === undefined){
        player.c[`${Y}${X}`] = 'M';
        player.b[Y][X]= 'M';
        return false;
    };
    return true;
};

//Functions to track win logic

function humTrack() {
    let score = 17;
    for(i in player.c) {
       if(player.c[i] === 'H'){
        --score;
       };
    };
    if(score === 0) {
        resetGameBtn.style.visibility = 'visible';
        winner = 'Computer Won';
        return;
    };
};

function compTrack() {
    let score = 17;
    for(i in computer.c) {
       if(computer.c[i] === 'H'){
        --score;
       };
    };
    if(score === 0) {
        resetGameBtn.style.visibility = 'visible';
        winner = 'Human Won';
        return;
    };
};
