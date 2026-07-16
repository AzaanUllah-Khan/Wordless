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
let sound = new Audio("add.mp3")
let decline = new Audio("decline.mp3")
let enter = new Audio("enter.mp3")
let type = new Audio("type.wav")
let selectedWordArray = []
let typedWord = []

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
        alert(selectedWordArray)
    } catch (error) {
        console.log(error);
    }
}
selectRandomWord()
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
function matchWord(){
    for(i=0;i<typedWord.length;i++){
        for(j=0;j<selectedWordArray.length;j++){
            console.log(typedWord[i],selectedWordArray[j]);
        }
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
                typedWord = typedWord.splice(rowLetters,1)
                type.play()
            }
        } else {
            currKeyCount = 0
        }
    } else if (e.key == "a" || e.key == "b" || e.key == "c" || e.key == "d" || e.key == "e" || e.key == "f" || e.key == "g" || e.key == "h" || e.key == "i" || e.key == "j" || e.key == "k" || e.key == "l" || e.key == "m" || e.key == "n" || e.key == "o" || e.key == "p" || e.key == "q" || e.key == "r" || e.key == "s" || e.key == "t" || e.key == "u" || e.key == "v" || e.key == "w" || e.key == "x" || e.key == "y" || e.key == "z") {
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
        if(rowLetters == num){
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