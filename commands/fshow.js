const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
let AkumaMC = JSON.parse(fs.readFileSync('./config.json')).Configs.AkumaMC
let vanity = JSON.parse(fs.readFileSync('./config.json')).Configs.vanitymc
module.exports = {
    name: 'cshow',
    aliases: ['show', 'cwho'],
    category: 'prisons',
    description: 'Displays information about specified faction',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.cshow,
    execute(message, args, bot, chatData, saving, regex) {
        if (vanity & AkumaMC === null ){
            saving.chat = true;
            regex.regex = /[:|*+,-]|\bnone\b|(\_)\1+/i;
    
            if (!args.length) args[0] = "";
            bot.client.chat("/cell show "+  `${args[0]}`)
    
            setTimeout(() => {
                saving.chat = false;
                if (!chatData.chat.length) {
                    chatData.chat[0] = "Try Again";
                }
    
                let embedcshow = new Discord.MessageEmbed()
                    .setColor(config.general.embedColor)
                    .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                    .setTimestamp(new Date())
                    .setFooter(`${config.general.serverIP}`);
                message.channel.send(embedcshow);
                chatData.hover.length = 0;
                chatData.chat.length = 0;
    
            }, 750);
        }
    }
}

        

        if (vanity === true & AkumaMC === false){
            module.exports = {
                name: 'cshow',
                aliases: ['show', 'cwho'],
                category: 'prisons',
                description: 'Displays information about specified faction',
                enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.cshow,
                execute(message, args, bot, chatData, saving, regex) {
            saving.chat = true;
            regex.regex = /[:|*+,-]|\bnone\b|(\_)\1+/i;
    
            if (!args.length) args[0] = "";
            bot.client.chat("/cell show "+  `${args[0]}`)
    
            setTimeout(() => {
                saving.chat = false;
                if (!chatData.chat.length) {
                    chatData.chat[0] = "Try Again";
                }
    
                let embedcshow = new Discord.MessageEmbed()
                    .setColor(config.general.embedColor)
                    .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
                    .setTimestamp(new Date())
                    .setFooter(`${config.general.serverIP}`);
                message.channel.send(embedcshow);
                chatData.hover.length = 0;
                chatData.chat.length = 0;
    
            }, 750);
        }
    }
}   
    

if (AkumaMC === true & vanity === false){
    module.exports = {
    name: 'cshow',
    aliases: ['show', 'cwho'],
    category: 'prisons',
    description: 'Displays information about specified faction',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.cshow,
    execute(message, args, bot, chatData, saving, regex) {
    regex.regex = /[:|*+,-]|\bnone\b|(\_)\1+/i;

    if (!args.length) args[0] = "";
    bot.client.chat("/gang show "+  `${args[0]}`)

    setTimeout(() => {
        saving.chat = false;
        if (!chatData.chat.length) {
            chatData.chat[0] = "Try Again";
        }
        let embedcshow = new Discord.MessageEmbed()
            .setColor(config.general.embedColor)
            .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``)
            .setTimestamp(new Date())
            .setFooter(`${config.general.serverIP}`);
        message.channel.send(embedcshow);
        chatData.hover.length = 0;
        chatData.chat.length = 0;

    }, 750);
    }
}
}