module.exports = {
    name: "purge",
    aliases: ["clean", "delete"],
    usage: "<prefix>purge <messagecount>",
    description: "Deletes a given number of messages.",
    args: true,
    execute(client, message, args) {
        if(message.guild === null) return;

        if(!message.member.hasPermission('MANAGE_MESSAGES'))
            return message.reply("Sorry, but you don't have the permission to delete messages. If you think that this is a mistake, contact an admin.");

        let message_count = parseInt(args[0]);
        let count;
        while (message_count > 0) {
            if (message_count - 100 <= 0) { count = message_count; }
            else { count = 100; }

            message_count -= count;

            message.channel.messages.fetch({
                limit: count
            }).then(messages => message.channel.bulkDelete(messages));
        }
    }
};