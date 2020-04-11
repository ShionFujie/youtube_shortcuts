chrome.commands.onCommand.addListener(command => {
  executeOnYouTube(({ pathname }) => {
    if (
      ["playback_speed_normal", "playback_speed_2"].includes(command) &&
      pathname == "/watch"
    ) {
      if (command == "playback_speed_normal") executeNeutralizePlaybackSpeed();
      else if (command == "playback_speed_2") executeDoublePlaybackSpeed();
    } else if (command == "go home" && pathname != "/") navigateToPath("/");
    else if (command == "history" && pathname != "/feed/history")
      navigateToPath("/feed/history");
  });
});

function executeOnYouTube(f) {
  queryActiveTab(({ url }) => {
    const activeUrl = new URL(url);
    if (activeUrl.hostname == "www.youtube.com") {
      f(activeUrl);
    }
  });
}

function executeNeutralizePlaybackSpeed() {
  executeAfterLoadingContentScript("neutralizePlaybackSpeed()");
}

function executeDoublePlaybackSpeed() {
  executeAfterLoadingContentScript("doublePlaybackSpeed()");
}

function executeAfterLoadingContentScript(code) {
  executeScriptWithJQuery("js/setPlaybackSpeed.js", () => {
    chrome.tabs.executeScript({ code });
  });
}
