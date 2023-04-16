import { Figure } from "./figure.js";

export class Circle extends Figure {
    constructor(x, y, fill, ctx, radius, selected) {
        super(x, y, fill, ctx, selected);
        this.radius = radius;
    }


    draw() {
        this.ctx.beginPath();


        this.ctx.fillStyle = this.fill;
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);      //se utiliza arc ya que es un circulo
        this.ctx.fill();

        if (this.selected == true) {
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        } 


        this.ctx.closePath();
    }

    isCursorInside(x, y) {
        //formula para saber si un cursor esta dentro de un circulo
        let _x = this.x - x;
        let _y = this.y - y;

        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

}