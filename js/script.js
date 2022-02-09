let calculatorField = document.querySelector('.calculatorField');
let screen = document.querySelector('.screen');
let secondScreen = document.querySelector('.secondScreen');
let str, a, b, operations = '';

calculatorField.addEventListener('click', event => {
	if(event.target.closest('button')) {
		switch(event.target.id) {
			case "c": 
				screen.value = secondScreen.value = str = a = b = operations = '';
				break;
			case "x":
				if(screen.value === "Error") {
					break;
				}
				str = screen.value;
				screen.value = str.slice(0, -1);
				break;
			case "/":
			case "*":
			case "-":
			case "+":
				if(screen.value === "Error") {
					break;
				}
				screen.value = setOperation(screen.value, event.target.id);
				break;
			case "=":
				if(screen.value === "Error" || a === "") {
					break;
				}
				b = setResult(screen.value);
				if(String(b).length >= 10 && b !== "Error") {
					b = b.toExponential(9);
				}
				screen.value = b;
				secondScreen.value = str = a = b = operations = '';
				break;
			default:
				if(screen.value.length < 10) {
					screen.value === "Нельзя делить на ноль" ? screen.value = event.target.id : 
						screen.value += event.target.id;
				}
				break;
		}
	}
})

function setOperation(firstVariable, operation) {
	if(operations === ""){
		a = +firstVariable;
		if(String(a).length >= 10 && a !== "Error") {
			a = a.toExponential(9);
		}
		secondScreen.value = a;
	}
	else if (screen.value.length > 1) {
		a = setResult(screen.value);
		if(String(a).length >= 10 && a !== "Error") {
			a = a.toExponential(9);
		}
		secondScreen.value = a;
	}
	operations = `${operation}`;
	return operations;
}

function setResult(secondVariable) {
	secondScreen.value = '';
	str = secondVariable;
	b = +str.slice(1);
	return a === "Error" && operations === "/" && b === 0 ? a : 
		a === "Error" ? b : 
		operations === "/" && b === 0 ? "Error" : 
		eval(`${a} ${operations} ${b}`);
}