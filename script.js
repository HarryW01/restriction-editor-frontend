function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

window.addEventListener("message", handleReceive);

const CODE_EDITOR_BASE_URL = "http://localhost:3000";
const iFrame = document.getElementById("code-editor");
iFrame.onload = setupFrame;
const iFrameContainer = document.getElementById("ide"); // Change styles of this
let uid = makeid(10);
iFrame.setAttribute("src", CODE_EDITOR_BASE_URL + "/#" + uid);

function setupFrame() {
  sendMessage({
    type: "initialise",
    language: "python",
    code: "print('hello world!')",
    fullscreen: true,
    uid: uid
  });
}

function sendMessage(obj) {
    if (iFrame instanceof HTMLElement && iFrame.contentWindow) {
      console.log(iFrame.src)
      console.log(obj)
      iFrame.contentWindow.postMessage(obj, iFrame.src);
    } else {
      console.log("iFrame not defined.");
    }
    console.log("Initialise message sent");
  }

function handleReceive(e) {
  if (!iFrame || e.source !== iFrame.contentWindow) {
    return;
  }
  console.log("Message received:", e);
}
