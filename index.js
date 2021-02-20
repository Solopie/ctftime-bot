const Discord = require("discord.js");
const logger = require("./utils/logger")
const config = require("./utils/config")
const roles = require("./utils/roles")

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commands = require("./commands");

// Import utility/general/admin commands

for (const [folderName, folderCommands] of Object.entries(commands)) {
    for (const [name, command] of Object.entries(folderCommands)) {
        client.commands.set(name, command);
    }
}

client.on("ready", () => {
    logger.info("STARTUP", `Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: `"${config.PREFIX}help" to get started!`}, status: "online" });

    // Iterate through all guilds and set admin role id if it already exists
    client.guilds.cache.forEach(guild => {
        roles.setExistingAdminRoleId(guild);
    });
});

client.on("guildCreate", guild => {
    logger.info("EVENT", `Joined a guild: "${guild.name}-${guild.id}"`);
    roles.setExistingAdminRoleId(guild);
});

client.on("guildDelete", guild => {
    logger.info("EVENT", `Left a guild: "${guild.name}-${guild.id}"`);
    roles.deleteExistingAdminRoleId(guild);
});

client.on("message", msg => {
    if (!msg.content.startsWith(config.PREFIX) || msg.author.bot) return;

    const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    const commandObject = client.commands.get(command);

    // Admin command permission checks
    if (!roles.checkMemberIsAdmin(msg.guild, msg.member)) {
        if (config.RUNTIME_CONFIG["MAINTENANCE_STATUS"]) {
            // People who aren't admins can't run commands during maintenance
            msg.reply("Only admins can run commands during maintenance.");
        } else if (commandObject.admin) {
            msg.reply(`You must have the "${config.ADMIN_ROLE_NAME}" role to execute admin commands.`);
            return;
        }

    }

    logger.info("COMMAND", `"${command}" - executed by ${msg.author.username}#${msg.author.discriminator}`);

    try {
        commandObject.execute(msg, args, client);
    } catch (error) {
        logger.error("COMMAND", error.message, error);
        msg.reply("There was an error trying to execute that command! Please contact an admin");
    }
});


client.login(config.BOT_TOKEN);
