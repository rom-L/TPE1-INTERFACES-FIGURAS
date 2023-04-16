"use strict";
/** @type {HTMLCanvasElement} */

import { Rectangle } from "./classes/rectangle.js";
import { Circle } from "./classes/circle.js";
import { Ellipse } from "./classes/ellipse.js";

//********************** */


const CANVAS = document.querySelector("#my-canvas");
const CANVAS_WIDTH = CANVAS.width;
const CANVAS_HEIGHT = CANVAS.height;
CANVAS.setAttribute('tabindex', 1);     //le di este atributo para que funcione el evento del keyboard

const CTX = CANVAS.getContext("2d");


const CANT_FIG = 35;
let figures = [];


let auxDragFunctionMouse = null; //uso esto para almacenar la funcion asi puedo asignarla a un add y remove eventlistener con parametros
let auxDragFunctionKey = null; //uso esto para almacenar la funcion asi puedo asignarla a un add y remove eventlistener con parametros
let auxDragFigure = null;   //uso esto para almacenar la figura que fue presionada para darle estilos

CANVAS.addEventListener("mousedown", function(e) {
    let figure = getPressedFigure(e.offsetX, e.offsetY);

    if (figure != null) {
        //le paso a auxDragFunction la funcion de dragFigure
        auxDragFunctionMouse = function(e) {
            dragFigure(e, figure);
        }

        auxDragFigure = figure;
        auxDragFigure.setSelected(true);

        CANVAS.addEventListener("mousemove", auxDragFunctionMouse);
        CANVAS.removeEventListener("keydown", auxDragFunctionKey);      //cuando se empieza a dragear una figura se remueve el evento de moverlas con el teclado hasta que se suelte
    }

});

//cuando se deja de mantener apretado en el canvas se remueve el EventListener de mover la figura
CANVAS.addEventListener("mouseup", function(e) {
    if (auxDragFigure != null) {
        auxDragFigure.setSelected(false);
        auxDragFigure.draw();
    
        //le paso a auxDragFunctionKey la funcion de moveFigureWithKeyboard
        auxDragFunctionKey = function(e) {
            moveFigureWithKeyboard(e, auxDragFigure);
        }

        CANVAS.addEventListener("keydown", auxDragFunctionKey);
    }

    CANVAS.removeEventListener("mousemove", auxDragFunctionMouse);
});





function main() {
    addFigures();
    drawFigures(figures);
}



function addFigures() {
    for(let i = 0; i < CANT_FIG; i++) {
        let figure = createFigure();
        figures.push(figure);
    }
}

function createFigure() {
    let x = Math.round(Math.random() * CANVAS_WIDTH);
    let y = Math.round(Math.random() * CANVAS_HEIGHT);

    let color = randomRGBA();

    //retorna un valor entre 0 y 1; 0 = rectangulo, 1 = circulo, 2 = ellipse;
    let randomValue = Math.round(Math.random() * 2);

    if (randomValue == 0) {
        let width = Math.round(Math.random() * 90) + 10;
        let height = Math.round(Math.random() * 90) + 10;

        return new Rectangle(x, y, color, CTX, width, height, false);
    } else if (randomValue == 1) {
        let radius = Math.round(Math.random() * 60) + 10;

        return new Circle(x, y, color, CTX, radius, false);
    } else if (randomValue == 2) {
        let width = Math.round(Math.random() * 100) + 10;
        let height = Math.round(Math.random() * 50) + 10;

        return new Ellipse(x, y, color, CTX, width, height, false);
    }

}

function drawFigures(figures) {
    for(let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function getPressedFigure(x, y) {
    //recorre el arreglo de figuras para ver si una figura fue apretada con los valores offset(x, y) del evento (mousedown)
    for (let i = 0; i < figures.length; i++) {
        let currentFigure = figures[i];

        if (currentFigure.isCursorInside(x, y) == true) {
            return currentFigure;
        }
    }

}

function dragFigure(e, figure) {
    //se limpia el canvas y luego se dibujan todas las figuras otra vez para que las demas permanezcan en su lugar mientras movemos otra
    CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    figure.setPosition(e.offsetX, e.offsetY);

    drawFigures(figures);
}

function moveFigureWithKeyboard(e, figure) {
    //se limpia el canvas y luego se dibujan todas las figuras otra vez para que las demas permanezcan en su lugar mientras movemos otra
    CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    switch (e.key) {
        case 'ArrowLeft': {
            figure.moveLeft();
        } break;
        case 'ArrowRight': {
            figure.moveRight();
        } break;
        case 'ArrowUp': {
            figure.moveUp();
        } break;
        case 'ArrowDown': {
            figure.moveDown();
        } break;
    }

    drawFigures(figures);
}


main();