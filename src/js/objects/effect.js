export class Effect extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, bullet, texture, bodyWidth, bodyHeight, scale) {
    super(scene, bullet.x, bullet.y, texture)
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    this.setSize(bodyWidth, bodyHeight);
    if (texture === 'boom') {
      this.play('boom').on('animationcomplete', this.animComplete, this);
    }
    if (texture === 'ion') {
      this.play('ion').on('animationcomplete', this.animComplete, this);
    }
    if (texture === 'plasma') {
      this.play('plasma').on('animationcomplete', this.animComplete, this);
    }
    if (scale) {
      this.setScale(scale);
    }
  }

  animComplete() {
    this.destroy();
  }
}
