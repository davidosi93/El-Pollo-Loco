let level1;


function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss()

        ],

        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -779),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -779),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -779),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -779),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 779),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 779),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 779),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 779),

            new BackgroundObject('img/5_background/layers/air.png', 779 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 779 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 779 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 779 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 779 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 779 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 779 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 779 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 779 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 779 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 779 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 779 * 4),

            new BackgroundObject('img/5_background/layers/air.png', 779 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 779 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 779 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 779 * 5)
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle1(),
            new Bottle1(),
            new Bottle1(),
            new Bottle1(),
            new Bottle1()
        ],
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ]
    );
}