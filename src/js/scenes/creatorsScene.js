import { SCENES } from './const';

export class CreatorsScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.СREATORS })
  }
  create() {
    const whiteFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 20 };
    const redFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 14, color: 'red' };

    this.add.image(0, 0, 'background').setOrigin(0,0);

    this.add.text(150, 100, 'Разработчики оригинала:', whiteFontStyle);
    this.add.text(150, 150, 'Тумас М.В.', whiteFontStyle);
    this.add.text(150, 200, 'Заоборный А.В.', whiteFontStyle);
    this.add.text(150, 250, 'Сергеев И.А.', whiteFontStyle);
    this.add.text(150, 300, 'Волковинский А.С.', whiteFontStyle);
    this.add.text(150, 350, 'группа 3ПР ( 2007-2008гг. )', whiteFontStyle);
    this.add.text(150, 450, 'Разработчики web версии:', whiteFontStyle);
    this.add.text(150, 500, 'Заоборный А.В. ( 2019г. )', whiteFontStyle);
    this.add.text(150, 550, 'Текстуры и музыка взяты из оригинальной версии', whiteFontStyle);
    this.add.text(150, 650, 'Для продолжения нажмите ПРОБЕЛ', redFontStyle);

    const keySPACE = this.scene.scene.input.keyboard.addKey('SPACE');
    keySPACE.on('down', () => {
      this.scene.switch(SCENES.MENU);
    });
  }
}
