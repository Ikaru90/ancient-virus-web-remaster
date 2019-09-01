export class Interface {
  constructor(scene) {
    this.scene = scene;
    this.indicator = scene.add.image(0, 0, 'indicator').setOrigin(0,0).setDepth(10);

    this.panel = scene.add.image(674, 0, 'panel').setOrigin(0,0).setDepth(10);

    this.levelText = scene.add.text(15, 20, scene.player.level, { fontSize: 25 }).setDepth(10);
    this.HPText = scene.add.text(55, 5, `HP  ${scene.player.HP}`, { fontSize: 15 }).setDepth(10);
    this.XPText = scene.add.text(55, 25, `XP  ${scene.player.XP} %`, { fontSize: 15 }).setDepth(10);
    this.AmmoText = scene.add.text(823, 23, '0', { fontSize: 25 }).setDepth(10);
    this.AttackSpeedText = scene.add.text(905, 23, '0', { fontSize: 25 }).setDepth(10);
    this.DamageText = scene.add.text(993, 23, '0', { fontSize: 25 }).setDepth(10);

    this.ArmorText = scene.add.text(763, 53, 'Броня: 0', { fontSize: 12 }).setDepth(10);
    this.SpeedText = scene.add.text(860, 53, 'Скорость бега: 1.00', { fontSize: 12 }).setDepth(10);

    this.HPBar = scene.add.graphics({ lineStyle: { color: 0x000000 } });
    this.HPBarFill = scene.add.graphics({ fillStyle: { color: 0xff0000 } });
    this.HPBar.strokeRect(80, 5, 100, 15).setDepth(10);
    this.HPBarFill.fillRect(80, 5, 100, 15).setDepth(9);

    this.XPBar = scene.add.graphics({ lineStyle: { color: 0x000000 } });
    this.XPBarFill = scene.add.graphics({ fillStyle: { color: 0xffff00 } });
    this.XPBar.strokeRect(80, 25, 100, 15).setDepth(10);
    this.XPBarFill.fillRect(80, 25, 0, 15).setDepth(9);
  }

  movingCamera() {
    const x = this.scene.cameras.main.scrollX;
    const y = this.scene.cameras.main.scrollY;
    this.indicator.x = x;
    this.indicator.y = y;
    this.panel.x = x + 674;
    this.panel.y = y;
    this.levelText.x = x + 15;
    this.levelText.y = y + 20;
    this.HPText.x = x + 55;
    this.HPText.y = y + 5;
    this.XPText.x = x + 55;
    this.XPText.y = y + 25;
    this.AmmoText.x = x + 823, 23;
    this.AmmoText.y = y + 23;
    this.AttackSpeedText.x = x + 905, 23;
    this.AttackSpeedText.y = y + 23;
    this.DamageText.x = x + 993;
    this.DamageText.y = y + 23;
    this.ArmorText.x = x + 763;
    this.ArmorText.y = y + 53;
    this.SpeedText.x = x + 860;
    this.SpeedText.y = y + 53;
    this.HPBar.x = x;
    this.HPBar.y = y;
    this.HPBarFill.x = x;
    this.HPBarFill.y = y;
    this.XPBar.x = x;
    this.XPBar.y = y;
    this.XPBarFill.x = x;
    this.XPBarFill.y = y;
  }

  update () {
    this.HPText.setText(`HP  ${this.scene.player.HP} / ${this.scene.player.maxHP}`);
    this.HPBarFill.clear();
    this.HPBarFill.fillRect(80, 5, Math.floor(this.scene.player.HP / this.scene.player.maxHP * 100), 15).setDepth(9);
    this.XPBarFill.clear();
    this.XPBarFill.fillRect(80, 25, this.scene.player.XP, 15).setDepth(9);
  }
}
