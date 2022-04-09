class Canvas {
    constructor({ WIN, id, width, height, callbacks }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height
        this.context = this.canvas.getContext(`2d`);
        this.canvas.addEventListener('wheel', callbacks.wheel);
        this.canvas.addEventListener('mousemove', callbacks.mouseMove);
        this.canvas.addEventListener('mouseup', callbacks.mouseUp);
        this.canvas.addEventListener('mousedown', callbacks.mouseDown);
        this.canvas.addEventListener('mouseleave', callbacks.mouseLeave);
    }

    xs(x) {
        return this.canvas.width * (x - this.WIN.LEFT) / this.WIN.WIDTH
    }

    ys(y) {
        return this.canvas.height - (this.canvas.height * (y - this.WIN.BOTTOM) / this.WIN.HEIGHT)
    }

    sx(x) {
        return this.WIN.WIDTH * x / this.canvas.width;
    }

    sy(y) {
        return this.WIN.HEIGHT * y / this.canvas.height;
    }

    clear(color = 'white') {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color = 'darkblue', width = 1, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        if (isDash) {
            this.context.setLineDash([7, 5]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    dot(x1, y1, r = 2, color = 'black') {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x1), this.ys(y1), r, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.fill();
    }

    duga(x1, y1, r, start, end) {
        this.context.beginPath();
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 1;
        this.context.arc(this.xs(x1), this.ys(y1), r, start, end, true);
        this.context.stroke();
    }

    text(str, x, y, color) {
        this.context.font = "18px muller";
        this.context.fillStyle = color || 'black';
        this.context.fillText(str, this.xs(x), this.ys(y));
    }

    polygon(points, color = '#ff000050') {
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(points[0].x),
            this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x),
                this.ys(points[i].y));
        }
        this.context.lineTo(this.xs(points[0].x),
            this.ys(points[0].y));
        this.context.closePath();
        this.context.fill();
    }
}