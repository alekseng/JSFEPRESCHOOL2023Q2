import images from "../assets/images.js";
import {ctx} from "../canvas.js";

class Bullet {
  vectorX = 11;
  vectorY = 11;
  width = 8;
  height = 8;
  constructor(direction, x, y, bulletSpeed) {
    this.direction = direction;
    this.x = this.vectorX + x;
    this.y = this.vectorY + y;
    this.bulletSpeed = bulletSpeed;
  };

  draw() {
    if (this.direction == 0) {
      this.y -= this.bulletSpeed;
      ctx.drawImage(images.bulletsImg, 0, 0, 16, 16, this.x, this.y, this.width, this.height);
    } else if (this.direction == 90) {
      this.x += this.bulletSpeed;
      ctx.drawImage(images.bulletsImg, 48, 0, 16, 16, this.x, this.y, this.width, this.height);
    } else if (this.direction == 180) {
      this.y += this.bulletSpeed;
      ctx.drawImage(images.bulletsImg, 32, 0, 16, 16, this.x, this.y, this.width, this.height);
    } else if (this.direction == 270) {
      this.x -= this.bulletSpeed;
      ctx.drawImage(images.bulletsImg, 16, 0, 16, 16, this.x, this.y, this.width, this.height);
    };
  };

  dead() {
    ctx.drawImage(images.boomsImg, 126, 0, 64, 64, this.x - 20, this.y - 20, 40, 40);
  };
};

export default Bullet;