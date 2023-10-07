const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 520;
canvas.height = 520;

const dataBrickWalls = [
  { x: 0, y: 260 },
  { x: 20, y: 260 },
  { x: 480, y: 260 },
  { x: 500, y: 260 },

  { x: 40, y: 40 },
  { x: 40, y: 60 },
  { x: 40, y: 80 },
  { x: 40, y: 100 },
  { x: 40, y: 120 },
  { x: 40, y: 140 },
  { x: 40, y: 160 },
  { x: 40, y: 180 },
  { x: 40, y: 200 },
  { x: 60, y: 40 },
  { x: 60, y: 60 },
  { x: 60, y: 80 },
  { x: 60, y: 100 },
  { x: 60, y: 120 },
  { x: 60, y: 140 },
  { x: 60, y: 160 },
  { x: 60, y: 180 },
  { x: 60, y: 200 },

  { x: 120, y: 40 },
  { x: 120, y: 60 },
  { x: 120, y: 80 },
  { x: 120, y: 100 },
  { x: 120, y: 120 },
  { x: 120, y: 140 },
  { x: 120, y: 160 },
  { x: 120, y: 180 },
  { x: 120, y: 200 },
  { x: 140, y: 40 },
  { x: 140, y: 60 },
  { x: 140, y: 80 },
  { x: 140, y: 100 },
  { x: 140, y: 120 },
  { x: 140, y: 140 },
  { x: 140, y: 160 },
  { x: 140, y: 180 },
  { x: 140, y: 200 },

  { x: 200, y: 40 },
  { x: 200, y: 60 },
  { x: 200, y: 80 },
  { x: 200, y: 100 },
  { x: 200, y: 120 },
  { x: 200, y: 140 },
  { x: 200, y: 160 },
  { x: 220, y: 40 },
  { x: 220, y: 60 },
  { x: 220, y: 80 },
  { x: 220, y: 100 },
  { x: 220, y: 120 },
  { x: 220, y: 140 },
  { x: 220, y: 160 },

  { x: 280, y: 40 },
  { x: 280, y: 60 },
  { x: 280, y: 80 },
  { x: 280, y: 100 },
  { x: 280, y: 120 },
  { x: 280, y: 140 },
  { x: 280, y: 160 },
  { x: 300, y: 40 },
  { x: 300, y: 60 },
  { x: 300, y: 80 },
  { x: 300, y: 100 },
  { x: 300, y: 120 },
  { x: 300, y: 140 },
  { x: 300, y: 160 },

  { x: 360, y: 40 },
  { x: 360, y: 60 },
  { x: 360, y: 80 },
  { x: 360, y: 100 },
  { x: 360, y: 120 },
  { x: 360, y: 140 },
  { x: 360, y: 160 },
  { x: 360, y: 180 },
  { x: 360, y: 200 },
  { x: 380, y: 40 },
  { x: 380, y: 60 },
  { x: 380, y: 80 },
  { x: 380, y: 100 },
  { x: 380, y: 120 },
  { x: 380, y: 140 },
  { x: 380, y: 160 },
  { x: 380, y: 180 },
  { x: 380, y: 200 },

  { x: 440, y: 40 },
  { x: 440, y: 60 },
  { x: 440, y: 80 },
  { x: 440, y: 100 },
  { x: 440, y: 120 },
  { x: 440, y: 140 },
  { x: 440, y: 160 },
  { x: 440, y: 180 },
  { x: 440, y: 200 },
  { x: 460, y: 40 },
  { x: 460, y: 60 },
  { x: 460, y: 80 },
  { x: 460, y: 100 },
  { x: 460, y: 120 },
  { x: 460, y: 140 },
  { x: 460, y: 160 },
  { x: 460, y: 180 },
  { x: 460, y: 200 },

  { x: 40, y: 340 },
  { x: 40, y: 360 },
  { x: 40, y: 380 },
  { x: 40, y: 400 },
  { x: 40, y: 420 },
  { x: 40, y: 440 },
  { x: 40, y: 460 },
  { x: 60, y: 340 },
  { x: 60, y: 360 },
  { x: 60, y: 380 },
  { x: 60, y: 400 },
  { x: 60, y: 420 },
  { x: 60, y: 440 },
  { x: 60, y: 460 },

  { x: 120, y: 340 },
  { x: 120, y: 360 },
  { x: 120, y: 380 },
  { x: 120, y: 400 },
  { x: 120, y: 420 },
  { x: 120, y: 440 },
  { x: 120, y: 460 },
  { x: 140, y: 340 },
  { x: 140, y: 360 },
  { x: 140, y: 380 },
  { x: 140, y: 400 },
  { x: 140, y: 420 },
  { x: 140, y: 440 },
  { x: 140, y: 460 },

  { x: 360, y: 340 },
  { x: 360, y: 360 },
  { x: 360, y: 380 },
  { x: 360, y: 400 },
  { x: 360, y: 420 },
  { x: 360, y: 440 },
  { x: 360, y: 460 },
  { x: 380, y: 340 },
  { x: 380, y: 360 },
  { x: 380, y: 380 },
  { x: 380, y: 400 },
  { x: 380, y: 420 },
  { x: 380, y: 440 },
  { x: 380, y: 460 },

  { x: 440, y: 340 },
  { x: 440, y: 360 },
  { x: 440, y: 380 },
  { x: 440, y: 400 },
  { x: 440, y: 420 },
  { x: 440, y: 440 },
  { x: 440, y: 460 },
  { x: 460, y: 340 },
  { x: 460, y: 360 },
  { x: 460, y: 380 },
  { x: 460, y: 400 },
  { x: 460, y: 420 },
  { x: 460, y: 440 },
  { x: 460, y: 460 },

  { x: 80, y: 260 },
  { x: 80, y: 280 },
  { x: 100, y: 260 },
  { x: 100, y: 280 },
  { x: 120, y: 260 },
  { x: 120, y: 280 },
  { x: 140, y: 260 },
  { x: 140, y: 280 },

  { x: 200, y: 220 },
  { x: 200, y: 240 },
  { x: 220, y: 220 },
  { x: 220, y: 240 },

  { x: 280, y: 220 },
  { x: 280, y: 240 },
  { x: 300, y: 220 },
  { x: 300, y: 240 },

  { x: 360, y: 260 },
  { x: 360, y: 280 },
  { x: 380, y: 260 },
  { x: 380, y: 280 },
  { x: 400, y: 260 },
  { x: 400, y: 280 },
  { x: 420, y: 260 },
  { x: 420, y: 280 },

  { x: 200, y: 300 },
  { x: 200, y: 320 },
  { x: 200, y: 340 },
  { x: 200, y: 360 },
  { x: 200, y: 380 },
  { x: 200, y: 400 },
  { x: 220, y: 300 },
  { x: 220, y: 320 },
  { x: 220, y: 340 },
  { x: 220, y: 360 },
  { x: 220, y: 380 },
  { x: 220, y: 400 },

  { x: 240, y: 320 },
  { x: 240, y: 340 },
  { x: 260, y: 320 },
  { x: 260, y: 340 },

  { x: 280, y: 300 },
  { x: 280, y: 320 },
  { x: 280, y: 340 },
  { x: 280, y: 360 },
  { x: 280, y: 380 },
  { x: 280, y: 400 },
  { x: 300, y: 300 },
  { x: 300, y: 320 },
  { x: 300, y: 340 },
  { x: 300, y: 360 },
  { x: 300, y: 380 },
  { x: 300, y: 400 },

  { x: 220, y: 460 },
  { x: 220, y: 480 },
  { x: 220, y: 500 },

  { x: 240, y: 460 },
  { x: 260, y: 460 },

  { x: 280, y: 460 },
  { x: 280, y: 480 },
  { x: 280, y: 500 },
];

