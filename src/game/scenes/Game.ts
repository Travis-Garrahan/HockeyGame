import { Scene } from 'phaser';
import Puck from "../objects/Puck";
import Player from "../objects/Player"
import InputManager from '../objects/InputManager';

export class Game extends Scene
{
    private puck!: Puck;
    private player: Player;
    private inputManager: InputManager;


    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.puck = new Puck(this, 200, 200, 10, 0x000000);
        this.puck.draw();
        this.player = new Player(this, 100, 100, 'player', 400, 1200, 800);
        this.inputManager = new InputManager(this);
    }

    update(time: number, delta: number)
    {
        const dir = this.inputManager.getDirection();
        this.player.move(dir, delta); 
    }
}
