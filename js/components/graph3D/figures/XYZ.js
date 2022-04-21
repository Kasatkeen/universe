Figure.prototype.XYZ = () => {
    const points = [
        new Point(0, 0, 0), //O
        new Point(10, 0, 0), // X
        new Point(0, 10, 0), // Y 
        new Point(0, 0, 10), // Z
    ];
	const edges = [
		new Edge(0, 1),
		new Edge(0, 2),
		new Edge(0, 3),
	];
	const polygons = [];
    const center = new Point(0, 0, 0);
    const animation = [{
		method: 'rotateOy',
		value: Math.PI / 1800, 
		//Значение свва метод должно совпадать с названием метода из graph3D
	}];

	return new Subject(points, edges, polygons, center, animation);
}