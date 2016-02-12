'use strict';

const electron = require('electron');
const proxy = require('./js/services/proxy');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

let createWindow = () => {

    mainWindow = new BrowserWindow({
        'width': 700,
        'height': 568
    });

    proxy.setWebContents(mainWindow.webContents);
    
    let session = mainWindow.webContents.session;
    
    // set iphone UA
    session.webRequest.onBeforeSendHeaders(function(details, callback) {
        details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
        callback({cancel: false, requestHeaders: details.requestHeaders});
    });

    mainWindow.setResizable(false);
    mainWindow.setAutoHideMenuBar(true);
    
    //set Proxy
    session.setProxy({
        proxyRules: 'http=127.0.0.1:9393;https=127.0.0.1:9393'
    }, () => {
        mainWindow.loadURL('http://localhost:3000');
        //mainWindow.loadURL('file://' + __dirname + '/index.html');
    });

};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});