import { SCENES } from './const';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PRELOAD })
  }

  preload() {
    this.load.image('loading', './assets/system/loading.jpg');
  }

  create() {
    this.scene.switch(SCENES.LOADING);
  }
}
