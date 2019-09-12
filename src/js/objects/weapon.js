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
    }
  }
}
 