class boss {
    constructor(ctx, canvasW, gameH) {
        this.ctx = ctx
        this.width = 200
        this.height = 200

        this.posX = canvasW - this.width
  
        this.gameH = gameH
        this.posY = this.gameH * 0.98 - this.height //770

        this.health = 100

        this.image = new Image()
        this.image.src = "./images/Stefania.png"
        

        this.image.frames = 14; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

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
      }

      animate(framesCounter) {
        if (framesCounter % 10 == 0) {
          this.image.framesIndex++; 
          if (this.image.framesIndex > 12) {
            this.image.framesIndex = 0
          }
        }
      }

}