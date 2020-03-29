module.exports = {
    name: "ping",
    description: "Our first command!",
    usage: " ",
    execute(message) {
        message.channel.send("Pong!")
    }
}