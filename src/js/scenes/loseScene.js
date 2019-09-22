import { SCENES } from './const';

export class LoseScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LOSE });
    this.keyboard;
  }

  create() {
    const whiteFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 20 };
    const redFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 14, color: 'red' };

    this.add.image(0, 0, 'background').setOrigin(0,0);

    this.add.text(75, 25, 'Ты проиграл', whiteFontStyle);
    this.add.text(100, 650, 'Для продолжения нажмите ПРОБЕЛ', redFontStyle);

    this.keyboard = this.input.keyboard.addKeys('SPACE');
  }

  update() {
    if (this.keyboard.SPACE.isDown) {
      this.sound.stopAll();
      this.sound.play('mainTheme', {volume: 0.2});
      this.scene.restart();
      this.scene.switch(SCENES.MENU);
    };
  }
}
