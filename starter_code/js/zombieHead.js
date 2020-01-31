class ZombieHead {
    constructor(ctx, w, h){
      this.ctx = ctx
      this.width = 100
      this.height = 100
  
      this.image = new Image()
      this.image.src = "./images/zombies-head.png"
  
      this.posX = 350
      this.posY = 0
  
      // this.velX = 5
    }
    draw() {
      //Dibujamos de momento solo un BG
      this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
      // this.ctx.drawImage(this.image, this.posX+this.width, this.posY, this.width, this.height)
    }
}