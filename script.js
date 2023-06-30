const play = document.querySelector('.play')
const pause = document.querySelector('.pause')
const stopT = document.querySelector('.stop')
const set = document.querySelector('.set')
const setT = document.querySelector('#set')
const minutesDisplay = document.querySelector('.minutes')
const hoursDisplay = document.querySelector('.hours')
const secondsDisplay = document.querySelector('.seconds')
const audio = new Audio("/images/alarm.mp3");
const alarm = document.querySelector('#alarm')
const alarmI = document.querySelector('.mute');
stopT.style.display = 'none'
set.style.display = 'block'
pause.style.display = 'none'
play.style.display = 'block'
let timerTimeOut
let seconds = 0
let minutes = 0
let hours = 0

alarmI.addEventListener('click', function() {
    alarm.classList.toggle('fa-volume-xmark')
})

function HasSound() {
    if (alarm.classList.contains('fa-volume-xmark')) {
        return false;
    }
    else {
        return true;
    }
}


function convertTime() {
    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60)
        seconds = seconds % 60
    }
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60)
        minutes = minutes % 60
    }
}

function resetTimer() {
    formatText()
    clearTimeout(timerTimeOut)
    hoursDisplay.textContent = String(0).padStart(2, "0")
    minutesDisplay.textContent = String(25).padStart(2, "0")
    secondsDisplay.textContent = String(0).padStart(2, "0")
}

function resetControls() {
    stopT.style.display = 'none'
    set.style.display = 'block'
    pause.style.display = 'none'
    play.style.display = 'block'
}

function formatText() {

    hoursDisplay.textContent = String(hours).padStart(2, "0")
    minutesDisplay.textContent = String(minutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")

}

function timer() {
    timerTimeOut = setTimeout(function() {
        seconds = Number(secondsDisplay.textContent)
        minutes = Number(minutesDisplay.textContent)
        hours = Number(hoursDisplay.textContent)
        
        if (seconds == 0 && minutes == 0 && hours == 0) {
            if (HasSound()) {
                audio.play();
            }
            console.log(HasSound())
            resetControls();
            return;
            
            
        }
        if (seconds === 0 && minutes !== 0) {
            minutes--;
            seconds = 60;
            minutesDisplay.textContent = String(minutes).padStart(2, "0");
        } else if (seconds === 0 && minutes === 0 && hours !== 0) {
            hours--;
            minutes = 60;
            seconds = 60;
            hoursDisplay.textContent = String(hours).padStart(2, "0");
            minutesDisplay.textContent = String(minutes - 1).padStart(2, "0");
        }
        

        secondsDisplay.textContent = String(seconds - 1).padStart(2, "0")

        timer()

    }, 1000);

}

play.addEventListener('click', function() {
    console.log(HasSound())
    play.style.display = 'none'
    pause.style.display = 'block'
    set.style.display = 'none'
    stopT.style.display = 'block'
    timer()
})
pause.addEventListener('click', function() {
    console.log(HasSound())
    pause.style.display = 'none'
    play.style.display = 'block'
    clearTimeout(timerTimeOut)
})

stopT.addEventListener('click', function() {
    resetControls()
    resetTimer()
})

setT.addEventListener('click', function() {
    hours = Number(document.querySelector('#hours').value)
    minutes = Number(document.querySelector('#minutes').value)
    seconds = Number(document.querySelector('#seconds').value)
    convertTime()
    formatText()

})

