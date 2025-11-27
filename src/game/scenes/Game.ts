import Phaser from 'phaser';
import Puck from "../objects/Puck";
import Player from "../objects/Player"
import InputManager from '../objects/InputManager';

export class Game extends Phaser.Scene
{
    private puck!: Puck;
    private player: Player;
    private inputManager: InputManager;


    constructor ()
    {
        super('Game');
    }

    private aimLine!: Phaser.GameObjects.Graphics;

    create ()
    {
        this.puck = new Puck(this, 200, 200, 10, 0x000000);
        this.player = new Player(this, 100, 100, 'player', 400, 1200, 800);

        this.inputManager = new InputManager(this);

        this.aimLine = this.add.graphics();
    }

    handleShooting(){
        const puckSprite = this.puck.getSprite();
        const playerSprite = this.player.getSprite();
        const pointer = this.input.activePointer;

        const dist = Phaser.Math.Distance.Between(
            playerSprite.x, playerSprite.y,
            puckSprite.x, puckSprite.y
        );

        const canShoot = dist < 40;

        if(!canShoot) return;

        // direction puck should travel
        const aim = new Phaser.Math.Vector2(
            pointer.worldX - this.puck.x,
            pointer.worldY - this.puck.y
        ).normalize();

        if(pointer.leftButtonDown()){
            const power = 300;
            (this.puck.getSprite().body as Phaser.Physics.Arcade.Body)
                .setVelocity(
                    aim.x * power,
                    aim.y * power);
        }
    }

    handleAiming()
    {
        const puckSprite = this.puck.getSprite();
        const playerSprite = this.player.getSprite();
        const pointer = this.input.activePointer;

        // only show if player is close to puck
        const dist = Phaser.Math.Distance.Between(
            playerSprite.x, playerSprite.y,
            puckSprite.x, puckSprite.y
        );

        if (dist > 40){
            this.aimLine.clear();
            return;
        }

        const shotDir = new Phaser.Math.Vector2(pointer.worldX - puckSprite.x, pointer.worldY - puckSprite.y);

        // inverse vector for "pull back" line
        const pullBackDir = shotDir.clone().scale(100);

        // draw line
        this.aimLine.clear();
        this.aimLine.lineStyle(2, 0xff0000, 1);
        this.aimLine.beginPath();
        this.aimLine.moveTo(puckSprite.x, puckSprite.y);
        this.aimLine.lineTo(puckSprite.x + pullBackDir.x, puckSprite.y + pullBackDir.y);
        this.aimLine.strokePath();
    }

    rotatePlayerTowardPointer()
    {
        const playerSprite = this.player.getSprite();
        const pointer = this.input.activePointer;

        // vector from player to mouse
        const dx = pointer.worldX - playerSprite.x;
        const dy = pointer.worldY - playerSprite.y;

        const angle = Math.atan2(dy, dx);

        playerSprite.rotation = angle + Phaser.Math.DegToRad(90);
    }


    update(_time: number, delta: number)
    {
        const dir = this.inputManager.getDirection();
        this.player.move(dir, delta);

        this.handleAiming();
        this.handleShooting();
        this.rotatePlayerTowardPointer();
    }
}
