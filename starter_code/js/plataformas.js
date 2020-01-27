class Plataforma {
    constructor(ctx, x, y, y0, playerH,playerW){
        this.ctx = ctx
        this.posX = x;
        this.posY = y;
        this.posY0 = y0
        this.playerWidth = playerW
        this.playerHeight = playerH
    }

    draw(){
        this.ctx.beginPath()
        this.ctx.strokeStyle = "black";
        this.ctx.fillRect(205,755,250,30);
        this.ctx.closePath();
    }
}