class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * global function to load one image
     * 
     * @param {source of the image} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * global function to load multiple images
     * 
     * @param {source of all images in an array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * global function to draw multiple objects for the map
     * 
     * @param {for the objects} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * draw the hitboxes of the moveable Objects
     * 
     * @param {for the objects} ctx 
     */
    drawRedFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken ||
            this instanceof Bottle || this instanceof Bottle1 || this instanceof Coins || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
        }
    }
}