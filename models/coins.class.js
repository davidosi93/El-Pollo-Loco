class Coins extends MoveAbleObject {
    height = 120;
    width = 120;
    images_coins = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        right: 80,
        left: 40,
        top: 40,
        bottom: 80
    };

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.images_coins);
        this.x = 700 + Math.random() * 3000;
        this.y = 335 - Math.random() * 290;
        this.animateCoins();
    }

    /**
     * let the coins blink ( show bigger and smaller images )
     */
    animateCoins() {
        setStoppableInterval(() => {
            this.playAnimation(this.images_coins)
        }, 1000 / 3.5);
    }
}