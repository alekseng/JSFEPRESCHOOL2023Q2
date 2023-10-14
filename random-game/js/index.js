import { canvas, ctx } from "./canvas.js";
import dataEnemies from "./data/dataEnemies.js";
import audio from "./assets/audio.js";
import Bullet from "./classes/Bullet.js";
import Player from "./classes/Player.js";
import Regular from "./classes/enemies/Regular.js";
import Light from "./classes/enemies/Light.js";
import Heavy from "./classes/enemies/Heavy.js";
import Medium from "./classes/enemies/Medium.js";
import currentLevel from "./currentLevel.js";
import levelScore from "./levelScore.js";
import Flag from "./classes/map-objects/Flag.js";
import Score from "./classes/Score.js";
import renderMap from "./renderMap.js";

const playBtn = document.querySelector('.play');
const overlay = document.querySelector('.overlay');
const enemyContainer = document.querySelector('.enemy-container');
const items = document.querySelector('.items');
const resultInfo = document.querySelector('.result');
const templateInfo = document.createElement('template');
const levelCounter = document.querySelector('.level-counter');
const options = {
  hour: 'numeric', minute: 'numeric', year: '2-digit', day: 'numeric',
  month: 'numeric'
};

let isPlaying = false;
let maxLevel = 5;
let bullets = [];
let enemies = [];
let objects = [];
let bonuses = [];
let levelsEnemies = structuredClone(dataEnemies);
let timeOutDefeat = 1;
let lifeContainer = document.querySelector('.life-counter');
let player = new Player(ctx.x = 163, ctx.y = 485);
let flag = new Flag(ctx.x = 240, ctx.y = 480);
let date = new Date();
let scoreListRecordsTanks = [
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
  { score: 0, time: 'no data' },
];

if (localStorage.getItem('scoreListRecordsTanks')) {
  scoreListRecordsTanks = JSON.parse(localStorage.getItem('scoreListRecordsTanks'));
};

playBtn.addEventListener('click', startGame);
window.addEventListener('keydown', (e) => {
  player.onKeyDown(e);
  if (e.keyCode == 81 && bullets.length == 0) {
    audio.shotAudio.play();
    bullets.push(new Bullet(ctx.direction = player.direction, ctx.x = player.x, ctx.y = player.y, player.bulletSpeed));
  };
});

window.addEventListener('keyup', (e) => player.onKeyUp(e));

function startGame() {
  audio.startAudio.play();
  overlay.classList.add('_playing');
  isPlaying = true;
  setTimeout(() => {
    renderMap(objects);
    start();
  }, 1000);
};

