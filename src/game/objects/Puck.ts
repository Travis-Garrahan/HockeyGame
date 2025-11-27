export default class Puck{
    private body: Phaser.Physics.Arcade.Body;
    private sprite: Phaser.GameObjects.Arc;

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

        this.sprite = scene.add.circle(x, y, radius, color) as Phaser.GameObjects.Arc;
        scene.physics.add.existing(this.sprite, false);

        this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.4);
        this.body.setDrag(100, 100);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    getSprite(){
        return this.sprite;
    }

}