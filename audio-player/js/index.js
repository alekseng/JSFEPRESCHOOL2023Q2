import playList from './playList.js';

const ul = document.querySelector('ul');

playList.forEach((elem) => {
  let audio = document.createElement('audio');
  audio.src = elem.src;
  ul.append(audio);
  let li = document.createElement('li');
  li.textContent = elem.title;
  ul.append(li);
});

const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play-pause-btn');
const playNextBtn = document.querySelector('.next-btn');
const playPrevBtn = document.querySelector('.prev-btn');
const progressContainer = document.querySelector('.progress');
const progress = document.querySelector('.progress-bar');
const circleLeft = document.querySelector('.cover-c__fg__bottom__top__circle-left');
const circleRight = document.querySelector('.cover-c__fg__bottom__top__circle-right');

let isPlay = false;
let indexSong = playList.length - 1;
let playNum = 0;
let title = document.querySelector('.title');
let duration = document.querySelector('.duration');

title.textContent = playList[playNum].title;

playBtn.addEventListener('click', playPause);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

let currentProgress;

function playPause() {
  currentProgress = audio.currentTime;
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.play();
    isPlay = true;
    circleLeft.classList.add('_play');
    circleRight.classList.add('_play');
    title.textContent = playList[playNum].title;
    duration.textContent = playList[playNum].duration;
    audio.currentTime = currentProgress;
  } else {
    audio.pause();
    circleLeft.classList.remove('_play');
    circleRight.classList.remove('_play');
    isPlay = false;
  }
};

function updatePlayBackTime() {
  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds');
  let min = parseInt((audio.currentTime) / 60);
  let sec = parseInt(audio.currentTime) % 60;
  duration.textContent = playList[playNum].duration;
  if (min < 10) {
    minutes.textContent = '0' + min;
  } else
    minutes.textContent = min;
  if (sec < 10) {
    seconds.textContent = '0' + sec;
  } else
    seconds.textContent = sec;
};
updatePlayBackTime();

audio.addEventListener('timeupdate', updatePlayBackTime);

function playNext() {
  if (playNum < indexSong) {
    playNum++;
  } else {
    playNum = 0;
  }
  audio.src = playList[playNum].src;
  isPlay = false;
  playPause();
};

function playPrev() {
  if (playNum > 0) {
    playNum--;
  } else {
    playNum = indexSong;
  }
  audio.src = playList[playNum].src;
  isPlay = false;
  playPause();
};

audio.addEventListener('ended', playNext);