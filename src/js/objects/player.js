import { Bullet } from './bullet';

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.setDepth(3);
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
    this.isReload = false;
    this.reloadSpeed = 0;
    this.reloadProcess = 0;
    this.canFire = true;
    this.isInterfaceOpen = false;
    this.scene = scene;
    this.pointer = scene.input.activePointer;

    this.reloadBar = scene.add.graphics({ lineStyle: { color: 0x000000 } });
    this.reloadFill = scene.add.graphics({ fillStyle: { color: 0x00ff00 } });
    this.reloadBar.strokeRect(this.x - 40, this.y - 40, 80, 10).setDepth(10);
    this.reloadFill.fillRect(this.x - 40, this.y - 40, 0, 10).setDepth(9);
    this.reloadBar.visible = false;
    this.reloadFill.visible = false;
  }

  controlls()  {
    if (this.active) {
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

        if (this.isReload) {
          this.reloadProcess += 80 / (this.reloadSpeed / 16.6) ;
          this.reloadFill.clear();
          this.reloadFill.fillRect(512 - 40, 384 - 40, this.reloadProcess, 10).setDepth(9);

          if (this.reloadProcess > 79 ) {
            this.reloadProcess = 0;
            this.ammo = this.maxAmmo;
            this.isReload = false;
            this.reloadBar.visible = false;
            this.reloadFill.visible = false;
            this.reloadFill.clear();
          }
        }
  
        if (this.pointer.isDown) {
          if (this.canFire && this.attackSpeed !== 0 && this.ammo > 0) {
            this.ammo -= 1;
            if (this.ammo === 0) {
              this.isReload = true;
              this.reloadBar.visible = true;
              this.reloadFill.visible = true;
            }
            new Bullet(this.scene);
            if (this.scene.interface.inventarWeaponSlot === 'gun') {
              this.scene.sound.play('gunwav', {volume: 0.1});  
            }
            if (this.scene.interface.inventarWeaponSlot === 'kalashnikov') {
              this.scene.sound.play('kalashnikovwav', {volume: 0.1});
            }
            this.canFire = false;
            setTimeout(() => {
              this.canFire = true;
            }, 10000 / this.attackSpeed);
          }
        }
  
        if (this.scene.keyboard.A.isDown && this.x > 32) {
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
        } else {
          this.scene.physics.pause();
          this.scene.anims.pauseAll();
          this.isInterfaceOpen = true;
          this.scene.interface.inventory.visible = true;
          this.scene.interface.setInventoryWeaponsVisible(true);
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
  }
}
