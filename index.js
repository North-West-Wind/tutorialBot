const http = require("http");
const express = require("express");
const request = require("request");
const app = express();
app.get("/", (req, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const token = process.env.TOKEN;

const commandFile = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

client.commands = new Discord.Collection();

for(const file of commandFile) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const { prefix } = require("./config.json");

client.login(token);

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if(!command) return;

    try{
        command.execute(message);
    } catch(err) {
        message.reply("there was an error trying to execute that command!");
        console.error(err);
    }
})