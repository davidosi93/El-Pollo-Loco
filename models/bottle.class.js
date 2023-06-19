class Bottle extends MoveAbleObject {
    height = 100;
    width = 80;
    y = 330;

    IMAGE =[
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ]

    offset = {
        right: 50,
        left: 30,
        top: 30,
        bottom: 50
    };

    constructor() {
        super().loadImage(this.IMAGE);
        this.x = 700 + Math.random() * 3000;
    }
}