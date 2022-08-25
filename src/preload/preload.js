const contextBridge = require('electron').contextBridge
const svgPath = require('../readSvg/main')

contextBridge.exposeInMainWorld("api", {
    getSvgFleiconPath: svgPath.get
})
