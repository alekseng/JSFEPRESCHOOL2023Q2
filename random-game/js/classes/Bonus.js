import audio from "../assets/audio.js";
import images from "../assets/images.js";
import { ctx } from "../canvas.js";

class Bonus {
  x = Math.floor(Math.random() * 485);
  y = Math.floor(Math.random() * 430);
  width = 35;
  height = 35;

  constructor(bonus) {
    this.bonus = bonus;
  }

  draw() {
    if (this.bonus == 1) {
      ctx.drawImage(images.bonuses, 320, 0, 64, 64, this.x, this.y, this.width, this.height);
    } else if (this.bonus == 2) {
      ctx.drawImage(images.bonuses, 192, 0, 64, 64, this.x, this.y, this.width, this.height);
    } else if (this.bonus == 3) {
      ctx.drawImage(images.bonuses, 256, 0, 64, 64, this.x, this.y, this.width, this.height);
    }
  };

  dead(player, enemies) {
    audio.getBonus.play();
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
    }
  };
};
export default Bonus;