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

	toString(){
		return this.poly.map(
			(el, i) => (el.value > 0) ?
			`${(i == 0) ? '' : '+'}${el.toString()}` :
			el.toString()
		).join(' ');
	}

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