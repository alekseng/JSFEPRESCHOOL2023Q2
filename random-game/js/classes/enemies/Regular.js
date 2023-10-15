import Bullet from "../Bullet.js";
import audio from "../../assets/audio.js";
import images from "../../assets/images.js";
import { ctx } from "../../canvas.js";
import levelScore from "../../levelScore.js";
import Bonus from "../Bonus.js";

class Regular {
  x = 0;
  y = 0;
  width = 30;
  height = 30;
  time = 100;
  shotTimeOut = 50;
  offX = 0.8;
  offY = 0.8;
  bullets = [];
  canShot = true;
  speed = 0.8;
  durability = 0;
  bulletSpeed = 2;
  movment = 10;
  hasBonus = false;
  directions = {
    up: {
      y: -this.speed,
      angle: 0,
    },
    down: {
      y: this.speed,
      angle: 180,
    },
    left: {
      x: -this.speed,
      angle: 270,
    },
    right: {
      x: this.speed,
      angle: 90,
    }
  };

  direction = this.directions.down.angle;

  constructor(x, y, bonus) {
    this.x = x;
    this.y = y;
    this.hasBonus = bonus;
  };

  draw() {
    if (this.hasBonus) {
      if (this.direction == 0) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.bonusTanks, 0, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.bonusTanks, 64, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (this.direction == 90) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.bonusTanks, 388, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.bonusTanks, 452, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (this.direction == 180) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.bonusTanks, 256, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.bonusTanks, 320, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (this.direction == 270) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.bonusTanks, 128, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.bonusTanks, 192, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      };
    } else {
      if (this.direction == 0) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.regularTank, 0, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.regularTank, 60, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (this.direction == 90) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.regularTank, 380, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.regularTank, 448, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (this.direction == 180) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.regularTank, 256, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.regularTank, 316, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      } else if (this.direction == 270) {
        this.movment--;
        if (this.movment < 5) {
          ctx.drawImage(images.regularTank, 124, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment > 5) {
          ctx.drawImage(images.regularTank, 192, 0, 60, 60, this.x, this.y, this.width, this.height);
        } if (this.movment == 0) {
          this.movment += 10;
        }
      };
    }
  };

  run() {
    this.draw();
    this.go();
    this.shot();
  };

  go() {
    let num = Math.floor(Math.random() * 4);

    switch (this.direction) {
      case 0:
        this.y += this.offY;
        break;
      case 90:
        this.x += this.offX;
        break;
      case 180:
        this.y += this.offY;
        break;
      case 270:
        this.x += this.offX;
        break;
    };

    if (this.time > 0) {
      this.time--;
    } else {
      this.time = 100;
      if (num == 0) {
        this.direction = 0;
        this.offY = -this.speed;
      } else if (num == 1) {
        this.direction = 90;
        this.offX = this.speed;
      } else if (num == 2) {
        this.direction = 180;
        this.offY = this.speed;
      } else if (num == 3) {
        this.direction = 270;
        this.offX = -this.speed;
      };
    };
  };

  shot() {
    if (this.shotTimeOut > 0 && this.canShot == false) {
      this.shotTimeOut--;
      if (this.shotTimeOut == 0) {
        this.canShot = true;
      };
    } else if (this.bullets.length == 0 && this.canShot == true) {
      this.shotTimeOut = 50;
      this.bullets.push(new Bullet(this.direction, this.x, this.y, this.bulletSpeed));
      this.canShot = false;
    };
  };

  dead() {
    audio.enemyDeadSound.play();
    if (this.hasBonus) {
      audio.deadBonusTank.play();
    }
    ctx.drawImage(images.boomsImg, 320, 0, 128, 128, this.x - 20, this.y - 20, 60, 60);
    ctx.drawImage(images.scoresImg, 0, 0, 52, 28, this.x - 20, this.y, 52, 28);
    levelScore.total += 100;
    levelScore.regular += 100;
    levelScore.regularCount += 1;
  };

  createBonus(bonuses) {
    if (this.hasBonus) {
      let bonus = Math.floor(Math.random() * 3) + 1;
      if (bonus === 1) {
        bonuses.push(new Bonus(1));
      } else if (bonus === 2) {
        bonuses.push(new Bonus(2));
      } else if (bonus === 3) {
        bonuses.push(new Bonus(3));
      }
    }
  };

  destroy() {
    audio.enemyDeadSound.play();
    ctx.drawImage(images.boomsImg, 320, 0, 128, 128, this.x - 20, this.y - 20, 60, 60);
  }
};

export default Regular;