import { Figure } from "./figure.js";

export class Ellipse extends Figure {
    constructor(x, y, fill, ctx, width, height, selected) {
        super(x, y, fill, ctx, selected);
        this.width = width;
        this.height = height;
    }


    draw() {
        this.ctx.beginPath();

        
        this.ctx.fillStyle = this.fill;
        this.ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);     //se definen las dimensiones y posicion del rect y luego se fillea
        this.ctx.fill();
    
        if (this.selected == true) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        } 


        this.ctx.closePath();
    }

    isCursorInside(x, y) {
        //formula para saber si el puntero esta adentro del ellipse
        const cx = this.x;
        const cy = this.y;
    
        const a = this.width / 2;
        const b = this.height / 2;
    
        return (((x - cx) / a) ** 2 + ((y - cy) / b) ** 2) <= 1;
    }
}