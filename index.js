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
var bgColorArr = ["#eoece4", "#1d2d50", "#7d0633","#1a1a2e", "#557571", "#303030","#1b262c", "#fdcb9e", "#221f3b","#7d5a5a", "#202040", "#204051","#000000"];
var textColorArr= ["#ff4b5c", "#133b5c", "#31112c","#16213e", "#d49a89", "#8fc0a9","#0f4c75", "#f7d6bf", "#6f4a8e","#f1d1d1", "#543864", "#3b6978","#323232"];
var extraColorArr = ["#056674", "#1e5f74", "#f2a07b","#0f3460", "#f7f1ba", "#c8d5b9","#00b7c2", "#318fb5", "#6f4a8e","#f3e1e1", "#ff6363", "#84a9ac","#ff1e56"];
var ssecondColorArr = ["#66bfbf", "#fcdab7", "#fbdcc4","#e94560", "#f4f4f4", "#faf3dd","#fdcb9e", "#005086", "#ebebeb","#faf2f2", "#ffbd69", "#cae8d5","#ffac41"];

var randNum =Math.floor(Math.random() * Math.floor(bgColorArr.length));

document.documentElement.style.setProperty("--main-text-color", textColorArr[randNum]);
document.documentElement.style.setProperty("--main-bg-color", bgColorArr[randNum]);
document.documentElement.style.setProperty("--main-extra-color", extraColorArr[randNum]);
document.documentElement.style.setProperty("--main-second-color", ssecondColorArr[randNum]);
//getComputedStyle(document.documentElement).getPropertyValue("--main-bg-color");

console.log(dateToPut);
if (listOfEntriesFromSave && arrOfEntries){
    listOfEntries.innerHTML = listOfEntriesFromSave;
    //console.log(localStorage.getItem("arrOfEntiresSave"));
    
    entries = arrOfEntries;
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