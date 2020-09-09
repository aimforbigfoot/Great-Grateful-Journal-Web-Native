const bar = document.querySelector("input");
const listOfEntries = document.querySelector(".list-of-things")
const subBtn = document.querySelector(".sub-btn");
const warningText = document.querySelector(".warning-text")
const listOfItem = document.querySelector(".list-item")
var listItemText = document.querySelectorAll(".list-item-text")
const maxCharLength = 30;
const delBar = document.querySelector(".delBar")
var activeBtn
var entries = ["0"];
var currentID = 0;
var listOfEntriesFromSave = JSON.parse(localStorage.getItem("listOfEntriesSave"));
var arrOfEntries = JSON.parse(localStorage.getItem("arrOfEntiresSave"));
var dateToPut = ""
//var arrOfEntires = JSON.parse(localStorage.getItem("arrOfEntires"))
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var d = new Date();
dateToPut = (months[d.getMonth()] + ", " + d.getDate() + ", " + d.getFullYear() )


console.log(dateToPut)
if (listOfEntriesFromSave && arrOfEntries){
    listOfEntries.innerHTML = listOfEntriesFromSave
    //console.log(localStorage.getItem("arrOfEntiresSave"));
    
    entries = arrOfEntries
    //console.log(arrOfEntries, entries)
    //entries = arrOfEntires
    //console.log(entries)
}

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
    //console.log(entries)
    updateLS()
}



function submit_btn_func() {
    if (bar.value.length < maxCharLength && bar.value.length > 0 && hasNotBeenSaidBefore(bar.value) ) {
        let text = bar.value;
        entries.push(text)
        bar.value = "";
        listOfEntries.innerHTML = `<div id="${entries.length}" class="list-item"><p class="list-item-text">${text}</p><p class="date-text">${dateToPut}</p><button class="list-item-button" onclick="delClicked(this)">Delete</button></div>` + listOfEntries.innerHTML;
        updateLS()
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
    //console.log(errTextVar);
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
    //console.log(val, "checker")
    return state

}


function homebtnpressed(){
    window.location.href = "../index.html"
}

function updateLS() {
    //console.log(listOfEntries.innerHTML)
    const alltheHtml = listOfEntries.innerHTML
    localStorage.setItem("listOfEntriesSave", JSON.stringify(alltheHtml))
    localStorage.setItem("arrOfEntiresSave", JSON.stringify(entries))
    //console.log(localStorage.getItem("arrOfEntires"))
}


function checkanddelete() {
    if (delBar.value === "DeLeTe"){
        delBar.value = "Done, all gone"
        //console.log("confirmation of delete")
        localStorage.clear
        localStorage.removeItem("listOfEntriesSave")
        localStorage.removeItem("arrOfEntiresSave")
    }
    //console.log(delBar.value)
}