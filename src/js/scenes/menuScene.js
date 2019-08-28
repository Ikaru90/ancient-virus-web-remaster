import { SCENES } from './const';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.MENU })
  }
  create() {
    const fontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 40 };

    this.add.image(0, 0, 'background').setOrigin(0,0);
    this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 4, 'logo').setScale(0.6);

    const newGameButton = this.add.text(390, 300, 'Новая игра', fontStyle);
    const creatorsButton = this.add.text(395, 380, 'Создатели', fontStyle);
    this.sound.play('mainTheme');
  
    newGameButton.setInteractive();

    newGameButton.on('pointerover', () => {
      newGameButton.setColor('green');
    });
    newGameButton.on('pointerout', () => {
      newGameButton.setColor('white');
    });
    newGameButton.on('pointerup', () => {
      this.sound.stopAll();
      this.scene.switch(SCENES.LEVEL_ONE_INTRO);
      this.sound.play('music00');
    });

    creatorsButton.setInteractive();
    creatorsButton.on('pointerover', () => {
      creatorsButton.setColor('green');
    });
    creatorsButton.on('pointerout', () => {
      creatorsButton.setColor('white');
    });
    creatorsButton.on('pointerup', () => {
      this.scene.switch(SCENES.СREATORS);
    });
  }
}
