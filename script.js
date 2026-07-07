let IncBtn = document.getElementById('inc')
let DecBtn = document.getElementById('dec')
let input = document.getElementById('inp')
let rows = document.getElementsByClassName('row')
let num = 3
let currKeyCount = 0
let allKeyCount = num*6
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
    allKeyCount = num*6
    check()
    addBoxes()
    sound.play()
}
function decrease() {
    num = num - 1
    input.value = num
    allKeyCount = num*6
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
window.addEventListener("keydown",((e)=>{
    if(e.key == "Backspace"){
        currKeyCount>0?currKeyCount=currKeyCount-1:currKeyCount=0
        console.log(currKeyCount);
    }else{
        currKeyCount=currKeyCount+1
        console.log(currKeyCount);
    }
    if(currKeyCount>0){
        IncBtn.setAttribute("disabled",true)
        DecBtn.setAttribute("disabled",true)
    }else if(currKeyCount==0){
        IncBtn.removeAttribute("disabled")
        DecBtn.removeAttribute("disabled")
        check()
    }
}))