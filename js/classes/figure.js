export class Figure {
    constructor(x, y, fill, ctx, selected) {
        this.x = x;
        this.y = y;
        this.fill = fill; 
        this.ctx = ctx;
        this.selected = selected;
    }


    draw() {
        //ABSTRACTA
    }

    isCursorInside(x, y) {
        //ABSTRACTA
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    moveDown() {
        this.y = this.y + 10;
    }

    moveUp() {
        this.y = this.y - 10;
    }

    moveRight() {
        this.x = this.x + 10;
    }

    moveLeft() {
        this.x = this.x - 10;
    }

    setSelected(selected) {
        this.selected = selected;
    }

    getSelected() {
        return this.selected;
    }

}