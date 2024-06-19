const btnFocus = document.querySelector('.focus')
const btnShort = document.querySelector('.short-break')
const btnLong = document.querySelector('.long-break')
const btnStart = document.querySelector('.start')
const image = document.querySelector('img')
const buttons = document.querySelectorAll('button')
const timer = document.querySelector('.timer')
const title = document.querySelector('h2')

const audioStart = new Audio('/assets/sounds/katon.mp3')
const audioPause = new Audio('/assets/sounds/dattebayo.mp3')
const audioAlarm = new Audio('/assets/sounds/narutos-theme-song.mp3')

let timeInSeconds = 1500
let intervalId = null

btnFocus.addEventListener('click', () => {
    timeInSeconds = 1500
    changeTimer('focus')
    btnFocus.classList.add('focused')
    title.innerHTML = 'Focus'
})

btnShort.addEventListener('click', () => {
    timeInSeconds = 300
    changeTimer('short-break')
    btnShort.classList.add('focused')
    title.innerHTML = 'Short break'
})

btnLong.addEventListener('click', () => {
    timeInSeconds = 900
    changeTimer('long-break')
    btnLong.classList.add('focused')
    title.innerHTML = 'Long break'
})

function changeTimer(status) {
    showTime()
    image.setAttribute('src', `/assets/${status}.jpg`)
    buttons.forEach((status) => {
        status.classList.remove('focused')
    })
}

btnStart.addEventListener('click', () => {
    audioStart.play()
    startPauseCount()
})

const timePassing = () => {
    if (timeInSeconds <= 0) {
        audioAlarm.play()
        clear()
        alert('Time is over dattebayo')
        return
    }
    timeInSeconds -= 1
    showTime()
}

function startPauseCount() {
    if (intervalId) {
        audioPause.play()
        clear()
        return
    }
    audioStart.play()
    intervalId = setInterval(timePassing, 1000)
    btnStart.textContent = 'Pause'
}

function clear() {
    clearInterval(intervalId)
    btnStart.textContent = 'Start'
    intervalId = null
}

function showTime() {
    const time = new Date(timeInSeconds * 1000)
    const formatTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${formatTime}`
}

showTime()