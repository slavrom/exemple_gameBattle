class Characteristics {
  constructor (obj) {
    this.name = obj.name;
    this.attack = obj.attack;
    this.hitpoints = obj.hitpoints;
    this.currentHitpoints = obj.hitpoints;
  }

  getHitpoints () {
    return this.currentHitpoints;
  }

  setHitpoints (hp) {
    this.currentHitpoints = hp;
  }

  getTotalHitpoints () {
    return this.hitpoints;
  }

  setTotalHitpoints (hp) {
    this.hitpoints = hp;
  }

  getAttack () {
    return this.attack;
  }

  setAttack (dmg) {
    this.attack = dmg;
  }

  isAlive () {
    if (this.currentHitpoints > 0) {
      return true;
    } else {
      return false;
    }
  }

  fighting (opponent) {
    const takeDmg = opponent.currentHitpoints -= this.attack;
    if (!opponent.isAlive()) {
      console.log('Your opponent is dead');
      this.isDead = true;
      return opponent.currentHitpoints = 0;
    } else {
      return takeDmg;
    }
  }

  getHeal (hp) {
    if (this.isAlive()) {
      const heal = this.currentHitpoints += hp;
      if (heal > this.hitpoints || hp == undefined) {
        this.currentHitpoints = this.hitpoints;
      } else {
        heal;
      }
      console.log(`${this.name} has been heald`)
    } else {
      console.log('You cant heal dead creture')
    }
  }
}

class Champion extends Characteristics {
  constructor (obj) {
    super(obj);
    this.def = false;
    this.isEaten = false;
  }

  takeRest () {
    if (this.isAlive()) {
      if (this.currentHitpoints < this.hitpoints) {
        this.currentHitpoints += 5;
        if (this.currentHitpoints > this.hitpoints) {
          this.currentHitpoints = this.hitpoints;
        }
      } else {
        console.log('Your HP is full')
      }
    } else {
      console.log(`${this.name} is dead`)
    }
  }

  defense () {
    if (!this.def){
      this.def = true;
      console.log('Defense')
    }
  }

  fight(opponent) {
    if (this.isAlive()) {
      this.fighting(opponent);
      if (!opponent.isAlive()) {
        this.setAttack(++this.attack);
        console.log('Your attack has been increased');
      }
    } else {
      console.log(`${this.name} is dead`)
    }
  }
}

class Monster extends Characteristics {
  constructor (obj) {
    super(obj);
    this.rage = 0;
    this.originalAttack = this.attack;
  }

  enrage () {
    if (this.rage == 0) {
      this.rage = 2;
      this.setAttack(this.getAttack() * 2);
      console.log(`${this.name} is enraged now`)
    } else {
      console.log(`${this.name} is enraged already`)
    }
  }

  fight (opponent) {
    if (this.isAlive()) {
      if (opponent.def) {
        console.log('Your attack has been blocked');
        opponent.def = false;
      } else if (!opponent.isAlive() && !opponent.isEaten){
        const feastCurrentHp = Math.floor((opponent.hitpoints / 100) * 25);
        const feastTotalHp = Math.floor((opponent.hitpoints / 100) * 10);
        this.setHitpoints(this.currentHitpoints += feastCurrentHp);
        this.setTotalHitpoints(this.hitpoints += feastTotalHp);
        opponent.isEaten = true;
        console.log(`${this.name} feasts ${opponent.name}`)
      } else {
        this.fighting(opponent);
        if (this.rage > 0) {
          --this.rage;
        } else if (this.attack == 0) {
          this.setAttack(this.originalAttack);
        }
      }
    } else {
      console.log(`${this.name} is dead`);
    }
  }
}

const heracles = new Champion({
  name: 'Heracles', 
  attack: 10, 
  hitpoints: 50
});

const boar = new Monster({
  name: 'Erymanthian Boar', 
  attack: 5,
  hitpoints: 100
});

heracles.fight(boar);
boar.getHitpoints();
boar.enrage();
heracles.fight(boar);
boar.getHitpoints();
boar.fight(heracles);
heracles.getHitpoints();
heracles.fight(boar);
boar.isAlive();
heracles.getAttack();
heracles.getHitpoints();
heracles.takeRest();
heracles.getHitpoints();
heracles.getHeal();