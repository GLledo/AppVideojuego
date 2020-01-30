class Boom {
    constructor(ctx, w, h){
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "./images/explo.png"

        this.width = 130
        this.height = 140

        this.image.frames = 12 
        this.image.framesIndex = 0 
    }

    draw(){

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

            this.animate(framesCounter); //Funcion que anima los frames.
    }

    animate(framesCounter) {
        if (framesCounter % 10 == 0) {
          this.image.framesIndex++; 
          if (this.image.framesIndex > 11) {
            this.image.framesIndex = resetIndex;
          }
        }
      }

    move(){
        
    }
}