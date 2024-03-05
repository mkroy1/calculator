class Calculator{
    constructor(previousOpearandTextElement,currentOpearandTextElement){
        this.previousOpearandTextElement=previousOpearandTextElement;
        this.currentOpearandTextElement=currentOpearandTextElement;
        this.clear()
    }

    clear(){
        this.currentOpearand='';
        this.previousOpearand='';
        this.operation=undefined;
    }

    delete(){
        this.currentOpearand=this.currentOpearand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOpearand.includes('.')) return
        this.currentOpearand=this.currentOpearand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOpearand === '') return
        if (this.previousOpearand !== ''){
            this.compute();
        }

       this.operation=operation
       this.previousOpearand=this.currentOpearand
       this.currentOpearand='' 
    }
    compute(){
        let computation;
        const prev=parseFloat(this.previousOpearand)
        const current=parseFloat(this.currentOpearand)
        if (isNaN(prev) || isNaN(current)) return

        switch(this.operation){
           case '+':
            computation = prev + current
            break;
            case '-':
            computation = prev - current
            break;
            case 'x':
            computation = prev * current
            break;
            case '/':
            computation = prev / current
            break;
            default:
                return
        }
        this.currentOpearand=computation
        this.operation=undefined
        this.previousOpearand=''

    }
    getDisplayNumber(number){
          return number
    }

    updateDisplay(){
        // this.currentOpearandTextElement.innerText=this.currentOpearand
        // this.previousOpearandTextElement.innerText=this.previousOpearand
        this.currentOpearandTextElement.innerText=this.getDisplayNumber(this.currentOpearand)
        if(this.operation!=null){
            this.previousOpearandTextElement.innerText=
              `${this.getDisplayNumber(this.previousOpearand)} ${this.operation}`
        } else {
            this.previousOpearandTextElement.innerText = ''
        }

    }
}

const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')

const equalsButton=document.querySelector('[data-equals]')
const deleteButton=document.querySelector('[data-delete]')
const allClearButton=document.querySelector('[data-all-clear]')

const previousOpearandTextElement=document.querySelector('[data-previous-operand]')
const currentOpearandTextElement=document.querySelector('[data-current-operand]')




const calculator = new  Calculator(previousOpearandTextElement,currentOpearandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click',button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',button => {
    calculator.delete()
    calculator.updateDisplay()
})