// normal for loop
for (let i = 0; i < 5; i++) {
  console.log("normal for loop " + i);
}

// loop through array
let reviews: number[] = [5, 4, 3, 2, 1, 2.5, 3.5, 4];
let total: number = 0;
for (let i = 0; i < reviews.length; i++) {
  console.log(reviews[i]);
  total += reviews[i];
}

let average: number = total / reviews.length;
console.log("Review average: " + average);

let sportsOne: string[] = ["Golf", "Cricket", "Tennis", "Swimming"];

for (let i = 0; i < sportsOne.length; i++) {
  console.log(sportsOne[i]);
}

// enhanced for loop
for (let tempSport of sportsOne) {
  if (tempSport == "Cricket") {
    console.log("enhanced for loop, my favourite sport! " + sportsOne);
  } else {
    console.log("enhanced for loop " + sportsOne);
  }
}

let  sportsTwo: string[] = ["Golf", "Cricket", "Tennis"];
sportsTwo.push("Baseball");
sportsTwo.push("Football");

for (let tempSport of sportsTwo) {
    console.log("growable array" + tempSport);
}
