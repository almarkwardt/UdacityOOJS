// In our previous implementation, the carlike() function wasn't exactly
// a "decorator", in that it created an object from scratch and we assigned
// that object to a variable. It did not extend or enhance an already-
// existing object with additional functionality. We can change the
// carlike() function to take an object parameter and extend that object
// rather than create a new, blank object. This is where the "decoration"
// comes in.
var carlike = function(obj) {
	obj.loc = 0;
	obj.move = function() {
		obj.loc++
	};

	return obj;
};

// Create 2 carlike objects, but have them start off as non-empty objects
// so that the carlike() function will truly "decorate" them.
amy = carlike({"name":"amy"});
ben = carlike({"name":"ben"});

// We should see both objects with the initial member we gave them ("name")
// plus the additional stuff that carlike() bolted on.
console.log("amy = ", amy);
console.log("ben = ", ben);

// All of our previous carlike functionality is still there.
amy.move();
console.log("amy = ", amy);
console.log("ben = ", ben);
