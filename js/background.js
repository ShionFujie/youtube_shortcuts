chrome.commands.onCommand.addListener(command => {
  queryActiveTab(({ url }) => {
    const { hostname, pathname } = new URL(url);
    if (hostname == "www.youtube.com" && pathname == "/watch") {
      if (command == 'playback_speed_normal')
        executeNeutralizePlaybackSpeed();
      else if (command == 'playback_speed_2')
        executeDoublePlaybackSpeed();
    }
  });
});

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
