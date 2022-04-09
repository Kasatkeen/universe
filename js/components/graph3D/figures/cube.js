Figure.prototype.cube = () => {
	const points=[
        new Point(-10, -10, 0),
        new Point(-10, -10, 20),
        new Point(10, -10, 20),
        new Point(10, -10, 0),
        new Point(-10, 10, 0),
        new Point(-10, 10, 20),
        new Point(10, 10, 0),
        new Point(10, 10, 20),
    ];
	const edges=[
		new Edge(0, 1),
		new Edge(0, 3),
		new Edge(0, 4),
		new Edge(5, 1),
		new Edge(5, 4),
		new Edge(5, 7),
		new Edge(2, 3),
		new Edge(2, 7),
		new Edge(2, 1),
		new Edge(6, 3),
		new Edge(6, 4),
		new Edge(6, 7),
	];
	
    const animation = [{
		method: 'rotateOy',
		value: Math.PI / 1800, 
		//Значение свва метод должно совпадать с названием метода из graph3D
	}];
	return new Subject(points, edges, animation);
};
