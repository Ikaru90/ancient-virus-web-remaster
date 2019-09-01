export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, scene.player.x, scene.player.y, 'bullet');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setImmovable(true);
    this.scene.bullets.add(this);
    this.move();
    this.scene = scene;
  }

  move() {
    if (this.active) {
      this.setVelocityX(Math.cos(this.scene.player.angle * Math.PI / 180 ) * -1000);
      this.setVelocityY(Math.sin(this.scene.player.angle * Math.PI / 180 ) * -1000);

      if (this.x < 0 || this.x > 2048) {
        this.destroy();
      }
      if (this.y < 0 || this.y > 2048) {
        this.destroy();
      }
    }
  }
}
