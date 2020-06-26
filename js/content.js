const selectors = {
  label_save_to_playlist: chrome.i18n.getMessage("label_save_to_playlist"),
  label_playback_speed: chrome.i18n.getMessage("label_playback_speed"),
  label_more_actions: chrome.i18n.getMessage("label_more_actions")
};

setupInjectionToEachRenderer();

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
  else if (pathname == "/watch" && code == KEY_CODE_OPEN_TRANSCRIPT) openTranscript();
};

function inputHasFocus() {
  const inputs = [
    $("input#search"), // 'Search' input in app bar
    $("div#create-playlist-form input") // input for 'Create new playlist'
  ];
  return inputs.some(input => input.is(":focus"));
}

function clickSaveButton() {
  $(`button[aria-label="${selectors.label_save_to_playlist}"]`).click();
}

function openTranscript() {
  $(`button#button[aria-label="${selectors.label_more_actions}"]`).click();
  clickMenuitem("Open transcript");
}
