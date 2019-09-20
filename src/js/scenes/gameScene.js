import { SCENES } from './const';
import { Player } from '../objects/player';
import { Monster } from '../objects/monster';
import { Drop } from '../objects/drop';
import { Effect } from '../objects/effect';
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
    this.effects = this.physics.add.group({ immovable: true });
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
    const boom = {
      key: 'boom',
      frames: this.anims.generateFrameNumbers('boom'),
      frameRate: 40
    };
    const ion = {
      key: 'ion',
      frames: this.anims.generateFrameNumbers('ion'),
      frameRate: 30
    };
    const plasma = {
      key: 'plasma',
      frames: this.anims.generateFrameNumbers('plasma'),
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
    this.anims.create(boom);
    this.anims.create(ion);
    this.anims.create(plasma);

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

    this.physics.world.addOverlap(this.enemys, this.effects, (enemy, effects) => {
      if (enemy.status === 'alive') {
        if (effects.texture.key === 'boom') {
          enemy.HP -= this.player.damage;
          effects.setSize(1, 1, effects.x + 50, effects.y + 50, 1);
          this.checkEnemy(enemy);
        }
      }
    });

    this.physics.world.addCollider(this.player, this.drop, (_player, drop) => {
      this.interface.addNewItem(drop);
      drop.destroy();
    });
    this.physics.world.addOverlap(this.player, this.enemys, (player, enemy) => {
      if (enemy.status === 'alive') {
        enemy.hit();
        if (player.HP <= 0) {
          player.destroy();
        }
      }
    });
    this.physics.world.addCollider(this.bullets, this.enemys, (bullet, enemy) => {
      if (enemy.status === 'alive') {
        if (this.interface.equipedWeapon.subtype !== 'awp') {
          bullet.destroy();
        }
        if (this.interface.equipedWeapon.subtype === 'rocketLauncher') {
          this.effects.add(new Effect(this, bullet, 'boom' , 200, 200, 1));
          this.sound.play('explodewav', {volume: 0.1});
        }
        if (this.interface.equipedWeapon.subtype === 'rocketMinigun') {
          this.effects.add(new Effect(this, bullet, 'boom' , 100, 100, 0.5));
          this.sound.play('explodewav', {volume: 0.1});
        }
        if (this.interface.equipedWeapon.subtype !== 'rocketMinigun' && this.interface.equipedWeapon.subtype !== 'rocketLauncher') {
          enemy.HP -= this.player.damage;
          if (this.interface.equipedWeapon.subtype === 'iongun') {
            this.effects.add(new Effect(this, bullet, 'ion' , 250, 250, 1));
          }
          if (this.interface.equipedWeapon.subtype === 'plasmagun') {
            this.effects.add(new Effect(this, bullet, 'plasma' , 250, 250, 1));
          }
          this.sound.play('meetwav', {volume: 0.2});
        }
        this.checkEnemy(enemy);
      }
    });
  }

  checkEnemy(enemy) {
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
      if (Math.random() > 0.1) {
        new Drop(this, enemy.x, enemy.y, 'shotgun', 'gun', 'shotgun');
      }
      this.player.XP += 2 / this.player.level;
      if (this.player.XP >= this.player.maxXP) {
        this.player.levelUP();
      }
      if (enemy.texture.key === 'iceMove') {
        enemy.destroy();
      }
    }
  }

  update() {
    // console.log('bullets: ', this.bullets.getChildren().length);
    // console.log('enemys: ', this.enemys.getChildren().length);
    // console.log('effects: ', this.effects.getChildren().length);
    // console.log('drop: ', this.drop.getChildren().length);

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
    for(let i = 0; i < this.bullets.getChildren().length; i++) {
      if (this.bullets.getChildren()[i]) {
        if (this.bullets.getChildren()[i].x < 0 || this.bullets.getChildren()[i].x > 2560) {
          this.bullets.getChildren()[i].destroy();
        }
      }
      if (this.bullets.getChildren()[i]) {
        if (this.bullets.getChildren()[i].y < 0 || this.bullets.getChildren()[i].y > 2048) {
          this.bullets.getChildren()[i].destroy();
        }
      }
      
    }
    this.interface.update();
  }
}
