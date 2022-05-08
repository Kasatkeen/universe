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
                mouseDown: (event) => this.mouseDown(event),
                mouseLeave: () => this.mouseLeave()
            }
        });
        
        this.graph3D = new Graph3D({
            WIN: this.WIN
        });
        
        this.canRotate = false;
        this.dx = 0;
        this.dy = 0;
        this.LIGHT = new Light(-25 , 25, -25, 35000);
        this.figures = [];
        
        this.addFigures();
        this.render();
        
        setInterval(() => {
            this.rotateLight(0.01, this.LIGHT);
            this.render();
            this.goAnimation();
        }, 10);
    }
    
    addFigures(){
        this.figures.push((new Figure()).cube(0, 0, 0, 20));
        // this.figures.push((new Figure()).XYZ());
        this.figures.push((new Figure()).sphere(10, 10, -10));
        // this.figures.push((new Figure()).cone());
        this.figures.forEach(figure => {console.log(figure.name, figure)})
    }

    rotateLight(alpha, point){
        this.graph3D.rotateOx(alpha, point);
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
                const gradus = Math.PI/540;
                this.figures.forEach((figure) => {
                    figure.points.forEach(point => {
                    this.graph3D.rotateOx((this.dx - event.offsetX)*gradus, point);
                    this.graph3D.rotateOy((this.dy - event.offsetY)*gradus, point);
                    // this.graph3D.rotateOz((this.dy - event.offsetY)*gradus, point);
                    });
                    this.graph3D.rotateOx((this.dx - event.offsetX)*gradus, figure.center);
                    this.graph3D.rotateOy((this.dy - event.offsetY)*gradus, figure.center);
                });
                this.dx = event.offsetX;
                this.dy = event.offsetY;
                this.render();
            };
	}

    wheel(event){
        const delta = (event.wheelDelta > 0) ? 0.95 : 1.05;
        this.figures.forEach((figure) => {
            figure.points.forEach(point =>
                this.graph3D.zoom(delta, point));
            this.graph3D.zoom(delta, figure.center);
            this.render();
        });
    }

    renderEdges(figure){
        figure.edges.forEach(edge => {
            const point1 = figure.points[edge.p1];
            const point2 = figure.points[edge.p2];
            this.canvas3d.line(
                this.graph3D.xs(point1),
                this.graph3D.ys(point1),
                this.graph3D.xs(point2),
                this.graph3D.ys(point2),
                'grey',
                0.5,
                1,
                );            
            });
        }
        
    renderDots(figure){
        let i = 0;
        figure.points.forEach(point => {
            this.canvas3d.dot(this.graph3D.xs(point), this.graph3D.ys(point), 1, "red");
            this.canvas3d.text(i, this.graph3D.xs(point), this.graph3D.ys(point) + 0.2, "red", "0px helvetica");
            i++;
        });
    }

    goAnimation(){
        this.figures.forEach(figure => {
            figure.animation.forEach(anim => {
                const center = anim.center || figure.center;
                this.graph3D.moveFigure(-center.x, -center.y, -center.z, figure);//В центр, дописать
                figure.points.forEach(point => {
                    this.graph3D[anim.method](anim.value, point);
                });
                this.graph3D.moveFigure(center.x, center.y, center.z, figure);//Обратно в центр фигуры
            });
        });
    }

    render(){
        this.canvas3d.clear('rgb(00, 00, 00)');
        this.figures.forEach((figure) => {
            // отрисовка полигонов
            this.graph3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
            this.graph3D.calcDistance(figure, this.LIGHT, 'lumen');
            this.graph3D.sortByArtist(figure);
            
            figure.polygons.forEach(polygon => {
                const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                const points = polygon.points.map(point => {
                    return {
                        x:this.graph3D.xs(figure.points[point]),
                        y:this.graph3D.ys(figure.points[point])
                    }});
                let{r, g, b} = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.canvas3d.polygon(points, polygon.rgbToHex(r, g, b));
            });	
            // отрисовка ребер
            this.renderEdges(figure);
            // отрисовка точек
            this.renderDots(figure);
        });
    }
}