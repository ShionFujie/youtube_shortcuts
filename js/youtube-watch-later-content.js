setTimeout(() => {
    injectTotalMinutes();
}, 3000)


function injectTotalMinutes() {
    const spans = $("span.ytd-thumbnail-overlay-time-status-renderer")
    .get()
    console.log(spans)
  let totalSeconds = $("span.ytd-thumbnail-overlay-time-status-renderer")
    .get()
    .reduce((acc, spanEl) => acc + _parseInt(spanEl.innerText), 0);
    
  const displaySeconds = `${totalSeconds % 60}`.padStart(2, "0");
  const displayMinutes = `${Math.floor(totalSeconds / 60) % 60}`.padStart( 2,"0");
  const displayHours = `${Math.floor(totalSeconds / 3600)}`.padStart(2, "0");
  console.log(`${displayHours}:${displayMinutes}:${displaySeconds}`);
}

function _parseInt(hhmmss) {
  const units = hhmmss.split(":");
  console.log(units);
  const length = units.length;
  let seconds = 0;
  let i = 0;
  while (i < length) seconds += Math.pow(60, i) * parseInt(units[length - ++i]);
  console.log(seconds)
  return seconds;
}
