import audio from "../assets/audio.js";
import images from "../assets/images.js";
import { ctx } from "../canvas.js";
import levelScore from "../levelScore.js";

class Bonus {
  pos = Math.floor(Math.random() * 8);
  x;
  y;
  width = 35;
  height = 35;
  position = {
    one: {
      x: 60,
      y: 60,
    },
    two: {
      x: 320,
      y: 100,
    },
    three: {
      x: 480,
      y: 350,
    },
    four: {
      x: 200,
      y: 400,
    },
    five: {
      x: 80,
      y: 200,
    },
    six: {
      x: 340,
      y: 360,
    },
    seven: {
      x: 50,
      y: 410,
    },
    eight: {
      x: 320,
      y: 130,
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