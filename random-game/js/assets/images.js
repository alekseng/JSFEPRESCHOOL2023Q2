let images = {
  gameObjects: null,
  imgPlayer: null,
  regularTank: null,
  lightTank: null,
  heavyTank: null,
  mediumTank: null,
  flagImg: null,
  bulletsImg: null,
  boomsImg: null,
  scoresImg: null,
  bonuses: null,
  bonusTanks: null,
};

for (const key in images) {
  images[key] = new Image();
  images[key].src = "./assets/images/sprites/" + key + ".png";
};

export default images;