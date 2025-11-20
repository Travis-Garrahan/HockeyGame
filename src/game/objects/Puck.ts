export default class Puck{
    private scene: Phaser.Scene;
    private graphics: Phaser.GameObjects.Graphics;

    x: number;
    y: number;
    radius: number;
    color: number; 

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        radius: number = 12,
        color: number = 0x000000
    ) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

        this.graphics = this.scene.add.graphics();
    }

    draw(): void {
        this.graphics.clear();
        this.graphics.fillStyle(this.color, 1);
        this.graphics.fillCircle(this.x, this.y, this.radius);
    }

    getBounds(){
        //TODO: return boundaries for collision detection
    }


}