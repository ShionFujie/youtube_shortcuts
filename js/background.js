chrome.commands.onCommand.addListener(command => {
  executeOnYouTube(({pathname}) => {
    if (["playback_speed_normal", "playback_speed_2"].includes(command) && pathname == "/watch") {
      if (command == "playback_speed_normal") executeNeutralizePlaybackSpeed();
      else if (command == "playback_speed_2") executeDoublePlaybackSpeed();
    } 
    else if (command == "go home" && pathname != "/") goHome();
    else if (command == "history" && pathname != "/feed/history") openHistory()
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

function openHistory() {
    chrome.tabs.executeScript({ code: "document.location.pathname = '/feed/history'" });
}