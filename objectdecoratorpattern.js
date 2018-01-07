// carlike() creates an object and assigns the loc value (initially 0) and
// assigns the move method to point to the move function. Then carlike()
// returns the object. This allows "var myCar = carlike()" syntax.
// Further, by assigning obj.move to point to the move function, it will
// be a reference to a single move function defined elsewhere in memory.
// This is probably not a big deal for such a small function, but if it
// became a large function, this would save memory space.
var carlike = function() {
	var obj = {};
	obj.loc = 0;
	obj.move = move;

	return obj;
};

// Define the move function out here, so that it can be reused and only
// references to it will be stored elsewhere. Because we are using this
// like a method, the invocation will be <my object>.move(), and therefore
// we can use the "this" parameter in this function.
var move = function() {
	this.loc++;
};

// Create 2 carlike objects. They should be separate entities in memory,
// so they should fail the triple equal comparison.
amy = carlike();
ben = carlike();
console.log("Are amy and ben the same object? ", (amy === ben));

// Although they are not the same object, they should start with the
// same value for location.
console.log("Are their location values equivalent? ", (amy.loc == ben.loc));

// And because we assign their move methods to point to a function defined
// elsewhere, the triple equals should return true on their move method.
console.log("Are their move methods the same? ", (amy.move === ben.move));

// Move Amy only, and we can show for sure that they are 2 separate entities
// in memory.
amy.move();
console.log("Are their location values equivalent after amy moved? ",
		(amy.loc == ben.loc));

