const KEY_CODE_PLAYBACK_SPEED_NORMAL = "KeyN";
const KEY_CODE_PLAYBACK_SPEED_2 = "KeyD";
const KEY_CODE_GO_HOME = "KeyH";
const KEY_CODE_HISTORY = "KeyY";
const KEY_CODE_WATCH_LATER = "KeyW";

const url = new URL(location.href)
const { pathname} = url;
document.onkeydown = ({ code, search }) => {
  if (
    [KEY_CODE_PLAYBACK_SPEED_NORMAL, KEY_CODE_PLAYBACK_SPEED_2].includes(
      code
    ) &&
    pathname == "/watch"
  ) {
    if (code == KEY_CODE_PLAYBACK_SPEED_NORMAL) neutralizePlaybackSpeed();
    else if (code == KEY_CODE_PLAYBACK_SPEED_2) doublePlaybackSpeed();
  } else if (code == KEY_CODE_GO_HOME && pathname != "/") navigateToPath("/");
  else if (code == KEY_CODE_HISTORY && pathname != "/feed/history")
    navigateToPath("/feed/history");
  else if (
    code == KEY_CODE_WATCH_LATER &&
    !(pathname == "/playlist" && search == "?list=WL")
  ) {
    url.pathname = "/playlist"
    url.search = "?list=WL"
    location.href = url.toString()
  }
};
