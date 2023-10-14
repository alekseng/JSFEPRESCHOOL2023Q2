import images from "../../assets/images.js";
import { ctx } from "../../canvas.js";

class BrickWall {
  width = 20;
  height = 20;
  isDestroy = true;
  isMove = false;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  draw() {
    ctx.drawImage(images.gameObjects, 34, 0, 32, 32, this.x, this.y, this.width, this.height);
  };
};

export default BrickWall;