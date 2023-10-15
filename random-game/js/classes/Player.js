import audio from "../assets/audio.js";
import images from "../assets/images.js";
import { ctx } from "../canvas.js";

class Player {
  x = 0;
  y = 0;
  width = 30;
  height = 30;
  life = 3;
  bulletSpeed = 2.8;
  movment = 10;
  speed = 1;
  level = 0;
  offY = 0;
  directions = {
    up: {
      y: -this.speed,
      angle: 0,
      pressed: false,
    },
    down: {
      y: this.speed,
      angle: 180,
      pressed: false,
    },
    left: {
      x: -this.speed,
      angle: 270,
      pressed: false,
    },
    right: {
      x: this.speed,
      angle: 90,
      pressed: false,
    }
  };

  direction = this.directions.up.angle;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    if (this.level === 0) {
      this.offY = 0;
    } else if (this.level === 1) {
      this.offY = 64;
    } else if (this.level === 2) {
      this.offY = 128;
    } else if (this.level === 3) {
      this.offY = 192;
    }
    if (this.direction == 0) {
      if (this.directions.down.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 0, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 64, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.down.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 0, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 90) {
      if (this.directions.left.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 388, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 456, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.left.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 388, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 180) {
      if (this.directions.up.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 256, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 320, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.up.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 256, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 270) {
      if (this.directions.right.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 128, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 196, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.right.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 128, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    };
  };

  run() {
    if (this.life > 0) {
      this.draw();
    };
  };

  dead() {
    audio.engineSound.pause();
    audio.playerDeadSound.play();
    this.bulletSpeed = 2.8;
    this.speed = 1;
    this.level = 0;
    this.life--;
    this.x = 165;
    this.y = 485;
    this.direction = this.directions.up.angle;
    ctx.drawImage(images.boomsImg, 320, 0, 128, 128, this.x - 20, this.y - 20, 60, 60);
  };

  render() {
    this.x = 165;
    this.y = 485;
    this.direction = this.directions.up.angle;
  };

  onKeyDown(e) {
    if (e.keyCode == 37) {
      this.directions.right.pressed = true;
    } else if (e.keyCode == 38) {
      this.directions.down.pressed = true;
    } else if (e.keyCode == 39) {
      this.directions.left.pressed = true;
    } else if (e.keyCode == 40) {
      this.directions.up.pressed = true;
    }
  };

  onKeyUp(e) {
    if (e.keyCode == 37) {
      this.directions.right.pressed = false;
    } else if (e.keyCode == 38) {
      this.directions.down.pressed = false;
    } else if (e.keyCode == 39) {
      this.directions.left.pressed = false;
    } else if (e.keyCode == 40) {
      this.directions.up.pressed = false;
    }
  };
}

export default Player;