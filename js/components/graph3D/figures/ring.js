Figure.prototype.ring = (R = 10, count = 10) => {
    const points = [];

    for (let i = 0; i < count; i++) {
        for (let t = 0; t < 2 * Math.PI; t += 0.1) {
            points.push(new Point(R * Math.cos(t), R * Math.sin(t), 0))
        }
        R++
    }
    return new Subject(points)
}