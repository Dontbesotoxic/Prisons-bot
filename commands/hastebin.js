const config = require("../config.json")
const Discord = require("discord.js")
const hastebin = require('hastebin-gen');


module.exports = {
    name: 'hatebin',
    enabled: true,
    category: "Miscellaneous",
    aliases: ['haste', 'H'],
    description: 'rate a user',
    execute(message, args) {
        let haste = args.slice(0).join(" ")

        let type = args.slice(1).join(" ")

        if (!args[0]) { return message.channel.send("What do you want to post in Hastebin?") }

        hastebin(haste).then(r => {

            message.channel.send("`Posted to Hastebin at this URL:`  " + r);
            

        }).catch(console.error);

        message.delete();

}        }