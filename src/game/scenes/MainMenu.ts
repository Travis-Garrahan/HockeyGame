import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Text;
    title: GameObjects.Text;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        const howToSlapshotButton = this.add.container(300, 600);
        const bg = this.add.rectangle(0, 0, 200, 50, 0x6666ff);
        const text = this.add.text(0,0,"How to Slapshot", {color: "0xffffff"}).setOrigin(0.5);

        howToSlapshotButton.add([bg, text]);
        howToSlapshotButton.setSize(200,50).setInteractive();

        howToSlapshotButton.on("pointerdown", () => console.log("How to Slapshot clicked"));

        this.logo = this.add.text(512, 300, 'Quickshot Hockey', {
            fontFamily : 'Filepile', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.title = this.add.text(512, 460, 'Main Menu', {
            fontFamily : 'Filepile', fontSize: 42, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
