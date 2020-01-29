class boss {
    constructor(ctx, canvasW, gameH) {
        this.ctx = ctx
        this.width = 200
        this.height = 200

        this.posX = canvasW - this.width
  
        this.gameH = gameH
        this.posY = this.gameH * 0.98 - this.height //770
        this.velY = 2

        this.health = 100

        this.image = new Image()
        this.image.src = "./images/Stefania.png"
        
        this.bulletBoss = []

        this.image.frames = 14; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

        this.health = 1000
        
      }

      draw(framesCounter){

            this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            this.image.height, //Punto y donde termina de recortar
            this.posX,
            this.posY,
            this.width,
            this.height)

            this.animate(framesCounter);

            this.bulletBoss.forEach(bullet => bullet.draw())
      }

      animate(framesCounter) {
        if (framesCounter % 30 == 0) {
          this.image.framesIndex++; 
          if (this.image.framesIndex > 12) {
            this.image.framesIndex = 0
          }
        }
      }

      move(framesCounter){
        this.posY += this.velY

        if(this.posY >= this.gameH - this.height){
          
          this.velY *= -1
        }else if(this.posY <= 0){
          this.velY *= -1
        }
        this.bulletBoss.forEach(bullet => bullet.move())
      }

      life(dmg,framesCounter){
        
        if (framesCounter % 10 == 0){
          this.health -= dmg
          if (this.health <= 0){
            return true
          }else{
            return false
          }
        }
      }

      generateBulletBoss(framesCounter){
        console.log(framesCounter)
        if (framesCounter % 120 == 0)this.bulletBoss.push(new bulletBoss(this.ctx, this.posX, this.posY, this.posY0, this.height,this.width,this.gameH))
         
      }
}