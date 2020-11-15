const Discord = require("discord.js");
const config = require("../../utils/config");
const roles = require("../../utils/roles");
const generalCommands = require("../general");
const adminCommands = require("../admin");

module.exports = {
    name: "help",
    description: "The help page",
    admin: false,
    usage: `${config.PREFIX}help`,
    execute(msg, args) {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("Commands");

        for (const [name, command] of Object.entries(generalCommands)) {
            helpEmbed.addField(name, `${command.description}\nUsage: ${command.usage}`);
        }

        if (roles.checkMemberIsAdmin(msg.guild, msg.member)) {
            for (const [name, command] of Object.entries(adminCommands)) {
                helpEmbed.addField(name, `${command.description}\nUsage: ${command.usage}`);
            }
        }

        msg.channel.send(helpEmbed);
    },
};