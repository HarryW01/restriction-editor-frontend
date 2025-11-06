function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

  const CODE_EDITOR_BASE_URL = "https://code-editor.ada-cs.org";
  const iFrame = document.getElementById("code-editor");
  const iFrameContainer = document.getElementById("ide"); // Change styles of this
  let targetDomainSource;
  let targetDomainOrigin;
  let uid = makeid(10);
  iFrame.setAttribute("src", CODE_EDITOR_BASE_URL + "/#" + uid);

  function setupFrame() {
    sendMessage({
      type: "initialise",
      language: "python",
      code: "print('')",
      fullscreen: true
    });
  }

  function sendMessage(obj) {
      console.log(iFrame.src)
      console.log("Sending message:", obj);
      if (iFrame instanceof HTMLElement && iFrame.contentWindow) {
          iFrame.contentWindow.postMessage(obj, iFrame.src);
      } else if (undefined !== targetDomainSource && undefined !== targetDomainOrigin) {
          targetDomainSource.postMessage(obj, targetDomainOrigin);
      } else {
          // This should only happen if undefined foreignDomain and no message is received yet
          console.log("If foreignDomain is undefined, this can only reply to messages (i.e. can send only after the first message has been received)");
      }
      console.log("Initialise message sent");
    }

  function handleReceive(e) {
      console.log("Message received:", e);
  }

  window.addEventListener("message", handleReceive());