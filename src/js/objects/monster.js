export class Monster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.sys.updateList.add(this);
    scene.sys.displayList.add(this);
    scene.physics.world.enableBody(this);
    scene.enemys.add(this);
    this.setDepth(3);
    this.setScale(0.8 + ((Math.random().toFixed(2) / 2)));
    this.status = 'alive';
    if (texture === 'alienMove') {
      this.play('alienMove');
      this.speed = 100;
      this.HP = 10;
    }
    if (texture === 'zombieMove') {
      this.play('zombieMove');
      this.speed = 75;
      this.HP = 20;
    }
    if (texture === 'spiderMove') {
      this.play('spiderMove');
      this.speed = 100;
      this.HP = 30;
    }
    if (texture === 'lizardMove') {
      this.play('lizardMove');
      this.speed = 125;
      this.HP = 20;
    }
    if (texture === 'iceMove') {
      this.play('iceMove');
      this.speed = 50;
      this.HP = 50;
    }
    this.canAttack = true;
  }

  moving() {
    if (this.status === 'alive') {
      if ((Math.abs(this.y - this.scene.player.y) > 2) || (Math.abs(this.x - this.scene.player.x) > 2)) {
        let angle = Math.atan2(this.y - this.scene.player.y, this.x - this.scene.player.x);
        angle = (angle < 0) ? angle + 2 * Math.PI : angle;
        this.setVelocityX(Math.cos(angle) * -this.speed);
        this.setVelocityY(Math.sin(angle) * -this.speed);
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
      this.scene.player.HP -= 10 * (1 - this.scene.player.armor / 10);
      this.canAttack = false;
      setTimeout(() => {
        this.canAttack = true;
      }, 2000);
    }
  }
}
