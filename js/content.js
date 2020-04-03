chrome.runtime.onMessage.addListener(onMessage)

function onMessage(request, _sender) {
    $("[aria-owns='ytp-id-20']").click()
}