import { SCENES } from './const';
import { Player } from '../objects/player';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME })
    this.player;
    this.keyboard;
    this.bullets;
    this.enemys;
    this.alien;
  }

  create() {
    this.bullets = this.physics.add.group({ immovable: true });
    this.enemys = this.physics.add.group({ immovable: true });

    for (let i = 0; i < 10; i ++ ) {
      for (let j = 0; j < 8; j ++ ) {
        this.add.image(i * 256, j * 256, 'grass').setOrigin(0,0);
      }
    }

    this.keyboard = this.input.keyboard.addKeys('A, D, W, S');

    this.player = new Player(this);

    const alenDeath = {
      key: 'alenDeath',
      frames: this.anims.generateFrameNumbers('alenDeath'),
      frameRate: 20
    };
    const alienMove = {
      key: 'alienMov',
      frames: this.anims.generateFrameNumbers('alienMove'),
      frameRate: 20,
      repeat: -1
    };

    this.anims.create(alenDeath);
    this.anims.create(alienMove);

    this.alien = this.physics.add.sprite(500, 500, 'alienMove').setOrigin(0, 0);
    
    this.alien.play('alienMov');

    this.enemys.add(this.alien);

    this.physics.world.addCollider(this.playerSprite, this.enemys, (playerSprite, enemy) => {
      console.log('enemys collided');
    });
    this.physics.world.addCollider(this.bullets, this.enemys, (bullet, enemy) => {
      bullet.destroy();
    });
  }

  update() {
    this.player.controlls();
  }
}
