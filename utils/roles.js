const { Permissions } = require("discord.js");
const config = require("./config");
const logger = require("./logger");

const setExistingAdminRoleId = async (guild) => {
    logger.info(
        "ROLES",
        `Setting admin role ID in runtime config for guild "${guild.name}-${guild.id}"`
    );
    // Identify the highest role with ADMIN_ROLE_NAME
    let guildRoles = await guild.roles.fetch();
    let adminRoleHighestPosition = { position: -1 };
    adminRoleHighestPosition = guildRoles.reduce(
        (maxPositionRole, role) =>
            role.name === process.env.ADMIN_ROLE_NAME &&
                role.position > maxPositionRole.position
                ? role
                : maxPositionRole,
        { position: -1 }
    );

    // Check admin role exists, if it doesn't we just don't do anything until they run command to create role
    if (adminRoleHighestPosition.position != -1) {
        // Get ID and set to runtime config
        config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"][guild.id] =
            adminRoleHighestPosition.id;
    }
};

const checkAdminRoleExists = (guild) => {
    logger.info(
        "ROLES",
        `Checking if admin role exists for guild "${guild.name}-${guild.id}"`
    );
    return config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"][guild.id] ? true : false;
};

const deleteExistingAdminRoleId = (guild) => {
    if (checkAdminRoleExists) {
        delete config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"][guild.id];
        logger.info(
            "ROLES",
            `Admin role ID has been deleted for guild "${guild.name}-${guild.id}"`
        );
    } else {
        logger.info(
            "ROLES",
            `The "${guild.name}" guild (ID:${guild.id}) admin role ID did not exist`
        );
    }
};

const checkMemberIsAdmin = (guild, member) => {
    return (
        member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ||
        (checkAdminRoleExists(guild) &&
            member.roles.cache.some(
                (role) =>
                    role.id ===
                    config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"][guild.id]
            ))
    );
    // return (checkAdminRoleExists(guild) && member.roles.cache.some(role => role.id === config.RUNTIME_CONFIG["ADMIN_ROLE_IDS"][guild.id]));
};

module.exports = {
    setExistingAdminRoleId,
    deleteExistingAdminRoleId,
    checkAdminRoleExists,
    checkMemberIsAdmin,
};
