const {app,BrowserWindow,ipcMain,dialog}=require('electron');
const {spawn,execFile}=require('child_process');
const path=require('path');
let win,proc=null;
app.whenReady().then(()=>{
  win=new BrowserWindow({width:1340,height:860,minWidth:1100,minHeight:720,backgroundColor:'#0e1217',icon:path.join(__dirname,'icon.png'),
    titleBarStyle:'hidden',titleBarOverlay:{color:'#00000000',symbolColor:'#e8ecf2',height:44},
    webPreferences:{preload:path.join(__dirname,'preload.js')}});
  win.setMenuBarVisibility(false);win.loadFile('index.html');
});
app.on('window-all-closed',()=>{if(proc)proc.kill();app.quit()});
const exe=(d,n)=>path.join(d,n+'.exe');
const run=(d,n,a)=>new Promise(r=>execFile(exe(d,n),a,{timeout:60000,maxBuffer:1e7,windowsHide:true},(e,o,s)=>r({ok:!e,out:((o||'')+(s||'')).trim()})));
ipcMain.handle('pick',async()=>{const r=await dialog.showOpenDialog(win,{properties:['openDirectory']});return r.canceled?null:r.filePaths[0]});
ipcMain.handle('pickfile',async(e,ext)=>{const r=await dialog.showOpenDialog(win,{properties:['openFile'],filters:[{name:ext,extensions:[ext]}]});return r.canceled?null:r.filePaths[0]});
ipcMain.handle('adb',(e,d,a)=>run(d,'adb',a));
ipcMain.handle('exec',(e,d,n,a)=>run(d,n,a));
ipcMain.handle('start',(e,d,a)=>{
  if(proc)return false;
  const f=t=>win.webContents.send('log',t.toString());
  proc=spawn(exe(d,'scrcpy'),a,{cwd:d,windowsHide:true});
  proc.stdout.on('data',f);proc.stderr.on('data',f);
  proc.on('error',x=>{f(x.message);proc=null;win.webContents.send('exit',-1)});
  proc.on('close',c=>{proc=null;win.webContents.send('exit',c)});
  return true;
});
ipcMain.handle('stop',()=>{if(proc)proc.kill()});
