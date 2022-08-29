const electron = require('electron')
const svgPath = require('../readSvg/main')
const ipcRenderer = electron.ipcRenderer


electron.contextBridge.exposeInMainWorld("api", {
    getSvgFleiconPath: svgPath.get,
    openRegeditWindow: (svgIcon) => {
        ipcRenderer.send("openRegeditWindow", svgIcon)
    },
    getSvgInfo: () => {
        return ipcRenderer.invoke('getSvgInfo')
    },
    saveIco: (iconPath) => {
        return ipcRenderer.invoke('saveIco', iconPath)
    },
    close: () => {
        ipcRenderer.invoke('close')
    }
})
