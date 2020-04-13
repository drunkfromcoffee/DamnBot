module.exports = {
    name:"setusername",
    aliases: ["setname", "name", "username"],
    category:"Bot Owner",
    usage:"<prefix>setusername <new username for the bot>",
    args:true,
    botowner:true,
    execute(client, message, args) {
        client.user.setUsername(args.join(" ")).then(() => {
            message.channel.send("New username set successfully!");
        }).catch(() => {
            message.channel.send("Doesn't work, probably rate limit :))")
        });
    }
};