let val = 0;

const playerEl =  document.querySelector('#player');

const compEl = document.querySelector('#computer');

gameboard();

function createColumn(){
    let createTR = document.createElement('tr');
    return createTR;
};

function createRow(){
    let count = 0;
    let column = createColumn();
    while(count<10){
        let createTD = document.createElement('td');
        createTD.textContent = `${val}${count}`;
        column.appendChild(createTD);
        count++;
    };
    return column;
};

function gameboard(){
    
    let count = 0;
    while(count<10){
        playerEl.appendChild(createRow());
        compEl.appendChild(createRow());
        count++;
        val++;
    };
};















