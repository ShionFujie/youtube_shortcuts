function setupInjectionToEachRenderer() {
  onNewRendererAdded(renderer => injectShortcutsTo(renderer));
}

function onNewRendererAdded(listener) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        filterRenderers(mutation.addedNodes).forEach(listener);
      }
    });
  });
  const el = document.getElementById("contents");
  filterRenderers(el.childNodes).forEach(listener);
  observer.observe(el, { childList: true });
}

function injectShortcutsTo(rendererEl) {
  const renderer = $(rendererEl);
  const shortcutSaveToPlaylist = SaveToPlaylistShortcut(renderer);
  const shortcutNotInterested = NotInterestedShortcut(renderer);
  const thumbnail = renderer.find("a#thumbnail");

  renderer.hover(
    () => {
      thumbnail.append(shortcutSaveToPlaylist);
      thumbnail.append(shortcutNotInterested);
    },
    () => {
      shortcutSaveToPlaylist.detach();
      shortcutNotInterested.detach();
    }
  );
}

function SaveToPlaylistShortcut(renderer) {
  return MenuitemShortcut(
    renderer,
    `<svg viewBox="0 0 24 24" style="color: rgba(255, 255, 255, 0.8);">
      <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" fill="white"></path>
    </svg>`,
    "0",
    "Save to playlist"
  );
}

function NotInterestedShortcut(renderer) {
  return MenuitemShortcut(
    renderer,
    `<svg viewBox="0 0 24 24" style="color: rgba(255, 255, 255, 0.8);">
      <path d="M0 0h24v24h0z" fill="none"></path>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z" fill="white"></path>
    </svg>`,
    "32px",
    "Not interested"
  );
}

const shortcutStyle = {
  position: "absolute",
  cursor: "pointer",
  "background-color": "rgba(0, 0, 0, 0.8)",
  width: "28px",
  height: "28px",
  "border-radius": "2px",
  margin: "4px"
};

function MenuitemShortcut(renderer, iconHTML, top, menuitemText) {
  const shortcut = $(`<div></div>`)
    .css({
      top,
      ...shortcutStyle
    })
    .append(iconHTML);
  shortcut.click(() => {
    openMenuAsynchronously(renderer);
    clickMenuitem(menuitemText);

    return false;
  });
  return shortcut;
}

function filterRenderers(nodes) {
  return filterNodes(nodes, node => node.tagName == "YTD-RICH-ITEM-RENDERER");
}

function openMenuAsynchronously(renderer) {
  onElementInflated(
    () => renderer.find("button#button"),
    iconButton => iconButton.click()
  );
};