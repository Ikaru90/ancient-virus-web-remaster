import { Bullet } from './bullet';

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.scene.playerSprite = this.scene.physics.add.sprite(300, 300, 'player').setImmovable(true);
    this.canFire = true;
    this.pointer = this.scene.input.activePointer;
  }

  controlls()  {
    if (this.scene.playerSprite.active) {

      let angle = Math.atan2(this.scene.playerSprite.y - this.pointer.y, this.scene.playerSprite.x - this.pointer.x);
      angle = (angle < 0) ? angle + 2 * Math.PI : angle;
      angle = Math.floor(angle * 180 / Math.PI);
      if (angle || angle === 0) {
        this.scene.playerSprite.setAngle(angle);
      }

      if (this.pointer.isDown) {
        if (this.canFire) {
          new Bullet(this.scene);
          this.canFire = false;
          setTimeout(() => {
            this.canFire = true;
          }, 150);
        }
      }

      if (this.scene.keyboard.A.isDown) {
        this.scene.playerSprite.setVelocityX(-200);
      }
      if (this.scene.keyboard.D.isDown) {
        this.scene.playerSprite.setVelocityX(+200);
      }
      if (this.scene.keyboard.A.isUp && this.scene.keyboard.D.isUp) {
        this.scene.playerSprite.setVelocityX(0);
      }
      if (this.scene.keyboard.W.isDown) {
        this.scene.playerSprite.setVelocityY(-200);
      }
      if (this.scene.keyboard.S.isDown) {
        this.scene.playerSprite.setVelocityY(+200);
      }
      if (this.scene.keyboard.W.isUp && this.scene.keyboard.S.isUp) {
        this.scene.playerSprite.setVelocityY(0);
      }
    }
  }
}
