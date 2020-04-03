chrome.runtime.onMessage.addListener(onMessage)

function onMessage(request, _sender, sendResponse) {
    sendResponse(`responded '${request}'`)
}