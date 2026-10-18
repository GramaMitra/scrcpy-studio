const {contextBridge:c,ipcRenderer:i}=require('electron');
c.exposeInMainWorld('api',{pick:()=>i.invoke('pick'),pickfile:x=>i.invoke('pickfile',x),adb:(d,a)=>i.invoke('adb',d,a),exec:(d,n,a)=>i.invoke('exec',d,n,a),start:(d,a)=>i.invoke('start',d,a),stop:()=>i.invoke('stop'),on:(n,f)=>i.on(n,(e,v)=>f(v))});
