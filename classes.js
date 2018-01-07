// We can define a Car.methods object which contains all of the methods we
// want a Car to have. Once we do that, we can use Object.create during
// the creation of a Car object to ensure that anything not found in the
// object itself is delegated to Car.methods.
var Car = function() {
	var obj = Object.create(Car.methods);
	obj.loc = 0;

	return obj;
};

Car.methods = {
	move: function() {
				 this.loc++;
			 }
};

amy = Car();
console.log("amy = ", amy);
amy.move();
console.log("amy = ", amy);
