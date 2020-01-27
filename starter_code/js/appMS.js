const appMS = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    zombies: [],
    plataformas: [],
    keys: {
        TOP_KEY: 38,
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39
      },
    killed: 0,

      init() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.99;
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start();     
      },

      start(){
        this.reset()
        this.interval = setInterval(()=>{
            // Intervalo de frames
            this.framesCounter++ //Contador de frames

            // controlamos que frameCounter no sea superior a 1000
            if (this.framesCounter > 1000) this.framesCounter = 0

            this.clear()

            //Pintar y mover
            this.drawAll()
            this.moveAll()

            this.generateZombies()
            this.clearBullets() //limpiamos las balas
            this.clearObstacles() // Limpiamos del array de zombies los que salgan de la pantalla

            //Colisiones
            this.isCollisionBulletsZombies()
            if (this.isCollision()) {
              if(this.player.life(10)){
                this.gameOver()
              }
            } // Comprobamos colisiones
            
        }, 1000 / this.fps)
      },

      reset() {
        //reset del game
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
        this.plataforma = new Plataforma (this.ctx, this.posX, this.posY, this.posY0, this.height,this.width)
        // this.scoreboard = ScoreBoard;
        // this.scoreboard.init(this.ctx);
        // this.score = 0;
        //this.obstacles = [];
      },

      clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      },

      drawAll() {
        this.background.draw()
        this.player.draw()
        this.plataforma.draw()
        this.zombies.forEach(obs => obs.draw(this.framesCounter));
        // this.drawScore();
      },

      moveAll() {
        
        this.player.move(this.framesCounter)

        this.zombies.forEach(obs => obs.move())

      },

      generateZombies() {
        if (this.zombies.length < 10){ 
          if (this.framesCounter % 200 == 0) {
            //Generamos obstaculos cada 70 frames.
            console.log(this.zombies);
            this.zombies.push(new Zombie(this.ctx, this.canvas.width, this.player.posY0, this.player.height)); //pusheamos nuevos obstaculos
          }
        }
      },
      
      clearObstacles() {
        //funcion para limpiar Zombies
        this.zombies.forEach((zom, idx) => {
          if (zom.posX <= 0) {
            this.zombies.splice(idx, 1);
          }
        })
      },

      clearBullets() {
        //funcion para limpiar balas
        this.player.bullets.forEach((bul, idx) => {
          if (bul.posX >= window.innerWidth) {
            this.player.bullets.splice(idx, 1);
          }
        })
      },
      
      isCollisionBulletsZombies(){

        this.zombies.forEach((zom, idz) =>{
          this.player.bullets.forEach((bul , idb) =>{
              if (zom.posX + zom.width >= bul.posX && zom.posY + zom.height >= bul.posY && zom.posX <= bul.posX + 6.14){

                if (zom.life()){
                  this.zombies.splice(idz,1)
                  
                  this.killed++  
                }
                
                this.player.bullets.splice(idb,1)
              }
          })
        })
         
      },

      isCollision() {
        // funcion para comprobar colisiones

        return this.zombies.some(
          obs =>
            this.player.posX + this.player.width >= obs.posX &&
            this.player.posY + this.player.height >= obs.posY &&
            this.player.posX <= obs.posX + obs.width
        )
      },

      generateZombies() {
        if (this.zombies.length < 10){ 
          if (this.framesCounter % 200 == 0) {
            this.zombies.push(new Zombie(this.ctx, this.canvas.width, this.player.posY0, this.player.height)); //pusheamos nuevos zombies
          }
        }
      },

      gameOver() {
        //Gameover detiene el juego.
        alert("Has muerto PUTO PACO, pero has matado a " + this.killed)
        clearInterval(this.interval);
       },

}