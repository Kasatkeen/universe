Figure.prototype.ellipsoid = (x = 10, y = 5, z = 10, count = 20) => {
    const edges = [];
    const points = [];
    const polygons = [];
    const center = new Point(0, 0, 0);
    const animation = [{
		method: 'rotateOx',
		value: Math.PI / 1800, 
        center: new Point(center.x, center.y, center.z),
	}];
    const deltaT = Math.PI / count;
    const deltaF = 2 * Math.PI / count;

    //points
    for (let i = 0; i < Math.PI; i += deltaT) {
        for (let j = 0; j < 2 * Math.PI; j += deltaF) {
            points.push(new Point(
                x * Math.sin(i) * Math.sin(j),
                y * Math.cos(i),
                z * Math.sin(i) * Math.cos(j)
            ));
        }
    }

    //edges
    for (let i = 0; i < points.length; i++) {
        if (points[i + 1]) {
            if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            } else {
                edges.push(new Edge(i, i + 1));
            }
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }
    edges.push(new Edge(points.length - count, points.length - 1));

    //polygons
    for (let i = 0; i < points.length; i++) {
        if (points[i + count + 1]) {
            if ((i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + count, i + 1, i - count + 1]));
            } else
                polygons.push(new Polygon([i, i + count, i + count + 1, i + 1]));
        }
    }
    polygons.push(new Polygon([points.length - 1, points.length - count, points.length - 2 * count, points.length - count - 1]));

    return new Subject(points, edges, polygons, center, animation, "ellipsoid");
}