const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
let AkumaMC = JSON.parse(fs.readFileSync('./config.json')).Configs.AkumaMC
let vanity = JSON.parse(fs.readFileSync('./config.json')).Configs.vanitymc
module.exports = {
    name: 'ctop',
    category: 'prisons',
    description: 'Displays Faction Top Ranking',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.ctop,
    execute(message, args, bot, chatData, saving, regex) {
        if (vanity & AkumaMC === null ){
        var empty = false;
        saving.hover = true;
        regex.regex = /^[1-9#]|(Invalid, page must be between)/i;
        if (!args.length) {
            args[0] = "";
        }
        bot.client.chat(config.general.ctopCommand + " " + args[0]);

        setTimeout(() => {
            saving.hover = false;
            if (!chatData.chat.length) {
                chatData.chat[0] = "Try Again";
                empty = true;
            }
            if (empty) {
                empty = false;
                let embedSudo = new Discord.MessageEmbed()
                    .setColor(config.general.embedColor)
                    .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``);
                message.channel.send(embedSudo);
                chatData.chat.length = 0;
                return;
            }

            let factionNames = [];
            let currentWorth = [];
            let potentialWorth = [];

            chatData.hover = chatData.hover.toString().split("\n");
            chatData.hover.forEach(element => {
                if (element.match(/(Potential Worth:)/)) {
                    potentialWorth.push(element.split(" ")[2].replace("§d", ""));
                }
            });
            chatData.chat.forEach(element => {
                let split = element.split(" ");
                factionNames.push(split[0] + " " + split[1]);
                currentWorth.push(split[3] + " " + split[4] + " " + split[5]);
            });

            let embedctop = new Discord.MessageEmbed()
                .setTitle("Cell Top")
                .setColor(config.general.embedColor)
                .addField("Cells", factionNames, true)
                .addField("Current Worth", currentWorth, true)
                .setTimestamp(new Date())
                .setFooter(`${config.general.serverIP}`);
            message.channel.send(embedctop);
            chatData.chat.length = 0;
            chatData.hover.length = 0
        }, 250);
    }
}
}
if (vanity === true & AkumaMC === false){
    const Discord = require("discord.js");
    const config = require("../config.json")
    const fs = require('fs');
    let AkumaMC = JSON.parse(fs.readFileSync('./config.json')).Configs.AkumaMC
    let vanity = JSON.parse(fs.readFileSync('./config.json')).Configs.vanitymc
    module.exports = {
        name: 'ctop',
        category: 'prisons',
        description: 'Displays Faction Top Ranking',
        enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.ctop,
        execute(message, args, bot, chatData, saving, regex) {
            var empty = false;
            saving.hover = true;
            regex.regex = /^[1-9#]|(Invalid, page must be between)/i;
            if (!args.length) {
                args[0] = "";
            }
            bot.client.chat(config.general.ctopCommand + " " + args[0]);
    
            setTimeout(() => {
                saving.hover = false;
                if (!chatData.chat.length) {
                    chatData.chat[0] = "Try Again";
                    empty = true;
                }
                if (empty) {
                    empty = false;
                    let embedSudo = new Discord.MessageEmbed()
                        .setColor(config.general.embedColor)
                        .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``);
                    message.channel.send(embedSudo);
                    chatData.chat.length = 0;
                    return;
                }
    
                let factionNames = [];
                let currentWorth = [];
                let potentialWorth = [];
    
                chatData.hover = chatData.hover.toString().split("\n");
                chatData.hover.forEach(element => {
                    if (element.match(/(Potential Worth:)/)) {
                        potentialWorth.push(element.split(" ")[2].replace("§d", ""));
                    }
                });
                chatData.chat.forEach(element => {
                    let split = element.split(" ");
                    factionNames.push(split[0] + " " + split[1]);
                    currentWorth.push(split[3] + " " + split[4] + " " + split[5]);
                });
    
                let embedctop = new Discord.MessageEmbed()
                    .setTitle("Cell Top")
                    .setColor(config.general.embedColor)
                    .addField("Cells", factionNames, true)
                    .addField("Current Worth", currentWorth, true)
                    .setTimestamp(new Date())
                    .setFooter(`${config.general.serverIP}`);
                message.channel.send(embedctop);
                chatData.chat.length = 0;
                chatData.hover.length = 0
              }, 250);
        }
    }
}
if (AkumaMC === true & vanity === false){
    module.exports = {
        name: 'ctop',
        category: 'prisons',
        description: 'Displays Faction Top Ranking',
        enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.ctop,
        execute(message, args, bot, chatData, saving, regex) {
            if (vanity & AkumaMC === null ){
            var empty = false;
            saving.hover = true;
            regex.regex = /^[1-9#]|([AkumaMC])/i;
            if (!args.length) {
                args[0] = "";
            }
            bot.client.chat(config.general.ctopCommand + " " + args[0]);
    
            setTimeout(() => {
                saving.hover = false;
                if (!chatData.chat.length) {
                    chatData.chat[0] = "Try Again";
                    empty = true;
                }
                if (empty) {
                    empty = false;
                    let embedSudo = new Discord.MessageEmbed()
                        .setColor(config.general.embedColor)
                        .setDescription(`\`\`\`${chatData.chat.join('\n')}\`\`\``);
                    message.channel.send(embedSudo);
                    chatData.chat.length = 0;
                    return;
                }
    
                let factionNames = [];
                let currentWorth = [];
                let potentialWorth = [];
    
                chatData.hover = chatData.hover.toString().split("\n");
                chatData.hover.forEach(element => {
                    if (element.match(/(Potential Worth:)/)) {
                        potentialWorth.push(element.split(" ")[2].replace("§d", ""));
                    }
                });
                chatData.chat.forEach(element => {
                    let split = element.split(" ");
                    factionNames.push(split[1] + " " + split[2])
                    currentWorth.push(split[3] + " " + split[4]);
                });
    
                let embedctop = new Discord.MessageEmbed()
                    .setTitle("Cell Top")
                    .setColor(config.general.embedColor)
                    .addField("Cells", factionNames, true)
                    .addField("Current Worth", currentWorth, true)
                    .setTimestamp(new Date())
                    .setFooter(`${config.general.serverIP}`);
                message.channel.send(embedctop);
                chatData.chat.length = 0;
                chatData.hover.length = 0
            }, 250);
        }
    }
}
}