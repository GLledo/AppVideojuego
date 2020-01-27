class Zombie {
    constructor(ctx, canvasW, playerY0,  playerH) {
        this.ctx = ctx
        this.width = 100
        this.height = 150
        this.velX = 1
        this.posX = canvasW
        //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.
        this.posY = playerY0 + playerH - this.height
        this.health = 100
        this.image = new Image()
        this.image.src = "./images/Zombies.png"

        this.image.frames = 8; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

      }

      draw(framesCounter) {
        this.ctx.drawImage(
          this.image,
          this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
          0, //Punto y donde empieza a recortar
          Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
          this.image.height, //Punto y donde termina de recortar
          this.posX,
          this.posY,
          this.width,
          this.height
        )

        this.animate(framesCounter); //Funcion que anima los frames.
      }

      animate(framesCounter) {
        if (framesCounter % 8 == 0) {
          this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
          if (this.image.framesIndex > 7) {
            this.image.framesIndex = 0
          }
        }
      }

      move() {
        // if(this.posx <= this.canvasW){
        //   this.velX *= -1   //Si llegan al suelo invertimos su velocidad para que "reboten"
        // }
        this.posX -= this.velX
      }

      life(){
        this.health -= 10
        if (this.health <= 0){
          return true
        }else{
          return false
        }
      }
      
}