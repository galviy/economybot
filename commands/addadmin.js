const fs = require("fs");

module.exports.run = (client, message, args) => {
    let user = JSON.parse(fs.readFileSync("./database.json"));
    let owners = JSON.parse(fs.readFileSync("./owners.json"));

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
    console.log(owners)
    if (owners[message.author.id]) {
        user[getUserFromMention(args[0]).id].isUserAdministrator = true;
        fs.writeFile("database.json", JSON.stringify(user), err => {
            if (!err) {
                message.reply(`Date: <t:${Date.now() / 1000 | 0}:F> Successfully Gave **${mention.username}** **(**${mention.id}**)** ADMIN.`);
            }
            console.log(err)
        })
    }

}
