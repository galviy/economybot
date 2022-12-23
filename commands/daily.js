const fs = require("fs");

module.exports.run = (client, message, args) => {
    let user = JSON.parse(fs.readFileSync("./database.json"));
    var cooldown = user[message.author.id].dailyclaimed + parseInt(600);
    if (parseInt(cooldown) < Date.now() / 1000 | 0) {
        user[message.author.id].money += 70000;
        user[message.author.id].dailyclaimed = Date.now() / 1000 | 0;
        fs.writeFile("database.json", JSON.stringify(user), err => {
            if (err) {
                console.log(err)
            } else {
                return message.reply(`You have claimed daily reward of **70,000** ©️  Lock, now you've **${user[message.author.id].money.toLocaleString()}** ©️`);
            }
        })
    } else {
       return message.reply(`You'll be able to collect **daily gems** <t:${user[message.author.id].dailyclaimed + parseInt(600)}:R>`);
    }
}
