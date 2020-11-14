const logger = require("./logger");
const config = require("./config");

const toggleMaintenanceStatus = (user) => {
    if (config.RUNTIME_CONFIG["MAINTENANCE_STATUS"] === false) {
        logger.info("STATUS-MESSAGE", "Setting maintenance server status")
        user.setPresence({ activity: { name: "! - Server Maintenance" }, status: "idle" });
    } else {
        logger.info("STATUS-MESSAGE", "Setting status message back to online")
        user.setPresence({ activity: { name: "Bot is online!" }, status: "online" });
    }

    config.RUNTIME_CONFIG["MAINTENANCE_STATUS"] = !config.RUNTIME_CONFIG["MAINTENANCE_STATUS"];
};

module.exports = {
    toggleMaintenanceStatus
};