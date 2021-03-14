
console.log("START");
const promise = new Promise((resolve, reject) => {
    console.log("before");
    resolve(123);
    console.log("after");
});
console.log("1");
promise.then((res) => {
    console.log('1. I get called:', res === 123); // I get called: true
});
console.log("2");
promise.then((res) => {
    console.log('I get called:', res === 321); // I get called: false
});
console.log("3");
promise.catch((err) => {
    // This is never called
});

console.log("END");