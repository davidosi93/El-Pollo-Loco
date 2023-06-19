class MoveAbleObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bottles = 0;
    coins = 0;
    lastHit = 0;
    lastPickup = 0;
    lastMove = 0;
    lastHitEndboss = 0;

    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    };

    /**
     * let objects fall again to the ground
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

    /**
     * 
     * @returns that the bottles can not fly higher than 80px on the Y scale
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 80;
        }
    }

    /**
     * let objects move to the right
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * let objects move to the left
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * global function for the animation of different objects
     * 
     * @param {let the choosen images in an array play} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * let an object jump not higher than 30px
     */
    jump() {
        this.speedY = 27;
    }

    /**
     * the function to check if the character is hitting any enemy
     * 
     * @param {different objects that can hit the character} mo 
     * @returns 
     */
    isColliding(mo) {
        if (!mo.energy <= 0) {
            return (this.x + this.width) - this.offset.right >= (mo.x + mo.offset.left) &&
                (this.x + this.offset.left) <= (mo.x + mo.width) - mo.offset.right &&
                (this.y + this.height) - this.offset.bottom >= (mo.y - mo.offset.top) &&
                (this.y + this.offset.top) <= (mo.y + mo.height) - mo.offset.bottom;
        }
    }

    /**
     * the function to check if the character is collecting any pickup object
     * 
     * @param {different objects that the character can pickup} mo 
     * @returns 
     */
    isCollected(mo) {
        return (this.x + this.width) - this.offset.right >= (mo.x + mo.offset.left) &&
            (this.x + this.offset.left) <= (mo.x + mo.width) - mo.offset.right &&
            (this.y + this.height) - this.offset.bottom >= (mo.y - mo.offset.top) &&
            (this.y + this.offset.top) <= (mo.y + mo.height) - mo.offset.bottom;
    }

    /**
     * reduce the energy level of the character when hit with enemy
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * 
     * @returns the last time the character got hit and lost energy
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * 
     * @returns the lowest possible energy of an moveable object to check if its dead
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * increase the sum of the picked up bottles
     */
    pickingUp() {
        this.bottles += 1;
        if (this.bottles > 10) {
            this.bottles = 10;
        } else {
            this.lastPickup = new Date().getTime();
        }
    }

    /**
     * increase the sum of the picked up coins
     */
    pickingUpCoins() {
        this.coins += 1;
        if (this.coins < 0) {
            this.coins = 0;
        } else {
            this.lastPickup = new Date().getTime();
        }
    }

    /**
     * 
     * @returns the last time when an pickupable object got picked up
     */
    isPickedUp() {
        let timepassed = new Date().getTime() - this.lastPickup;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * to get energy level of the smaller enemys to 0 after one hit and let them die
     */
    kill() {
        this.energy = 0;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * 
     * @returns to check when the character hasn´t moved for the last time
     */
    idle() {
        let timepassedIdle = new Date().getTime() - this.lastMove;
        timepassedIdle = timepassedIdle / 1000;
        return timepassedIdle;
    }

    /**
     * to check time when the character had his last move
     */
    lastMovement() {
        this.lastMove = new Date().getTime();
    }

    /**
     * to reduce the energy level of the endboss when hit
     */
    endbossHurt() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    /**
     * 
     * @returns the last time the endboss got hit and lost energy
     */
    endbossHit() {
        let timepassed = new Date().getTime() - this.lastHitEndboss;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * the last time when endboss got hit
     */
    lastEndbossHit() {
        this.lastHitEndboss = new Date().getTime();
    }
}