const dataConcreteWalls = [
  { x: 0, y: 280 },
  { x: 20, y: 280 },
  { x: 480, y: 280 },
  { x: 500, y: 280 },

  { x: 240, y: 120 },
  { x: 240, y: 140 },
  { x: 260, y: 120 },
  { x: 260, y: 140 },
];

const bullets = [];
const objects = [];
const enemies = [];

const gameObjects = new Image();
gameObjects.src = "./assets/images/objects.png";

const imgPlayer = new Image();
imgPlayer.src = "./assets/images/player.png";

const regularTank = new Image();
regularTank.src = "./assets/images/regular.png";

class Tank {
  x = 0;
  y = 0;
  width = 30;
  height = 30;
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
      ctx.drawImage(imgPlayer, 0, 0, 52, 52, this.x, this.y, this.width, this.height);
    } else if (this.direction == 90) {
      ctx.drawImage(imgPlayer, 372, 0, 52, 52, this.x, this.y, this.width, this.height);
    } else if (this.direction == 180) {
      ctx.drawImage(imgPlayer, 248, 0, 52, 52, this.x, this.y, this.width, this.height);
    } else if (this.direction == 270) {
      ctx.drawImage(imgPlayer, 124, 0, 52, 52, this.x, this.y, this.width, this.height);
    };
  };
};

class Regular {
  x = 0;
  y = 0;
  width = 30;
  height = 30;
  time = 100;
  shotTimeOut = 50;
  offX = 1;
  offY = 1;
  bullets = [];
  canShot = true;
  directions = {
    up: {
      y: -1,
      angle: 0,
    },
    down: {
      y: 1,
      angle: 180,
    },
    left: {
      x: -1,
      angle: 270,
    },
    right: {
      x: 1,
      angle: 90,
    }
  };

