export class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'alienMove');
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    scene.enemys.add(this);
    this.status = 'alive';
    this.play('alienMov');
    this.HP = 10;
    this.canAttack = true;
  }

  moving() {
    if (this.status === 'alive') {
      if ((Math.abs(this.y - this.scene.player.y) > 2) || (Math.abs(this.x - this.scene.player.x) > 2)) {
        let angle = Math.atan2(this.y - this.scene.player.y, this.x - this.scene.player.x);
        angle = (angle < 0) ? angle + 2 * Math.PI : angle;
        this.setVelocityX(Math.cos(angle) * -100);
        this.setVelocityY(Math.sin(angle) * -100);
        this.setAngle(Math.floor(angle * 180 / Math.PI) + 180);  
      } else {
        this.setVelocityX(0);
        this.setVelocityY(0);
      } 
    } else {
      this.setVelocityX(0);
      this.setVelocityY(0);
    }
  }

  hit() {
    if (this.canAttack) {
      this.scene.player.HP -= 50;
      this.canAttack = false;
      setTimeout(() => {
        this.canAttack = true;
      }, 1000);
    }
  }
}
