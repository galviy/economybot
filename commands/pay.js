const fs = require("fs");
const Discord = require("discord.js");
const {
    MessageEmbed
} = require("discord.js");

module.exports.run = (client, message, args, usertemp) => {
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

    if (usertemp[message.author.id].playid == true) {
        return message.channel.send(`You're playing game dont try to ** break me 💀**`);
    }
    const mention = getUserFromMention(args[0]);
    if (!mention) {
        return message.channel.send("You have to mention the user u want to pay.");
    } else if (mention.id == message.author.id) {
        return message.channel.send(`${message.author.username}, You Cant Pay Your Self :red_circle: .`)
    } else if (!user[mention.id]) {
        return message.reply("That user **does not** exist in our database")
    } else if (!args[1]) {
        return message.channel.send("You need to put the amount you want to send.");
    } else if (Number.isNaN(+args[1]) == true) {
        return message.channel.send("⚠️ Are you kidding me..? you have to pay the amount with integer.");
    } else if (args[1] < 500) {
        return message.channel.send("An Error Occured It must be 500 ©️'s to pay someone.");
    } else if (parseInt(user[message.author.id].money) < parseInt(args[1])) {
        return message.channel.send(`${message.author.username}, Oh Sorry  you dont have  ${args[1]} ©️ to pay.`);
    } else {
        user[mention.id].money = parseInt(user[mention.id].money) + parseInt(args[1]);
        user[message.author.id].money = parseInt(user[message.author.id].money) - parseInt(args[1]);
        fs.writeFile("database.json", JSON.stringify(user), err => {
            if (err) {
                console.log(err);
                message.channel.send("Something went wrong bruh error logs have been saved on ./logs/error.txt");
                return;
            } else {
                message.channel.send(`You have sent  **${args[1]}**  Lock to **${mention.username}**, and now you have  ${user[message.author.id].money.toLocaleString()} Lock.`);
            }
        })
    }
}
