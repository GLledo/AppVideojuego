class player  {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;
    
        this.image = new Image();
        this.image.src = "./images/quieto.png";
    
        this.width = 100;
        this.height = 140;

        this.posX = 40;
        this.posY0 = this.gameHeight * 0.95 - this.height; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.95 - this.height;

        this.keys = keys;
        this.velX = 8

        this.bullets = []; //Array de balas

        this.image.frames = 4; //Indicamos el numero de frames que tiene la imagen POSIBLEMENTE LE TENGAS QUE CAMBIAR
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

        this.setListeners();
    }

    draw(framesCounter) {
        // Hacer el if para comprobar que esta haciendo el player
        // this.ctx.drawImage(
        //   this.image,
        //   this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
        //   0, //Punto y donde empieza a recortar
        //   Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
        //   this.image.height, //Punto y donde termina de recortar
        //   this.posX,
        //   this.posY,
        //   this.width,
        //   this.height
        // )
        // this.animate(framesCounter); //Funcion que anima los frames.
        //Imagen de base
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.setListeners(framesCounter)

        //this.animate(frames); //Funcion que anima los frames.

        this.bullets.forEach(bullet => bullet.draw()); //El player dibuja las balas.
    }

    move() {
        let gravity = 0.4;
    
        if (this.posY <= this.posY0) {
          //Comprobamos que el player nunca sobrepase el suelo.
    
          this.posY += this.velY;
          this.velY += gravity;
        } else {
          //Si lo hace reseteamos posición y velocidad
          this.velY = 1;
          this.posY = this.posY0;
        }
    
        //this.bullets.forEach(bullet => bullet.move()); //Movemos las balas
      }
      shoot() {
        //Instanciamos nuevas balas
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height,this.width))
        
    }

    animate(framesCounter) {
      if (framesCounter % 5 == 0) {
        this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
        if (this.image.framesIndex > 3) {
          this.image.framesIndex = 0;
        }
      }
    }

    setListeners(frames) {
        document.onkeydown = e => {
          switch (e.keyCode) {
            case this.keys.TOP_KEY:
              if (this.posY >= this.posY0) {
                //Comprobamos que el player este en el suelo antes de saltar
                this.posY -= 30; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
                this.velY -= 10;
              }
              break;
            case this.keys.SPACE:
              this.shoot(); //Funcion de disparo
              break;
            case this.keys.RIGHT:
              //Movimiento
              this.posX += this.velX
              //pintar img andando
              // this.image.src="./images/Mover.png",
              // this.ctx.drawImage(
              //   this.image,
              //   this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
              //    0, //Punto y donde empieza a recortar
              //   Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
              //   this.image.height, //Punto y donde termina de recortar
              //   this.posX,
              //   this.posY,
              //   this.width,
              //   this.height)

              break;
            case this.keys.LEFT:
              this.posX -= this.velX
              break;
            
          }
        };
      }

}