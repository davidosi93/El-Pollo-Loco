class StatusBarBottle extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 40;
        this.height = 50;
        this.width = 160;
        this.setPercentage(0);
    }

    /**
     * global function to check which image has to be shown of the statusbar
     * 
     * @param {to get array number of the statusbar picture} percentage 
     */
    setPercentage(bottles) {
        this.bottles = bottles;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * 
     * @returns the number of the image of the statusbar
     */
    resolveImageIndex() {
        if (this.bottles == 0) {
            return 0;
        } else if (this.bottles == 1) {
            return 1;
        } else if (this.bottles == 2) {
            return 1;
        } else if (this.bottles == 3) {
            return 2;
        } else if (this.bottles == 4) {
            return 2;
        } else if (this.bottles == 5) {
            return 3;
        } else if (this.bottles == 6) {
            return 3;
        } else if (this.bottles == 7) {
            return 4;
        } else if (this.bottles == 8) {
            return 4;
        } else {
            return 5;
        }
    }
}