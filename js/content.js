chrome.runtime.onMessage.addListener(onMessage)

function onMessage(request, _sender) {
    $("[aria-owns='ytp-id-20']").click()
    var settingsMenu = $("#ytp-id-20")
    settingsMenu.find(".ytp-menuitem:nth-child(2)").click()
    settingsMenu.find(".ytp-menuitem:nth-child(8)").click()
}