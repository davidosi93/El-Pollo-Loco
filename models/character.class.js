class Character extends MoveAbleObject {
    height = 350;
    width = 180;
    y = 0;
    speed = 3;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    offset = {
        right: 65,
        left: 20,
        top: 80,
        bottom: 40
    };

    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
    }

    /**
     * set the intervalls for the movements and animations
     */
    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacter(), 90);
    }

    /**
     * this function can move the character right, left and jump up
     */
    moveCharacter() {
        walking_sound.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * 
     * @returns the if statement to move the character to the right direction
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * move the character to the right direction
     */
    moveRight() {
        super.moveRight();
        walking_sound.play();
        this.otherDirection = false;
    }

    /**
     * 
     * @returns the if statement to move the character to the left direction
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * move the character to the left direction
     */
    moveLeft() {
        super.moveLeft();
        walking_sound.play();
        this.otherDirection = true;
    }

    /**
     * 
     * @returns the if statement to let the character jump up
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * this function let play the animations of the character with images
     */
    playCharacter() {
        if (this.isDead() || this.characterIsBehindEndboss()) {
            this.characterIsDead();
        } else if (this.isHurt()) {
            this.characterIsHurt();
        } else if (this.isAboveGround()) {
            this.characterIsJumping();
        } else if (this.keyboardArrowsTyped()) {
            this.characterIsWalking();
        } else if (this.idle() > 15) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * 
     * @returns the x of the character during the fight with the endboss
     */
    characterIsBehindEndboss() {
        return this.x - 220 > this.world.level.enemies[10].x;
    }

    /**
     * play the dead animation
     */
    characterIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        youLost();
        lost_sound.play();
    }

    /**
     * play the hurt animation
     */
    characterIsHurt() {
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * play the jump animation
     */
    characterIsJumping() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.lastMovement();

    }

    /**
     * 
     * @returns the if statement to play the walking images
     */
    keyboardArrowsTyped() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * play the waling animations
     */
    characterIsWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.lastMovement();
    }
}


