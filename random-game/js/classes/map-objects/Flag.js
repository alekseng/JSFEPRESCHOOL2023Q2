import images from "../../assets/images.js";
import { ctx } from "../../canvas.js";

class Flag {
  width = 40;
  height = 40;
  isDestroy = false;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    if (!this.isDestroy) {
      ctx.drawImage(images.flagImg, 0, 0, 64, 64, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(images.flagImg, 64, 0, 64, 64, this.x, this.y, this.width, this.height);
    };
  };
};

export default Flag;