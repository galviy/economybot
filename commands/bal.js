const fs = require("fs");
const Discord = require("discord.js");
const {
    MessageEmbed
} = require("discord.js");

module.exports.run = (client, message, args) => {
    let user = JSON.parse(fs.readFileSync("./database.json"));

    function getUserFromMention(mention) {
        if (!mention) return;
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
            return client.users.cache.get(mention);
        }
    }
    const mention = getUserFromMention(args[0]);
    if (mention && !user[mention.id]) {
        return message.reply("User **does not** exist in bot database!");
    }
    if (mention) {
        let SuccessEmbed = new Discord.MessageEmbed();
        SuccessEmbed.setTitle(`💵 ${mention.username}'s information`);
        SuccessEmbed.setColor("#FF0000")
        SuccessEmbed.setDescription(`**Wallet**\n${user[mention.id].money.toLocaleString()}\n\n**Deposited Wallet**\n ${user[mention.id].deposited.toLocaleString()}`);
        message.channel.send({
            embeds: [SuccessEmbed]
        }).catch(err => console.log(err))
    }
    if (!mention) {
        let SuccessEmbeds = new Discord.MessageEmbed();
        SuccessEmbeds.setTitle(`💵 ${message.author.username}'s Bank`);
        SuccessEmbeds.setColor("#FF0000")
        SuccessEmbeds.setDescription(`**Wallet**\n${user[message.author.id].money.toLocaleString()}\n\n**Deposited Wallet**\n ${user[message.author.id].deposited.toLocaleString()}`);
        message.channel.send({
            embeds: [SuccessEmbeds]
        }).catch(err => console.log(err))
    }
}
