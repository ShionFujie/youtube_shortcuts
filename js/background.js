chrome.runtime.onMessageExternal.addListener((request, _, response) => {
    if (request.type === "action spec") {
      response({
        name: actionSpec.name,
        actions: Object.entries(actionSpec.actions).map(
          ([name, { displayName }]) => {
            return { name, displayName };
          }
        )
      });
    } else if (request.type === "execute action") {
      const action = actionSpec.actions[request.action.name];
      if (action !== undefined) action.f();
    }
  });
  
  const actionSpec = {
    name: "YouTube",
    actions: {
      "img url": {
        displayName: "YouTube: Copy URL of Video Thumbnail",
        f: injectImgURLExtractor
      }
    }
  };

  function injectImgURLExtractor() {
    chrome.tabs.executeScript({ file: "/js/img-url.js" });
  }