export class Player {
  constructor(scene) {
    this.scene = scene;
    this.scene.playerSprite = this.scene.physics.add.sprite(300, 300, 'player');
    this.canFire = true;
    this.scene.input.on("pointermove", (pointer) => {
      this.worldX = pointer.worldX;
      this.worldY = pointer.worldY;
    });
  }

  controlls()  {
    if (this.scene.playerSprite.active) {

      let angle = Math.atan2(this.scene.playerSprite.y - this.worldY, this.scene.playerSprite.x - this.worldX);
      angle = (angle < 0) ? angle + 2*Math.PI : angle;
      angle = Math.floor(angle * 180 / Math.PI);
      if (angle || angle === 0) {
        this.scene.playerSprite.setAngle(angle);
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
