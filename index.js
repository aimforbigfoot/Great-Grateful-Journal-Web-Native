const bar = document.querySelector("input");
const listOfEntries = document.querySelector(".list-of-things")
const subBtn = document.querySelector(".sub-btn");
const warningText = document.querySelector(".warning-text")
const listOfItem = document.querySelector(".list-item")
var listItemText = document.querySelectorAll(".list-item-text")
const maxCharLength = 40;
var activeBtn
var entries = ["0"];
var currentID = 0;

console.log(listItemText)

bar.addEventListener("keyup", (e) => {
    if (e.key === "Enter"){
        submit_btn_func();
    }
})

subBtn.addEventListener("click", () => {
    submit_btn_func();
})

function delClicked (e) {
    delete(entries[e.parentElement.id-1])
    //console.log(listOfEntries)
    //entries.splice(e.parentElement.id-1,1)
    e.parentElement.remove()
    console.log(entries)
}



function submit_btn_func() {
    if (bar.value.length < maxCharLength && bar.value.length > 0 && hasNotBeenSaidBefore(bar.value) ) {
        let text = bar.value;
        entries.push(text)
        bar.value = "";
        listOfEntries.innerHTML = `<div id="${entries.length}" class="list-item"><p class="list-item-text">${text}</p><button class="list-item-button" onclick="delClicked(this)">Delete</button></div>` + listOfEntries.innerHTML;
    
    console.log(listItemText)
    console.log(entries);
    } else if (bar.value.length >= maxCharLength){
        const errText = `Exceded character amount of ${maxCharLength}`
        show_error_text(errText)
    } else if (bar.value.length == 0) {
        
    } else if (!hasNotBeenSaidBefore(bar.value)) {
        show_error_text("You have already said that before")
        

    } else {
        const errText = "Undefind Error";
        show_error_text("undefined error please contact");
    }
}

function show_error_text(errTextVar) {
    console.log(errTextVar);
    warningText.innerHTML = errTextVar

    window.setTimeout(() => {warningText.innerHTML = " "},5000)
    
}

function hasNotBeenSaidBefore(val) {
    let state = true
    for (i = 0; i < entries.length; i++  ) {
        if (entries[i] == val ){
            state = false
            show_error_text("You have already said that before")
        }
    }
    console.log(val, "checker")
    return state

}