class Graph3DComponent extends Component{
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, 50),
            DISPLAY: new Point(0, 0, 30),
        }

        this.canvas3d = new Graph3D({
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

        this.dx = 0;
        this.dy = 0;
        this.LIGHT = new Light(-40 , 2, 0, 25000);
        this.figure = new Figure();
        // this.cube = this.Figure();
        this.render();

        // setInterval(() => {
        //     this.goAnimation();
        //     this.render();
        //     }, 50);
    }

    wheel(event){
        const delta = (event.wheelDelta > 0) ? 0.9 : 1.1;
        this.figure.points.forEach(point =>
            this.graph3D.zoom(delta, point));
        this.render();
    }

    printPoints(cube){
        for(let i = 0; i < this.cube.points.length; ++i)
        {
            const point = cube.points[i];
            this.graph3D.drawText(this.graph3D.xs(point), this.graph3D.ys(point), i, 12, 10, -10, 'black');
            this.graph3D.drawPoint(this.graph3D.xs(point), this.graph3D.ys(point));
        }
    }

    render(){
        this.canvas3d.clear('rgb(0, 0, 256)');
        this.figure.cube().edges.forEach(edge => {
            const point1 = (new Figure).cube().points[edge.p1];
            const point2 = this.figure.cube().points[edge.p2];
            this.canvas3d.line(
                this.canvas3d.xs(point1),
                this.canvas3d.ys(point1),
                this.canvas3d.ys(point2),
                this.canvas3d.ys(point2),
            );
        });
        this.canvas3d.line(0,0,10,10);
        // this.printPoints(this.cube);
        // this.figure.edges.forEach(edge => {
        //     const point1 = this.figure.points[edge.p1];
        //     const point2 = this.figure.points[edge.p2];
        //     this.canvas.line(
        //         this.graph3D.xs(point1),
        //         this.graph3D.ys(point1),
        //         this.graph3D.ys(point2),
        //         this.graph3D.ys(point2),
        //     );
        // });
    }
}