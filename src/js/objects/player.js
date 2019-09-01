import { Bullet } from './bullet';

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.setDepth(2);
    this.scene = scene;
    this.canFire = true;
    this.pointer = this.scene.input.activePointer;
  }

  controlls()  {
    if (this.active) {

      let angle = Math.atan2(this.y - this.pointer.y, this.x - this.pointer.x);
      angle = (angle < 0) ? angle + 2 * Math.PI : angle;
      angle = Math.floor(angle * 180 / Math.PI);
      if (angle || angle === 0) {
        this.setAngle(angle);
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
        this.setVelocityX(-200);
      }
      if (this.scene.keyboard.D.isDown) {
        this.setVelocityX(+200);
      }
      if (this.scene.keyboard.A.isUp && this.scene.keyboard.D.isUp) {
        this.setVelocityX(0);
      }
      if (this.scene.keyboard.W.isDown) {
        this.setVelocityY(-200);
      }
      if (this.scene.keyboard.S.isDown) {
        this.setVelocityY(+200);
      }
      if (this.scene.keyboard.W.isUp && this.scene.keyboard.S.isUp) {
        this.setVelocityY(0);
      }
    }
  }
}
