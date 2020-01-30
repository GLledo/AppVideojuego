const appMS = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    zombies: [],
    score: 0,
    platforms: [],
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
            this.clear()
            this.framesCounter++ //Contador de frames
            
            if (this.framesCounter % 40 == 0){
              this.score++
            }
            // controlamos que frameCounter no sea superior a 1000
            if (this.framesCounter > 1000) this.framesCounter = 0

            if (this.killed >= 10){
              this.boss.generateBulletBoss(this.framesCounter)
            }
            //Pintar y mover
            this.drawAll()
            this.moveAll()

            if (this.killed < 10)this.generateZombies()

            this.clearBulletsBoss() 
            this.clearBullets() //limpiamos las balas
            this.clearObstacles() // Limpiamos del array de zombies los que salgan de la pantalla

            //Colisiones
            this.isCollisionBulletsZombies()
            this.isCollisionPlatform()

            if (this.isCollisionBoss()){
              if(this.boss.life()){
                this.gameOver(false,true)
              }
            }
            if (this.isCollisionBulletBossPlayer()){
              if(this.player.life(100,this.framesCounter)){
                this.gameOver(true,false)
              }
            }
            if (this.isCollision()) {
              if(this.player.life(50,this.framesCounter)){
                this.gameOver(true,false)
              }
            } // Comprobamos colisiones
            this.music.play()
            
        }, 1000 / this.fps)
      },

      reset() {
        //reset del game
        this.background = new Background(this.ctx, this.width, this.height)
        this.player = new Player(this.ctx, this.canvas.width, this.canvas.height, this.keys)
        this.lives = new Lives (this.ctx, this.canvas.width,this.canvas.height)
        this.platforms = [
          new Platform (this.ctx,this.height,this.width,30,200,200,770),
          new Platform (this.ctx,this.height,this.width,30,200,500,700),
          new Platform (this.ctx,this.height,this.width,30,100,200,400),
          new Platform (this.ctx,this.height,this.width,30,150,500,450),
          new Platform (this.ctx,this.height,this.width,30,50,800,300),
          new Platform (this.ctx,this.height,this.width,30,140,800,600)]

        this.boss = new Boss(this.ctx, this.width, this.height,this.score)
        this.music = new Music("./music/MSlug.mp3")
        
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
        
        this.lives.draw(this.player.health)
        this.platforms.forEach(platformsArr =>{
          platformsArr.draw()
        })

        if (this.killed >= 10)this.boss.draw(this.framesCounter)
        //this.drawScore();
      },

      moveAll() {
        
        this.player.move(this.framesCounter)
        this.zombies.forEach(obs => obs.move())

        if (this.killed >= 10)this.boss.move(this.score)

      },

      generateZombies() {
        //generamos de momento 10 zombies
        if (this.zombies.length < 10){ 
          if (this.framesCounter % 200 == 0) {
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

      clearBulletsBoss() {
        this.boss.bulletBoss.forEach((bul, idx) =>{
          if (bul.posX <= 0) {
            this.boss.bulletBoss.splice(idx, 1);
          }
        })
      },
      isCollisionBulletBossPlayer(){
        
        return this.boss.bulletBoss.some(
          obs =>
            this.player.posX + this.player.width >= obs.posX &&
            this.player.posY + this.player.height - 50>= obs.posY &&
            this.player.posX <= obs.posX + obs.width &&
            this.player.posY <= obs.posY + obs.height
             
        )
      },

      isCollisionBoss(){
        
          return this.player.bullets.some(
            bul =>
              bul.posX + 6.14 >= this.boss.posX - 100 && 
              bul.posY + 6.14 >= this.boss.posY &&
              this.boss.posY + this.boss.height >= bul.posY && 
              this.boss.posX + this.boss.width >= bul.posX
          )
      },

      isCollisionBulletsZombies(){
        
        this.zombies.forEach((zom, idz) =>{
          this.player.bullets.forEach((bul , idb) =>{
                
                if (bul.posX + 6.14 >= zom.posX - 100 && 
                  bul.posY + 6.14 >= zom.posY &&
                  zom.posY + zom.height >= bul.posY && 
                  zom.posX + zom.width >= bul.posX
                  ){

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
                  this.player.posY + this.player.height - 10 <= obs.posY + obs.height  
                  // &&
                  // this.player.velY > 1
                  )
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
       
      gameOver(lost,win) {
        //Gameover detiene el juego.
        if (lost){
          alert("Has muerto PUTO PACO, pero has matado a " + this.killed)
        }else if(win){
          alert("Has ganado!! y has matado a " + this.killed)
        }
        clearInterval(this.interval);
       },

}