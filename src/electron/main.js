import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath, isDev, validateEventFrame } from "./util.js";
// import userController from "./controllers/userController.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
import UserController from "./controllers/userController.js";
import createLoginWindow from "./windwos/loginWindow.js";
import { preload } from "react-dom";

let loginWindow;
let mainWindow;

function createMainWindow() {
    // Remove the const to modify the global variable
    mainWindow = new BrowserWindow({
        title: "Production - INTERCOCINA",
        width: 1300,
        height: 800,
        webPreferences: {
            preload: getPreloadPath()
        },
        // frame: false
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "react-dist/index.html"));
    }

    ipcMain.on('sendFrameAction', (event, payload) => {
        switch (payload) {
            case "CLOSE":
                mainWindow.close();
                break;
            case "MINIMIZE":
                mainWindow.minimize();
                break;
            default:
                mainWindow.maximize();
                break;
        }
    });

    ipcMain.on('registerUser', (event, payload) => { // Fixed typo
        new UserController().create(payload);
    });

    // Close event
    handleCloseEvent(mainWindow); // Fixed typo

    // Icon
    createTray(mainWindow);

    // Menu
    createMenu(mainWindow);

    return mainWindow; // Return the window object
}

function handleCloseEvent(mainWindow) { // Fixed typo
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
    });

    app.on('before-quit', () => {
        willClose = true;
    });

    mainWindow.on('show', () => {
        willClose = false;
    });
} // Added missing closing brace

ipcMain.handle('users', async (event) => {
    return await new UserController().all();
});

ipcMain.handle('logout', async (event) => {
    try {
        if (mainWindow) {
            mainWindow.close();
        }

        // Create a new login window if one doesn't exist
        if (!loginWindow || loginWindow.isDestroyed()) {
            loginWindow = createLoginWindow();
        } else {
            loginWindow.show(); // Use show() instead of open()
        }

        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('loginUser', async (event, data) => {
    try {
        // console.log(data);
        
        if (data.access_token) {

            if (loginWindow && !loginWindow.isDestroyed()) {
                loginWindow.close();
            }

            mainWindow = createMainWindow();
            return true;
        }
        return null;
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
});


app.on('ready', () => {
    loginWindow = createLoginWindow();
});