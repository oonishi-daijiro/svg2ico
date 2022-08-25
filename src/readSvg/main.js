module.exports.get = getSvgpath


const fs = require('fs')
const path = require('path')

const iconsPath = '../../icons'
const configFilePath = `./icons/config.json`

const configJsonFile = fs.readFileSync(configFilePath)
const config = JSON.parse(configJsonFile)

function getSvgpath() {
  const svgPath = []

  for (const i in config) {
    svgPath.push({
      path: path.resolve(`${__dirname}\\${iconsPath}\\${config[i]}.svg`),
      fileExt: i
    })
  }
  return svgPath.filter(e => {
    return fs.existsSync(e.path)
  })
}
