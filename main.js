const electron = require('electron');
const fs = require('fs');
const app = electron.app
const browserWindow = electron.BrowserWindow
let mainWindow = null

app.on('ready', () => {
  mainWindow = new browserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "\\src\\preload\\preload.js",
      sandbox: false
    }
  })
  mainWindow.openDevTools()
  mainWindow.loadFile(__dirname + "/src/app/index/index.html")
  mainWindow.on('close', () => {
    mainWindow = null
  })
})
