const Discord = require("discord.js");
const config = require("../../utils/config");
const roles = require("../../utils/roles");
const generalCommands = require("../general");
const adminCommands = require("../admin");

module.exports = {
    name: "help",
    description: "The help page",
    admin: false,
    usage: `${config.PREFIX}help <section>`,
    execute(msg, args) {
        if (args.length === 0) {
            const sectionEmbed = new Discord.MessageEmbed()
                .setTitle("Help Sections")
                .setDescription("Please give a section as an argument")
                .addField("Usage", `${config.PREFIX}help <section>`)
                .addField("Section", ["general", "admin"].join("\n"))

            msg.channel.send(sectionEmbed)
        } else {
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
        }
    },
};
