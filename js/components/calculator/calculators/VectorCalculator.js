class VectorCalculator extends RealCalculator {
    add(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((elem, i) => calc.add(elem, b.values[i])));
    }

    // add(a, b) {
    //     return new Vector(a.values.map((elem, i) => elem + b.values[i]))
    // }

    sub(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map((elem, i) => calc.sub(elem, b.values[i])));
    }

    mult(a, b) {
        const calc = this.get(a.values[0]);
        return new Vector([
            calc.sub(
                calc.mult(a.values[1], b.values[2]), 
                calc.mult(a.values[2], b.values[1])
            ),
            calc.sub(
                calc.mult(a.values[2], b.values[0]), 
                calc.mult(a.values[0], b.values[2])
            ),
            calc.sub(
                calc.mult(a.values[0], b.values[1]), 
                calc.mult(a.values[1], b.values[0])
            )
        ]);
    }

    prod(a, p) {
        const calc = this.get(a.values[0]);
        return new Vector(a.values.map(elem => calc.mult(elem, p)));
    }
    
    div() {
        return null;
    }
    
    zero(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.type(calc, elem, 'zero'));
        }
        return new Vector(values);
    }

    one(length, elem) {
        const calc = this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(this.type(calc, elem, 'one'));
        }
        return new Vector(values);
    }

    pow(a, n) {
        let c = this.one(a.values.length, a.values[0]);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

}