const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'cmd',
    description: "Runs a specified command in game",
    category: 'prisons',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.sudo,
    execute(message, args, bot, chatData, saving, regex){
        const arguments = message.content.split(" ").splice(1).join(" ");


        regex.regex = /.*/;
        saving.chat = true;
        
        bot.client.chat(`${arguments}`);
        
        setTimeout(() => {
            saving.chat = false;
            if (!chatData.length) {
                chatData[0] = "Try Again";
            }
            let embedSudo = new Discord.MessageEmbed()
                .setColor(config.general.embedColor)
                .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedSudo);
            chatData.chat.length = 0;
        }, 750);
    }
}