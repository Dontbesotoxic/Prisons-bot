const Discord = require("discord.js");
const mineflayer =  require("mineflayer")
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const { monthsShort } = require("moment");
const yoMamma = require('yo-mamma').default;

const { builtinModules } = require("module");
const chalk = require('chalk');
const fs = require("fs");
const tpsPlugin = require('mineflayer-tps')(mineflayer)
let config = JSON.parse(fs.readFileSync('./config.json'))
const {usage, warning} = require('./Storage/functions');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const client = new Discord.Client();
client.commands = new Discord.Collection();
var stdin = process.openStdin()   
var prefix = { value: config.general.prefix };
let chatData = { chat: [], hover: [] };
let serverchat = {chat: []};
let saving = { chat: false, hover: false };
let invites = {};
let regex = { regex: new RegExp() };

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

let options = {
    version: config.general.version,
    host: config.general.serverIP,
    username: config.general.username,
    password: config.general.password,
};
var bot = { client: mineflayer.createBot(options)};
bot.client.loadPlugin(tpsPlugin);

client.on("ready", async () => {
    console.log(`Discord Bot Online @ ${config.general.serverIP}`)

    client.user.setActivity({
        name: `${config.general.serverIP}`,
    })

    setTimeout(() => {
        client.guilds.cache.forEach(g => {
            g.fetchInvites().then(guildInvites => {
                invites[g.id] = guildInvites;
            })
        })
    })
});

client.on("guildMemberAdd", member => {
    if(!getChannel(member, config.channelIDs.joinchannelID)) return
    member.guild.fetchInvites.then(guildInvites => {
        const exisitingInvites = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        const invite = guildInvites.find(i => exisitingInvites.get(i.code).uses < i.uses);
        const inviter = client.users.get(invite.inviter.id);
        const embed = new Discord.MessageEmbed()
            .setDescription(`<@${member.guild.id} **joined**; Invited by **${inviter.username}** (**${invite.uses}** invites)>`)
            .setColor(config.general.embedColor)
            .setTimestamp(new Date())
        getChannel(member, config.channelIDs.joinchannelID).send(embed)
    })
})

client.on("guildMemberRemove", member => {
    if(!getChannel(config.channelIDs.leavechannelID)) return
    let server = client.guilds.cache.get(guild)

    const embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.user.id}> left ${server}`)
        .setColor(config.general.embedColor)
        .setTimestamp(new Date())
    getChannel(config.channelIDs.leavechannelID).send(embed)
})

client.on('message', message => {
    
   
    if (!message.content.startsWith(prefix.value) || message.author.bot) return;

    const args = message.content.slice(prefix.value.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    // order: prefix args commandName--> command

    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    try {
        if (command.enabled == true && command.name != "settings") {
            command.execute(message, args, bot, chatData, saving, regex);
        }
        else if (command.name == "settings") {
            command.execute(message, args, prefix)
        } 
    } catch (err) {
        message.channel.send(`\`\`\`${err}\`\`\``)
    }
});

client.login(config.general.token).catch(console.err);

stdin.addListener("data", data => {
    bot.client.chat(data.toString().trim())
})

bot.client.on("login", async () => {
    console.log(`Bot: ${bot.client.username} is now on ${config.general.serverIP}`)
    bot.client.chat(config.general.hub_command)
    setTimeout(() => {
        bot.client.chat(config.general.hub_command)
     },30*60*1000)
})


  


  
 
bot.client.on("error", error => {
    if (`${error}`.includes("Invalid credentials")) {
        console.log("Invalid Session/Credentials, attempting to relog");
        setTimeout(() => {
            process.exit();
        }, 30000);
    }
})
bot.client.on("end", () => {
    console.log("Connection Ended");
    setTimeout(() => {
        process.exit();
    }, 30000);
})

bot.client.on('kicked', reason => {
    console.log("Kicked for: " + reason);
    console.log("Attempting to relog");
    setTimeout(() => {
        process.exit();
    }, 30000);
});
bot.client.on("windowOpen", function (window) {

   let foundItem = window.slots.find(x =>x.slot=== 12).nbt.value.display.value.Lore.value.value
    if (foundItem.includes("'§c§m------------',")){
        foundItem.replace('§c§m------------', ' ')
    }


  bot.client.closeWindow(window)
    })



