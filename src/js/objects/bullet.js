export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, texture, scatter ) {
    super(
      scene,
      scene.player.x + Math.cos(scene.player.angle * Math.PI / 180) * 20,
      scene.player.y + Math.sin(scene.player.angle * Math.PI / 180) * 20,
      texture
    );
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.scene = scene;
    this.setImmovable(true);
    this.scene.bullets.add(this);
    this.scatter = scatter || 0;
    this.moving();
  }

  moving() {
    if (this.active) {
      this.setAngle(this.scene.player.angle);
      this.setVelocityX(Math.cos((this.scene.player.angle + this.scatter) * Math.PI / 180) * -1000);
      this.setVelocityY(Math.sin((this.scene.player.angle + this.scatter) * Math.PI / 180) * - 1000);
    }
  }
}
