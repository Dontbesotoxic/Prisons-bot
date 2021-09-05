const Discord = require("discord.js");
const config = require("../config.json");
const {success} = require('../Storage/functions')
const client = new Discord.Client();
module.exports = {
    name: 'restart',
    category: "Bot",
    description: 'Restarts the bot to the server',
    enabled: true,
    execute(message, args, bot) {
        message.channel.send(':robot: Restarting.').then(() => {
            client.destroy()
            console.log('Restarted')
            require('../index')

        })
    }
}