module.exports = {
    name: "eval",
    aliases: "e",
    botowner: true,
    hidden: true,
    usage: "<prefix>eval <command>",
    execute(client, message, args) {
        const output = eval(`${args.join(" ")}`);
        message.channel.send(`\`${output}\``);
    }
};