function start() {
  if (isPlaying) {
    window.requestAnimationFrame(start);
  };
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.run();
  flag.draw();
  for (let i = 0; i < levelsEnemies[currentLevel.currentLevel - 1].length; i++) {
    if (enemyContainer.hasChildNodes) {
      enemyContainer.replaceChildren();
    };
    if (enemies.length < 3) {
      if (levelsEnemies[currentLevel.currentLevel - 1][i].type === 'Regular') {
        enemies.push(new Regular(levelsEnemies[currentLevel.currentLevel - 1][i].x, levelsEnemies[currentLevel.currentLevel - 1][i].y, levelsEnemies[currentLevel.currentLevel - 1][i].bonus));
        levelsEnemies[currentLevel.currentLevel - 1].shift();
        i--;
      } else if (levelsEnemies[currentLevel.currentLevel - 1][i].type === 'Heavy') {
        enemies.push(new Heavy(levelsEnemies[currentLevel.currentLevel - 1][i].x, levelsEnemies[currentLevel.currentLevel - 1][i].y, levelsEnemies[currentLevel.currentLevel - 1][i].bonus));
        levelsEnemies[currentLevel.currentLevel - 1].shift();
        i--;
      } else if (levelsEnemies[currentLevel.currentLevel - 1][i].type === 'Light') {
        enemies.push(new Light(levelsEnemies[currentLevel.currentLevel - 1][i].x, levelsEnemies[currentLevel.currentLevel - 1][i].y, levelsEnemies[currentLevel.currentLevel - 1][i].bonus));
        levelsEnemies[currentLevel.currentLevel - 1].shift();
        i--;
      } else if (levelsEnemies[currentLevel.currentLevel - 1][i].type === 'Medium') {
        enemies.push(new Medium(levelsEnemies[currentLevel.currentLevel - 1][i].x, levelsEnemies[currentLevel.currentLevel - 1][i].y, levelsEnemies[currentLevel.currentLevel - 1][i].bonus));
        levelsEnemies[currentLevel.currentLevel - 1].shift();
        i--;
      };
    };
  };

  for (let i = 0; i < levelsEnemies[currentLevel.currentLevel - 1].length; i++) {
    let div = document.createElement('div');
    div.classList.add('enemy-item');
    enemyContainer.append(div);
  };

  enemies.forEach((tank) => {
    tank.run();
  });

  objects.forEach(el => el.draw());

  bonuses.forEach((bonus) => {
    bonus.draw();
  });

  bonuses.forEach((elB) => {
    if (elB.x < player.x + player.width && elB.x + elB.width > player.x && elB.y < player.y + player.height && elB.y + elB.height > player.y) {
      elB.dead(player);
      bonuses.splice(bonuses.indexOf(elB), 1)
    };
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
      player.y + player.height > objects[i].y && objects[i].isMove) {
    } else if (player.x < objects[i].x + objects[i].width &&
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
        enemies[j].y + enemies[j].height > objects[i].y && objects[i].isMove) {
      } else if (enemies[j].x < objects[i].x + objects[i].width &&
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
      audio.steelAudio.play();
      bullet.dead();
      bullets.splice(bullets.indexOf(bullet), 1);
    };
  });

  bullets.forEach((elB, indB) => {
    objects.forEach((elW) => {
      if (elB.x < elW.x + elW.width && elB.x + elB.width > elW.x && elB.y < elW.y + elW.height && elB.y + elB.height > elW.y && elW.isDestroy) {
        elB.dead();
        bullets.splice(bullets.indexOf(indB), 1);
        objects.splice(objects.indexOf(elW), 1);
      } else if (elB.x < elW.x + elW.width && elB.x + elB.width > elW.x && elB.y < elW.y + elW.height && elB.y + elB.height > elW.y && !elW.isDestroy && elW.isShot) {
      } else if (elB.x < elW.x + elW.width && elB.x + elB.width > elW.x && elB.y < elW.y + elW.height && elB.y + elB.height > elW.y && !elW.isDestroy) {
        audio.steelAudio.play();
        elB.dead();
        bullets.splice(bullets.indexOf(indB), 1);
      };
    });
  });

  bullets.forEach((elB, indB) => {
    enemies.forEach((enemy) => {
      if (elB.x < enemy.x + enemy.width && elB.x + elB.width > enemy.x && elB.y < enemy.y + enemy.height && elB.y + elB.height > enemy.y && enemy.durability == 0) {
        enemy.createBonus(bonuses);
        enemy.dead();
        elB.dead();
        bullets.splice(bullets.indexOf(indB), 1);
        enemies.splice(enemies.indexOf(enemy), 1);
      } else if (elB.x < enemy.x + enemy.width && elB.x + elB.width > enemy.x && elB.y < enemy.y + enemy.height && elB.y + elB.height > enemy.y && enemy.durability > 0) {
        elB.dead();
        audio.heavyTankSound.play();
        enemy.durability -= 1;
        bullets.splice(bullets.indexOf(indB), 1);
      };
    });
  });

  bullets.forEach((elB, indB) => {
    if (elB.x < flag.x + flag.width && elB.x + elB.width > flag.x && elB.y < flag.y + flag.height && elB.y + elB.height > flag.y) {
      elB.dead();
      audio.playerDeadSound.play();
      flag.isDestroy = true;
      bullets.splice(bullets.indexOf(indB), 1);
    };
  });

  enemies.forEach((el) => {
    if (el.bullets.length > 0) {
      el.bullets[0].draw();
      if (el.bullets[0].y <= 0 || el.bullets[0].y >= 520 || el.bullets[0].x <= 0 || el.bullets[0].x >= 520) {
        el.bullets[0].dead();
        el.bullets.splice(el.bullets.indexOf([0]), 1);
      };
    };
  });

  enemies.forEach((elB, indB) => {
    objects.forEach((elW) => {
      if (elB.bullets[0]) {
        if (elB.bullets[0].x < elW.x + elW.width && elB.bullets[0].x + elB.bullets[0].width > elW.x && elB.bullets[0].y < elW.y + elW.height && elB.bullets[0].y + elB.bullets[0].height > elW.y && elW.isDestroy) {
          elB.bullets[0].dead();
          enemies[indB].bullets.splice(bullets.indexOf(0), 1);
          objects.splice(objects.indexOf(elW), 1);
        } else if (elB.bullets[0].x < elW.x + elW.width && elB.bullets[0].x + elB.bullets[0].width > elW.x && elB.bullets[0].y < elW.y + elW.height && elB.bullets[0].y + elB.bullets[0].height > elW.y && elW.isShot) {
        } else if (elB.bullets[0].x < elW.x + elW.width && elB.bullets[0].x + elB.bullets[0].width > elW.x && elB.bullets[0].y < elW.y + elW.height && elB.bullets[0].y + elB.bullets[0].height > elW.y && !elW.isDestroy) {
          elB.bullets[0].dead();
          enemies[indB].bullets.splice(bullets.indexOf(0), 1);
        };
      };
    });
  });

  enemies.forEach((elB, indB) => {
    bullets.forEach((elW) => {
      if (elB.bullets[0]) {
        if (elB.bullets[0].x < elW.x + elW.width && elB.bullets[0].x + elB.bullets[0].width > elW.x && elB.bullets[0].y < elW.y + elW.height && elB.bullets[0].y + elB.bullets[0].height > elW.y) {
          elB.bullets[0].dead();
          enemies[indB].bullets.splice(bullets.indexOf(0), 1);
          bullets.splice(bullets.indexOf(elW), 1);
        };
      };
    });
  });

  enemies.forEach((elB, indB) => {
    if (elB.bullets[0]) {
      if (elB.bullets[0].x < flag.x + flag.width && elB.bullets[0].x + elB.bullets[0].width > flag.x && elB.bullets[0].y < flag.y + flag.height && elB.bullets[0].y + elB.bullets[0].height > flag.y) {
        elB.bullets[0].dead();
        audio.playerDeadSound.play();
        flag.isDestroy = true;
        enemies[indB].bullets.splice(bullets.indexOf(0), 1);
      };
    };
  });

  enemies.forEach((elB, indB) => {
    if (elB.bullets[0]) {
      if (elB.bullets[0].x < player.x + player.width && elB.bullets[0].x + elB.bullets[0].width > player.x && elB.bullets[0].y < player.y + player.height && elB.bullets[0].y + elB.bullets[0].height > player.y) {
        elB.bullets[0].dead();
        player.dead();
        enemies[indB].bullets.splice(bullets.indexOf(0), 1);
      };
    };
  });

  if (flag.isDestroy || (enemies.length == 0 && levelsEnemies[currentLevel.currentLevel - 1].length == 0) || player.life == 0) {
    timeOutDefeat--;
    if (timeOutDefeat == 0) {
      isPlaying = false;
      if (flag.isDestroy || player.life == 0) {
        levelScore.result = 'You lose';
        saveScore();
        endGame();
      } else if (enemies.length == 0) {
        if (currentLevel.currentLevel < maxLevel) {
          levelScore.result = 'You win';
          endGame();
        } else if (currentLevel.currentLevel == maxLevel) {
          levelScore.result = 'Congratulations, you have passed the game. To be continued';
          saveScore();
          endGame();
        };
      };
    };
  };
  lifeContainer.textContent = player.life - 1;
  levelCounter.textContent = currentLevel.currentLevel;
  date = new Date();
};

