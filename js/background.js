
const COMMAND_PLAYBACK_SPEED_NORMAL = 'playback_speed_normal'
const COMMAND_PLAYBACK_SPEED_2 = 'playback_speed_2'

chrome.commands.onCommand.addListener(function(command) {
    if (command == COMMAND_PLAYBACK_SPEED_NORMAL)
        sendCommand(COMMAND_PLAYBACK_SPEED_NORMAL)
    else if (command == COMMAND_PLAYBACK_SPEED_2)
        sendCommand(COMMAND_PLAYBACK_SPEED_2)
})

function sendCommand(command) {
    console.log(command)
} 