  direction = this.directions.down.angle;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  draw() {
    if (this.direction == 0) {
      ctx.drawImage(regularTank, 0, 0, 60, 60, this.x, this.y, this.width, this.height);
    } else if (this.direction == 90) {
      ctx.drawImage(regularTank, 380, 0, 60, 60, this.x, this.y, this.width, this.height);
    } else if (this.direction == 180) {
      ctx.drawImage(regularTank, 256, 0, 60, 60, this.x, this.y, this.width, this.height);
    } else if (this.direction == 270) {
      ctx.drawImage(regularTank, 124, 0, 60, 60, this.x, this.y, this.width, this.height);
    };
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
        this.offY = -1;
      } else if (num == 1) {
        this.direction = 90;
        this.offX = 1;
      } else if (num == 2) {
        this.direction = 180;
        this.offY = 1;
      } else if (num == 3) {
        this.direction = 270;
        this.offX = -1;
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
      this.bullets.push(new Bullet(this.direction, this.x, this.y));
      this.canShot = false;
    };
  };
};

class Bullet {
  bulletSpeed = 2.8;
  vectorX = 11;
  vectorY = 11;
  width = 8;
  height = 8;
  constructor(direction, x, y) {
    this.direction = direction;
    this.x = this.vectorX + x;
    this.y = this.vectorY + y;
  };

  draw() {
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.direction == 0) {
      this.y -= this.bulletSpeed;
    } else if (this.direction == 90) {
      this.x += this.bulletSpeed;
    } else if (this.direction == 180) {
      this.y += this.bulletSpeed;
    } else if (this.direction == 270) {
      this.x -= this.bulletSpeed;
    };
  };
};

class BrickWall {
  width = 20;
  height = 20;
  isDestroy = true;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  draw() {
    ctx.drawImage(gameObjects, 34, 0, 32, 32, this.x, this.y, this.width, this.height);
  };
};

class ConcreteWall {
  width = 20;
  height = 20;
  isDestroy = false;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  };

  draw() {
    ctx.drawImage(gameObjects, 0, 0, 32, 32, this.x, this.y, this.width, this.height);
  };
};

dataBrickWalls.forEach((el, ind) => {
  objects.push(new BrickWall(el.x, el.y));
});

dataConcreteWalls.forEach((el, ind) => {
  objects.push(new ConcreteWall(el.x, el.y));
});

const bullet = new Bullet();
const player = new Tank(x = 163, y = 485);
enemies.push(new Regular(x = 3, y = 0))
enemies.push(new Regular(x = 243, y = 0))
enemies.push(new Regular(x = 483, y = 0))

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    player.directions.right.pressed = true;
  }
  else if (e.keyCode == 38) {
    player.directions.down.pressed = true;
  }
  else if (e.keyCode == 39) {
    player.directions.left.pressed = true;
  }
  else if (e.keyCode == 40) {
    player.directions.up.pressed = true;
  };
  if (e.keyCode == 81 && bullets.length == 0) {
    bullets.push(new Bullet(direction = player.direction, x = player.x, y = player.y));
  };
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == 37) {
    player.directions.right.pressed = false;
  }
  else if (e.keyCode == 38) {
    player.directions.down.pressed = false;
  }
  else if (e.keyCode == 39) {
    player.directions.left.pressed = false;
  }
  else if (e.keyCode == 40) {
    player.directions.up.pressed = false;
  };
});

