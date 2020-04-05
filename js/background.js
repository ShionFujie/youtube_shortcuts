chrome.commands.onCommand.addListener(function(command) {
    if (command == COMMAND_PLAYBACK_SPEED_NORMAL)
        sendCommand(COMMAND_PLAYBACK_SPEED_NORMAL)
    else if (command == COMMAND_PLAYBACK_SPEED_2)
        sendCommand(COMMAND_PLAYBACK_SPEED_2)
})

function sendCommand(command) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, command)
    })
    console.log(`Sent ${command}`)
} 
