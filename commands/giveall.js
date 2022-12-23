const fs = require("fs");

let registered = 0;

module.exports.run = (client, message, args, usertemp) => {
    let user = JSON.parse(fs.readFileSync("./database.json"));
    let owners = JSON.parse(fs.readFileSync("./owners.json"));
    if (owners[message.author.id]) {
        if (!args[0]) {
            return message.channel.send("Please input gems u want to giveall");
        }
        for (i in user) {
            registered++;
            user[i].money = parseInt(user[i].money) + parseInt(args[0])
            
        }
		fs.writeFile("database.json", JSON.stringify(user), err => {
                if (err) {
                    console.log(err);
                    message.channel.send("Something went wrong bruh error logs have been saved on ./logs/error.txt");
                    return;
                } else {
                    console.log(`${user[i].money}`);
                }
            })
        message.channel.send(`successfully give all **${args[0]}** ©️!, ${registered} accounts Has Been Given.`);
        registered = 0;
    }
}