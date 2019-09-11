import { Weapon } from './weapon';

export class Interface {
  constructor(scene) {
    this.scene = scene;
    this.indicator = scene.add.image(0, 0, 'indicator').setOrigin(0,0).setDepth(10);
    this.panel = scene.add.image(674, 0, 'panel').setOrigin(0,0).setDepth(10);

    this.inventory = scene.add.image(150, 150, 'inventory').setOrigin(0,0).setDepth(10);
    this.inventory.visible = false;

    this.equipedWeapon;
    this.inventoryImages = [];
    this.inventoryWeapons = [new Weapon('gun', 'gun', 0)];

    this.levelText = scene.add.text(15, 20, scene.player.level, { fontSize: 25 }).setDepth(10);
    this.HPText = scene.add.text(55, 5, `HP  ${scene.player.HP}`, { fontSize: 15 }).setDepth(10);
    this.XPText = scene.add.text(55, 25, `XP  ${scene.player.XP} %`, { fontSize: 15 }).setDepth(10);
    this.AmmoText = scene.add.text(823, 23, '0', { fontSize: 25 }).setDepth(10);
    this.AttackSpeedText = scene.add.text(905, 23, '0', { fontSize: 25 }).setDepth(10);
    this.DamageText = scene.add.text(993, 23, '0', { fontSize: 25 }).setDepth(10);

    this.ArmorText = scene.add.text(763, 53, `Броня: ${scene.player.armor}`, { fontSize: 12 }).setDepth(10);
    this.SpeedText = scene.add.text(860, 53, `Скорость бега: ${scene.player.speed.toFixed(2)}`, { fontSize: 12 }).setDepth(10);

    this.HPBar = scene.add.graphics({ lineStyle: { color: 0x000000 } });
    this.HPBarFill = scene.add.graphics({ fillStyle: { color: 0xff0000 } });
    this.HPBar.strokeRect(80, 5, 100, 15).setDepth(10);
    this.HPBarFill.fillRect(80, 5, 100, 15).setDepth(9);

    this.XPBar = scene.add.graphics({ lineStyle: { color: 0x000000 } });
    this.XPBarFill = scene.add.graphics({ fillStyle: { color: 0xd4b800 } });
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
    this.panelWeaponSlot.x = x + 698;
    this.panelWeaponSlot.y = y + 17;
    this.inventory.x = x + 150;
    this.inventory.y = y + 150;
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

  update() {
    const currentXP = (this.scene.player.XP / this.scene.player.maxXP * 100);
    this.levelText.setText(this.scene.player.level);
    this.ArmorText.setText(`Броня: ${this.scene.player.armor}`);
    this.SpeedText.setText(`Скорость бега: ${this.scene.player.speed.toFixed(2)}`);
    this.HPText.setText(`HP  ${this.scene.player.HP} / ${this.scene.player.maxHP}`);
    this.XPText.setText(`XP  ${currentXP.toFixed(4)} %`);

    this.AmmoText.setText(this.equipedWeapon && this.equipedWeapon.ammo || 0);
    this.AttackSpeedText.setText(this.scene.player.attackSpeed);
    this.DamageText.setText(this.scene.player.damage);

    this.HPBarFill.clear();
    this.HPBarFill.fillRect(80, 5, Math.floor(this.scene.player.HP / this.scene.player.maxHP * 100), 15);
    this.XPBarFill.clear();
    this.XPBarFill.fillRect(80, 25, currentXP, 15);
  }

  setInventoryWeaponsVisible(flag) {
    if (flag) {
      this.inventoryWeapons.forEach((item, index) => {
        if (item.slot >= 0) {
          const row = Math.floor(item.slot / 5);
          const col = item.slot - row * 5;
          this.inventoryImages.push(
            this.scene.add.image(this.inventory.x + 9 + col * 43, this.inventory.y + 128 + row * 43, item.subtype)
              .setOrigin(0,0)
              .setDepth(10)
              .setInteractive()
              .on('pointerup', () => {this.onClickWeapon(item, index)})
          );
        }
        if (item.slot === -1) {
          this.inventoryImages.push(
            this.scene.add.image(this.inventory.x + 15, this.inventory.y + 40, item.subtype)
              .setOrigin(0,0)
              .setDepth(10)
              .setInteractive()
              .on('pointerup', () => {this.onClickWeapon(item, index)})
          );
        }
      });
    } else {
      this.inventoryImages.forEach((image) => {
        image.destroy();
      });
      this.inventoryImages = [];
    }
  }

  onClickWeapon(weapon, index) {
    if (weapon.slot === -1) {
      this.equipedWeapon = null;
      this.scene.player.attackSpeed = 0;
      this.scene.player.damage = 0;
      this.scene.player.speed = 1;
      weapon.slot = this.findFirstEmptySlot();
      const row = Math.floor(weapon.slot / 5);
      const col = weapon.slot - row * 5;
      this.inventoryImages[index].x = this.inventory.x + 9 + col * 43; 
      this.inventoryImages[index].y = this.inventory.y + 128 + row * 43;
      this.panelWeaponSlot.destroy();
      this.scene.player.reloadBar.visible = false;
      this.scene.player.reloadFill.visible = false;
      return;
    }
    if (weapon.slot >= 0 && weapon.type === 'gun') {
      const equipedIndex = this.inventoryWeapons.findIndex((item) => item.slot === -1);
      weapon.slot = -1;
      this.equipedWeapon = weapon;
      if (this.panelWeaponSlot) {
        this.panelWeaponSlot.destroy();
      }
      this.panelWeaponSlot = this.scene.add.image(698, 17, weapon.subtype).setOrigin(0,0).setDepth(10);
      if (equipedIndex !== -1) {
        const newSlot = this.findFirstEmptySlot();
        this.inventoryWeapons[equipedIndex].slot = newSlot;
        const row = Math.floor(newSlot / 5);
        const col = newSlot - row * 5;
        this.inventoryImages[equipedIndex].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[equipedIndex].y = this.inventory.y + 128 + row * 43;
        this.inventoryWeapons[equipedIndex].equipped = false;
        this.scene.player.reloadBar.visible = false;
        this.scene.player.reloadFill.visible = false;
      } 
      this.inventoryImages[index].x = this.inventory.x + 15;
      this.inventoryImages[index].y = this.inventory.y + 40;
      this.scene.player.attackSpeed = weapon.attackSpeed;
      this.scene.player.damage = weapon.damage;
      this.scene.player.speed = 1 - weapon.speedPenalty;
      if (weapon.isReload) {
        this.scene.player.reloadBar.visible = true;
        this.scene.player.reloadFill.visible = true;
      }
      return;
    }
  }

  addNewItem(drop) {
    this.inventoryWeapons.push(new Weapon(drop.type, drop.subtype, this.findFirstEmptySlot()));
  }

  findFirstEmptySlot() {
    for (let i = 0; i < 20; i++ ) {
      if (!this.inventoryWeapons.find((item) => item.slot === i)) {
        return i;
      }
    }
  }
}
