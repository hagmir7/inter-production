import { app, BrowserWindow } from 'electron';
import path from 'path';
import { getPreloadPath, isDev } from '../util.js';


let loginWindow;

export default function createLoginWindow() {
    loginWindow = new BrowserWindow({
        width: 400,
        height: 600,
        frame: false,
        resizable: false,
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        loginWindow.loadURL('http://localhost:5123/login');
    } else {
        loginWindow.loadFile(path.join(app.getAppPath(), "react-dist/index.html"));
    }

    loginWindow.on('maximize', (e) => {
        loginWindow.unmaximize(); // Immediately unmaximize
    });

    return loginWindow;
}

