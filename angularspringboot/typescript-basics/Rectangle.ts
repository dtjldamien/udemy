import { Shape } from './Shape';

export class Rectangle extends Shape {

    // parameter properties (only _radius, theX and theY are regular parameters)
    constructor(theX: number, theY: number, private _length: number, private _width: number) {
        super(theX, theY);
    }

    public set length(value: number) {
        this._length = value;
    }

    public get length():number {
        return this._length;
    }

    public set width(value: number) {
        this._width = value;
    }

    public get width():number {
        return this._width;
    }

    getInfo() :string {
        return super.getInfo() + `, length=${this._length}, width=${this._width}`;
    }

    calculateArea(): number {
        return this._length * this._width;
    }  
}