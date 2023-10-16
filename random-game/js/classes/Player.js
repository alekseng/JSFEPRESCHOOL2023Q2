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
  up = 0;
  down = 256;
  left = 128;
  right = 388;
  helmetDurability = 350;
  shieldAnimTime = 20;
  posShield = 0;
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

  constructor(x, y, helmet) {
    this.x = x;
    this.y = y;
    this.helmet = helmet;
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
        ctx.drawImage(images.imgPlayer, this.up, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        if (this.movment < 5) { this.up = 0 }
        if (this.movment > 5) { this.up = 64 }
        if (this.movment == 0) { this.movment += 10 }
      } else if (!this.directions.down.pressed) {
        audio.engineSound.pause();
        this.up = 0;
        ctx.drawImage(images.imgPlayer, this.up, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 90) {
      if (this.directions.left.pressed) {
        audio.engineSound.play();
        this.movment--;
        ctx.drawImage(images.imgPlayer, this.right, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        if (this.movment < 5) { this.right = 388 }
        if (this.movment > 5) { this.right = 456 }
        if (this.movment == 0) { this.movment += 10 }
      } else if (!this.directions.left.pressed) {
        audio.engineSound.pause();
        this.right = 388;
        ctx.drawImage(images.imgPlayer, this.right, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 180) {
      if (this.directions.up.pressed) {
        audio.engineSound.play();
        this.movment--;
        ctx.drawImage(images.imgPlayer, this.down, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        if (this.movment < 5) { this.down = 256 }
        if (this.movment > 5) { this.down = 320 }
        if (this.movment == 0) { this.movment += 10 }
      } else if (!this.directions.up.pressed) {
        audio.engineSound.pause();
        this.down = 256;
        ctx.drawImage(images.imgPlayer, this.down, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    } else if (this.direction == 270) {
      if (this.directions.right.pressed) {
        audio.engineSound.play();
        this.movment--;
        ctx.drawImage(images.imgPlayer, this.left, this.offY, 60, 60, this.x, this.y, this.width, this.height);
        if (this.movment < 5) { this.left = 128 }
        if (this.movment > 5) { this.left = 196 }
        if (this.movment == 0) { this.movment += 10 }
      } else if (!this.directions.right.pressed) {
        audio.engineSound.pause();
        this.left = 128;
        ctx.drawImage(images.imgPlayer, this.left, this.offY, 60, 60, this.x, this.y, this.width, this.height);
      }
    };
  };

  run() {
    if (this.life > 0) {
      this.draw();
    };
    this.shield();
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
    this.helmet = true;
    this.helmetDurability = 350;
  };

  render() {
    this.x = 165;
    this.y = 485;
    this.direction = this.directions.up.angle;
    this.helmet = true;
    this.helmetDurability = 350;
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

  shield() {
    if (this.helmet && this.helmetDurability > 0) {
      this.helmetDurability--
      this.shieldAnimTime--
      ctx.drawImage(images.boomsImg, this.posShield, 64, 64, 64, this.x, this.y, this.width, this.height);
      if (this.shieldAnimTime < 10) { this.posShield = 0 }
      if (this.shieldAnimTime > 10) { this.posShield = 64 }
      if (this.shieldAnimTime == 0) { this.shieldAnimTime += 20 }
      if (this.helmetDurability == 0) {
        this.helmetDurability = 0
        this.helmet = false
      }
    }
  };
}

export default Player;