const Discord = require("discord.js");
const roles = require("../../utils/roles");
const config = require("../../utils/config");

module.exports = {
    name: "whoami",
    description: "Get information about your user",
    admin: false,
    usage: `${config.PREFIX}whoami`,
    execute(msg, args) {
        const userEmbed = new Discord.MessageEmbed()
            // .setColor("#ff0000")
            .setTitle(msg.author.username)
            .setThumbnail(msg.author.displayAvatarURL())
            .addField("Roles", msg.member.roles.cache.map(role => role.name !== "@everyone" && msg.guild === role.guild ? role.name : "").join("\n") || "You have no roles")
        msg.channel.send(userEmbed);
    },

};