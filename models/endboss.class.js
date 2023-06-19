class Endboss extends MoveAbleObject {
    height = 460;
    width = 300;
    y = 1;
    haveReached = false;

    offset = {
        right: 270,
        left: 60,
        top: 80,
        bottom: 80
    };

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4050;
        this.speed = 6;
        this.animate();
    }

    /**
     * 
     * @returns the if statement for the endboss to start walking
     */
    reached() {
        return world.character.x > this.x - 700
    }

    /**
     * play the animations of the endboss
     */
    animate() {
        setStoppableInterval(() => {
            if (this.isDead()) {
                this.endbossIsDead();
            } else if (this.endbossHit()) {
                this.endbossIsHurt();
            } else if (this.reached()) {
                this.endbossStartWalking();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 99);
    }

    /**
     * play the dead animation
     */
    endbossIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        youWon();
        endbossHit_sound.pause();
        win_sound.play();
    }

    /**
     * play the hrt animation
     */
    endbossIsHurt() {
        setTimeout(() => {
            this.moveLeft();
        }, 2000);
        this.playAnimation(this.IMAGES_HURT);
        this.speed += 0.04;
    }

    /**
     * play the walk animation
     */
    endbossStartWalking() {
        this.haveReached = true;
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
    }
}