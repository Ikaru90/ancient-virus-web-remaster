export class Bullet {
  constructor(scene) {
    this.scene = scene;
    this.scene.bulletSprite = this.scene.physics.add.sprite(this.scene.playerSprite.x, this.scene.playerSprite.y, 'bullet');
    this.scene.bullets.add(this.scene.bulletSprite);
    this.move();
  }

  move() {
    if (this.scene.bulletSprite.active) {
      this.scene.bulletSprite.setVelocityX(Math.cos(this.scene.playerSprite.angle * Math.PI / 180 ) * -1000);
      this.scene.bulletSprite.setVelocityY(Math.sin(this.scene.playerSprite.angle * Math.PI / 180 ) * -1000);

      if (this.scene.bulletSprite.x < 0 || this.scene.bulletSprite.x > 2048) {
        this.scene.bulletSprite.destroy();
      }
      if (this.scene.bulletSprite.y < 0 || this.scene.bulletSprite.y > 2048) {
        this.scene.bulletSprite.destroy();
      }
    }
  }
}
