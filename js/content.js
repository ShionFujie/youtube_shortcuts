document.onkeydown = ({ code }) => {
  if (inputHasFocus()) return;

  const url = new URL(location.href);
  const { pathname, search } = url;
  if (
    [KEY_CODE_PLAYBACK_SPEED_NORMAL, KEY_CODE_PLAYBACK_SPEED_2].includes(
      code
    ) &&
    pathname == "/watch"
  ) {
    if (code == KEY_CODE_PLAYBACK_SPEED_NORMAL) neutralizePlaybackSpeed();
    else if (code == KEY_CODE_PLAYBACK_SPEED_2) doublePlaybackSpeed();
  } else if (code == KEY_CODE_SAVE_TO_PLAYLISTS && pathname == "/watch")
    clickSaveButton();
  else if (code == KEY_CODE_GO_HOME && pathname != "/")
    updateLocation(url, { pathname: "/" });
  else if (code == KEY_CODE_HISTORY && pathname != "/feed/history")
    updateLocation(url, { pathname: "/feed/history" });
  else if (
    code == KEY_CODE_WATCH_LATER &&
    (pathname != "/playlist" || search != "?list=WL")
  )
    updateLocation(url, { pathname: "/playlist", search: "?list=WL" });
  else if (code == KEY_CODE_LIBRARY && pathname != "/feed/library")
    updateLocation(url, { pathname: "/feed/library" });
};

function inputHasFocus() {
  return $("input#search").is(":focus");
}

function clickSaveButton() {
  $('button[aria-label="Save to playlist"]').click();
}
