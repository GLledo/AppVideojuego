class player  {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h
    
        this.image = new Image()
        this.image.src = "./images/marco.png"
    
        this.width = 130
        this.height = 140
        this.velY = 10
        this.canJump = true

        this.posX = 40
        this.posY0 = this.gameHeight * 0.95 - this.height; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.95 - this.height;

        this.keys = keys
        this.velX = 8
        this.directions = {
          top: false,
          right: false,
          left: false,
          space: false
        }

        this.health = 100

        this.bullets = [] //Array de balas

        this.image.frames = 9 //Indicamos el numero de frames que tiene la imagen POSIBLEMENTE LE TENGAS QUE CAMBIAR
        this.image.framesIndex = 0 //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

        this.setListeners()
    }

    draw() {
      
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
        this.bullets.forEach(bullet => bullet.draw()) //El player dibuja las balas.
    }

    move(framesCounter) {

      console.log(this.posY0, this.posY)
     
        let gravity = 0.4;
        console.log(this.gameWidth)
        if (this.directions.right && this.posX + this.width - 50 < this.gameWidth){
 
          this.posX += this.velX
            this.animate(framesCounter,6,0)
   
        }
        if (this.directions.left === true){
          if (this.posX >= 0 ){
            this.posX -= this.velX
            this.animate(framesCounter,6,0)
          }
        }
        if(this.directions.space === true){
          if(framesCounter % 10 == 0) this.shoot(); //Funcion de disparo
          this.animate(framesCounter,8,7)
        }



        // if (this.posY >= this.posY0) {
          //   //Comprobamos que el player este en el suelo antes de saltar
          //   this.posY -= this.velY; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
          //   this.velY -= 10; 
          // }
         
        if(this.directions.top && this.canJump) {
          this.canJump = false
          this.posY  -= this.velY
          this.velY -= 12
        }


        if (this.posY <= this.posY0) {
          //Comprobamos que el player nunca sobrepase el suelo.
          this.posY += this.velY
          this.velY += gravity 
        } else {
          //Si lo hace reseteamos posición y velocidad
          this.canJump = true
          this.velY = 1;
          this.posY = this.posY0;
        }
    
        //this.bullets.forEach(bullet => bullet.move()); //Movemos las balas
    }

    shoot() {
        //Instanciamos nuevas balas
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.posY0, this.height,this.width, "orange"))
        
    }

    animate(framesCounter,num,resetIndex) {
      if (framesCounter % 10 == 0) {
        this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
        if (this.image.framesIndex > num) {
          this.image.framesIndex = resetIndex;
        }
      }
    }

    setListeners() {
        document.onkeydown = e => {
          switch (e.keyCode) {
            case this.keys.TOP_KEY:
              this.directions.top = true
              this.move()
              // if (this.posY >= this.posY0) {
              //   //Comprobamos que el player este en el suelo antes de saltar
              //   this.posY -= this.velY; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
              //   this.velY -= 10; 
              // }
              break;
            case this.keys.SPACE:
              this.directions.space = true
              this.image.framesIndex = 7
              break;
            case this.keys.RIGHT:
              this.directions.right = true
              //Movimiento
              break;
            case this.keys.LEFT:
              this.directions.left = true
              break;
            
          }
        };
        document.onkeyup = e => {
          switch (e.keyCode){
            case this.keys.TOP_KEY:
              this.directions.top = false
              break;
            case this.keys.RIGHT:
              this.directions.right = false
              break;
            case this.keys.LEFT:
              this.directions.left = false
              break;
            case this.keys.SPACE:
              this.directions.space = false
              this.image.framesIndex = 0
              break
          }
        }
      }
      
      life(dmg, framesCounter){
        console.log(this.health)
        if (framesCounter % 10 == 0){
          this.health -= dmg
        if (this.health <= 0){
          return true
        }else{
          return false
        }
        }
      }
}