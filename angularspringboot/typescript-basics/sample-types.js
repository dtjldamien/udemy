"use strict";
var found = true;
var grade = 88.6;
var firstName = "Damien";
var lastName = "Tan";
// you still can generate a corresponding javascript file as it is not strongly typed
// warnings in the terminal
// found is a boolean and cannot be a number
// found = 0;
// grade is a number and cannot be a nmber
// grade = "A";
// firstName is a string and cannot be boolean
// firstName = false;
console.log(found);
console.log("The grade is " + grade);
console.log("Hello " + firstName + " " + lastName);
// use template Strings, reference variables with ${..}
console.log("Hi " + firstName + " " + lastName);
