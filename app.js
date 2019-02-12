new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    specialCooldown: 4,
    healingCooldown: 5,
    defenseCooldown: 5,
    isRunning: false,
    defenseUp: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.specialCooldown = 4;
      this.healingCooldown = 5;
      this.defenseCooldown = 5;
      this.isRunning = true;
      this.defenseUp = false;
      this.turns = [];
    },
    playerAttack: function() {
      damage = this.calculateDamage(1, 10);
      this.monsterHealth -= damage;

      if (this.defenseUp) {
        this.monsterAttack(5);
        this.defenseUp = false;
      } else {
        this.monsterAttack(0);
      }

      this.turns.unshift({
        isPlayer: true,
        text: `Player attacked Monster for ${damage} hp`
      });

      this.checkWin();
      this.playerCdReset();
    },
    playerCdReset: function() {
      if (this.specialCooldown !== 0) {
        this.specialCooldown--;
      }
      if (this.healingCooldown !== 0) {
        this.healingCooldown--;
      }
      if (this.defenseCooldown !== 0) {
        this.defenseCooldown--;
      }
    },
    specialAttack: function() {
      if (this.specialCooldown === 0) {
        damage = this.calculateDamage(15, 20);
        this.monsterHealth -= damage;

        if (this.defenseUp) {
          this.monsterAttack(5);
          this.defenseUp = false;
        } else {
          this.monsterAttack(0);
        }

        this.turns.unshift({
          isPlayer: true,
          text: `Player smashed Monster for ${damage} hp`
        });

        this.checkWin();
        this.specialCooldown = 4;
        this.specialCdReset();
      } else {
        alert(
          `Your special attack is not ready yet. You have to wait ${
            this.specialCooldown
          } turns.`
        );
      }
    },
    specialCdReset: function() {
      if (this.healingCooldown !== 0) {
        this.healingCooldown--;
      }
      if (this.defenseCooldown !== 0) {
        this.defenseCooldown--;
      }
    },
    playerHealing: function() {
      const min = 5;
      const max = 10;

      if (this.healingCooldown === 0) {
        let healing = Math.max(Math.floor(Math.random() * max) + 1, min);
        this.playerHealth += healing;
        this.healingCooldown = 5;

        this.healingCdReset();

        this.turns.unshift({
          isPlayer: true,
          text: `Player healed for ${healing} hp`
        });
      } else {
        alert(
          `Your spell is not ready yet. You have to wait ${
            this.healingCooldown
          } turns.`
        );
      }
    },
    healingCdReset: function() {
      if (this.specialCooldown !== 0) {
        this.specialCooldown--;
      }
      if (this.defenseCooldown !== 0) {
        this.defenseCooldown--;
      }
    },
    playerDefense: function() {
      if (this.defenseCooldown === 0) {
        this.defenseUp = true;
        this.defenseCooldown = 5;

        this.turns.unshift({
          isPlayer: true,
          text: `Player defense up!`
        });
        this.defenseCdReset();
      } else {
        alert(
          `Your shield is not ready yet. You have to wait ${
            this.defenseCooldown
          } turns.`
        );
      }
    },
    defenseCdReset: function() {
      if (this.specialCooldown !== 0) {
        this.specialCooldown--;
      }
      if (this.healingCooldown !== 0) {
        this.healingCooldown--;
      }
    },
    giveUp: function() {
      this.isRunning = false;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    monsterAttack: function(shieldedDmg) {
      monsterAttack = this.calculateDamage(7, 15);
      this.playerHealth -= monsterAttack - shieldedDmg;

      this.turns.unshift({
        isPlayer: false,
        text: `Monster attacked Player for ${monsterAttack - shieldedDmg} hp`
      });
    },
    checkWin: function() {
      if (this.playerHealth <= 0) {
        alert("You get slayed by a Monster!");
        this.isRunning = false;
      }
      if (this.monsterHealth <= 0) {
        alert("You slayed a Monster! Good job!");
        this.isRunning = false;
      }
    }
  }
});
