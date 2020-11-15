require("dotenv").config();

let BOT_TOKEN = process.env.PROD_BOT_TOKEN;
if (process.env.NODE_ENV === "dev") {
    BOT_TOKEN = process.env.DEV_BOT_TOKEN;
}

const PREFIX = process.env.BOT_PREFIX;
const LOG_DIR = process.env.LOG_DIR;
const ADMIN_ROLE_NAME = process.env.ADMIN_ROLE_NAME;

let RUNTIME_CONFIG = {
    // guild_id -> role_id
    ADMIN_ROLE_IDS: {
    },
    MAINTENANCE_STATUS: false
};

module.exports = {
    BOT_TOKEN, PREFIX, LOG_DIR, ADMIN_ROLE_NAME, RUNTIME_CONFIG
};