Figure.prototype.hyperbolicCylinder = (z = 60, y = 7, count = 10) => {
    const edges = [];
    const points = [];
    const polygons = [];
    const center = new Point(0, 0, 0);
    const animation = [{
		method: 'rotateOx',
		value: Math.PI / 1800, 
        center: new Point(center.x, center.y, center.z),
	}];
    const deltaZ = z / count;
    const deltaT = 2 * Math.PI / count;

    //points
    for(let j = -z; j < z; j += deltaZ) {
        for(let i = -(Math.PI); i < Math.PI; i += deltaT) {
            points.push(new Point(
                y * Math.sinh(i),
                j,
                y * Math.cosh(i), 
            ));
        }
    }
    for(let j = -z; j < z; j += deltaZ) {
        for(let i = -(Math.PI); i < Math.PI; i += deltaT) {
            points.push(new Point(
                y * Math.sinh(i),
                j,
                -y * Math.cosh(i), 
            ));
        }
    }

    //edges
    for(let i = 0; i < points.length; i++) {
        if(points[i + 1] && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        }
    }
    for(let j = 0; j < points.length / 2 - count; j++) {
        if(points[j + count * 2]) {
            edges.push(new Edge(j, j + count));
        }
    }
    for(let j = points.length / 2 ; j < points.length; j++) {
        if(points[j + count]) {
            edges.push(new Edge(j, j + count));
        }
    }

    //polygons
    for(let i = 0; i < points.length / 2 - count; i++) {
        if(points[i + count + 1] && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
        }
    }
    for(let i = points.length / 2; i < points.length; i++) {
        if(points[i + count + 1] && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + count + 1, i + count]));
        }
    }

    return new Subject(points, edges, polygons, center, animation, 'hyperbolicCylindre');
}