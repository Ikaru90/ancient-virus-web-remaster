import { SCENES } from './const';
import { Player } from '../objects/player';
import { Alien } from '../objects/alien';
import { Interface } from '../objects/interface';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME })
    this.player;
    this.keyboard;
    this.bullets;
    this.enemys;
    this.alien;
    this.interface;
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

    this.player = new Player(this, 512, 384);
    this.interface = new Interface(this); 

    for(let i = 0; i < 5; i ++) {
      new Alien(this, 64 * i, 400);
    }

    this.physics.world.addCollider(this.player, this.enemys, (player, enemy) => {
      if (enemy.status === 'alive') {
        enemy.hit();
        if (player.HP <= 0) {
          player.destroy();
        }
      }
    });
    this.physics.world.addCollider(this.bullets, this.enemys, (bullet, enemy) => {
      if (enemy.status === 'alive') {
        bullet.destroy();
        enemy.HP -= 10;
        this.sound.play('meetwav', {volume: 0.2});
        if (enemy.HP <= 0) {
          enemy.play('alenDeath');
          enemy.status = 'death';
          this.player.XP += 20;
        }
      }
    });
  }

  update() {
    this.player.controlls();
    for(let i = 0; i < this.enemys.getChildren().length; i++) {
      this.enemys.getChildren()[i].moving();
    }
    this.interface.update();
  }
}
