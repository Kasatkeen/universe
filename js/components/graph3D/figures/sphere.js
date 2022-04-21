Figure.prototype.sphere = (x = 0, y = 0, z = 0, radius = 4, step = 10) => {
    const points = [];
    const edges = [];
    const polygones = [];
    const center = new Point(0, 0, 0);
    const animation = [{
		method: 'rotateOy',
		value: Math.PI / 1800, 
	}];

    function createPointFromSpherical(radius, zenith, azimuth) {
        let x = radius * Math.sin(zenith) * Math.cos(azimuth);
        let y = radius * Math.sin(zenith) * Math.sin(azimuth);
        let z = radius * Math.cos(zenith);
        return new Point(x, y, z);
    }

    function createPoints(x, y, z, radius, step) {
        const zenithStep = Math.PI / step;
        const azimuthStep = 2 * Math.PI / step;
        points.push(createPointFromSpherical(radius, 0, 0).add(x, y, z));
        for (let j = 0; j < step; ++j) {
            let azimuth = azimuthStep * j;
            for (let i = 1; i < step; ++i) {
                let zenith = zenithStep * i;
                const point = createPointFromSpherical(radius, zenith, azimuth).add(x, y, z);
                points.push(point);
            }
        }
        points.push(createPointFromSpherical(radius, Math.PI, 0).add(x, y, z));
    }

    function createUpperCupEdges(step) {
        for (let i = 0; i < step - 1; ++i) {
            edges.push(new Edge(1 + (step - 1) * i, 0));
            edges.push(new Edge(1 + (step - 1) * i, 1 + (step - 1) * (i+1)));
        }
        edges.push(new Edge(0, 1 + (step - 1) * (step - 1)));
        edges.push(new Edge(1, 1 + (step - 1) * (step - 1)));
    }

    function createLowerCupEdges(step) {
        const lastIndex = ((step - 1) * step) + 1;
        for (let i = 1; i < step; ++i) {
            edges.push(new Edge((step - 1) * i, lastIndex));
            edges.push(new Edge((step - 1) * i, (step - 1) * (i+1)));
        }
        edges.push(new Edge(lastIndex - 1, lastIndex));
        edges.push(new Edge(lastIndex - 1, step - 1));
    }

    function createVertEdges(step) {
        for (let j = 0; j < step; ++j) {
            for (let i = 1; i < step - 1; ++i) {
                const a = (step - 1) * j;
                edges.push(new Edge(a + i, a + i + 1));
            }
        }
    }

    function createHorzEdges(step) {
        for (let j = 0; j < step - 2; ++j) {
            for (let i = 0; i < step - 1; ++i) {
                edges.push(new Edge(2 + j + (step-1) * i, 2 + j + (i+1) * (step-1)));
            }
            edges.push(new Edge(2 + j, 2 + j + (step-1) * (step-1)));
        }
    }

    function createEdges(step) {
        createUpperCupEdges(step);
        createLowerCupEdges(step);
        createVertEdges(step);
        createHorzEdges(step);
    }

    function createMainPartPolys(step, quads) {
        for (let i = 0; i < step - 1; ++i) {
            for (let j = 0; j < step - 2; ++j) {
                const index = j + i * (step - 1);
                quads.push([index + 1, index + 2, step + index, step + index + 1]);
            }
        }
    }

    function createVertJointPolys(step, quads) {
        for (let i = 0; i < step - 2; ++i) {
            const index = Math.pow(step - 1, 2);
            quads.push([i + 1, i + 2, i + index + 1, i + index + 2]);
        }
    }

    function createUpperCupPolys(step) {
        for (let i = 0; i < step - 1; ++i) {
            polygones.push(new Polygon([0, 1 + (step - 1) * i, 1 + (step - 1) * (i + 1)]));
        }
        polygones.push(new Polygon([0, 1, Math.pow(step - 1, 2) + 1]));
    }

    function createLowerCupPolys(step) {
        const lastIndex = ((step - 1) * step) + 1;
        for (let i = 0; i < step - 1; ++i) {
            polygones.push(new Polygon([lastIndex, (step - 1) * (i + 1), (step - 1) * (i + 2)]));
        }
        polygones.push(new Polygon([lastIndex, lastIndex - 1, step - 1]));
    }

    function createPolygons(step) {
        const quads = [];
        createMainPartPolys(step, quads);
        createVertJointPolys(step, quads);
        createUpperCupPolys(step);
        createLowerCupPolys(step);

        // convert quads to polygones and add it to list
        quads.forEach((quad) => {
            polygones.push(
                new Polygon([quad[0], quad[1], quad[2]]),
                new Polygon([quad[1], quad[2], quad[3]])
            );
        });
    }

    createPoints(x, y, z, radius, step);
    createEdges(step);
    createPolygons(step);
    return new Subject(points, edges, polygones, center, animation);
}
