import { SCENES } from './const';

export class LevelIntroScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LEVEL_INTRO });
    this.keyboard;
  }

  create() {
    const whiteFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 20 };
    const redFontStyle = { fontFamily: 'Verdana', fontStyle: 'bold', fontSize: 14, color: 'red' };

    this.add.image(0, 0, 'background').setOrigin(0,0);

    this.add.text(75, 100, 'Сознание медленно возвращалось ко мне. Я открыл глаза:', whiteFontStyle);
    this.add.text(75, 150, 'криогенная камера была открыта и я глядел в потолок,', whiteFontStyle);
    this.add.text(75, 200, 'освещаемым почему-то красным светом. Вокруг стояла гробовая тишина.', whiteFontStyle);
    this.add.text(75, 250, 'На плохо слушающихся руках я вылез из камеры и пошёл искать', whiteFontStyle);
    this.add.text(75, 300, 'кого-нибудь из людей, чтобы сообщить о своём пробуждении.', whiteFontStyle);
    this.add.text(75, 350, 'Ни души. Дальше по коридору. В вестибюле я нашёл охраника, застывшего', whiteFontStyle);
    this.add.text(75, 400, 'на полу в неестественной позе. Он был мёртв. Просмотрев записи', whiteFontStyle);
    this.add.text(75, 450, 'с компьютера, стоящего рядом, я увидел, что лаборатория была атакована', whiteFontStyle);
    this.add.text(75, 500, 'неизвестными тварями. На всякий случай подняв пистолет охраника, я', whiteFontStyle);
    this.add.text(75, 550, 'вышел на улицу в поисках ответов...', whiteFontStyle);
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
