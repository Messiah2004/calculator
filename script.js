const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
const allButtons = document.querySelectorAll(".button");

let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach(number => { 
    number.addEventListener("click", (e)=> {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;
    })
});

operationEl.forEach(operation => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            operate();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName)
        lastOperation = operationName;
    })
});

function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    display1El.innerText = dis1Num;
    display2El.innerText = "";
    dis2Num = "";
    tempResultEl.innerText = result;
};

function operate(){
    if (lastOperation === "X" ) {
        result = result * parseFloat(dis2Num);
    } else if (lastOperation === "+") {
        result = result + parseFloat(dis2Num);
    } else if (lastOperation === "-") {
        result = result - parseFloat(dis2Num);
    } else if (lastOperation === "/") {
        result = result / parseFloat(dis2Num);
    } else if (lastOperation === "%") {
        result = result % parseFloat(dis2Num);
    }
}

equalEl.addEventListener("click", () => {
    if (!dis1Num || !dis2Num) return;
    haveDot = false;
    operate();
    clearVar();
    display2El.innerText = result;
    dis2Num = result;
    tempResultEl.innerText = "";
    dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
    display1El.innerText = "0";
    display2El.innerText = "0";
    tempResultEl.innerText = "0";
    dis1Num = "";
    dis2Num = "";
    result = "";
});

clearLastEl.addEventListener("click", () => {
    display2El.innerText = dis2Num.slice(0, ((dis2Num.length) - 1));
    dis2Num = display2El.innerHTML;
    let alreadyHasDot = ""; 
    for (let i = 0; i < dis2Num.length; i++) {
        if (dis2Num[i] === ".") {
            alreadyHasDot = true;
            return;
        }
    }
    if (!alreadyHasDot) {
        haveDot = false;
    }
});

window.addEventListener("keydown", (e) =>  {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "." ||
        e.key === "X" || 
        e.key === "+" || 
        e.key === "/" || 
        e.key === "-" || 
        e.key === "%" ||
        e.key === "=" 
    ) {
        clickButtonElement(e.key);
    } else if (e.key === "*") {
        clickButtonElement("X");
    } else if (e.key === "Enter") {
        clickButtonElement("=");
    } else if (e.key === "Backspace") {
        clickButtonElement("DEL")
    } else if (e.key === "c") {
        clickButtonElement("AC")
    }
});

function clickButtonElement(key){
    allButtons.forEach((div) => {
        if (div.innerText === key) {
            div.click();
        }
    })
};
