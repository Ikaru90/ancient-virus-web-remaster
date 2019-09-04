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
    this.canFire = true;
    this.cooldown = 150 // ms
    this.isInterfaceOpen = false;

    this.scene = scene;
    this.pointer = scene.input.activePointer;
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
  
        if (this.pointer.isDown) {
          if (this.canFire) {
            new Bullet(this.scene);
            this.scene.sound.play('gunwav', {volume: 0.1});
            this.canFire = false;
            setTimeout(() => {
              this.canFire = true;
            }, this.cooldown);
          }
        }
  
        if (this.scene.keyboard.A.isDown && this.x > 32) {
          this.x -= 3;
          if (this.scene.cameras.main.scrollX > 0) {
            if (this.x - this.scene.cameras.main.scrollX <= 150) {
              this.scene.cameras.main.scrollX -= 3;
              this.scene.interface.movingCamera();
            }
          }
        }
        if (this.scene.keyboard.D.isDown && this.x < 2528) {
          this.x += 3;
          if (this.scene.cameras.main.scrollX < 1536) {
            if (this.x - this.scene.cameras.main.scrollX >= 874) {
              this.scene.cameras.main.scrollX += 3;
              this.scene.interface.movingCamera();
            }
          }
        }
        if (this.scene.keyboard.W.isDown && this.y > 32) {
          this.y -= 3;
          if (this.scene.cameras.main.scrollY > 0) {
            if (this.y - this.scene.cameras.main.scrollY <= 150) {
              this.scene.cameras.main.scrollY -= 3;
              this.scene.interface.movingCamera();
            }
          }
        }
        if (this.scene.keyboard.S.isDown && this.y < 2016) {
          this.y += 3;
          if (this.scene.cameras.main.scrollY < 1280) {
            if (this.y - this.scene.cameras.main.scrollY >= 618) {
              this.scene.cameras.main.scrollY += 3;
              this.scene.interface.movingCamera();
            }
          }
        }
      }
      if (Phaser.Input.Keyboard.JustDown(this.scene.keyboard.Q)) {
        if (this.isInterfaceOpen) {
          this.scene.physics.resume();
          this.isInterfaceOpen = false;
        } else {
          this.scene.physics.pause();
          this.isInterfaceOpen = true;
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
