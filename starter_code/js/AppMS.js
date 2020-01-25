const AppMS = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    keys: {
        TOP_KEY: 38,
        SPACE: 32
      },

      init() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = window.innerWidth ;
        this.height = window.innerHeight * 0.99;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.start();     
      },

      start(){
        this.reset()
        this.interval = setInterval(()=>{
            // Intervalo de frames
            this.framesCounter++ //Contador de frames

            // controlamos que frameCounter no sea superior a 1000
            if (this.framesCounter > 1000) this.framesCounter = 0

            this.clear();
            this.drawAll();
            this.moveAll();

        }, 1000 / this.fps)
      },

      reset() {
        //reset del game
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new player(this.ctx, this.canvas.width, this.canvas.height, this.keys);
        // this.scoreboard = ScoreBoard;
        // this.scoreboard.init(this.ctx);
        // this.score = 0;
        // this.obstacles = [];
      },

      clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },

      drawAll() {
        this.background.draw();
        this.player.draw();
        // this.obstacles.forEach(obs => obs.draw());
        // this.drawScore();
      },

      moveAll() {
        // this.background.move();
        this.player.move();
        // this.obstacles.forEach(obs => obs.move());
      },

}