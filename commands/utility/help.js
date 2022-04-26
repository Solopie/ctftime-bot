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
            let sections = ["general"];
            if (roles.checkMemberIsAdmin(msg.guild, msg.member)) {
                sections.push("admin");
            }
            const sectionEmbed = new Discord.MessageEmbed()
                .setTitle("Help Sections")
                .setDescription("Please give a section as an argument")
                .addField("Usage", `${config.PREFIX}help <section>`)
                .addField("Sections", sections.join("\n"));

            msg.channel.send({ embeds: [sectionEmbed] });
        } else {
            const helpEmbed = new Discord.MessageEmbed().setTitle("Commands");

            switch (args[0].toLowerCase()) {
                case "general":
                    for (const [name, command] of Object.entries(
                        generalCommands
                    )) {
                        helpEmbed.addField(
                            name,
                            `${command.description}\nUsage: ${command.usage}`
                        );
                    }
                    break;
                case "admin":
                    if (roles.checkMemberIsAdmin(msg.guild, msg.member)) {
                        for (const [name, command] of Object.entries(
                            adminCommands
                        )) {
                            helpEmbed.addField(
                                name,
                                `${command.description}\nUsage: ${command.usage}`
                            );
                        }
                    } else {
                        msg.reply({ content: `You must have the "${config.ADMIN_ROLE_NAME}" role to view admin commands.`, allowedMentions: { repliedUser: true } });
                        return;
                    }
                    break;
            }

            msg.channel.send({ embeds: [helpEmbed] });
        }
    },
};
