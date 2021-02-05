const Discord = require("discord.js");
const moment = require("moment")
const config = require("../../utils/config")
const logger = require("../../utils/logger")
const ctftimeApi = require("../../utils/ctftime_api")


module.exports = {
    name: "upcoming",
    description: "Check upcoming events for the next week",
    admin: false,
    usage: `${config.PREFIX}upcoming [index]`,
    async execute(message, args) {
        const curTime = moment().unix()
        const weekAfter = moment().add(7, "days").unix()

        // Limit to 3 events occuring in the next week
        const upcomingEvents = await ctftimeApi.getEvents(curTime, weekAfter, 10)

        // Single embed
        let eventIndex = 0
        if (args.length >= 1) {
            eventIndex = parseInt(args[0])
        }

        // Check index is NaN (falsy)
        if (eventIndex != 0 && !eventIndex) {
            logger.error("COMMAND", "Invalid index given")
            message.reply("Invalid index given")
            return
        }

        // Check if index doesn't exist
        if (eventIndex >= upcomingEvents.length) {
            logger.error("COMMAND", "Index given is too big")
            message.reply(`There is only ${upcomingEvents.length} events coming up in the coming 7 days. Please choose an index below ${upcomingEvents.length}.`)
            return
        }

        const curEvent = upcomingEvents[eventIndex]

        const eventEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(curEvent.title)
            .setURL(curEvent.ctftime_url)
            .setDescription(curEvent.description)
            .setThumbnail(curEvent.logo)
            .addFields(
                { name: 'Format', value: curEvent.format },
                { name: 'Link', value: curEvent.url },
                { name: 'CTFTime URL', value: curEvent.ctftime_url },
                { name: 'Start', value: moment(curEvent.start).format("MMM Do YY hh:mm A Z") },
                { name: 'Finish', value: moment(curEvent.finish).format("MMM Do YY hh:mm A Z") },
            )

        logger.info("COMMAND", "Event embed sent")
        message.channel.send(eventEmbed);
    },
};
