import audio from "../assets/audio.js";
import images from "../assets/images.js";
import { ctx } from "../canvas.js";

class Bonus {
  x = Math.floor(Math.random() * 485);
  y = Math.floor(Math.random() * 430);
  width = 35;
  height = 35;

  draw() {
    ctx.drawImage(images.bonuses, 320, 0, 64, 64, this.x, this.y, this.width, this.height);
  };

  dead(player) {
    audio.getBonus.play();
    player.life += 1;
  };
};

export default Bonus;