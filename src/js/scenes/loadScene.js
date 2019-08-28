import { SCENES } from './const';

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LOAD })
  }
  preload() {
    this.load.image('loading', './src/assets/system/loading.jpg');
    this.load.audio('main', './src/assets/music/menu.mp3');

    this.load.on('progress', (percent) => {
      console.log(percent);
    });

    this.load.on('complete', () => {
      console.log('done');
    });
  }
  create() {
    this.scene.start(SCENES.MENU);
  }
}
