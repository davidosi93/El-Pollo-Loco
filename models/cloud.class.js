class Cloud extends MoveAbleObject {
    y = 0;
    width = 500;
    height = 400;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 3700;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}