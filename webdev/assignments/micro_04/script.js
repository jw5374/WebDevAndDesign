const inputs = document.querySelectorAll("input")
const op = document.querySelector("select")
const submit = document.querySelector(".submit")
const output = document.querySelector("#answer")

submit.addEventListener("click", () => {
    let num1 = parseInt(inputs[0].value)
    let operation = op.options[op.selectedIndex].value
    let num2 = parseInt(inputs[1].value)
    switch(operation) {
        case "add":
            output.textContent = (num1 + num2)
            break
        case "sub":
            output.textContent = (num1 - num2)
            break
        case "mult":
            output.textContent = (num1 * num2)
            break
        case "divide":
            output.textContent = (num1 / num2)
            break
    }
})