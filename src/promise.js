console.log("START");
var promise = new Promise(function (resolve, reject) {
    console.log("before");
    resolve(123);
    console.log("after");
});
console.log("1");
promise.then(function (res) {
    console.log('1. I get called:', res === 123); // I get called: true
});
console.log("2");
promise.then(function (res) {
    console.log('I get called:', res === 321); // I get called: false
});
console.log("3");
promise["catch"](function (err) {
    // This is never called
});
console.log("END");
