const image = document.querySelector(".img-container img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector(".player-container audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army(Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Good Night, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row(Remix)",
    artist: "Matric/Jacinto Design",
  },
];

// Check if song playing or not
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Update Dom
function load(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  image.src = `img/${song.name}.jpg`;
  music.src = `music/${song.name}.mp3`;
}

// Current Song
let currentSong = 0;

function prevSong() {
  currentSong--;
  if (currentSong < 0) currentSong = songs.length - 1;
  load(songs[currentSong]);
  playSong();
}
function nextSong() {
  currentSong++;
  if (currentSong > songs.length - 1) currentSong = 0;
  load(songs[currentSong]);
  playSong();
}

// Updating progress bar & Time
function updateProgressBar(e) {
  if (!isPlaying) return;
  const { currentTime, duration } = e.target;
  // Update progress bar width
  let progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;

  // Total Duration in minutes
  const durationMinutes = Math.trunc(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
  if (durationSeconds) durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

  // current time update
  const currentMinutes = Math.trunc(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;

  music.currentTime = (clickX / width) * duration;
}

// Event Listners

// 1) play & pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// 2) prev & next event listners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// 3) progress bar
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

// 4) Song ended
music.addEventListener("ended", nextSong);
// on Load
load(songs[currentSong]);
