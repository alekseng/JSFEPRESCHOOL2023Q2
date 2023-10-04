const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 520;
canvas.height = 520;

const bullets = [];

class Tank {
  x = 0;
  y = 0;
  width = 30;
  height = 30;
  directions = {
    up: {
      y: -1,
      pressed: false,
    },
    down: {
      y: 1,
      pressed: false,
    },
    left: {
      x: -1,
      pressed: false,
    },
    right: {
      x: 1,
      pressed: false,
    }
  };

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
};

class Bullet {
  bulletSpeed = 2.8;
  vectorX = 11;
  vectorY = 11;
  width = 8;
  height = 8;
  constructor(x, y) {
    this.x = this.vectorX + x;
    this.y = this.vectorY + y;
  };

  draw() {
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.y -= this.bulletSpeed;
  };
};

const bullet = new Bullet();

const player = new Tank(x = 245, y = 245);

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
    bullets.push(new Bullet(x = player.x, y = player.y));
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

  if (player.directions.right.pressed) {
    player.directions.up.pressed = false;
    player.directions.down.pressed = false;
    player.directions.right.x = 1;
    player.x += player.directions.left.x;
  };
  if (player.directions.left.pressed) {
    player.directions.up.pressed = false;
    player.directions.down.pressed = false;
    player.directions.left.x = -1;
    player.x += player.directions.right.x;
  };
  if (player.directions.up.pressed) {
    player.directions.right.pressed = false;
    player.directions.left.pressed = false;
    player.directions.up.y = -1;
    player.y += player.directions.down.y;
  };
  if (player.directions.down.pressed) {
    player.directions.right.pressed = false;
    player.directions.left.pressed = false;
    player.directions.down.y = 1;
    player.y += player.directions.up.y;
  };

  bullets.forEach((bullet) => {
    bullet.draw();
    if (bullet.y <= 0 || bullet.y >= 520 || bullet.x <= 0 || bullet.x >= 520) {
      bullets.splice(bullets.indexOf(bullet), 1);
    };
  });
};
animation();