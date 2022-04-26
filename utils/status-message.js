const logger = require("./logger");
const config = require("./config");

const toggleMaintenanceStatus = (user) => {
    if (config.RUNTIME_CONFIG["MAINTENANCE_STATUS"] === false) {
        logger.info("STATUS-MESSAGE", "Setting maintenance server status");
        user.setPresence({
            activities: [{ name: "! - Server Maintenance" }],
            status: "idle",
        });
    } else {
        logger.info("STATUS-MESSAGE", "Setting status message back to online");
        user.setPresence({
            activities: [{ name: `"${config.PREFIX}help" to get started!` }],
            status: "online",
        });
    }

    config.RUNTIME_CONFIG["MAINTENANCE_STATUS"] =
        !config.RUNTIME_CONFIG["MAINTENANCE_STATUS"];
};

module.exports = {
    toggleMaintenanceStatus,
};
