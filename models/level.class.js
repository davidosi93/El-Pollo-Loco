class Level extends MoveAbleObject {
    enemies;
    clouds;
    backgroundObjects;
    bottle;
    coins;
    level_end_x = 3700;

    constructor(enemies, clouds, backgroundObjects, bottle, coins) {
        super().enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottle = bottle;
        this.coins = coins;
    }
}