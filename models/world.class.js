class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    statusBarEndbossIcon = new StatusBarEndbossIcon();
    throwableObject = [];



    throw = true;
    endbossHurt = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkThrowObjects();
        this.checkEndbossHitBottle();
    }

    setWorld() {
        this.character.world = this;
    }

    /**
     * intervals to check the different possible collisions with enemies or pickupable objects
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkPickupBottle();
            this.checkPickupCoins();
        }, 3);
    }

    /**
     * interval to throw the bottles
     */
    checkThrowObjects() {
        setStoppableInterval(() => {
            this.throwObjects();
        }, 180);
    }

    /**
     * interval to check if the endboss got hit with a bottle
     */
    checkEndbossHitBottle() {
        setStoppableInterval(() => {
            this.checkEndboss();
        }, 60);
    }

    /**
     * checks if the character got hit by an enemy
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            this.checkEnemyKill(enemy);
        });
    }

    /**
     * checks if the character killed the smaller enemies
     * 
     * @param {every kind of the smaller enemies} enemy 
     */
    checkEnemyKill(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isAboveGround() && enemy instanceof Chicken && !this.character.isHurt() || this.character.isAboveGround() && enemy instanceof SmallChicken && !this.character.isHurt()) {
                enemy.kill();
                this.character.jump();
                chickenKillSound.play();
                setTimeout(() => { enemy.width = 0; }, 1000);
            } else {
                if (!this.character.isHurt() && !this.character.isDead()) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        }
    }

    /**
     * checks if the character have picked up the coins
     */
    checkPickupCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isCollected(coin)) {
                this.character.pickingUpCoins();
                this.statusBarCoins.setPercentage(this.character.coins);
                pickUp_Sound_Coin.play();
                this.level.coins.splice(i, 1);
            }
        });
    }

    /**
     * checks if the character have picked up the bottles
     */
    checkPickupBottle() {
        this.level.bottle.forEach((bottle, i) => {
            if (this.character.isCollected(bottle)) {
                this.character.pickingUp();
                this.statusBarBottle.setPercentage(this.character.bottles);
                pickUp_Sound.play();
                this.level.bottle.splice(i, 1);
            }
        });

    }

    /**
     * checks if the endboss got hit with a bottle
     */
    checkEndboss() {
        this.throwableObject.forEach((bottle) => {
            if (this.level.enemies[10].isColliding(bottle)) {
                this.level.enemies[10].endbossHurt();
                this.statusBarEndboss.setPercentage(this.level.enemies[10].energy);
                endbossHit_sound.play();
            }
        })
    }

    /**
     * function to let the character throw the bottles with the keyboard D
     */
    throwObjects() {
        if (this.keyboard.D && this.character.bottles != 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.statusBarBottle.setPercentage(this.character.bottles -= 1);
        } else if (this.character.bottles == 0) {
            return false;
        }

    }

    /**
     * functions to add playable objects to the map
     */
    addPlayableObjectsToMap() {
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObject);
    }

    /**
     * functions to add statusbars to the map
     */
    addStatusbarsToMap() {
        this.ctx.translate(-this.camera_x, 0);
        this.addStatusbarEndboss();
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoins);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * functions to add the statusbar of the endboss
     */
    addStatusbarEndboss() {
        if (this.level.enemies[10].haveReached) {
            this.addToMap(this.statusBarEndboss);
            this.addToMap(this.statusBarEndbossIcon);
        }
    }

    /**
     * draws the world into the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addPlayableObjectsToMap();
        this.addStatusbarsToMap();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * global function to add different objects into the canvas
     * 
     * @param {every kind of object inside the canvas} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * global function to add moveable objects into the canvas
     * 
     * @param {every kind of movable object inside the canvas} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawRedFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * function to to show images in an other direction
     * 
     * @param {every kind of movable object inside the canvas} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * funciton to show images into the previous direction
     * 
     * @param {every kind of movable object inside the canvas} mo
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}