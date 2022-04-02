class UIComponent extends Component {
    constructor(options) {
        super(options);
        this.num = 0;
    }

    _addEventListeners() {
        document.getElementById('addFunction').addEventListener('click', () => this.addFunction());
    }


    addFunction() {
        let button = document.createElement('button');
        button.setAttribute('id', 'delete')
        button.innerHTML = 'Delete';
        button.addEventListener('click', () => {
            this.callbacks.delFunction(input.dataset.num);
            div.removeChild(input);
            div.removeChild(button);
            div.removeChild(width);
            div.removeChild(color);
            div.removeChild(startLine);
            div.removeChild(endLine);
            div.removeChild(checkbox);
        });

        let startLine = document.createElement('input');
        startLine.setAttribute('placeholder', 'Start line');
        startLine.setAttribute('class', 'params');
        startLine.setAttribute('id', 'startLine' + this.num)
        startLine.dataset.num = this.num;
        startLine.addEventListener('keyup', () => this.getValue(startLine))

        let endLine = document.createElement('input');
        endLine.setAttribute('placeholder', 'End line');
        endLine.setAttribute('class', 'params');
        endLine.setAttribute('id', 'endLine'+ this.num)
        endLine.dataset.num = this.num;
        endLine.addEventListener('keyup', () => this.getValue(endLine))

        let width = document.createElement('input');
        width.setAttribute('placeholder', 'width');
        width.setAttribute('id', 'width' + this.num);
        width.setAttribute('class', 'params');
        width.dataset.num = this.num;
        width.addEventListener('keyup', () => this.getValue(width));

        let color = document.createElement('input');
        color.setAttribute('placeholder', 'color');
        color.setAttribute('id', 'color' + this.num);
        color.setAttribute('class', 'params');
        color.dataset.num = this.num;
        color.addEventListener('keyup', () => this.getValue(color));

        let input = document.createElement('input');
        input.setAttribute('placeholder', `function №${this.num}`);
        input.setAttribute('id', 'inp' + this.num);
        input.setAttribute('class', 'params');
        input.dataset.num = this.num;
        input.addEventListener('keyup', () => this.keyup(input));
        
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'checkbox' + this.num);
        checkbox.dataset.num = this.num;
        checkbox.addEventListener('click', () => {
            if(checkbox.hasAttribute('cheked')) {
                checkbox.removeAttribute('cheked');
            }else checkbox.setAttribute('cheked', '');
            this.getValue(checkbox);
        });
        

        let div = document.createElement('div');

        let funcsInputs = document.getElementById('funcsInputs');
        funcsInputs.appendChild(div);
        div.appendChild(input);
        div.appendChild(width);
        div.appendChild(color);
        div.appendChild(startLine);
        div.appendChild(endLine);
        div.appendChild(button);
        div.appendChild(checkbox);

        this.num++;
    };

    keyup (elem) {
        try{
            let f;
            eval(`f = function (x) {return ${elem.value};}`);
            
            let width = document.getElementById(`width${elem.dataset.num}`);
            let color = document.getElementById(`color${elem.dataset.num}`);

            let startLine = document.getElementById(`startLine${elem.dataset.num}`);
            let endLine = document.getElementById(`endLine${elem.dataset.num}`);

            let check = document.getElementById(`checkbox${elem.dataset.num}`);
            const flag = (check.hasAttribute('cheked'));
            
            this.callbacks.addFunction(f, elem.dataset.num, width.value, color.value, startLine.value, endLine.value, flag);
        } catch (e) {
            console.log(e);
        }
    }

    getValue (elem) {
        try{
            let f;
            eval(`f = function (x) {return ${graph.value};}`);

            let check = document.getElementById(`checkbox${elem.dataset.num}`);
            const flag = (check.hasAttribute('cheked'));

            let graph = document.getElementById(`inp${elem.dataset.num}`);
            let width = document.getElementById(`width${elem.dataset.num}`);
            let color = document.getElementById(`color${elem.dataset.num}`);

            let startLine = document.getElementById(`startLine${elem.dataset.num}`);
            let endLine = document.getElementById(`endLine${elem.dataset.num}`);

            this.callbacks.addFunction(f, elem.dataset.num, width.value, color.value, startLine.value, endLine.value, flag);
        } catch (e) {
            console.log(e);
        }
    }
}
// function sin(x) {
//     return Math.sin(x);
// }

// function cos(x) {
//     return Math.cos(x);
// }

// function tg(x) {
//     return Math.tan(x);
// }

// function ctg(x) {
//     return 1 / Math.tan(x);
// }

// function UI(options) {
//     var num = 0;
//     document.getElementById('addFunction').addEventListener('click', addFunction);

//     function addFunction() {
//         var input = document.createElement('input');
//         input.setAttribute('placeholder', `function№${num}`);
//         input.dataset.num = num;
//         input.setAttribute('id', 'input' + num);
//         input.addEventListener('keyup', keyup);

//         var button = document.createElement('button');
//         button.innerHTML = 'Удалить';
//         button.setAttribute('id', 'button' + num);
//         button.addEventListener('click', function() {
//             options.callbacks.delFunction(input.dataset.num);
//             funcInputs.removeChild(input);
//             funcInputs.removeChild(checkbox);
//             funcInputs.removeChild(button);
//             funcInputs.removeChild(a);
//             funcInputs.removeChild(b);
//             funcInputs.removeChild(width);
//             funcInputs.removeChild(color);
//         });

//         var a = document.createElement('input');
//         a.setAttribute('placeholder', 'a =');
//         a.dataset.num = num;
//         a.setAttribute('id', 'a' + num);
//         a.addEventListener('keyup', clickAInput);

//         var b = document.createElement('input');
//         b.setAttribute('placeholder', 'b =');
//         b.dataset.num = num;
//         b.setAttribute('id', 'b' + num);
//         b.addEventListener('keyup', clickBInput);

//         var width = document.createElement('input');
//         width.setAttribute('placeholder', 'width');
//         width.dataset.num = num;
//         width.setAttribute('id', 'width' + num);
//         width.addEventListener('keyup', clickWidthInput);

//         var color = document.createElement('input');
//         color.setAttribute('placeholder', 'color');
//         color.dataset.num = num;
//         color.setAttribute('id', 'color' + num);
//         color.addEventListener('keyup', clickColorInput);

//         const checkbox = document.createElement('input');
//         checkbox.setAttribute('type', 'checkbox');
//         checkbox.dataset.num = num;
//         checkbox.addEventListener('click', clickCheckbox);

//         var funcInputs = document.getElementById('funcInputs');
//         funcInputs.appendChild(input);
//         funcInputs.appendChild(checkbox);
//         funcInputs.appendChild(button);
//         funcInputs.appendChild(a);
//         funcInputs.appendChild(b);
//         funcInputs.appendChild(width);
//         funcInputs.appendChild(color);
//         num++;
//     };

//     function keyup() {
//         try {
//             var f;
//             eval(`f = function(x){return ${this.value};}`);
//             options.callbacks.addFunction(f, this.dataset.num);
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     function clickCheckbox() {
//         options.callbacks.setDerivative(
//             this.checked,
//             this.dataset.num
//         );
//     }

//     function clickAInput() {
//         options.callbacks.setA(this.value - 0, this.dataset.num);
//     }

//     function clickBInput() {
//         options.callbacks.setB(this.value - 0, this.dataset.num);
//     }

//     function clickWidthInput() {
//         options.callbacks.setWidth(this.value - 0, this.dataset.num);
//     }

//     function clickColorInput() {
//         options.callbacks.setColor(this.value, this.dataset.num);
//     }
// }