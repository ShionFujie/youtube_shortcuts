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

function clickMenuitem(menuitemText) {
  const menuitemQuery = () =>
    $(
      `ytd-popup-container ytd-menu-service-item-renderer:has(yt-formatted-string:contains(${menuitemText}))`
    );
  onElementInflated(menuitemQuery, menuitem => menuitem.click());
}