function getScore() {
  if (items.hasChildNodes) {
    items.replaceChildren();
  };
  scoreListRecordsTanks.sort((a, b) => a.score - b.score).reverse();
  let sliceScore = scoreListRecordsTanks.slice(0, 10);
  scoreListRecordsTanks = sliceScore;
  scoreListRecordsTanks.forEach((elem, index) => {
    let template = document.createElement('template');
    template.innerHTML = `
        <li><span>${index + 1}.</span><span>${elem.score}</span><span>${elem.time}</span></li>
      `;
    items.append(template.content);
  });
  localStorage.setItem('scoreListRecordsTanks', JSON.stringify(scoreListRecordsTanks));
};
getScore();

function saveScore() {
  let scoreItem = new Score(levelScore.total, date.toLocaleDateString('ru-RU', options));
  scoreListRecordsTanks.push(scoreItem);
  localStorage.setItem('scoreListRecordsTanks', JSON.stringify(scoreListRecordsTanks));
};

function endGame() {
  if (resultInfo.hasChildNodes) {
    resultInfo.replaceChildren();
  };
  templateInfo.innerHTML = `
  <div class="current-level"><div>${levelScore.result}</div><div>stage ${levelScore.stage}</div></div>
        <div class="score">
          <div>1-player</div><div><span>total score:</span><span> ${levelScore.total}</span></div>
        </div>
        <div class="statistics">
          <div class="regular"><span>${levelScore.regular}</span><span>points</span><span>${levelScore.regularCount}</span><span><</span><span>
  <img src="./assets/images/icons/regular-icon.png" alt="">
          </span></div>
          <div class="light"><span>${levelScore.light}</span><span>points</span><span>${levelScore.lightCount}</span><span><</span><span>
  <img src="./assets/images/icons/light-icon.png" alt="">
          </span></div>
          <div class="medium"><span>${levelScore.medium}</span><span>points</span><span>${levelScore.mediumCount}</span><span><</span><span>
            <img src="./assets/images/icons/medium-icon.png" alt="">
          </span></div>
          <div class="heavy"><span>${levelScore.heavy}</span><span>points</span><span>${levelScore.heavyCount}</span><span><</span><span>
            <img src="./assets/images/icons/heavy-icon.png" alt="">
          </span></div>
          <div class="total"><span>${levelScore.regular + levelScore.light + levelScore.medium + levelScore.heavy}</span><span>points</span><span>${levelScore.regularCount + levelScore.lightCount + levelScore.mediumCount + levelScore.heavyCount}</span><span></span></div>
        </div>
  `
  resultInfo.append(templateInfo.content);
  resultInfo.classList.add('_visible');

  if (levelScore.result == 'You lose') {
    lose();
  } else if (levelScore.result == 'You win') {
    win();
  } else if (levelScore.result == 'Congratulations, you have passed the game. To be continued') {
    complite();
  };
};

