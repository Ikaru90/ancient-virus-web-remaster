import { SCENES } from './const';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LOADING })
  }

  preload() {
    this.add.image(0, 0, 'loading').setOrigin(0,0);
    this.load.image('background', './assets/system/background.jpg');
    this.load.image('logo', './assets/system/logo.png');
    this.load.image('player', './assets/system/player.png');

    this.load.spritesheet('alenDeath', './assets/sprites/alenDeath.png', { frameWidth: 64, frameHeight: 64, endFrame: 15 });
    this.load.spritesheet('alienMove', './assets/sprites/alienMove.png', { frameWidth: 64, frameHeight: 64, endFrame: 31 });

    this.load.image('bullet', './assets/bullets/bullet.png');

    this.load.image('grass', './assets/textures/grass.jpg');

    this.load.audio('gunwav', './assets/snd/gun.wav');
    this.load.audio('kalashwav', './assets/snd/kalash.wav');
    this.load.audio('meetwav', './assets/snd/meet.wav');
    
    this.load.audio('mainTheme', './assets/music/menu.mp3');
    this.load.audio('music00', './assets/music/music00.mp3');
    // this.load.audio('music01', './assets/music/music01.mp3');
    // this.load.audio('music02', './assets/music/music02.mp3');
  }

  create() {
    // this.scene.switch(SCENES.MENU);
    this.scene.switch(SCENES.GAME);
  }
}
