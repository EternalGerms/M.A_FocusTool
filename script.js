const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const stopT = document.querySelector('.stop')
const set = document.querySelector('.set')
const minutesDisplay = document.querySelector('.minutes')
const hoursDisplay = document.querySelector('.hours')
const secondsDisplay = document.querySelector('.seconds')
let timerTimeOut
let seconds = 0
let minutes = 0
let hours = 0
function convertTime(){
    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60)
        seconds = seconds % 60
    }
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60)
        minutes = minutes % 60
    }
}

function resetTimer(){
    formatText()
    clearTimeout(timerTimeOut)
}

function resetControls(){
    stopT.classList.add('hide')
    set.classList.remove('hide')
    pause.classList.add('hide')
    play.classList.remove('hide')
}

function formatText(){

    hoursDisplay.textContent = String(hours).padStart(2, "0")
    minutesDisplay.textContent = String(minutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")


}
function timer(){
    setTimeout(function() {
        let seconds = Number(secondsDisplay.textContent)
        let minutes = Number(minutesDisplay.textContent)
        let hours = Number(hoursDisplay.textContent)
        
        if(minutes == 0 ){
            if(hours == 0 && seconds == 0 ){
                return 
                }
            if(seconds <= 0 && hours != 0){
                hoursDisplay.textContent = String(hours > 0 ? hours - 1 : hours).padStart(2, "0")
                minutes = 60
            }
        }
        if(seconds <= 0) {
            seconds = 60
            minutesDisplay.textContent = String(minutes > 0 ? minutes - 1: 0).padStart(2, "0")
        }
        
        secondsDisplay.textContent = String(seconds - 1).padStart(2, "0")
        
        timer()
        
    }, 1000);
}

play.addEventListener('click', function(){
    play.classList.add('hide')
    pause.classList.remove('hide')
    set.classList.add('hide')
    stopT.classList.remove('hide')  
    timer()
})
pause.addEventListener('click', function(){
    pause.classList.add('hide')
    play.classList.remove('hide')
})

stopT.addEventListener('click', function(){
resetControls()
resetTimer()
})

set.addEventListener('click', function(){
    hours = Number(prompt('Quantas horas?'))
    minutes = Number(prompt('Quantos minutos?'))
    seconds = Number(prompt('Quantos segundos?'))
    convertTime()
    formatText()
    
})