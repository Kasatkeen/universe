Figure.prototype.pyramida = (x = 0, y = 0, z = 0, size = 20) => {
    const points = [
        new Point(x - size/2, y - size/2, z - size/2),
        new Point(x - size/2, y - size/2, z + size/2),
        new Point(x + size/2, y - size/2, z - size/2),
        new Point(x + size/2, y - size/2, z + size/2),
        new Point(0, y + size/2, 0),
        // new Point(x - 10, y - 10, z - 10),
        // new Point(x - 10, y - 10, z + 10),
        // new Point(x + 10, y - 10, z - 10),
        // new Point(x + 10, y - 10, z + 10),
        // new Point(0, y + 10, 0),
    ];
    const edges = [
		new Edge(0, 1),
		new Edge(0, 2),
		new Edge(0, 4),
		new Edge(3, 1),
		new Edge(3, 2),
        new Edge(3, 4),
        new Edge(4, 1),
        new Edge(4, 2),
	];
	const polygons = [
        new Polygon([0, 1, 3, 2], "#FFFFFF"),
        new Polygon([0, 1, 4], "#FFFFFF"),
        new Polygon([1, 3, 4], "#FFFFFF"),
        new Polygon([3, 2, 4], "#FFFFFF"),
        new Polygon([2, 0, 4], "#FFFFFF"),
    ];
    const name = 'Pyramid';
    const center = new Point(x, y * (2/3), z);
    const animation = [{
		method: 'rotateOy',
		value: Math.PI / 1800, 
        center: new Point(center.x, center.y, center.z),
	}];
	return new Subject(points, edges, polygons, center, animation, name);
}