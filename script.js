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

let List = document.querySelector(".list");
let addTask = document.querySelector(".addbutton")
let inputTask = document.querySelector(".taskname")
let item = document.querySelector('.todo')

addTask.addEventListener('click', creating);

function creating() {
if (inputTask.value == '') {
    alert("Insira um nome válido!")
} else {
    let newTask = document.createElement('li');
    newTask.classList.add("todo", "my-2");

    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.classList.add('checkbox', 'align-middle', 'checkbox-primary', 'taskcheck')
    newTask.appendChild(newCheckbox);

    let newTaskname = document.createElement('span');
    newTaskname.innerHTML = inputTask.value;
    newTaskname.classList.add('label-text', 'align-middle', 'ml-3', 'checkname')
    newTask.appendChild(newTaskname);

    let newRemovebutton = document.createElement('button');
    newRemovebutton.classList.add('btn', 'btn-link', 'btn-error', 'btn-xs', 'remover');

    let newRemoveicon = document.createElement('i');
    newRemoveicon.classList.add('fa-solid', 'fa-xmark', 'mx-auto');
    newRemovebutton.appendChild(newRemoveicon)
    newTask.appendChild(newRemovebutton)

    List.appendChild(newTask);
    inputTask.value = '';

    newRemovebutton.addEventListener('click', function() {
        List.removeChild(newTask);
    })

    newCheckbox.addEventListener('change', function() {
        newTaskname.classList.toggle('line-through');
    })
}
}

alarmI.addEventListener('click', function() {
    alarm.classList.toggle('fa-volume-xmark')
})

function HasSound() {
    if (alarm.classList.contains('fa-volume-xmark')) {
        return false;
    } else {
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
    play.style.display = 'none'
    pause.style.display = 'block'
    set.style.display = 'none'
    stopT.style.display = 'block'
    timer()
})
pause.addEventListener('click', function() {
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