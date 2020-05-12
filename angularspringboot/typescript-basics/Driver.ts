import { Customer } from './Customer'
import { Shape } from './Shape'
import { Circle } from './Circle'
import { Rectangle } from './Rectangle';
import { CricketCoach } from './CricketCoach';
import { GolfCoach } from './GolfCoach';
import { Coach } from './Coach';

let myCustomer = new Customer("Damien", "Tan");

console.log(myCustomer.firstName);
console.log(myCustomer.lastName);

// shape is an abstract class, cannot instantiate
// let myShape = new Shape(10, 15);
// console.log(myShape.getInfo());

let myCircle = new Circle(5, 10, 20);
// console.log(myCircle.getInfo());

let myRectangle = new Rectangle(0, 0, 5, 20);
// console.log(myRectangle.getInfo())

// declare an array of shapes
let theShapes: Shape[] = [];

// add shapes to array, myShape is an extract class
// theShapes.push(myShape);
theShapes.push(myCircle);
theShapes.push(myRectangle);

// can only add shapes to the array
// theShapes.push("Hello World!");

for (let tempShape of theShapes) {
    console.log("Shape: " + tempShape.getInfo());
    console.log("Area = " + tempShape.calculateArea());
}

let myCricketCoach = new CricketCoach();
let myGolfCoach = new GolfCoach();

let theCoaches: Coach[] = [];
theCoaches.push(myCricketCoach);
theCoaches.push(myGolfCoach);

for (let tempCoach of theCoaches) {
    console.log(tempCoach.getDailyWorkout());
}