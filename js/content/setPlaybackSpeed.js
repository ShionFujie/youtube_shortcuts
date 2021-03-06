function doublePlaybackSpeed() {
  setPlaybackSpeed(8);
}

function neutralizePlaybackSpeed() {
  setPlaybackSpeed(4);
}

/**
 * menuItemIdx is one of the 1-based indices for the playback speeds
 * in the following order:
 * '0.25', '0.5', '0.75', 'Normal', '1.25', '1.5', '1.75', '2'.
 * For example, if you want double the playback speed, you will call
 * setPlaybackSpeed(8), and, setPlaybackSpeed(4) to neutralize it.
 */
function setPlaybackSpeed(menuItemIdx) {
  var settingsMenu = $(".ytp-settings-menu");
  // Clicks the settings button on the bottom controls of the YouTube video
  $(`[aria-label='${selectors.label_ytp_settings_button}']`).click();
  // A popup with menu items shown, then clicks the 'Playback speed' item
  settingsMenu
    .find(`.ytp-menuitem:has(.ytp-menuitem-label:contains('${selectors.label_playback_speed}'))`)
    .click();
  // The popup re-rendered with new menu items, then clicks the playback speed item
  settingsMenu.find(`.ytp-menuitem:nth-child(${menuItemIdx})`).click();
  // Clicks outside, resulting in closing the popup
  $("#container").click();
}
