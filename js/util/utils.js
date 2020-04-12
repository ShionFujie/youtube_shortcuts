function queryActiveTab(onActiveTab) {
  chrome.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
    onActiveTab(activeTab);
  });
}

function executeScriptWithJQuery(file, callback) {
  chrome.tabs.executeScript({ file: "lib/jquery-3.4.1.min.js" }, () => {
    chrome.tabs.executeScript({ file }, callback);
  });
}

function navigateToPath(pathname) {
  document.location.pathname = pathname
}
