Figure.prototype.cube = (x = 0, y = 0, z = 0, size = 20) => {
    const points = [
        new Point(x - size/2, y - size/2, z - size/2), // 0
        new Point(x + size/2, y - size/2, z - size/2), // 1
        new Point(x + size/2, y + size/2, z - size/2), // 2
        new Point(x - size/2, y + size/2, z - size/2), // 3
        new Point(x - size/2, y - size/2, z + size/2), // 4
        new Point(x + size/2, y - size/2, z + size/2), // 5
        new Point(x + size/2, y + size/2, z + size/2), // 6
        new Point(x - size/2, y + size/2, z + size/2), // 7
    ];
	const edges = [
		new Edge(0, 1),
		new Edge(0, 3),
		new Edge(0, 4),
		new Edge(2, 3),
		new Edge(2, 6),
		new Edge(2, 1),
		new Edge(5, 1),
		new Edge(5, 4),
		new Edge(5, 6),
		new Edge(7, 6),
		new Edge(7, 4),
		new Edge(7, 3),
	];
	const polygons = [
        new Polygon([0, 1, 2, 3], "#FFFFFF"),
        new Polygon([0, 4, 5, 1], "#FFFFFF"),
        new Polygon([2, 3, 7, 6], "#FFFFFF"),
        new Polygon([1, 2, 6, 5], "#FFFFFF"),
        new Polygon([0, 4, 7, 3], "#FFFFFF"),
        new Polygon([4, 7, 6, 5], "#FFFFFF"),
    ];
    const name = 'Cube';
    const center = new Point(x, y, z);
    const animation = [{
		method: 'rotateOy',
		value: Math.PI / 1800, 
        center: new Point(center.x, center.y, center.z),
		//Значение свва метод должно совпадать с названием метода из graph3D
	}];
	return new Subject(points, edges, polygons, center, animation, name);
};
