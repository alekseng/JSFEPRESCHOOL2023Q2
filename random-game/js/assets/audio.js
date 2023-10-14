let audio = {
  startAudio: null,
  shotAudio: null,
  steelAudio: null,
  enemyDeadSound: null,
  heavyTankSound: null,
  defeatSound: null,
  playerDeadSound: null,
  engineSound: null
};

for (const key in audio) {
  audio[key] = new Audio();
  audio[key].src = "./assets/sounds/" + key + ".mp3";
}

export default audio;