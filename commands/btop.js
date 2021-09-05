const Discord = require("discord.js");
const config = require("../config.json")
const fs = require('fs');
module.exports = {
    name: 'btop',
    description: "Runs a specified command in game",
    category: 'prisons',
    enabled: JSON.parse(fs.readFileSync('./config.json')).enableCommands.sudo,
    execute(message, args, bot, chatData, saving, regex){
        const arguments = message.content.split(" ").splice(1).join(" ");


        regex.regex = /'([A-Z 1-100000 ,])\w+'/;
        saving.chat = true;
        
        bot.client.chat(`/blocktop`);
        
        bot.client.on("windowOpen", function (window) {
            let countdown = 5
            while (countdown > 0) {
                countdown = countdown - 1 // Decrement countDown by 1
        
        
           let foundItem = window.slots.find(x =>x.slot=== 1).nbt.value.display.value.Lore.value.value
           var foundItem2;
           foundItem2 = foundItem.toString();
            
           foundItem2.replace(/'([A-Z 1-100000 ,])\w+'/ ," ")

           let embedSudo = new Discord.MessageEmbed()
           .setColor(config.general.embedColor)
           .setDescription(`${foundItem}`)
           .setTimestamp(new Date())
           .setFooter(`${config.general.serverIP}`);
       message.channel.send(embedSudo);

        console.log(foundItem2)
          bot.client.closeWindow(window)
            }
        
        })
    }
}