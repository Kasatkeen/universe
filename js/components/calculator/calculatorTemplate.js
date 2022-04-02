Template.prototype.calculatorTemplate = () => `
        <div class="calcInputs">
            <div class="getValueInputs">
                <textarea placeholder="0" id="numA" class="number"></textarea>
                <textarea placeholder="0" id="numB" class="number"></textarea>
            </div>

            <div class="results">
                <textarea placeholder="result" id="resultNumber" class="number" style="width: 500px" disabled></textarea>
            </div>
        </div>
        <div>
            <button class="operation" data-operand="add" > Add </button>
            <button class="operation" data-operand="sub" > Sub </button>
            <button class="operation" data-operand="mult" > Mult </button>
        </div>
        <div>
            <button class="operationINV" data-operand="inv" > Inv </button>
            <button class="operation" data-operand="div" > Div </button>
            <button class="operation" data-operand="prod" > Prod </button>
        </div>
        <div>
            <button class="operation" data-operand="zero" > Zero </button>
            <button class="operation" data-operand="one" > One </button>
            <button class="operation" data-operand="pow" > Pow </button>
        </div>       
`;