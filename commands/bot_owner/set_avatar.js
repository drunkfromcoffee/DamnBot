module.exports = {
    name:"setavatar",
    category:"Bot Owner",
    usage:"<prefix>setavatar <linkToAvatar>",
    args:true,
    botowner:true,
    execute(client, message, args) {
        client.user.setAvatar(args.join(" ")).then(() => {
            message.channel.send("New avatar set successfully!");
        }).catch(() => {
            message.channel.send("Doesn't work, probably rate limit :))")
        });
    }
};