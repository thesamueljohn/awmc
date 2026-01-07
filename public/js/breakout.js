var breakout = [];

fetch("../../data/breakout.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    breakout = data;
    renderbreakout(breakout);
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });

function renderbreakout(breakout) {
  let output = "";

  for (const _breakout of breakout) {
    const facilitatorsList = _breakout.facilitators
      .map((facilitator) => `<li>${facilitator}</li>`)
      .join("");

    output += `
      <div class="breakout-block">
        <div class="breakout-block-left">
          <img
            src="${_breakout.imageURL}"
            alt=""
            class="breakout-block-img"
            draggable="false"
          />
          
        </div>
        <div class="breakout-block-right">
          <h3 class="breakout-block-title">
            ${_breakout.id + ". " + _breakout.title}
          </h3>
          <p class="breakout-block-description">
            ${_breakout.description}
          </p>
          <div class="breakout-block-facilitators">
            <h4>Facilitators:</h4>
            <ul>
              ${facilitatorsList}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  const breakoutWrapper = document.querySelector(".breakout-wrapper");
  if (breakoutWrapper) {
    breakoutWrapper.innerHTML = output;
  } else {
    console.error("Element with class 'breakout-wrapper' not found.");
  }
}
