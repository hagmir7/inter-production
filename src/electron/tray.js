import { Tray, nativeImage, app, Menu } from "electron";
import { getAssetsPath } from "./util.js";
import path from "path";

export function createTray(mainWindow) {
    if (!mainWindow) return;

    const iconPath = path.join(getAssetsPath(), process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png");
    const icon = nativeImage.createFromPath(iconPath);

    if (icon.isEmpty()) {
        console.warn("Tray icon not found:", iconPath);
        return;
    }

    const tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Quit",
            click: () => app.quit()
        }
    ]);

    tray.setContextMenu(contextMenu);


    // Show or hide window when clicking tray icon
    tray.on("click", () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
}
