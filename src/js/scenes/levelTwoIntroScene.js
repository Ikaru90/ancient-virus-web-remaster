import { SCENES } from './const';

export class LevelTwoIntroScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LEVEL_TWO_INTRO });
    this.keyboardTwo;
  }

  create() {
    const whiteFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 20 };
    const redFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 14, color: 'red' };

    this.add.image(0, 0, 'background').setOrigin(0,0);

    this.add.text(75, 25, 'Уровень 2', whiteFontStyle);
    this.add.text(75, 100, 'Откуда взялись эти ужасные твари, я не знал. Яростно отстреливаясь,', whiteFontStyle);
    this.add.text(75, 150, 'я шёл в надежде встретить помощь. Но пока вокруг были лишь', whiteFontStyle);
    this.add.text(75, 200, 'равнины и непонятные твари, пытающиеся меня сожрать', whiteFontStyle);
    this.add.text(100, 650, 'Для продолжения нажмите ПРОБЕЛ', redFontStyle);

    this.keyboardTwo = this.input.keyboard.addKeys('SPACE');
  }

  update() {
    if (this.keyboardTwo.SPACE.isDown) {
      this.scene.switch(SCENES.GAME);
    };
  }
}
