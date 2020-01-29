class bulletBoss {
    constructor( ctx, x, y, y0, bossH,bossW,gameH) {
      this.ctx = ctx
      this.posX = x;
      this.posY = y;
      this.posY0 = y0
      this.width = 100
      this.height = 100
      this.gameH = gameH
      
      this.bossH = bossH
      this.bossW = bossW

     
      this.velX = 10;
      this.velY = 1;
    

      this.image = new Image()
      this.image.src = "./images/bulletBoss.png"
  
      this.gravity = 0.25;
    }
  
    draw() {//Dibujamos las balas con un arco
      // this.ctx.beginPath()
      // this.ctx.fillStyle = this.color;
      // this.ctx.arc(this.posX, this.posY + this.bossW - 200, this.radius + 10, 0, Math.PI * 2,this.color);
      // this.ctx.fill();
      // this.ctx.closePath();
      // this.move()

      this.ctx.drawImage(this.image, this.posX - this.width, this.posY + this.bossW - 150, this.width, this.height)
      //this.move()
    }
  
    move() {
      this.posX -= this.velX        
      this.posY += this.velY //Añadimos velY linear para que caigan
      this.velY += this.gravity//Modificamos la velY para generar el efecto gravedad
  
      if(this.posY >= this.gameH - this.height){
        this.velY *= -1
      }
    }
}