const config = require("../../utils/config");
const logger = require("../../utils/logger");
const statusMessage = require("../../utils/status-message");

module.exports = {
    name: "maintenance",
    description: "Toggle the maintenance status for the bot",
    admin: true,
    usage: `${config.PREFIX}maintenance`,
    execute(msg, args, client) {
        statusMessage.toggleMaintenanceStatus(client.user);
        logger.info("COMMAND", "Maintenance status has been toggled");
        msg.channel.send({ content: "Maintenance status has been toggled" });
    },
};