const config = require("../../utils/config");
const logger = require("../../utils/logger");

module.exports = {
    name: "create-admin-role",
    description: "Create admin role for users to run specific bot commands",
    admin: true,
    usage: `${config.PREFIX}create-admin-role`,
    async execute(msg, args, client) {
        let roles = await msg.guild.roles.fetch();
        if (
            msg.guild.id in config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"] &&
            roles.some(
                (role) =>
                    role.id ===
                    config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"][msg.guild.id]
            )
        ) {
            msg.reply({ content: `Admin role "${config.ADMIN_ROLE_NAME}" has already been created`, allowedMentions: { repliedUser: false } });
            return;
        }

        try {
            logger.info("COMMAND", "Creating admin role");
            const role = await msg.guild.roles.create({
                name: config.ADMIN_ROLE_NAME,
                color: "YELLOW",
                position: 1,
            });

            // Save role id
            config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"][msg.guild.id] = role.id;

            logger.info(
                "COMMAND",
                `"${config.ADMIN_ROLE_NAME}" created. Rearrange role position to ensure security is satisfied.`
            );
            msg.channel.send({ content: `"${config.ADMIN_ROLE_NAME}" has been created. Rearrange role position to ensure security is satisfied.` });
        } catch (err) {
            logger.error("COMMAND", "Failed to create role", err);
            msg.channel.send({ content: "Failed to create role. Check logs for more information" });
        }
    },
};
