// This implementation of carlike is very similar to the previous one, except
// it assigns the move method to point to an internally-defined function.
// By defining the move method internally, each instance of a carlike object
// will have its own move() in memory, rather than a reference.
var carlike = function() {
	var obj = {};
	obj.loc = 0;
	obj.move = function() {
		obj.loc++
	};

	return obj;
};

// Create 2 carlike objects. They are still separate entities in memory,
// so they should fail the triple equal comparison.
amy = carlike();
ben = carlike();
console.log("Are amy and ben the same object? ", (amy === ben));

// They still start with the same value for location.
console.log("Are their location values equivalent? ", (amy.loc == ben.loc));

// Now, because we define the move method within the carlike() function,
// their move methods are now separate and will fail the triple equal
// comparison.
console.log("Are their move methods the same? ", (amy.move === ben.move));

// Move Amy only, and we can show for sure that they are 2 separate entities
// in memory.
amy.move();
console.log("Are their location values equivalent after amy moved? ",
		(amy.loc == ben.loc));

