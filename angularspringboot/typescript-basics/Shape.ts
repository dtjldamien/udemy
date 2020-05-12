export abstract class Shape {

    // parameter properties
    constructor(private _x: number, private _y: number) {}

    public set x(value: number) {
        this._x = value;
    }

    public get x():number {
        return this._x;
    }

    public set y(value: number) {
        this._y = value;
    }

    public get y():number {
        return this._y;
    }

    // public by default
    getInfo(): string {
        return `x=${this._x}, y=${this._y}`;
    }

    // calculation depends on type of shape
    abstract calculateArea(): number;
}