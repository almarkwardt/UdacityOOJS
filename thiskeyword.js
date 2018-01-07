var fn = function(a, b) {
	console.log(this, a, b);
};

// Calling function with nothing left of the dot (no dot) causes 'this' to
// point to global. Since nothing is given for parameters a and b, they will
// both be undefined.
fn();

// Calling a function with the call() method allows explicitly setting
// 'this' to a particular object. The code below should result in
// logging the myVar variable, and 2 undefineds.
var myVar = {"name": "myVar"};
fn.call(myVar, undefined, undefined);

// If a function is stored as a member of a variable, then calling the
// method will result in 'this' pointing to the variable. The code below
// will have the same result as the above code, printing myVar, and
// 2 undefineds.
myVar.method = fn;
myVar.method(undefined, undefined);

// And you can call a method with call as well, so this code will result
// in the same output as the above piece of code, printing myVar, and
// 2 undefineds.
myVar.method.call(myVar, undefined, undefined);
