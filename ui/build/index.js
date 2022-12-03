process.env.NODE_ENV = 'production'

const parallel = require('os').cpus().length > 1
const runJob = parallel ? require('child_process').fork : require
const { join } = require('path')
const { createFolder } = require('./utils')
const { green, blue } = require('chalk')

console.log()

require('./script.app-ext.js').syncAppExt()
require('./script.clean.js')

<<<<<<< HEAD
=======
// console.log(` 📦 Building------> ${green('v' + require('../package.json').version)}...\n`)
>>>>>>> f5d31bb604d339a737480794fde17936362721c2
console.log(` 📦 Building ${green('v' + require('../package.json').version)}...${parallel ? blue(' [multi-threaded]') : ''}\n`)

createFolder('dist')

<<<<<<< HEAD
=======
// require(join(__dirname, './script.javascript.js'))

>>>>>>> f5d31bb604d339a737480794fde17936362721c2
runJob(join(__dirname, './script.javascript.js'))
runJob(join(__dirname, './script.css.js'))
