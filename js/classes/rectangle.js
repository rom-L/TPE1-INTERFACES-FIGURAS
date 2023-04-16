import { Figure } from "./figure.js";

export class Rectangle extends Figure {
    constructor(x, y, fill, ctx, width, height, selected) {
        super(x, y, fill, ctx, selected);
        this.width = width;
        this.height = height;
    }


    draw() {
        this.ctx.beginPath();

        
        this.ctx.fillStyle = this.fill;
        this.ctx.rect(this.x, this.y, this.width, this.height);     //se definen las dimensiones y posicion del rect y luego se fillea
        this.ctx.fill();
    
        if (this.selected == true) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        } 


        this.ctx.closePath();
    }

    isCursorInside(x, y) {
        //formula para saber si un cursor esta dentro de un rect
        return (x >= this.x && x <= this.x + this.width &&
                y >= this.y && y <= this.y + this.height);
    }

}