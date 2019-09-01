import { SCENES } from './const';
import { Player } from '../objects/player';
import { Alien } from '../objects/alien';

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

    const alenDeath = {
      key: 'alenDeath',
      frames: this.anims.generateFrameNumbers('alenDeath'),
      frameRate: 30
    };
    const alienMove = {
      key: 'alienMov',
      frames: this.anims.generateFrameNumbers('alienMove'),
      frameRate: 30,
      repeat: -1
    };
    this.anims.create(alenDeath);
    this.anims.create(alienMove);

    this.player = new Player(this, 900, 430);

    for(let i = 0; i < 1; i ++) {
      new Alien(this, 64 * i, 400);
    }

    this.physics.world.addCollider(this.player, this.enemys, (player, enemy) => {
    });
    this.physics.world.addCollider(this.bullets, this.enemys, (bullet, enemy) => {
      if (enemy.status === 'alive') {
        bullet.destroy();
        enemy.HP -= 10;
        if (enemy.HP <= 0) {
          enemy.play('alenDeath');
          enemy.status = 'death';
        }
      }
    });
  }

  update() {
    this.player.controlls();
    for(let i = 0; i < this.enemys.getChildren().length; i++){
      this.enemys.getChildren()[i].attack();
    }
  }
}
