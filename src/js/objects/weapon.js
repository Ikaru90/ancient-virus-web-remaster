export class Weapon {
  constructor(type, subtype, slot) {
    this.type = type;
    this.subtype = subtype;
    this.slot = slot;
    this.equipped = false;

    if (type === 'gun') {
      this.isReload = false;
      this.reloadProcess = 0;

      if (subtype === 'gun') {
        this.damage = 5;
        this.attackSpeed = 10;
        this.ammo = 8;
        this.maxAmmo = 8;
        this.reloadSpeed = 2000; // ms
        this.speedPenalty = 0.10;
      }

      if (subtype === 'uzi') {
        this.damage = 5;
        this.attackSpeed = 90;
        this.ammo = 30;
        this.maxAmmo = 30;
        this.reloadSpeed = 2000; // ms
        this.speedPenalty = 0.15;
      }
  
      if (subtype === 'kalashnikov') {
        this.damage = 10;
        this.attackSpeed = 65;
        this.ammo = 25;
        this.maxAmmo = 25;
        this.reloadSpeed = 3000; // ms
        this.speedPenalty = 0.25;
      }

      if (subtype === 'minigun') {
        this.damage = 10;
        this.attackSpeed = 100;
        this.ammo = 100;
        this.maxAmmo = 100;
        this.reloadSpeed = 8000; // ms
        this.speedPenalty = 0.85;
      }

      if (subtype === 'shotgun') {
        this.damage = 10;
        this.attackSpeed = 10;
        this.ammo = 8;
        this.maxAmmo = 8;
        this.reloadSpeed = 4000; // ms
        this.speedPenalty = 0.25;
      }

      if (subtype === 'awp') {
        this.damage = 10;
        this.attackSpeed = 7;
        this.ammo = 8;
        this.maxAmmo = 8;
        this.reloadSpeed = 8000; // ms
        this.speedPenalty = 0.50;
      }

      if (subtype === 'rocketLauncher') {
        this.damage = 25;
        this.attackSpeed = 7;
        this.ammo = 1;
        this.maxAmmo = 1;
        this.reloadSpeed = 1000; // ms
        this.speedPenalty = 0.50;
      }

      if (subtype === 'rocketMinigun') {
        this.damage = 10;
        this.attackSpeed = 25;
        this.ammo = 10;
        this.maxAmmo = 10;
        this.reloadSpeed = 5000; // ms
        this.speedPenalty = 0.50;
      }

      if (subtype === 'iongun') {
        this.damage = 15;
        this.attackSpeed = 25;
        this.ammo = 25;
        this.maxAmmo = 25;
        this.reloadSpeed = 5000; // ms
        this.speedPenalty = 0.10;
      }

      if (subtype === 'plasmagun') {
        this.damage = 15;
        this.attackSpeed = 25;
        this.ammo = 25;
        this.maxAmmo = 25;
        this.reloadSpeed = 5000; // ms
        this.speedPenalty = 0.10;
      }
    }

    if (type === 'armor') {
      if (subtype === 'armor1') {
        this.armor = 1;
      }
      if (subtype === 'armor2') {
        this.armor = 2;
      }
      if (subtype === 'armor3') {
        this.armor = 3;
      }
      if (subtype === 'armor4') {
        this.armor = 4;
      }
      if (subtype === 'armor5') {
        this.armor = 5;
      }
    }

    if (type === 'chip') {
      if (subtype === 'drop_chip1') {
        this.damage = 5;
      }
      if (subtype === 'drop_chip2') {
        this.armor = 2;
      }
      if (subtype === 'drop_chip3') {
        this.speedPenalty = -0.15;
      }
    }
  }
}
 