const fs = require('fs')
const path = require('path')

const commandsLoader = () => {
  let fanktions = {}
  let directory_name = path.resolve(process.cwd(), './processFunctions')
  let filenames = fs.readdirSync(directory_name)
  filenames.forEach(file => {
    let fanktion = file.match('(.*).js')
    fanktions[fanktion[1]] = require(`${directory_name}/${fanktion[0]}`)
  })
  return fanktions
}

module.exports = commandsLoader