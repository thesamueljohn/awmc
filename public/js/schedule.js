var schedule = [];

fetch("../../data/schedule.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    schedule = data;
    renderSchedule(schedule);
    initScheduleScroll();
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });

function renderSchedule(schedule) {
  let output = "";
  const now = new Date();

  for (const day of schedule) {
    output += `<div class="plenary">
      <div class="schedule-box-title">
        <h3>${day.title}</h3>
      </div>
      <div class="schedule-session-blocks">`;

    for (const session of day.sessions) {
      const sessionStart = getDateTime(
        day.date,
        session.startTime,
        session.timeAppendix
      );
      const sessionEnd = getDateTime(
        day.date,
        session.endTime,
        session.timeAppendix
      );

      const active =
        now.toDateString() === sessionStart.toDateString() &&
        now >= sessionStart &&
        now <= sessionEnd
          ? "active"
          : "";

      output += createSessionBlock(
        session.startTime,
        session.person,
        session.endTime,
        session.timeAppendix,
        session.media,
        session.sessionTitle,
        active
      );
    }

    output += "</div></div>";
  }

  document.querySelector(".schedule-box-right-wrapper").innerHTML = output;
}

// Merge date + time + AM/PM
function getDateTime(dateStr, timeStr, appendix) {
  let [hours, minutes] = timeStr.split(":").map(Number);

  // Convert to 24-hour format
  if (appendix?.toLowerCase() === "pm" && hours !== 12) hours += 12;
  if (appendix?.toLowerCase() === "am" && hours === 12) hours = 0;

  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function createSessionBlock(
  startTime,
  person,
  endTime,
  timeAppendix,
  media,
  sessionTitle,
  active = ""
) {
  return `<div class="schedule-session-block ${active}">
        <div class="schedule-session-block-time" style="--time-appendix: '${timeAppendix}'">
            ${startTime}
            <br />${endTime}
        </div>
        <div class="schedule-session-block-session-details flex col-flex">
            <span class="schedule-session-block-session-title">
                ${sessionTitle}
            </span>
            <span class="schedule-session-block-session-anchor">
                ${person}
            </span>
        </div>
    </div>`;
}



function initScheduleScroll() {
  const ScheduleDayTitles = document.querySelectorAll(".schedule-day-title");
  const scheduleDropdownItems = document.querySelectorAll(
    ".schedule-day-dropdown-item"
  );
  const plenaryContainers = document.querySelectorAll(".plenary");
  const container = document.querySelector(".schedule-box-right-wrapper");

  // Mapping day index (0-4) to starting plenary index
  const dayToPlenaryStart = [0, 1, 3, 5, 7]; // Wed:0, Thu:1, Fri:3, Sat:5, Sun:7

  // Handle day title clicks: Scroll to the first plenary of the day
  ScheduleDayTitles.forEach((title, dayIndex) => {
    title.addEventListener("click", (e) => {
      e.preventDefault(); // Since these are <a> tags, prevent hash jump

      if (dayIndex < dayToPlenaryStart.length) {
        const startIndex = dayToPlenaryStart[dayIndex];
        const targetPlenary = plenaryContainers[startIndex];
        const offset = 80; // Adjust as needed for headers/padding

        container.scrollTo({
          top: targetPlenary.offsetTop - offset,
          behavior: "smooth",
        });
      } else {
        console.error("No matching plenary start for this day.");
      }
    });
  });

  // Bonus: Handle dropdown item clicks for morning/evening within the day
  scheduleDropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      // Find which day this dropdown belongs to
      const dayElement = item.closest(".schedule-day");
      const dayIndex = Array.from(dayElement.parentNode.children).indexOf(
        dayElement
      );
      const isMorning = item.textContent.includes("Morning"); // Or check class/index if needed

      if (dayIndex >= 0 && dayIndex < dayToPlenaryStart.length) {
        let targetIndex = dayToPlenaryStart[dayIndex];
        if (!isMorning) {
          // For evening, add 1 (but skip for Wed/Sun which don't have morning)
          if (dayIndex === 0) {
            targetIndex = 0; // Wed only evening
          } else if (dayIndex === 4) {
            console.warn("Sunday has no evening session.");
            return;
          } else {
            targetIndex += 1; // Thu/Fri/Sat evening
          }
        } else if (dayIndex === 0) {
          console.warn("Wednesday has no morning session.");
          return;
        }

        const targetPlenary = plenaryContainers[targetIndex];
        const offset = 80;

        container.scrollTo({
          top: targetPlenary.offsetTop - offset,
          behavior: "smooth",
        });
      }
    });
  });
}