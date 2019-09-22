import { SCENES } from './const';
import {
  getlevelTwo,
  getlevelThree,
  getlevelFour,
  getlevelFive,
  getlevelSix,
  getlevelSeven,
  getlevelEight,
  getlevelNine,
  getlevelTen,
  getEndGame
} from './levelConfig';
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
    this.textures = this.physics.add.group({ immovable: true });
    this.level = 1;

    for (let i = 0; i < 10; i ++ ) {
      for (let j = 0; j < 8; j ++ ) {
        this.textures.add(this.add.image(i * 256, j * 256, 'grass').setOrigin(0,0).setDepth(-1));
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
      for(let j = 0; j < 2; j ++) {
        new Monster(this, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
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
          this.scene.restart();
          this.scene.switch(SCENES.LOSE);
        }
      }
    });
    this.physics.world.addCollider(this.bullets, this.enemys, (bullet, enemy) => {
      if (enemy.status === 'alive') {
        if (bullet.subtype !== 'awp') {
          bullet.destroy();
        }
        if (bullet.subtype === 'rocketLauncher') {
          this.effects.add(new Effect(this, bullet, 'boom' , 200, 200, 1));
          this.sound.play('explodewav', {volume: 0.1});
        }
        if (bullet.subtype === 'rocketMinigun') {
          this.effects.add(new Effect(this, bullet, 'boom' , 100, 100, 0.5));
          this.sound.play('explodewav', {volume: 0.1});
        }
        if (bullet.subtype !== 'rocketMinigun' && bullet.subtype !== 'rocketLauncher') {
          enemy.HP -= bullet.damage;
          if (bullet.subtype === 'iongun') {
            this.effects.add(new Effect(this, bullet, 'ion' , 250, 250, 1));
          }
          if (bullet.subtype === 'plasmagun') {
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
      if (Math.random() >= 0.90) {
        if (this.player.level === 1) {
          const dropRoll = Math.floor(Math.random() * 2);
          switch (dropRoll) {
            case 0: 
              new Drop(this, enemy.x, enemy.y, 'uzi', 'gun', 'uzi');
              break;
            case 1: 
              new Drop(this, enemy.x, enemy.y, 'kalashnikov', 'gun', 'kalashnikov');
              break;
          }
        }

        if (this.player.level === 2) {
          const dropRoll = Math.floor(Math.random() * 4);
          switch (dropRoll) {
            case 0: 
              new Drop(this, enemy.x, enemy.y, 'uzi', 'gun', 'uzi');
              break;
            case 1: 
              new Drop(this, enemy.x, enemy.y, 'kalashnikov', 'gun', 'kalashnikov');
              break;
            case 2: 
              new Drop(this, enemy.x, enemy.y, 'shotgun', 'gun', 'shotgun');
              break;
            case 3: 
              new Drop(this, enemy.x, enemy.y, 'armor1', 'armor', 'armor1');
              break;  
          }
        }  

        if (this.player.level === 3) {
          const dropRoll = Math.floor(Math.random() * 6);
          switch (dropRoll) {
            case 0: 
              new Drop(this, enemy.x, enemy.y, 'uzi', 'gun', 'uzi');
              break;
            case 1: 
              new Drop(this, enemy.x, enemy.y, 'kalashnikov', 'gun', 'kalashnikov');
              break;
            case 2: 
              new Drop(this, enemy.x, enemy.y, 'shotgun', 'gun', 'shotgun');
              break;
            case 3: 
              new Drop(this, enemy.x, enemy.y, 'awp', 'gun', 'awp');
              break;   
            case 4: 
              new Drop(this, enemy.x, enemy.y, 'armor1', 'armor', 'armor1');
              break;
            case 5: 
              new Drop(this, enemy.x, enemy.y, 'armor2', 'armor', 'armor2');
              break;
          }
        }

        if (this.player.level === 4) {
          const dropRoll = Math.floor(Math.random() * 8);
          switch (dropRoll) {
            case 0: 
              new Drop(this, enemy.x, enemy.y, 'uzi', 'gun', 'uzi');
              break;
            case 1: 
              new Drop(this, enemy.x, enemy.y, 'kalashnikov', 'gun', 'kalashnikov');
              break;
            case 2: 
              new Drop(this, enemy.x, enemy.y, 'shotgun', 'gun', 'shotgun');
              break;
            case 3: 
              new Drop(this, enemy.x, enemy.y, 'awp', 'gun', 'awp');
              break;
            case 4: 
              new Drop(this, enemy.x, enemy.y, 'minigun', 'gun', 'minigun');
              break;
            case 5: 
              new Drop(this, enemy.x, enemy.y, 'armor1', 'armor', 'armor1');
              break;
            case 6: 
              new Drop(this, enemy.x, enemy.y, 'armor2', 'armor', 'armor2');
              break;
            case 7: 
              new Drop(this, enemy.x, enemy.y, 'armor3', 'armor', 'armor3');
              break;  
          }
        }

        if (this.player.level >= 5) {
          const dropRoll = Math.floor(Math.random() * 17);
          switch (dropRoll) {
            case 0: 
              new Drop(this, enemy.x, enemy.y, 'uzi', 'gun', 'uzi');
              break;
            case 1: 
              new Drop(this, enemy.x, enemy.y, 'kalashnikov', 'gun', 'kalashnikov');
              break;
            case 2: 
              new Drop(this, enemy.x, enemy.y, 'shotgun', 'gun', 'shotgun');
              break;
            case 3: 
              new Drop(this, enemy.x, enemy.y, 'awp', 'gun', 'awp');
              break;
            case 4:
              new Drop(this, enemy.x, enemy.y, 'minigun', 'gun', 'minigun');
              break;
            case 5: 
              new Drop(this, enemy.x, enemy.y, 'rocketLauncher', 'gun', 'rocketLauncher');
              break;
            case 6: 
              new Drop(this, enemy.x, enemy.y, 'rocketMinigun', 'gun', 'rocketMinigun');
              break;
            case 7: 
              new Drop(this, enemy.x, enemy.y, 'iongun', 'gun', 'iongun');
              break;
            case 8: 
              new Drop(this, enemy.x, enemy.y, 'plasmagun', 'gun', 'plasmagun');
              break;  
            case 9: 
              new Drop(this, enemy.x, enemy.y, 'armor1', 'armor', 'armor1');
              break;
            case 10: 
              new Drop(this, enemy.x, enemy.y, 'armor2', 'armor', 'armor2');
              break;
            case 11: 
              new Drop(this, enemy.x, enemy.y, 'armor3', 'armor', 'armor3');
              break;
            case 12: 
              new Drop(this, enemy.x, enemy.y, 'armor4', 'armor', 'armor4');
              break; 
            case 13: 
              new Drop(this, enemy.x, enemy.y, 'armor5', 'armor', 'armor5');
              break;
            case 14: 
              new Drop(this, enemy.x, enemy.y, 'drop_chip1', 'chip', 'drop_chip1');
              break;
            case 15: 
              new Drop(this, enemy.x, enemy.y, 'drop_chip2', 'chip', 'drop_chip2');
              break; 
            case 16: 
              new Drop(this, enemy.x, enemy.y, 'drop_chip3', 'chip', 'drop_chip3');
              break;   
          }
        }
      }
      this.player.XP += 20 / this.player.level;
      if (this.player.XP >= this.player.maxXP) {
        this.player.levelUP();
      }
      if (enemy.texture.key === 'iceMove') {
        enemy.destroy();
      }

      let isComplete = true;
      for(let i = 0; i < this.enemys.getChildren().length; i++) {
        if (this.enemys.getChildren()[i].status === 'alive') {
          isComplete = false;
          break;
        }
      }

      if (isComplete && this.level === 1) {
        getlevelTwo(this);
      }
      if (isComplete && this.level === 2) {
        getlevelThree(this);
      }
      if (isComplete && this.level === 3) {
        getlevelFour(this);
      }
      if (isComplete && this.level === 4) {
        getlevelFive(this);
      }
      if (isComplete && this.level === 5) {
        getlevelSix(this);
      }
      if (isComplete && this.level === 6) {
        getlevelSeven(this);
      }
      if (isComplete && this.level === 7) {
        getlevelEight(this);
      }
      if (isComplete && this.level === 8) {
        getlevelNine(this);
      }
      if (isComplete && this.level === 9) {
        getlevelTen(this);
      }
      if (isComplete && this.level === 10) {
        getEndGame(this);
      }
    }
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
