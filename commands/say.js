const config = require('../config.json')
const fs = require('fs');
module.exports = {
    name: 'say',
    category: "Moderation",
    description: 'Deletes the amount of messages specified',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.purge,
    execute(message, args, bot, sending, chatData, startArg, endArgs) {
        const arguments = message.content.split(" ").splice(1).join(" ");
        message.channel.send(arguments)
    },
}