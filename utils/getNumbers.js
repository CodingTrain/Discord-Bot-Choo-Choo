const fs = require("fs");

// Loading sequence of random numbers
const rawDigits = fs.readFileSync("./digits.txt", "utf-8");
const digits = rawDigits.split(/[\s\n]+/g);
const randomS = digits.filter((elt, index) => index % 11 !== 0);
const randoms = randomS.map((elt) => parseInt(elt));

module.exports = function () {
    return randoms
}