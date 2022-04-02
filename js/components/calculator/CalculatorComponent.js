class CalculatorComponent extends Component { 
    constructor(options) {
        super(options);
        this.calculator = new Calculator();
    }

    _addEventListeners() {
        const buttons = document.querySelectorAll('.operation');
        buttons.forEach(button => {
            button.addEventListener(
                'click', 
                () => this.calculate(button.dataset.operand)
            );
        });
    }

    calculate(operand) {
        const numA = document.getElementById('numA');
        const numB = document.getElementById('numB');
        const numResult = document.getElementById('resultNumber');

        let a = this.calculator.toValue(numA.value);
        let b = this.calculator.toValue(numB.value);
        console.log('a =',a.toString());
        console.log('b =', b.toString());
        if (a && b) {
            let c;
            if (operand == 'zero' || operand == 'one') {
                c = this.calculator[operand](null, a);
            } else {
                c = this.calculator[operand](a, b);
            }
            numResult.value = c.toString();
            console.log('res',c.toString());
            // рисуем на графике
            // if (c instanceof Polynomial) {
            //     this.callbacks.printPolynomial(c.toMath());
            // }
        }
    }
}