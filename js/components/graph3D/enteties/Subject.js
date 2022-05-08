class Subject {
    constructor(points = [], edges = [], polygons = [], center = new Point, animation = [], name){
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
        this.animation = animation;
        this.name = name;
    }
}