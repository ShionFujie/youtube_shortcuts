chrome.commands.onCommand.addListener(command => {
  executeOnYouTube(({pathname}) => {
    if (pathname == "/watch") {
      if (command == "playback_speed_normal") executeNeutralizePlaybackSpeed();
      else if (command == "playback_speed_2") executeDoublePlaybackSpeed();
    }
    if (command == "go home" && pathname != "/") goHome();
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

function queryActiveTab(onActiveTab) {
  chrome.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
    onActiveTab(activeTab);
  });
}

function executeNeutralizePlaybackSpeed() {
  executeAfterLoadingScript("neutralizePlaybackSpeed()");
}

function executeDoublePlaybackSpeed() {
  executeAfterLoadingScript("doublePlaybackSpeed()");
}

function executeAfterLoadingScript(code) {
  executeScriptWithJQuery("js/setPlaybackSpeed.js", () => {
    chrome.tabs.executeScript({ code });
  });
}

function executeScriptWithJQuery(file, callback) {
  chrome.tabs.executeScript({ file: "lib/jquery-3.4.1.min.js" }, () => {
    chrome.tabs.executeScript({ file }, callback);
  });
}

function goHome() {
  chrome.tabs.executeScript({ code: "document.location.pathname = '/'" });
}
