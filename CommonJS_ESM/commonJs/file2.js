const {a:x} = require("./file1")
const {a:y} = require("./file3")

// const add = require('./utils/add.js')
const {f1:add, f2:sub} = require('./utils/index')

console.log(add(x, y))
console.log(sub(y, x))
// console.log(x,y)