bot.client._client.on("scoreboard_score", packet => {
    let allP = [];
    allP.push(packet.itemName)
    //console.log(allP)
})

//  bot.client._client.on("scoreboard_team", function (packet){
///    let vanishUsers = JSON.parse(fs.readFileSync('./Storage/vanishusers.json'))
 //   let packetinfo = JSON.stringify(packet.players)
//    for(let i in packetinfo){
//        if(!vanishUsers.includes(i) && i != null){
           // chatData.chat.push(i)
           // console.log(chatData.chat)
 //       }
  //  }
    //if(packetinfo != null || packetinfo == '' && !vanishUsers.includes(packetinfo)){
    //    chatData.chat.push(vanishUsers)
    //    console.log(chatData.chat)
   // }  
//})
bot.client.on("message", async message => {
    let serverChatID = client.channels.cache.get(config.channelIDs.serverchatID)
    let parsedMsg = `${message}`;
     if   (parsedMsg.includes("0 / 2000 Backpack Space")){
        return
    }


    if (parsedMsg.includes("VanityMC » Quick server restart in 5 minutes!")) {
        const Channel1 = client.channels.cache.get(config.channelIDs.eventchannelid)
        const embed = new Discord.MessageEmbed()
        .setDescription(`Upcomming server restart!`+ +`\`\`\`${parsedMsg}\`\`\``)
        .setColor(config.general.embedColor)
        .setTimestamp(new Date())
        Channel1.send(embed)
        Channel1.send('<@&' + config.general.AlertsPingRole +'>')
    }   
    if (parsedMsg.includes("VanityMC » Mining event starts in 5 minutes")) {
        const Channel1 = client.channels.cache.get(config.channelIDs.eventchannelid)
        const embed = new Discord.MessageEmbed()
        .setDescription(`Upcomming Mining event! `+`\`\`\`${parsedMsg}\`\`\``)
        .setColor(config.general.embedColor)
        .setTimestamp(new Date())   
        Channel1.send(embed)
        Channel1.send('<@&' + config.general.AlertsPingRole +'>')
        bot.client.chat("/cell chat")
      //  bot.client.chat("[alert] Upcomming Mining event!")
    }
    
    if (parsedMsg.includes("max rankup")) {
        bot.client.chat("[Wize words] You cannot however You could just spam the rank up command! :)")
    }

    if (parsedMsg.includes("VanityMC » Mining event starts in 15 minutes")) {
        const Channel1 = client.channels.cache.get(config.channelIDs.eventchannelid)
        const embed = new Discord.MessageEmbed()
        .setDescription(`Upcomming Mining event! `+`\`\`\`${parsedMsg}\`\`\``)
        .setColor(config.general.embedColor)
        .setTimestamp(new Date())   
        Channel1.send(embed)
        Channel1.send('<@&' + config.general.AlertsPingRole +'>')
        bot.client.chat("/cell chat")
      //  bot.client.chat("[alert] Upcomming Mining event!")
    }



    if (parsedMsg.includes("+insult")){
        const yoMamma = require('yo-mamma').default;

        let insult = yoMamma();
        bot.client.chat(insult)
    }
    if (parsedMsg.includes("=panic")){
        bot.client.chat("Panic mode activited, The bot will now self-destruct ...")
        process.exit();    }










    //triva shit   
    /* 
  if (parsedMsg.includes("Trivia » What is the capital city of Armenia?")){
        bot.client.chat("Yerevan")
    }
    if (parsedMsg.includes("Trivia » What is the capital city of senegal?")){
        bot.client.chat("Dakar")
    }
    if (parsedMsg.includes("Trivia » Question: 7 + 4")){
        bot.client.chat("11")
    }
    if (parsedMsg.includes("Trivia » Question: Unscramble the word : rPgetsei")){
        bot.client.chat("prestige")
    }
    if (parsedMsg.includes("Trivia » Question: What is the capital city of Italy?")){
        bot.client.chat("Rome")
    }
    if (parsedMsg.includes("Trivia » Question: what is the highest mountain in the world?")){
        bot.client.chat("Mount everest")
    }
    if (parsedMsg.includes("Trivia » Trivia » Question: In what year did World War 1 begin?")){
        bot.client.chat("1997")
    }
    if (parsedMsg.includes("Trivia » Question: What is the first element on the Periodic Table?")){
        bot.client.chat("hydrogen")
    }
    if (parsedMsg.includes("Trivia » Question: How many stripes are there on the American flag?")){
        bot.client.chat("thirteen")
    }
    if (parsedMsg.includes("Trivia » Question: What is the capital city of Oman?")){
        bot.client.chat("Muscat")
    }
    if (parsedMsg.includes("Trivia » Question: Unscramble the word : eMnri")){
        bot.client.chat("Miner")
    }
    if (parsedMsg.includes("Trivia » Question: -2 + -10")){
        bot.client.chat("-12")
    }
    if (parsedMsg.includes("Trivia » Question: -1 + 7")){
        bot.client.chat("6")
    }
    if (parsedMsg.includes("Trivia » Question: According to UN predictions, what will the population be in 2050?")){
        bot.client.chat("9.7 billion")
    }
    if (parsedMsg.includes("Trivia » Question: What is the capital city of Malta?")){
        bot.client.chat("Valletta")
    }
    if (parsedMsg.includes("Trivia » Question: What is the expected life expectancy of the world's pupulation?")){
        bot.client.chat("72 years")
    }
    
    if (parsedMsg.includes("Trivia » Question: When did Columbus discover America?")){
        bot.client.chat("3 August 1492")
    }
    if (parsedMsg.includes("Trivia » Question: Which prison is the largest high-security prison in the UK?")){
        bot.client.chat("HMP Wakefield")
    }
    if (parsedMsg.includes("Trivia » Question: PEK is the code for which international airport?")){
        bot.client.chat("Beijing")
    }
    if (parsedMsg.includes("Trivia » Question: Which African country has the most pyramids?")){
        bot.client.chat("Sudan")
    }
    if (parsedMsg.includes("Trivia » Question: What is the highest possible rank?")){
        bot.client.chat("vanity +")
    }
    if (parsedMsg.includes("Trivia » Question: Who is on the $1 Bill?")){
        bot.client.chat("George Washington")


    }
    if (parsedMsg.includes("Trivia » Question: When was the first earth day celebrated")){
        bot.client.chat("1970")
    }
*/
    if (parsedMsg.includes("```@everyone")) {
        return
    }
    if (parsedMsg.includes("Trivia »")) {
        const Channel1 = client.channels.cache.get("883104542781227029")
        const embed = new Discord.MessageEmbed()
        .setDescription(`${parsedMsg}`)
        .setColor(config.general.embedColor)  
        Channel1.send(embed)
        bot.client.chat("WOO TRIVA")
    }
    
    if (parsedMsg.includes("was correct, and has won a Rare Key!")) {
        return
    }

    if (parsedMsg.length >= 2000 ){
        console.log(chalk.bgRed.bold("Ignore this , This is down to [item]"))
      return }
    
   
    if (parsedMsg.toLowerCase().match(regex.regex) && saving.hover === true && message.hoverEvent != "undefined") {
        chatData.chat.push(parsedMsg);
        chatData.hover.push(message.hoverEvent)
    }
    
    if (parsedMsg.toLowerCase().match(regex.regex) && parsedMsg.includes("0 / 2000 Backpack Space")){
        return

    }

    if (parsedMsg.match(regex.regex) && !parsedMsg.includes("(!) Vanity") && saving.chat === true) {
        chatData.chat.push(`${message}`);
    }
    if(config.enableCommands.serverchat == true){
        console.log(message.toAnsi())
        serverchat.chat.push(parsedMsg)
    setInterval(() => {
        if(serverchat.chat.length === 0){ return }
        serverChatID.send(`\`\`\`${serverchat.chat.join('\n')}\`\`\``)
        serverchat.chat = []
    }, 7000);
    }  
});

