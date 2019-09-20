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
    this.inventoryWeapons = [
      new Weapon('gun', 'gun', 0),
      new Weapon('gun', 'uzi', 1),
      new Weapon('gun', 'kalashnikov', 2),
      new Weapon('gun', 'minigun', 3),
      new Weapon('gun', 'shotgun', 4),
      new Weapon('gun', 'awp', 5),
      new Weapon('gun', 'rocketLauncher', 6),
      new Weapon('gun', 'rocketMinigun', 7),
      new Weapon('gun', 'iongun', 8),
      new Weapon('gun', 'plasmagun', 9),
      new Weapon('armor', 'armor1', 10),
      new Weapon('armor', 'armor2', 11),
      new Weapon('armor', 'armor3', 12),
      new Weapon('armor', 'armor4', 13),
      new Weapon('armor', 'armor5', 14),
      new Weapon('chip', 'drop_chip1', 15),
      new Weapon('chip', 'drop_chip2', 16),
      new Weapon('chip', 'drop_chip3', 17),
    ];
    this.panelWeaponSlot = this.scene.add.image(698, 17, 'empty').setOrigin(0,0).setDepth(10);

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
        if (item.slot === -2) {
          this.inventoryImages.push(
            this.scene.add.image(this.inventory.x + 70, this.inventory.y + 40, item.subtype)
              .setOrigin(0,0)
              .setDepth(10)
              .setInteractive()
              .on('pointerup', () => {this.onClickWeapon(item, index)})
          );
        }
        if (item.slot === -3) {
          let texture;
          if (item.subtype === 'drop_chip1') {
            texture = 'chip1'
          }
          if (item.subtype === 'drop_chip2') {
            texture = 'chip2'
          }
          if (item.subtype === 'drop_chip3') {
            texture = 'chip3'
          }
          this.inventoryImages.push(
            this.scene.add.image(this.inventory.x + 120, this.inventory.y + 11, texture)
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
      const slot = this.findFirstEmptySlot();
      if (slot) {
        this.equipedWeapon = null;
        this.scene.player.attackSpeed = 0;
        this.scene.player.damage = 0;
        this.scene.player.speed = 1;
        weapon.slot = slot;
        const row = Math.floor(weapon.slot / 5);
        const col = weapon.slot - row * 5;
        this.inventoryImages[index].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[index].y = this.inventory.y + 128 + row * 43;
        this.panelWeaponSlot.setTexture('empty');
        this.scene.player.reloadBar.visible = false;
        this.scene.player.reloadFill.visible = false;
        return;
      }
    }
    if (weapon.slot >= 0 && weapon.type === 'gun') {
      const equipedIndex = this.inventoryWeapons.findIndex((item) => item.slot === -1);
      weapon.slot = -1;
      this.equipedWeapon = weapon;
      if (this.panelWeaponSlot) {
        this.panelWeaponSlot.setTexture('empty');
      }
      this.panelWeaponSlot.setTexture(weapon.subtype);
      if (equipedIndex !== -1) {
        const newSlot = this.findFirstEmptySlot();
        this.inventoryWeapons[equipedIndex].slot = newSlot;
        const row = Math.floor(newSlot / 5);
        const col = newSlot - row * 5;
        this.inventoryImages[equipedIndex].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[equipedIndex].y = this.inventory.y + 128 + row * 43;
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

    if (weapon.slot === -2) {
      const slot = this.findFirstEmptySlot();
      if (slot) {
        weapon.slot = slot;
        this.scene.player.armor = 0;
        const row = Math.floor(weapon.slot / 5);
        const col = weapon.slot - row * 5;
        this.inventoryImages[index].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[index].y = this.inventory.y + 128 + row * 43;
        return;
      }
      return;
    }
    if (weapon.slot >= 0 && weapon.type === 'armor') {
      const equipedIndex = this.inventoryWeapons.findIndex((item) => item.slot === -2);
      weapon.slot = -2;
      if (equipedIndex !== -1) {
        const newSlot = this.findFirstEmptySlot();
        this.inventoryWeapons[equipedIndex].slot = newSlot;
        const row = Math.floor(newSlot / 5);
        const col = newSlot - row * 5;
        this.inventoryImages[equipedIndex].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[equipedIndex].y = this.inventory.y + 128 + row * 43;
      } 
      this.inventoryImages[index].x = this.inventory.x + 70;
      this.inventoryImages[index].y = this.inventory.y + 40;
      this.scene.player.armor = weapon.armor;
      return;
    }

    if (weapon.slot === -3) {
      const slot = this.findFirstEmptySlot();
      if (slot) {
        let texture;
        if (weapon.subtype === 'drop_chip1') {
          texture = 'drop_chip1'
        }
        if (weapon.subtype === 'drop_chip2') {
          texture = 'drop_chip2'
        }
        if (weapon.subtype === 'drop_chip3') {
          texture = 'drop_chip3'
        }
        weapon.slot = slot;
        this.scene.player.armor = 0;
        const row = Math.floor(weapon.slot / 5);
        const col = weapon.slot - row * 5;
        this.inventoryImages[index].setTexture(texture);
        this.inventoryImages[index].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[index].y = this.inventory.y + 128 + row * 43;
        return;
      }
      return;
    }
    if (weapon.slot === -4) {
      const slot = this.findFirstEmptySlot();
      if (slot) {
        let texture;
        if (weapon.subtype === 'drop_chip1') {
          texture = 'drop_chip1'
        }
        if (weapon.subtype === 'drop_chip2') {
          texture = 'drop_chip2'
        }
        if (weapon.subtype === 'drop_chip3') {
          texture = 'drop_chip3'
        }
        weapon.slot = slot;
        this.scene.player.armor = 0;
        const row = Math.floor(weapon.slot / 5);
        const col = weapon.slot - row * 5;
        this.inventoryImages[index].setTexture(texture);
        this.inventoryImages[index].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[index].y = this.inventory.y + 128 + row * 43;
        return;
      }
      return;
    }
    if (weapon.slot === -5) {
      const slot = this.findFirstEmptySlot();
      if (slot) {
        let texture;
        if (weapon.subtype === 'drop_chip1') {
          texture = 'drop_chip1'
        }
        if (weapon.subtype === 'drop_chip2') {
          texture = 'drop_chip2'
        }
        if (weapon.subtype === 'drop_chip3') {
          texture = 'drop_chip3'
        }
        weapon.slot = slot;
        this.scene.player.armor = 0;
        const row = Math.floor(weapon.slot / 5);
        const col = weapon.slot - row * 5;
        this.inventoryImages[index].setTexture(texture);
        this.inventoryImages[index].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[index].y = this.inventory.y + 128 + row * 43;
        return;
      }
      return;
    }

    if (weapon.slot >= 0 && weapon.type === 'chip') {
      const equipedIndex = this.inventoryWeapons.findIndex((item) => item.slot === -3);
      weapon.slot = -3;
      if (equipedIndex !== -1) {
        const newSlot = this.findFirstEmptySlot();
        this.inventoryWeapons[equipedIndex].slot = newSlot;
        const row = Math.floor(newSlot / 5);
        const col = newSlot - row * 5;
        let texture;
        if (weapon.subtype === 'drop_chip1') {
          texture = 'drop_chip1'
        }
        if (weapon.subtype === 'drop_chip2') {
          texture = 'drop_chip2'
        }
        if (weapon.subtype === 'drop_chip3') {
          texture = 'drop_chip3'
        }
        this.inventoryImages[equipedIndex].setTexture(texture);
        this.inventoryImages[equipedIndex].x = this.inventory.x + 9 + col * 43; 
        this.inventoryImages[equipedIndex].y = this.inventory.y + 128 + row * 43;
      }
      let texture;
      if (weapon.subtype === 'drop_chip1') {
        texture = 'chip1'
      }
      if (weapon.subtype === 'drop_chip2') {
        texture = 'chip2'
      }
      if (weapon.subtype === 'drop_chip3') {
        texture = 'chip3'
      }
      this.inventoryImages[index].setTexture(texture);
      this.inventoryImages[index].x = this.inventory.x + 120;
      this.inventoryImages[index].y = this.inventory.y + 11;
    }
  }

  addNewItem(drop) {
    const slot = this.findFirstEmptySlot();
    console.log(slot);
    if (slot) {
      this.inventoryWeapons.push(new Weapon(drop.type, drop.subtype, slot));
    }
  }

  findFirstEmptySlot() {
    for (let i = 0; i < 20; i++ ) {
      if (!this.inventoryWeapons.find((item) => item.slot === i)) {
        return i;
      }
    }
  }
}
