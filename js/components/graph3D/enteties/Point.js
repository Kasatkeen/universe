class Point {
    constructor(x = 0, y = 0, z = 0){
        this.x = x,
        this.y = y,
        this.z = z
    }

    add(x, y, z) {
        return new Point(this.x + x, this.y + y, this.z + z);
    }
}