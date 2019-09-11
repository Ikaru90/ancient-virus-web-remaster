export class Drop extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, type, subtype) {
    super(scene, x, y, texture);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    scene.drop.add(this);
    this.setDepth(2);
    this.type = type;
    this.subtype = subtype;
  }
}