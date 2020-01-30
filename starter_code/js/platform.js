class Platform {
    constructor(ctx, playerH,playerW,h,w,x,y){
        
        this.ctx = ctx
        this.posX = x;
        this.posY = y;

        this.width = w
        this.height = h

        this.playerWidth = playerW
        this.playerHeight = playerH

        this.image = new Image()
        this.image.src = "./images/platform.png"
    }

    draw(){
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
}