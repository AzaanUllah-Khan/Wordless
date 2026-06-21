let IncBtn = document.getElementById('inc')
let DecBtn = document.getElementById('dec')
let input = document.getElementById('inp')
let num = 3
input.value = num

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
}
function decrease() {
    num = num - 1
    input.value = num
    check()
}