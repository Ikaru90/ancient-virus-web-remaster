import { SCENES } from './const';
import { Player } from '../objects/player';
import { Monster } from '../objects/monster';
import { Drop } from '../objects/drop';
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
    this.input.setDefaultCursor('url(assets/system/cursor.png), pointer');
    this.bullets = this.physics.add.group({ immovable: true });
    this.enemys = this.physics.add.group({ immovable: true });
    this.drop = this.physics.add.group({ immovable: true });

    for (let i = 0; i < 10; i ++ ) {
      for (let j = 0; j < 8; j ++ ) {
        this.add.image(i * 256, j * 256, 'grass').setOrigin(0,0).setDepth(-1);
      }
    }

    this.keyboard = this.input.keyboard.addKeys('A, D, W, S, Q');

    const alenDeath = {
      key: 'alenDeath',
      frames: this.anims.generateFrameNumbers('alenDeath'),
      frameRate: 30
    };
    const alienMove = {
      key: 'alienMove',
      frames: this.anims.generateFrameNumbers('alienMove'),
      frameRate: 30,
      repeat: -1
    };
    const zombieDeath = {
      key: 'zombieDeath',
      frames: this.anims.generateFrameNumbers('zombieDeath'),
      frameRate: 30
    };
    const zombieMove = {
      key: 'zombieMove',
      frames: this.anims.generateFrameNumbers('zombieMove'),
      frameRate: 30,
      repeat: -1
    };
    const spiderDeath = {
      key: 'spiderDeath',
      frames: this.anims.generateFrameNumbers('spiderDeath'),
      frameRate: 30
    };
    const spiderMove = {
      key: 'spiderMove',
      frames: this.anims.generateFrameNumbers('spiderMove'),
      frameRate: 30,
      repeat: -1
    };
    const lizardDeath = {
      key: 'lizardDeath',
      frames: this.anims.generateFrameNumbers('lizardDeath'),
      frameRate: 30
    };
    const lizardMove = {
      key: 'lizardMove',
      frames: this.anims.generateFrameNumbers('lizardMove'),
      frameRate: 30,
      repeat: -1
    };
    const iceMove = {
      key: 'iceMove',
      frames: this.anims.generateFrameNumbers('iceMove'),
      frameRate: 30,
      repeat: -1
    };
    const levelUp = {
      key: 'levelUp',
      frames: this.anims.generateFrameNumbers('levelUp'),
      frameRate: 30
    };
    this.anims.create(alenDeath); 
    this.anims.create(alienMove);
    this.anims.create(zombieDeath); 
    this.anims.create(zombieMove);
    this.anims.create(spiderDeath); 
    this.anims.create(spiderMove);
    this.anims.create(lizardDeath); 
    this.anims.create(lizardMove);
    this.anims.create(iceMove);
    this.anims.create(levelUp);

    this.player = new Player(this, 512, 384);
    this.interface = new Interface(this);

    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 4; j ++) {
        const mob = Math.random() > 0.5 ?
          Math.random() > 0.5 ? 'iceMove' : 'zombieMove' :
          Math.random() > 0.5 ? 'lizardMove' : 'spiderMove';
        new Monster(this, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, mob);
      }
    }

    this.physics.world.addCollider(this.player, this.drop, (_player, drop) => {
      this.interface.addNewItem(drop);
      drop.destroy();
    });
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
        enemy.HP -= this.player.damage;
        this.sound.play('meetwav', {volume: 0.2});
        if (enemy.HP <= 0) {
          if (enemy.texture.key === 'alienMove') {
            enemy.play('alenDeath');
          }
          if (enemy.texture.key === 'zombieMove') {
            enemy.play('zombieDeath');
          }
          if (enemy.texture.key === 'spiderMove') {
            enemy.play('spiderDeath');
          }
          if (enemy.texture.key === 'lizardMove') {
            enemy.play('lizardDeath');
          }
          enemy.status = 'death';
          enemy.setDepth(1);
          if (Math.random() > 0.8) {
            new Drop(this, enemy.x, enemy.y, 'drop_kalashnikov', 'gun', 'kalashnikov');
          }
          this.player.XP += 20 / this.player.level;
          if (this.player.XP >= this.player.maxXP) {
            this.player.levelUP();
          }
          if (enemy.texture.key === 'iceMove') {
            enemy.destroy();
          }
        }
      }
    });
  }

  update() {
    this.player.controlls();
    for(let i = 0; i < this.enemys.getChildren().length; i++) {
      for(let j = 0; j < this.enemys.getChildren().length; j++) {
        if (i !== j) {
          if (this.enemys.getChildren()[i].status === 'alive' && this.enemys.getChildren()[j].status === 'alive' ) {
            if (this.enemys.getChildren()[i].texture.key === this.enemys.getChildren()[j].texture.key) {
              const distance = Phaser.Math.Distance.Between(
                this.enemys.getChildren()[i].x,
                this.enemys.getChildren()[i].y,
                this.enemys.getChildren()[j].x,
                this.enemys.getChildren()[j].y
              );
              if (distance < 32) {
                this.enemys.getChildren()[i].x > this.enemys.getChildren()[j].x ? this.enemys.getChildren()[i].x += 1 : this.enemys.getChildren()[i].x -= 1;
                this.enemys.getChildren()[i].y > this.enemys.getChildren()[j].y ? this.enemys.getChildren()[i].y += 1 : this.enemys.getChildren()[i].y -= 1;
              }
            }
          }
        }
      }
      this.enemys.getChildren()[i].moving();
    }
    this.interface.update();
  }
}
