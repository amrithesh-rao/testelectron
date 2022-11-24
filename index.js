const { BrowserWindow, Menu, MenuItem } = require('electron');
const electron = require('electron');

const { app } = electron;


function createWindow() {
    one = new BrowserWindow({
        title: 'parent',
        webPreferences: {
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegration: true,
            sandbox: false
          },
    });
    two = new BrowserWindow({ title: 'child', show: true, webPreferences: {
        contextIsolation: false,
        enableRemoteModule: true,
        nodeIntegration: true,
        sandbox: false
      },});
    // ipcMain.on('receive-message', (data) => {
    //     console.log(data);
    //     ipcMain.emit('send-message');
    // })


    one.loadURL(`file://${__dirname}/one.html`);
    two.loadURL(`file://${__dirname}/two.html`);

    one.webContents.openDevTools({mode: 'detach'});
    two.webContents.openDevTools({mode: 'detach'});

    one.on('closed', () => {
        one = null;
    })
    two.on('closed', () => {
        two = null;
    })
}




app.on('ready', function(){
createWindow();

const template = [
    {
       label: 'Hahaha',
       submenu: [
            {
                role: 'undo'
            },
            {
                role: 'copy'
            },
            {
                label: 'hello',
                type: 'checkbox',
                checked: true
            },
            {
                label:'click-me',
                click: ()=>{ console.log('why you clicked me')}
            },
            {
                label:'i have submenu',
                submenu:[
                    {
                        label:'1',
                    },
                    {
                        label:'2',
                    },
                    {
                        label:'3',
                    }
                ]
            }
       ]
    }
    ]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

} );

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
});

app.on('activate', () => {
    if (one == null) {
        createWindow();
    }
    if (two == null) {
        createWindow();
    }
})