window.onload = () => {

    document.getElementById("start-button").onclick = (e)=> {
        startGame();
        e.currentTarget.disabled = true
      };
    
      function startGame() {
        appMS.init()
      }
    }