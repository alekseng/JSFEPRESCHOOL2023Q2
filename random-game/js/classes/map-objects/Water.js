import images from "../../assets/images.js";
import { ctx } from "../../canvas.js";

class Water {
  width = 20;
  height = 20;
  isDestroy = false;
  isMove = false;
  isShot = true;
  animation = 120;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  draw() {
    this.animation--;
    if (this.animation <= 120) {
      ctx.drawImage(images.gameObjects, 136, 0, 32, 32, this.x, this.y, this.width, this.height);
    };
    if (this.animation <= 80) {
      ctx.drawImage(images.gameObjects, 170, 0, 32, 32, this.x, this.y, this.width, this.height);
    };
    if (this.animation <= 40) {
      ctx.drawImage(images.gameObjects, 204, 0, 32, 32, this.x, this.y, this.width, this.height);
    };
    if (this.animation == 0) {
      this.animation = 120;
    };
  };
};

export default Water;