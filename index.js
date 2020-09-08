const bar = document.querySelector("input");
const listOfEntries = document.querySelector(".list-of-things")
const subBtn = document.querySelector(".sub-btn");
const maxCharLength = 40;
var entries = [];



bar.addEventListener("keyup", (e) => {
    if (e.key === "Enter"){
        submit_btn_func();
    }
})


subBtn.addEventListener("click", () => {
    submit_btn_func();
})

function submit_btn_func() {
    if (bar.value.length < maxCharLength){
        let text = bar.value;
        entries.push(text)
        bar.value = "";
        listOfEntries.innerHTML += `<div class="list-of-things">
        <div class="list-item">
            <p class="list-item-text">${text}</p>
            <button class="list-item-button">Delete</button>
    </div>`
    
        console.log(entries);
    } else{
        
    }
}