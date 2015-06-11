'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const globalShortcut = require('global-shortcut');
const ipc = require('ipc');


// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function createMainWindow () {
	const win = new BrowserWindow({
		width: 1024,
		height: 768,
		resizable: true
	});

	win.loadUrl(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	return win;
}

function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}

// prevent window being GC'd
let mainWindow;

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function () {
	mainWindow = createMainWindow();

	globalShortcut.register('Alt+CmdOrCtrl+M', function() {
		mainWindow.webContents.send('openSesame', 'Main');
	});

	globalShortcut.register('Alt+CmdOrCtrl+S', function() {
		mainWindow.webContents.send('openSesame', 'Stats');
	});
});

// Setup IPC
ipc.on('workout-completed', function(event, arg) {

  console.log('received workout-completed');
  console.log('sending workout-completed-event to render process');

  mainWindow.webContents.send('workout-completed-event', '');
});