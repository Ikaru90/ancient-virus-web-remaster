import { SCENES } from './const';

export class LevelNineIntroScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LEVEL_NINE_INTRO });
    this.keyboard;
  }

  create() {
    const whiteFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 20 };
    const redFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 14, color: 'red' };

    this.add.image(0, 0, 'background').setOrigin(0,0);

    this.add.text(75, 25, 'Уровень 9', whiteFontStyle);
    this.add.text(100, 650, 'Для продолжения нажмите ПРОБЕЛ', redFontStyle);

    this.keyboard = this.input.keyboard.addKeys('SPACE');
  }

  update() {
    if (this.keyboard.SPACE.isDown) {
      this.scene.restart();
      this.scene.switch(SCENES.GAME);
    };
  }
}
