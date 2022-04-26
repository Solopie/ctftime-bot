const config = require("../../utils/config");
module.exports = {
    name: "admin-test",
    description: "Command to test if you have access to admin commands",
    admin: true,
    usage: `${config.PREFIX}admin-test`,
    execute(msg, args) {
        msg.reply({ content: "You executed an admin command!", allowedMentions: { repliedUser: true } });
    },
};