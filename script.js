const billInput = document.querySelector("#total-bill-input");
const customTip = document.querySelector("#custom-tip-input");
const peopleInput = document.querySelector("#people-input");

const tipButtons = document.querySelectorAll(".tip-button");

const resultTip = document.querySelector("#result-tip-amount");
const resultTotal = document.querySelector("#result-total-amount")

const resetButton = document.querySelector(".reset-button");

//can't enter letters to the inputs +
//selected tip button should stay focused untill clicked on custom input or reset button + 
//number of people can not be less than 0 +

let bill = 0;
let people = 0;
let selectTip = 0;

let tip = 0;
let total = 0;

/*tip button*/

tipButtons.forEach((n,index) => n.addEventListener("click", ()=>{
    n.classList.add("active");
    selectTip = Number(n.dataset.tip);
    for(j of tipButtons){
        if(j == tipButtons[index]){
            continue;
        }
        else{
            j.classList.remove("active");
        }
    }
    console.log(`selected tip ${selectTip}%`);
    calculateTip(bill, people, selectTip)
}))

/*custom tip input reset, reset button reset (for tip buttons' active state ) */

customTip.addEventListener("click", () => {
    tipButtons.forEach(n => {
        n.classList.remove("active");
    })
})

resetButton.addEventListener("click", () =>{
    tipButtons.forEach(n => {
        n.classList.remove("active");
    })
    bill = 0;
    people = 0;
    selectTip = 0;
    tip = 0;
    total = 0;

    billInput.value = "";
    customTip.value = "";
    peopleInput.value = "";

    resultTip.textContent = "$0.00";
    resultTotal.textContent = "$0.00";
})


/*blocking letter entry*/

billInput.addEventListener("keypress", e => validate(e));
customTip.addEventListener("keypress", e => validate(e));
peopleInput.addEventListener("keypress", e => validate(e));

function validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }

/*calculating part */

billInput.addEventListener("change", () => {
    bill = Number(billInput.value);
    /*
    if(people == 0 && selectTip == 0){
        bill == 0 ? resultTotal.textContent = "$0.00" :resultTotal.textContent = `$${bill}`;
    }
    console.log(bill);*/
    calculateTip(bill, people, selectTip);
})

customTip.addEventListener("change", () => {
    selectTip = Number(customTip.value);
    calculateTip(bill, people, selectTip);
})

peopleInput.addEventListener("change", () => {
    people = Number(peopleInput.value);
    calculateTip(bill,people,selectTip);
})



function calculateTip(Bill, People, SelectTip){
    if(Bill == 0){
        return;
    }
    People == 0 ? People = 1 : People = People;
    

    tip = (Bill * (SelectTip/100)) / People;
    total = (Bill / People) + tip;

    tip == 0 ? resultTip.textContent = "$0.00" : resultTip.textContent = `$${tip.toFixed(2)}`;
    total == 0 ? resultTotal.textContent = "$0.00" : resultTotal.textContent = `$${total.toFixed(2)}`;

}

