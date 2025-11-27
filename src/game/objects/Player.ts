export default class Player{
    private graphics: Phaser.GameObjects.Graphics;
    private sprite: Phaser.GameObjects.Sprite;

    // movement attributes
    private speed: number;
    private velocity: Phaser.Math.Vector2;
    private acceleration: number;
    private deceleration: number;


    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        textureKey: string,
        maxSpeed: number = 400,
        acceleration: number = 600,
        deceleration: number = 800
    ) {
        this.sprite = scene.physics.add.sprite(x, y, textureKey)
            .setCollideWorldBounds(true);
        this.speed = maxSpeed;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
        this.velocity = new Phaser.Math.Vector2(0,0);


    }

    init(): void
    {
        // makes sprite responsive to input
        this.sprite.setInteractive();
    }

    draw(): void 
    {
        this.graphics.clear();
    }

    move(inputDir: Phaser.Math.Vector2, delta: number): void
    {
        const deltaSec = delta / 1000;

        if (inputDir.length() > 0)
        {
            // accelerate in input direction
            const accel = inputDir.clone().scale(this.acceleration * deltaSec);
            this.velocity.add(accel);   
        } else { // decelerate if no input
            if(this.velocity.length() > 0){
                const decel = this.velocity.clone().normalize().scale(this.deceleration * deltaSec);
                if(decel.length() > this.velocity.length()){
                    this.velocity.set(0, 0);
                } else{
                    this.velocity.subtract(decel);
                }
            }
        }

        // cap max speed
        if(this.velocity.length() > this.speed){
            this.velocity = this.velocity.clone().normalize().scale(this.speed);
        }

        this.sprite.x += this.velocity.x * deltaSec;
        this.sprite.y += this.velocity.y * deltaSec;


    }

    getSprite()
    {
        return this.sprite;
    }


}