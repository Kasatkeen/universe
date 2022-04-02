class Graph3D {
    constructor({ WIN, id, width, height, callbacks }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height
        this.context = this.canvas.getContext(`2d`);
        // this.canvas.addEventListener('wheel', callbacks.wheel);
        this.canvas.addEventListener('mousemove', callbacks.mouseMove);
        // this.canvas.addEventListener('mouseup', callbacks.mouseUp);
        this.canvas.addEventListener('mousedown', callbacks.mouseDown);
        // this.canvas.addEventListener('mouseleave', callbacks.mouseLeave);
    }
    mousedown(event){ //Эти события должны быть в колбэках класса канвас (моус...)
		this.dx = event.offsetX;
		this.dy = event.offsetY;
	}
	mousemove(event){
		const gradus = Math.PI/180;
		this.figure.points.forEach(point => {
			this.graph3D.rotateOy((this.dy - event.offsetY)*gradus, point);
			this.graph3D.rotateOx((this.dx - event.offsetX)*gradus, point);
		});
		this.dx = event.offsetX;
		this.dy = event.offsetY;
		this.render();
	}

    xs(point){
        return point.x*(this.WIN.CAMERA.Z - this.WIN.DISPLAY.Z) / (this.WIN.CAMERA.Z - point.Z);
    }
    ys(point){
        return point.y*(this.WIN.CAMERA.Z - this.WIN.DISPLAY.Z) / (this.WIN.CAMERA.Z - point.Z);
    }

    line(x1, y1, x2, y2, color, width, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color || 'rgb(256, 0, 0)';
        this.context.lineWidth = width || 2;
        if (isDash) {
            this.context.setLineDash([7, 5]);
        } else {
            this.context.setLineDash([]);
        }
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    arc(x1, y1, r, color) {
        this.context.beginPath();
        this.context.strokeStyle = color || 'black';
        this.context.fillStyle = color || 'black';
        this.context.arc(this.xs(x1), this.ys(y1), r, 0, Math.PI * 2, true);
        this.context.stroke();
        this.context.fill();
    }

    drawText(x, y, text, textSize, marginUp = 0, marginRight = 0, color, addStroke = false) {
		this.drawTextPx(this.xs(x), this.ys(y), text, textSize, marginUp, marginRight, color, addStroke);
	};

    drawTextPx(x, y, text, textSize, marginUp = 0, marginRight = 0, color, addStroke) {
		this.context.fillStyle = color || "black";
        this.context.strokeStyle = "black";
		this.context.lineWidth = 0.5;
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
		this.context.font = (textSize || 12) + "px Consolas";
		this.context.fillText(text, x + marginRight, y - marginUp);

		if (addStroke) {
			this.context.strokeText(text, x + marginRight, y - marginUp);
		}
	};

    drawPoint(x, y, color, radius){
        let pointRadius = radius || 2;
        this.context.beginPath();
        this.context.fillStyle = color || "black";
        this.context.arc(this.xs(x), this.ys(y), pointRadius, 0, 2 * Math.PI);
    }

    multMatrix(T, m){} //T = [[],[],[],[]] m = [x, y, z, 1] возвращяет массив из 4-х эл.

    zoom(delta, point){
        const array = this.multMatrix([
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];    
    }

    rotateOx(alpha, point){
        return new Matrix([[1, 0, 0, 0],
            [0, cos(alpha), 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]])
    }
    rotateOy(alpha, point){
        [[delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0], //ДОписать
            [0, 0, 0, 1]]
    }
    rotateOz(alpha, point){
        [[cos(alpha), sin(alpha), 0, 0],
            [-sin(alpha), cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]]
    }

    calcDistance(figure, endPoint, name){//в классе фигура в классе сабжект добавить поле полигонс(массив)
        figure.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let i = 0; i < points.length; i++){
                x += figure.points[points[i]].x;
                y += figure.points[points[i]].x;
                z += figure.points[points[i]].x;
            }
            x /= points.length;
            y /= points.length;
            z /= points.length;
            polygon.distance = Math.sqrt(
                Math.pow(this.WIN.CAMERA.x - x, 2) + 
                Math.pow(this.WIN.CAMERA.y - y, 2) +
                Math.pow(this.WIN.CAMERA.z - z, 2));
        });
        figure.polygons[i][name] = Math.sqrt(
            Math.pow(endPoint.x - x, 2) +
            Math.pow(endPoint.y - y, 2) +
            Math.pow(endPoint.z - z, 2)
        );
    }

    calcIllumination(distance, lumen){
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return res > 1 ? 1 : res;
    }
    
    sortByArtist(figure){
        figure.polygons.sort((a, b) => (a.distance - b.distance))
    }

    clear(color) {
        this.context.fillStyle = color || '#000fff' ;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}