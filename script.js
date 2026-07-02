//ALL VARIABLES AND DOC SELECTORS

let addbtn = document.querySelector("#addnote")
let formcontainer = document.querySelector(".form-container")
let closeform = document.querySelector(".closeForm")
let form  = document.querySelector("form")

let stack = document.querySelector(".stack")
let upbtn = document.querySelector("#upBtn")
let downbtn = document.querySelector("#downBtn")

const imageUrlInput = document.querySelector('input[placeholder="https://example.com/photo.jpg"]');
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput = document.querySelector('input[placeholder="e.g., Quick appointment note"]');


const emergencyRadio = document.querySelector('input[value="emergency"]');
const importantRadio = document.querySelector('input[value="important"]');
const urgentRadio = document.querySelector('input[value="urgent"]');
const noRushRadio = document.querySelector('input[value="no-rush"]');

const submitBtn = document.querySelector('.submit-btn');

//CODE STARTS HERE
function savelocalstorage(obj){
    if(localStorage.getItem("tasks")===null){
        let oldtasks = []
        oldtasks.push(obj)
        localStorage.setItem("tasks",JSON.stringify(oldtasks))
    }
    else{
        let oldtasks = localStorage.getItem("tasks")
        oldtasks = JSON.parse(oldtasks)
        oldtasks.push(obj)
        localStorage.setItem("tasks",JSON.stringify(oldtasks));
    }
}

addbtn.addEventListener("click",function(){
    formcontainer.style.display = "initial";
})

closeform.addEventListener("click",function(){
    formcontainer.style.display = "none"
})

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const homeTown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();

    // Image URL
    if (imageUrl === "") {
        alert("Please enter an image URL.");
        return;
    }


    // Full Name
    if (fullName === "") {
        alert("Please enter your full name.");
        return;
    }

    if (fullName.length < 3) {
        alert("Full name must be at least 3 characters.");
        return;
    }

    // Home Town
    if (homeTown === "") {
        alert("Please enter your home town.");
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(homeTown)) {
        alert("Home town should contain only letters and spaces.");
        return;
    }

    // Purpose
    if (purpose === "") {
        alert("Please enter a purpose.");
        return;
    }

    if (purpose.length < 10) {
        alert("Purpose must be at least 10 characters.");
        return;
    }

    // Category
    if (
        !emergencyRadio.checked &&
        !importantRadio.checked &&
        !urgentRadio.checked &&
        !noRushRadio.checked
    ) {
        alert("Please select a category.");
        return;
    }
    const selectedCategory = document.querySelector(
        'input[name="category"]:checked'
    );
    let category = selectedCategory.value

    savelocalstorage({
        imageUrl,
        fullName,
        homeTown,
        purpose,
        category
    })

    form.reset()
    formcontainer.style.display = "none"
    showcards()
});

function showcards(){
    stack.innerHTML = ""
    let alltasks = JSON.parse(localStorage.getItem("tasks"))

    alltasks.forEach(element => {
        let card = document.createElement("div")
        card.classList.add("card")

        let img = document.createElement("img")
        img.classList.add("avatar")
        img.setAttribute("src",element.imageUrl);
        img.setAttribute("alt","")

        card.appendChild(img)

        let h2 = document.createElement("h2")
        h2.textContent = element.fullName

        card.appendChild(h2)

        let addressDiv = document.createElement("div")
        addressDiv.classList.add("info")

        let p1 = document.createElement("span")
        p1.textContent = "Home Town"

        addressDiv.appendChild(p1)

        let p2 = document.createElement("span")
        p2.textContent = element.homeTown;
        addressDiv.appendChild(p2)

        card.appendChild(addressDiv)

        let purposeDiv = document.createElement("div");
        purposeDiv.classList.add("info")

        let p3 = document.createElement("span")
        p3.textContent = "purpose"
        purposeDiv.appendChild(p3)

        let p4 = document.createElement("span")
        p4.textContent = element.purpose
        purposeDiv.appendChild(p4)

        card.appendChild(purposeDiv)

        let buttonsDiv = document.createElement("div")
        buttonsDiv.classList.add("buttons")

        let callbtn = document.createElement("button")
        callbtn.classList.add("call")
        callbtn.innerHTML = "Call"
        buttonsDiv.appendChild(callbtn)

        let msgbtn = document.createElement("button")
        msgbtn.classList.add("msg")
        msgbtn.innerHTML = "msg"
        buttonsDiv.appendChild(msgbtn)

        card.appendChild(buttonsDiv)

        stack.appendChild(card)
    });
}
showcards()

function updatestack(){
    let cards = document.querySelectorAll(".card");

    for(let index = 0 ; index < Math.min(3,cards.length) ; index++){
        let element = cards[index]
        element.style.zIndex = 3 - index
        element.style.transform = `translateY(${index*10}px) scale(${1 - index*0.02})`
        element.style.opacity = `${1 - index*0.02}`
    }
}

upbtn.addEventListener("click",function(){
    let lastchild = stack.lastElementChild;
    if(lastchild){
        stack.insertBefore(lastchild,stack.firstElementChild)
        //update
        updatestack()
    }
})

downbtn.addEventListener("click",function(){
    let firstchild = stack.firstElementChild;
    if(firstchild){
        stack.appendChild(firstchild)
        //update
        updatestack()
    }
})

const darkBtn = document.querySelector("#dark");
const lightBtn = document.querySelector("#light");

darkBtn.addEventListener("click", () => {
    console.log("dark clicked")
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme","dark")
});

lightBtn.addEventListener("click", () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme","light")
});

const savedTheme = localStorage.getItem("theme") || "light";
document.body.className = savedTheme;