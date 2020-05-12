"use strict";
// normal for loop
for (var i = 0; i < 5; i++) {
    console.log("normal for loop " + i);
}
// loop through array
var reviews = [5, 4, 3, 2, 1, 2.5, 3.5, 4];
var total = 0;
for (var i = 0; i < reviews.length; i++) {
    console.log(reviews[i]);
    total += reviews[i];
}
var average = total / reviews.length;
console.log("Review average: " + average);
var sportsOne = ["Golf", "Cricket", "Tennis", "Swimming"];
for (var i = 0; i < sportsOne.length; i++) {
    console.log(sportsOne[i]);
}
// enhanced for loop
for (var _i = 0, sportsOne_1 = sportsOne; _i < sportsOne_1.length; _i++) {
    var tempSport = sportsOne_1[_i];
    if (tempSport == "Cricket") {
        console.log("enhanced for loop, my favourite sport! " + sportsOne);
    }
    else {
        console.log("enhanced for loop " + sportsOne);
    }
}
var sportsTwo = ["Golf", "Cricket", "Tennis"];
sportsTwo.push("Baseball");
sportsTwo.push("Football");
for (var _a = 0, sportsTwo_1 = sportsTwo; _a < sportsTwo_1.length; _a++) {
    var tempSport = sportsTwo_1[_a];
    console.log("growable array" + tempSport);
}
