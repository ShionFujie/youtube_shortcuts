function setupInjectionToEachRenderer() {
  onNewRendererAdded(renderer => injectNotInterestedTo(renderer));
}

function onNewRendererAdded(listener) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        filterRenderer(mutation.addedNodes).forEach(listener);
      }
    });
  });
  const el = document.getElementById("contents");
  filterRenderer(el.childNodes).forEach(listener);
  observer.observe(el, { childList: true });
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

function filterRenderer(nodes) {
  return filterNodes(nodes, node => node.tagName == "YTD-RICH-ITEM-RENDERER");
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
