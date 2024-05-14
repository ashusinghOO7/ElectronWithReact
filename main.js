const {app, BrowserWindow} = require('electron');
const path = require('path');
const { electron } = require('process');
const isDev = !app.isPackaged;


function createWindow(){
    const window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:false,
            //Using to sanitize the javascript code as its safe to run.
            worldSafeExecuteJavascript:true,
            //is a feature that ensure that both the preload script and electron internal logic run in different context.
            contextIsolation:true
        }
    })
    window.loadFile('index.html')
    isDev && window.webContents.openDevTools();
}

if(isDev){
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
