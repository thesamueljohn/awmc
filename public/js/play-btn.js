// Get elements
const playBtn = document.getElementById("play-button");
const awmcVideo = document.getElementById("awmc-video");
const videoOverlay = document.getElementById("video-overlay");
const pauseSvg = document.getElementById("pause-svg");
const playSvg = document.getElementById("play-svg");

// Toggle play/pause and overlay background
playBtn.addEventListener("click", () => {
  if (awmcVideo.paused) {
    awmcVideo.play();
    videoOverlay.style.opacity = "0";
    pauseSvg.style.display = "block";
    playSvg.style.display = "none";
  } else {
    awmcVideo.pause();
    videoOverlay.style.opacity = "1";
    pauseSvg.style.display = "none";
    playSvg.style.display = "block";
  }
});
