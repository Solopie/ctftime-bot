# CTFTime Bot

Bot for CTFTime event management. Effort made for MQCybersec

## Features

- View upcoming events

## Docker Instructions

**Flags**

- Set detached from foreground
- Set logging path (Unix Path is used. Change if host is windows)
- Limit memory to 2GBs
- Set tag for container

```
docker build -t <image-name> .
docker run -d -v /var/log/<create folder for logs>/:/usr/src/app/logs/ -m 2 --name <name for container> <image-name>

E.g.
docker build -t mc-server-bot-image .
docker run -d -v /var/log/bot-test/:/usr/src/app/logs/ -m 2g --name bot-test bot-test
```
## .env file

- PROD_BOT_TOKEN
    - Discord bot token for production environment
- DEV_BOT_TOKEN
    - Discord bot token for development environment
- BOT_PREFIX
    - Prefix for bot commands
- LOG_DIR
    - Directory path for logs
- ADMIN_ROLE_NAME
    - Name of admin role for the bot