function animation() {
  window.requestAnimationFrame(animation);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  objects.forEach(el => el.draw());
  enemies.forEach((tank) => {
    tank.run();
  });

  if (player.directions.right.pressed) {
    player.directions.up.pressed = false;
    player.directions.down.pressed = false;
    player.directions.right.x = 1;
    player.x += player.directions.left.x;
    player.direction = player.directions.left.angle;
    if (player.x <= 3) {
      player.directions.left.x = 0;
    };
  };
  if (player.directions.left.pressed) {
    player.directions.up.pressed = false;
    player.directions.down.pressed = false;
    player.directions.left.x = -1;
    player.x += player.directions.right.x;
    player.direction = player.directions.right.angle;
    if (player.x >= 487) {
      player.directions.right.x = 0;
    };
  };
  if (player.directions.up.pressed) {
    player.directions.right.pressed = false;
    player.directions.left.pressed = false;
    player.directions.up.y = -1;
    player.y += player.directions.down.y;
    player.direction = player.directions.down.angle;
    if (player.y >= 487) {
      player.directions.down.y = 0;
    };
  };
  if (player.directions.down.pressed) {
    player.directions.right.pressed = false;
    player.directions.left.pressed = false;
    player.directions.down.y = 1;
    player.y += player.directions.up.y;
    player.direction = player.directions.up.angle;
    if (player.y <= 3) {
      player.directions.up.y = 0;
    };
  };

  for (let i = 0; i < objects.length; i++) {
    let prevX = player.x;
    let prevY = player.y;
    if (player.x < objects[i].x + objects[i].width &&
      player.x + player.width > objects[i].x &&
      player.y < objects[i].y + objects[i].height &&
      player.y + player.height > objects[i].y) {
      if (player.direction == 0) {
        player.y = prevY + 1;
      } else if (player.direction == 90) {
        player.x = prevX - 1;
      } else if (player.direction == 180) {
        player.y = prevY - 1;
      } else if (player.direction == 270) {
        player.x = prevX + 1;
      };
    };
  };

  enemies.forEach(el => {
    if (el.direction == 0 && el.y <= 3) {
      el.offY = 0;
    };
    if (el.direction == 90 && el.x >= 487) {
      el.offX = 0;
    };
    if (el.direction == 180 && el.y >= 487) {
      el.offY = 0;
    };
    if (el.direction == 270 && el.x <= 3) {
      el.offX = 0;
    };
  });

  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      let prevX = enemies[j].x;
      let prevY = enemies[j].y;
      if (enemies[j].x < objects[i].x + objects[i].width &&
        enemies[j].x + enemies[j].width > objects[i].x &&
        enemies[j].y < objects[i].y + objects[i].height &&
        enemies[j].y + enemies[j].height > objects[i].y) {
        if (enemies[j].direction == 0) {
          enemies[j].offY = 0;
          enemies[j].y = prevY + 3;
        } else if (enemies[j].direction == 90) {
          enemies[j].offX = 0;
          enemies[j].x = prevX - 3;
        } else if (enemies[j].direction == 180) {
          enemies[j].offY = 0;
          enemies[j].y = prevY - 3;
        } else if (enemies[j].direction == 270) {
          enemies[j].offX = 0;
          enemies[j].x = prevX + 3;
        };
      };
    };
  };

  bullets.forEach((bullet) => {
    bullet.draw();
    if (bullet.y <= 0 || bullet.y >= 520 || bullet.x <= 0 || bullet.x >= 520) {
      bullets.splice(bullets.indexOf(bullet), 1);
    };
  });

  bullets.forEach((elB, indB) => {
    objects.forEach((elW) => {
      if (elB.x < elW.x + elW.width && elB.x + elB.width > elW.x && elB.y < elW.y + elW.height && elB.y + elB.height > elW.y && elW.isDestroy) {
        bullets.splice(bullets.indexOf(indB), 1);
        objects.splice(objects.indexOf(elW), 1);
      } else if (elB.x < elW.x + elW.width && elB.x + elB.width > elW.x && elB.y < elW.y + elW.height && elB.y + elB.height > elW.y && !elW.isDestroy) {
        bullets.splice(bullets.indexOf(indB), 1);
      };
    });
  });

  enemies.forEach((el) => {
    if (el.bullets.length > 0) {
      el.bullets[0].draw();
      if (el.bullets[0].y <= 0 || el.bullets[0].y >= 520 || el.bullets[0].x <= 0 || el.bullets[0].x >= 520) {
        el.bullets.splice(el.bullets.indexOf([0]), 1);
      };
    };
  });

  enemies.forEach((elB, indB) => {
    objects.forEach((elW) => {
      if (elB.bullets[0]) {
        if (elB.bullets[0].x < elW.x + elW.width && elB.bullets[0].x + elB.bullets[0].width > elW.x && elB.bullets[0].y < elW.y + elW.height && elB.bullets[0].y + elB.bullets[0].height > elW.y && elW.isDestroy) {
          enemies[indB].bullets.splice(bullets.indexOf(0), 1);
          objects.splice(objects.indexOf(elW), 1);
        } else if (elB.bullets[0].x < elW.x + elW.width && elB.bullets[0].x + elB.bullets[0].width > elW.x && elB.bullets[0].y < elW.y + elW.height && elB.bullets[0].y + elB.bullets[0].height > elW.y && !elW.isDestroy) {
          enemies[indB].bullets.splice(bullets.indexOf(0), 1);
        };
      };
    });
  });

  enemies.forEach((elB, indB) => {
    bullets.forEach((elW) => {
      if (elB.bullets[0]) {
        if (elB.bullets[0].x < elW.x + elW.width && elB.bullets[0].x + elB.bullets[0].width > elW.x && elB.bullets[0].y < elW.y + elW.height && elB.bullets[0].y + elB.bullets[0].height > elW.y) {
          enemies[indB].bullets.splice(bullets.indexOf(0), 1);
          bullets.splice(bullets.indexOf(elW), 1);
        };
      };
    });
  });
};
animation();