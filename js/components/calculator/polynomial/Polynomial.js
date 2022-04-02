class Polynomial{
	constructor(poly = []){
		this.poly = poly;
		this.poly.sort((a, b) => b.power - a.power);
	}

	getValue(x){
		const calc = new Calculator;
		return this.poly.reduce((S, elem) =>
			calc.add(S, calc.prod(calc.pow(x, elem.power),elem.value)),
			calc.zero(null, x)
		);
	}

	// toString(){
	// 	return this.poly.map(
	// 		(el, i) => (el.value > 0) ?
	// 		`${(i == 0) ? '' : '+'}${el.toString()}` :
	// 		el.toString()
	// 	).join(' ');
	// }
	toStr(key) {
        return this.poly.map(
            (el, i) => el.value > 0 ? 
                `${(i == 0) ? '' : '+'}${el[key]()}` : 
                el[key]()
        ).join('');
    }

    toString() {
        return this.toStr('toString');
    }

    toMath() {
        return this.toStr('toMath');
    }

	// polynomial(members = []){
	// 	return new Polynomial(members);
	// }

	// add(a, b){
	// 	const calc = new Calculator;
	// 	const members = [];
	// 	a.poly.forEach(elemA => {
	// 		const member = b.poly.find(elemB => elemB.power == elemA.power);
	// 		if (member){
	// 			members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
	// 		} else {
	// 			members.push(new Member(elemA.value, elemA.power));
	// 		}
    //     });
	// 	b.poly.forEach(elemB => {
	// 		if (!members.find(el => el.power = elemB.power)){
	// 				members.push(new Member(elemB.value, elemB.power));
	// 			}
    //         return new Polynomial(members);
	// 	})
    // }
        
	// div(a, b){
	// 	const calc = new Calculator;
	// 	const members = [];
	// 	a.poly.forEach(elemA => {
	// 		const member = b.poly.find(elemB => elemB.power == elemA.power);
	// 		if (member){
	// 			members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
	// 		} else {
	// 			members.push(new Member(elemA.value, elemA.power));
	// 		}
    //     });
	// 	b.poly.forEach(elemB => {
	// 		if (!members.find(el => el.power = elemB.power)){
	// 			members.push(new Member(elemB.value, elemB.power));	
    //         }
    //         return new Polynomial(members);
	// 	});	
	// }
	// 	//Дописать
	// sub(a, b){
	// 	const calc = new Calculator;
	// 	const members = [];
	// 	a.poly.forEach(elemA => {
	// 		const member = b.poly.find(elemB => elemB.power == elemA.power);
	// 		if (member){
	// 			members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
	// 		} else {
	// 			members.push(new Member(elemA.value, elemA.power));
	// 		}
    //     });
	// 	b.poly.forEach(elemB => {
	// 		if (!members.find(el => el.power = elemB.power)){
	// 			members.push(new Member(calc.prod(elemB.value, -1), elemB.power));
	// 		}
    //         return new Polynomial(members);
	// 	});	
	// }
	// 	//Дописать
	// mult(a, b){
	// 	const calc = new Calculator;
	// 	let polynomial = new Polynomial;
	// 	a.poly.forEach(elemA => {
	// 		const members = [];
	// 		b.poly.forEach(elemB => {
	// 			members.push(new Member(calc.mult(elemA.value, elemB.value),
	// 			calc.add(elemA.power, elemB.power),))});
	// 		polynomial = this.add((polynomial, new Polynomial(members)));
	// 		return polynomial;
	// 	});
    // }

    // prod(a, b){
	// 	const calc = new Calculator;
	// 	let polynomial = new Polynomial;
	// 	a.poly.forEach(elemA => {
	// 		const members = [];
	// 		b.poly.forEach(elemB => {
	// 			members.push(new Member(calc.mult(elemA.value, elemB.value),
	// 			calc.add(elemA.power, elemB.power),))});
	// 		polynomial = this.add((polynomial, new Polynomial(members)));
	// 		return polynomial;
	// 	});
    // }

	// prod(a, b){
	// 	const calc = new Calculator;
	// 	let polynomial = new Polynomial;
	// 	a.poly.forEach(elemA =>
	// 		const members = [];
	// 		b.poly.forEach(elemB => {
	// 			member.push(new Member(calc.mult(elemA.value, elemB.value),
	// 			calc.add(elemA.power, elemB.power)));
	// 		polynomial = this.add((polynomial, new Polynomial(members));
	// 		return polynomial;)))
	// 	}
	// }
}