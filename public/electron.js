const electron = require('electron');
const { app, BrowserWindow } = electron;

const packageJson = require('../package.json');

const path = require('path');

const isDev = require('electron-is-dev');

// TODO: use this when building for production
// const isDev = false;

const isMac = process.platform === 'darwin';

let mainWindow;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    title: 'Electron App',
    height: 800,
    minHeight: 650,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
    },
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  mainWindow.on('closed', () => {
    // quit the app on Widnows
    if (!isMac) {
      app.quit();
    }

    mainWindow = null;
  });

  if (isMac) {
    app.setAboutPanelOptions({
      applicationName: packageJson.productName,
      applicationVersion: packageJson.version,
      copyright: packageJson.author.name,
    });
  }
};

if (!isMac) {
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Create a new window',
    },
  ]);
}

app.on('ready', createWindow);

app.on('before-quit', () => {
  app.quitting = true;
});

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
