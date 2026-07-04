let IncBtn = document.getElementById('inc')
let DecBtn = document.getElementById('dec')
let input = document.getElementById('inp')
let rows = document.getElementsByClassName('row')
let num = 3
input.value = num
let sound = new Audio("add.mp3")

function check(){
    if(num == 6){
        IncBtn.setAttribute("disabled",true)
    } else if(num ==3 ){
        DecBtn.setAttribute("disabled",true)
    } else{
        IncBtn.removeAttribute("disabled")
        DecBtn.removeAttribute("disabled")
    }
}

function increase() {
    num = num + 1
    input.value = num
    check()
    addBoxes()
    sound.play()
}
function decrease() {
    num = num - 1
    input.value = num
    check()
    removeBoxes()
    sound.play()
}
function addBoxes(){
    for(i=0;i<rows.length;i++){
        box = document.createElement("div")
        box.setAttribute("class",`b${num}`)
        rows[i].appendChild(box)
    }
}
function removeBoxes(){
    for(i=0;i<rows.length;i++){
        child=document.getElementsByClassName(`b${num+1}`)[0]
        rows[i].removeChild(child)
    }
}