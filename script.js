// querySelector utiliza la misma syntaxis que CSS selector.
const numericTable = document.querySelector('.calculator-numeric-table')
const calculatorInput = document.getElementById('calculator-input')
const valueElement = document.getElementById('current-value')
const resultElement = document.getElementById('result')

const input = {
  getValue() {
    return Number(calculatorInput.value)
  },
  setValue(number) {
    calculatorInput.value = Number(number)
  },
  clear() {
    calculatorInput.value = ''
  }
}

const calculator = {
  operationValue: 0,
  lastOperation: null,
  startingNewOperation: false,

  setOperationValue(value) {
    this.operationValue = Number(value)
    valueElement.textContent = this.operationValue

    if (this.startingNewOperation) {
      resultElement.textContent = ''
      this.startingNewOperation = false
    }
  },
  addNumber(event) {
    const newNumber = input.getValue() + event.target.textContent
    input.setValue(newNumber)
  },
  sum() {
    if (!calculatorInput.value) return
    const result = this.operationValue + input.getValue()
    this.setOperationValue(result)
    this.lastOperation = this.sum
    input.clear()
  },
  getResult() {
    if (this.operationValue === 0) return
    if (this.lastOperation) {
      this.lastOperation()
      this.lastOperation = null
    }

    input.clear()
    resultElement.textContent = this.operationValue
    this.setOperationValue(0)
    this.startingNewOperation = true
  }
}

function addClickEventsToNumbers() {
  for (const element of numericTable.children) {
    if (!isNaN(element.textContent)) {
      element.addEventListener('click', calculator.addNumber)
    }
  }
}

function initializeCalculator() {
  addClickEventsToNumbers()
  calculator.setOperationValue(0)
  valueElement.textContent = 0
}

initializeCalculator()
