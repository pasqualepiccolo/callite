//const { app, BrowserView, BrowserWindow } = require('electron')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const BrowserView = electron.BrowserView
const Menu = electron.Menu

const path = require('path')
const url = require('url')
const w = 1280;
const h = 1024;
const t = 'CalLite CRM';
const s = 'https://demo.callite.it'; 

const isMac = (process.platform === 'darwin');

let win

function createWindow() {
	win = new BrowserWindow({
		width: w,
		height: h,
		minWidth: 660,
		minHeight: h / 2,
		resizable: true,
		title: t,
		icon: path.join(__dirname, '/icons/callite.png')
	});

	app.commandLine.appendSwitch('--ignore-certificate-errors');
	app.allowRendererProcessReuse = true;

	const view = new BrowserView();
	win.setBrowserView(view);
	view.setAutoResize({
		width: true,
		height: true,
		horizontal: false,
		vertical: false
	});
	view.setBounds({
		x: 0,
		y: 0,
		width: w - 12,
		height: h - 47
	});

	view.webContents.loadURL(s);
	//view.webContents.openDevTools({ detached: true });

	setMainMenu();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (!isMac) {
		app.quit();
	}
});

function setMainMenu() {
	let template = [{
        label: t,
		role: 'window',
		submenu: [{
                label: 'Hide',
				role: 'minimize'
			},
			{
                label: 'Quit',
				role: 'close'
			}
		]
	}];

	if (isMac) {

		template.unshift({
			label: t,
			submenu: [{
					label: 'Hide',
					accelerator: 'Command+H',
					role: 'hide'
				},
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() {
						app.quit()
					}
				}
			]
		})

		addUpdateMenuItems(template[0].submenu, 1);
	}
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
}