function reset() {
  timeOutDefeat = 1;
  bullets = [];
  objects = [];
  bonuses = [];
  levelScore.result = '';
  levelScore.stage = currentLevel.currentLevel;
  levelScore.score = 0;
  levelScore.regular = 0;
  levelScore.light = 0;
  levelScore.medium = 0;
  levelScore.heavy = 0;
  levelScore.regularCount = 0;
  levelScore.lightCount = 0;
  levelScore.mediumCount = 0;
  levelScore.heavyCount = 0;
  resultInfo.classList.remove('_visible');
};

function hardReset() {
  enemies = [];
  levelScore.total = 0;
  levelsEnemies = structuredClone(dataEnemies);
  player = new Player(ctx.x = 163, ctx.y = 485);
  flag = new Flag(ctx.x = 240, ctx.y = 480);
};

function lose() {
  audio.defeatSound.play();
  currentLevel.currentLevel = 1;
  setTimeout(() => {
    overlay.classList.remove('_playing');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reset();
    hardReset();
    getScore();
  }, 6500);
};

function win() {
  setTimeout(() => {
    currentLevel.currentLevel += 1;
    isPlaying = true;
    reset();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderMap(objects);
    player.render();
    audio.startAudio.play();
    setTimeout(() => {
      start();
    }, 1000);
  }, 6500);
};

function complite() {
  currentLevel.currentLevel = 1;
  setTimeout(() => {
    reset();
    hardReset();
    overlay.classList.remove('_playing');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    getScore();
  }, 10000);
};