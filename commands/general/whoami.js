const Discord = require("discord.js");
const roles = require("../../utils/roles");
const config = require("../../utils/config");

module.exports = {
    name: "whoami",
    description: "Get information about your user",
    admin: false,
    usage: `${config.PREFIX}whoami`,
    execute(msg, args) {
        // Member role cache gets updated instantly so can continue use cache as there is no function to query member roles in guild
        const userEmbed = new Discord.MessageEmbed()
            // .setColor("#ff0000")
            .setTitle(msg.author.username)
            .setThumbnail(msg.author.displayAvatarURL())
            .addField(
                "Roles",
                msg.member.roles.cache
                    .map((role) =>
                        role.name !== "@everyone" && msg.guild === role.guild
                            ? role.name
                            : ""
                    )
                    .join("\n") || "You have no roles"
            );
        msg.channel.send({ embeds: [userEmbed] });
    },
};
