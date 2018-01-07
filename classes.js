// As it turns out, the previous implementation of the object decorator
// (in which we created a new object every time carlike was called) is
// actually what would be considered a class constructor in javascript.
var Car = function() {
	var obj = {};
	obj.loc = 0;
	obj.move = function() {
		obj.loc++
	};

	return obj;
};

amy = Car();
console.log("amy = ", amy);
