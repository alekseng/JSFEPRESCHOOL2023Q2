import playList from './playList.js';

const ul = document.querySelector('ul');

playList.forEach((elem) => {
  let audio = document.createElement('audio');
  audio.src = elem.src;
  ul.append(audio);
  let template = document.createElement('template');
  template.innerHTML = `
  <li><span>${elem.title}</span><span>${elem.duration}</span></li>
  `;
  ul.append(template.content);
});

const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play-pause-btn');
const playNextBtn = document.querySelector('.next-btn');
const playPrevBtn = document.querySelector('.prev-btn');
const progressContainer = document.querySelector('.progress');
const progress = document.querySelector('.progress-bar');
const circleLeft = document.querySelector('.cover-c__fg__bottom__top__circle-left');
const circleRight = document.querySelector('.cover-c__fg__bottom__top__circle-right');
const openPlayList = document.querySelector('.play-list-btn');
const playListList = document.querySelector('.play-list');
const cover = document.querySelector('.cover-c__fg__top__cover');
const li = document.querySelectorAll('li');

let isPlay = false;
let indexSong = playList.length - 1;
let playNum = 0;
let title = document.querySelector('.title');
let author = document.querySelector('.author');
let duration = document.querySelector('.duration');
let volume = document.querySelector('.volume-range');
let infoCurrent = document.querySelector('.info-current');
let infoTotal = document.querySelector('.info-total');

title.textContent = playList[playNum].title;
author.textContent = playList[playNum].author;
infoCurrent.textContent = playNum + 1;
infoTotal.textContent = playList.length;
cover.style.backgroundImage =  `url(${playList[playNum].cover})`;
li[playNum].classList.add('_active');

playBtn.addEventListener('click', playPause);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPrev);

let currentProgress;

function playPause() {
  currentProgress = audio.currentTime;
  li.forEach(element => {
    element.classList.remove('_active');
  });
  if (!isPlay) {
    audio.src = playList[playNum].src;
    cover.style.backgroundImage =  `url(${playList[playNum].cover})`;
    audio.play();
    isPlay = true;
    playBtn.classList.add('pause');
    circleLeft.classList.add('_play');
    circleRight.classList.add('_play');
    li[playNum].classList.add('_active');
    title.textContent = playList[playNum].title;
    author.textContent = playList[playNum].author;
    duration.textContent = playList[playNum].duration;
    audio.currentTime = currentProgress;
    infoCurrent.textContent = playNum + 1;
  } else {
    audio.pause();
    playBtn.classList.remove('pause');
    circleLeft.classList.remove('_play');
    circleRight.classList.remove('_play');
    li[playNum].classList.add('_active');
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

progressContainer.addEventListener('click', function (e) {
  audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration;
});

audio.addEventListener('timeupdate', () => {
  progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});

function volumeFunc() {
  audio.volume = volume.value;
};

setInterval(volumeFunc, 100);

openPlayList.addEventListener('click', (e) => {
  playListList.classList.toggle('_open');
});
