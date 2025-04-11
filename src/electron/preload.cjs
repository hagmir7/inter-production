const electron = require("electron");


electron.contextBridge.exposeInMainWorld('electron', {

    subscribeStatistics: (callback) => {
        return ipcOn('statistics', (stats) => {
            callback(stats);
        });
    },

    subscribeChangeView: (callback) => {
        return ipcOn('changeView', (view) => {
            callback(view);
        });
    },

    sendFrameAction: (payload) => ipcSend('sendFrameAction', payload),


    userData: () => ipcInvoke('userData'),

    registerUser: (payload) => electron.ipcRenderer.send('registerUser', payload),
    loginUser: (payload) => electron.ipcRenderer.invoke('loginUser', payload),

    open : (url) => electron.shell.openExternal(url),
   
    versions: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }

})




function ipcOn(key, callback) {
    const cb = (_, payload) => callback(payload);
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}

function ipcInvoke(key) {
    return electron.ipcRenderer.invoke(key);
}

function ipcSend(key, payload) {
    electron.ipcRenderer.send(key, payload);
}