// Every function object in javascript comes with a .prototype member object
// automatically. This can be used as syntactic sugar for the .methods
// object we created earlier when constructing objects. We simply delegate
// to Car.prototype, and since Car.prototype will be created by the
// interpreter, we can get rid of the object-creation brackets when we
// define the .move member.
var Car = function() {
	var obj = Object.create(Car.prototype);
	obj.loc = 0;

	return obj;
};

Car.prototype.move = function() {
	this.loc++;
};

amy = Car();
console.log("amy = ", amy);
console.log("amy.constructor = ", amy.constructor);
console.log("amy instanceof Car ?", (amy instanceof Car));

// In this example, although we are calling the OtherCar function to
// create an object which is assigned to the "other" variable, the
// expression "other instanceof OtherCar" will return false. That is
// because "other" is just an object that happened to be built
// within the OtherCar function. It is not actually set up to delegate
// to the OtherCar prototype. To make this expression evaluate true,
// uncomment the line in which we set up the delegation using
// Object.create.
var OtherCar = function() {
	var obj = {};
	//obj = Object.create(OtherCar.prototype);
	obj.thing = "thingValue";

	return obj;
};
var other = OtherCar();
console.log("other instanceof OtherCar ?", (other instanceof OtherCar));

// We can show that the setup of delegation is the important part, and not
// the actual function called to construct a variable, with the following:
var otherCarDelegatedManually = Object.create(OtherCar.prototype);
console.log("otherCarDelegatedManually instanceof OtherCar ?",
		(otherCarDelegatedManually instanceof OtherCar));
