const bodyEl = document.querySelector('body')

const removeVideo = document.querySelector('#opening')

const gameBodyEl = document.querySelector('#gameBody')

setTimeout(loadInGame,7000)

setTimeout(() => {
    gameBodyEl.style.display = 'flex'
},6500)


function loadInGame(){
    removeVideo.remove()
}