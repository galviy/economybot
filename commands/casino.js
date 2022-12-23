const fs = require("fs");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");


const wheel = () => {
    return Math.floor(Math.random() * 36 + 0);
}

module.exports.run = (client, message, args, usertemp) => {
	let user = JSON.parse(fs.readFileSync("./database.json"));
    if (usertemp[message.author.id].playid == true) {
        return message.channel.send(`You're playing another game dont try to ** break me 💀**`);
    } else {
        var botwheel = wheel()
        if (!user[message.author.id].explanationgamble) {
            error = new Discord.MessageEmbed()
                .setTitle("**CASINO Game  🎱**")
                .setDescription("Csn is whoever spins the highest number on a roulette wheel wins(0 is highest number)");
            user[message.author.id].explanationgamble = true;
            fs.writeFile("database.json", JSON.stringify(user), err => {
                if (err) {
                    console.log(err);
                    message.channel.send("Something went wrong bruh error logs have been saved on ./logs/error.txt");
                    return;
                } else {
                    message.channel.send({
                        embeds: [error]
                    }).catch(err => console.log(err))
                }
            })
            return;
        } else if (!args[0]) {
            returmessage.channel.send(`**${message.author.username}**, You need to bet something :<`);
        } else if (!parseInt(user[message.author.id].money)) {
            return message.channel.send(`**${message.author.username}**, You don't even have money to bet lol 🥺`);
        } else if (parseInt(args[0]) < 100) {
            return message.channel.send(`**${message.author.username}**, bet amount must more than  100 Lock. to play`);
        } else if (parseInt(args[0]) > parseInt(user[message.author.id].money)) {
            message.channel.send(`**${message.author.username}**, you dont have  **${parseInt(args[0].toLocaleString())}** to bet.`)
                .then(msg => {
                    msg.delete({
                        timeout: 5000
                    });
                });
            return;
        } else if (parseInt(args[0]) > 200000) {
            return message.channel.send(`**${message.author.username}**, the maximal amount is 200,000 to bet or you can use "csn max" as args instead of rewrite the amount.`);
        } else if (args[0].toLowerCase() === "max") {
            if (parseInt(user[message.author.id].money) > 200000) {
                args[0] = parseInt(200000)
            } else {
                args[0] = parseInt(user[message.author.id].money);
            }
        } else if (Number.isNaN(+args[0]) == true) {
            return message.channel.send("you need to bet something dont try to break me ");
        } else if (args[0].includes("x")) {
            return message.channel.send(`I know **${message.author.username}**, ${args[0]} is valid integer but seems like hex doesn't work in this bot.`)
        }


        var botwheel = wheel();
        var author = wheel();
        //ties
        var winvalue = parseInt(user[message.author.id].money) + parseInt(args[0])
        var losevalue = parseInt(user[message.author.id].money) - parseInt(args[0])
        const tie = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}Game`)
            .setDescription(`Tie! ${message.author.username} lost nothing!\n\nTotal Lock: 🔓 **${user[message.author.id].money.toLocaleString()}**\n\n**${message.author.username}** number \`${author}\`!\n**${client.user.username}** number \`${botwheel}\`!`)
            .setColor("RANDOM")
            .setTimestamp();
        //wins
        const win = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} Game`)
            .setDescription(`${message.author.username} won ${args[0].toLocaleString()} !\n\nRemaining Lock: 🔓 **${winvalue.toLocaleString()}**\n\n**${message.author.username}** number \`${author}\`!\n**${client.user.username}** number \`${botwheel}\`!`)
            .setColor("RANDOM")
            .setTimestamp();
        //loses
        const lose = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} Game`)
            .setDescription(`${message.author.username} lost ${args[0].toLocaleString()} !\n\nRemaining Lock: 🔓 **${losevalue.toLocaleString()}**\n\n**${message.author.username}** number \`${author}\`!\n**${client.user.username}** number \`${botwheel}\`!`)
            .setColor("RANDOM")
            .setTimestamp();
        // 
        if (parseInt(author) == parseInt(botwheel)) {
            return message.channel.send(tie);
        } else if (parseInt(botwheel) == 0) {
            // case lose
            user[message.author.id].money = parseInt(user[message.author.id].money) - parseInt(args[0]);
            fs.writeFile("database.json", JSON.stringify(user), err => {
                if (err) {
                    console.log(err);
                    message.channel.send("Something went wrong bruh error logs have been saved on ./logs/error.txt");
                    return;
                } else {
                    message.channel.send({
                        embeds: [lose]
                    }).catch(err => console.log(err))
                }
            })
        } else if (parseInt(author) == 0) {
            // case lose
            user[message.author.id].money = parseInt(user[message.author.id].money) + parseInt(args[0]);
            fs.writeFile("database.json", JSON.stringify(user), err => {
                if (err) {
                    console.log(err);
                    message.channel.send("Something went wrong bruh error logs have been saved on ./logs/error.txt");
                    return;
                } else {
                    return message.channel.send({
                        embeds: [win]
                    }).catch(err => console.log(err))
                }
            })
        } else if (parseInt(author) < parseInt(botwheel)) {
            console.log(`you ${author} against ${botwheel}`)
            user[message.author.id].money = parseInt(user[message.author.id].money) - parseInt(args[0]);
            fs.writeFile("database.json", JSON.stringify(user), err => {
                if (err) {
                    console.log(err);
                    message.channel.send("Something went wrong bruh error logs have been saved on ./logs/error.txt");
                    return;
                } else {
                    return message.channel.send({
                        embeds: [lose]
                    }).catch(err => console.log(err))
                }
            })
        } else if (parseInt(author) > parseInt(botwheel)) {
            // case lose
            console.log(`you ${author} against ${botwheel}`)
            user[message.author.id].money = parseInt(user[message.author.id].money) + parseInt(args[0]);
            fs.writeFile("database.json", JSON.stringify(user), err => {
                if (err) {
                    console.log(err);
                    message.channel.send("Something went wrong bruh error logs have been saved on ./logs/error.txt");
                    return;
                } else {
                    return message.channel.send({
                        embeds: [win]
                    }).catch(err => console.log(err))
                }
            })
        }

    }
}