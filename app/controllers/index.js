class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}

	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.'))
			return;
    	this.currentOperand = this.currentOperand.toString() + number.toString()
	}

	chooseOperation(operation) {
		if (this.currentOperand === '')
			return;
		if (this.previousOperand !== '') {
			this.compute()
		}
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}

	compute() {
		let computation
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if (isNaN(prev) || isNaN(current))
			return;
		switch (this.operation) {
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '/':
				computation = prev / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}

	updateDisplay() {
		this.currentOperandTextElement.text = this.getDisplayNumber(this.currentOperand)
		if (this.operation != null) {
			this.previousOperandTextElement.text = this.getDisplayNumber(this.previousOperand) + " " + this.operation
		} else {
			this.previousOperandTextElement.text = ''
		}
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigits = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)) {
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
		}
		if (decimalDigits != null) {
			return integerDisplay + "." + decimalDigits
		} else {
			return integerDisplay
		}
	}
}

const calculator = new Calculator($.label_prev, $.label_curr);

function handlerNumberButtons(e) {
	console.log(e.source.title)
	calculator.appendNumber(e.source.title)
    calculator.updateDisplay()
}

function handlerOperationButtons(e) {
	console.log(e.source.title)
	calculator.chooseOperation(e.source.title)
    calculator.updateDisplay()
}

function handlerEqualButton() {
	calculator.compute()
  	calculator.updateDisplay()
}

function handlerClearButton() {
	calculator.clear()
  	calculator.updateDisplay()
}

function handlerDelButton() {
	calculator.delete()
	calculator.updateDisplay()
}

$.index.open();
