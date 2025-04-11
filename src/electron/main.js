import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath, isDev, validateEventFrame } from "./util.js";
import userController from "./controllers/userController.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import UserController from "./controllers/userController.js";
import createLoginWindow from "./windwos/loginWindow.js";


let loginWindow;
let mainWindow;


function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Production - INTERCOCINA",
        width: 1300,
        height: 800,
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

    ipcMain.on('registerUser', (envent, payload) => {
        new UserController().create(payload)
    })
    // Close evnet
    hadnleCloseEvent(mainWindow);
    // Icon
    createTray(mainWindow);
    // Menu
    createMenu(mainWindow)

}



ipcMain.handle('loginUser', async (event, payload) => {
    try {
        const user = await new UserController().login(payload);
        if (user) {
            loginWindow.close();
            mainWindow = createMainWindow();
            return user;
        }
    } catch (error) {
        console.error('Login error:', error);
        return null; // Return null or handle the error as needed
    }
});


app.on('ready', () => {
    loginWindow = createLoginWindow()




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