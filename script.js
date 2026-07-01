let addbtn = document.querySelector("#addnote")
let formcontainer = document.querySelector(".form-container")
let closeform = document.querySelector(".closeForm")

addbtn.addEventListener("click",function(){
    formcontainer.style.display = "initial";
})

closeform.addEventListener("click",function(){
    formcontainer.style.display = "none"
})