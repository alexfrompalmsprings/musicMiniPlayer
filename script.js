// ------------------------------DOM Elements ------------------------------
const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// ------------------------------ functions------------------------------
// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// play & stop song
function playSong(){

  musicContainer.classList.add('play');
  playButton.querySelector('i.fas').classList.remove('fa-play');
  playButton.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong(){

  musicContainer.classList.remove('play');
  playButton.querySelector('i.fas').classList.add('fa-play');
  playButton.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}


// previous & next song
function prevSong(){
  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length -1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong(){
  songIndex++;

  if(songIndex > songs.length - 1 ){
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// display the change in the progress bar
function updateProgress(e){
  let {duration, currentTime } = e.srcElement;

  let progressPercentage = (currentTime/ duration) *100;
  progress.style.width = `${progressPercentage}%`

}

// set the progress in the bar
function setProgress(e){
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let duration = audio.duration;

  audio.currentTime = (clickX/ width) * duration;
}



// --------------------------- Event listeners ------------------------------
playButton.addEventListener('click', () => {
  let isPlaying = musicContainer.classList.contains('play');

  if(isPlaying){
    pauseSong();
  } else{
    playSong();
  }

});

prevButton.addEventListener('click', prevSong)
nextButton.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);