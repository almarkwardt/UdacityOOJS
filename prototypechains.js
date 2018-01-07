var root = {"value1": 5};
var copied = Object.assign({}, root);
var extended = Object.create(root);
copied.value2 = 10;
extended.value2 = 10;

console.log(root);
console.log(copied);
console.log(extended);
console.log(copied.value1, copied.value2);
console.log(extended.value1, extended.value2);
