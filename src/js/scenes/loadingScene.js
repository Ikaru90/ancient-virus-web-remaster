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
    this.load.image('indicator', './assets/system/indicator.bmp');
    this.load.image('panel', './assets/system/panel.bmp');
    this.load.image('inventory', './assets/system/inventory.bmp');
    this.load.spritesheet('levelUp', './assets/system/levelUp.png', { frameWidth: 250, frameHeight: 250, endFrame: 15 });

    this.load.spritesheet('alenDeath', './assets/sprites/alenDeath.png', { frameWidth: 64, frameHeight: 64, endFrame: 15 });
    this.load.spritesheet('alienMove', './assets/sprites/alienMove.png', { frameWidth: 64, frameHeight: 64, endFrame: 31 });
    this.load.spritesheet('zombieDeath', './assets/sprites/zombieDeath.png', { frameWidth: 64, frameHeight: 64, endFrame: 15 });
    this.load.spritesheet('zombieMove', './assets/sprites/zombieMove.png', { frameWidth: 64, frameHeight: 64, endFrame: 31 });
    this.load.spritesheet('spiderDeath', './assets/sprites/spiderDeath.png', { frameWidth: 64, frameHeight: 64, endFrame: 15 });
    this.load.spritesheet('spiderMove', './assets/sprites/spiderMove.png', { frameWidth: 64, frameHeight: 64, endFrame: 15 });
    this.load.spritesheet('lizardDeath', './assets/sprites/lizardDeath.png', { frameWidth: 64, frameHeight: 64, endFrame: 15 });
    this.load.spritesheet('lizardMove', './assets/sprites/lizardMove.png', { frameWidth: 64, frameHeight: 64, endFrame: 15 });
    this.load.spritesheet('iceMove', './assets/sprites/iceMove.png', { frameWidth: 75, frameHeight: 75, endFrame: 23 });
    this.load.spritesheet('boom', './assets/bullets/boom.png', { frameWidth: 200, frameHeight: 200, endFrame: 23 });
    this.load.spritesheet('ion', './assets/bullets/ion.png', { frameWidth: 250, frameHeight: 250, endFrame: 20 });
    this.load.spritesheet('plasma', './assets/bullets/plasma.png', { frameWidth: 250, frameHeight: 250, endFrame: 16 });

    this.load.image('bullet', './assets/bullets/bullet.png');
    this.load.image('bullet2', './assets/bullets/bullet2.png');
    this.load.image('bullet3', './assets/bullets/bullet3.png');
    this.load.image('bullet4', './assets/bullets/bullet4.png');

    this.load.image('empty', './assets/weapons/empty.png');
    this.load.image('gun', './assets/weapons/gun.png');
    this.load.image('uzi', './assets/weapons/uzi.png');
    this.load.image('drop_uzi', './assets/weapons/drop_uzi.png');
    this.load.image('kalashnikov', './assets/weapons/kalashnikov.png');
    this.load.image('drop_kalashnikov', './assets/weapons/drop_kalashnikov.png');
    this.load.image('minigun', './assets/weapons/minigun.png');
    this.load.image('drop_minigun', './assets/weapons/drop_minigun.png');
    this.load.image('shotgun', './assets/weapons/shotgun.png');
    this.load.image('drop_shotgun', './assets/weapons/drop_shotgun.png');    
    this.load.image('awp', './assets/weapons/awp.png');
    this.load.image('drop_awp', './assets/weapons/drop_awp.png');
    this.load.image('rocketLauncher', './assets/weapons/rocketLauncher.png');
    this.load.image('drop_rocketLauncher', './assets/weapons/drop_rocketLauncher.png');
    this.load.image('iongun', './assets/weapons/iongun.png');
    this.load.image('drop_iongun', './assets/weapons/drop_iongun.png');
    this.load.image('plasmagun', './assets/weapons/plasmagun.png');
    this.load.image('drop_plasmagun', './assets/weapons/drop_plasmagun.png');
    this.load.image('rocketminigun', './assets/weapons/rocketminigun.png');
    this.load.image('drop_rocketminigun', './assets/weapons/drop_rocketminigun.png');

    this.load.image('grass', './assets/textures/grass.jpg');

    this.load.audio('gunwav', './assets/snd/gun.wav');
    this.load.audio('kalashnikovwav', './assets/snd/kalashnikov.wav');
    this.load.audio('meetwav', './assets/snd/meet.wav');
    this.load.audio('awpwav', './assets/snd/awp.wav');
    this.load.audio('drobashwav', './assets/snd/drobash.wav');
    this.load.audio('explodewav', './assets/snd/explode.wav');
    this.load.audio('ion1wav', './assets/snd/ion1.wav');
    this.load.audio('ion2wav', './assets/snd/ion2.wav');
    this.load.audio('machinegunwav', './assets/snd/machinegun.wav');
    this.load.audio('rocketwav', './assets/snd/rocket.wav');
    this.load.audio('uziwav', './assets/snd/uzi.wav');

    // this.load.audio('mainTheme', './assets/music/menu.mp3');
    // this.load.audio('music00', './assets/music/music00.mp3');
    // this.load.audio('music01', './assets/music/music01.mp3');
    // this.load.audio('music02', './assets/music/music02.mp3');
  }

  create() {
    // this.scene.switch(SCENES.MENU);
    this.scene.switch(SCENES.GAME);
  }
}
