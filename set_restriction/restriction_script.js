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

const CODE_EDITOR_BASE_URL = "http://localhost:3006";
const iFrame = document.getElementById("code-editor");
const iFrameContainer = document.getElementById("ide"); // Change styles of this
let uid = makeid(10);
iFrame.setAttribute("src", CODE_EDITOR_BASE_URL + "/#" + uid);

function loadEditor(func, param, description) {
  sendMessage({
    type: "initialise",
    language: "python",
    code: `#Any code you write here may not use any built-in\nfunctions listed, you are otherwise unrestricted!\n\ndef ${func}(${param}):\n    #${description}.\n    #Implement your code here:\n    return`,
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
  }

function handleReceive(e) {
  if (!iFrame || e.source !== iFrame.contentWindow) {
    return;
  }
  console.log("Message received:", e);
}

async function updateRestrictions() {
  param = getRestrictions().join();
  console.log(param);

  try {
      const response = await fetch(`http://localhost:8000/update-restrictions/?restrictions=${param}`, {
          method: "POST",
      });

      const data = await response.json();
      console.log(data);
  }

  catch (err) {
      console.error(`Fetch error:, ${err}`);
  }
}

function getRestrictions() {
    //Gets the selection of features to be returned by checking which checkboxes have been ticked.
    checkboxes = Array.from(document.querySelectorAll('.feature:checked'));
    return checkboxes.map(box => box.value);
}