class Lives {

    constructor(ctx,h,w){
        this.ctx = ctx

        this.image = new Image()
        this.image.src = "./images/hearth.png"

        this.gameH = h
        this.gameW = w
        this.height = 100
        this.width = 100

        this.posX =0
        this.posY = 0 
    }

    draw(lives){
            
        if(lives > 200 && lives <= 300){
            this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
            this.ctx.drawImage(this.image, this.posX + 100, this.posY, this.width, this.height)
            this.ctx.drawImage(this.image, this.posX + 200, this.posY, this.width, this.height)
        }else if (lives > 100 && lives <= 200){
            this.ctx.drawImage(this.image, this.posX , this.posY, this.width, this.height)
            this.ctx.drawImage(this.image, this.posX + 100, this.posY, this.width, this.height)
        }else if(lives > 0 && lives <= 100){
            this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        }

    }


}