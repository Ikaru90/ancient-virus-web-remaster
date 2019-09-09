export class Weapon {
  constructor(type, slot) {
    this.slot = slot;
    this.type = type;
    this.equipped = false;

    if (type === 'gun') {
      this.damage = 5;
      this.attackSpeed = 10;
      this.ammo = 8;
      this.reloadSpeed = 2000; // ms
      this.speedPenalty = 0.10;
    }

    if (type === 'kalashnikov') {
      this.damage = 10;
      this.attackSpeed = 65;
      this.ammo = 30;
      this.reloadSpeed = 3000; // ms
      this.speedPenalty = 0.25;
    }
  }
}
 