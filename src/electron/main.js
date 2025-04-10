import { app, BrowserWindow, ipcMain, Tray, nativeImage } from "electron";
import path from "path";
import { getAssetsPath, getPreloadPath, isDev, validateEventFrame } from "./util.js";
import { userController } from "./controllers/userController.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";


app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        },
        frame: false
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123')
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "react-dist/index.html"));
    }


    new userController().logUser(mainWindow)



    // mainWindow.webContents.openDevTdools()

    // Handel userData
    ipcMain.handle('userData', (event) => {
        validateEventFrame(event.senderFrame);
        return new userController().find();
    })



    ipcMain.on('sendFrameAction', (event, payload) => {

        switch (payload) {
            case "CLOSE":
                mainWindow.close()
                break;
            case "MINIMIZE":
                mainWindow.minimize()
                break;
            default:
                mainWindow.maximize()
                break;
        }
    })


  

    // Close evnet
    hadnleCloseEvent(mainWindow);


    // Icon
    createTray(mainWindow);


    // Menu
    createMenu(mainWindow)







})



function hadnleCloseEvent(mainWindow) {

    let willClose = false;

    mainWindow.on('close', (e) => {

        if (willClose) {
            return 0;
        }


        e.preventDefault();
        mainWindow.hide();

        if (app.dock) {
            app.dock.hide();
        }
    })


    app.on('before-quit', () => {
        willClose = true
    })


    mainWindow.on('show', () => {
        willClose = false;
    })
}