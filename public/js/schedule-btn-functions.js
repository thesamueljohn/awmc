const scheduleDayRadios = document.getElementsByName("schedule-day-radio");
const scheduleDays = document.querySelectorAll(".schedule-day");
const scheduleDayTitles = document.querySelectorAll(".schedule-day-title");

function setActive(index) {
  // Remove "active" from all
  scheduleDays.forEach((day) => day.classList.remove("active"));
  scheduleDayRadios.forEach((radio) => (radio.checked = false));

  // Set "active" for the chosen index
  scheduleDays[index].classList.add("active");
  scheduleDayRadios[index].checked = true;
}

scheduleDayRadios.forEach((radio, i) => {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      setActive(i);
    }
  });
});

scheduleDayTitles.forEach((title, i) => {
  title.addEventListener("click", () => {
    setActive(i);
  });
});
