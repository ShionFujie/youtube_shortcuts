chrome.runtime.onMessage.addListener(onMessage)

function onMessage(command, _sender) {
    if (command == 'playback_speed_2' || command == 'playback_speed_normal') {
        var settingsMenu = $("#ytp-id-20")
        var menuItemIdx = command == 'playback_speed_normal' ? 4 : 8
        // Clicks the settings button on the bottom controls of the YouTube video
        $("[aria-owns='ytp-id-20']").click()
        // A popup with menu items shown, then clicks the 'Playback speed' item\
        settingsMenu.find(".ytp-menuitem:has(.ytp-menuitem-label:contains('Playback speed'))")
            .click()
        // The popup re-rendered with new menu items, then clicks the '2' or 'Normal' item
        settingsMenu.find(`.ytp-menuitem:nth-child(${menuItemIdx})`).click()
        // Clicks outside, resulting in closing the popup
        $("#container").click()
    }   
}