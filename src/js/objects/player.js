import { Bullet } from './bullet';

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.setDepth(4);
    this.level = 1;
    this.HP = 100;
    this.maxHP = 100;
    this.XP = 0;
    this.maxXP = 100;
    this.attackDamage = 0;
    this.armor = 0;
    this.speed = 1.00;
    this.attackSpeed = 0;
    this.damage = 0;
    this.ammo = 0;
    this.maxAmmo = 0;
    this.canFire = true;
    this.isInterfaceOpen = false;
    this.scene = scene;
    this.pointer = scene.input.activePointer;
    this.levelUp = scene.add.sprite(this.x, this.y, 'levelUp');
    this.levelUp.on('animationcomplete', this.animComplete, this);
    this.levelUp.visible = false;
    this.setSize(35, 35);

    this.reloadBar = scene.add.graphics({ lineStyle: { color: 0x000000 } });
    this.reloadFill = scene.add.graphics({ fillStyle: { color: 0x00ff00 } });
    this.reloadBar.strokeRect(this.x - 40, this.y - 40, 80, 10).setDepth(10);
    this.reloadFill.fillRect(this.x - 40, this.y - 40, 0, 10).setDepth(9);
    this.reloadBar.visible = false;
    this.reloadFill.visible = false;
  }

  animComplete() {
    this.levelUp.visible = false;
  }

  controlls() {
    if (this.active) {
      const equipedWeapon = this.scene.interface.equipedWeapon;
      if (!this.isInterfaceOpen) {
        let angle = Math.atan2(
          this.y - this.scene.cameras.main.scrollY - this.pointer.y,
          this.x - this.scene.cameras.main.scrollX - this.pointer.x
        );
        angle = (angle < 0) ? angle + 2 * Math.PI : angle;
        angle = Math.floor(angle * 180 / Math.PI);
        if (angle || angle === 0) {
          this.setAngle(angle);
        }

        if (equipedWeapon && equipedWeapon.isReload) {
          this.reloadBar.visible = true;
          this.reloadFill.visible = true;
        } else {
          this.reloadBar.visible = false;
          this.reloadFill.visible = false;
        }

        if (equipedWeapon && equipedWeapon.isReload) {
          equipedWeapon.reloadProcess += 80 / (equipedWeapon.reloadSpeed / 16.6) ;
          this.reloadFill.clear();
          this.reloadFill.fillRect(512 - 40, 384 - 40, equipedWeapon.reloadProcess, 10).setDepth(9);

          if (equipedWeapon.reloadProcess > 79 ) {
            equipedWeapon.reloadProcess = 0;
            equipedWeapon.ammo = equipedWeapon.maxAmmo;
            equipedWeapon.isReload = false;
            this.reloadFill.clear();
          }
        }
  
        if (this.pointer.isDown) {
          if (this.canFire && this.attackSpeed !== 0 && equipedWeapon.ammo > 0) {
            equipedWeapon.ammo -= 1;
            if (equipedWeapon.ammo === 0) {
              equipedWeapon.isReload = true;
            }
            if (this.scene.interface.equipedWeapon.subtype === 'gun') {
              this.scene.sound.play('gunwav', {volume: 0.1});
              new Bullet(this.scene, 'bullet');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'uzi') {
              this.scene.sound.play('uziwav', {volume: 0.1});
              new Bullet(this.scene, 'bullet');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'kalashnikov') {
              this.scene.sound.play('kalashnikovwav', {volume: 0.1});
              new Bullet(this.scene, 'bullet');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'minigun') {
              this.scene.sound.play('machinegunwav', {volume: 0.1});
              new Bullet(this.scene, 'bullet');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'shotgun') {
              this.scene.sound.play('drobashwav', {volume: 0.1});
              for (let i = -3; i < 4; i ++) {
                new Bullet(this.scene, 'bullet', i * 3);
              }
            }
            if (this.scene.interface.equipedWeapon.subtype === 'awp') {
              this.scene.sound.play('awpwav', {volume: 0.1});
              new Bullet(this.scene, 'bullet');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'rocketLauncher') {
              this.scene.sound.play('rocketwav', {volume: 0.1});
              new Bullet(this.scene, 'bullet4');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'rocketMinigun') {
              this.scene.sound.play('rocketwav', {volume: 0.1});
              new Bullet(this.scene, 'bullet4');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'iongun') {
              this.scene.sound.play('ion1wav', {volume: 0.1});
              new Bullet(this.scene, 'bullet2');
            }
            if (this.scene.interface.equipedWeapon.subtype === 'plasmagun') {
              this.scene.sound.play('ion2wav', {volume: 0.1});
              new Bullet(this.scene, 'bullet3');
            }
            this.canFire = false;
            setTimeout(() => {
              this.canFire = true;
            }, 10000 / this.attackSpeed);
          }
        }
  
        if (this.scene.keyboard.A.isDown && this.x > 32) {
          this.levelUp.x -= 2 * this.speed;
          this.x -= 2 * this.speed;
          this.reloadBar.x -= 2 * this.speed;
          this.reloadFill.x -= 2 * this.speed;
          if (this.scene.cameras.main.scrollX > 0) {
            if (this.x - this.scene.cameras.main.scrollX <= 150) {
              this.scene.cameras.main.scrollX -= 2 * this.speed;
              this.scene.interface.movingCamera();
            }
          }
        }
        if (this.scene.keyboard.D.isDown && this.x < 2528) {
          this.levelUp.x += 2 * this.speed;
          this.x += 2 * this.speed;
          this.reloadBar.x += 2 * this.speed;
          this.reloadFill.x += 2 * this.speed;
          if (this.scene.cameras.main.scrollX < 1536) {
            if (this.x - this.scene.cameras.main.scrollX >= 874) {
              this.scene.cameras.main.scrollX += 2 * this.speed;
              this.scene.interface.movingCamera();
            }
          }
        }
        if (this.scene.keyboard.W.isDown && this.y > 32) {
          this.levelUp.y -= 2 * this.speed;
          this.y -= 2 * this.speed;
          this.reloadBar.y -= 2 * this.speed;
          this.reloadFill.y -= 2 * this.speed;
          if (this.scene.cameras.main.scrollY > 0) {
            if (this.y - this.scene.cameras.main.scrollY <= 150) {
              this.scene.cameras.main.scrollY -= 2 * this.speed;
              this.scene.interface.movingCamera();
            }
          }
        }
        if (this.scene.keyboard.S.isDown && this.y < 2016) {
          this.levelUp.y += 2 * this.speed;
          this.y += 2 * this.speed;
          this.reloadBar.y += 2 * this.speed;
          this.reloadFill.y += 2 * this.speed;
          if (this.scene.cameras.main.scrollY < 1280) {
            if (this.y - this.scene.cameras.main.scrollY >= 618) {
              this.scene.cameras.main.scrollY += 2 * this.speed;
              this.scene.interface.movingCamera();
            }
          }
        }
      }
      if (Phaser.Input.Keyboard.JustDown(this.scene.keyboard.Q)) {
        if (this.isInterfaceOpen) {
          this.scene.physics.resume();
          this.scene.anims.resumeAll();
          this.isInterfaceOpen = false;
          this.scene.interface.inventory.visible = false;
          this.scene.interface.setInventoryWeaponsVisible(false);
          this.scene.input.setDefaultCursor('url(assets/system/cursor.png), pointer');
        } else {
          this.scene.physics.pause();
          this.scene.anims.pauseAll();
          this.isInterfaceOpen = true;
          this.scene.interface.inventory.visible = true;
          this.scene.interface.setInventoryWeaponsVisible(true);
          this.scene.input.setDefaultCursor('default');
        }
      }
    }
  }

  levelUP() {
    this.maxHP += 70;
    this.HP = this.maxHP;
    this.XP = this.XP - this.maxXP;
    this.maxXP = this.maxXP * 2;
    this.level++;
    this.levelUp.visible = true;
    this.levelUp.play('levelUp');
  }
}
