    class Music{
        constructor(src){

            this.audio = new Audio(src)
        }
        play(){
            this.audio.play()
        }
        stop()  {
            this.audio.stop()
        }
    }