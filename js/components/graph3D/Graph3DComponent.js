class Graph3DComponent extends Component{
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, -50),
            DISPLAY: new Point(0, 0, -30),
        }

        this.canvas3d = new Canvas({
            WIN: this.WIN,
            id: 'canvas3D',
            width: 600,
            height: 600,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseMove: (event) => this.mouseMove(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown(),
                mouseLeave: () => this.mouseLeave()
            }
        });
        this.graph3D = new Graph3D({
            WIN: this.WIN
        });

        this.canRotate = false;
        this.dx = 0;
        this.dy = 0;
        this.LIGHT = new Light(-40 , 2, 0, 25000);
        this.figure = (new Figure()).cube();
        this.render();
    }

    mouseLeave(){
        this.canRotate = false;
    }

    mouseUp(){
        this.canRotate = false;
    }

    mouseDown(event){ //Эти события должны быть в колбэках класса канвас (моус...)
		this.dx = event.offsetX;
        this.dy = event.offsetY;
        this.canRotate = true;
	}

    mouseMove(event){
        if (this.canRotate){
            const gradus = Math.PI/180;
            this.figure.points.forEach(point => {
                this.graph3D.rotateOx((this.dx - event.offsetX)*gradus, point);
                this.graph3D.rotateOy((this.dy - event.offsetY)*gradus, point);
                // this.graph3D.rotateOz((this.dy - event.offsetY)*gradus, point);
            });
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.render();
        }
	}

    wheel(event){
        const delta = (event.wheelDelta > 0) ? 0.95 : 1.05;
        this.figure.points.forEach(point =>
            this.graph3D.zoom(delta, point));
        this.render();
    }

    render(){
        this.canvas3d.clear('rgb(200, 200, 200)');
        const figure = this.figure;
        // отрисовка полигонов
        // this.graph3D.calcDistance(this.figure, this.WIN.CAMERA, 'distance');
        // this.graph3D.calcDistance(this.figure, this.LIGHT, 'lumen');
        // this.graph3D.sortByArtist(this.figure);
        // this.figure.polygons.forEach(polygon => {
        //     const points = polygon.points.map(point => {
        //         return {
        //             x:this.graph3D.xs(this.figure.points[point]),
        //             y:this.graph3D.ys(this.figure.points[point])
        //         }});
        //     const lumen = this.graph3D.calcIllumination(polygon.lumen,
        //             this.LIGHT, lumen);
        //     let{r, g, b} = polygon.color;
        //     r = Math.round(r * lumen);
        //     g = Math.round(g * lumen);
        //     b = Math.round(b * lumen);
        //     this.canvas.polygon(points, polygon.rgbToHex(r, g, b));
        // });	
        //...
        // отрисовка ребер
        figure.edges.forEach(edge => {
            const point1 = figure.points[edge.p1];
            const point2 = figure.points[edge.p2];
            this.canvas3d.line(
                this.graph3D.xs(point1),
                this.graph3D.ys(point1),
                this.graph3D.xs(point2),
                this.graph3D.ys(point2),
            );            
        });
        // отрисовка точек
        figure.points.forEach(point => {
            this.canvas3d.dot(this.graph3D.xs(point), this.graph3D.ys(point), 3, "black");
        });
    }
}