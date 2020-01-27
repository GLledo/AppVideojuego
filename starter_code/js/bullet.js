class Bullet {
  constructor( ctx, x, y, y0, playerH,playerW, color) {
    this.ctx = ctx
    this.posX = x;
    this.posY = y;
    this.posY0 = y0
    this.playerWidth = playerW
    this.playerHeight = playerH
    this.radius = 5;
    this.velX = 10;
    this.velY = 1;
    this.color = color

    this.gravity = 0.25;
  }

  draw() {        //DIbujamos las balas con un arco
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.posX + this.playerWidth -3, this.posY + this.playerHeight/3 - 13, this.radius + 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.move()
  }

  move() {
    this.posX += this.velX        
    // this.posY += this.velY        //Añadimos velY linear para que caigan
    // this.velY += this.gravity     //Modificamos la velY para generar el efecto gravedad

    // if(this.posY >= this.playerHeight + this.posY0){
    //   this.velY *= -1   //Si llegan al suelo invertimos su velocidad para que "reboten"
    // }
  }
}