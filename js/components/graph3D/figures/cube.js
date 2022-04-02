Figure.prototype.cube = () => {
	const points=[
        new Point(0, 0, 0),
        new Point(0, 0, 20),
        new Point(20, 0, 20),
        new Point(20, 0, 0),
        new Point(0, 20, 0),
        new Point(0, 20, 20),
        new Point(20, 20, 0),
        new Point(20, 20, 20),
    ];
	const edges=[
		new Edge(0, 1),
		new Edge(0, 3),
		new Edge(0, 4),
		new Edge(5, 1),
		new Edge(5, 4),
		new Edge(5, 6),
		new Edge(2, 3),
		new Edge(2, 6),
		new Edge(2, 1),
		new Edge(7, 3),
		new Edge(7, 6),
		new Edge(7, 4),
	];
    const animation = [{
		method: 'rotateOy',
		value: Math.PI / 1800, 
		//Значение свва метод должно совпадать с названием метода из graph3D
	}];
	return new Subject(points, edges, animation);
};
