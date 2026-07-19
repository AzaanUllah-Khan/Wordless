let IncBtn = document.getElementById('inc')
let DecBtn = document.getElementById('dec')
let input = document.getElementById('inp')
let rows = document.getElementsByClassName('row')
let letterBoxes = document.getElementsByClassName('letter')
let num = 3
let currKeyCount = 0
let rowLetters = 0
let allKeyCount = num * 6
let wordBank = []
let word = "cat"
input.value = num
let sound = new Audio("./sounds/add.mp3")
let decline = new Audio("./sounds/decline.mp3")
let enter = new Audio("./sounds/enter.mp3")
let type = new Audio("./sounds/type.wav")
let selectedWordArray = []
let typedWord = []
let min = 0
let sec = 0
let time = ""
let timeStarted = false
let timerID

async function selectRandomWord() {
    try {
        const response = await fetch('./words.json')
        const data = await response.json()
        if (num == 3) {
            wordBank = data["three"]
        } else if (num == 4) {
            wordBank = data["four"]
        } else if (num == 5) {
            wordBank = data["five"]
        } else if (num == 6) {
            wordBank = data["six"]
        }
        word = wordBank[Math.ceil(Math.random() * wordBank.length)]
        selectedWordArray = word.split("")
        console.log(selectedWordArray)
    } catch (error) {
        console.log(error);
    }
}
selectRandomWord()
function startTime() {
    timeStarted = true
    timerID = setInterval(() => {
        sec += 1
        if (sec > 59) {
            min += 1
            sec = 0
        }
    }, 1000);
}
function check() {
    if (num == 6) {
        IncBtn.setAttribute("disabled", true)
    } else if (num == 3) {
        DecBtn.setAttribute("disabled", true)
    } else {
        IncBtn.removeAttribute("disabled")
        DecBtn.removeAttribute("disabled")
    }
}

