const { BrowserWindow, app } = require('electron');
const path = require('path');
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
log.transports.file.resolvePathFn = () => path.join('D:/Source/Learn/Electron/auto-update-electron/', 'logs/main.log');

let winMain;
async function createWindow() {
    winMain = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    winMain.loadFile(path.join(__dirname, 'index.html'));
}
app.on('ready' ,() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', (event, info) => {
    log.info('update-available: ', JSON.stringify(info));
});
autoUpdater.on('download-progress', (event, info) => {
    log.info('download-progress: ', JSON.stringify(info));
});
autoUpdater.on('checking-for-update', () => {
    log.info('checking-for-update...');
});
autoUpdater.on('update-downloaded', (event, info)=> {
    log.info('update-downloaded:', JSON.stringify(info));
});
autoUpdater.on('update-not-available', (event, info)=> {
    log.info('update-not-available:', JSON.stringify(info));
});
autoUpdater.on('error', (error)=> {
    log.info('error: ', JSON.stringify(error));
});