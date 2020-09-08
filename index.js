const bar = document.querySelector("input");
const listOfEntries = document.querySelector(".list-of-things")
const subBtn = document.querySelector(".sub-btn");
const warningText = document.querySelector(".warning-text")
const listOfItem = document.querySelector(".list-item")
const maxCharLength = 10;
var activeBtn
var entries = [];
var currentID = 0;



bar.addEventListener("keyup", (e) => {
    if (e.key === "Enter"){
        submit_btn_func();
    }
})

subBtn.addEventListener("click", () => {
    submit_btn_func();
})

function delClicked (e) {
    console.log(e)
    e.parentElement.remove()
}



function submit_btn_func() {
    if (bar.value.length < maxCharLength && bar.value.length > 0){
        let text = bar.value;
        entries.push(text)
        bar.value = "";
        listOfEntries.innerHTML += `<div id="${entries.length}" class="list-item">
        <p class="list-item-text">${text}</p>
        <button class="list-item-button" onclick="delClicked(this)">Delete</button>
    </div>`
        console.log(bar.value.length)
        console.log(entries);
    } else if (bar.value.length >= maxCharLength){
        const errText = `Exceded character amount of ${maxCharLength}`
        show_error_text(errText)
    } else if (bar.value.length == 0) {
        const errText = "There has to be something you are grateful for";
        show_error_text(errText);
    } else{
        const errText = "Undefind Error";
        show_error_text("undefined error please contact");
    }
}

function show_error_text(errTextVar) {
    console.log(errTextVar);
    warningText.innerHTML = errTextVar

    window.setTimeout(() => {warningText.innerHTML = " "},5000)
    
}