function increase() {
    num = num + 1
    input.value = num
    allKeyCount = num * 6
    check()
    addBoxes()
    sound.play()
    selectRandomWord()
}
function decrease() {
    num = num - 1
    input.value = num
    allKeyCount = num * 6
    check()
    removeBoxes()
    sound.play()
    selectRandomWord()
}
function addBoxes() {
    for (i = 0; i < rows.length; i++) {
        box = document.createElement("div")
        box.setAttribute("class", `letter b${num}`)
        rows[i].appendChild(box)
    }
}
function removeBoxes() {
    for (i = 0; i < rows.length; i++) {
        child = document.getElementsByClassName(`b${num + 1}`)[0]
        rows[i].removeChild(child)
    }
}
function normal() {
    for (i = 0; i < letterBoxes.length; i++) {
        if (letterBoxes[i].classList.contains("right")) {
            letterBoxes[i].classList.remove("right")
        } else if (letterBoxes[i].classList.contains("rightwrong")) {
            letterBoxes[i].classList.remove("rightwrong")
        }
    }
}
function matchWord() {
    let row = document.getElementsByClassName("row")[(currKeyCount / num) - 1]
    if (typedWord.join("") == selectedWordArray.join("")) {
        let parent = document.getElementById("popupword")
        parent.innerHTML = ""
        for (i = 0; i < selectedWordArray.length; i++) {
            let p = document.createElement("p")
            p.innerHTML = selectedWordArray[i]
            parent.appendChild(p)
        }
        for (i = 0; i < row.children.length; i++) {
            row.children[i].classList.add("right")
        }
        setTimeout(() => {
            document.getElementById("filter").style.opacity = "1"
            document.getElementById("filter").style.visibility = "visible"
            document.getElementById("filter").style.pointerEvents = "auto"
            document.getElementById("solved").style.opacity = "1"
            document.getElementById("solved").style.visibility = "visible"
            document.getElementById("solved").style.pointerEvents = "auto"
            document.getElementById("solved").style.transform = "translate(-50%, -50%)"
            document.getElementById("solved").style.scale = "1"
            document.getElementById("timer").innerHTML = `Time: ${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`
            document.getElementById("tryNum").innerHTML = `Solved in ${currKeyCount / num} tries`
        }, 1000);
    } else {
        for (i = 0; i < typedWord.length; i++) {
            for (j = 0; j < selectedWordArray.length; j++) {
                if (typedWord[i] == selectedWordArray[j]) {
                    if (i == j) {
                        row.children[i].classList.add("right")
                    } else {
                        row.children[i].classList.add("rightwrong")
                    }
                }
            }
        }
        if (currKeyCount / num == 6) {
            let parent = document.getElementById("popupword2")
            parent.innerHTML = ""
            for (i = 0; i < selectedWordArray.length; i++) {
                let p = document.createElement("p")
                p.innerHTML = selectedWordArray[i]
                parent.appendChild(p)
            }
            document.getElementById("filter").style.opacity = "1"
            document.getElementById("filter").style.visibility = "visible"
            document.getElementById("filter").style.pointerEvents = "auto"
            document.getElementById("unsolved").style.opacity = "1"
            document.getElementById("unsolved").style.visibility = "visible"
            document.getElementById("unsolved").style.pointerEvents = "auto"
            document.getElementById("unsolved").style.transform = "translate(-50%, -50%)"
            document.getElementById("unsolved").style.scale = "1"
            document.getElementById("timer2").innerHTML = `Time: ${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`
            clearInterval(timerID)
            sec = 0
            min = 0
            timeStarted = false
            currKeyCount = 0
        }
    }
    typedWord = []
}
function nextRound() {
    document.getElementById("filter").style.opacity = "0"
    document.getElementById("filter").style.visibility = "hidden"
    document.getElementById("filter").style.pointerEvents = "none"
    document.getElementById("solved").style.opacity = "0"
    document.getElementById("solved").style.visibility = "hidden"
    document.getElementById("solved").style.pointerEvents = "none"
    document.getElementById("solved").style.transform = "translate(-50%, -50%)"
    document.getElementById("solved").style.scale = "0.5"
    if (num < 6) {
        num = num + 1
        input.value = num
        allKeyCount = num * 6
        addBoxes()
        reset()
        clearInterval(timerID)
        sec = 0
        min = 0
        timeStarted = false
        currKeyCount = 0
        normal()
    } else {
        window.location.reload()
    }
}
window.addEventListener("keydown", ((e) => {
    if (e.key == "Backspace") {
        if (currKeyCount > 0) {
            if (rowLetters > 0) {
                currKeyCount = currKeyCount - 1
                rowLetters = rowLetters - 1
                letterBoxes[currKeyCount].innerHTML = " "
                letterBoxes[currKeyCount].style.animation = 'none';
                letterBoxes[currKeyCount].offsetHeight;
                letterBoxes[currKeyCount].style.animation = 'pop 0.3s ease-out';
                typedWord.splice(rowLetters, 1)
                type.play()
            }
        } else {
            currKeyCount = 0
        }
    } else if (e.key == "a" || e.key == "b" || e.key == "c" || e.key == "d" || e.key == "e" || e.key == "f" || e.key == "g" || e.key == "h" || e.key == "i" || e.key == "j" || e.key == "k" || e.key == "l" || e.key == "m" || e.key == "n" || e.key == "o" || e.key == "p" || e.key == "q" || e.key == "r" || e.key == "s" || e.key == "t" || e.key == "u" || e.key == "v" || e.key == "w" || e.key == "x" || e.key == "y" || e.key == "z") {
        timeStarted ? "" : startTime()
        if (currKeyCount < allKeyCount) {
            if (rowLetters < num) {
                rowLetters = rowLetters + 1
                currKeyCount = currKeyCount + 1
                letterBoxes[currKeyCount - 1].innerHTML = e.key
                typedWord.push(e.key)
                letterBoxes[currKeyCount - 1].style.animation = 'none';
                letterBoxes[currKeyCount - 1].offsetHeight;
                letterBoxes[currKeyCount - 1].style.animation = 'pop 0.3s ease-out';
                type.play()
            } else {
                decline.play()
            }
        }
    } else if (e.key == "Enter") {
        if (rowLetters == num) {
            matchWord()
            rowLetters = 0
            enter.play()
        }
    }
    if (currKeyCount > 0) {
        IncBtn.setAttribute("disabled", true)
        DecBtn.setAttribute("disabled", true)
    } else if (currKeyCount == 0) {
        IncBtn.removeAttribute("disabled")
        DecBtn.removeAttribute("disabled")
        check()
    }
}))
function reset() {
    currKeyCount = 0
    rowLetters = 0
    typedWord = []
    for (i = 0; i < letterBoxes.length; i++) {
        letterBoxes[i].innerHTML = " "
    }
    document.getElementById("reset").blur()
    IncBtn.removeAttribute("disabled")
    DecBtn.removeAttribute("disabled")
    check()
    selectRandomWord()
    console.log(selectedWordArray)
    document.getElementById("filter").style.opacity = "0"
    document.getElementById("filter").style.visibility = "hidden"
    document.getElementById("filter").style.pointerEvents = "none"
    document.getElementById("unsolved").style.opacity = "0"
    document.getElementById("unsolved").style.visibility = "hidden"
    document.getElementById("unsolved").style.pointerEvents = "none"
    document.getElementById("unsolved").style.transform = "translate(-50%, -50%)"
    document.getElementById("unsolved").style.scale = "0.5"
    normal()
}