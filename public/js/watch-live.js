var videos = [];

fetch("../../data/watch-live-videos.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    videos = data;
    rendervideos(videos);
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });

function rendervideos(videos) {
  let output = "";

  for (const _videos of videos) {
    output += `
      <div class="videos-block">
        <div class="videos-block-left">
         
            <iframe class="videos-block-video"
        src="${_videos.url}"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen>
</iframe>

            
        </div>
        <div class="videos-block-right">
          <h3 class="videos-block-title">
            ${_videos.title}
          </h3>
          <p class="videos-block-description">
            ${_videos.description}
          </p>
          <div class="videos-block-facilitators">
            <h4>Speaker:</h4>
            <ul>
            <li>
              ${_videos.speaker}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  const videosWrapper = document.querySelector(".videos-wrapper");
  if (videosWrapper) {
    videosWrapper.innerHTML = output;
  } else {
    console.error("Element with class 'videos-wrapper' not found.");
  }
}
