const config = require("../../utils/config");

module.exports = {
    name: "ping",
    description: "Test if the bot is working",
    admin: false,
    usage: `${config.PREFIX}ping`,
    execute(msg, args) {
        msg.channel.send({ content: "Pong." });
    },
};