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
  directions = {
    up: {
      y: -1,
      angle: 0,
      pressed: false,
    },
    down: {
      y: 1,
      angle: 180,
      pressed: false,
    },
    left: {
      x: -1,
      angle: 270,
      pressed: false,
    },
    right: {
      x: 1,
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
    if (this.direction == 0) {
      if (this.directions.down.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 0, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 62, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.down.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 0, 0, 52, 52, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 90) {
      if (this.directions.left.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 372, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 434, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.left.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 372, 0, 52, 52, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 180) {
      if (this.directions.up.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 248, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 310, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.up.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 248, 0, 52, 52, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 270) {
      if (this.directions.right.pressed) {
        audio.engineSound.play();
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.imgPlayer, 124, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.imgPlayer, 186, 0, 52, 52, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (!this.directions.right.pressed) {
        audio.engineSound.pause();
        ctx.drawImage(images.imgPlayer, 124, 0, 52, 52, this.x, this.y, this.width, this.height);
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