const Discord = require("discord.js");

const {
    Client,
    Intents
} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const prefix = "-";

const fs = require("fs");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
const timeout = new Set();

const usertemp = new Object;

for (file of commandFiles) {

    const commandName = file.split(".")[0];
    const command = require("./commands/" + commandName);
    client.commands.set(commandName, command);
}

function createNewUser(discordid) {
    const newuser = discordid = {
        isUserAdministrator: false,
        bannedReason: "",
        whenBanned: 0,
        money: 50000,
        deposited: 0,
        lastdeposit: 0,
        dailyclaimed: 0,
        monthlyclaimed: 0,
        isBanned: false,
    }
    return newuser;
}

client.on("messageCreate", message => {

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift();
        const command = client.commands.get(commandName);
        if (!command) return;
        if (command) {
            let user = JSON.parse(fs.readFileSync("./database.json"));
            if (timeout.has(message.author.id)) {
                message.channel.send("⏱ | ** " + message.author.username + "**! Please wait 3 Seconds before peforming another command!")
                    .then(msg => {
                        msg.delete({
                            timeout: 3000
                        });
                    })
                return;
            } else {
                timeout.add(message.author.id);
                setTimeout(() => {
                    timeout.delete(message.author.id);
                }, 3000);
            }
            if (!user[message.author.id]) {
                user[message.author.id] = createNewUser(message.author.id);
                return fs.writeFile("database.json", JSON.stringify(user), err => {
                    if (err) {
                        message.reply("Something went wrong when creating your **database**.")
                    }
                    message.channel.send(`Welcome **${message.author.username}**, you can perform your command again!`)
                    console.log("created new account -> " + message.author.tag)
                })
            }
            if (user[message.author.id].isBanned) {
                return message.reply(`You've been BANNED from this bot\nDate: <t:${Date.now() / 1000 | 0}:F>  **${message.author.username}** **(**${message.author.id}**)** with reason - \`\`${user[message.author.id].bannedReason}\`\``)
            }
            if (!usertemp[message.author.id]) {
                usertemp[message.author.id] = {
                    playid: false,
                };
            }

            switch (usertemp[message.author.id]) {
                case true:
                    console.log(usertemp[message.author.id] + "is now playing a game")
                    break;
                case false:
                    usertemp[message.author.id] = {
                        playid: false,
                    };
            }

            command.run(client, message, args, usertemp);
        }

    }
})

client.login("discord token goes here");

process.on('unhandledRejection', rejection => {
    console.warn('\n[unhandledRejection]');
    console.warn(rejection);
    console.warn('[/unhandledRejection]\n');
});
