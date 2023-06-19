class ThrowableObject extends MoveAbleObject {

    IMAGES_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROW);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 95;
        this.width = 65;
        this.otherDirection = otherDirection
        this.throw();
        this.animate();
    }

    /**
     * function to generate the direction of an thrown bottle
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setStoppableInterval(() => {
          if (this.otherDirection) {
            this.x -= 10;
          } else {
            this.otherDirection;
            this.x += 10;
          }
        }, 25)
      }

      /**
       * play the animations of an thrown bottle
       */
      animate() {
        setStoppableInterval(() => {
          if (world.level.enemies[10].endbossHit()) {
            this.playAnimation(this.IMAGES_SPLASH)
          } else {
            this.playAnimation(this.IMAGES_THROW)
          }
        }, 50);
      }
}