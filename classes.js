// When we use the keyword "new" to create an object, some code is inserted
// at the beginning and end of our function to set up the delegation and
// return the resulting object. This allows us to exclude those lines
// from our constructor function. The injected code sets up the parameter
// "this" to take the place of the object we called "obj" before.
var Car = function(initialLoc) {
	this.loc = initialLoc;
};

Car.prototype.move = function() {
	this.loc++;
};

var SportsCar = function(initialLoc) {
	Car.call(this, initialLoc);
};

SportsCar.prototype = Object.create(Car.prototype);
SportsCar.prototype.constructor = SportsCar;
SportsCar.prototype.moveFast = function() {
	this.loc += 2;
};

amy = new SportsCar(1);
console.log("amy = ", amy);
console.log("amy.constructor = ", amy.constructor);
console.log("amy instanceof Car ?", (amy instanceof Car));
console.log("amy instanceof SportsCar ?", (amy instanceof SportsCar));
amy.move();
console.log("amy = ", amy);
amy.moveFast();
console.log("amy = ", amy);
