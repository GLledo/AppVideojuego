const appMS = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    zombies: [],
    platforms: [],
    bulletBoss: [],
    keys: {
        TOP_KEY: 38,
        SPACE: 32,
        LEFT: 37,
        RIGHT: 39
      },
    killed: 0,
    findPlatform: undefined
    ,

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
        

            // this.generateZombies()
            
            this.clearBullets() //limpiamos las balas
            this.clearObstacles() // Limpiamos del array de zombies los que salgan de la pantalla

            //Colisiones
            this.isCollisionBulletsZombies()
            this.isCollisionPlatform()

            
            if (this.isCollision()) {
              if(this.player.life(10,this.framesCounter)){
                this.gameOver()
              }
            } // Comprobamos colisiones
            
        }, 1000 / this.fps)
      },

      reset() {
        //reset del game
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
        this.platforms = [
          new platform (this.ctx,this.height,this.width,30,200,200,700),
          new platform (this.ctx,this.height,this.width,30,200,500,700),
          new platform (this.ctx,this.height,this.width,30,200,800,600)]

        this.boss = new boss(this.ctx, this.width, this.height)
        this.bulletBoss = new bulletBoss (this.ctx, this.boss.posY,this.boss.posX,this.posY0,this.boss.height, this.boss.width , "red")
        //Metemos las plataformas en un array
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
        this.zombies.forEach(obs => obs.draw(this.framesCounter));
        
        this.platforms.forEach(platformsArr =>{
          platformsArr.draw()
        })

        this.boss.draw(this.framesCounter)
        this.bulletBoss.draw()
        // this.drawScore();
      },

      moveAll() {
        
        this.player.move(this.framesCounter)
        this.zombies.forEach(obs => obs.move())

      },

      generateZombies() {

        //generamos de momento 10 zombies
        if (this.zombies.length < 10){ 
          if (this.framesCounter % 120 == 0) {
            //Generamos obstaculos cada 200 frames.
            this.zombies.push(new Zombie(this.ctx, this.canvas.width,this.canvas.height)); //pusheamos nuevos obstaculos
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
      
      // Colision de balas con los zombies
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

      // funcion para comprobar colisiones entre el player y los zombies
      isCollision() {
        
        return this.zombies.some(
          obs =>
            this.player.posX + this.player.width >= obs.posX &&
            this.player.posY + this.player.height >= obs.posY &&
            this.player.posX <= obs.posX + obs.width &&
            this.player.posY <= obs.posY + obs.height
        )
      },

      isCollisionPlatform() {
        
        let findPlatform = this.platforms.find(
          obs => {
           return (this.player.posX + this.player.width - 70 >= obs.posX &&
                  this.player.posY + this.player.height >= obs.posY - 20 &&
                  this.player.posX <= obs.posX + obs.width - 30 &&
                  this.player.posY + this.player.height - 10 <= obs.posY + obs.height  &&
                  this.player.velY > 0)
          }
        )
       
        if (findPlatform ){

          this.player.obj = findPlatform
          this.player.posY0 = findPlatform.posY - this.player.height
          this.player.posY = this.player.posY0
        }
        else{
          this.player.posY0 = this.height * 0.95 - this.player.height;
        }
      },

      generateZombies() {
        if (this.zombies.length < 10){ 
          if (this.framesCounter % 120 == 0) {
            this.zombies.push(new Zombie(this.ctx, this.canvas.width,this.canvas.height)); //pusheamos nuevos zombies
          }
        }
      },
      
      generateBulletBoss(){

      }
      ,

      gameOver() {
        //Gameover detiene el juego.
        alert("Has muerto PUTO PACO, pero has matado a " + this.killed)
        clearInterval(this.interval);
       },

}