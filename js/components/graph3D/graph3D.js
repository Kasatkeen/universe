class Graph3D {
    constructor({ WIN }) {
        this.WIN = WIN;
    }

    xs(point){
        return point.x*(this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }
    ys(point){
        return point.y*(this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }

    multMatrix(T, m) {
        const c = [];
        const rows = T.length;
        const cols = m.length;
        for (let i = 0; i < cols; ++i)
        {
            let S = 0;
            for (let j = 0; j < rows; ++j) {
                S += T[i][j] * m[j];
            }
            c.push(S);
        }
        return c;
    } //T = [[],[],[],[]] m = [x, y, z, 1] возвращяет массив из 4-х эл.

    transform(method, value, point){
        this.Graph3D[method](value, point);
    }

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

    movePoint(x, y, z, point){
        const array = this.multMatrix([
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1]],
            [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];    
    }

    moveFigure(x, y, z, figure){
        figure.points.forEach(point => {
            this.movePoint(x, y, z, point);
        })
    }

    rotateOx(alpha, point){
        const array = this.multMatrix([
            [Math.cos(alpha), 0, Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [-Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ],
        [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOy(alpha, point){   
        const array = this.multMatrix([
            [1, 0, 0, 0],
            [0, Math.cos(alpha), -Math.sin(alpha), 0],
            [0, Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]
        ],
        [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOz(alpha, point){
         const array = this.multMatrix([
                [Math.cos(alpha), -Math.sin(alpha), 0, 0],
                [Math.sin(alpha), Math.cos(alpha), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    calcDistance(figure, endPoint, name){//в классе фигура в классе сабжект добавить поле полигонс(массив)
        figure.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let i = 0; i < points.length; i++){
                x += figure.points[points[i]].x;
                y += figure.points[points[i]].y;
                z += figure.points[points[i]].z;
            }
            x /= points.length;
            y /= points.length;
            z /= points.length;
            // figure.polygons[i][name] = Math.sqrt(
            //     Math.pow(endPoint.x - x, 2) +
            //     Math.pow(endPoint.y - y, 2) +
            //     Math.pow(endPoint.z - z, 2)
            // );
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - x, 2) +
                Math.pow(endPoint.y - y, 2) +
                Math.pow(endPoint.z - z, 2)
            );
            polygon.distance = Math.sqrt(
                Math.pow(this.WIN.CAMERA.x - x, 2) + 
                Math.pow(this.WIN.CAMERA.y - y, 2) +
                Math.pow(this.WIN.CAMERA.z - z, 2));
            
        });
        
    }

    calcIllumination(distance, lumen){
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return res > 1 ? 1 : res;
    }
    
    sortByArtist(figure){
        figure.polygons.sort((a, b) => (a.distance < b.distance)? 1 : -1);
    }
}