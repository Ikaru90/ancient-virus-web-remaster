import { SCENES } from './const';
import { Player } from '../objects/player';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME })
    this.player;
    this.keyboard;
  }

  create() {
    for (let i = 0; i < 10; i ++ ) {
      for (let j = 0; j < 8; j ++ ) {
        this.add.image(i * 256, j * 256, 'grass').setOrigin(0,0);
      }
    }

    this.keyboard = this.input.keyboard.addKeys('A, D, W, S');

    this.player = new Player(this);
  }

  update() {
    this.player.controlls();
  }
}
