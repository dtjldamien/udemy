import { Shape } from "./Shape";

export class Circle extends Shape {
  // parameter properties (only _radius, theX and theY are regular parameters)
  constructor(theX: number, theY: number, private _radius: number) {
    super(theX, theY);
  }

  public set radius(value: number) {
    this._radius = value;
  }

  public get radius(): number {
    return this._radius;
  }

  getInfo(): string {
    return super.getInfo() + `, radius=${this._radius}`;
  }

  calculateArea(): number {
      return Math.PI * this._radius * this._radius;
  }
}
