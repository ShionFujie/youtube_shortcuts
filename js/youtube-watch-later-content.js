setTimeout(() => {
  injectTotalMinutes();
}, 2000);

function injectTotalMinutes() {
  let totalSeconds = $("span.ytd-thumbnail-overlay-time-status-renderer")
    .get()
    .reduce((acc, spanEl) => acc + _parseInt(spanEl.innerText), 0);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  $("div#items div#overlays").append(TotalTimeDisplay(hours, minutes, seconds));
}

function _parseInt(hhmmss) {
  const units = hhmmss.split(":");
  const length = units.length;
  let seconds = 0;
  let i = 0;
  while (i < length) seconds += Math.pow(60, i) * parseInt(units[length - ++i]);
  return seconds;
}

function TotalTimeDisplay(hours, minutes, seconds) {
  const withPad = unit => `${unit}`.padStart(2, "0");
  const displayString =
    hours > 0
      ? `${hours}:${withPad(minutes)}:${withPad(seconds)}`
      : `${minutes}:${withPad(seconds)}`;

  return $(`<div><span>${displayString}</span></div>`).css({
    position: "absolute",
    top: 0,
    left: 0,
    color: "#fff",
    "background-color": "rgba(0, 0, 0, 0.8)",
    padding: "2px 4px",
    margin: "4px",
    "border-radius": "2px",
    "letter-spacing": "0.5px",
    "font-size": "1.2rem",
    "font-weight": "500",
    "line-height": "1.2rem"
  });
}
