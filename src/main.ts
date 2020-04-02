import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow } from 'electron';

// NOTES:
//
// https://electronjs.org/docs/tutorial/security
// https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md
// https://github.com/electron/electron/blob/master/docs/tutorial/security.md
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const mode = process.env.NODE_ENV;

function reloadOnChange(win) {
	if (mode !== 'development') return { close: () => {} };

	const watcher = require('chokidar').watch(path.join(__dirname, '**'), { ignoreInitial: true });

	watcher.on('change', () => {
		win.reload();
	});

	return watcher;
}

// https://github.com/electron/electron/blob/master/docs/api/browser-window.md#browserwindowsetcontentsizewidth-height
function launch() {
	win = new BrowserWindow({
		backgroundColor: '#575757',
		width: 300,
		height: 475,
		/*minWidth: 300,
		minHeight: 475,
		maxWidth: 300,
		maxHeight: 475,*/
		webPreferences: {
      devTools: true,
      nodeIntegration: true,
      // "Uncaught ReferenceError: require is not defined" when contextIsolation: true
      //contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
		}
	});

	// and load the index.html of the app.
	//win.loadFile('index.html')

	win.loadURL(
		url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file:',
			slashes: true
		})
	);

	// Open the DevTools.
	//win.webContents.openDevTools()

	const watcher = reloadOnChange(win);

	win.on('closed', function() {
		win = null;
		watcher.close();
	});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', launch);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		launch();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
