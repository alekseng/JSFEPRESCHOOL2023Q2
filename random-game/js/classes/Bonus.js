import audio from "../assets/audio.js";
import images from "../assets/images.js";
import { ctx } from "../canvas.js";
import levelScore from "../levelScore.js";

class Bonus {
  pos = Math.floor(Math.random() * 10);
  x;
  y;
  width = 35;
  height = 35;
  position = {
    one: {
      x: 45,
      y: 65,
    },
    two: {
      x: 180,
      y: 85,
    },
    three: {
      x: 325,
      y: 100,
    },
    four: {
      x: 450,
      y: 25,
    },
    five: {
      x: 440,
      y: 125,
    },
    six: {
      x: 90,
      y: 210,
    },
    seven: {
      x: 405,
      y: 210,
    },
    eight: {
      x: 0,
      y: 370,
    },
    nine: {
      x: 95,
      y: 365,
    },
    ten: {
      x: 275,
      y: 410,
    },
    eleven: {
      x: 405,
      y: 445,
    },
  };

  constructor(bonus) {
    this.bonus = bonus;
  };

  draw() {
    if (this.pos === 0) {
      this.x = this.position.one.x
      this.y = this.position.one.y
    } else if (this.pos === 1) {
      this.x = this.position.two.x
      this.y = this.position.two.y
    } else if (this.pos === 2) {
      this.x = this.position.three.x
      this.y = this.position.three.y
    } else if (this.pos === 3) {
      this.x = this.position.four.x
      this.y = this.position.four.y
    } else if (this.pos === 4) {
      this.x = this.position.five.x
      this.y = this.position.five.y
    } else if (this.pos === 5) {
      this.x = this.position.six.x
      this.y = this.position.six.y
    } else if (this.pos === 6) {
      this.x = this.position.seven.x
      this.y = this.position.seven.y
    } else if (this.pos === 7) {
      this.x = this.position.eight.x
      this.y = this.position.eight.y
    }else if (this.pos === 8) {
      this.x = this.position.nine.x
      this.y = this.position.nine.y
    }else if (this.pos === 9) {
      this.x = this.position.ten.x
      this.y = this.position.ten.y
    }else if (this.pos === 10) {
      this.x = this.position.eleven.x
      this.y = this.position.eleven.y
    };
    if (this.bonus == 1) {
      ctx.drawImage(images.bonuses, 320, 0, 64, 64, this.x, this.y, this.width, this.height);
    } else if (this.bonus == 2) {
      ctx.drawImage(images.bonuses, 192, 0, 64, 64, this.x, this.y, this.width, this.height);
    } else if (this.bonus == 3) {
      ctx.drawImage(images.bonuses, 256, 0, 64, 64, this.x, this.y, this.width, this.height);
    } else if (this.bonus == 4) {
      ctx.drawImage(images.bonuses, 0, 0, 64, 64, this.x, this.y, this.width, this.height);
    }
  };

  dead(player, enemies) {
    audio.getBonus.play();
    levelScore.total += 500;
    if (this.bonus == 1) {
      player.life += 1;
    } else if (this.bonus == 2) {
      if (player.level == 0) {
        player.bulletSpeed += 2;
        player.speed += 0.2;
        player.level += 1;
      } else if (player.level == 1) {
        player.bulletSpeed += 0;
        player.speed += 0;
      }
    } else if (this.bonus == 3) {
      enemies.forEach(el => {
        el.destroy();
      });
      enemies.splice(0, 3);
    } else if (this.bonus == 4) {
      player.helmet = true;
      player.helmetDurability += 1000;
    }
  };
};
export default Bonus;