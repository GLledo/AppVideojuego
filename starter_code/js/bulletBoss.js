class bulletBoss {
    constructor( ctx,y,x,y0,bossH,bossW,color) {
      this.ctx = ctx
      this.posX = x;
      this.posY = y;
      this.posY0 = y0
      
      this.bossH = bossH
      this.bossW = bossW

      this.radius = 5;
      this.velX = 10;
      this.velY = 1;
      this.color = color
  
      this.gravity = 0.25;
    }
  
    draw() {//Dibujamos las balas con un arco
      this.ctx.beginPath()
      this.ctx.fillStyle = this.color;
      this.ctx.arc(this.posX, this.posY + this.bossW - 200, this.radius + 50, 0, Math.PI * 2,this.color);
      this.ctx.fill();
      this.ctx.closePath();
      this.move()
    }
  
    move() {
      this.posX -= this.velX        
      this.posY += this.velY        //Añadimos velY linear para que caigan
      this.velY += this.gravity     //Modificamos la velY para generar el efecto gravedad
  
      if(this.posY <= this.bossH/2 + this.posY0){
        this.velY *= -1   //Si llegan al suelo invertimos su velocidad para que "reboten"
      }
    }
}