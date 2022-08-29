const electron = require('electron');
const ipcMain = electron.ipcMain
const dialog = electron.dialog
const app = electron.app
const iconGen = require('icon-gen')
const path = require('path')
const fs = require('fs')
const browserWindow = electron.BrowserWindow
let mainWindow = null
let regeditWnd = null
app.on('ready', () => {
  mainWindow = new browserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/src/preload/preload.js",
      sandbox: false
    }
  })
  mainWindow.setMenu(null)
  mainWindow.loadFile(__dirname + "/src/app/index/index.html")
  mainWindow.on('close', () => {
    mainWindow = null
  })
})

ipcMain.on('openRegeditWindow', (e, svgIco) => {
  regeditWnd = new browserWindow({
    width: 580,
    height: 280,
    modal: true,
    resizable: false,
    parent: mainWindow,
    webPreferences: {
      sandbox: false,
      preload: `${__dirname}/src/preload/preload.js`
    }
  })
  regeditWnd.setMenu(null)
  regeditWnd.loadFile(`${__dirname}/src/app/regedit/index.html`)
  regeditWnd.on('close', () => {
    regeditWnd = null
  })
  ipcMain.handleOnce('getSvgInfo', () => {
    return svgIco
  })
})

ipcMain.handle('close', () => {
  regeditWnd.close()
  regeditWnd = null
})

ipcMain.handle('saveIco', async (event, svgFilePath) => {
  await dialog.showSaveDialog(mainWindow, {
    title: "保存",
    defaultPath: `${process.env.USERPROFILE}\\Desktop\\`,
    buttonLabel: "保存",
    filters: [{
      name: 'アイコンファイル',
      extensions: ['ico']
    }, {
      name: 'All files',
      extensions: ['*']
    }]
  }).then((e) => {
    const destFilePath = e.filePath
    if (e.canceled) {
      return
    }
    if (fs.existsSync(destFilePath)) {
      fs.unlinkSync(destFilePath)
    }
    console.log(svgFilePath)
    svg2icoAndSave(svgFilePath, destFilePath)
  }).catch(error => {
    if (error.errno === -4082) {
      dialog.showMessageBox(mainWindow, {
        type: "error",
        title: "エラー",
        message: `このファイルは他のプロセスが使用中です.\nCODE:${error.code}\nPATH:${error.path}`
      })
    }
    console.log(error);
  })
})

function svg2icoAndSave(iconPath, destFilePath) {
  const destDir = path.dirname(destFilePath)
  const r = path.relative(destDir, destFilePath)
  const p = path.parse(r)
  destFilePath = p.dir + "/" + p.name
  console.log(destFilePath)
  try {
    iconGen(iconPath, destDir, {
      ico: {
        name: destFilePath,
        sizes: [16, 24, 32, 48, 64, 128, 256]
      }
    })
  } catch (error) {
    console.log(error)
  }
}
