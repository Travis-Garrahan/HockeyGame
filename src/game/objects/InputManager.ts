import Phaser from "phaser";

export default class Input{
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keys: {[key: string] : Phaser.Input.Keyboard.Key};

    constructor(scene: Phaser.Scene){
        if(!scene.input.keyboard){
            throw new Error("Keyboard input not available!");
        }
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keys = {
            W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        }
    }
    
    getDirection(): Phaser.Math.Vector2 {
        const dir = new Phaser.Math.Vector2(0,0);

        if(this.cursors.left.isDown  || this.keys.A.isDown) dir.x = -1;
        if(this.cursors.right.isDown  || this.keys.D.isDown) dir.x = 1;
        if(this.cursors.up.isDown  || this.keys.W.isDown) dir.y = -1;
        if(this.cursors.down.isDown  || this.keys.S.isDown) dir.y = 1;

        return dir.normalize();
    }

}