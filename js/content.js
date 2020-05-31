onNewRendererAdded();

const selectors = {
  label_save_to_playlist: chrome.i18n.getMessage("label_save_to_playlist"),
  label_playback_speed: chrome.i18n.getMessage("label_playback_speed")
};

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
  const inputs = [
    $("input#search"), // 'Search' input in app bar
    $("div#create-playlist-form input") // input for 'Create new playlist'
  ];
  return inputs.some(input => input.is(":focus"));
}

function clickSaveButton() {
  console.log(selectors.label_save_to_playlist);
  $(`button[aria-label="${selectors.label_save_to_playlist}"]`).click();
}

function onNewRendererAdded() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        filterRenderer(mutation.addedNodes).forEach(renderer =>
          injectNotInterestedTo(renderer)
        );
      }
    });
  });
  const el = document.getElementById("contents");
  filterRenderer(el.childNodes).forEach(renderer =>
    injectNotInterestedTo(renderer)
  );
  observer.observe(el, { childList: true });
}

function filterRenderer(nodes) {
  return filterNodes(nodes, node => node.tagName == "YTD-RICH-ITEM-RENDERER");
}

function filterNodes(nodes, filter) {
  return Array.prototype.filter.call(nodes, filter);
}

function injectNotInterestedTo(rendererEl) {
  const renderer = $(rendererEl);
  const buttonNotInterested = $("<div id='ys-not-interested'></div>").css({
    position: "absolute",
    top: "0",
    cursor: "pointer",
    "background-color": "rgba(0, 0, 0, 0.8)",
    width: "28px",
    height: "28px",
    "border-radius": "2px",
    margin: "4px"
  }).append(`<svg viewBox="0 0 24 24" style="color: rgba(255, 255, 255, 0.8);">
      <path d="M0 0h24v24h0z" fill="none"></path>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" fill="white"></path>
    </svg>`);

  const thumbnail = renderer.find("a#thumbnail");

  buttonNotInterested.click(() => {
    onElementInflated(
      () => renderer.find("button#button"),
      iconButton => iconButton.click()
    );

    const menuitemQuery = () =>
      $(
        "ytd-popup-container ytd-menu-service-item-renderer:has(yt-formatted-string:contains(Not interested))"
      );
    onElementInflated(menuitemQuery, menuitem => menuitem.click());

    return false;
  });
  renderer.hover(
    () => {
      thumbnail.append(buttonNotInterested);
    },
    () => {
      buttonNotInterested.detach();
    }
  );
}

function onElementInflated(query, action) {
  let el;
  const intervalId = setInterval(() => {
    el = query();
    if (el.length > 0) {
      clearInterval(intervalId);
      action(el);
    }
  }, 250);
}
