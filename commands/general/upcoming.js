const Discord = require("discord.js");
const moment = require("moment")
const config = require("../../utils/config")
const logger = require("../../utils/logger")
const ctftimeApi = require("../../utils/ctftime_api")


module.exports = {
    name: "upcoming",
    description: "Check upcoming events",
    admin: false,
    usage: `${config.PREFIX}upcoming [index]`,
    async execute(message, args) {
        const curTime = moment().unix()
        // const weekAfter = moment().add(7, "days").unix()

        // Limit to 10 upcomning events
        const upcomingEvents = await ctftimeApi.getEvents(curTime, "", 10)

        // Single embed
        let eventIndex = 0
        if (args.length >= 1) {
            eventIndex = parseInt(args[0])
        }

        // Check index is NaN (falsy) or less than 0
        if ((eventIndex != 0 && !eventIndex) || eventIndex < 0) {
            logger.error("COMMAND", "Invalid index given")
            message.reply({ content: "Invalid index given", allowedMentions: { repliedUser: true } });
            return
        }

        // Check if index doesn't exist
        if (eventIndex >= upcomingEvents.length) {
            logger.error("COMMAND", "Index given is too big")
            message.reply({ content: `There is only ${upcomingEvents.length} events coming up in the coming 7 days. Please choose an index below ${upcomingEvents.length}.`, allowedMentions: { repliedUser: true } });
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
        message.channel.send({ embeds: [eventEmbed] });
    },
};
