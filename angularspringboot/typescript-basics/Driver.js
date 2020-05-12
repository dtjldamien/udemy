"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("./Customer");
var Circle_1 = require("./Circle");
var Rectangle_1 = require("./Rectangle");
var CricketCoach_1 = require("./CricketCoach");
var GolfCoach_1 = require("./GolfCoach");
var myCustomer = new Customer_1.Customer("Damien", "Tan");
console.log(myCustomer.firstName);
console.log(myCustomer.lastName);
// shape is an abstract class, cannot instantiate
// let myShape = new Shape(10, 15);
// console.log(myShape.getInfo());
var myCircle = new Circle_1.Circle(5, 10, 20);
// console.log(myCircle.getInfo());
var myRectangle = new Rectangle_1.Rectangle(0, 0, 5, 20);
// console.log(myRectangle.getInfo())
// declare an array of shapes
var theShapes = [];
// add shapes to array, myShape is an extract class
// theShapes.push(myShape);
theShapes.push(myCircle);
theShapes.push(myRectangle);
// can only add shapes to the array
// theShapes.push("Hello World!");
for (var _i = 0, theShapes_1 = theShapes; _i < theShapes_1.length; _i++) {
    var tempShape = theShapes_1[_i];
    console.log("Shape: " + tempShape.getInfo());
    console.log("Area = " + tempShape.calculateArea());
}
var myCricketCoach = new CricketCoach_1.CricketCoach();
var myGolfCoach = new GolfCoach_1.GolfCoach();
var theCoaches = [];
theCoaches.push(myCricketCoach);
theCoaches.push(myGolfCoach);
for (var _a = 0, theCoaches_1 = theCoaches; _a < theCoaches_1.length; _a++) {
    var tempCoach = theCoaches_1[_a];
    console.log(tempCoach.getDailyWorkout());
}
