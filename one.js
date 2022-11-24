const { ipcRenderer } = 'electron';

console.log('renderer 1');
var message = "";

function sendMessage(e){
    e.preventDefault();
    message = document.getElementById("magic").innerText;
    console.log(message);
    ipcRenderer.send("receive-message",message);
}