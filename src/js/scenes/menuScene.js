import { SCENES } from './const';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.MENU })
  }
  create() {
    this.add.image(0, 0, 'loading').setOrigin(0,0);
    this.add.text(0, 0, 'Hello World', { fontFamily: 'Verdana', fontSize: 40 });
  }
}
